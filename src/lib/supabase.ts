import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client if env vars are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured. Database features will be disabled.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

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

export interface GovernanceType {
  id: string;
  name: string;
  description: string;
  phases_included: string[];
  phases_skipped: string[];
  estimated_duration: string | null;
  created_at: string;
}

export interface PreApprovedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  system_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRequest {
  id: string;
  user_id: string;
  dmnd_number: string | null;
  title: string;
  governance_type_id: string | null;
  current_phase: string;
  status: string;
  created_at: string;
  updated_at: string;
}
