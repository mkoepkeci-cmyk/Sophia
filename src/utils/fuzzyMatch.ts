/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity score (0-1) between two strings
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  if (s1 === s2) return 1;

  const maxLength = Math.max(s1.length, s2.length);
  if (maxLength === 0) return 1;

  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / maxLength;
}

/**
 * Find best fuzzy match from a list of options
 */
export function fuzzyMatch(
  input: string,
  options: string[],
  threshold: number = 0.6
): { match: string; score: number } | null {
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const option of options) {
    const score = calculateSimilarity(input, option);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestMatch = option;
    }
  }

  return bestMatch ? { match: bestMatch, score: bestScore } : null;
}

/**
 * Normalize common variations of terms
 */
export function normalizeTerms(text: string): string {
  const normalized = text.toLowerCase();

  // Meeting name variations
  const meetingMap: Record<string, string> = {
    'peri scope': 'periscope',
    'peri-scope': 'periscope',
    'peroscope': 'periscope',
    'perscope': 'periscope',
    'cls define': 'clinical service line',
    'cls meeting': 'clinical service line',
    'service line': 'clinical service line',
    'design review': 'design review call',
    'design review meeting': 'design review call',
  };

  // Role variations
  const roleMap: Record<string, string> = {
    'ci': 'clinical informaticist',
    'sci': 'clinical informaticist',
    'system ci': 'clinical informaticist',
    'cm pgm': 'change management program manager',
    'change mgmt': 'change management program manager',
    'it owner': 'it process owner',
    'process owner': 'it process owner',
  };

  // Status variations
  const statusMap: Record<string, string> = {
    'ready for agenda': 'ready for agenda',
    'rfa': 'ready for agenda',
    'resources needed': 'resources needed',
    'in design': 'in design',
    'validated successfully non prod': 'validated successfully non prod',
    'validated non prod': 'validated successfully non prod',
    'validated prod': 'validated successfully prod',
    'validated successfully prod': 'validated successfully prod',
  };

  let result = normalized;

  // Apply all mappings
  const allMaps = { ...meetingMap, ...roleMap, ...statusMap };
  for (const [key, value] of Object.entries(allMaps)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    result = result.replace(regex, value);
  }

  return result;
}

/**
 * Extract acronyms and expand them
 */
export function expandAcronyms(text: string): string {
  const acronyms: Record<string, string> = {
    'spw': 'strategic planning workspace',
    'dmd': 'demand',
    'dmnd': 'demand',
    'ehr': 'electronic health record',
    'cls': 'clinical service line',
    'ci': 'clinical informaticist',
    'sci': 'clinical informaticist',
    'it': 'information technology',
    'cm': 'change management',
    'pgm': 'program manager',
    'fetr': 'feature',
    'rfa': 'ready for agenda',
  };

  let result = text;
  for (const [acronym, expansion] of Object.entries(acronyms)) {
    const regex = new RegExp(`\\b${acronym}\\b`, 'gi');
    result = result.replace(regex, `${acronym} (${expansion})`);
  }

  return result;
}
