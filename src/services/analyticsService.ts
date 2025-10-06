import { supabase } from '../lib/supabase';

interface QuestionLog {
  question: string;
  response: string;
  used_claude_ai: boolean;
  session_id?: string;
  user_agent?: string;
}

interface Feedback {
  question_id: string;
  feedback_type: 'thumbs_up' | 'thumbs_down' | 'report_issue';
  feedback_comment?: string;
}

/**
 * Log a question and response to analytics
 */
export async function logQuestion(data: QuestionLog): Promise<string | null> {
  try {
    const { data: result, error } = await supabase
      .from('sophia_questions')
      .insert({
        question: data.question,
        response: data.response,
        used_claude_ai: data.used_claude_ai,
        session_id: data.session_id || generateSessionId(),
        user_agent: data.user_agent || navigator.userAgent
      })
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Error logging question:', error);
      return null;
    }

    return result?.id || null;
  } catch (error) {
    console.error('Error logging question:', error);
    return null;
  }
}

/**
 * Submit feedback for a response
 */
export async function submitFeedback(data: Feedback): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('sophia_feedback')
      .insert({
        question_id: data.question_id,
        feedback_type: data.feedback_type,
        feedback_comment: data.feedback_comment
      });

    if (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}

/**
 * Track potential knowledge gap
 */
export async function trackKnowledgeGap(question: string, responseLength: number): Promise<void> {
  try {
    // Check if response seems generic (short responses might indicate lack of good answer)
    const isLikelyGap = responseLength < 200;

    if (!isLikelyGap) return;

    // Normalize question for pattern matching
    const pattern = normalizeQuestionPattern(question);

    // Check if gap already exists
    const { data: existing } = await supabase
      .from('sophia_knowledge_gaps')
      .select('id, frequency')
      .eq('question_pattern', pattern)
      .maybeSingle();

    if (existing) {
      // Increment frequency
      await supabase
        .from('sophia_knowledge_gaps')
        .update({
          frequency: existing.frequency + 1,
          last_asked: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    } else {
      // Create new gap entry
      await supabase
        .from('sophia_knowledge_gaps')
        .insert({
          question_pattern: pattern,
          frequency: 1,
          avg_response_length: responseLength,
          needs_improvement: true
        });
    }
  } catch (error) {
    console.error('Error tracking knowledge gap:', error);
  }
}

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary() {
  try {
    const { data, error } = await supabase
      .from('sophia_analytics')
      .select('*')
      .limit(30)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

/**
 * Get top knowledge gaps
 */
export async function getKnowledgeGaps() {
  try {
    const { data, error } = await supabase
      .from('sophia_knowledge_gaps')
      .select('*')
      .eq('needs_improvement', true)
      .order('frequency', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching knowledge gaps:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching knowledge gaps:', error);
    return null;
  }
}

// Helper functions

function generateSessionId(): string {
  // Generate a simple session ID based on timestamp and random string
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function normalizeQuestionPattern(question: string): string {
  // Normalize question to identify patterns
  return question
    .toLowerCase()
    .trim()
    .replace(/[?!.]/g, '')
    .substring(0, 100); // Limit length for pattern matching
}
