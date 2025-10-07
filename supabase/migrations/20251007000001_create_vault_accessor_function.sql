/*
  # Create Vault Accessor Function for Claude API Key

  ## Overview
  This migration creates a security definer function that allows the Edge Function
  to securely retrieve the Claude API key from Supabase Vault.

  ## New Functions
  - `get_claude_api_key()`: Returns the decrypted Claude API key from vault
    - Security definer function (runs with creator's privileges)
    - Only accessible to service_role
    - Returns the decrypted secret value

  ## Security
  - Function uses SECURITY DEFINER to access vault secrets
  - Access is restricted to service_role only
  - Client applications cannot call this function directly
*/

-- Create function to retrieve Claude API key from vault
CREATE OR REPLACE FUNCTION get_claude_api_key()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  secret_value TEXT;
BEGIN
  -- Retrieve the decrypted secret from vault
  SELECT decrypted_secret INTO secret_value
  FROM vault.decrypted_secrets
  WHERE name = 'claude_api_key'
  LIMIT 1;

  -- Return as JSON
  IF secret_value IS NOT NULL THEN
    RETURN json_build_object('key', secret_value, 'found', true);
  ELSE
    RETURN json_build_object('key', null, 'found', false);
  END IF;
END;
$$;

-- Grant execute permission to service_role only
REVOKE ALL ON FUNCTION get_claude_api_key() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_claude_api_key() TO service_role;

-- Add comment for documentation
COMMENT ON FUNCTION get_claude_api_key() IS 'Securely retrieves the Claude API key from Supabase Vault. Only accessible to service_role.';
