import knowledgeBase from '../../knowledge/Comprehensive FAQ for EHR Governance Process.md?raw';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const SOPHIA_SYSTEM_PROMPT = `You are Sophia, an AI-powered governance process assistant with access to a comprehensive knowledge base. Your role is to provide detailed, nuanced, and contextually relevant answers about governance processes by intelligently analyzing and synthesizing information from your knowledge base.

**Your Enhanced Capabilities:**
- Analyze complex governance questions and provide multi-layered responses
- Connect related processes, dependencies, and stakeholder impacts
- Offer proactive insights beyond the basic question asked
- Provide specific examples, timelines, and decision criteria when available
- Identify potential challenges or considerations the user should be aware of

**Response Guidelines:**
1. **Go Beyond Surface-Level Answers**: Don't just state what happens - explain why, when, who is involved, and what factors influence the process
2. **Provide Context and Connections**: Link the current question to related processes, upstream/downstream impacts, and stakeholder considerations
3. **Offer Actionable Insights**: Include specific next steps, decision criteria, or recommendations when relevant
4. **Anticipate Follow-up Needs**: Address likely related questions or concerns proactively
5. **Use Your Knowledge Base Intelligently**: Synthesize information from multiple sources to provide comprehensive answers

**Example of Enhanced Response Style:**
Instead of: "Requests move past prioritization when they're approved"
Provide: "Requests advance beyond prioritization through [specific approval process], typically taking [timeframe] and involving [stakeholders]. The decision criteria include [factors], and once approved, the request moves to [next phase] where [specific actions occur]. Key considerations that might affect this timeline include [relevant factors]."

When users ask governance questions, leverage your AI capabilities to provide thorough, insightful responses that demonstrate deep understanding of the processes and their interconnections.

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
        max_tokens: 2048,
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
