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
  overview: string;
  faqContent: string;
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
    color: 'bg-[#BA4B9C]',
    overview: `## **PHASE 1: INTAKE**

### **Getting Started**
Submit your EHR Optimization Request via EmployeeCentral > Technology > Electronic Health Record > EHR Change > Optimization Request. Only Informaticists, LIS, Rev Cycle Resources, or Governance Liaisons can submit requests.

**Key Actions:**
1. **Submit the form** (click Submit, NOT "Save as Draft") - System creates a DMND number and Intake Task
2. **Set up your workspace:**
   - Create optimization folder in Request Folder Shared Drive with 5 subfolders (01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout)
   - **[SCI/System CI Only]** Create folder in System Clinical Informatics > System Policies/Initiatives
   - **[SCI/System CI Only]** Create and save SCI Workbook copy in BOTH folders
   - Rename folders to "DMND####### Title" after submission
3. **Create Intake Slides** from template
4. **Internal Review:** Update Status to "Approved" after your market/system team reviews

**What Happens Next:** Intake Task closes automatically and Vetting Task opens.

**Key Players:** Requesting CI leads; System Informatics Leader approves`,
    faqContent: `## **PHASE 1: INTAKE**

**Q: What do I need before starting an Intake request?**
A: Make sure you have:
- Your problem statement and proposed solution documented
- Clinical service line identified (if applicable)
- Stakeholder information
- Access to Google Drive and SPM

---

## **STEP 1: Submit the Request in SPM**

**Q: How do I create a request?**
A: Go to EmployeeCentral > Technology > Electronic Health Record > EHR Change > Optimization Request. Complete the form and click **Submit** (NOT "Save as Draft").

**Q: Who can submit an optimization request?**
A: Only these roles can submit:
- Informaticist
- LIS
- Rev Cycle Resource
- Governance Liaison

**Q: What information do I need for the Intake form?**
A: Required fields:
- Service Line: Clinical
- EHR system: Cerner, Epic, System, or System with Meditech
- Requesting Region
- Governance Type: Full Governance or Governance Templated
- Short Description (becomes the title)
- Primary User Affected
- Primary Clinical Informaticist
- Care Setting: Acute, Ambulatory, or Both
- Impacted Solutions
- Intake Slide link
- Google Drive link
- Benefit Score

**Q: What happens when I click Submit?**
A: The system **automatically creates**:
- A Parent Demand with a DMND number (e.g., DMND0000123)
- An Intake Task with Status: **New**

---

## **STEP 2: Set Up Your Project Workspace**

**Q: What folders do I need to create?**
A: In Request Folder Shared Drive - name it with your title (e.g., "System Valuables Policy Update")
- Create 5 subfolders:
  - 01_Intake
  - 02_Design
  - 03_Build_Test
  - 04_GoLive
  - 05_Closeout
- [SCI/System CI Only] Add the request folder in System Clinical Informatics > System Policies/Initiatives - name it with title and date (e.g., "System Valuables Policy Update March 2023")
- [SCI/System CI Only] Create a copy of the SCI Workbook template and save it in **both locations**: System Clinical Informatics > System Policies/Initiatives folder (DMND####### Title folder) and Request Folder Shared Drive (DMND####### Title folder) - so all team members can access it

**Q: When do I update the folder name with DMND number?**
A: After submission, update both folder names to: "DMND####### Title" (e.g., "DMND0000123 System Valuables Policy Update")

---

## **STEP 3: Create Intake Documentation**

**Q: What are Intake Slides and who creates them?**
A: The **Requesting Clinical Informaticist** creates Intake Slides from the template. This is a Google Slides presentation that summarizes:
- Request overview
- Clinical need/problem
- Proposed solution
- Benefit score
- Impact assessment
- Timeline estimate

Save these in the 01_Intake folder and link to them in the Intake form.

**Q: [SCI/System CI Only] Who do I partner with to gather intake details?**
A: The **System CI** works with the **System Leader** to obtain information and complete the Intake Form. Document your discussions in the Intake Questions tab of the SCI Workbook.

---

## **STEP 4: Internal Review & Approval**

**Q: Who reviews the Intake task?**
A: The **System Informatics Leader** reviews the Draft Request for completeness and business alignment.

**Q: What happens during the review?**
A: The System Leader may:
- Request clarifications or additional information
- Approve the request to move forward
- Ask you to update Intake Slides if needed

**Q: What do I do during Market/System Internal Review?**
A: Update the Status to **Approved** when ready to move forward. This is the internal review by your market/region/system informatics team.

**Q: Who updates Intake status to Approved?**
A: The **Requesting Clinical Informaticist** (you) updates to Approved after internal market review.

**Q: Where do I add notes about internal approval discussions?**
A: Add notes in the **Feedback Comments** section to track internal approval discussions.

---

## **What Happens Automatically After Approval**

**Q: What happens when Status changes to Approved?**
A: **Automatically**:
- Intake Task closes (Complete)
- Vetting Task opens with Status: New

**Q: What if we need more information during Intake?**
A: If Status is "Further Review Needed" from any later phase, it always moves the ticket back to Intake for review.

---

## **Tracking Your Request**

**Q: How do I track my request?**
A: In Strategic Planning Workspace (SPW):
1. Go to IT Portal > Workspaces > Strategic Planning Workspace
2. Search for your DMND number
3. Check the Intake list

**Q: How do I access Strategic Planning Workspace?**
A: IT Portal > Workspaces tab > Strategic Planning Workspace. Click the star icon to add to Favorites.

**Q: How do I view EHR Task Details?**
A: When opening a Demand or Demand task for the first time:
1. Click the three dots to the left of the Demand Task
2. Scroll down
3. Select **EHR** under View`,

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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#8F939F]',
        actions: [
          'Reviews Draft Request for completeness',
          'Validates scope and priority alignment',
          'Requests additional information if needed',
          'Approves request to proceed to Vetting'
        ]
      },
      {
        role: 'System (Automated)',
        roleColor: 'text-[#00A3E0]',
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
        color: 'text-[#00A3E0]'
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
    color: 'bg-[#00A3E0]',
    overview: `## **PHASE 2: VETTING & PRIORITIZATION**

### **Vetting (PeriSCOPE Meeting)**
The CM PgM manages Vetting and presents your request at PeriSCOPE for initial review.

**Key Actions:**
- **Requesting CI:** Be available for questions; respond to any information requests
- **[CM PgM Only]:** Updates Status to "Ready for Agenda" → presents at PeriSCOPE → updates Status based on decision
- If "Clinical Sponsorship Required" = Yes, a Define Task is automatically created

**Possible Outcomes:** Ready for Prioritization | Further Review Needed | Dismissed

---

### **Prioritization (SCOPE Meeting)**
System Informaticists and IT estimate effort, then SCOPE assigns priority ranking.

**Key Actions:**
1. **Effort Scoring Meeting:** Requesting CI and IT complete effort estimates
2. **Update Status to "Ready for Agenda"** after BOTH CI and IT complete scoring
3. **[CM PgM Only]:** Adds to SCOPE agenda → presents request → documents priority (1-10) → updates Status

**Possible Outcomes:** Ready for Design | Needs Define | Further Review Needed | Dismissed

**What Happens Next:** Prioritization closes and Design Task opens (Define Task also opens if needed)

**Key Players:** Requesting CI and IT do effort scoring; CM PgM manages SCOPE`,
    faqContent: `## **PHASE 2: VETTING & PRIORITIZATION**

**Q: What is Vetting?**
A: The Vetting task is used during the **PeriSCOPE Meeting** to review requests for completeness and determine if they should move to prioritization. The CM PgM reviews all attached documentation and updates ticket status.

**Q: Who manages the Vetting phase?**
A: The **Change Management Program Manager (CM PgM)** manages the Vetting task. Documentation is visible to all informatics team members in Workspace.

**Q: What meeting is Vetting associated with?**
A: **PeriSCOPE Meeting**

---

## **STEP 1: Prepare for PeriSCOPE**

**Q: What do I do when my request enters Vetting?**
A: As the **Requesting Clinical Informaticist**:
- Monitor for any additional information requests from the CM PgM
- Be available to answer questions
- Ensure all required Vetting documentation is attached

**Q: Do I need to attend PeriSCOPE?**
A: Attendance is **optional** for the Requesting CI. The CM PgM will present your Intake documentation. You may attend to answer questions if desired.

**Q: [CM PgM Only] How do I prepare requests for PeriSCOPE?**
A: The **CM PgM**:
- Reviews all attached required Vetting documentation
- Updates Status to **Ready for Agenda** once placed on the PeriSCOPE agenda
- Prepares to present the Intake slides and documentation

---

## **STEP 2: PeriSCOPE Meeting & Decision**

**Q: [CM PgM Only] What happens at the PeriSCOPE meeting?**
A: The **CM PgM**:
- Presents the request using the Intake documentation
- Facilitates discussion among PeriSCOPE attendees
- Documents the PeriSCOPE decision in the task notes
- Determines if Clinical Sponsorship is required

**Q: [CM PgM Only] When do I set "Clinical Sponsorship Required" to Yes?**
A: Set **Clinical Sponsorship Required = Yes** during Vetting if the request requires Clinical Service Line review. This automatically creates a Define Task.

---

## **STEP 3: Post-PeriSCOPE Actions**

**Q: [CM PgM Only] How do I update the status after PeriSCOPE?**
A: The **CM PgM** updates status based on PeriSCOPE decision:
- **Ready for Prioritization** - Moves forward to SCOPE
- **Further Review Needed** - Returns to Requesting CI for more information
- **Dismissed** - Request rejected and closed

**Q: What are the possible outcomes of Vetting?**
A: Possible statuses are:
- **Ready for Prioritization** - Ticket is ready for SCOPE (Vetting task closes and Prioritization task opens)
- **Further Review Needed** - Reopens Intake task; ticket goes back to market for further review
- **Dismissed** - Ticket was dismissed in Vetting and can be closed

**Q: What do I do if my request gets "Further Review Needed"?**
A: As the **Requesting Clinical Informaticist**:
- Review the feedback in the task notes
- Gather the requested additional information
- Update Intake Slides if necessary
- Update any required fields in the Intake task
- Work with your System Leader to address concerns
- Update Status back to **Approved** when ready to return to Vetting

---

## **What Happens Automatically After Vetting**

**Q: When does Vetting close?**
A: When CM PgM updates Status to **Ready for Prioritization**, Vetting Task closes and **automatically opens**:
- **Prioritization Task** (always)
- **Define Task** (if Clinical Sponsorship Required = Yes)

**Q: Can Define be created during Vetting?**
A: Yes, if "Clinical Sponsorship Required" is set to **Yes** during Vetting, a Define Task is created immediately.

---

## **PRIORITIZATION PROCESS**

## **STEP 1: Effort Scoring**

**Q: What is Effort Scoring?**
A: A meeting where **System Informaticists and IT** complete effort estimates for the request.

**Q: Who attends Effort Scoring?**
A: System Informaticists and IT representatives.

**Q: What do I need to do for Effort Scoring?**
A: As the **Requesting Clinical Informaticist**, complete the scoring and update Status to **Ready for Agenda** when done.

**Q: What meeting is Prioritization associated with?**
A: **SCOPE Meeting**

---

## **STEP 2: Prepare for SCOPE**

**Q: [CM PgM Only] How do I prepare for SCOPE?**
A: The **CM PgM**:
- Confirms Effort Scoring is complete (Status = Ready for Agenda)
- Adds the request to the SCOPE agenda
- Prepares prioritization information for presentation

**Q: Do I present at SCOPE?**
A: Not typically - the **CM PgM** presents your prioritization information at SCOPE.

---

### **STEP 3: SCOPE Meeting & Decision**

**Q: What happens at SCOPE?**
A: The **CM PgM** presents and SCOPE decides:
- Priority ranking (1-10 scale)
- Whether to proceed to Design
- Whether Define is needed
- Whether to dismiss or deny

**Q: [CM PgM Only] How do I update status after SCOPE?**
A: The **CM PgM** updates Prioritization status after SCOPE meetings to:
- **Ready for Design** - Approved, moves forward
- **Needs Define** - Requires Clinical Service Line review
- **Denied** - Demand closed
- **Dismissed** - Demand closed

**Q: What are the possible outcomes of Prioritization?**
A: Possible statuses are:
- **Ready for Design** - Ticket moves forward (Prioritization closes, Design task created)
- **Further Review Needed** - Reopens Intake task; ticket returns to market
- **Dismissed** - Ticket was dismissed at SCOPE and is closed
- **Needs Define** - Creates a Define Task (if not already created) for additional Clinical Service Line review

---

## **What Happens Automatically After Prioritization**

**Q: When does Prioritization close?**
A: When CM PgM updates Status to **Ready for Design**, Prioritization closes and **automatically opens**:
- **Define Task** (if needed and not already created)
- **Design Intake Task** (always)

**Q: Can SCOPE create a Define task?**
A: Yes, if SCOPE decides Define is needed, the **CM PgM** updates Status to **Needs Define** and a Define task is created (if not already done after PeriSCOPE).

**Q: How do I know my request has been prioritized?**
A: When the status updates to "Ready for Design," the prioritization task is marked "Closed Complete" and a Design task is created. You'll see the ranked priority documented in the task.`,

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
        roleColor: 'text-[#BA4B9C]',
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
        roleColor: 'text-[#00A3E0]',
        actions: [
          'Attends PeriSCOPE (optional)',
          'Available to answer questions',
          'Responds to information requests if Further Review Needed'
        ]
      },
      {
        role: 'PeriSCOPE Committee',
        roleColor: 'text-[#8F939F]',
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
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Further Review Needed',
        meaning: 'Additional information required',
        whatHappens: 'Intake task reopens. CI provides missing details, then resubmits to Vetting.',
        icon: '⚠️',
        color: 'text-[#F3781E]'
      },
      {
        status: 'Dismissed',
        meaning: 'Request rejected at PeriSCOPE',
        whatHappens: 'Request closes permanently. No further action.',
        icon: '❌',
        color: 'text-[#BA4B9C]'
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
    color: 'bg-[#F3781E]',
    overview: `## **PRIORITIZATION PROCESS**

System Informaticists and IT estimate effort, then SCOPE assigns priority ranking.

**Key Actions:**
1. **Effort Scoring Meeting:** Requesting CI and IT complete effort estimates
2. **Update Status to "Ready for Agenda"** after BOTH CI and IT complete scoring
3. **[CM PgM Only]:** Adds to SCOPE agenda → presents request → documents priority (1-10) → updates Status

**Possible Outcomes:** Ready for Design | Needs Define | Further Review Needed | Dismissed

**What Happens Next:** Prioritization closes and Design Task opens (Define Task also opens if needed)

**Key Players:** Requesting CI and IT do effort scoring; CM PgM manages SCOPE`,
    faqContent: `## **PHASE 3: PRIORITIZATION**

**Q: What happens during Prioritization?**
A: System Informaticists and IT complete **Effort Scoring** to estimate the work required. Once scoring is complete, the request goes to the **SCOPE meeting** where it receives a priority ranking and decision on next steps.

**Q: What meeting is Prioritization associated with?**
A: **SCOPE Meeting** (but Effort Scoring happens first)

---

### **STEP 1: Effort Scoring Meeting**

**Q: What is Effort Scoring?**
A: A meeting where **System Informaticists and IT** estimate the effort required for the request.

**Q: Who attends Effort Scoring?**
A:
- System Informaticists
- IT representatives
- Requesting Clinical Informaticist

**Q: What do I do during Effort Scoring?**
A: As the **Requesting Clinical Informaticist**:
- Participate in the Effort Scoring meeting
- Answer questions about the request
- Complete the CI effort scoring section
- Coordinate with IT to ensure both sections are complete before updating status

**Q: [IT Only] What do I do for Effort Scoring?**
A: As **IT**:
- Participate in the Effort Scoring meeting
- Complete the IT effort scoring section
- Coordinate with the CI before updating Status to Ready for Agenda

---

### **STEP 2: Prepare for SCOPE**

**Q: When do I update Status to "Ready for Agenda"?**
A: As the **Requesting Clinical Informaticist**, update Status to **Ready for Agenda** only after **BOTH** CI and IT complete their scoring sections. This signals the CM PgM that the request is ready for SCOPE.

**Q: [CM PgM Only] How do I know a request is ready for SCOPE?**
A: When Status = **Ready for Agenda**, add the request to the SCOPE agenda.

**Q: What do I do while waiting for SCOPE?**
A: As the **Requesting Clinical Informaticist**, wait for the SCOPE meeting decision. No action needed until after SCOPE meets.

**Q: Do I present at SCOPE?**
A: Not typically - the **CM PgM** presents your prioritization information at SCOPE.

---

## **STEP 3: SCOPE Meeting & Decision**

**Q: What does SCOPE decide?**
A: SCOPE determines:
- **Priority ranking** (1-10 scale)
- Whether to proceed to Design
- Whether Define is needed
- Whether to dismiss or deny

**Q: [CM PgM Only] What do I do at the SCOPE meeting?**
A: As the **CM PgM**:
- Present the request at SCOPE meeting
- Facilitate discussion
- Document the ranked priority (1-10 scale) in the task
- Document any additional notes or requirements

---

### **STEP 4: Post-SCOPE Actions**

**Q: [CM PgM Only] How do I update status after SCOPE?**
A: The **CM PgM** updates Prioritization status based on SCOPE decision:
- **Ready for Design** - Approved, moves forward
- **Needs Define** - Requires Clinical Service Line review
- **Further Review Needed** - Needs more information
- **Denied** - Demand closed
- **Dismissed** - Demand closed

**Q: What are the possible outcomes of Prioritization?**
A: Possible statuses are:
- **Ready for Design** - Ticket moves forward (Prioritization closes, Design task created)
- **Further Review Needed** - Reopens Intake task; ticket returns to market
- **Dismissed** - Ticket was dismissed at SCOPE and is closed
- **Needs Define** - Creates a Define Task (if not already created) for additional Clinical Service Line review

**Q: How do I know my request has been prioritized?**
A: As the **Requesting Clinical Informaticist**, review the ranked priority assigned by SCOPE. When the status updates to "Ready for Design," the prioritization task is marked "Closed Complete" and a Design task is created.

---

### **What Happens Automatically After Prioritization**

**Q: When does Prioritization close?**
A: When CM PgM updates Status to **Ready for Design**, Prioritization closes and **automatically opens**:
- **Define Task** (if needed and not already created)
- **Design Intake Task** (always)

**Q: Can SCOPE create a Define task?**
A: Yes, if SCOPE decides Define is needed, the **CM PgM** updates Status to **Needs Define** and a Define task is created (if not already done after PeriSCOPE).`,

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
        roleColor: 'text-[#00A3E0]',
        actions: [
          'Completes Effort Scoring with System Informaticists',
          'Coordinates with IT on effort scoring',
          'Updates Status to "Ready for Agenda" when both CI and IT scoring complete',
          'Reviews ranked priority after SCOPE'
        ]
      },
      {
        role: 'IT Process Owner / IT Analyst',
        roleColor: 'text-[#00A3E0]',
        actions: [
          'Completes IT Effort Scoring',
          'Participates in scoring discussion',
          'Confirms completion before Status update'
        ],
        contact: 'IT Applications Team'
      },
      {
        role: 'CM Program Manager',
        roleColor: 'text-[#BA4B9C]',
        actions: [
          'Adds to SCOPE agenda when Ready',
          'Presents at SCOPE meeting',
          'Documents ranked priority (1-10)',
          'Updates Status based on decision'
        ]
      },
      {
        role: 'SCOPE Committee',
        roleColor: 'text-[#8F939F]',
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
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Further Review Needed',
        meaning: 'More information required',
        whatHappens: 'Intake task reopens. CI provides additional details.',
        icon: '⚠️',
        color: 'text-[#F3781E]'
      },
      {
        status: 'Dismissed',
        meaning: 'Request rejected at SCOPE',
        whatHappens: 'Request closes permanently.',
        icon: '❌',
        color: 'text-[#BA4B9C]'
      },
      {
        status: 'Needs Define',
        meaning: 'Requires Clinical Service Line approval',
        whatHappens: 'Define task created (if not already existing from Vetting)',
        icon: '🔄',
        color: 'text-[#7DE0A7]'
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
    color: 'bg-[#7DE0A7]',
    overview: `## **PHASE 3: DEFINE** (If Required)

### **Clinical Service Line Approval**
Secure Clinical Service Line approval before moving to design.

**Key Actions:**
1. **[CM PgM Only]:** Enters Primary Define Body (which CLS will review)
2. **Requesting CI:**
   - Secure agenda time with CLS representative
   - Enter Primary Define Agenda Date
   - Update Status to "Ready for Agenda"
   - Present to Clinical Service Line
   - Enter Primary Define Approval Date after approval
3. **If multiple CLS approvals needed:** Repeat for each CLS group
4. **Update Status to "Approved"** ONLY after FINAL approval

**What Happens Next:** Define closes and Design Task opens

**Key Players:** Requesting CI presents; CLS approves; CM PgM tracks progress`,
    faqContent: `## **PHASE 3: DEFINE**

**Q: What is the Define phase for?**
A: Define is used when clinical sponsorship/service line approval is required. It allows **Clinical Service Lines** to review and approve the request before design begins.

**Q: When is Define required?**
A: Define is created when:
- "Clinical Sponsorship Required" = Yes (during Vetting), OR
- SCOPE selects "Needs Define" (during Prioritization)

**Q: What meeting is Define associated with?**
A: **Clinical Service Line (CLS) Define Body Meeting(s)** - the specific clinical committee that reviews clinical practice changes (e.g., Critical Care Council, Cardiovascular Committee)

---

### **STEP 1: CM PgM Sets Up Define**

**Q: [CM PgM Only] What do I do when a Define task is created?**
A: The **CM PgM**:
- Enters the **Primary Define Body** (which Clinical Service Line will review - e.g., Critical Care, Cardiovascular, etc.)
- Tracks Define progress
- Coordinates if multiple CLS approvals are needed

**Q: Who enters the Primary Define Body?**
A: The **CM PgM** enters which Clinical Service Line will review (e.g., Critical Care, Cardiovascular, etc.)

---

### **STEP 2: Secure CLS Agenda Time**

**Q: Who manages the Define task?**
A: The **Requesting Clinical Informaticist** works with the Clinical Service Line representative to secure agenda time and present the request.

**Q: What do I do to get started with Define?**
A: As the **Requesting Clinical Informaticist**:
- Work with your CLS group representative to secure agenda time
- Update Status to **Ready for Agenda** once date is secured
- Enter the **Primary Define Agenda Date** in the task

**Q: What are the Define statuses I might use while scheduling?**
A: As the **Requesting Clinical Informaticist**, use:
- **In Progress** - While working with Define to secure agenda time
- **Ready for Agenda** - Once agenda date is secured

---

### **STEP 3: Present to Clinical Service Line**

**Q: Do I present at CLS?**
A: Yes, as the **Requesting Clinical Informaticist**, you work with the CLS representative to present the request for approval.

**Q: Who attends CLS meetings?**
A: Varies by service line - physicians, advanced practice providers, nurse leaders, pharmacists, etc.

**Q: What does CLS approve?**
A: The **clinical practice change and workflow** - not the EHR technical design.

---

### **STEP 4: Document CLS Approval**

**Q: What do I do after CLS approves?**
A: As the **Requesting Clinical Informaticist**:
- Enter the **Primary Define Approval Date** once approved by the Clinical Service Line
- **DO NOT** update Status to "Approved" yet if multiple approval bodies are required

**Q: What if multiple Clinical Service Lines need to approve?**
A: As the **Requesting Clinical Informaticist**:
- Repeat Steps 2-4 for each required CLS group:
  - Secure agenda time with the next CLS
  - Present to that CLS
  - Document approval date
- The **CM PgM** coordinates and tracks multiple CLS approvals
- **ONLY** update Status to "Approved" after the **FINAL** approval from all required bodies

---

### **STEP 5: Complete Define**

**Q: When do I update Status to "Approved"?**
A: As the **Requesting Clinical Informaticist**, update Status to **Approved** ONLY when:
- Single CLS: After that CLS approves
- Multiple CLS: After the **FINAL** CLS approves (all required approvals obtained)

**Q: What are the possible Define outcomes?**
A: The **Requesting Clinical Informaticist** updates Status to:
- **Approved** - CLS supports, moves to Design
- **Further Review Needed** - Reopens Intake for additional information
- **Dismissed** - Clinical Service Line does not support the change request (labeled as "CLS denied enhancement" - Demand Closed)

---

### **What Happens Automatically After Define**

**Q: When does Define close?**
A: When Status is updated to **Approved**, Define closes and **automatically opens** Design Task.

**Q: What if the CLS rejects the request?**
A: If Status is updated to **Dismissed**, the Demand is closed and no further work proceeds.`,

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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#00A3E0]',
        actions: [
          'Reviews clinical impact and alignment',
          'Provides clinical sponsorship',
          'Approves or requests more information',
          'May identify additional stakeholders'
        ]
      },
      {
        role: 'CM Program Manager',
        roleColor: 'text-[#BA4B9C]',
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
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Further Review Needed',
        meaning: 'CLS requests additional information',
        whatHappens: 'Intake task reopens for more details. Re-present to CLS after updates.',
        icon: '⚠️',
        color: 'text-[#F3781E]'
      },
      {
        status: 'Dismissed',
        meaning: 'Clinical Service Line does not support',
        whatHappens: 'Request closes permanently. No clinical sponsorship.',
        icon: '❌',
        color: 'text-[#BA4B9C]'
      },
      {
        status: 'In Progress',
        meaning: 'Working to secure CLS agenda time',
        whatHappens: 'CI continues coordinating with CLS for meeting slot.',
        icon: '🔄',
        color: 'text-[#00A3E0]'
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
    color: 'bg-[#8F939F]',
    overview: `## **PHASE 4: DESIGN**

### **Design Task Opens**
Answer: "Is design already complete?" → **Design is Complete** OR **Design Session Needed**

---

### **CERNER DESIGN PROCESS**

**Key Actions:**
1. **Update Status to "Ready for Agenda"** for first Design Review Call
2. **If Design Session Needed:**
   - **[CM PgM Only]:** Updates Status to "Resources Needed" (opens 2-week window)
   - **Regional CIs and IT:** Add design participants within 2 weeks
   - **Requesting CI:** Wait for 2-week window to close, then schedule design sessions (avoid Tue/Wed, minimum 2 weeks notice)
   - Update Status to "In Design"
3. **Conduct design sessions** (Requesting CI leads; IT participates)
4. **Complete design documentation:**
   - Design Document Link, Affected Applications, Release Type
   - Cerner Target Domain, Cerner Validators
   - Finalized Design Summary
5. **Update Status to "Ready for Agenda"** + select "Design is Complete" for second Design Review Call
6. **[CM PgM Only]:** Facilitates approval (regions have 2 weeks for feedback) → updates Status to "Complete"

**Meetings:** Design Review Call (twice - participant gathering, then approval)

---

### **EPIC DESIGN PROCESS**

**Key Actions:**
1. **Create Epic Optimization Form** from template (if Design Session Needed)
2. **Update Status to "Ready for Agenda"** for Refinement
3. **Refinement Meeting:** Present request; IT identifies participants
4. **Update Status to "Resources Needed"**
5. **[IT Only]:** Assigns resources → updates Status to "Assigned"
6. **[IT Only]:** Schedules design sessions:
   - Multi-team: Process Owner schedules initial, then hands to Applications Engineer
   - Single app: Applications Engineer schedules
   - Updates Status to "In Design"
7. **Conduct design sessions** (Requesting CI leads; IT participates)
8. **Complete design documentation:**
   - Design Document Link, Affected Applications
   - Epic Validators, Finalized Design Summary
9. **Requesting CI and IT:** Update Status to "Complete"

**Meetings:** Refinement (Backlog Grooming)

---

### **Validators Identified**
During Design, Requesting CI identifies who will test the build in non-prod and production.

**What Happens Next:** Design closes and a FETR (Feature) automatically opens in Phase: Develop

**Key Players:**
- **Cerner:** Requesting CI schedules/leads; CM PgM manages approvals; Regional CIs and IT add participants
- **Epic:** Requesting CI leads; IT schedules; both update to Complete`,
    faqContent: `## **PHASE 4: DESIGN**

**Q: What happens during the Design phase?**
A: Design sessions are held to develop the technical solution for the EHR changes. The process varies between Cerner and Epic but generally includes:
- Reviewing EHR requirements
- Documenting current state and future state workflows
- Identifying affected applications
- Creating design documentation
- Obtaining design approvals

**Q: How is the Design task created?**
A: **Automatically created** when:
- Prioritization Status = Ready for Design (if no Define needed), OR
- Define Status = Approved

**Q: What's the first thing that happens in Design?**
A: The Design Task opens with Status: **New**. The **Requesting Clinical Informaticist** must answer: **"Is design already complete?"**

**Q: What does "Is design already complete?" mean?**
A: Select:
- **Design is Complete** - No sessions needed, go straight to documentation
- **Design Session Needed** - Need to schedule design sessions

---

## **CERNER DESIGN PROCESS**

### **STEP 1: Indicate Design Status**

**Q: What do I do when the Cerner Design task opens?**
A: As the **Requesting Clinical Informaticist**:
- Answer "Is design already complete?"
  - Select **Design is Complete** OR **Design Session Needed**
- Update Status to **Ready for Agenda**

**Q: What meeting is Cerner Design associated with?**
A: **Design Review Call** (happens twice - once for participant gathering, once for approval)

---

### **STEP 2: First Design Review Call - Gather Participants**
**(If Design Session Needed)**

**Q: [CM PgM Only] What happens at the first Design Review Call?**
A: The **CM PgM**:
- Reviews the Intake Slide with attendees
- Identifies need for design participants
- Updates Status to **Resources Needed** to open the 2-week participant window

**Q: What is the "Resources Needed" window?**
A: A **2-week period** where Regional and IT leaders add participants to design sessions.

---

### **STEP 3: Participants Added During 2-Week Window**

**Q: Who adds design participants for Cerner?**
A: During the 2-week **Resources Needed** window:
- **Regional CIs**: Add themselves as Design Participants for their region
- **IT Leaders**: Add Application Group and Assignee
- **Requesting CI**: Can add additional regional participants as needed

**Q: [CM PgM Only] What do I track during Resources Needed?**
A: The **CM PgM**:
- Tracks design progress
- Ensures participants are being added
- Supports with escalations if needed

**Q: How long do regions have to add participants?**
A: **2 weeks** after Status = Resources Needed

---

### **STEP 4: Schedule Cerner Design Sessions**

**Q: Who schedules design sessions for Cerner?**
A: The **Requesting Clinical Informaticist** schedules and facilitates design sessions.

**Q: When can I schedule Cerner design sessions?**
A: As the **Requesting Clinical Informaticist**, wait for the 2-week "Resources Needed" window to close before scheduling design sessions.

**Q: What are the scheduling rules for Cerner design sessions?**
A: As the **Requesting Clinical Informaticist**:
- **Avoid Tuesday/Wednesday** (governance meeting days)
- Schedule with **minimum 2 weeks notice**
- Include all participants listed in the Design Participants section

**Q: What Status do I use when sessions are scheduled?**
A: Update Status to **In Design** once design sessions are scheduled.

---

### **STEP 5: Conduct Cerner Design Sessions**

**Q: Who leads the design discussion?**
A: The **Requesting Clinical Informaticist** leads the design discussion in all sessions.

**Q: Who participates in Cerner design sessions?**
A: Participants include:
- **Requesting CI** (leads discussion)
- **Regional participants** (added by regions)
- **IT Application Groups and Assignees**
- **SMEs** as needed

**Q: [IT Only] What is my role in Cerner design sessions?**
A: As **IT**:
- Participate in design sessions
- Provide technical guidance
- Complete technical design documentation
- Document application impacts

---

### **STEP 6: Complete Cerner Design Documentation**

**Q: What do I document after Cerner design sessions?**
A: As the **Requesting Clinical Informaticist**, complete:
- **Design Document Link** (Cerner design/build documents)
- **Affected Applications** (based on design)
- **Release Type**
- **Cerner Target Domain** (select appropriate PRD domain(s))
- **Cerner Validators** (identified during design)
- **Finalized Design Summary** (voting statement for approval)

**Q: How do I identify Validators?**
A: As the **Requesting Clinical Informaticist**, identify Validators during the Design phase based on who needs to test the build. Enter them in the Cerner Validator fields.

---

### **STEP 7: Cerner Design Approval**

**Q: How do I get Cerner design approved?**
A: As the **Requesting Clinical Informaticist**:
- Update Status to **Ready for Agenda** (to present at second Design Review Call)
- Select "**Design is Complete**"
- Present design for approval at Design Review Call

**Q: [CM PgM Only] What happens at the second Design Review Call?**
A: The **CM PgM**:
- Facilitates design approval discussion
- Regions have **2 weeks** to provide Design Feedback
- Documents all approvals in the Approval section
- If provider impact: coordinates additional design approvals from provider groups

**Q: Who approves Cerner designs?**
A:
- Design Review Call attendees approve
- If provider impact: additional design approvals needed from provider groups
- **CM PgM** documents all approvals

**Q: [CM PgM Only] When do I update Status to Complete?**
A: The **CM PgM** updates to **Complete** after all approvals are obtained.

---

## **EPIC DESIGN PROCESS**

### **STEP 1: Indicate Design Status and Prepare for Refinement**

**Q: What do I do when the Epic Design task opens?**
A: As the **Requesting Clinical Informaticist**:
- Answer "Is design already complete?"
  - Select **Design is Complete** OR **Design Session Needed**
- If **Design Session Needed**: Create the **Epic Optimization Form** from template and save in Google Drive
- Update Status to **Ready for Agenda**

**Q: What meeting is Epic Design associated with?**
A: **Refinement** (also called Backlog Grooming)

---

### **STEP 2: Refinement Meeting**

**Q: What happens at Refinement?**
A: **Epic Process Owners** and **Requesting CI** review:
- Intake Slide
- Epic Optimization Form
- Identify needed participants
- Determine if design sessions are needed

**Q: Who attends Refinement?**
A: Epic Process Owners, Requesting CI, and IT representatives.

**Q: Do I present at Refinement?**
A: Yes, as the **Requesting Clinical Informaticist**, you present your request and answer questions.

---

### **STEP 3: IT Assigns Resources**

**Q: Who updates status to Resources Needed for Epic?**
A: The **Requesting Clinical Informaticist** updates to **Resources Needed** after Refinement (this triggers the need for IT resources).

**Q: [IT Only] What do I do when Status = Resources Needed?**
A: As **IT**:
- Assign resources (Application Groups and Assignees)
- **IT Process Owner** updates Status to **Assigned** once resources are confirmed

---

### **STEP 4: Epic Design Sessions Scheduled**

**Q: Who schedules design sessions for Epic?**
A: Depends on the type of request:
- **Multi-team tickets**: Process Owner schedules initial session, then hands to Primary Applications Engineer for additional sessions
- **Single application**: The Applications Engineer schedules design sessions

**Q: [IT Only] When do I schedule Epic design sessions?**
A: As **IT** (Applications Engineer or Process Owner):
- Coordinate with the **Requesting CI** on scheduling
- Avoid scheduling conflicts
- **IT Process Owner** updates Status to **In Design** once sessions are scheduled

---

### **STEP 5: Conduct Epic Design Sessions**

**Q: Who leads the Epic design discussion?**
A: The **Requesting Clinical Informaticist** leads the design discussion in all sessions.

**Q: Who participates in Epic design sessions?**
A: Participants include:
- **Requesting CI** (leads discussion)
- **Design Participants** (identified at Refinement)
- **IT Application Groups and Assignees**
- **SMEs** as needed

**Q: [IT Only] What is my role in Epic design sessions?**
A: As **IT**:
- Participate in design sessions
- Provide technical guidance
- Complete technical design documentation

---

### **STEP 6: Complete Epic Design Documentation**

**Q: What do I document after Epic design sessions?**
A: As the **Requesting Clinical Informaticist**, complete:
- **Design Document Link** (Epic Optimization Form)
- **Affected Applications** (based on design)
- **Epic Validators** (identified during design)
- **Finalized Design Summary** (voting statement)

**Q: How do I complete Epic design?**
A: As the **Requesting Clinical Informaticist**:
- Work with **IT** to ensure all design documentation is complete
- Both **Requesting CI and IT** update Status to **Complete** when all documentation is entered

---

## **VALIDATORS (BOTH CERNER AND EPIC)**

### **Who Are Validators?**

**Q: Who are Validators?**
A: Validators are identified during the Design phase by the **Primary Clinical Informaticist**. They are the people who will test the build to ensure it works as designed.

**Q: When are Validators identified?**
A: During the Design phase, based on who needs to validate the functionality.

**Q: How many Validators are there?**
A: Typically:
- **Cerner**: One validator per domain (e.g., ECISA/P0687, CAREB/P1284)
- **Epic**: Validators per market or application area

---

### **Validator Responsibilities**

**Q: What do Validators do?**
A: Validators are responsible for:

**During Develop:**
- Receive email notification when Status = **Testing** (ready for non-prod validation)
- Complete testing in **Non-Prod** environment
- Add comments to **Work Notes** indicating validation is successful
- **Final validator**: Update Status to **Validated Successfully Non Prod** (after all domains/markets are validated)

**During Deploy:**
- Receive email notification when Status = **Prod Validation** (ready for prod validation)
- Complete testing in **Production** environment
- Add comments to **Work Notes** indicating validation is successful
- **Final validator**: Update Status to **Validated Successfully Prod** (after all domains/markets are validated)

**Q: Who is the "final validator"?**
A: The last person to complete validation. After all domains/markets are validated, this person updates the Status to move the request forward.

---

## **WHAT HAPPENS AUTOMATICALLY AFTER DESIGN**

**Q: What happens when Design Status = Complete?**
A: Design Task closes, Demand is complete, and a **FETR (Feature)** is **automatically opened** with Phase: **Develop**.

**Q: What is a FETR?**
A: FETR = Feature ticket. This is where IT builds the actual EHR changes. It's created automatically when Design is complete.

**Q: How do I find my Feature ticket?**
A: In Strategic Planning Workspace > Features List. Look for your DMND number. The Feature will have a FETR number.

**Q: What view should I use to see Feature information?**
A: Click the three dots next to Feature heading > View > **Release** (shows info relevant to Informatics)`,

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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#00A3E0]',
        actions: [
          'For Epic single-app: Schedules all design sessions',
          'For Epic multi-team: Schedules follow-up sessions (after PO initial)',
          'Participates in design',
          'Completes technical design specs'
        ]
      },
      {
        role: 'IT Process Owner',
        roleColor: 'text-[#00A3E0]',
        actions: [
          'For Epic multi-team: Schedules initial design session',
          'Reviews and approves design',
          'Coordinates with Applications Engineers'
        ]
      },
      {
        role: 'Regional Clinical Informaticists',
        roleColor: 'text-[#00A3E0]',
        actions: [
          'For Cerner: Add themselves as Design Participants during Resources Needed',
          'Attend design sessions for their region',
          'Provide regional workflow input'
        ]
      },
      {
        role: 'Validators',
        roleColor: 'text-[#7DE0A7]',
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
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Design Sessions',
        meaning: 'Active design work in progress',
        whatHappens: 'Sessions scheduled and completed. Design documented.',
        icon: '🎨',
        color: 'text-[#7DE0A7]'
      },
      {
        status: 'Signatures',
        meaning: 'Design complete, awaiting approvals',
        whatHappens: 'Collecting required approvals from stakeholders.',
        icon: '✍️',
        color: 'text-[#8F939F]'
      },
      {
        status: 'Ready for Build',
        meaning: 'Design approved, ready for development',
        whatHappens: 'Design task closes, Build task opens.',
        icon: '✅',
        color: 'text-[#00A3E0]'
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
    name: 'Develop & Test',
    order: 6,
    color: 'bg-[#00A3E0]',
    overview: `## **PHASE 5: DEVELOP & TEST**

### **Non-Prod Build & Testing**

**Key Actions:**
1. **[IT Analyst]:**
   - Builds in non-prod environment
   - Updates Status: Assigned → Building → Testing
   - Emails validators when Status = Testing
2. **Validators:**
   - Test in non-prod environment
   - Document results in Work Notes
   - Final validator updates Status to "Validated Successfully Non Prod"
3. **Requesting CI:**
   - Monitor build progress
   - Coordinate with IT on questions
   - Create education materials:
     - **Cerner:** Change Communication document → update "Change Communication Phase" to "Attached"
     - **Epic:** Work with IT Instructional Designers on tip sheets
4. **Update Status to "Ready for Release Planning"** (moves to Deploy Phase)

**Key Players:** IT builds; Validators test; Requesting CI creates education

---

## **PHASE 5: DEPLOY (Production)**

### **Production Build & Testing**

**Key Actions:**
1. **[IT Process Owner]:** Assigns release date → updates Status to "Assigned Release"
2. **[IT Analyst]:**
   - Deploys to production on release day
   - Updates Status: Building in Prod → Prod Validation
   - Emails validators
3. **Validators:**
   - Test in production environment
   - Document results in Work Notes
   - Final validator updates Status to "Validated Successfully Prod"

**Timeline:** Release date assigned after non-prod testing complete (estimates only until then)

**What Happens Next:** Enhancement is live!

**Key Players:** IT deploys; Validators test in production`,
    faqContent: `## **PHASE 5: DEVELOP & TEST**

**Q: What happens during the Develop & Test phase?**
A: IT builds the EHR changes in a **non-production environment**. The Primary Informaticist and Validators work primarily in the **O&M Optimization section** of the Feature. The phase includes:
- Building (IT)
- Testing in non-production
- Validation by informaticists
- Change Communication creation (Cerner only)
- Education materials (Epic)
- Production deployment and validation

**Q: Who works on the Feature during Develop & Test?**
A:
- **IT Analyst** - Builds the changes
- **IT Process Owner** - Manages resources and releases
- **Requesting CI and Validators** - Test and validate

**Q: What view should I use to see Feature information?**
A: Click the three dots next to Feature heading > View > **Release** (shows info relevant to Informatics)

---

## **DEVELOP PHASE - NON-PROD BUILD & TESTING**

### **STEP 1: IT Builds in Non-Prod**

**Q: What are the Develop phase statuses?**
A: In order:
1. **Phase: Develop** - Feature first opens here
2. **Status: Assigned** - IT resources confirmed, waiting for build
3. **Status: Building** - IT starts build in Non-Prod
4. **Status: Testing** - Ready for validation (validators emailed)
5. **Status: Validated Successfully Non Prod** - Testing complete

**Q: [IT Only] What do I do when the Feature opens?**
A: As the **IT Analyst**:
- Review the approved design documentation
- Complete build in **non-production environment**
- Update Status from **Assigned** to **Building** when build starts
- Update Status to **Testing** when ready for validation
- **Email validators** when Status = Testing

**Q: What do I do during the build phase?**
A: As the **Requesting Clinical Informaticist**:
- Monitor build progress in the Feature
- Coordinate with IT on any build questions
- Be available to clarify design decisions

---

### **STEP 2: Validators Test in Non-Prod**

**Q: What do I do when I receive a validation email?**
A: As a **Validator**:
- Complete your testing in **Non-Prod** environment
- Add comments to **Work Notes** indicating validation is successful
- If you're the **final validator**, update Status to **Validated Successfully Non Prod**

**Q: How do validators know when to test?**
A: Validators receive an **email notification** when the **IT Analyst** updates Status to **Testing**.

**Q: [IT Only] What do I do while validators are testing?**
A: As the **IT Analyst**:
- Support validators with build questions
- Review validation documentation in Work Notes
- Address any issues found during testing

**Q: Who is the "final validator"?**
A: The last person to complete validation. After all domains/markets are validated, this person updates the Status.

**Q: What does "Validated Successfully Non Prod" mean?**
A: This status indicates that all testing in the non-production environment has been completed successfully by all validators.

---

### **STEP 3: Create Education/Change Communication**

**Q: What happens after non-prod validation is complete?**
A: Work with IT Instructional Designers to create education materials:
- **Cerner**: Change Communication document
- **Epic**: Tip sheets

---

### **CERNER CHANGE COMMUNICATION**

**Q: What is Change Communication?**
A: For **Cerner only**: A document created by the **Requesting Clinical Informaticist** describing the EHR changes for end users.

**Q: Who creates Change Communication?**
A: The **Requesting Clinical Informaticist** creates it and attaches in Google Drive.

**Q: How do I indicate Change Communication is done?**
A: Update **Change Communication Phase** to **Attached**.

**Q: What if no Change Communication is needed?**
A: Update **Communication review** to **None Needed**.

---

### **EPIC EDUCATION MATERIALS**

**Q: Who creates Epic education materials?**
A: **IT Instructional Designers** create tip sheets for Epic changes (addressing only EHR changes, not practice changes).

**Q: What is my role in Epic education?**
A: As the **Requesting Clinical Informaticist**, work with IT Instructional Designers to ensure education materials are accurate and complete.

---

### **STEP 4: Ready for Release Planning**

**Q: Who updates Status to Ready for Release Planning?**
A: The **Requesting Clinical Informaticist** updates to **Ready for Release Planning** once:
- Validated Successfully Non Prod = complete
- Education/Change Communication = complete

**Q: What do I do after non-prod validation?**
A: As the **Requesting Clinical Informaticist**:
- Coordinate with IT on production deployment timing
- Ensure education materials are ready
- Update Status to **Ready for Release Planning**

**Q: What happens when Status = Ready for Release Planning?**
A: **Develop Phase closes**, **Deploy Phase opens** with Status: **Release Planning**.

---

## **DEPLOY PHASE - PRODUCTION BUILD & TESTING**

### **STEP 5: Release Planning**

**Q: What are the Deploy phase statuses?**
A: In order:
1. **Status: Release Planning** - Waiting for release date
2. **Status: Assigned Release** - Release date assigned
3. **Status: Building in Prod** - Build moving to production
4. **Status: Prod Validation** - Ready for production testing (validators emailed)
5. **Status: Validated Successfully Prod** - Production validation complete

**Q: [IT Only] What do I do during Release Planning?**
A: As the **IT Process Owner**:
- Review the request for production readiness
- Assign a release date based on the release schedule
- Update Status to **Assigned Release** once release date is assigned

**Q: When will my change go to production?**
A: After IT assigns a release date. Timeline is an **estimate** until Non Prod testing is complete.

**Q: Can you provide a timeline for build completion?**
A: An estimate cannot be provided until **Non-Prod build has started**. You must work with IT to get an estimate for Non-Prod build completion. Timeline will be an estimate until Non-Prod testing is completed.

---

### **STEP 6: IT Builds in Production**

**Q: [IT Only] What do I do on release day?**
A: As the **IT Analyst**:
- Deploy build to production
- Update Status to **Building in Prod** on release day when starting production build
- Update Status to **Prod Validation** once build is complete
- **Email validators** to start production testing

---

### **STEP 7: Validators Test in Production**

**Q: What do I do for Prod Validation?**
A: As a **Validator**:
- Receive email notification when Status = **Prod Validation**
- Complete testing in **Production environment**
- Add comments to **Work Notes** indicating validation successful
- If you're the **final validator** for all domains/markets, update Status to **Validated Successfully Prod**

**Q: [IT Only] What do I do while validators test in production?**
A: As the **IT Analyst**:
- Support validators with any production questions
- Review validation documentation in Work Notes
- Address any issues found during production testing

---

### **STEP 8: COMPLETE!**

**Q: When is the ticket complete?**
A: When Status = **Validated Successfully Prod** - the EHR enhancement is now live and complete!

**Q: When does the EHR Enhancement become complete?**
A: When the final validator updates Status to "Validated Successfully Prod" after all domains are validated in production.

**Q: Who creates the training materials?**
A: SCI/DCIs/MCIs/Instructional Designers create education for EHR changes (tip sheets addressing only EHR changes, not practice changes).`,

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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#7DE0A7]',
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
        color: 'text-[#F3781E]'
      },
      {
        status: 'Testing',
        meaning: 'Ready for non-prod validation',
        whatHappens: 'Validators receive email. Begin testing in non-prod environment.',
        icon: '🧪',
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Validated Successfully Non Prod',
        meaning: 'Non-prod testing passed',
        whatHappens: 'IT deploys to production. Then updates Status to Prod Validation.',
        icon: '✅',
        color: 'text-[#00A3E0]'
      },
      {
        status: 'Prod Validation',
        meaning: 'Deployed to prod, ready for prod testing',
        whatHappens: 'Validators receive email. Begin testing in production environment.',
        icon: '🚀',
        color: 'text-[#7DE0A7]'
      },
      {
        status: 'Validated Successfully Prod',
        meaning: 'Production testing passed',
        whatHappens: 'Enhancement is live. Proceed to close-out activities.',
        icon: '✅',
        color: 'text-[#00A3E0]'
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
    color: 'bg-[#00A3E0]',
    overview: `## **PHASE 6: DEPLOY & CLOSE**

### **Go-Live Support & Close-Out**

**Key Actions:**
1. **Requesting CI:**
   - Create and distribute end-user communication
   - Coordinate go-live support
   - Monitor for issues post-deployment (intensive for 24-48 hours, active for 1-2 weeks)
   - Complete close-out documentation
   - Update final metrics and lessons learned
   - Close request when all activities complete
2. **[IT]:**
   - Monitor production stability
   - Support post-deployment issues
   - Complete technical close-out documentation

**Communication:** Notify Clinical/Operational leaders, Regional CI leaders, IT Leaders, End users, System policy team (if applicable)

**Key Players:** Requesting CI leads close-out; IT supports production stability`,
    faqContent: `## **PHASE 6: DEPLOY & CLOSE**

**Q: What happens during the Deploy & Close phase?**
A: After production validation is complete, the enhancement goes live to end users. This phase includes:
- End-user communication and training
- Go-live support
- Post-deployment monitoring
- Issue tracking and resolution
- Close-out documentation
- Final metrics and lessons learned

**Q: When does Deploy & Close start?**
A: After Status = **Validated Successfully Prod** (all production validation is complete)

---

## **STEP 1: End-User Communication & Training**

**Q: What communication do I need to create?**
A: As the **Requesting Clinical Informaticist**, create and distribute end-user communication about the change, including:
- What changed in the EHR
- When the change goes live
- How it impacts their workflow
- Who to contact with questions

**Q: Who needs to be informed during Deploy?**
A: Communicate with:
- **Clinical/Operational leaders** - About practice changes
- **Regional Clinical Informatics leaders** - About EHR implementation
- **IT Leaders** - About build and support needs
- **Peers** - System Clinical Informaticists working on similar initiatives
- **End users** - Before go-live about changes
- **System policy team** (if policy-related): system-policysupport@commonspirit.org

**Q: How do I communicate system-wide?**
A:
- **Quarterly Informatics Insider Webinar** - for broad announcements
- Coordinate with SCI leadership for alternative methods if webinar timing doesn't work

**Q: When should I communicate?**
A:
- **Before go-live**: Confirm changes are coming and go-live date
- **At go-live**: Confirm changes are live
- **Post go-live**: Gather feedback, address issues

---

## **STEP 2: Go-Live Support**

**Q: What go-live support do I need to coordinate?**
A: As the **Requesting Clinical Informaticist**:
- Coordinate go-live support if needed (at-the-elbow support, super users, help desk briefing)
- Be available to answer questions on go-live day
- Work with regional teams to provide coverage
- Ensure escalation paths are clear

**Q: [IT Only] What is my role during go-live?**
A: As **IT**:
- Monitor production stability
- Be available for technical issues
- Support any post-deployment technical problems
- Escalate critical issues as needed

---

## **STEP 3: Post-Deployment Monitoring**

**Q: What do I monitor after deployment?**
A: As the **Requesting Clinical Informaticist**:
- Monitor for issues post-deployment
- Track user questions and feedback
- Identify any unexpected behaviors
- Document issues and resolutions
- Coordinate with IT on any technical problems

**Q: [IT Only] What do I monitor after deployment?**
A: As **IT**:
- Monitor production stability
- Track system performance
- Support any post-deployment issues
- Document technical issues and resolutions

**Q: How long should I monitor post-deployment?**
A: Typically monitor closely for:
- **First 24-48 hours**: Intensive monitoring
- **First 1-2 weeks**: Active monitoring and issue resolution
- **First month**: Periodic check-ins and metric tracking

---

## **STEP 4: Issue Resolution**

**Q: What if there's a production issue after go-live?**
A: Log an incident ticket through normal IT support channels. This is separate from the governance process.

**Q: Who supports post-deployment issues?**
A:
- **Technical issues**: IT supports and resolves
- **Workflow/training issues**: Requesting CI and regional informatics support
- **Critical issues**: Escalate through established channels

---

## **STEP 5: Close-Out Documentation**

**Q: What close-out documentation do I need to complete?**
A: As the **Requesting Clinical Informaticist**:
- Complete close-out documentation in the Feature/Demand
- Update final metrics (actual vs. expected outcomes)
- Document lessons learned
- Update the SCI Workbook with final status
- Archive all documentation in Google Drive

**Q: [IT Only] What technical close-out do I need to complete?**
A: As **IT**:
- Complete technical close-out documentation
- Document final build specifications
- Archive technical documentation
- Update any technical knowledge bases

**Q: What goes in lessons learned?**
A: Document:
- What went well
- What could be improved
- Unexpected challenges and how they were resolved
- Recommendations for similar future projects
- Actual timeline vs. estimated timeline

---

## **STEP 6: Close the Request**

**Q: When can I close the request?**
A: As the **Requesting Clinical Informaticist**, close the request when:
- Production validation is complete
- End-user communication is distributed
- Go-live support is complete
- Post-deployment monitoring period is complete
- All issues are resolved or escalated
- Close-out documentation is complete
- Final metrics and lessons learned are documented

**Q: How do I close the request?**
A: Update the request status to indicate all activities are complete and close the Feature/Demand in SPW.

**Q: What happens after the request is closed?**
A: The EHR enhancement is fully implemented and the governance process is complete. The Feature/Demand remains in the system for historical tracking and reference.

---

## **COMMUNICATION TEMPLATES & RESOURCES**

**Q: Are there templates for communication?**
A: Yes, use Communication Templates as guides for:
- Before go-live communication
- During go-live updates
- After go-live follow-up

**Q: Where can I find additional documentation?**
A:
- System Initiative Process Guidebook
- Cerner Governance Process Steps
- Epic Governance Process Steps
- CI/MI Guide to Draft Intake Questions
- Regional EHR Resource Requests templates
- Communication Templates`,

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
        roleColor: 'text-[#00A3E0]',
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
        roleColor: 'text-[#00A3E0]',
        actions: [
          'Monitors production',
          'Supports post-deployment issues',
          'Completes technical documentation'
        ]
      },
      {
        role: 'End Users',
        roleColor: 'text-[#8F939F]',
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
        color: 'text-[#00A3E0]'
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
