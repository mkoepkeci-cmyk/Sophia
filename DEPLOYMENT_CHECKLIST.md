# AI Feature Deployment Checklist

Use this checklist to deploy the Sophia AI assistant to your Supabase project.

## Pre-Deployment Checklist

- [x] Code changes completed
- [x] Project builds successfully
- [x] Database migrations created
- [x] Edge function created
- [x] Documentation written

## Deployment Steps

### 1. Database Setup

#### 1.1 Apply Migration: Enable Vault
- [ ] Log into Supabase Dashboard: https://yzzcvjsqvutdvcopdhha.supabase.co
- [ ] Navigate to: **SQL Editor**
- [ ] Open file: `supabase/migrations/20251007000000_enable_vault_and_store_claude_key.sql`
- [ ] Copy contents and run in SQL Editor
- [ ] Verify: Extension enabled (no errors shown)

#### 1.2 Apply Migration: Create Accessor Function
- [ ] In SQL Editor
- [ ] Open file: `supabase/migrations/20251007000001_create_vault_accessor_function.sql`
- [ ] Copy contents and run in SQL Editor
- [ ] Verify: Function created successfully

#### 1.3 Verify Migrations Applied
Run this query to confirm:
```sql
-- Should return 'supabase_vault'
SELECT extname FROM pg_extension WHERE extname = 'supabase_vault';

-- Should return 'get_claude_api_key'
SELECT routine_name FROM information_schema.routines
WHERE routine_name = 'get_claude_api_key';
```
- [ ] Vault extension exists
- [ ] Accessor function exists

### 2. Store API Key

#### 2.1 Get Claude API Key
- [ ] Go to: https://console.anthropic.com/
- [ ] Navigate to: **API Keys**
- [ ] Copy your API key (starts with `sk-ant-`)

#### 2.2 Store in Vault
- [ ] In Supabase SQL Editor, run:
```sql
SELECT vault.create_secret(
  'sk-ant-YOUR_KEY_HERE',  -- Replace with actual key
  'claude_api_key',
  'Claude API key for Sophia AI assistant'
);
```
- [ ] Verify secret created (should return a UUID)

#### 2.3 Verify Secret Stored
```sql
SELECT id, name, description, created_at
FROM vault.secrets
WHERE name = 'claude_api_key';
```
- [ ] Secret exists with name 'claude_api_key'

### 3. Deploy Edge Function

#### 3.1 Deploy via Dashboard (Recommended)
- [ ] Navigate to: **Edge Functions** in Supabase Dashboard
- [ ] Click: **Deploy new function**
- [ ] Function name: `ask-sophia`
- [ ] Verify JWT: **Uncheck** (or set to false)
- [ ] Copy contents from: `supabase/functions/ask-sophia/index.ts`
- [ ] Paste in editor
- [ ] Click: **Deploy function**
- [ ] Wait for deployment to complete

#### 3.2 Verify Deployment
- [ ] Function shows status: **Active**
- [ ] No deployment errors in logs
- [ ] Function URL is visible

### 4. Test the Integration

#### 4.1 Test Edge Function Directly
Use the Supabase Dashboard test feature:
- [ ] Go to **Edge Functions** > `ask-sophia` > **Invoke**
- [ ] Paste test payload:
```json
{
  "userMessage": "What is the Intake phase?",
  "conversationHistory": [],
  "systemPrompt": "You are a helpful assistant."
}
```
- [ ] Click **Invoke**
- [ ] Verify: Response contains `"success": true`
- [ ] Verify: Response contains `"response"` field with text

#### 4.2 Test in Application
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:5173
- [ ] Click: Sophia chat button (purple circle, bottom right)
- [ ] Type: "What is the Intake phase?"
- [ ] Send message
- [ ] Verify: Receive AI-powered response (not fallback pattern)
- [ ] Check browser console: No errors
- [ ] Ask 2-3 more questions to test conversation history

#### 4.3 Test Error Handling
- [ ] Ask a very long question (test token limits)
- [ ] Verify graceful error handling
- [ ] Check Edge Function logs for any warnings

### 5. Monitor and Verify

#### 5.1 Check Logs
- [ ] Navigate to: **Edge Functions** > `ask-sophia` > **Logs**
- [ ] Verify: Requests are logged
- [ ] Verify: No repeated errors
- [ ] Check for: API key retrieval success

#### 5.2 Check Claude API Usage
- [ ] Go to: https://console.anthropic.com/
- [ ] Check: API usage dashboard
- [ ] Verify: Requests are being tracked
- [ ] Note: Current usage/costs

### 6. Post-Deployment

#### 6.1 Update Documentation
- [ ] Update README with AI feature status
- [ ] Note deployment date in changelog
- [ ] Archive these setup guides for reference

#### 6.2 Set Up Monitoring (Optional)
- [ ] Set up Supabase alerts for function errors
- [ ] Set up Claude API usage alerts
- [ ] Configure logging retention

#### 6.3 Clean Up (Optional)
- [ ] Remove old `.env` Claude key references (if any)
- [ ] Clear any test data from chat_history table
- [ ] Archive migration files

## Rollback Plan

If something goes wrong:

1. **Edge Function Issues**
   - [ ] Redeploy function from dashboard
   - [ ] Check logs for specific errors
   - [ ] Verify vault secret is accessible

2. **API Key Issues**
   - [ ] Re-run vault secret creation SQL
   - [ ] Verify key is valid in Anthropic console
   - [ ] Check service role permissions

3. **Complete Rollback**
   - [ ] Revert `src/services/claudeService.ts` from git
   - [ ] Add `VITE_CLAUDE_API_KEY` back to `.env`
   - [ ] Redeploy application

## Success Criteria

All items below should be true:

- [x] Project builds without errors
- [ ] Database migrations applied successfully
- [ ] Claude API key stored in vault
- [ ] Edge function deployed and active
- [ ] Chat returns AI-powered responses
- [ ] No errors in browser console
- [ ] No errors in Edge Function logs
- [ ] Claude API usage tracking works

## Deployment Sign-Off

| Item | Status | Date | Notes |
|------|--------|------|-------|
| Migrations Applied | ⬜ | __/__/__ | |
| API Key Stored | ⬜ | __/__/__ | |
| Function Deployed | ⬜ | __/__/__ | |
| Testing Complete | ⬜ | __/__/__ | |
| Production Ready | ⬜ | __/__/__ | |

## Support Resources

- **Setup Guide**: `AI_SETUP_GUIDE.md`
- **Quick Start**: `QUICK_AI_SETUP.md`
- **Summary**: `AI_IMPLEMENTATION_SUMMARY.md`
- **Supabase Dashboard**: https://yzzcvjsqvutdvcopdhha.supabase.co
- **Claude Console**: https://console.anthropic.com/

---

**Estimated Total Time: 10-15 minutes**

Good luck with your deployment! 🚀
