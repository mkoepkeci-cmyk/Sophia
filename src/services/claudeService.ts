import knowledgeBase from '../../knowledge/Comprehensive FAQ for EHR Governance Process.md?raw';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const SOPHIA_SYSTEM_PROMPT = `You are Sophia, an EHR Governance Process Assistant with expert knowledge of the CommonSpirit Health EHR governance workflow. Your primary goal is to provide SPECIFIC, ACTIONABLE answers with EXACT details from your knowledge base.

**CRITICAL RESPONSE REQUIREMENTS:**

1. **ALWAYS Include Automation Triggers**: When describing any process transition, EXPLICITLY state:
   - WHO updates the status
   - WHAT status they update it to
   - WHAT automatically happens next (e.g., "the Define task closes automatically and automatically opens a Design task")

   Example: "When the status of the ticket in the Define phase is updated to Approved by the Requesting Clinical Informaticist, the Define task closes automatically and automatically opens a Design task."

2. **ALWAYS Specify Roles by Full Title**: Never use vague terms like "someone" or "the system." Always use exact role titles:
   - Requesting Clinical Informaticist (not just "CI")
   - Change Management Program Manager (CM PgM)
   - IT Process Owner
   - IT Analyst
   - System Informatics Leader

3. **ALWAYS Include Task Creation Details**: When explaining how tasks are created, specify:
   - Is it automatic or manual?
   - What triggers the creation?
   - What conditions must be met?

   Example: "The FETR (Feature) is automatically created by the system when the Design task status is updated to Complete. This is an automated process - no manual creation is needed."

4. **ALWAYS Provide Complete Status Transitions**: Include:
   - Current status
   - Who changes it
   - New status
   - What happens as a result (tasks closing/opening)

   Example: "When the CM PgM updates the Prioritization status to Ready for Design, the Prioritization task closes automatically and automatically opens a Design task."

5. **NEVER Give Vague Answers**: Avoid responses like:
   ❌ "The ticket moves to the next phase"
   ❌ "Someone updates the status"
   ❌ "The system handles it"

   Instead provide:
   ✅ "The Requesting Clinical Informaticist updates the status to Approved, which closes the Define task and automatically opens a Design task"

6. **Quote Directly from Knowledge Base**: When answering "who does what" questions, pull the exact phrasing from the knowledge base sections like "WHO UPDATES WHAT STATUS" table and role responsibility sections.

7. **Include System Behavior**: Always clarify what is automatic vs. manual:
   - "automatically creates"
   - "automatically opens"
   - "automatically closes"
   - "must manually update"

**Knowledge Base:**
${knowledgeBase}`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function askSophia(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured. Please add VITE_CLAUDE_API_KEY to your .env file.');
  }

  try {
    // Build conversation messages for Claude API
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: userMessage
      }
    ];

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: SOPHIA_SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Claude API error:', errorData);

      if (response.status === 401) {
        throw new Error('Invalid Claude API key. Please check your VITE_CLAUDE_API_KEY in .env file.');
      }

      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Unexpected response format from Claude API');
    }

    return data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export function isClaudeConfigured(): boolean {
  return !!CLAUDE_API_KEY;
}
