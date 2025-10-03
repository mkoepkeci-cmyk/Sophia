export interface ProactiveQuestion {
  question: string;
  reason?: string;
  options?: string[];
}

export interface ProactiveResponse {
  answer: string;
  clarifyingQuestions: ProactiveQuestion[];
  followUpSuggestions?: string[];
}

export function generateProactiveQuestions(
  userMessage: string,
  keywords: string[]
): ProactiveQuestion[] {
  const lowerMessage = userMessage.toLowerCase();
  const questions: ProactiveQuestion[] = [];

  if (lowerMessage.includes('intake') && !lowerMessage.includes('form') && !lowerMessage.includes('fields')) {
    questions.push({
      question: "Are you submitting a new request, or tracking an existing one?",
      options: ["Submitting new", "Tracking existing", "Just learning the process"]
    });
  }

  if (lowerMessage.includes('design') && !lowerMessage.includes('session') && !lowerMessage.includes('cerner') && !lowerMessage.includes('epic')) {
    questions.push({
      question: "Which EHR system is your request for?",
      reason: "The design process differs between systems",
      options: ["Epic", "Cerner", "Both"]
    });
  }

  if ((lowerMessage.includes('meeting') || lowerMessage.includes('agenda')) && !lowerMessage.includes('periscope') && !lowerMessage.includes('scope')) {
    questions.push({
      question: "Which governance meeting are you asking about?",
      options: ["PeriSCOPE (initial vetting)", "SCOPE (prioritization)", "Clinical Service Line (Define)", "Design Review"]
    });
  }

  if (lowerMessage.includes('status') && !lowerMessage.includes('further review') && !lowerMessage.includes('resources needed')) {
    questions.push({
      question: "What's the current status of your request?",
      reason: "This helps me provide the most relevant next steps"
    });
  }

  if ((lowerMessage.includes('help') || lowerMessage.includes('guide') || lowerMessage.includes('how do i')) && !keywords.some(k => ['meeting', 'phase', 'status'].includes(k))) {
    questions.push({
      question: "What would be most helpful right now?",
      options: [
        "Understanding a specific phase",
        "Finding out what to do next",
        "Learning about a meeting",
        "Understanding my current status"
      ]
    });
  }

  if (lowerMessage.includes('stuck') || lowerMessage.includes('blocked') || lowerMessage.includes('waiting')) {
    questions.push({
      question: "What phase is your request currently in?",
      reason: "I can help identify what might be holding things up",
      options: ["Intake", "Vetting/PeriSCOPE", "Prioritization/SCOPE", "Define", "Design", "Build/Testing", "Not sure"]
    });
  }

  if (lowerMessage.includes('validator') && !lowerMessage.includes('who')) {
    questions.push({
      question: "Are you trying to select validators, or understand the validation process?",
      options: ["Select validators", "Understand validation process", "Update validation status"]
    });
  }

  if (lowerMessage.includes('schedule') && lowerMessage.includes('design')) {
    questions.push({
      question: "Is this for Epic or Cerner?",
      reason: "Scheduling responsibilities differ by system",
      options: ["Epic", "Cerner"]
    });
  }

  if (lowerMessage.includes('role') && lowerMessage.includes('responsible')) {
    questions.push({
      question: "Which phase are you asking about?",
      options: ["Intake", "Vetting", "Prioritization", "Define", "Design", "Build/Deploy"]
    });
  }

  if ((lowerMessage.includes('further review') || lowerMessage.includes('sent back')) && !lowerMessage.includes('what does')) {
    questions.push({
      question: "Do you know why it was sent back for further review?",
      reason: "I can help you address specific issues"
    });
  }

  if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('submit')) {
    questions.push({
      question: "Have you already identified which Clinical Service Line this request is for?",
      reason: "This is one of the first required fields"
    });
  }

  return questions.slice(0, 3);
}

export function shouldAskClarifyingQuestions(userMessage: string): boolean {
  const lowerMessage = userMessage.toLowerCase();

  const vaguePatterns = [
    /^(help|guide|info|information|tell me|what about)$/i,
    /^(how|what|when|where|who)$/i,
    /^(i need|i want|can you|could you)$/i
  ];

  if (vaguePatterns.some(pattern => pattern.test(lowerMessage.trim()))) {
    return true;
  }

  const ambiguousTopics = [
    'design',
    'meeting',
    'status',
    'phase',
    'process',
    'request',
    'task'
  ];

  const hasAmbiguousTopic = ambiguousTopics.some(topic =>
    lowerMessage.includes(topic) &&
    lowerMessage.split(' ').length < 5
  );

  return hasAmbiguousTopic;
}

export function enrichResponseWithQuestions(
  baseResponse: string,
  questions: ProactiveQuestion[]
): string {
  if (questions.length === 0) {
    return baseResponse;
  }

  let response = baseResponse + '\n\n';

  questions.forEach((q, idx) => {
    if (questions.length === 1) {
      response += `**To help you better:** ${q.question}`;
    } else {
      response += `**${idx + 1}.** ${q.question}`;
    }

    if (q.reason) {
      response += `\n   *${q.reason}*`;
    }

    if (q.options && q.options.length > 0) {
      response += '\n   ' + q.options.map(opt => `• ${opt}`).join(' | ');
    }

    response += '\n\n';
  });

  return response.trim();
}

export function detectTopicFromMessage(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  const topicPatterns = [
    { keywords: ['intake', 'submit', 'start'], topic: 'Intake Phase' },
    { keywords: ['periscope', 'vetting'], topic: 'Vetting/PeriSCOPE' },
    { keywords: ['scope', 'prioritization'], topic: 'Prioritization/SCOPE' },
    { keywords: ['define', 'clinical service line', 'sponsorship'], topic: 'Define Phase' },
    { keywords: ['design', 'session', 'refinement'], topic: 'Design Phase' },
    { keywords: ['build', 'develop', 'testing', 'validation'], topic: 'Build/Testing' },
    { keywords: ['deploy', 'release', 'production'], topic: 'Deployment' },
    { keywords: ['validator', 'validation'], topic: 'Validation Process' },
    { keywords: ['epic'], topic: 'Epic System' },
    { keywords: ['cerner'], topic: 'Cerner System' },
    { keywords: ['status', 'further review', 'resources needed'], topic: 'Status Understanding' },
  ];

  for (const pattern of topicPatterns) {
    if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return pattern.topic;
    }
  }

  return null;
}

export function generateContextualFollowUp(topic: string | null): string[] {
  if (!topic) {
    return [
      "What phase is your request currently in?",
      "Are you working with Epic or Cerner?",
      "What would you like to learn more about?"
    ];
  }

  const followUpMap: Record<string, string[]> = {
    'Intake Phase': [
      "Do you need help with required intake fields?",
      "Are you ready to submit your intake form?",
      "Need guidance on creating intake documentation?"
    ],
    'Vetting/PeriSCOPE': [
      "Is your request ready for PeriSCOPE?",
      "Do you know who presents at PeriSCOPE?",
      "What outcome are you expecting from vetting?"
    ],
    'Prioritization/SCOPE': [
      "Have you completed effort scoring yet?",
      "Do you know your request's priority ranking?",
      "Is Define phase required for your request?"
    ],
    'Define Phase': [
      "Which Clinical Service Line do you need approval from?",
      "Have you scheduled your Define meeting?",
      "Do you have all required documentation?"
    ],
    'Design Phase': [
      "Are you ready to schedule design sessions?",
      "Do you know who your design participants are?",
      "Have validators been identified?"
    ],
    'Validation Process': [
      "Are you selecting validators or performing validation?",
      "Do you know which environments to validate in?",
      "Is this for non-prod or prod validation?"
    ],
    'Epic System': [
      "Do you need help with the Epic Optimization Form?",
      "Are you working on a single application or multi-team build?",
      "Need guidance on Epic-specific meetings?"
    ],
    'Cerner System': [
      "Which Target Domains are affected?",
      "Have you identified design participants?",
      "Do you understand the Design Review Call process?"
    ]
  };

  return followUpMap[topic] || [
    "Would you like more details on this?",
    "Are you looking for specific next steps?",
    "Do you have questions about a different phase?"
  ];
}
