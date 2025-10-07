import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  userMessage: string;
  conversationHistory: Message[];
  systemPrompt: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Parse request body
    const { userMessage, conversationHistory, systemPrompt }: RequestBody = await req.json();

    if (!userMessage || typeof userMessage !== 'string') {
      return new Response(
        JSON.stringify({ error: 'userMessage is required and must be a string' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get Claude API key from Supabase Vault
    // Note: This requires proper database connection and vault setup
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase environment variables not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Query vault for Claude API key
    const vaultQuery = await fetch(`${supabaseUrl}/rest/v1/rpc/get_claude_api_key`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
    });

    let claudeApiKey: string;

    if (!vaultQuery.ok) {
      // Fallback: check for environment variable (for development/testing)
      claudeApiKey = Deno.env.get('CLAUDE_API_KEY') || '';

      if (!claudeApiKey) {
        console.error('Claude API key not found in vault or environment');
        return new Response(
          JSON.stringify({ error: 'API key not configured' }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } else {
      const vaultData = await vaultQuery.json();
      claudeApiKey = vaultData.key || Deno.env.get('CLAUDE_API_KEY') || '';
    }

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

    // Call Claude API
    const claudeResponse = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: systemPrompt,
        messages
      })
    });

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.json().catch(() => ({}));
      console.error('Claude API error:', errorData);

      return new Response(
        JSON.stringify({
          error: `Claude API error: ${claudeResponse.status}`,
          details: errorData
        }),
        {
          status: claudeResponse.status,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await claudeResponse.json();

    if (!data.content || !data.content[0] || !data.content[0].text) {
      return new Response(
        JSON.stringify({ error: 'Unexpected response format from Claude API' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Return the response
    return new Response(
      JSON.stringify({
        response: data.content[0].text,
        success: true
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in ask-sophia function:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
