# Sophia AI Setup Guide

This guide will walk you through enabling AI functionality for the Sophia chat assistant using Supabase Vault and Edge Functions.

## Architecture Overview

The AI integration uses a secure architecture where:
1. **Claude API Key** is stored in Supabase Vault (encrypted at rest)
2. **Edge Function** acts as a secure proxy to Claude API
3. **Client Application** calls the Edge Function (never exposes the API key)

This approach ensures the API key is never exposed in client-side code or network requests.

---

## Prerequisites

- Access to Supabase Dashboard: https://yzzcvjsqvutdvcopdhha.supabase.co
- Claude API Key from Anthropic (https://console.anthropic.com/)
- Supabase CLI installed (for local testing) or use the Supabase Dashboard

---

## Setup Steps

### Step 1: Apply Database Migrations

The migrations will enable Supabase Vault and create the necessary database functions.

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to https://yzzcvjsqvutdvcopdhha.supabase.co
2. Navigate to **SQL Editor**
3. Open and run each migration file in order:
   - `supabase/migrations/20251007000000_enable_vault_and_store_claude_key.sql`
   - `supabase/migrations/20251007000001_create_vault_accessor_function.sql`

**Option B: Using Supabase CLI**

```bash
# If you have Supabase CLI installed
supabase db push
```

### Step 2: Store Claude API Key in Supabase Vault

After the migrations are applied, you need to insert your Claude API key into the vault.

**Using Supabase Dashboard:**

1. Go to **SQL Editor** in your Supabase Dashboard
2. Run this SQL query (replace `YOUR_CLAUDE_API_KEY_HERE` with your actual key):

```sql
SELECT vault.create_secret(
  'YOUR_CLAUDE_API_KEY_HERE',
  'claude_api_key',
  'Claude API key for Sophia AI assistant'
);
```

3. Verify the secret was created:

```sql
SELECT id, name, description, created_at
FROM vault.secrets
WHERE name = 'claude_api_key';
```

**Important:** Keep your Claude API key secure. Never commit it to version control or expose it in client-side code.

### Step 3: Deploy the Edge Function

The Edge Function (`ask-sophia`) needs to be deployed to your Supabase project.

**Using Supabase Dashboard:**

1. Go to **Edge Functions** in your Supabase Dashboard
2. Click **Deploy new function**
3. Name: `ask-sophia`
4. Copy the contents of `supabase/functions/ask-sophia/index.ts`
5. Paste into the editor and deploy

**Using Supabase CLI:**

```bash
# Deploy the edge function
supabase functions deploy ask-sophia --no-verify-jwt
```

**Note:** We use `--no-verify-jwt` because this function is called by authenticated frontend users, and JWT verification is handled by Supabase automatically.

### Step 4: Verify the Setup

1. **Check Edge Function Status:**
   - Go to **Edge Functions** in Supabase Dashboard
   - Ensure `ask-sophia` is listed and has status "Active"

2. **Test the Edge Function:**

   Use the Supabase Dashboard test feature or run:

   ```bash
   curl -X POST https://yzzcvjsqvutdvcopdhha.supabase.co/functions/v1/ask-sophia \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "userMessage": "What is the Intake phase?",
       "conversationHistory": [],
       "systemPrompt": "You are a helpful assistant."
     }'
   ```

   You should receive a JSON response with `response` and `success` fields.

3. **Test in the Application:**
   - Run `npm run dev`
   - Click the Sophia chat button
   - Ask a question
   - Verify you receive AI-powered responses

---

## Troubleshooting

### AI Chat Not Working

**Symptom:** Chat shows fallback responses instead of AI responses

**Solutions:**

1. **Check Edge Function Logs:**
   - Go to **Edge Functions** > `ask-sophia` > **Logs**
   - Look for errors about API keys or vault access

2. **Verify Vault Secret:**
   ```sql
   SELECT id, name, description
   FROM vault.secrets
   WHERE name = 'claude_api_key';
   ```

   If no results, re-run Step 2 to create the secret.

3. **Check Edge Function Status:**
   - Ensure the function is deployed and active
   - Check for deployment errors in the dashboard

4. **Verify Environment Variables:**
   - Edge Functions automatically have access to:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
   - No manual configuration needed

### "API key not configured" Error

This means the Edge Function cannot retrieve the Claude API key from the vault.

**Solutions:**

1. Verify the secret exists in vault (see above)
2. Check the `get_claude_api_key()` function exists:
   ```sql
   SELECT routine_name
   FROM information_schema.routines
   WHERE routine_name = 'get_claude_api_key';
   ```
3. Re-run migration `20251007000001_create_vault_accessor_function.sql`

### Edge Function Timeout

**Symptom:** Requests take too long and timeout

**Solutions:**

1. Claude API can take 5-15 seconds for complex responses
2. Check your Claude API account for rate limits
3. Consider increasing the Edge Function timeout (default is 150 seconds, which should be sufficient)

---

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use Vault for all secrets** - This is the secure way
3. **Monitor Edge Function logs** for suspicious activity
4. **Rotate API keys periodically**
5. **Use RLS policies** to control access to sensitive data

---

## Architecture Details

### Data Flow

```
User Types Message
    ↓
SophiaChat Component
    ↓
claudeService.ts (calls supabase.functions.invoke)
    ↓
Supabase Edge Function (ask-sophia)
    ↓
Retrieves API key from Vault
    ↓
Calls Claude API (api.anthropic.com)
    ↓
Returns response to client
```

### Files Changed

- `src/services/claudeService.ts` - Updated to use Edge Function
- `src/vite-env.d.ts` - Removed VITE_CLAUDE_API_KEY
- `supabase/migrations/20251007000000_enable_vault_and_store_claude_key.sql` - Enables vault
- `supabase/migrations/20251007000001_create_vault_accessor_function.sql` - Creates accessor
- `supabase/functions/ask-sophia/index.ts` - Edge Function implementation

---

## Cost Considerations

- **Supabase Edge Functions:** Free tier includes 500K function invocations/month
- **Claude API:** Costs based on tokens used (input + output)
  - Claude 3.5 Sonnet: ~$3 per million input tokens, ~$15 per million output tokens
  - Each conversation turn typically uses 1,000-5,000 tokens
- **Supabase Vault:** No additional cost

---

## Fallback Behavior

If AI is unavailable, the application automatically falls back to pattern-matching responses:

- Governance type selection guidance
- Phase-specific information
- Role-based responsibilities
- Troubleshooting assistance

This ensures users always get helpful responses, even without AI.

---

## Support

If you encounter issues:

1. Check Edge Function logs in Supabase Dashboard
2. Verify all migrations are applied
3. Confirm the secret exists in vault
4. Test the Edge Function directly using curl
5. Review browser console for client-side errors

---

## Next Steps

After setup is complete:

1. Test AI responses with various questions
2. Monitor usage in Anthropic Console
3. Adjust system prompts if needed (in `claudeService.ts`)
4. Consider adding rate limiting for production use

---

**Setup Complete!** Your Sophia AI assistant is now ready to provide intelligent, context-aware responses to users.
