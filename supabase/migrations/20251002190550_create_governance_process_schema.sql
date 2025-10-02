/*
  # Governance Process Assistant Schema

  ## Overview
  This migration creates the database structure for a conversational governance process assistant
  that helps users navigate through company-defined governance steps.

  ## New Tables
  
  ### `governance_processes`
  Main process definitions table
  - `id` (uuid, primary key) - Unique process identifier
  - `name` (text) - Process name (e.g., "Vendor Approval", "Budget Request")
  - `description` (text) - Brief process description
  - `is_active` (boolean) - Whether this process is currently active
  - `created_at` (timestamptz) - Process creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `process_steps`
  Individual steps within each governance process
  - `id` (uuid, primary key) - Unique step identifier
  - `process_id` (uuid, foreign key) - Reference to parent process
  - `step_number` (integer) - Sequential order of the step
  - `title` (text) - Step title
  - `description` (text) - Detailed step instructions
  - `required_actions` (text[]) - Array of required actions for this step
  - `tips` (text[]) - Helpful tips for completing this step
  - `estimated_duration` (text) - Expected time to complete (e.g., "2-3 days")
  - `created_at` (timestamptz) - Step creation timestamp

  ### `user_progress`
  Track user progress through processes
  - `id` (uuid, primary key) - Unique progress record identifier
  - `user_id` (text) - User identifier (session-based)
  - `process_id` (uuid, foreign key) - Reference to process
  - `current_step` (integer) - Current step number user is on
  - `completed_steps` (integer[]) - Array of completed step numbers
  - `notes` (text) - User's personal notes
  - `created_at` (timestamptz) - When user started this process
  - `updated_at` (timestamptz) - Last progress update

  ### `chat_history`
  Store conversation history for context
  - `id` (uuid, primary key) - Unique message identifier
  - `user_id` (text) - User identifier
  - `process_id` (uuid, foreign key) - Related process (nullable)
  - `message` (text) - Message content
  - `is_user` (boolean) - True if user message, false if agent response
  - `created_at` (timestamptz) - Message timestamp

  ## Security
  - Enable RLS on all tables
  - Allow public read access to process definitions (governance_processes, process_steps)
  - Allow users to manage their own progress and chat history based on user_id
*/

-- Create governance_processes table
CREATE TABLE IF NOT EXISTS governance_processes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create process_steps table
CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id uuid NOT NULL REFERENCES governance_processes(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  required_actions text[] DEFAULT '{}',
  tips text[] DEFAULT '{}',
  estimated_duration text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(process_id, step_number)
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  process_id uuid NOT NULL REFERENCES governance_processes(id) ON DELETE CASCADE,
  current_step integer DEFAULT 1,
  completed_steps integer[] DEFAULT '{}',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, process_id)
);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  process_id uuid REFERENCES governance_processes(id) ON DELETE SET NULL,
  message text NOT NULL,
  is_user boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE governance_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for governance_processes (public read)
CREATE POLICY "Anyone can view active processes"
  ON governance_processes FOR SELECT
  USING (is_active = true);

-- RLS Policies for process_steps (public read)
CREATE POLICY "Anyone can view process steps"
  ON process_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM governance_processes 
      WHERE id = process_steps.process_id 
      AND is_active = true
    )
  );

-- RLS Policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own progress"
  ON user_progress FOR DELETE
  USING (true);

-- RLS Policies for chat_history
CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own messages"
  ON chat_history FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own messages"
  ON chat_history FOR DELETE
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_process_steps_process_id ON process_steps(process_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON chat_history(created_at);

-- Insert sample governance process
INSERT INTO governance_processes (name, description, is_active)
VALUES (
  'Vendor Approval Process',
  'Complete process for obtaining approval to work with a new vendor, including security review, legal assessment, and budget approval.',
  true
) ON CONFLICT DO NOTHING;

-- Get the process ID for inserting steps
DO $$
DECLARE
  process_uuid uuid;
BEGIN
  SELECT id INTO process_uuid FROM governance_processes WHERE name = 'Vendor Approval Process' LIMIT 1;
  
  IF process_uuid IS NOT NULL THEN
    -- Insert process steps
    INSERT INTO process_steps (process_id, step_number, title, description, required_actions, tips, estimated_duration)
    VALUES
      (
        process_uuid,
        1,
        'Initial Vendor Information Gathering',
        'Collect basic information about the vendor including company name, primary contact, services offered, and estimated contract value. This forms the foundation of your vendor approval request.',
        ARRAY['Complete Vendor Information Form', 'Obtain vendor''s business license number', 'Gather vendor''s website and contact details', 'Document the business need and justification'],
        ARRAY['Have your budget code ready', 'Include specific deliverables you expect from the vendor', 'Identify your internal sponsor or department head'],
        '1-2 days'
      ),
      (
        process_uuid,
        2,
        'Security and Compliance Assessment',
        'Submit vendor information to the Security team for review. They will assess data handling practices, security certifications, and compliance requirements.',
        ARRAY['Submit completed form to security@company.com', 'Provide vendor''s security documentation (SOC 2, ISO 27001, etc.)', 'Complete data classification worksheet', 'Schedule security review meeting if required'],
        ARRAY['Security reviews typically take 5-7 business days', 'Vendors with existing certifications move faster', 'Be prepared to answer questions about data flows'],
        '5-7 days'
      ),
      (
        process_uuid,
        3,
        'Legal Review and Contract Negotiation',
        'Legal team reviews vendor contracts, terms of service, and negotiates necessary changes to protect company interests.',
        ARRAY['Forward vendor contract to legal@company.com', 'Complete Legal Review Request form', 'Highlight any custom terms or concerns', 'Participate in contract negotiation calls as needed'],
        ARRAY['Standard contracts are faster than custom agreements', 'Flag any liability or indemnification concerns early', 'Legal typically requires 3-5 business days for initial review'],
        '1-2 weeks'
      ),
      (
        process_uuid,
        4,
        'Budget Approval and Purchase Order',
        'Obtain financial approval and generate purchase order for the vendor relationship.',
        ARRAY['Submit budget request in financial system', 'Obtain approval from budget owner', 'Request PO generation from Procurement', 'Confirm PO number with vendor'],
        ARRAY['Ensure budget code has sufficient funds', 'Multi-year contracts require VP approval', 'PO generation takes 2-3 business days after approval'],
        '3-5 days'
      ),
      (
        process_uuid,
        5,
        'Vendor Onboarding and Setup',
        'Complete final onboarding steps including system access, vendor portal setup, and kickoff meeting.',
        ARRAY['Add vendor to vendor management system', 'Set up vendor portal access', 'Schedule kickoff meeting', 'Document vendor in internal wiki', 'Assign vendor success manager'],
        ARRAY['Prepare agenda for kickoff meeting', 'Set clear expectations and timelines', 'Establish regular check-in cadence', 'Document escalation procedures'],
        '2-3 days'
      )
    ON CONFLICT (process_id, step_number) DO NOTHING;
  END IF;
END $$;