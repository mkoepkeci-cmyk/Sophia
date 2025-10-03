import { ChatMessage } from '../lib/supabase';
import { extractKeywords } from './keywordExtraction';

/**
 * Conversation context to track what's been discussed
 */
export interface ConversationContext {
  recentPhases: string[];
  recentSystems: string[];
  recentRoles: string[];
  recentMeetings: string[];
  recentStatuses: string[];
  lastTopic: string | null;
  disambiguationHistory: string[];
}

/**
 * Build context from chat history
 */
export function buildContext(chatHistory: ChatMessage[]): ConversationContext {
  const context: ConversationContext = {
    recentPhases: [],
    recentSystems: [],
    recentRoles: [],
    recentMeetings: [],
    recentStatuses: [],
    lastTopic: null,
    disambiguationHistory: [],
  };

  // Look at last 5 messages for context
  const recentMessages = chatHistory.slice(-5);

  for (const message of recentMessages) {
    const keywords = extractKeywords(message.message);

    // Collect unique phases
    for (const phase of keywords.phases) {
      if (!context.recentPhases.includes(phase)) {
        context.recentPhases.push(phase);
      }
    }

    // Collect unique systems
    for (const system of keywords.systems) {
      if (!context.recentSystems.includes(system)) {
        context.recentSystems.push(system);
      }
    }

    // Collect unique roles
    for (const role of keywords.roles) {
      if (!context.recentRoles.includes(role)) {
        context.recentRoles.push(role);
      }
    }

    // Collect unique meetings
    for (const meeting of keywords.meetings) {
      if (!context.recentMeetings.includes(meeting)) {
        context.recentMeetings.push(meeting);
      }
    }

    // Collect unique statuses
    for (const status of keywords.statuses) {
      if (!context.recentStatuses.includes(status)) {
        context.recentStatuses.push(status);
      }
    }
  }

  // Set last topic from most recent bot message
  const lastBotMessage = [...chatHistory].reverse().find(m => !m.is_user);
  if (lastBotMessage) {
    const keywords = extractKeywords(lastBotMessage.message);
    if (keywords.phases.length > 0) {
      context.lastTopic = keywords.phases[0];
    } else if (keywords.meetings.length > 0) {
      context.lastTopic = keywords.meetings[0];
    } else if (keywords.roles.length > 0) {
      context.lastTopic = keywords.roles[0];
    }
  }

  return context;
}

/**
 * Apply context to disambiguate a query
 */
export function applyContext(query: string, context: ConversationContext): string {
  let enrichedQuery = query;

  // If query is vague but we have context, enrich it
  const isVague = !query.match(/\b(intake|vetting|prioritization|define|design|develop|deploy|epic|cerner)\b/i);

  if (isVague && context.recentPhases.length > 0) {
    enrichedQuery = `${query} (context: ${context.recentPhases[0]} phase)`;
  }

  if (isVague && context.recentSystems.length > 0) {
    enrichedQuery = `${enrichedQuery} (context: ${context.recentSystems[0]} system)`;
  }

  return enrichedQuery;
}

/**
 * Determine if user is asking a follow-up question
 */
export function isFollowUpQuestion(query: string): boolean {
  const followUpIndicators = [
    'what about',
    'and then',
    'after that',
    'what next',
    'also',
    'how about',
    'what if',
    'that',
    'this',
    'it',
    'they',
    'them',
  ];

  const lowerQuery = query.toLowerCase();
  return followUpIndicators.some(indicator => lowerQuery.includes(indicator));
}

/**
 * Get context hints for the user
 */
export function getContextHints(context: ConversationContext): string[] {
  const hints: string[] = [];

  if (context.recentPhases.length > 0) {
    hints.push(`Recent topic: ${context.recentPhases[0]} phase`);
  }

  if (context.recentSystems.length > 0) {
    hints.push(`System context: ${context.recentSystems[0]}`);
  }

  if (context.recentRoles.length > 0) {
    hints.push(`Role context: ${context.recentRoles[0]}`);
  }

  return hints;
}

/**
 * Check if query needs system context
 */
export function needsSystemContext(query: string, context: ConversationContext): boolean {
  const lowerQuery = query.toLowerCase();

  // Questions about design, validation, or building that don't specify system
  const systemSensitiveTopics = ['design', 'validator', 'build', 'schedule', 'session'];
  const hasSensitiveTopic = systemSensitiveTopics.some(topic => lowerQuery.includes(topic));
  const hasSystemMention = /\b(epic|cerner|meditech)\b/i.test(query);

  return hasSensitiveTopic && !hasSystemMention && context.recentSystems.length > 0;
}

/**
 * Check if query needs phase context
 */
export function needsPhaseContext(query: string, context: ConversationContext): boolean {
  const lowerQuery = query.toLowerCase();

  // Questions about status or responsibilities that don't specify phase
  const phaseSensitiveTopics = ['status', 'responsible', 'update', 'who does', 'next step'];
  const hasSensitiveTopic = phaseSensitiveTopics.some(topic => lowerQuery.includes(topic));
  const hasPhaseMention = /\b(intake|vetting|prioritization|define|design|develop|deploy)\b/i.test(query);

  return hasSensitiveTopic && !hasPhaseMention && context.recentPhases.length > 0;
}
