export const governanceTypeKeywords = {
  templated: [
    'csh triage',
    'triage guideline',
    'epsr',
    'epic standard request',
    'radiology template',
    'lab template',
    'pharmacy maintenance',
    'pharmacy formulary',
    'maintenance request',
    'routine maintenance',
    'standard order set',
    'documentation template',
    'pre-approved',
    'templated request'
  ],
  full: [
    'new enhancement',
    'practice change',
    'clinical practice',
    'system-wide',
    'policy initiative',
    'multiple regions',
    'multiple markets',
    'service line review',
    'clinical sponsorship',
    'workflow change',
    'new functionality'
  ]
};

export function analyzeGovernanceType(description: string): {
  suggestedType: 'full' | 'templated' | 'unclear';
  confidence: 'high' | 'medium' | 'low';
  matchedKeywords: string[];
  reasoning: string;
} {
  const lowerDesc = description.toLowerCase();

  const templatedMatches = governanceTypeKeywords.templated.filter(keyword =>
    lowerDesc.includes(keyword)
  );

  const fullMatches = governanceTypeKeywords.full.filter(keyword =>
    lowerDesc.includes(keyword)
  );

  if (templatedMatches.length > fullMatches.length && templatedMatches.length >= 2) {
    return {
      suggestedType: 'templated',
      confidence: 'high',
      matchedKeywords: templatedMatches,
      reasoning: `Your request mentions ${templatedMatches.join(', ')}, which typically qualify for the Governance Templated pathway. This would skip vetting and prioritization, moving directly to design.`
    };
  }

  if (templatedMatches.length > 0 && fullMatches.length === 0) {
    return {
      suggestedType: 'templated',
      confidence: 'medium',
      matchedKeywords: templatedMatches,
      reasoning: `Your request appears to be related to ${templatedMatches.join(', ')}. If this is a pre-approved item on the CSH Triage Guidelines or EPSR list, you may qualify for Governance Templated pathway.`
    };
  }

  if (fullMatches.length > templatedMatches.length && fullMatches.length >= 2) {
    return {
      suggestedType: 'full',
      confidence: 'high',
      matchedKeywords: fullMatches,
      reasoning: `Your request involves ${fullMatches.join(', ')}, which requires the Full Governance pathway including vetting, prioritization, and potentially clinical service line review.`
    };
  }

  if (fullMatches.length > 0) {
    return {
      suggestedType: 'full',
      confidence: 'medium',
      matchedKeywords: fullMatches,
      reasoning: `Your request mentions ${fullMatches.join(', ')}, which typically requires Full Governance review. When in doubt, Full Governance is the recommended default pathway.`
    };
  }

  return {
    suggestedType: 'unclear',
    confidence: 'low',
    matchedKeywords: [],
    reasoning: 'Based on your description, I recommend starting with Full Governance unless your request is specifically on the CSH Triage Guidelines or EPSR list. Remember: all items are considered Full Governance unless the Governance Templated process has already been established.'
  };
}

export const governanceTypeGuidance = {
  full: {
    title: 'Full Governance Pathway',
    timeline: 'Weeks to months',
    phases: ['Intake', 'Vetting', 'Prioritization', 'Define (if needed)', 'Design', 'Develop', 'Deploy'],
    bestFor: [
      'New enhancements or functionality',
      'Clinical practice changes',
      'System-wide initiatives',
      'Multi-region/multi-market impacts',
      'Requests requiring clinical service line approval',
      'When unsure - default to Full Governance'
    ],
    keyMeetings: ['PeriSCOPE', 'SCOPE', 'Clinical Service Line (if needed)']
  },
  templated: {
    title: 'Governance Templated Pathway',
    timeline: 'Days to weeks',
    phases: ['Intake', 'Design', 'Develop', 'Deploy'],
    bestFor: [
      'Items in CSH Triage Guidelines (Cerner)',
      'Items on EPSR list (Epic)',
      'Radiology and Lab templated requests',
      'Pharmacy maintenance items (SCI Team only)',
      'Routine maintenance requests',
      'Pre-approved by leadership'
    ],
    keyBenefits: [
      'Faster processing time',
      'Bypasses PeriSCOPE and SCOPE',
      'Less administrative overhead',
      'Immediate design work'
    ]
  }
};
