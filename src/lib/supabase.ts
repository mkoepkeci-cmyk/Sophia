import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface GovernanceProcess {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: string;
  process_id: string;
  step_number: number;
  title: string;
  description: string;
  required_actions: string[];
  tips: string[];
  estimated_duration: string | null;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  process_id: string;
  current_step: number;
  completed_steps: number[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  process_id: string | null;
  message: string;
  is_user: boolean;
  created_at: string;
}
