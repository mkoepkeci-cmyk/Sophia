import { useState, useEffect } from 'react';
import { supabase, GovernanceProcess, ProcessStep, UserProgress, ChatMessage } from '../lib/supabase';
import { normalizeTerms, fuzzyMatch, calculateSimilarity } from '../utils/fuzzyMatch';
import { extractKeywords, calculateRelevance, suggestRelatedTopics, knowledgeBase } from '../utils/keywordExtraction';
import { buildContext, applyContext, isFollowUpQuestion, needsSystemContext, needsPhaseContext } from '../utils/conversationContext';

const USER_ID_KEY = 'governance_agent_user_id';

function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function useGovernanceAgent() {
  const [processes, setProcesses] = useState<GovernanceProcess[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<GovernanceProcess | null>(null);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clarificationAttempts, setClarificationAttempts] = useState(0);
  const userId = getUserId();

  useEffect(() => {
    loadProcesses();
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (selectedProcess) {
      loadProcessSteps(selectedProcess.id);
      loadUserProgress(selectedProcess.id);
    }
  }, [selectedProcess]);

  async function loadProcesses() {
    const { data, error } = await supabase
      .from('governance_processes')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (!error && data) {
      setProcesses(data);
      if (data.length > 0 && !selectedProcess) {
        setSelectedProcess(data[0]);
      }
    }
  }

  async function loadProcessSteps(processId: string) {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .eq('process_id', processId)
      .order('step_number');

    if (!error && data) {
      setProcessSteps(data);
    }
  }

  async function loadUserProgress(processId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('process_id', processId)
      .maybeSingle();

    if (!error) {
      if (data) {
        setUserProgress(data);
      } else {
        const { data: newProgress, error: createError } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            process_id: processId,
            current_step: 1,
            completed_steps: [],
            notes: ''
          })
          .select()
          .single();

        if (!createError && newProgress) {
          setUserProgress(newProgress);
        }
      }
    }
  }

  async function loadChatHistory() {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data) {
      setChatHistory(data);
    }
  }

  async function sendMessage(message: string): Promise<string> {
    setIsLoading(true);

    await supabase.from('chat_history').insert({
      user_id: userId,
      process_id: selectedProcess?.id || null,
      message: message,
      is_user: true
    });

    const response = await generateResponse(message);

    await supabase.from('chat_history').insert({
      user_id: userId,
      process_id: selectedProcess?.id || null,
      message: response,
      is_user: false
    });

    await loadChatHistory();
    setIsLoading(false);

    return response;
  }

  function getStepGuidance(stepNumber: number) {
    const guidance: Record<number, { whatHappens: string; whoDoes: string; outcome: string }> = {
      1: {
        whatHappens: "You'll create the intake form in Draft status and work with your System Leader to gather all details.",
        whoDoes: "• You (SCI): Build intake, create slides, set up Google Drive folder\n• System Leader: Reviews for completeness and approves",
        outcome: "Your request moves from Draft to Active status and proceeds to Vetting."
      },
      2: {
        whatHappens: "Your request goes through PeriSCOPE (vetting) and SCOPE (prioritization) meetings.",
        whoDoes: "• Change Management Program Manager: Reviews documentation and manages meetings\n• System Informaticists & IT: Complete effort scoring\n• SCOPE Committee: Assigns ranked priority",
        outcome: "Your request receives a priority ranking and moves to Define (if clinical sponsorship needed) or directly to Design."
      },
      3: {
        whatHappens: "Clinical Service Line reviews and approves the request at their governance meeting.",
        whoDoes: "• You (SCI): Secure agenda time and coordinate with Clinical Service Line\n• Clinical Service Line: Reviews and approves/dismisses request",
        outcome: "Request is approved by Clinical Service Line and moves to Design phase."
      },
      4: {
        whatHappens: "Design sessions are scheduled and conducted, or pre-completed design is reviewed.",
        whoDoes: "• You (SCI): Lead design sessions and document decisions\n• Regional participants: Provide input during design sessions\n• Design Review Committee: Approves final design",
        outcome: "Design is approved and a Feature ticket is created for IT to begin build."
      },
      5: {
        whatHappens: "Same as Cerner Design - sessions scheduled and design approved.",
        whoDoes: "• Epic Process Owners: Schedule refinement calls\n• You (SCI): Lead design and document in Epic Opt Form\n• Engineers: Schedule and facilitate design sessions",
        outcome: "Design is complete and Feature ticket is created for build to begin."
      },
      6: {
        whatHappens: "IT builds the enhancement and you test it in the non-production environment.",
        whoDoes: "• IT: Builds the enhancement and updates status to Testing\n• You & Validators: Test in non-prod and document results\n• You (SCI): Create Change Communication (Cerner only)",
        outcome: "Build passes testing and moves to Release Planning for production deployment."
      },
      7: {
        whatHappens: "Enhancement is deployed to production and you validate it works correctly.",
        whoDoes: "• IT: Deploys to production on release day\n• You & Validators: Test in production environment\n• Final validator: Confirms successful deployment",
        outcome: "Enhancement is live in production - you're done! 🎉"
      }
    };

    return guidance[stepNumber] || {
      whatHappens: "Continue with the next phase of the governance process.",
      whoDoes: "Various team members depending on the phase.",
      outcome: "Progress continues through the workflow."
    };
  }

  function needsDisambiguation(message: string): boolean {
    // Check if the question is ambiguous and needs clarification
    const phaseAmbiguous = (
      (message.includes('who updates') || message.includes('update status') || message.includes('change status')) &&
      !message.includes('intake') && !message.includes('vetting') && !message.includes('design') &&
      !message.includes('develop') && !message.includes('deploy')
    );

    const ehrAmbiguous = (
      (message.includes('design session') || message.includes('schedule') || message.includes('validators')) &&
      !message.includes('cerner') && !message.includes('epic')
    );

    const whatNextAmbiguous = (
      (message.includes('what do i do') || message.includes('what next') || message.includes('next step')) &&
      !message.includes('intake') && !message.includes('vetting') && !message.includes('design')
    );

    const whereInSpwAmbiguous = (
      (message.includes('where') && message.includes('spw')) &&
      !message.includes('demand') && !message.includes('feature')
    );

    return phaseAmbiguous || ehrAmbiguous || whatNextAmbiguous || whereInSpwAmbiguous;
  }

  function handleDisambiguation(message: string): string {
    // Handle fuzzy term "design"
    if (message.includes('design') && !message.includes('phase') && !message.includes('session') &&
        !message.includes('document') && !message.includes('review') && !message.includes('participant')) {
      const hasVerb = message.includes('schedule') || message.includes('complete') || message.includes('start') || message.includes('finish');
      if (hasVerb) {
        return `**"Design" can mean different things!**\n\nAre you asking about:\n• Design phase (the governance phase after Prioritization)\n• Design sessions (meetings to gather input)\n• Design documentation (Design Document or Epic Opt Form)\n• Design Review Call (governance meeting to approve design)\n• Design Participants (people invited to provide input)\n\nWhich one are you asking about?`;
      }
    }

    // Handle fuzzy term "status"
    if ((message.includes('status') || message.includes('update status') || message.includes('change status')) &&
        !message.includes('intake') && !message.includes('vetting') && !message.includes('design') &&
        !message.includes('develop') && !message.includes('deploy')) {
      return `**Status means different things in different phases!**\n\nTo help you, I need to know:\n\n**Which phase is your request in?**\n• Intake (status: New → Approved)\n• Vetting (status: New → Ready for Agenda → Complete)\n• Prioritization (status: New → Ready for Agenda → Complete)\n• Define (status: New → Ready for Agenda → Approved/Dismissed)\n• Design (status: New → Resources Needed → In Design → Ready for Agenda → Complete)\n• Develop (IT build phase)\n• Deploy (Production release phase)\n\n**Or tell me your current status value** and I'll explain what it means!`;
    }

    // Handle "Ready for Agenda" ambiguity
    if (message.includes('ready for agenda')) {
      const hasPhase = message.includes('vetting') || message.includes('prioritization') || message.includes('design') || message.includes('define');
      if (!hasPhase) {
        return `**"Ready for Agenda" appears in multiple phases!**\n\nWhich governance meeting are you preparing for?\n\n• **PeriSCOPE** (Vetting phase) - Initial review of request\n• **SCOPE** (Prioritization phase) - Effort scoring and priority ranking\n• **Design Review Call** (Design phase - Cerner) - Approve technical design\n• **Epic Refinement** (Design phase - Epic) - Plan design sessions\n• **Clinical Service Line Meeting** (Define phase) - Clinical sponsorship\n\nWhich meeting are you targeting?`;
      }
    }

    // Handle "complete" ambiguity
    if (message.includes('complete') && !message.includes('incomplete')) {
      const isQuestion = message.includes('how') || message.includes('when') || message.includes('what');
      if (isQuestion && !message.includes('field') && !message.includes('design') && !message.includes('validation')) {
        return `**"Complete" could mean several things!**\n\nAre you asking about:\n• Updating status to "Complete" (closes a task)\n• Completing all required fields in a form\n• Marking "Design is complete" during Design phase\n• Finishing validation testing\n• Completing effort scoring\n\nWhat are you trying to complete?`;
      }
    }

    // Handle "approved" ambiguity
    if (message.includes('approved') && !message.includes('intake') && !message.includes('define') && !message.includes('design review')) {
      return `**"Approved" status appears in multiple phases!**\n\nWhich approval are you asking about?\n\n• **Intake Approved** - System Leader approves intake to proceed to Vetting\n• **Define Approved** - Clinical Service Line approves request\n• **Design Approved** - Design Review Committee approves technical design\n• **RTasks Approved** (Epic only) - Epic Process Owners approve change\n\nWhich phase are you in?`;
    }

    // Handle "validator" ambiguity
    if (message.includes('validator') && !message.includes('select') && !message.includes('who should')) {
      const hasField = message.includes('field') || message.includes('ecisa') || message.includes('careb');
      if (!hasField && !message.includes('cerner') && !message.includes('epic')) {
        return needTwoClarifications(
          'What phase are you in (Design for selecting validators, or Develop for coordinating validation)?',
          'Is this Cerner (2 validator fields) or Epic (1 validator field)?'
        );
      }
    }

    // Handle "participants" ambiguity
    if (message.includes('participant') && !message.includes('design')) {
      return handleComplexCrossReference(
        'Design Participants are regional informaticists added during Design phase who provide input during design sessions',
        'Some of those same people often become Validators during the Develop phase to test the build. Are you asking about adding Design Participants or coordinating with Validators?'
      );
    }

    // Handle "documentation" ambiguity
    if (message.includes('documentation') || (message.includes('document') && !message.includes('design document'))) {
      const hasPhase = message.includes('intake') || message.includes('design') || message.includes('develop');
      if (!hasPhase) {
        return `**Different documentation is required in each phase:**\n\n**Intake Phase:**\n• Intake Slides (from template)\n• SCI Workbook\n• Intake Form\n\n**Design Phase:**\n• Design Document (Cerner) or Epic Opt Form (Epic)\n• Design session notes\n\n**Develop Phase:**\n• Change Communication (Cerner only)\n• Validation results\n\n**All phases**: Store documents in Google Drive DMD folder\n\nWhich documentation are you asking about?`;
      }
    }

    // Handle "agenda" ambiguity
    if (message.includes('agenda') && !message.includes('periscope') && !message.includes('scope') &&
        !message.includes('design review') && !message.includes('refinement')) {
      return `**Multiple governance meetings have agendas:**\n\n• **PeriSCOPE** (Vetting) - CM PgM adds after System Leader approval\n• **SCOPE** (Prioritization) - CM PgM adds after effort scoring complete\n• **Design Review Call** (Cerner Design) - CM PgM adds after design ready\n• **Epic Refinement** (Epic Design) - Process Owners add automatically\n• **Clinical Service Line Meeting** (Define) - You secure agenda time\n\nWhich meeting are you asking about?`;
    }

    // Handle "Google Drive" questions
    if ((message.includes('google drive') || message.includes('folder')) && !message.includes('create') && !message.includes('rename')) {
      return offerAlternative(
        'which specific folder action you need',
        'Tell me what phase you\'re in, and I\'ll tell you which folder to use and what to put there. Or are you asking about creating the initial folder structure (Intake) or renaming it after getting a DMD number?'
      );
    }

    // Handle EHR-specific divergence - Change Communication
    if (message.includes('change communication') || message.includes('change comm')) {
      const hasEhr = message.includes('cerner') || message.includes('epic');
      if (!hasEhr) {
        return `**Change Communication is EHR-specific!**\n\n**Cerner**: You (SCI) create Change Communication document during Develop phase\n• Use template from shared folder\n• Create after non-prod validation\n• Attach to Google Drive\n\n**Epic**: Change communication handled through RTasks approval process\n• No separate document needed from SCI\n• Epic Process Owners manage\n\n**Which EHR system is your request for?**`;
      }
    }

    // Handle develop status flow ambiguity
    if (message.includes('develop') && (message.includes('status') || message.includes('what comes next')) &&
        !message.includes('cerner') && !message.includes('epic')) {
      return `**Develop phase status flow differs by EHR:**\n\n**Cerner**:\nResources Needed → Assigned → Building → Testing → Validated Successfully Non Prod → Ready for Release Planning\n\n**Epic**:\nAssigned → Building → Testing → Validated Successfully Non Prod → Pending Approval → Ready for Release Planning\n\n**Key difference**: Epic has "Pending Approval" (RTasks) that Cerner doesn't\n\n**Which EHR is your request?**`;
    }

    // Handle deploy status flow ambiguity
    if (message.includes('deploy') && (message.includes('status') || message.includes('what comes next')) &&
        !message.includes('cerner') && !message.includes('epic')) {
      return `**Deploy phase status flow differs by EHR:**\n\n**Cerner**:\nRelease Planning → Release Assigned → Building → Testing → Validated Successfully Prod\n\n**Epic**:\nRelease Planning → Assigned Release → Building in Prod → Prod Validation → Validated Successfully Prod\n\n**Key difference**: Slightly different terminology for same concepts\n\n**Which EHR is your request?**`;
    }

    // Original disambiguation for basic questions
    if ((message.includes('who updates') || message.includes('change status')) &&
        !message.includes('intake') && !message.includes('vetting') && !message.includes('design')) {
      return `**I'd like to help with status updates!**\n\nTo give you the most accurate answer, I need to know:\n\n**Which phase is your request currently in?**\n• Intake\n• Vetting\n• Prioritization\n• Define\n• Design\n• Develop\n• Deploy\n\nOr tell me: **What's your current status showing in SPW?**\n\nStatus updates are done by different people depending on the phase!`;
    }

    if ((message.includes('design session') || message.includes('schedule')) &&
        !message.includes('cerner') && !message.includes('epic') && !message.includes('define')) {
      return needOneClarification('Is this for Cerner or Epic? The scheduling process differs by EHR.');
    }

    if ((message.includes('what do i do') || message.includes('what next') || message.includes('next step')) &&
        !message.includes('intake') && !message.includes('vetting')) {
      return `**Happy to guide your next steps!**\n\nTo give you the right guidance, I need to know:\n\n**What phase is your request currently in?**\n• Intake (still drafting)\n• Vetting (PeriSCOPE)\n• Prioritization (SCOPE)\n• Define (Clinical Service Line review)\n• Design (design sessions)\n• Develop (IT building)\n• Deploy (releasing to prod)\n\n**Or**: What's the current status showing in SPW?\n\nEach phase has different next steps!`;
    }

    if ((message.includes('where') && message.includes('spw')) &&
        !message.includes('demand') && !message.includes('feature')) {
      return `**I can help you find things in SPW!**\n\nTo point you to the right place, I need to know:\n\n**Are you looking for:**\n• A Demand (request going through governance: Intake → Design)\n• A Feature (build in progress: Develop → Deploy)\n\n**Tip**: \n• Demands show phases: Intake, Vetting, Prioritization, Define, Design\n• Features show phases: Develop, Deploy`;
    }

    return '';
  }

  // Conversational response templates for natural interactions
  function needOneClarification(question: string): string {
    return `I can help with that. Quick question: ${question}`;
  }

  function needTwoClarifications(question1: string, question2: string): string {
    return `I can help with that. Two quick questions: ${question1} and ${question2}`;
  }

  function makeInference(inference: string): string {
    return `It sounds like ${inference}. Is that right?`;
  }

  function partialAnswerWithCaveat(generalAnswer: string, variable: string, clarifyingQuestion: string): string {
    return `Here's the general process: ${generalAnswer}. However, the exact steps depend on ${variable}. Can you tell me ${clarifyingQuestion}?`;
  }

  function handleFrustration(briefAnswer: string, keyQuestion: string): string {
    return `I understand you want to move quickly. ${briefAnswer}. To give you the precise instructions, I just need to know: ${keyQuestion}`;
  }

  function helpUserDiscover(guidance: string): string {
    return `No problem! Let's figure it out together. ${guidance}`;
  }

  function handleContradiction(rephrasedQuestion: string): string {
    return `I'm seeing some information that doesn't quite match up. Let me ask this differently: ${rephrasedQuestion}`;
  }

  function handleComplexCrossReference(area1: string, area2: string): string {
    return `This touches on multiple areas. Let me break it down: ${area1}. Additionally, ${area2}. Does that help, or do you need more detail on a specific part?`;
  }

  function offerAlternative(variable: string, alternativeMethod: string): string {
    return `If you're not sure about ${variable}, another way to approach this is: ${alternativeMethod}`;
  }

  function inferPhaseFromContext(message: string): { phase: string; confidence: string; reasoning: string } | null {
    // Strong context clues that indicate specific phases
    if (message.includes('periscope')) {
      return { phase: 'Vetting', confidence: 'high', reasoning: 'PeriSCOPE is the Vetting meeting' };
    }
    if (message.includes('scope') && !message.includes('periscope')) {
      return { phase: 'Prioritization', confidence: 'high', reasoning: 'SCOPE is the Prioritization meeting' };
    }
    if (message.includes('effort scoring') || message.includes('effort score')) {
      return { phase: 'Prioritization', confidence: 'high', reasoning: 'Effort scoring happens in Prioritization' };
    }
    if (message.includes('design sessions') || message.includes('design session')) {
      return { phase: 'Design', confidence: 'high', reasoning: 'Design sessions happen in Design phase' };
    }
    if (message.includes('change communication') || message.includes('change comm')) {
      return { phase: 'Develop', confidence: 'high', reasoning: 'Change Communication created in Develop phase (Cerner)' };
    }
    if (message.includes('rtasks') || message.includes('r tasks')) {
      return { phase: 'Develop', confidence: 'high', reasoning: 'RTasks approval happens in Epic Develop phase' };
    }
    if (message.includes('prod validation') || message.includes('production validation')) {
      return { phase: 'Deploy', confidence: 'high', reasoning: 'Prod validation happens in Deploy phase' };
    }

    // Moderate confidence inferences from user language
    if (message.includes('just submitted') || message.includes('just created')) {
      return { phase: 'Intake', confidence: 'medium', reasoning: 'Recently submitted suggests Intake phase' };
    }
    if (message.includes('designing') || message.includes('working on design')) {
      return { phase: 'Design', confidence: 'medium', reasoning: 'Designing suggests Design phase' };
    }
    if (message.includes('building') || message.includes('it is building')) {
      return { phase: 'Develop', confidence: 'medium', reasoning: 'Building suggests Develop phase' };
    }
    if (message.includes('testing') && !message.includes('design')) {
      return { phase: 'Develop or Deploy', confidence: 'medium', reasoning: 'Testing happens in both Develop (non-prod) and Deploy (prod)' };
    }
    if (message.includes('going live') || message.includes('go live')) {
      return { phase: 'Deploy', confidence: 'high', reasoning: 'Going live is the Deploy phase' };
    }
    if (message.includes('validators') && !message.includes('select')) {
      return { phase: 'Develop', confidence: 'medium', reasoning: 'Working with validators suggests Develop phase' };
    }
    if (message.includes('waiting for approval') || message.includes('needs approval')) {
      return { phase: 'Multiple', confidence: 'low', reasoning: 'Approval needed in multiple phases - need clarification' };
    }

    return null;
  }

  function generateContextualResponse(message: string, inference: { phase: string; confidence: string; reasoning: string }): string {
    if (inference.confidence === 'high') {
      if (inference.phase === 'Vetting') {
        const phaseInfo = `You're in the **Vetting Phase (PeriSCOPE Review)**.\n\n**What happens**: CM PgM reviews your intake for completeness before PeriSCOPE meeting\n\n**Your role**: Wait for CM PgM review; respond to any questions\n\n**Status flow**: New → Ready for Agenda → Complete\n\n**Next**: After Complete, moves to Prioritization (SCOPE)`;
        return makeInference('you\'re asking about the Vetting phase (PeriSCOPE)') + '\n\n' + phaseInfo;
      }

      if (inference.phase === 'Prioritization') {
        const phaseInfo = `You're in the **Prioritization Phase (SCOPE)**.\n\n**What happens**: Effort scoring, then SCOPE meeting assigns priority ranking\n\n**Your role**: Complete effort scoring with IT input\n\n**Status flow**: New → Ready for Agenda → Complete\n\n**Next**: After Complete, may go to Define (if clinical sponsorship needed) or directly to Design`;
        return makeInference('you\'re asking about the Prioritization phase (SCOPE)') + '\n\n' + phaseInfo;
      }

      if (inference.phase === 'Design') {
        const phaseInfo = `You're in the **Design Phase**.\n\n**What happens**: Design sessions scheduled, design documented, design approved\n\n**Your role**: Lead design sessions, document decisions, present at Design Review\n\n**Process differs by EHR**: Cerner vs Epic have different scheduling\n\n**Next**: After approval, Feature created and moves to Develop`;
        return makeInference('you\'re in the Design phase') + '\n\n' + phaseInfo + '\n\n' + needOneClarification('Which EHR system is this for?');
      }

      if (inference.phase === 'Develop') {
        const phaseInfo = `You have a **Feature in Develop Phase (IT Build)**.\n\n**What happens**: IT builds enhancement, you validate in non-prod\n\n**Your role**: Test when notified, document validation results, create Change Communication (Cerner only)\n\n**Status includes**: Testing → Validated Successfully Non Prod → Ready for Release Planning\n\n**Next**: After non-prod validation passes, moves to Deploy (Release Planning)`;
        return makeInference('you\'re in the Develop phase with IT building') + '\n\n' + phaseInfo;
      }

      if (inference.phase === 'Deploy') {
        const phaseInfo = `You're in the **Deploy Phase (Production Release)**.\n\n**What happens**: Enhancement released to production, validated in prod\n\n**Your role**: Validate in production when notified\n\n**Status flow**: Release Planning → Release Assigned → Building → Testing → Validated Successfully Prod\n\n**Completion**: After prod validation successful, request closes`;
        return makeInference('you\'re in the Deploy phase (going to production)') + '\n\n' + phaseInfo;
      }
    }

    if (inference.confidence === 'medium') {
      if (message.includes('just submitted')) {
        const guidance = `Since you just submitted, here are your next Intake steps:\n1. Get DMD number from email confirmation\n2. Rename Google Drive folder: "DMD####### Title"\n3. Go to SPW → Draft - User Requests\n4. Complete required fields\n5. Update status to "Approved" after System Leader approval\n\nThis triggers: Vetting task opens for PeriSCOPE review`;
        return makeInference('you\'re in the Intake phase') + '\n\n' + guidance + '\n\n' + needOneClarification('Have you updated to Approved in SPW yet?');
      }

      if (message.includes('designing') || message.includes('working on design')) {
        const options = `**Which applies to you?**\n• Scheduling design sessions (Status: Resources Needed)\n• Conducting design sessions (Status: In Design)\n• Waiting for design approval (Status: Ready for Agenda)`;
        return makeInference('you\'re in the Design phase') + '\n\n' + options + '\n\n' + needOneClarification('Is this for Cerner or Epic? The process differs.');
      }

      if (message.includes('building') || message.includes('it is building')) {
        const statusOptions = `**Current status might be**:\n• Assigned (IT just received)\n• Building (IT actively working)\n• Testing (ready for you to validate)`;
        return makeInference('IT is building, so you have a Feature in Develop phase') + '\n\n' + statusOptions + '\n\n' + needOneClarification('What\'s your current status, or what do you need help with?');
      }

      if (message.includes('testing')) {
        const testingInfo = `**Non-prod testing** (Develop phase):\n• You and validators test in test environment\n• Status: Testing → Validated Successfully Non Prod\n\n**Prod testing** (Deploy phase):\n• You validate after production release\n• Status: Testing → Validated Successfully Prod`;
        return partialAnswerWithCaveat(
          'Testing happens in both Develop and Deploy phases',
          'which environment',
          'which environment are you testing in? Non-prod or Production?'
        ) + '\n\n' + testingInfo;
      }

      if (message.includes('validators')) {
        const validatorTasks = `**Are you:**\n• Selecting validators (done during Design, before Feature created)\n• Coordinating validation (validators testing in non-prod)\n• Documenting validation results`;
        return makeInference('you\'re working with validators in the Develop phase') + '\n\n' + validatorTasks + '\n\n' + needOneClarification('Which EHR system? (Cerner has 2 validator fields, Epic has 1)');
      }
    }

    if (inference.confidence === 'low' || inference.phase === 'Multiple') {
      if (message.includes('waiting for approval')) {
        const approvalTypes = `• **System Leader approval** (Intake) - You update to Approved\n• **PeriSCOPE approval** (Vetting) - CM PgM manages\n• **Clinical Service Line approval** (Define) - You present and coordinate\n• **Design approval** (Design) - Design Review Committee approves\n• **RTasks approval** (Epic Develop) - Epic Process Owners approve`;
        return partialAnswerWithCaveat(
          'Approval happens at multiple points in the governance process',
          'which specific approval',
          'which approval are you waiting for, or what\'s your current phase and status?'
        ) + '\n\n' + approvalTypes;
      }
    }

    return '';
  }

  function isQueryAmbiguous(message: string): boolean {
    // Check if query lacks necessary context for a complete answer
    const ambiguousTerms = ['status', 'design', 'validator', 'approved', 'complete', 'ready for agenda'];
    const hasAmbiguousTerm = ambiguousTerms.some(term => message.includes(term));

    if (!hasAmbiguousTerm) return false;

    // Check if user provided disambiguating context
    const hasPhaseContext = message.includes('intake') || message.includes('vetting') ||
                           message.includes('prioritization') || message.includes('define') ||
                           message.includes('design') || message.includes('develop') ||
                           message.includes('deploy');

    const hasEhrContext = message.includes('cerner') || message.includes('epic');

    // If ambiguous term but has context, not ambiguous
    if (message.includes('status') && hasPhaseContext) return false;
    if (message.includes('design') && (hasEhrContext || message.includes('session') || message.includes('document'))) return false;
    if (message.includes('validator') && hasEhrContext) return false;

    return hasAmbiguousTerm;
  }

  function provideDirectAnswer(message: string): string | null {
    // Provide direct answers when query is unambiguous

    // SCOPE-related questions
    if ((message.includes('who') && message.includes('scope')) ||
        (message.includes('who') && message.includes('responsible') && message.includes('scope'))) {
      return `**Who sends items to SCOPE**: CM PgM (Change Management Program Manager)\n\n**After PeriSCOPE**: CM PgM opens Prioritization task\n\n**Process**:\n1. CM PgM sends request to IT for effort scoring\n2. You (SCI) complete effort scoring with IT input\n3. CM PgM updates status to "Ready for Agenda"\n4. CM PgM presents at SCOPE meeting\n5. CM PgM documents priority ranking\n\nYou don't send it - CM PgM manages the entire Prioritization phase.`;
    }

    if ((message.includes('what') && message.includes('after scope')) ||
        (message.includes('what happens') && message.includes('scope'))) {
      return `**After SCOPE (Prioritization Complete)**:\n\n**Two possible paths**:\n\n**Path 1 - Clinical Sponsorship Needed**:\n• Define task opens (Clinical Service Line approval)\n• You present at Service Line Committee\n• After Define Complete → Design opens\n\n**Path 2 - No Clinical Sponsorship**:\n• Design task opens directly\n• You schedule design sessions\n• Proceed to design work\n\n**Status**: CM PgM updates Prioritization to "Complete" after SCOPE meeting\n\n**Timeline**: Design typically opens within 1-2 weeks after SCOPE`;
    }

    if (message.includes('intake') && message.includes('status') && !message.includes('approved')) {
      return `**Intake status flow**: New → Approved\n\n**Who updates**: You (SCI) update to Approved after System Leader approval\n\n**When to update**: After System Leader reviews and approves intake content\n\n**This triggers**: Opens Vetting task for PeriSCOPE review`;
    }

    if (message.includes('vetting') && message.includes('status')) {
      return `**Vetting status flow**: New → Ready for Agenda → Complete\n\n**Who updates**: CM PgM manages all status changes\n\n**Status meanings**:\n• New - CM PgM reviewing for completeness\n• Ready for Agenda - Added to PeriSCOPE meeting\n• Complete - PeriSCOPE decision documented\n\n**After Complete**: Opens Prioritization task (and Define if clinical sponsorship needed)`;
    }

    if (message.includes('cerner') && message.includes('design session')) {
      return `**Cerner Design Session Scheduling**:\n\n**Who schedules**: You (SCI) schedule after 2-week participant window closes\n\n**Process**:\n1. Open your Demand in SPW\n2. Add Design Participants (regional informaticists)\n3. Wait 2 weeks for them to review intake materials\n4. Schedule sessions with participants\n5. Update status to "In Design" when sessions begin\n\n**Duration**: 2-8 weeks depending on complexity`;
    }

    if (message.includes('epic') && message.includes('design session')) {
      return `**Epic Design Session Scheduling**:\n\n**Who schedules**: Process Owner or Epic Engineer (based on request type)\n\n**Process**:\n1. After Prioritization Complete, CM PgM opens Design task\n2. Request goes to Epic Refinement\n3. Process Owner/Engineer determines approach\n4. They schedule design sessions if needed\n5. You (SCI) participate and document decisions\n\n**Your role**: Collaborate and document, but don't schedule`;
    }

    return null;
  }

  function provideFallbackAnswer(message: string): string {
    // After max clarification attempts, provide most common scenario
    if (message.includes('status')) {
      return `**Most common scenario - Status Updates**:\n\nGenerally, status updates are done by:\n• **You (SCI)**: Intake (update to Approved)\n• **CM PgM**: Vetting, Prioritization, Design governance phases\n• **IT**: Develop and Deploy (Feature status)\n\n**To update status**: Open your task in SPW → Update Status field → Save\n\n**Note**: The exact status flow varies by phase. If you need specific guidance, please tell me which phase you're in or paste your current status value.`;
    }

    if (message.includes('design')) {
      return `**Most common scenario - Design Phase**:\n\nDesign typically involves:\n1. **Scheduling design sessions** with regional informaticists\n2. **Conducting sessions** to gather input and make decisions\n3. **Documenting decisions** in Design Document or Epic Opt Form\n4. **Getting approval** at Design Review Call (Cerner) or Refinement (Epic)\n\n**Who schedules varies**: Cerner = You (SCI), Epic = Process Owner/Engineer\n\n**Note**: The exact process differs by EHR. For specific guidance, tell me if this is Cerner or Epic.`;
    }

    return `I want to give you the most accurate answer. Based on your question, the process can vary depending on context. Could you provide a bit more detail about:\n\n• What phase your request is currently in\n• Which EHR system (Cerner or Epic)\n• What you're trying to accomplish\n\nThis will help me give you precise, actionable guidance!`;
  }

  async function generateResponse(userMessage: string): Promise<string> {
    // ENHANCED SEARCH: Normalize and enrich the query
    const normalizedMessage = normalizeTerms(userMessage);
    const lowerMessage = normalizedMessage.toLowerCase();

    // Build conversation context
    const context = buildContext(chatHistory);

    // Extract keywords for relevance scoring
    const keywords = extractKeywords(normalizedMessage);
    const relevanceScore = calculateRelevance(normalizedMessage, keywords);

    if (!selectedProcess || processSteps.length === 0) {
      return "Hi! I'm Sophia, your EHR governance assistant. I'm still loading the process information. Please try again in a moment.";
    }

    if (!userProgress) {
      return `Hi! I'm Sophia. I'm here to help you navigate the ${selectedProcess.name}. Let me get your progress loaded first.`;
    }

    // CONTEXT AWARENESS: Apply context for follow-up questions
    let enrichedMessage = lowerMessage;
    if (isFollowUpQuestion(userMessage) && context.lastTopic) {
      enrichedMessage = applyContext(lowerMessage, context);
    }

    // CONTEXT HINTS: Add system or phase context if needed
    let contextHint = '';
    if (needsSystemContext(lowerMessage, context)) {
      contextHint = `\n\n💡 *Based on our discussion about ${context.recentSystems[0]}, I'm providing ${context.recentSystems[0]}-specific guidance.*`;
    } else if (needsPhaseContext(lowerMessage, context)) {
      contextHint = `\n\n💡 *Continuing from our discussion about ${context.recentPhases[0]} phase.*`;
    }

    // FUZZY MATCHING: Try to match meeting names, roles, and statuses
    const meetingMatch = fuzzyMatch(lowerMessage, knowledgeBase.meetings, 0.7);
    const roleMatch = fuzzyMatch(lowerMessage, knowledgeBase.roles, 0.7);
    const statusMatch = fuzzyMatch(lowerMessage, knowledgeBase.statuses, 0.65);

    // If we found a fuzzy match, enhance the query
    if (meetingMatch) {
      enrichedMessage = enrichedMessage.replace(new RegExp(meetingMatch.match, 'gi'), meetingMatch.match);
    }

    // STEP 1: Check if we can provide a direct answer first (unambiguous query with specific question)
    const directAnswer = provideDirectAnswer(enrichedMessage);
    if (directAnswer) {
      setClarificationAttempts(0); // Reset counter on successful answer
      const suggestions = suggestRelatedTopics(keywords);
      const suggestionText = suggestions.length > 0
        ? `\n\n**Related questions you might have:**\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
        : '';
      return directAnswer + contextHint + suggestionText;
    }

    // STEP 2: Try to infer from context clues (only if not a specific question)
    const inference = inferPhaseFromContext(enrichedMessage);
    if (inference) {
      const contextualResponse = generateContextualResponse(enrichedMessage, inference);
      if (contextualResponse) {
        setClarificationAttempts(prev => prev + 1);
        const suggestions = suggestRelatedTopics(keywords);
        const suggestionText = suggestions.length > 0
          ? `\n\n**You might also want to know:**\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
          : '';
        return contextualResponse + contextHint + suggestionText;
      }
    }

    // STEP 3: Check if query is ambiguous and needs clarification
    const needsClarification = isQueryAmbiguous(lowerMessage);

    if (needsClarification && clarificationAttempts >= 2) {
      // Fallback: Provide most common scenario after 2 attempts
      const fallbackAnswer = provideFallbackAnswer(lowerMessage);
      setClarificationAttempts(0); // Reset counter
      return fallbackAnswer;
    }

    if (needsClarification && clarificationAttempts < 2) {
      // Enter disambiguation protocol
      const disambiguationResponse = handleDisambiguation(lowerMessage);
      if (disambiguationResponse) {
        setClarificationAttempts(prev => prev + 1);
        return disambiguationResponse;
      }
    }

    // STEP 4: If we got here, query is specific enough - provide knowledge base answer
    setClarificationAttempts(0); // Reset counter
    const currentStep = processSteps.find(s => s.step_number === userProgress.current_step);
    const nextStep = processSteps.find(s => s.step_number === userProgress.current_step + 1);

    if (lowerMessage.includes('intake phase') || (lowerMessage.includes('intake') && !lowerMessage.includes('field') && !lowerMessage.includes('form'))) {
      return `**Intake Phase (Draft State):**\n\n**Purpose**: Capture initial request and set up documentation\n\n**Primary Actor**: You (SCI)\n**Entry**: Identified need for EHR optimization\n**Exit**: System Leader approves → Status = Approved → Opens Vetting task\n\n**Key Steps**:\n1. Create Optimization Folder in Google Drive with subfolders:\n   • 01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout\n2. Create folder in System CI > System Policies/Initiatives\n3. Create copy of SCI Workbook in that folder\n4. Partner with System Leader to gather intake details\n5. Create Intake Slides from template → save in 01_Intake\n6. Complete & submit Intake Form in SPM (DO NOT "Save as Draft")\n7. Get DMD number → Rename folder to "DMD####### Title"\n8. Go to SPW > ALL - EHR System > Draft - User Requests\n9. Complete required SPW fields\n10. Update status to Approved after System Leader approval\n\n**Status Flow**: New → Approved\n\nNeed details on required fields or common issues?`;
    }


    if (lowerMessage.includes('spw') || lowerMessage.includes('workspace') || lowerMessage.includes('strategic planning')) {
      return `To access Strategic Planning Workspace:\n\n1. Launch IT Portal\n2. Select the Workspaces tab at the top\n3. Select Strategic Planning Workspace\n4. Click the Star icon to add it to your Favorites\n\nYou can view Demands separated by EHR, Region, System, and governance phases. Select the blue Demand link to see Parent Demands and task details.`;
    }

    if (lowerMessage.includes('dmnd') || lowerMessage.includes('demand number')) {
      return `After submitting your request, you'll receive a DMND number (e.g., DMND0000123). Use this number to:\n\n• Update your Google Drive folder name\n• Track your request in Strategic Planning Workspace\n• Reference in all communications about the request\n\nYou can find your requests in SPW > ALL - EHR System > relevant phase filter.`;
    }

    if (lowerMessage.includes('cerner') || lowerMessage.includes('epic') || lowerMessage.includes('meditech')) {
      return `The EHR governance process supports multiple systems:\n\n**Cerner**: Full design review process with Target Domains and Validators\n**Epic**: Uses Epic Optimization Form and Refinement Calls\n**Meditech**: May have system-specific requirements\n\nThe Design phase varies by EHR platform. Which platform are you working with? I can provide specific guidance.`;
      }

    if (lowerMessage.includes('vetting') || lowerMessage.includes('periscope')) {
      return `**Vetting Phase:**\n\n**Purpose**: Initial governance review for completeness, alignment, feasibility\n**Meeting**: PeriSCOPE\n\n**Primary Actor**: CM PgM\n**Entry**: Intake approved by System Leader\n**Exit**: PeriSCOPE decision documented\n\n**Key Steps**:\n1. CM PgM reviews Draft request for completeness\n2. CM PgM updates status to Ready for Agenda\n3. CM PgM presents at PeriSCOPE (SCI attends for questions)\n4. CM PgM documents decision\n5. CM PgM updates status based on outcome\n\n**Status Flow**:\n• New → Ready for Agenda (added to PeriSCOPE)\n• Ready for Agenda → Options:\n  - Ready for Prioritization (approved → opens Prioritization)\n  - Further Review Needed (more info → reopens Intake)\n  - Dismissed (rejected → closes request)\n\n**Clinical Sponsorship Trigger**: If "Clinical Sponsorship Required" = Yes, Define task also opens\n\nTypically takes 1-2 weeks.`;
    }

    if (lowerMessage.includes('prioritization') || lowerMessage.includes('scope') && !lowerMessage.includes('periscope')) {
      return `**Prioritization Phase:**\n\n**Purpose**: Rank priority, assign effort score, schedule for design\n**Meeting**: SCOPE\n\n**Primary Actor**: CM PgM\n**Supporting**: SCI + IT\n**Entry**: Vetting approved\n**Exit**: SCOPE decision, ranked priority assigned\n\n**Key Steps**:\n1. SCI + IT complete Effort Scoring in Prioritization task\n2. SCI updates status to Ready for Agenda (after both complete scoring)\n3. CM PgM adds to SCOPE agenda\n4. CM PgM documents ranked priority from SCOPE\n5. CM PgM updates status based on outcome\n\n**Status Flow**:\n• New → Ready for Agenda (SCI after effort scoring done)\n• Ready for Agenda → Options:\n  - Ready for Design (approved → opens Design)\n  - Further Review Needed (more info → reopens Intake)\n  - Dismissed (rejected → closes request)\n  - Needs Define (clinical review needed → opens Define)\n\n**Critical**: Don't update to Ready for Agenda until BOTH SCI and IT complete scoring\n\nTypically takes 1-2 weeks.`;
    }

    if (lowerMessage.includes('define phase') || lowerMessage.includes('clinical service line') || lowerMessage.includes('clinical sponsorship')) {
      return `**Define Phase (Optional):**\n\n**Purpose**: Obtain clinical service line approval/sponsorship\n**Trigger**: Clinical Sponsorship Required = Yes\n\n**Primary Actor**: You (SCI)\n**Supporting**: Clinical Service Line leader, CM PgM\n**Entry**: Clinical Sponsorship Required = Yes (set in Vetting/Prioritization)\n**Exit**: Clinical Service Line approves → Status = Approved\n\n**Key Steps**:\n1. CM PgM enters Primary Define Body (which Clinical Service Line)\n2. You secure agenda time with Clinical Service Line\n3. You enter Primary Define Agenda Date\n4. You present to Clinical Service Line\n5. You enter Primary Define Approval Date\n6. You update status to Approved (only after FINAL approval if multiple bodies)\n\n**Status Flow**:\n• New → In Progress (working to secure agenda)\n• In Progress → Options:\n  - Approved (Clinical Service Line approves → proceed to Design)\n  - Further Review Needed (more info → reopens Intake)\n  - Dismissed (rejected → closes request)\n\n**Note**: If multiple approval bodies needed, only update to Approved after FINAL one approves\n\nTypically takes 2-4 weeks.`;
    }

    // Design phase questions
    if (lowerMessage.includes('design session') || lowerMessage.includes('schedule design')) {
      if (lowerMessage.includes('cerner')) {
        return `**Cerner Design Session Scheduling (You schedule these):**\n\n• Schedule AFTER the 2-week "Resources Needed" window closes\n• Avoid Tuesday/Wednesday\n• Minimum 2 weeks notice (unless urgent)\n• Invite all Design Participants who added themselves\n• You lead the design discussion\n• Document decisions in design docs\n\nAfter Resources Needed period, participants will have added themselves to the task.`;
      } else if (lowerMessage.includes('epic')) {
        return `**Epic Design Session Scheduling:**\n\n**Multi-team builds**: Process Owner schedules initial session, then hands to Primary Applications Engineer for additional sessions\n\n**Single application**: Engineer schedules all sessions\n\n**You (SCI)**: Lead the design discussion regardless of who schedules\n\nDocument all decisions in Epic Opt Form.`;
      }
      return `**Design Session Scheduling:**\n\n**Cerner**: You (SCI) schedule after 2-week Resources Needed window. Avoid Tue/Wed, min 2 weeks notice.\n\n**Epic**: Process Owner or Engineer schedules. Multi-team: PO does initial, Engineer continues. Single-app: Engineer does all.\n\n**Your role**: Lead design discussion, document decisions.\n\nWhich EHR platform?`;
    }

    if (lowerMessage.includes('validator') || lowerMessage.includes('validation')) {
      if (lowerMessage.includes('who') || lowerMessage.includes('select') || lowerMessage.includes('choose')) {
        return `**Selecting Validators:**\n\n**When**: During Design phase\n**Who decides**: You (Primary Informaticist)\n**Criteria**: Informaticists with:\n• Access to affected EHR environment/domain\n• Knowledge of the workflow being changed\n• Ability to test thoroughly\n\n**Cerner**: Need validators for each Target Domain (ECISA, CAREB)\n**Epic**: Can have multiple validators\n\n**They validate**: Non-prod (Testing status) AND Prod (Prod Validation status)`;
      }
      if (lowerMessage.includes('final') || lowerMessage.includes('who updates')) {
        return `**Final Validator:**\n\n**Who**: The LAST person to complete validation among all listed validators\n\n**Their job**: Update status after documenting their validation:\n• Non-prod: "Validated Successfully Non Prod"\n• Prod: "Validated Successfully Prod"\n\n**All validators** document in Work Notes, but only the final one updates status.`;
      }
      return `**Validation Process:**\n\n1. **Selection**: You choose validators during Design\n2. **Notification**: Auto-email when status = Testing (or Prod Validation)\n3. **Testing**: Validators test in non-prod, then prod\n4. **Documentation**: All validators document in Work Notes\n5. **Status**: Final validator (last to finish) updates status\n\n**Two rounds**: Non-prod validation, then Prod validation\n\nNeed specifics about selecting validators or who's the final validator?`;
    }

    if (lowerMessage.includes('resources needed') || lowerMessage.includes('design participant')) {
      return `**Resources Needed Status (Cerner):**\n\n**What it means**: 2-week window for people to add themselves as design participants\n\n**Who adds themselves**:\n• Regional CIs: Add themselves to their region's Design Participants section\n• IT Leaders: Add Application Group and Assignee\n\n**Your role**: Wait for 2-week window to close, then schedule design sessions\n\n**Can't see Design Participants section?**\n• Ensure status = "Resources Needed"\n• Switch view from "Default" to "EHR"\n• Contact CM PgM if still missing\n\n**No one signing up?** Follow up with regional leadership or key stakeholders directly.`;
    }

    if (lowerMessage.includes('who does') || lowerMessage.includes('responsible for') || lowerMessage.includes('my role') || (lowerMessage.includes('role') && !lowerMessage.includes('service role'))) {
      if (lowerMessage.includes('intake')) {
        return `**Intake Phase Roles:**\n\n**SCI (You)**: PRIMARY\n• Create folders in Google Drive\n• Complete Intake Form in SPM\n• Create Intake Slides\n• Update SPW fields\n• Partner with System Leader\n• Document in SCI Workbook\n• **Decision**: Update status to Approved\n\n**System Leader**: APPROVER\n• Validate scope/priority\n• Provide business context\n• Request clarifications\n• **Decision**: Approve to move to Vetting\n\n**CM PgM**: REVIEWER\n• Review for completeness`;
      }

      if (lowerMessage.includes('vetting') || lowerMessage.includes('periscope')) {
        return `**Vetting Phase Roles:**\n\n**CM PgM**: PRIMARY\n• Manage PeriSCOPE meeting\n• Present requests\n• Coordinate reviews\n• Update status based on outcome\n• Document decisions\n• **Decision**: Determine Vetting outcome\n\n**SCI (You)**: SUPPORTING\n• Attend PeriSCOPE\n• Provide clarifications when asked\n\n**EHR Readiness Team**: SUPPORTING\n• Participate in PeriSCOPE review`;
      }

      if (lowerMessage.includes('prioritization') || lowerMessage.includes('scope')) {
        return `**Prioritization Phase Roles:**\n\n**CM PgM**: PRIMARY\n• Manage SCOPE meeting\n• Add requests to agenda\n• Document ranked priority\n• Update status based on outcome\n• **Decision**: Determine Prioritization outcome\n\n**SCI (You)**: SUPPORTING\n• Complete effort scoring\n• Update to Ready for Agenda (after scoring)\n\n**IT**: SUPPORTING\n• Complete effort scoring`;
      }

      if (lowerMessage.includes('define')) {
        return `**Define Phase Roles:**\n\n**SCI (You)**: PRIMARY\n• Secure agenda time with Clinical Service Line\n• Enter Primary Define Agenda Date\n• Present to Clinical Service Line\n• Enter Primary Define Approval Date\n• **Decision**: Update status to Approved\n\n**CM PgM**: SUPPORTING\n• Enter Primary Define Body\n\n**Clinical Service Line**: APPROVER\n• Review and approve/reject request\n• **Decision**: Approve or reject`;
      }

      if (lowerMessage.includes('design')) {
        return `**Design Phase Roles:**\n\n**Cerner:**\n• **SCI (You)**: Lead sessions, schedule, complete fields, update status\n• **CM PgM**: Manage Design Review Call, coordinate, update to Complete\n• **Regional CI**: Add as participants, provide feedback\n• **IT**: Add Application Groups & Assignees\n\n**Epic:**\n• **SCI (You)**: Lead discussion, document feedback, complete fields, update status\n• **Epic Process Owner**: Add to Refinement, add participants, schedule (multi-team)\n• **Engineer**: Schedule sessions (single-app or continuation)\n• **IT**: Update Application Groups & Assignees during Bundle Planning`;
      }

      if (lowerMessage.includes('develop') || lowerMessage.includes('build')) {
        return `**Develop Phase Roles:**\n\n**Cerner:**\n• **IT**: Build, update status, finalize resources\n• **SCI (You)**: Create Change Communication, update Change Communication Phase\n• **Validators**: Test in non-prod, document in Work Notes, final validator updates status to "Validated Successfully Non Prod"\n\n**Epic:**\n• **IT**: Build, update status, set dates\n• **Primary Assignee**: Update Estimated Size & Planned Delivery Date\n• **Analyst**: Create RTasks for approvals\n• **Approvers**: Complete RTasks\n• **Validators**: Test in non-prod, document results, final validator updates status to "Validated Successfully Non Prod"\n• **SCI (You)**: Update Ready for Deployment Date`;
      }

      if (lowerMessage.includes('deploy') || lowerMessage.includes('release')) {
        return `**Deploy Phase Roles:**\n\n**Cerner:**\n• **IT**: Release to prod, update status\n• **Validators**: Test in prod, document results, final validator updates status to "Validated Successfully Prod"\n\n**Epic:**\n• **IT**: Release to prod, update status\n• **Validators**: Test in prod, document results, final validator updates status to "Validated Successfully Prod"`;
      }

      return `**Key Roles Across All Phases:**\n\n**SCI (You)**: Primary lead for intake, design, documentation\n**CM PgM**: Manages governance meetings (PeriSCOPE, SCOPE, Design Review)\n**IT**: Technical build, resources, deployment\n**Validators**: Test in non-prod and prod, document results\n**System Leader**: Business approval (Intake)\n**Clinical Service Line**: Clinical approval (Define, if needed)\n**Regional CI**: Design participation and feedback\n\nAsk about a specific phase for detailed role breakdown!`;
    }

    if (lowerMessage.includes('governance templated') || lowerMessage.includes('expedited') || lowerMessage.includes('skip vetting')) {
      return `**Governance Templated Path** (expedited):\n\n**Eligible requests**:\n• Pharmacy requests (unless leader requires full governance)\n• Meets CSH Triage Guidelines (Cerner)\n• On EPSR list (Epic)\n\n**Phases**: Intake → Design → Develop → Deploy\n**Skips**: Vetting and Prioritization\n\n**Standard path** goes: Intake → Vetting → Prioritization → (Define) → Design → Develop → Deploy\n\nMost requests use the standard Full Governance path.`;
    }

    if (lowerMessage.includes('change communication') || lowerMessage.includes('change comm')) {
      return `**Change Communication (Cerner only):**\n\n**Who creates**: You (Primary Informaticist)\n**When**: During Develop phase, before Release Planning\n**Template**: Available in shared templates folder\n**Storage**: Attach to DMD folder in Google Drive\n\n**In SPW**: Update "Change Communication Phase" field:\n• "In Development" - while working on it\n• "Attached" - when complete and attached\n• "None Needed" - if not required\n\n**Epic**: Typically doesn't require separate Change Communication\n\nNeed help accessing templates? Contact CM PgM for permissions.`;
    }

    if (lowerMessage.includes('feature') || lowerMessage.includes('feature ticket')) {
      return `**Feature Ticket:**\n\n**Created**: After Design approved\n**Location**: SPW > O&M Optimization section\n**Purpose**: Tracks the build, testing, and deployment\n\n**Develop phase** (Feature):\n• IT builds in non-prod\n• Validators test (non-prod)\n• Status: Resources Needed → Assigned → Building → Testing → Validated Successfully Non Prod\n\n**Deploy phase** (Feature):\n• IT releases to prod\n• Validators test (prod)\n• Status: Release Planning → Release Assigned → Building → Testing → Validated Successfully Prod\n\n**Your involvement**: Primarily validation and monitoring progress`;
    }

    if (lowerMessage.includes('short description') || lowerMessage.includes('title field')) {
      return `**Short Description Field:**\n\n**Purpose**: Title appearing throughout SPM/SPW\n**Limit**: 100 characters\n**Format**: Policy/process/topic oriented\n\n**Good**: "System Valuables Policy Update"\n**Bad**: "Fix the thing in Epic"\n\n**Best Practice**: Include WHAT's changing, not just the application\n\nThis becomes your request's identifier across all systems!`;
    }

    if (lowerMessage.includes('ehr scope') || lowerMessage.includes('system scope')) {
      return `**EHR Scope Field:**\n\n**Purpose**: Which EHR system(s) affected\n\n**Options**:\n• **Cerner** - Cerner only\n• **Epic** - Epic only\n• **Meditech** - Meditech only\n• **System** - Cerner + Epic\n• **System w/ Meditech** - Cerner + Epic + Meditech\n\n**Impact**: System and System w/ Meditech create multiple Design tasks (one per EHR)\n\nChoose carefully - affects workflow and task creation!`;
    }

    if (lowerMessage.includes('governance type') || lowerMessage.includes('full governance vs')) {
      return `**Governance Type Field:**\n\n**Options**:\n• **Full Governance** (default) - Complete vetting/prioritization\n• **Governance Templated** (expedited) - Skips vetting/prioritization\n\n**Governance Templated Criteria**:\n• Pharmacy requests (unless leader approves exception)\n• Meets CSH Triage Guidelines (Cerner)\n• On EPSR list (Epic)\n\n**Impact**: Governance Templated goes directly to Design after Intake\n\nMost requests use Full Governance.`;
    }

    if (lowerMessage.includes('benefit score') || lowerMessage.includes('how to score')) {
      return `**Benefit Score Field:**\n\n**Purpose**: Quantify expected benefit for prioritization\n**When Required**: Leadership may require for certain requests\n\n**Components to Consider**:\n• Financial impact\n• Safety impact\n• Efficiency gain\n• User satisfaction\n• Strategic alignment\n\n**Best Practice**: If unsure, apply provisional score and flag for leader review\n**Documentation**: Detail reasoning in Intake Slides\n\nNot always required - check with your leader!`;
    }

    if (lowerMessage.includes('required by date') || lowerMessage.includes('deadline field')) {
      return `**Required by Date Field:**\n\n**Purpose**: Hard deadline if applicable\n\n**When to Use**:\n• Regulatory requirements\n• Contractual obligations\n• Critical dependencies\n\n**When to Leave Blank**:\n• No hard deadline\n• Driven by efficiency, safety, quality (document these in notes)\n\n**Format**: Specific date\n\nOnly use for true deadlines, not aspirational targets!`;
    }

    if (lowerMessage.includes('intake form') || lowerMessage.includes('required field') || lowerMessage.includes('intake field')) {
      return `**Required Intake Form Fields:**\n\n**Critical fields**:\n• Short Description (under 100 chars, policy/process oriented)\n• EHR Scope (Cerner/Epic/Meditech/System)\n• Governance Type (Full/Templated)\n• Primary Clinical Informaticist (you)\n• Primary User Affected\n• Care Setting (Acute/Ambulatory/Both)\n• Impacted Solutions (can select multiple)\n• Intake Slide link (click lock to attach)\n• Google Drive link\n• Preferred Contact Number\n\n**Conditional**:\n• Benefit Score (if leadership requests)\n• Required by Date (only for hard deadlines)\n\n**After submission**: You get DMND number. Update folder name to "DMND####### Title"\n\n**Tip**: Right-side checklist shrinks as you complete fields.\n\nAsk about specific fields for detailed guidance!`;
    }

    if (lowerMessage.includes('design document link') || lowerMessage.includes('where to attach design')) {
      return `**Design Document Link Field:**\n\n**Purpose**: Link to detailed design documentation\n**Location**: Google Drive, in DMD folder\n**Required Before**: Moving to Ready for Agenda\n\n**Format**:\n• **Cerner**: Design document (various formats - slides, docs)\n• **Epic**: Epic Optimization Form (from template)\n\n**Timing**: Can be estimated initially, refined after design sessions\n\nThis is the source of truth for your design!`;
    }

    if (lowerMessage.includes('affected applications') || lowerMessage.includes('technical applications')) {
      return `**Affected Applications Field:**\n\n**Purpose**: Technical applications impacted by build\n**Timing**: Can estimate initially, refine after design sessions\n\n**Examples**:\n• **Cerner**: PowerChart, FirstNet, HealtheIntent\n• **Epic**: Ambulatory, Inpatient, MyChart\n\n**Best Practice**: Be comprehensive; easier to remove later than add\n\nHelps IT understand scope and assign resources!`;
    }

    if (lowerMessage.includes('clinical sponsorship required') || lowerMessage.includes('define trigger')) {
      return `**Clinical Sponsorship Required Field:**\n\n**Purpose**: Flags need for Clinical Service Line review\n**Options**: Yes / No\n**Set By**: Vetting or Prioritization outcome\n**Impact**: Creates Define task if Yes\n\n**When Yes**: Request needs clinical leadership approval before proceeding to Design\n\nThis is typically determined during PeriSCOPE or SCOPE meetings.`;
    }

    if (lowerMessage.includes('is design already complete') || lowerMessage.includes('design complete field')) {
      return `**Is Design Already Complete Field:**\n\n**Purpose**: Determines workflow path in Design phase\n\n**Options**:\n• **Design is Complete** - Full documentation exists, no sessions needed\n• **Design Session Needed** - Need to conduct design sessions\n• **-- None --** - Not yet determined\n\n**Selection Guide**:\n• Choose "Design is Complete" if you already have full design documentation\n• Choose "Design Session Needed" if you need stakeholder input\n\nAffects whether you schedule design sessions!`;
    }

    if (lowerMessage.includes('change communication phase') || lowerMessage.includes('change comm field')) {
      return `**Change Communication Phase Field:**\n\n**EHR**: Cerner only\n**Purpose**: Track Change Communication document status\n\n**Options**:\n• **-- None --** - Not started\n• **In Development** - Currently working on it\n• **Attached** - Document complete and attached to Google Drive\n• **None Needed** - No user communication required\n\n**When to Use**: During Develop phase, before Release Planning\n**Template**: Available in shared templates folder\n\nEpic typically doesn't require separate Change Communication.`;
    }

    if (lowerMessage.includes('work notes') || lowerMessage.includes('how to document')) {
      return `**Work Notes Field:**\n\n**Purpose**: Document validation results, issues, communications\n\n**Best Practices**:\n• Be specific: "Validated Valuables field in PRD CAREB ED workflow - displays correctly, dropdown options working as designed"\n• Include timestamp for significant events\n• Tag issues for follow-up\n• Document what you tested and the results\n\n**Who Uses**: Primarily validators, but anyone can add notes\n\nCritical for audit trail and troubleshooting!`;
    }

    if (lowerMessage.includes('estimated size') || lowerMessage.includes('epic effort')) {
      return `**Estimated Size Field:**\n\n**EHR**: Epic only\n**Purpose**: Effort estimate based on approved design\n**Set By**: Primary Assignee\n**Timing**: During Develop phase\n**Impact**: Helps with release planning\n\n**Based On**:\n• Design complexity\n• Number of applications affected\n• Testing requirements\n• Dependencies\n\nIT uses this to plan resource allocation!`;
    }

    if (lowerMessage.includes('planned delivery date') || lowerMessage.includes('target delivery')) {
      return `**Planned Delivery Date Field:**\n\n**Purpose**: Target delivery date\n**Set By**: Primary Assignee (IT)\n**Timing**: During Develop phase\n\n**Considerations**:\n• Estimated Size\n• Available resources\n• Dependencies\n• Other priorities\n\n**Note**: This is a target, not a guarantee. Actual delivery depends on validation results and deployment schedule.`;
    }

    if (lowerMessage.includes('ready for deployment date') || lowerMessage.includes('deployment ready')) {
      return `**Ready for Deployment Date Field:**\n\n**EHR**: Epic only\n**Purpose**: When Feature is ready for prod release\n**Set By**: You (SCI)\n**Set To**: Today when truly ready for deployment\n\n**Ready means**:\n• Non-prod validation complete\n• All approvals obtained\n• Change communication sent (if needed)\n• No blocking issues\n\nThis signals to IT that release can be scheduled!`;
    }

    if (lowerMessage.includes('status') && (lowerMessage.includes('who updates') || lowerMessage.includes('who changes'))) {
      return `**Who Updates Status:**\n\n**Intake**: You (SCI) set to Approved after System Leader approval\n**Vetting**: CM PgM updates based on PeriSCOPE decision\n**Prioritization**: You set to Ready for Agenda, CM PgM updates after SCOPE\n**Define**: You update throughout (In Progress → Approved)\n**Design**: You and CM PgM collaborate\n**Develop (Build)**: IT updates as they build\n**Develop (Validation)**: Final validator updates to "Validated Successfully Non Prod"\n**Deploy**: IT updates, Final validator updates to "Validated Successfully Prod"\n\n**General rule**: Actor responsible for that phase updates status.`;
    }

    if (lowerMessage.includes('epic opt form') || lowerMessage.includes('epic optimization form')) {
      return `**Epic Optimization Form:**\n\n**Template**: Epic Opt Form TEMPLATE v5.07.20\n**When**: Create during Epic Design phase\n**Storage**: DMD folder in Google Drive\n**Link**: Attach in Design Documentation Link field\n\n**Purpose**: Documents design decisions, replaces Cerner's design slides/docs\n\n**Completed by**: You (SCI) with input from design sessions\n\n**Includes**: Regional input, System input, SME input, Finalized Design Summary\n\nMake a copy of the template for your specific DMD request.`;
    }

    if (lowerMessage.includes('rtask') || lowerMessage.includes('approval') && lowerMessage.includes('epic')) {
      return `**RTasks (Epic Approvals):**\n\n**Created by**: Analyst\n**When**: After non-prod validation successful\n**Based on**: EMG (Enterprise Management Group) and INI (Integrated Network Initiatives) requirements\n**Status**: Feature moves to "Pending Approval"\n\n**Approvers**: Complete their assigned RTasks\n\n**After all complete**: Primary Assignee updates to "Ready for Release Planning"\n\n**Your role**: Monitor progress, follow up if approvals delayed\n\nAnalyst determines which approvals needed based on scope.`;
    }

    if (lowerMessage.includes('target domain') || lowerMessage.includes('cerner domain')) {
      return `**Cerner Target Domain:**\n\n**Set during**: Design phase\n**Options**: PRD CAREB (P1284), PRD ECISA (P0687), or both\n**Based on**: Which facilities/regions are affected\n\n**Important**: You need validators for EACH target domain\n• ECISA validator needs P0687 access\n• CAREB validator needs P1284 access\n\n**Validation happens** in these domains in both non-prod and prod environments.\n\nDomain determines where IT builds and where validators test.`;
    }

    if (lowerMessage.includes('release type') || lowerMessage.includes('weekly') || lowerMessage.includes('monthly release')) {
      return `**Release Type (Cerner):**\n\n**Options**:\n• Weekly - Lower risk, routine changes\n• Monthly - Standard release cycle\n• Quarterly - Larger changes, more testing\n• Next Available Release - Flexible timing\n\n**Consider**:\n• Urgency of request\n• Complexity of build\n• Risk level\n• Testing requirements\n• Coordination with other releases\n\n**Set during**: Design phase\n**Impacts**: When IT schedules your production release\n\nIT coordinates actual release dates based on this.`;
    }

    if (lowerMessage.includes('finalized design summary') || lowerMessage.includes('voting statement')) {
      return `**Finalized Design Summary:**\n\n**Purpose**: Voting statement for design approval at Design Review Call\n**Length**: 2-4 sentences\n**Tone**: Clear, concise, specific\n\n**Example**: "Approve design to add Valuables field to Admission Navigator with dropdown options: Yes, No, Unknown. Field will be required for all admissions and display on patient header."\n\n**Include**:\n• What's being built\n• Where it appears\n• Key functionality\n• Scope (who/when it applies)\n\n**Avoid**: Technical jargon, vague language, unnecessary detail\n\n**Set during**: Design phase, before Ready for Agenda`;
    }

    // Scheduling Questions
    if (lowerMessage.includes('who schedules') || lowerMessage.includes('when do i schedule')) {
      if (lowerMessage.includes('cerner') || lowerMessage.includes('design session')) {
        return `**Scheduling Cerner Design Sessions:**\n\n**Who**: You (Primary Informaticist)\n**When**: After 2-week Resources Needed period ends and all participants added\n**Best Practice**: \n• Avoid Tuesday/Wednesday\n• Schedule first meeting at least 2 weeks out (unless urgent/escalation)\n• Update status to In Design when sessions scheduled\n\n**Process**:\n1. Wait for CM PgM to set status to Resources Needed\n2. Wait 2 weeks for participants to self-add\n3. Schedule sessions with all listed Design Participants\n4. Update status to In Design`;
      }
      if (lowerMessage.includes('epic')) {
        return `**Scheduling Epic Design Sessions:**\n\n**Multi-team requests**: Epic Process Owner schedules initial session during Refinement; Engineer handles additional sessions if needed\n\n**Single-app requests**: Engineer schedules all sessions\n\n**Your role**: Participate in sessions, provide clinical context, document feedback\n\nEpic Process Owners coordinate the scheduling logistics.`;
      }
    }

    // Agenda Questions
    if (lowerMessage.includes('how do i get') && (lowerMessage.includes('agenda') || lowerMessage.includes('periscope') || lowerMessage.includes('scope') || lowerMessage.includes('design review'))) {
      if (lowerMessage.includes('periscope')) {
        return `**Getting on PeriSCOPE Agenda:**\n\n**You don't directly add it!**\n\n**Process**:\n1. Submit Intake Form\n2. Get System Leader approval\n3. CM PgM automatically adds it to PeriSCOPE\n\n**Your role**: Attend PeriSCOPE, provide clarifications if asked\n\nCM PgM manages the agenda, not SCIs.`;
      }
      if (lowerMessage.includes('scope') && !lowerMessage.includes('periscope')) {
        return `**Getting on SCOPE Agenda:**\n\n**Your action**: Complete effort scoring and update status to "Ready for Agenda"\n\n**Then**: CM PgM adds it to SCOPE agenda\n\n**Timeline**: Usually added to next available SCOPE meeting after you mark Ready for Agenda\n\nCM PgM manages actual agenda addition.`;
      }
      if (lowerMessage.includes('design review')) {
        return `**Getting on Design Review Call Agenda (Cerner):**\n\n**Your action**: Update Design task status to "Ready for Agenda"\n\n**Before you can**:\n• Complete all design fields\n• Attach Design Document Link\n• Add Finalized Design Summary\n• Complete design sessions\n\n**Then**: CM PgM adds it to Design Review Call\n\nCM PgM manages the Design Review agenda.`;
      }
      if (lowerMessage.includes('refinement') || lowerMessage.includes('epic')) {
        return `**Getting on Epic Refinement Agenda:**\n\n**Your action**: Update Design task status to "Ready for Agenda"\n\n**Then**: Epic Process Owners automatically add it during their planning\n\n**Note**: Epic Refinement works differently than Cerner Design Review - it's managed by Epic Process Owners, not CM PgM.`;
      }
    }

    // Troubleshooting Questions
    if (lowerMessage.includes('what if') || lowerMessage.includes('no one') || lowerMessage.includes('doesnt respond') || lowerMessage.includes('conflicts')) {
      if (lowerMessage.includes('no one') && lowerMessage.includes('design participant')) {
        return `**If No One Adds Themselves as Design Participant:**\n\n**Actions**:\n1. Follow up directly with regional leadership\n2. Identify key stakeholders for affected workflows\n3. Reach out personally to request participation\n4. If still no response, schedule with limited participants\n5. Iterate design as more input arrives\n6. Escalate to CM PgM if blocking progress\n\n**Remember**: You can proceed with design even if participation is lower than expected. Document who was invited vs. who attended.`;
      }
      if (lowerMessage.includes('feedback conflicts') || lowerMessage.includes('conflicting')) {
        return `**If Design Feedback Conflicts:**\n\n**Never ignore conflicting feedback!**\n\n**Process**:\n1. Document all feedback thoroughly\n2. Schedule follow-up session with conflicting parties\n3. Seek compromise or alternative approach\n4. Escalate to leadership if unresolvable\n5. May require additional Define phase for clinical decision\n\n**Goal**: Achieve consensus or leadership decision before proceeding to build.`;
      }
      if (lowerMessage.includes('validator') && (lowerMessage.includes('doesnt respond') || lowerMessage.includes("doesn't respond"))) {
        return `**If Validator Doesn't Respond:**\n\n**Timeline is critical!** Testing phase blocks progress.\n\n**Actions**:\n1. Send direct follow-up immediately\n2. Verify they have proper access to test environment\n3. Check if they're out of office\n4. After 48 hours, escalate to their leadership\n5. CM PgM can help identify replacement validator if needed\n\n**Prevention**: Confirm validator availability when selecting them during Design.`;
      }
      if (lowerMessage.includes('required by date') || lowerMessage.includes('deadline') && lowerMessage.includes('miss')) {
        return `**If Required by Date Will Be Missed:**\n\n**Immediate action required!**\n\n1. Notify all stakeholders immediately\n2. Document reason for delay\n3. Update Required by Date if new deadline known\n4. Escalate if regulatory/contractual deadline\n\n**Options**:\n• Expedite through governance (if justified)\n• Reduce scope to meet deadline\n• Accept delay with stakeholder approval\n• Implement interim solution\n\n**Never**: Let a deadline pass without communication!`;
      }
      if (lowerMessage.includes('change design') || lowerMessage.includes('redesign') || lowerMessage.includes('after approval')) {
        return `**If Design Needs to Change After Approval:**\n\n**Process**: Service Management opens a Redesign task on original Demand\n\n**Steps**:\n1. Feature moves to Redesign phase\n2. Work Redesign task same as original Design\n3. Go through design sessions again\n4. Get new approval at Design Review\n5. IT implements revised design\n\n**Impact**: Delays timeline, requires re-validation\n\n**Best practice**: Thorough design review first time prevents redesign!`;
      }
      if (lowerMessage.includes('not sure') && lowerMessage.includes('release type')) {
        return `**If Not Sure Which Release Type:**\n\n**Consult with IT!** They can advise based on:\n\n**Weekly**: Minor/low risk changes, routine updates\n**Monthly**: Standard release cycle, moderate complexity\n**Quarterly**: Major changes, extensive testing needed\n**Next Available**: No specific timing requirement\n\n**Consider**:\n• Risk level\n• Testing requirements\n• Urgency\n• Coordination with other releases\n• Regulatory/compliance factors`;
      }
    }

    // "When do I" timing questions
    if (lowerMessage.includes('when do i update') || lowerMessage.includes('when do i change')) {
      if (lowerMessage.includes('in design')) {
        return `**When to Update Status to In Design:**\n\nAfter BOTH:\n1. Design participants added (2-week Resources Needed period closed)\n2. Design sessions scheduled\n\n**Then**: Update status to In Design and conduct sessions\n\nDon't update too early - wait for participants first!`;
      }
      if (lowerMessage.includes('ready for agenda')) {
        if (lowerMessage.includes('prioritization')) {
          return `**When to Update to Ready for Agenda (Prioritization):**\n\nAfter completing effort scoring\n\n**Both you and IT** must complete scoring first\n\nThen CM PgM adds to SCOPE agenda.`;
        }
        if (lowerMessage.includes('design')) {
          return `**When to Update to Ready for Agenda (Design):**\n\n**Cerner**: After design sessions complete AND all design fields filled (Design Document Link, Affected Applications, Release Type, Target Domain, Validators, Finalized Design Summary)\n\n**Epic**: After design documentation complete (Epic Opt Form filled, validators selected, feedback documented)\n\nThen CM PgM/Process Owner adds to approval meeting.`;
        }
      }
      if (lowerMessage.includes('approved') && lowerMessage.includes('intake')) {
        return `**When to Update to Approved (Intake):**\n\nAfter System Leader/informaticist team internally reviews and approves\n\n**Process**:\n1. You submit complete Intake\n2. System Leader reviews\n3. System Leader gives approval\n4. You update status to Approved\n\nThis triggers move to Vetting (PeriSCOPE).`;
      }
    }

    if (lowerMessage.includes('when do i create') && lowerMessage.includes('change comm')) {
      return `**When to Create Change Communication:**\n\n**EHR**: Cerner only\n**When**: During Develop phase, after validation complete in non-prod\n**Before**: Release Planning status\n\n**Process**:\n1. Use template from shared folder\n2. Create document\n3. Attach to Google Drive DMD folder\n4. Update Change Communication Phase to "Attached"\n\n**If not needed**: Update to "None Needed"`;
    }

    // Troubleshooting Issues
    if (lowerMessage.includes('cant find') || lowerMessage.includes("can't find") || lowerMessage.includes('missing') || lowerMessage.includes('not showing') || lowerMessage.includes('wont') || lowerMessage.includes("won't") || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {

      if (lowerMessage.includes('dmd number') || lowerMessage.includes('dmnd number')) {
        return `**Can't Find DMD Number:**\n\n**DMD generates AFTER Intake Form submission**, not before\n\n**Where to find it**:\n1. Check email confirmation after submission\n2. Check Workspace list - DMD number appears in first column\n3. Check Google Drive folder - auto-updates with DMD\n\n**Then**: Rename folder to "DMD####### Title"`;
      }

      if (lowerMessage.includes('intake slide') && (lowerMessage.includes('link') || lowerMessage.includes('attach'))) {
        return `**Intake Slide Link Won't Attach:**\n\n**Critical**: Must lock/unlock the field!\n\n**Steps**:\n1. Click lock icon to OPEN link field\n2. Paste full Google Drive link\n3. Click lock icon again to CLOSE\n4. Click Save on form\n5. Verify link is clickable\n\nCommon mistake: Not clicking lock icon to close field.`;
      }

      if (lowerMessage.includes('checklist') || lowerMessage.includes('right-side')) {
        return `**Right-Side Checklist Not Shrinking:**\n\n**How it works**: Checklist updates automatically as you complete fields\n\n**If all complete but checklist remains**:\n1. Refresh page\n2. Save form again\n3. Check for hidden required fields\n4. Contact ServiceNow support if persists\n\n**Checklist shows what's incomplete** - complete each item listed.`;
      }

      if (lowerMessage.includes('vetting task') || (lowerMessage.includes('no') && lowerMessage.includes('task') && lowerMessage.includes('intake'))) {
        return `**No Vetting Task After Submitting Intake:**\n\n**Checklist**:\n1. Did you update status to "Approved" in SPW?\n2. Is System Leader approval documented?\n3. Check Demand Tasks tab (not just main Demand)\n4. Allow time for system (few minutes)\n\n**Vetting task won't appear** until status = Approved in SPW.`;
      }

      if (lowerMessage.includes('design participant') && lowerMessage.includes('section')) {
        return `**Design Participant Section Not Showing:**\n\n**Requirements**:\n1. Status must be "Resources Needed"\n2. View must be set to "EHR" (not Default)\n3. You must be in Design task (not Demand)\n\n**How to switch view**: Click three dots → View → EHR\n\n**Still not showing?** Contact CM PgM - may be system issue.`;
      }

      if (lowerMessage.includes('in design') && (lowerMessage.includes('update') || lowerMessage.includes('change'))) {
        return `**Can't Update to In Design:**\n\n**Requirements**:\n• Must be in Design task (not Demand)\n• Previous status must be "Resources Needed"\n• Design participants should be added\n• Design sessions should be scheduled\n\n**Common issue**: Trying to update too early. Wait for 2-week Resources Needed period to close first.`;
      }

      if (lowerMessage.includes('validation email') || lowerMessage.includes('email not received')) {
        return `**Validation Email Not Received:**\n\n**Check**:\n1. Spam/junk folders\n2. Confirm you're listed as validator in Design task\n3. Status is "Testing" or "Prod Validation"\n4. Check ServiceNow notification settings\n\n**Settings**: Profile → Notifications → ensure enabled\n\n**Workaround**: Monitor SPW directly if emails unreliable.`;
      }

      if (lowerMessage.includes('feature') && (lowerMessage.includes('not created') || lowerMessage.includes('missing'))) {
        return `**Feature Not Created After Design Approval:**\n\n**Verify**:\n1. Design task status = "Complete"\n2. All approvals documented\n3. Allow time (few minutes for system)\n4. Check Features list in Workspace\n\n**Still missing after 1 hour?** Contact CM PgM - may need manual creation.`;
      }

      if (lowerMessage.includes('status wont') || lowerMessage.includes("status won't") || lowerMessage.includes('cant update status')) {
        return `**Status Won't Update:**\n\n**Common causes**:\n1. Missing required fields (check right-side checklist)\n2. Wrong status sequence for current phase\n3. Insufficient permissions\n4. Browser cache issue\n\n**Solutions**:\n• Complete all required fields\n• Verify correct next status\n• Try clearing cache/different browser\n• Contact ServiceNow support if persists`;
      }

      if (lowerMessage.includes('ticket') && (lowerMessage.includes('not appearing') || lowerMessage.includes('not showing') || lowerMessage.includes('missing from list'))) {
        return `**Ticket Not Appearing in Expected List:**\n\n**Troubleshooting**:\n1. Verify status matches list filter\n2. Check filters (region, EHR, assigned to)\n3. Try "All Demands" view\n4. Refresh browser\n5. Search by DMD number directly\n6. Allow time for system update\n\n**Lists are filtered** - may be in different view.`;
      }

      if (lowerMessage.includes('change communication template') || lowerMessage.includes('change comm template')) {
        return `**Can't Find Change Communication Template:**\n\n**Location**: Shared templates folder in Google Drive\n\n**No access?**\n1. Request permissions from CM PgM\n2. Check if you're using correct Google account\n3. Verify you're in correct shared drive\n\n**Multiple templates available** for different change types.`;
      }

      if (lowerMessage.includes('spw') || lowerMessage.includes('strategic planning workspace')) {
        return `**Can't Access SPW:**\n\n**Path**: IT Portal → Workspaces tab → Strategic Planning Workspace\n\n**First time?** Click Star icon to add to Favorites\n\n**Still can't access?**\n• Verify ServiceNow permissions\n• Request access from ServiceNow admin\n• Check if using correct portal link`;
      }

      if (lowerMessage.includes('ehr task details') || lowerMessage.includes('ehr fields')) {
        return `**EHR Task Details Not Showing:**\n\n**How to access**:\n1. Click three dots (⋮) to left of Demand Task\n2. Scroll down to "View" section\n3. Select "EHR"\n\n**Common issue**: Using "Default" view instead of "EHR" view\n\nEHR-specific fields only visible in EHR view.`;
      }

      if (lowerMessage.includes('validator access') || lowerMessage.includes('cant access test')) {
        return `**Validator Access Issues:**\n\n**Solutions**:\n1. Confirm validator has correct domain access (P0687 for ECISA, P1284 for CAREB)\n2. Check permissions in system\n3. Verify not locked out\n4. Contact IT support for access provisioning\n\n**Prevention**: Verify validator access BEFORE selecting them during Design phase.`;
      }
    }

    // Additional scenario handling
    if (lowerMessage.includes('wrong') && lowerMessage.includes('ehr')) {
      return `**Wrong EHR Scope Selected:**\n\n**Before submitting**: Just update the field\n\n**After submitting**: Difficult to change\n• May need to create new request\n• Contact CM PgM for guidance\n\n**Note**: "System" and "System w/ Meditech" create multiple Design tasks (one per EHR)\n\nDouble-check EHR scope before submitting!`;
    }

    if (lowerMessage.includes('effort scoring') && (lowerMessage.includes('confusion') || lowerMessage.includes('how to'))) {
      return `**Effort Scoring Guidance:**\n\n**Estimate**:\n• Technical complexity\n• Hours required\n• Dependencies\n• Risk factors\n\n**Collaborate with IT** - they provide technical perspective\n\n**Leadership may also require Benefit Score** (financial, safety, efficiency, satisfaction, strategic)\n\nDon't overthink - provisional scores accepted!`;
    }

    if (lowerMessage.includes('multiple ehr') || lowerMessage.includes('cerner and epic')) {
      return `**Changes in Multiple EHR Systems:**\n\n**Select "System" as EHR scope** in Intake\n\n**Result**: Creates separate Design tasks for each EHR\n\n**Coordination**: If simultaneous release required, coordinate timing between Cerner and Epic teams\n\n**Validate**: Each EHR separately in their respective domains`;
    }

    if (lowerMessage.includes('define dismissed') || lowerMessage.includes('clinical service line rejected')) {
      return `**Define Dismissed Request:**\n\n**Request is closed**\n\n**Options**:\n1. Gather more info and resubmit later\n2. Escalate to higher leadership if warranted\n3. Close and archive\n\n**Before resubmitting**: Address the concerns that led to rejection\n\nNot all requests should proceed - Define serves as important gate.`;
    }

    if (lowerMessage.includes('child request') || lowerMessage.includes('separate tracking')) {
      return `**Child Request Needed:**\n\n**When**: Complex request needs separate tracking for different components\n\n**Process**: Answer "Yes" to "Is Child request needed" field\n\n**Result**: Steps repeated for each child task; new Features created for each child\n\n**Example**: System-wide change affecting multiple workflows independently`;
    }


    if (lowerMessage.includes('overview') || lowerMessage.includes('summary') || lowerMessage.includes('all steps') || lowerMessage.includes('full process')) {
      return `**EHR Governance Process Overview:**\n\n**Full Governance Path** (Most requests):\n1. **Intake** - Draft documentation, get System Leader approval\n2. **Vetting** (PeriSCOPE) - CM PgM reviews for completeness\n3. **Prioritization** (SCOPE) - Effort scoring, ranked priority\n4. **Define** (Optional) - Clinical Service Line approval if needed\n5. **Design** - Technical design sessions (Cerner/Epic specific)\n6. **Develop** - IT builds + validates in non-prod\n7. **Deploy** - Release to prod + validate\n\n**Governance Templated Path** (Expedited):\n• Skips Vetting, Prioritization, Define\n• Goes: Intake → Design → Develop → Deploy\n• Eligible: Pharmacy requests, CSH Triage Guidelines (Cerner), EPSR list (Epic)\n\n**Key Meetings**:\n• PeriSCOPE = Vetting\n• SCOPE = Prioritization\n• Design Review Call = Cerner Design approval\n• Epic Refinement = Epic Design planning\n\nWhich phase do you want to know more about?`;
    }

    // FALLBACK: "I don't know" handling with helpful suggestions
    const suggestions = suggestRelatedTopics(keywords);

    // Check if we have any relevant keywords at all
    if (relevanceScore < 1) {
      // Very vague query - provide general help
      return `I'm not quite sure what you're asking about. Could you be more specific?\n\n**I can help with**:\n• Any phase: "Tell me about Intake", "What's Vetting?", "How does Design work?"\n• Specific topics: "Who schedules design sessions?", "How do I select validators?"\n• Tools: "Tell me about SPW", "What's the DMND number?"\n• Paths: "What's governance templated?", "Show me the full process"\n• Details: "Required intake fields", "Status transitions", "Change communication"\n\n**Try the quick buttons** on the left for common questions!`;
    }

    // We have some keywords but couldn't match to a specific answer
    let fallbackResponse = `I'm not sure I have specific information about that. `;

    // Provide disambiguation based on what we detected
    if (keywords.phases.length > 0) {
      fallbackResponse += `I see you mentioned **${keywords.phases[0]}** phase. `;
    }
    if (keywords.meetings.length > 0) {
      fallbackResponse += `I see you mentioned **${keywords.meetings[0]}** meeting. `;
    }
    if (keywords.statuses.length > 0) {
      fallbackResponse += `I see you mentioned **${keywords.statuses[0]}** status. `;
    }

    fallbackResponse += `\n\nCould you clarify what you'd like to know? For example:\n`;

    if (keywords.phases.length > 0) {
      fallbackResponse += `• What happens during ${keywords.phases[0]} phase?\n`;
      fallbackResponse += `• Who is responsible for ${keywords.phases[0]} tasks?\n`;
      fallbackResponse += `• What are the status transitions in ${keywords.phases[0]}?\n`;
    } else if (keywords.meetings.length > 0) {
      fallbackResponse += `• What happens at ${keywords.meetings[0]}?\n`;
      fallbackResponse += `• Who attends ${keywords.meetings[0]}?\n`;
      fallbackResponse += `• How do I prepare for ${keywords.meetings[0]}?\n`;
    } else if (keywords.roles.length > 0) {
      fallbackResponse += `• What are the responsibilities of ${keywords.roles[0]}?\n`;
      fallbackResponse += `• What phases does ${keywords.roles[0]} work in?\n`;
      fallbackResponse += `• What decisions does ${keywords.roles[0]} make?\n`;
    } else if (suggestions.length > 0) {
      fallbackResponse += suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n');
    } else {
      // Generic fallback
      fallbackResponse += `• Ask about a specific phase (Intake, Vetting, Design, etc.)\n`;
      fallbackResponse += `• Ask about meetings (PeriSCOPE, SCOPE, etc.)\n`;
      fallbackResponse += `• Ask about roles and responsibilities\n`;
    }

    return fallbackResponse;
  }

  async function markStepComplete() {
    if (!userProgress || !selectedProcess) return;

    const nextStepNumber = userProgress.current_step + 1;
    const hasNextStep = processSteps.some(s => s.step_number === nextStepNumber);

    await supabase
      .from('user_progress')
      .update({
        current_step: hasNextStep ? nextStepNumber : userProgress.current_step,
        completed_steps: [...userProgress.completed_steps, userProgress.current_step],
        updated_at: new Date().toISOString()
      })
      .eq('id', userProgress.id);

    await loadUserProgress(selectedProcess.id);
  }

  async function resetProgress() {
    if (!selectedProcess) return;

    await supabase
      .from('user_progress')
      .update({
        current_step: 1,
        completed_steps: [],
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('process_id', selectedProcess.id);

    await loadChatHistory();
    await loadUserProgress(selectedProcess.id);
  }

  async function clearChat() {
    await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId);

    setChatHistory([]);
  }

  return {
    processes,
    selectedProcess,
    setSelectedProcess,
    processSteps,
    userProgress,
    chatHistory,
    isLoading,
    sendMessage,
    markStepComplete,
    resetProgress,
    clearChat
  };
}