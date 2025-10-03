export interface PhaseAction {
  ci?: string[];
  cmpgm?: string[];
  it?: string[];
  systemLeader?: string[];
  validator?: string[];
}

export interface Notification {
  email?: string;
  statusChange?: string;
  nextPhase?: string;
  manualCheck: string;
}

export interface Responsibility {
  role: string;
  roleColor: string;
  actions: string[];
  contact?: string;
}

export interface Outcome {
  status: string;
  meaning: string;
  whatHappens: string;
  icon: string;
  color: string;
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
  contactRole?: string;
}

export interface Resource {
  name: string;
  link: string;
}

export interface ExternalLinks {
  spw?: string;
  employeeCentral?: string;
  other?: Record<string, string>;
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  color: string;
  description: string;
  actions: PhaseAction;
  notifications: Notification;
  responsibilities: Responsibility[];
  outcomes: Outcome[];
  troubleshooting: TroubleshootingItem[];
  meetings: string[];
  resources?: Resource[];
  externalLinks?: ExternalLinks;
}

export const phasesData: Record<string, Phase> = {
  intake: {
    id: 'intake',
    name: 'Intake',
    order: 1,
    color: 'bg-pink-600',
    description: 'Request creation and internal market review (Draft State)',

    actions: {
      ci: [
        'Submit Intake form via EmployeeCentral > Technology > EHR Change > Optimization Request',
        'Create Optimization Folder in Google Drive with 5 subfolders (01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout)',
        'Create folder in System CI > System Policies/Initiatives',
        'Create SCI Workbook copy from template',
        'Partner with System Leader to gather intake details',
        'Create Intake Slides from template and save in 01_Intake folder',
        'Complete Intake Form in SPM (click Submit, NOT Save as Draft)',
        'Receive DMND number and rename folder to "DMD####### Title"',
        'Update Status to "Approved" after System Leader review'
      ],
      systemLeader: [
        'Review Draft Request for completeness and business alignment',
        'Request clarifications if needed',
        'Approve request to move to Vetting'
      ]
    },

    notifications: {
      email: 'Confirmation email with DMND number sent automatically upon form submission',
      statusChange: 'System Leader updates Status to "Approved" in SPW when ready for Vetting',
      nextPhase: 'Vetting task automatically opens when Intake task status = Approved',
      manualCheck: 'Search your DMND number in Strategic Planning Workspace (SPW) anytime to check current phase and status'
    },

    responsibilities: [
      {
        role: 'Clinical Informaticist (You)',
        roleColor: 'text-blue-600',
        actions: [
          'Submit Intake form',
          'Create all required folders and documentation',
          'Complete Intake Slides',
          'Update Status to Approved after internal review',
          'Partner with System Leader for business context'
        ]
      },
      {
        role: 'System Informatics Leader',
        roleColor: 'text-gray-700',
        actions: [
          'Reviews Draft Request for completeness',
          'Validates scope and priority alignment',
          'Requests additional information if needed',
          'Approves request to proceed to Vetting'
        ]
      },
      {
        role: 'System (Automated)',
        roleColor: 'text-green-600',
        actions: [
          'Creates DMND number upon submission',
          'Sends confirmation email',
          'Opens Vetting task when Status = Approved'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Approved',
        meaning: 'Ready for governance review',
        whatHappens: 'Intake task closes as "Closed Complete" and Vetting task automatically opens',
        icon: '✅',
        color: 'text-green-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'Cannot find my DMND number',
        solution: 'Check your confirmation email. Search SPW by request title if email is missing. Contact IT Support if still unable to locate.',
        contactRole: 'IT Support'
      },
      {
        problem: 'Status stuck at "New" - not moving to Vetting',
        solution: 'Verify System Informatics Leader has approved. Check SPW to confirm Status = Approved. Follow up with System Leader if delayed.',
        contactRole: 'System Informatics Leader'
      },
      {
        problem: 'Missing required Intake Slides template',
        solution: 'Request access to template from SCI leadership or check knowledge base for template location.',
        contactRole: 'SCI Leadership'
      },
      {
        problem: 'Do not click "Save as Draft" warning',
        solution: 'Always click "Submit" when creating SPM request. "Save as Draft" causes tracking issues.',
        contactRole: null
      }
    ],

    meetings: ['Internal Market Review with System Leader'],

    resources: [
      { name: 'Intake Slides Template', link: '/templates/intake-slides' },
      { name: 'SCI Workbook Template', link: '/templates/sci-workbook' },
      { name: 'Required Intake Fields Guide', link: '/guides/intake-fields' }
    ]
  },

  vetting: {
    id: 'vetting',
    name: 'Vetting',
    order: 2,
    color: 'bg-blue-600',
    description: 'PeriSCOPE Meeting - Initial governance review for completeness and feasibility',

    actions: {
      ci: [
        'Attend PeriSCOPE meeting (optional, available for questions)',
        'Respond to any additional information requests',
        'Update Intake documentation if "Further Review Needed"'
      ],
      cmpgm: [
        'Review Draft Request for completeness',
        'Update Status to "Ready for Agenda" when ready for PeriSCOPE',
        'Present request at PeriSCOPE meeting',
        'Document PeriSCOPE decision in task notes',
        'Update Status based on outcome (Ready for Prioritization, Further Review Needed, or Dismissed)',
        'Set "Clinical Sponsorship Required" = Yes if Define phase needed'
      ]
    },

    notifications: {
      email: 'Email notification when added to PeriSCOPE agenda (from CM PgM)',
      statusChange: 'After PeriSCOPE meeting, status changes to: Ready for Prioritization, Further Review Needed, or Dismissed',
      nextPhase: 'If approved, Prioritization task automatically opens. If Clinical Sponsorship Required = Yes, Define task also opens.',
      manualCheck: 'Search your DMND number in SPW > ALL - EHR System > Vetting filter to check current status'
    },

    responsibilities: [
      {
        role: 'CM Program Manager (Lead)',
        roleColor: 'text-pink-600',
        actions: [
          'Reviews request for completeness',
          'Adds to PeriSCOPE agenda',
          'Presents at PeriSCOPE meeting',
          'Documents decision and updates status',
          'Sets Clinical Sponsorship flag if needed'
        ],
        contact: 'Change Management Team'
      },
      {
        role: 'Clinical Informaticist (Attendee)',
        roleColor: 'text-blue-600',
        actions: [
          'Attends PeriSCOPE (optional)',
          'Available to answer questions',
          'Responds to information requests if Further Review Needed'
        ]
      },
      {
        role: 'PeriSCOPE Committee',
        roleColor: 'text-gray-700',
        actions: [
          'Reviews request alignment with governance',
          'Validates scope and feasibility',
          'Determines if ready for prioritization',
          'Identifies if Clinical Service Line approval needed'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Ready for Prioritization',
        meaning: 'Approved - moving to SCOPE',
        whatHappens: 'Vetting task closes, Prioritization task opens automatically',
        icon: '✅',
        color: 'text-green-600'
      },
      {
        status: 'Further Review Needed',
        meaning: 'Additional information required',
        whatHappens: 'Intake task reopens. CI provides missing details, then resubmits to Vetting.',
        icon: '⚠️',
        color: 'text-yellow-600'
      },
      {
        status: 'Dismissed',
        meaning: 'Request rejected at PeriSCOPE',
        whatHappens: 'Request closes permanently. No further action.',
        icon: '❌',
        color: 'text-red-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'Did not receive PeriSCOPE agenda email',
        solution: 'Check SPW manually using DMND number. Verify Status = Ready for Agenda. Email notifications may be delayed. Check spam folder.',
        contactRole: 'CM Program Manager'
      },
      {
        problem: 'Status has not updated after PeriSCOPE meeting',
        solution: 'Contact CM Program Manager. They update status after meeting. Check SPW for manual status check.',
        contactRole: 'CM Program Manager'
      },
      {
        problem: 'Not sure if Clinical Sponsorship is required',
        solution: 'CM PgM determines this at PeriSCOPE. If yes, Define task will automatically open. Check task list in SPW.',
        contactRole: null
      }
    ],

    meetings: ['PeriSCOPE Meeting (bi-weekly)']
  },

  prioritization: {
    id: 'prioritization',
    name: 'Prioritization',
    order: 3,
    color: 'bg-orange-500',
    description: 'SCOPE Meeting - Effort scoring and priority ranking',

    actions: {
      ci: [
        'Participate in Effort Scoring meeting with System Informaticists and IT',
        'Update Status to "Ready for Agenda" after BOTH CI and IT complete scoring',
        'Wait for SCOPE meeting decision',
        'Review ranked priority assigned by SCOPE'
      ],
      cmpgm: [
        'Add request to SCOPE agenda when Status = Ready for Agenda',
        'Present request at SCOPE meeting',
        'Document ranked priority (1-10 scale)',
        'Update Status based on SCOPE decision'
      ],
      it: [
        'Participate in Effort Scoring meeting',
        'Complete IT effort scoring section',
        'Coordinate with CI before updating Status to Ready for Agenda'
      ]
    },

    notifications: {
      email: 'Email when CM PgM adds to SCOPE agenda (after you update to Ready for Agenda)',
      statusChange: 'After SCOPE meeting, status changes to: Ready for Design, Further Review Needed, Dismissed, or Needs Define',
      nextPhase: 'When Status = Ready for Design, Design task automatically opens',
      manualCheck: 'Search DMND number in SPW > ALL - EHR System > Prioritization filter to check progress'
    },

    responsibilities: [
      {
        role: 'Clinical Informaticist (You)',
        roleColor: 'text-blue-600',
        actions: [
          'Completes Effort Scoring with System Informaticists',
          'Coordinates with IT on effort scoring',
          'Updates Status to "Ready for Agenda" when both CI and IT scoring complete',
          'Reviews ranked priority after SCOPE'
        ]
      },
      {
        role: 'IT Process Owner / IT Analyst',
        roleColor: 'text-green-600',
        actions: [
          'Completes IT Effort Scoring',
          'Participates in scoring discussion',
          'Confirms completion before Status update'
        ],
        contact: 'IT Applications Team'
      },
      {
        role: 'CM Program Manager',
        roleColor: 'text-pink-600',
        actions: [
          'Adds to SCOPE agenda when Ready',
          'Presents at SCOPE meeting',
          'Documents ranked priority (1-10)',
          'Updates Status based on decision'
        ]
      },
      {
        role: 'SCOPE Committee',
        roleColor: 'text-gray-700',
        actions: [
          'Reviews effort score',
          'Assigns priority ranking (1-10)',
          'Determines if Define phase needed',
          'Approves to proceed or requests more info'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Ready for Design',
        meaning: 'Approved - proceeding to design',
        whatHappens: 'Prioritization task closes, Design task opens. Ranked priority documented.',
        icon: '✅',
        color: 'text-green-600'
      },
      {
        status: 'Further Review Needed',
        meaning: 'More information required',
        whatHappens: 'Intake task reopens. CI provides additional details.',
        icon: '⚠️',
        color: 'text-yellow-600'
      },
      {
        status: 'Dismissed',
        meaning: 'Request rejected at SCOPE',
        whatHappens: 'Request closes permanently.',
        icon: '❌',
        color: 'text-red-600'
      },
      {
        status: 'Needs Define',
        meaning: 'Requires Clinical Service Line approval',
        whatHappens: 'Define task created (if not already existing from Vetting)',
        icon: '🔄',
        color: 'text-purple-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'IT has not completed effort scoring',
        solution: 'Follow up with IT Process Owner. Cannot proceed to SCOPE until both CI and IT scoring complete.',
        contactRole: 'IT Process Owner'
      },
      {
        problem: 'Status not updating after SCOPE meeting',
        solution: 'Contact CM Program Manager. They are responsible for post-SCOPE status update.',
        contactRole: 'CM Program Manager'
      },
      {
        problem: 'Did not receive SCOPE agenda notification',
        solution: 'Check SPW manually. Search DMND number. Verify Status = Ready for Agenda.',
        contactRole: null
      }
    ],

    meetings: ['Effort Scoring Meeting', 'SCOPE Meeting (bi-weekly)']
  },

  define: {
    id: 'define',
    name: 'Define',
    order: 4,
    color: 'bg-purple-600',
    description: 'Clinical Service Line approval and sponsorship (Optional Phase)',

    actions: {
      ci: [
        'Secure agenda time with Clinical Service Line group',
        'Enter Primary Define Agenda Date in task',
        'Present request to Clinical Service Line meeting',
        'Enter Primary Define Approval Date after CLS approves',
        'Update Status to "Approved" only after FINAL approval if multiple bodies required',
        'If multiple approval bodies: repeat for each required CLS group'
      ],
      cmpgm: [
        'Enters Primary Define Body (which Clinical Service Line)',
        'Tracks Define progress',
        'Coordinates if multiple CLS approvals needed'
      ]
    },

    notifications: {
      statusChange: 'You update Status to "Approved" after Clinical Service Line approval',
      nextPhase: 'When Status = Approved, Define task closes and you can proceed to Design',
      manualCheck: 'Check SPW Define task for current status. If multiple CLS approvals needed, track each separately.'
    },

    responsibilities: [
      {
        role: 'Clinical Informaticist (You - Lead)',
        roleColor: 'text-blue-600',
        actions: [
          'Secures agenda time with CLS',
          'Presents request to Clinical Service Line',
          'Enters agenda and approval dates',
          'Updates Status to Approved after final approval',
          'Coordinates multiple CLS approvals if needed'
        ]
      },
      {
        role: 'Clinical Service Line Representative',
        roleColor: 'text-teal-600',
        actions: [
          'Reviews clinical impact and alignment',
          'Provides clinical sponsorship',
          'Approves or requests more information',
          'May identify additional stakeholders'
        ]
      },
      {
        role: 'CM Program Manager',
        roleColor: 'text-pink-600',
        actions: [
          'Enters Primary Define Body name',
          'Tracks Define progress',
          'Supports with multiple approvals if needed'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Approved',
        meaning: 'Clinical Service Line has approved',
        whatHappens: 'Define task closes. You can proceed to Design phase.',
        icon: '✅',
        color: 'text-green-600'
      },
      {
        status: 'Further Review Needed',
        meaning: 'CLS requests additional information',
        whatHappens: 'Intake task reopens for more details. Re-present to CLS after updates.',
        icon: '⚠️',
        color: 'text-yellow-600'
      },
      {
        status: 'Dismissed',
        meaning: 'Clinical Service Line does not support',
        whatHappens: 'Request closes permanently. No clinical sponsorship.',
        icon: '❌',
        color: 'text-red-600'
      },
      {
        status: 'In Progress',
        meaning: 'Working to secure CLS agenda time',
        whatHappens: 'CI continues coordinating with CLS for meeting slot.',
        icon: '🔄',
        color: 'text-blue-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'Cannot get on Clinical Service Line agenda',
        solution: 'Contact CLS representative directly. Escalate to SCI leadership if urgency requires faster scheduling.',
        contactRole: 'CLS Representative or SCI Leadership'
      },
      {
        problem: 'Multiple Clinical Service Lines need to approve - not sure when to update Status',
        solution: 'Only update Status to "Approved" after the FINAL approval. Track each CLS approval in Work Notes.',
        contactRole: null
      },
      {
        problem: 'Clinical Service Line dismissed request - can I appeal?',
        solution: 'Discuss with SCI leadership. May need additional clinical evidence or stakeholder support.',
        contactRole: 'SCI Leadership'
      }
    ],

    meetings: ['Clinical Service Line (CLS) Define Body Meeting']
  },

  design: {
    id: 'design',
    name: 'Design',
    order: 5,
    color: 'bg-indigo-600',
    description: 'Design sessions, approvals, and build preparation',

    actions: {
      ci: [
        'For Cerner: Wait for 2-week "Resources Needed" window to close before scheduling design sessions',
        'For Cerner: Schedule design sessions (avoid Tue/Wed, minimum 2 weeks notice)',
        'For Epic: Coordinate with IT Process Owner or Applications Engineer on scheduling',
        'Lead design discussion in all sessions',
        'Document design decisions in appropriate form (Cerner: design docs, Epic: Epic Opt Form)',
        'Identify and enter Validators',
        'Complete design approvals and signatures',
        'Update Status through design progression'
      ],
      cmpgm: [
        'For Cerner: Sets Status to "Resources Needed" to open 2-week participant window',
        'Tracks design progress',
        'Supports with escalations if needed'
      ],
      it: [
        'For Cerner: Regional CIs and IT add themselves as Design Participants during Resources Needed',
        'For Epic: Applications Engineer schedules sessions (single-app) or Process Owner schedules initial (multi-team)',
        'IT Leaders add Application Group and Assignee',
        'Participates in design sessions',
        'Completes technical design documentation'
      ],
      validator: [
        'Identified during Design phase by Primary CI',
        'Will be notified when build moves to Testing status',
        'Tests in non-prod environment',
        'Documents validation in Work Notes',
        'Final validator updates Status to "Validated Successfully Non Prod"'
      ]
    },

    notifications: {
      email: 'For Cerner: Regional CIs notified when Status = Resources Needed (2-week window to add themselves as participants)',
      statusChange: 'Status progresses through: Resources Needed → Design Sessions → Signatures → Ready for Build',
      nextPhase: 'When design complete and approved, Build task opens',
      manualCheck: 'Check SPW Design task for current status. For Cerner, switch view from "Default" to "EHR" to see Design Participants section.'
    },

    responsibilities: [
      {
        role: 'Clinical Informaticist (You - Lead)',
        roleColor: 'text-blue-600',
        actions: [
          'For Cerner: Schedules design sessions after Resources Needed closes',
          'For Epic: Coordinates with IT on scheduling',
          'Leads all design discussions',
          'Documents design decisions',
          'Identifies validators',
          'Obtains design approvals'
        ]
      },
      {
        role: 'IT Applications Engineer',
        roleColor: 'text-green-600',
        actions: [
          'For Epic single-app: Schedules all design sessions',
          'For Epic multi-team: Schedules follow-up sessions (after PO initial)',
          'Participates in design',
          'Completes technical design specs'
        ]
      },
      {
        role: 'IT Process Owner',
        roleColor: 'text-green-700',
        actions: [
          'For Epic multi-team: Schedules initial design session',
          'Reviews and approves design',
          'Coordinates with Applications Engineers'
        ]
      },
      {
        role: 'Regional Clinical Informaticists',
        roleColor: 'text-blue-500',
        actions: [
          'For Cerner: Add themselves as Design Participants during Resources Needed',
          'Attend design sessions for their region',
          'Provide regional workflow input'
        ]
      },
      {
        role: 'Validators',
        roleColor: 'text-purple-600',
        actions: [
          'Selected by Primary CI during Design',
          'Test in non-prod when notified',
          'Test in prod after deployment',
          'Document validation results'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Resources Needed',
        meaning: 'Cerner only: 2-week window for participants to add themselves',
        whatHappens: 'Regional CIs and IT add themselves as Design Participants. Wait 2 weeks before scheduling sessions.',
        icon: '👥',
        color: 'text-blue-600'
      },
      {
        status: 'Design Sessions',
        meaning: 'Active design work in progress',
        whatHappens: 'Sessions scheduled and completed. Design documented.',
        icon: '🎨',
        color: 'text-purple-600'
      },
      {
        status: 'Signatures',
        meaning: 'Design complete, awaiting approvals',
        whatHappens: 'Collecting required approvals from stakeholders.',
        icon: '✍️',
        color: 'text-indigo-600'
      },
      {
        status: 'Ready for Build',
        meaning: 'Design approved, ready for development',
        whatHappens: 'Design task closes, Build task opens.',
        icon: '✅',
        color: 'text-green-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'For Cerner: Cannot see Design Participants section',
        solution: 'Ensure Status = Resources Needed. Switch view from "Default" to "EHR" in SPW. Contact CM PgM if still missing.',
        contactRole: 'CM Program Manager'
      },
      {
        problem: 'For Cerner: No one signing up as Design Participants',
        solution: 'Follow up directly with regional CIs and IT leadership. May need to schedule sessions and invite manually.',
        contactRole: 'Regional CI Leadership'
      },
      {
        problem: 'For Epic: Not sure who schedules design sessions',
        solution: 'Single-app: Applications Engineer schedules. Multi-team: IT Process Owner schedules first, Engineer schedules additional.',
        contactRole: 'IT Process Owner'
      },
      {
        problem: 'Having trouble identifying validators',
        solution: 'Choose informaticists with: access to affected environment/domain, workflow knowledge, testing ability. Need validators for each Cerner Target Domain.',
        contactRole: null
      }
    ],

    meetings: ['Design Sessions', 'For Cerner: Design Review Call', 'For Epic: Refinement Call']
  },

  develop: {
    id: 'develop',
    name: 'Build & Test',
    order: 6,
    color: 'bg-teal-600',
    description: 'Build, testing, validation, and pre-production verification',

    actions: {
      ci: [
        'Monitor build progress',
        'Coordinate with IT on build questions',
        'When Status = Testing: Notify validators to begin non-prod testing',
        'Review validation documentation in Work Notes',
        'After non-prod validation: Coordinate with IT on production deployment timing'
      ],
      it: [
        'Complete build in non-prod environment',
        'Update Status to "Testing" when ready for validation',
        'Support validators with build questions',
        'Deploy to production after validation complete',
        'Update Status to "Prod Validation" after prod deployment'
      ],
      validator: [
        'Receive email notification when Status = Testing',
        'Test build in non-prod environment',
        'Document validation results in Work Notes',
        'Final validator updates Status to "Validated Successfully Non Prod"',
        'After prod deployment: Test in production',
        'Final validator updates Status to "Validated Successfully Prod"'
      ]
    },

    notifications: {
      email: 'Validators receive email when Status = Testing (non-prod) and Status = Prod Validation (production)',
      statusChange: 'Status progresses: Building → Testing → Validated Successfully Non Prod → Prod Validation → Validated Successfully Prod',
      nextPhase: 'After prod validation complete, Deploy/Close-out phase begins',
      manualCheck: 'Check SPW Build task for current status. Validators check Work Notes for testing instructions.'
    },

    responsibilities: [
      {
        role: 'IT Applications Engineer',
        roleColor: 'text-green-600',
        actions: [
          'Builds enhancement in non-prod',
          'Updates Status to "Testing" when ready',
          'Supports validators with questions',
          'Deploys to production after validation',
          'Updates Status to "Prod Validation"'
        ]
      },
      {
        role: 'Clinical Informaticist (You)',
        roleColor: 'text-blue-600',
        actions: [
          'Monitors build progress',
          'Confirms validators received notification',
          'Reviews validation documentation',
          'Coordinates production deployment timing',
          'Prepares for go-live communication'
        ]
      },
      {
        role: 'Validators',
        roleColor: 'text-purple-600',
        actions: [
          'Tests in non-prod when Status = Testing',
          'Documents results in Work Notes',
          'Final validator updates to "Validated Successfully Non Prod"',
          'Tests in prod when Status = Prod Validation',
          'Final validator updates to "Validated Successfully Prod"'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Building',
        meaning: 'IT is actively building in non-prod',
        whatHappens: 'Wait for IT to complete build and update Status to Testing',
        icon: '🔨',
        color: 'text-orange-600'
      },
      {
        status: 'Testing',
        meaning: 'Ready for non-prod validation',
        whatHappens: 'Validators receive email. Begin testing in non-prod environment.',
        icon: '🧪',
        color: 'text-blue-600'
      },
      {
        status: 'Validated Successfully Non Prod',
        meaning: 'Non-prod testing passed',
        whatHappens: 'IT deploys to production. Then updates Status to Prod Validation.',
        icon: '✅',
        color: 'text-green-600'
      },
      {
        status: 'Prod Validation',
        meaning: 'Deployed to prod, ready for prod testing',
        whatHappens: 'Validators receive email. Begin testing in production environment.',
        icon: '🚀',
        color: 'text-purple-600'
      },
      {
        status: 'Validated Successfully Prod',
        meaning: 'Production testing passed',
        whatHappens: 'Enhancement is live. Proceed to close-out activities.',
        icon: '✅',
        color: 'text-green-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'Validators did not receive notification',
        solution: 'Verify Status = Testing (or Prod Validation). Check validators are listed in task. Manually notify validators. Verify email addresses.',
        contactRole: 'IT Applications Engineer'
      },
      {
        problem: 'Not sure who is the "final validator" who updates Status',
        solution: 'Final validator is the LAST person to complete testing among all listed validators. All document in Work Notes; last one updates Status.',
        contactRole: null
      },
      {
        problem: 'Build failed validation - issues found',
        solution: 'Document issues in Work Notes. Coordinate with IT on fixes. IT will update build. Retest when Status returns to Testing.',
        contactRole: 'IT Applications Engineer'
      },
      {
        problem: 'Status stuck at Testing - validators not responding',
        solution: 'Follow up directly with validators. Escalate to validator leadership if no response. May need to identify backup validators.',
        contactRole: 'Validator Leadership'
      }
    ],

    meetings: []
  },

  deploy: {
    id: 'deploy',
    name: 'Deploy & Close',
    order: 7,
    color: 'bg-green-600',
    description: 'Production deployment, communication, and request close-out',

    actions: {
      ci: [
        'Create and distribute end-user communication about the change',
        'Coordinate go-live support if needed',
        'Monitor for issues post-deployment',
        'Complete close-out documentation',
        'Update final metrics and lessons learned',
        'Close request when all activities complete'
      ],
      it: [
        'Monitors production stability',
        'Supports any post-deployment issues',
        'Completes technical close-out documentation'
      ]
    },

    notifications: {
      statusChange: 'Status = "Validated Successfully Prod" indicates deployment complete',
      manualCheck: 'Check SPW for close-out task. Verify all documentation complete before closing.',
      email: undefined,
      nextPhase: undefined
    },

    responsibilities: [
      {
        role: 'Clinical Informaticist (You - Lead)',
        roleColor: 'text-blue-600',
        actions: [
          'Creates end-user communication',
          'Distributes change notification',
          'Provides go-live support',
          'Monitors for issues',
          'Completes close-out documentation',
          'Closes request'
        ]
      },
      {
        role: 'IT Applications Engineer',
        roleColor: 'text-green-600',
        actions: [
          'Monitors production',
          'Supports post-deployment issues',
          'Completes technical documentation'
        ]
      },
      {
        role: 'End Users',
        roleColor: 'text-gray-600',
        actions: [
          'Receive change communication',
          'Adopt new enhancement',
          'Report any issues'
        ]
      }
    ],

    outcomes: [
      {
        status: 'Closed Complete',
        meaning: 'Enhancement successfully deployed and closed',
        whatHappens: 'Request lifecycle complete. Enhancement live in production.',
        icon: '✅',
        color: 'text-green-600'
      }
    ],

    troubleshooting: [
      {
        problem: 'Post-deployment issues reported by users',
        solution: 'Document in Work Notes. Coordinate with IT for hotfix if critical. May require follow-up enhancement request.',
        contactRole: 'IT Applications Engineer'
      },
      {
        problem: 'Not sure what close-out documentation is required',
        solution: 'Check SPW close-out checklist. Typically: final communication, lessons learned, metrics. Contact CM PgM for guidance.',
        contactRole: 'CM Program Manager'
      }
    ],

    meetings: []
  }
};

export const roleColors: Record<string, string> = {
  ci: 'text-blue-600',
  cmpgm: 'text-pink-600',
  it: 'text-green-600',
  systemLeader: 'text-gray-700',
  validator: 'text-purple-600'
};

export const roleNames: Record<string, string> = {
  ci: 'Clinical Informaticist',
  cmpgm: 'CM Program Manager',
  it: 'IT / Applications Engineer',
  systemLeader: 'System Leader',
  validator: 'Validator'
};
