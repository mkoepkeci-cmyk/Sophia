/*
  # Enable Supabase Vault and Store Claude API Key

  ## Overview
  This migration enables the Supabase Vault extension for secure secret storage
  and prepares the infrastructure for storing the Claude API key securely.

  ## Changes Made
  1. Extensions
     - Enable `supabase_vault` extension for encrypted secret storage

  ## Security
  - Vault uses Transparent Column Encryption (TCE) to store secrets
  - Secrets are encrypted at rest in the database
  - Access to secrets is controlled via security definer functions

  ## Notes
  - The actual Claude API key will need to be inserted manually via the Supabase Dashboard
  - Once inserted, it can be accessed via vault.decrypted_secrets view in database functions
  - Client applications cannot directly access vault secrets for security
*/

-- Enable Supabase Vault extension if not already enabled
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault CASCADE;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA vault TO postgres, service_role;

-- Note: To insert the Claude API key, use the Supabase Dashboard UI or run:
-- SELECT vault.create_secret('YOUR_CLAUDE_API_KEY_HERE', 'claude_api_key', 'Claude API key for Sophia AI assistant');
