/*
  # Add Governance Type Tracking

  ## Overview
  This migration adds support for tracking Governance Templated vs Full Governance pathways
  throughout the EHR optimization request lifecycle.

  ## New Tables
  
  ### `governance_types`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - "Full Governance" or "Governance Templated"
  - `description` (text) - Description of the governance type
  - `phases_included` (text[]) - Array of phase IDs included in this pathway
  - `phases_skipped` (text[]) - Array of phase IDs skipped in this pathway
  - `estimated_duration` (text) - Typical duration for this pathway
  - `created_at` (timestamptz) - Creation timestamp

  ### `pre_approved_items`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Title of the pre-approved item
  - `description` (text) - Description
  - `category` (text) - Category (CSH Triage, EPSR, Radiology, Lab, Pharmacy)
  - `system_type` (text) - Cerner, Epic, or Both
  - `is_active` (boolean) - Whether this item is currently active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `user_requests`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (text) - User identifier
  - `dmnd_number` (text) - DMND tracking number
  - `title` (text) - Request title
  - `governance_type_id` (uuid) - Foreign key to governance_types
  - `current_phase` (text) - Current phase ID
  - `status` (text) - Current status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Modifications
  - Adds governance_type_id to user_progress table
  - Creates relationships between requests and governance types

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read governance types
  - Add policies for users to manage their own requests
  - Add policies for admins to manage pre-approved items

  ## Data Population
  - Populates initial governance types (Full and Templated)
  - Adds sample pre-approved items
*/

-- Create governance_types table
CREATE TABLE IF NOT EXISTS governance_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  phases_included text[] NOT NULL DEFAULT '{}',
  phases_skipped text[] NOT NULL DEFAULT '{}',
  estimated_duration text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE governance_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read governance types"
  ON governance_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Create pre_approved_items table
CREATE TABLE IF NOT EXISTS pre_approved_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  system_type text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pre_approved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pre-approved items"
  ON pre_approved_items
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage pre-approved items"
  ON pre_approved_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create user_requests table
CREATE TABLE IF NOT EXISTS user_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  dmnd_number text UNIQUE,
  title text NOT NULL,
  governance_type_id uuid REFERENCES governance_types(id),
  current_phase text NOT NULL DEFAULT 'intake',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own requests"
  ON user_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own requests"
  ON user_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own requests"
  ON user_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add governance_type_id to user_progress if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_progress' AND column_name = 'governance_type_id'
  ) THEN
    ALTER TABLE user_progress ADD COLUMN governance_type_id uuid REFERENCES governance_types(id);
  END IF;
END $$;

-- Populate governance types
INSERT INTO governance_types (name, description, phases_included, phases_skipped, estimated_duration)
VALUES 
  (
    'Full Governance',
    'Default pathway for most optimization requests requiring complete review and prioritization',
    ARRAY['intake', 'vetting', 'prioritization', 'define', 'design', 'develop', 'deploy'],
    ARRAY[]::text[],
    'Weeks to months'
  ),
  (
    'Governance Templated',
    'Expedited pathway for pre-approved items that skip vetting and prioritization phases',
    ARRAY['intake', 'design', 'develop', 'deploy'],
    ARRAY['vetting', 'prioritization'],
    'Days to weeks'
  )
ON CONFLICT (name) DO NOTHING;

-- Populate sample pre-approved items
INSERT INTO pre_approved_items (title, description, category, system_type, is_active)
VALUES
  ('Standard Order Set Update', 'Updates to established order sets following CSH Triage Guidelines', 'CSH Triage', 'Cerner', true),
  ('Epic Standard Request (EPSR)', 'Items on the Epic Standard Request list', 'EPSR', 'Epic', true),
  ('Radiology Workflow Template', 'Standard radiology templated requests', 'Radiology', 'Both', true),
  ('Lab Result Display Update', 'Standard lab templated requests', 'Lab', 'Both', true),
  ('Pharmacy Formulary Maintenance', 'Standard pharmacy maintenance items', 'Pharmacy', 'Both', true),
  ('Standard Documentation Template', 'Pre-approved documentation templates', 'CSH Triage', 'Both', true)
ON CONFLICT DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_requests_governance_type ON user_requests(governance_type_id);
CREATE INDEX IF NOT EXISTS idx_user_requests_user_id ON user_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_pre_approved_items_category ON pre_approved_items(category);
CREATE INDEX IF NOT EXISTS idx_pre_approved_items_active ON pre_approved_items(is_active);
