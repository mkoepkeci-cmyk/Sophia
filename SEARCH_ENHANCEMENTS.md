# Enhanced Search Functionality

The chatbot now includes advanced search capabilities that make it smarter and more helpful.

## 1. Fuzzy Matching

The system can handle typos and variations:

**Examples:**
- "periscope" → matches "PeriSCOPE"
- "peroscope" → matches "PeriSCOPE"
- "peri-scope" → matches "PeriSCOPE"
- "CI" → matches "Clinical Informaticist"
- "SCI" → matches "Clinical Informaticist"
- "CM PgM" → matches "Change Management Program Manager"
- "change mgmt" → matches "Change Management Program Manager"
- "RFA" → matches "Ready for Agenda"
- "validated non prod" → matches "Validated Successfully Non Prod"

**Try asking:**
- "What happens at peroscope?" (typo handled)
- "Tell me about the CI role" (abbreviation expanded)
- "My status is RFA" (acronym understood)

## 2. Keyword Extraction

The system identifies key entities in your questions:

**Detected entities:**
- **Phases**: intake, vetting, design, develop, deploy
- **Meetings**: PeriSCOPE, SCOPE, Design Review Call, Refinement
- **Roles**: Clinical Informaticist, CM PgM, IT Process Owner
- **Statuses**: Resources Needed, In Design, Testing, etc.
- **Systems**: Epic, Cerner, Meditech
- **Documents**: Intake Slides, Design Document, Epic Opt Form

**Relevance scoring:**
- Questions with more specific keywords get more targeted responses
- Vague questions trigger helpful clarification prompts

## 3. Context Awareness

The chatbot remembers your conversation:

**Example conversation:**
```
You: "Tell me about Epic design"
Bot: [Provides Epic-specific design info]

You: "What about scheduling?" (vague follow-up)
Bot: "💡 Based on our discussion about Epic, I'm providing Epic-specific guidance."
     [Provides Epic scheduling info without you needing to repeat "Epic"]
```

**Context tracking:**
- Recent phases discussed
- EHR systems mentioned (Epic/Cerner)
- Roles being discussed
- Meeting topics
- Status values

**Follow-up detection:**
Recognizes phrases like:
- "What about..."
- "And then..."
- "After that..."
- "What next..."
- "Also..."
- "How about..."

## 4. "I Don't Know" Handling

When the bot can't find a specific answer:

**Low relevance (vague question):**
```
You: "Tell me about stuff"
Bot: "I'm not quite sure what you're asking about. Could you be more specific?

I can help with:
• Any phase: "Tell me about Intake", "What's Vetting?"
• Specific topics: "Who schedules design sessions?"
• Tools: "Tell me about SPW"
[etc.]
```

**Some keywords detected:**
```
You: "What color is the design phase?" (unrelated question)
Bot: "I'm not sure I have specific information about that. I see you mentioned design phase.

Could you clarify what you'd like to know? For example:
• What happens during design phase?
• Who is responsible for design tasks?
• What are the status transitions in design?"
```

## 5. Related Suggestions

Every response includes helpful follow-up suggestions:

**Example:**
```
You: "What happens at SCOPE?"
Bot: [Explains SCOPE meeting]

**Related questions you might have:**
1. What happens at scope?
2. Who attends scope?
3. How do I prepare for scope?
```

**Suggestions are contextual:**
- Phase questions → suggest status, roles, workflows
- Meeting questions → suggest attendees, preparation, outcomes
- Role questions → suggest responsibilities, phases
- System questions → suggest system-specific differences

## Testing the Enhancements

**Test fuzzy matching:**
1. "What happens at periscope?" (lowercase)
2. "Tell me about the CI role" (abbreviation)
3. "My status is RFA" (acronym)

**Test context awareness:**
1. "Tell me about Epic design"
2. "What about validators?" (should infer Epic context)
3. "And scheduling?" (should continue Epic context)

**Test "I don't know" handling:**
1. "Tell me about stuff" (very vague)
2. "What color is design?" (keywords detected but nonsensical)
3. "How fast does it go?" (no keywords)

**Test related suggestions:**
1. "What happens at PeriSCOPE?" (should suggest related meeting questions)
2. "Tell me about intake phase" (should suggest status/roles)
3. "Who is the CM PgM?" (should suggest responsibilities)

## Implementation Details

### Fuzzy Matching (`fuzzyMatch.ts`)
- Levenshtein distance algorithm for similarity scoring
- Threshold of 0.6-0.7 for matching
- Normalizes common variations and acronyms

### Keyword Extraction (`keywordExtraction.ts`)
- Knowledge base of all entities (phases, meetings, roles, etc.)
- Relevance scoring algorithm
- Related topic suggestion engine

### Context Management (`conversationContext.ts`)
- Builds context from last 5 messages
- Tracks phases, systems, roles, meetings, statuses
- Detects follow-up questions
- Applies context to disambiguate queries

### Integration (`useGovernanceAgent.ts`)
- Enhanced search pipeline:
  1. Normalize terms and expand acronyms
  2. Build conversation context
  3. Extract keywords and calculate relevance
  4. Apply context for follow-ups
  5. Fuzzy match entities
  6. Provide direct answer with suggestions
  7. Or handle "I don't know" with helpful prompts
