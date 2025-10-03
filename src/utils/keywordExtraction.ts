/**
 * Knowledge base entities for keyword matching
 */
export const knowledgeBase = {
  phases: [
    'intake',
    'vetting',
    'prioritization',
    'define',
    'design',
    'develop',
    'deploy',
  ],
  meetings: [
    'periscope',
    'scope',
    'clinical service line',
    'cls define body meeting',
    'design review call',
    'refinement',
    'epic refinement',
  ],
  roles: [
    'clinical informaticist',
    'requesting clinical informaticist',
    'change management program manager',
    'cm pgm',
    'it process owner',
    'it analyst',
    'system leader',
    'validator',
    'design participant',
  ],
  statuses: [
    'new',
    'draft',
    'approved',
    'ready for agenda',
    'complete',
    'resources needed',
    'in design',
    'ready for prioritization',
    'ready for design',
    'further review needed',
    'dismissed',
    'in progress',
    'needs define',
    'assigned',
    'building',
    'testing',
    'validated successfully non prod',
    'validated successfully prod',
    'release planning',
    'release assigned',
    'pending approval',
    'building in prod',
    'prod validation',
  ],
  systems: [
    'epic',
    'cerner',
    'meditech',
    'system',
  ],
  documents: [
    'intake slides',
    'design document',
    'epic opt form',
    'epic optimization form',
    'change communication',
    'sci workbook',
    'google drive',
  ],
  processes: [
    'governance templated',
    'full governance',
    'effort scoring',
    'validation',
    'design session',
    'rtasks',
  ],
};

/**
 * Extract keywords from user input
 */
export function extractKeywords(text: string): {
  phases: string[];
  meetings: string[];
  roles: string[];
  statuses: string[];
  systems: string[];
  documents: string[];
  processes: string[];
} {
  const lowerText = text.toLowerCase();

  const extracted = {
    phases: [] as string[],
    meetings: [] as string[],
    roles: [] as string[],
    statuses: [] as string[],
    systems: [] as string[],
    documents: [] as string[],
    processes: [] as string[],
  };

  // Check for each entity type
  for (const phase of knowledgeBase.phases) {
    if (lowerText.includes(phase)) {
      extracted.phases.push(phase);
    }
  }

  for (const meeting of knowledgeBase.meetings) {
    if (lowerText.includes(meeting)) {
      extracted.meetings.push(meeting);
    }
  }

  for (const role of knowledgeBase.roles) {
    if (lowerText.includes(role)) {
      extracted.roles.push(role);
    }
  }

  for (const status of knowledgeBase.statuses) {
    if (lowerText.includes(status)) {
      extracted.statuses.push(status);
    }
  }

  for (const system of knowledgeBase.systems) {
    if (lowerText.includes(system)) {
      extracted.systems.push(system);
    }
  }

  for (const doc of knowledgeBase.documents) {
    if (lowerText.includes(doc)) {
      extracted.documents.push(doc);
    }
  }

  for (const process of knowledgeBase.processes) {
    if (lowerText.includes(process)) {
      extracted.processes.push(process);
    }
  }

  return extracted;
}

/**
 * Calculate relevance score for a query
 */
export function calculateRelevance(
  query: string,
  keywords: ReturnType<typeof extractKeywords>
): number {
  let score = 0;

  // Weight different entity types
  score += keywords.phases.length * 3;
  score += keywords.meetings.length * 2;
  score += keywords.roles.length * 2;
  score += keywords.statuses.length * 2;
  score += keywords.systems.length * 1.5;
  score += keywords.documents.length * 1;
  score += keywords.processes.length * 1;

  // Bonus for question words
  const questionWords = ['what', 'who', 'when', 'where', 'why', 'how'];
  for (const word of questionWords) {
    if (query.toLowerCase().includes(word)) {
      score += 0.5;
      break;
    }
  }

  return score;
}

/**
 * Suggest related topics based on keywords
 */
export function suggestRelatedTopics(
  keywords: ReturnType<typeof extractKeywords>
): string[] {
  const suggestions: string[] = [];

  if (keywords.phases.length > 0) {
    const phase = keywords.phases[0];
    suggestions.push(`Learn more about the ${phase} phase workflow`);
    suggestions.push(`Who is responsible for tasks in ${phase}?`);
    suggestions.push(`What are the status transitions in ${phase}?`);
  }

  if (keywords.meetings.length > 0) {
    const meeting = keywords.meetings[0];
    suggestions.push(`What happens at ${meeting}?`);
    suggestions.push(`Who attends ${meeting}?`);
    suggestions.push(`How do I prepare for ${meeting}?`);
  }

  if (keywords.roles.length > 0) {
    const role = keywords.roles[0];
    suggestions.push(`What are the responsibilities of a ${role}?`);
    suggestions.push(`What phases does a ${role} work in?`);
  }

  if (keywords.systems.length > 0) {
    const system = keywords.systems[0];
    suggestions.push(`How does ${system} workflow differ?`);
    suggestions.push(`What's unique about ${system} design process?`);
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
}
