# Quick AI Setup - Next Steps

## What Was Done

Your application is now configured to use AI through Supabase Edge Functions. The Claude API key is securely stored in Supabase Vault instead of client-side environment variables.

## What You Need To Do Now

### 1. Apply Database Migrations (2 minutes)

Go to your Supabase Dashboard SQL Editor and run these two files:

**File 1:** `supabase/migrations/20251007000000_enable_vault_and_store_claude_key.sql`
```sql
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault CASCADE;
GRANT USAGE ON SCHEMA vault TO postgres, service_role;
```

**File 2:** `supabase/migrations/20251007000001_create_vault_accessor_function.sql`
```sql
-- (Copy the entire contents of the file and run it)
```

### 2. Store Your Claude API Key (1 minute)

In the Supabase SQL Editor, run:

```sql
SELECT vault.create_secret(
  'sk-ant-YOUR_ACTUAL_KEY_HERE',
  'claude_api_key',
  'Claude API key for Sophia AI assistant'
);
```

Replace `sk-ant-YOUR_ACTUAL_KEY_HERE` with your real Claude API key from https://console.anthropic.com/

### 3. Deploy the Edge Function (2 minutes)

**Option A: Supabase Dashboard**
1. Go to Edge Functions
2. Click "Deploy new function"
3. Name: `ask-sophia`
4. Paste contents from `supabase/functions/ask-sophia/index.ts`
5. Deploy

**Option B: Supabase CLI**
```bash
supabase functions deploy ask-sophia --no-verify-jwt
```

### 4. Test It! (1 minute)

1. Run `npm run dev`
2. Click the Sophia chat button (purple circle, bottom right)
3. Ask: "What is the Intake phase?"
4. You should get an AI-powered response!

## Verification Checklist

- [ ] Vault extension enabled (migrations applied)
- [ ] Claude API key stored in vault
- [ ] Edge function deployed and active
- [ ] Test chat works and returns AI responses

## If Something Doesn't Work

See the detailed **AI_SETUP_GUIDE.md** for troubleshooting steps.

Common issues:
- **"API key not configured"** → Re-run step 2 to store the key
- **Fallback responses** → Check Edge Function is deployed
- **Function errors** → Check Edge Function logs in dashboard

---

**Total Setup Time: ~6 minutes**

Once complete, your Sophia AI assistant will provide intelligent, context-aware responses about the EHR governance process!
