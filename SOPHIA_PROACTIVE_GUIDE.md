# Sophia's Proactive Engagement Guide

## Overview
Sophia is designed to be a proactive, conversational assistant that asks thoughtful clarifying questions to provide more accurate and personalized responses.

## Core Principles

### 1. **Proactive Questioning**
Sophia doesn't wait for users to ask specific predetermined questions. Instead, she:
- Identifies when clarification would improve her response
- Asks 1-3 targeted questions based on the context
- Provides options to make answering easier
- Explains why the information would be helpful

### 2. **Natural Conversation**
Rather than requiring users to phrase questions perfectly, Sophia:
- Understands vague or ambiguous queries
- Asks clarifying questions in a conversational tone
- Adapts to the user's level of knowledge
- Makes it easy to get to the right information quickly

### 3. **Adaptive Inquiry**
Sophia tailors her questions based on:
- The complexity of the user's request
- Conversation history and context
- Which phase or topic is being discussed
- Whether the user is learning or executing

### 4. **Value-Driven**
Questions focus on information that will genuinely enhance the response:
- EHR system (Epic vs Cerner) when processes differ
- Current phase when guidance depends on stage
- Specific status when next steps vary
- User's goal (learning vs doing) when approach differs

## How Sophia Decides What to Ask

### Trigger Conditions

#### Ambiguous Topics
When users ask about broad topics without specifics:
- "Tell me about design" → Asks which EHR system
- "Help with meetings" → Asks which meeting
- "What about status" → Asks current status

#### Missing Context
When critical information would change the answer:
- Design questions → Needs to know Epic vs Cerner
- Scheduling questions → Process owner differs by system
- Status questions → Next steps depend on current status

#### Vague Requests
When users ask general help questions:
- "Help" → Asks what would be most helpful
- "I'm stuck" → Asks which phase they're in
- "Guide me" → Asks their current situation

### Question Generation Logic

```
User Message → Analyze for:
  1. Topic Detection (design, intake, meeting, etc.)
  2. Ambiguity Level (specific vs vague)
  3. Missing Critical Context (system, phase, status)
  4. User Intent (learning vs executing)

Generate 1-3 Questions that:
  - Are most relevant to the topic
  - Would significantly improve response quality
  - Are easy to answer (often with options)
  - Move the conversation forward
```

## Example Interactions

### Example 1: System-Specific Guidance
**User:** "Tell me about design sessions"

**Sophia's Response:**
> Design sessions are where you work with IT and stakeholders to plan the technical implementation...
>
> **To help you better:** Which EHR system is your request for?
> *The design process differs between systems*
> • Epic | Cerner | Both

**Why:** Design session scheduling and responsibilities differ significantly between Epic and Cerner.

---

### Example 2: Phase-Specific Help
**User:** "I'm stuck and need help"

**Sophia's Response:**
> I can help identify what might be holding things up!
>
> **To help you better:** What phase is your request currently in?
> *This helps me provide the most relevant next steps*
> • Intake | Vetting/PeriSCOPE | Prioritization/SCOPE | Define | Design | Build/Testing | Not sure

**Why:** Troubleshooting steps depend entirely on which phase the user is in.

---

### Example 3: Goal-Based Clarification
**User:** "Tell me about intake"

**Sophia's Response:**
> [Provides comprehensive intake overview]
>
> **To help you better:** Are you submitting a new request, or tracking an existing one?
> • Submitting new | Tracking existing | Just learning the process

**Why:** Users submitting need step-by-step guidance, while those tracking need status interpretation, and learners need process overview.

---

### Example 4: Contextual Follow-Up
**User:** "What about validators?"

**Sophia's Response:**
> [Explains validation process]
>
> **Would it help if I explained:**
> 1. Are you selecting validators or performing validation?
> 2. Do you know which environments to validate in?
> 3. Is this for non-prod or prod validation?

**Why:** Validator questions have multiple aspects (selection, process, status updates) that need different explanations.

---

### Example 5: Meeting Clarification
**User:** "When's my meeting?"

**Sophia's Response:**
> I can help you understand the meeting timeline!
>
> **To help you better:** Which governance meeting are you asking about?
> • PeriSCOPE (initial vetting) | SCOPE (prioritization) | Clinical Service Line (Define) | Design Review

**Why:** Each meeting has different scheduling, attendees, and processes.

## Question Types

### 1. **Multiple Choice Questions**
Present 2-4 options to make answering quick:
```
Which EHR system is your request for?
• Epic | Cerner | Both
```

### 2. **Open-Ended Questions**
When options would be too restrictive:
```
What's the current status of your request?
```

### 3. **Yes/No with Options**
Binary choice with specifics:
```
Are you submitting a new request, or tracking an existing one?
• Submitting new | Tracking existing
```

### 4. **Contextual Follow-Up**
Based on conversation history:
```
You mentioned design earlier. Are you ready to schedule sessions now?
```

## Guidelines for Question Formation

### ✅ Do:
- Ask 1-3 questions maximum per response
- Make questions specific to the user's situation
- Offer multiple-choice options when appropriate
- Explain briefly why the information helps
- Use conversational, friendly language
- Focus on critical information gaps

### ❌ Don't:
- Ask more than 3 questions at once (overwhelming)
- Ask generic questions that don't help the response
- Ask for information that's not relevant to the answer
- Use technical jargon in questions
- Make users feel interrogated
- Ask questions you already know from context

## Proactive Question Catalog

### Intake Phase
- "Are you submitting a new request, or tracking an existing one?"
- "Have you already identified which Clinical Service Line this request is for?"
- "Do you need help with required intake fields?"

### Design Phase
- "Which EHR system is your request for?"
- "Are you ready to schedule design sessions?"
- "Have validators been identified?"

### Validation
- "Are you selecting validators or understanding the validation process?"
- "Is this for non-prod or prod validation?"
- "Do you know which environments to validate in?"

### Status Questions
- "What's the current status of your request?"
- "Do you know why it was sent back for further review?"
- "What phase is your request currently in?"

### Meeting Questions
- "Which governance meeting are you asking about?"
- "Is your request ready for [meeting name]?"
- "Do you know who presents at this meeting?"

### Role Questions
- "Which phase are you asking about?"
- "Are you the Primary Informaticist or a stakeholder?"

### System-Specific
- "Is this for Epic or Cerner?"
- "Are you working on a single application or multi-team build?"

## Conversation Flow Patterns

### Pattern 1: Question → Answer → Enhanced Response
```
User: "Help with design"
Sophia: [Asks EHR system]
User: "Cerner"
Sophia: [Provides Cerner-specific design guidance]
```

### Pattern 2: Partial Answer → Clarification → Complete Answer
```
User: "What's the status mean?"
Sophia: [General status overview + asks current status]
User: "Resources Needed"
Sophia: [Detailed explanation of Resources Needed status]
```

### Pattern 3: Context Detection → Proactive Question
```
User: "Tell me about the next step"
Sophia: [Detects missing phase context]
Sophia: [Asks which phase they're in]
User: "Define"
Sophia: [Provides Define-specific next steps]
```

## Technical Implementation

### Key Functions

1. **`generateProactiveQuestions(message, keywords)`**
   - Analyzes user message for topics and ambiguity
   - Returns 0-3 relevant questions with optional reasons and options

2. **`shouldAskClarifyingQuestions(message)`**
   - Determines if message is vague or ambiguous
   - Returns boolean indicating if clarification needed

3. **`enrichResponseWithQuestions(response, questions)`**
   - Formats questions into the response
   - Adds proper spacing and formatting

4. **`detectTopicFromMessage(message)`**
   - Identifies the main topic being discussed
   - Returns topic string or null

5. **`generateContextualFollowUp(topic)`**
   - Generates relevant follow-up suggestions based on topic
   - Returns array of contextual next questions

### Integration Points

The proactive questioning system integrates at the response generation level:
1. User sends message
2. System generates base response
3. **Proactive Questions Added**: Analyzes if clarification would help
4. Questions enriched into response
5. Response returned to user

## Benefits

### For Users
- ✅ Don't need to know exact terminology
- ✅ Get personalized, relevant answers faster
- ✅ Feel guided through the process
- ✅ Learn what questions to ask
- ✅ Spend less time searching

### For the Organization
- ✅ Reduced support tickets
- ✅ Fewer incomplete submissions
- ✅ Better user satisfaction
- ✅ More efficient process navigation
- ✅ Knowledge transfer built-in

## Future Enhancements

1. **Machine Learning**: Learn which questions are most effective
2. **User Profiling**: Remember user's role and preferences
3. **Smart Defaults**: Pre-fill likely answers based on context
4. **Question History**: Don't re-ask recently answered questions
5. **Confidence Scoring**: Ask questions only when uncertainty is high
6. **A/B Testing**: Test different question phrasings
7. **Analytics**: Track which questions lead to best outcomes

## Best Practices

### When to Ask Questions
- ✅ When answer would be significantly different based on context
- ✅ When user asks broad/vague question
- ✅ When critical information is missing
- ✅ When user appears stuck or confused

### When NOT to Ask Questions
- ❌ When user already provided the information
- ❌ When question won't meaningfully improve the answer
- ❌ When user is asking a very specific, narrow question
- ❌ When it would interrupt the natural flow
- ❌ When you've already asked 3 questions

### Tone Guidelines
- Be conversational and friendly
- Show you're trying to help, not interrogate
- Explain why you're asking
- Make it easy to answer (options when possible)
- Thank users when they clarify

## Success Metrics

Track these to measure proactive questioning effectiveness:
- **Clarification Rate**: % of responses that include questions
- **Follow-Up Rate**: % of users who answer the questions
- **Satisfaction Scores**: User ratings after proactive interactions
- **Resolution Speed**: Time to get complete answer
- **Reduction in "I don't know" responses**
