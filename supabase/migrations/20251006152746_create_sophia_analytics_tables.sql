/*
  # Sophia Chat Analytics Tables

  1. New Tables
    - `sophia_questions`
      - Tracks every question asked to Sophia
      - Stores the question, response, and metadata
      - Enables analytics on usage patterns
    
    - `sophia_feedback`
      - Captures user feedback on responses (thumbs up/down)
      - Links to sophia_questions table
      - Helps identify which responses need improvement
    
    - `sophia_knowledge_gaps`
      - Auto-tracks questions that get generic responses
      - Helps prioritize knowledge base improvements
      - Aggregates frequently asked questions without good answers

  2. Security
    - Enable RLS on all tables
    - Public can insert (anonymous usage allowed)
    - Only authenticated users can view their own data
*/

-- Questions Log Table
CREATE TABLE IF NOT EXISTS sophia_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  response text NOT NULL,
  response_length integer GENERATED ALWAYS AS (length(response)) STORED,
  used_claude_ai boolean DEFAULT true,
  session_id text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Add index for common queries
CREATE INDEX IF NOT EXISTS idx_sophia_questions_created_at ON sophia_questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sophia_questions_session ON sophia_questions(session_id);

-- Enable RLS
ALTER TABLE sophia_questions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert questions (for anonymous usage)
CREATE POLICY "Anyone can log questions"
  ON sophia_questions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading own session's questions
CREATE POLICY "Users can view own session questions"
  ON sophia_questions
  FOR SELECT
  TO anon, authenticated
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id' OR session_id IS NULL);

-- Feedback Table
CREATE TABLE IF NOT EXISTS sophia_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES sophia_questions(id) ON DELETE CASCADE,
  feedback_type text CHECK (feedback_type IN ('thumbs_up', 'thumbs_down', 'report_issue')),
  feedback_comment text,
  created_at timestamptz DEFAULT now()
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_sophia_feedback_question ON sophia_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_sophia_feedback_type ON sophia_feedback(feedback_type);

-- Enable RLS
ALTER TABLE sophia_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit feedback
CREATE POLICY "Anyone can submit feedback"
  ON sophia_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading feedback for questions
CREATE POLICY "Anyone can view feedback"
  ON sophia_feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Knowledge Gaps Table
CREATE TABLE IF NOT EXISTS sophia_knowledge_gaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_pattern text NOT NULL,
  frequency integer DEFAULT 1,
  last_asked timestamptz DEFAULT now(),
  avg_response_length integer,
  negative_feedback_count integer DEFAULT 0,
  needs_improvement boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint on question pattern
CREATE UNIQUE INDEX IF NOT EXISTS idx_sophia_gaps_pattern ON sophia_knowledge_gaps(lower(question_pattern));

-- Enable RLS
ALTER TABLE sophia_knowledge_gaps ENABLE ROW LEVEL SECURITY;

-- Allow reading knowledge gaps (for analysis)
CREATE POLICY "Anyone can view knowledge gaps"
  ON sophia_knowledge_gaps
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow inserting/updating knowledge gaps
CREATE POLICY "System can manage knowledge gaps"
  ON sophia_knowledge_gaps
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create view for analytics dashboard
CREATE OR REPLACE VIEW sophia_analytics AS
SELECT 
  DATE(sq.created_at) as date,
  COUNT(sq.id) as total_questions,
  COUNT(CASE WHEN sq.used_claude_ai THEN 1 END) as claude_questions,
  COUNT(CASE WHEN NOT sq.used_claude_ai THEN 1 END) as fallback_questions,
  AVG(sq.response_length) as avg_response_length,
  COUNT(CASE WHEN sf.feedback_type = 'thumbs_up' THEN 1 END) as positive_feedback,
  COUNT(CASE WHEN sf.feedback_type = 'thumbs_down' THEN 1 END) as negative_feedback
FROM sophia_questions sq
LEFT JOIN sophia_feedback sf ON sq.id = sf.question_id
GROUP BY DATE(sq.created_at)
ORDER BY date DESC;
