# **Comprehensive FAQ for EHR Governance Process**

Based on the documents provided, here are the common questions users might ask, organized by category, with answers:

## **General Process Questions**

**Q: What is the overall governance process flow?** A: The process follows these phases: Request Creation/Intake → Vetting → Prioritization → Define (if clinical sponsorship required) → Design → Develop → Deploy. Some requests may be "Governance Templated" and skip directly to Design.

**Q: What's the difference between Full Governance and Governance Templated?** A: Full Governance goes through all phases (Intake → Vetting → Prioritization → Define → Design → Develop → Deploy). Governance Templated requests skip Vetting and Prioritization and go directly to Design. Items are considered Governance Templated if already established in CSH Triage Guidelines (Cerner) or on the Epic Standard Request (EPSR) list.

**Q: How do I submit an EHR change request?** A: Beginning with Phase 2 of the CSH One Front Door strategy, all optimization requests are submitted via EmployeeCentral under Technology \> Electronic Health Record \> EHR Change \> Optimization Request.

**Q: Who can submit an optimization request?** A: The EHR Optimization Request form must be completed by an Informaticist, LIS, Rev Cycle Resource, or Governance Liaison.

**Q: How do I track my request?** A: After submission, you receive a DMND (Demand) number. You can track your request in Strategic Planning Workspace (SPW) by accessing IT Portal \> Workspaces \> Strategic Planning Workspace and searching for your DMND number.

---

## **Intake Phase**

**Q: What happens during the Intake phase?** A: During Intake:

* An Optimization Folder is created in the Request Folder Shared Drive  
* A folder is created in System Clinical Informatics \> System Policies/Initiatives Folder  
* An SCI Workbook copy is created  
* Intake Slides are created from template  
* The request is entered in SPM using the Draft State Intake Form  
* The System Informatics Leader reviews the Draft Request

**Q: Who is responsible for the Intake phase?** A: The Primary CI/Rev Cycle Ops Contact (Clinical Informaticist) is responsible, working with the System Leader to obtain information and complete the Intake Form.

**Q: What information is needed in the Intake form?** A: Required fields include:

* Service Line (Clinical)  
* EHR system (Cerner, Epic, System, or System with Meditech)  
* Requesting Region  
* Governance Type  
* Short Description  
* Primary User Affected  
* Primary Clinical Informaticist  
* Care Setting (Acute/Ambulatory/Both)  
* Impacted Solutions  
* Intake Slide link  
* Google Drive link  
* Benefit Score

**Q: How do I know when my request has been approved for Vetting?** A: When the System Informatics Leader reviews and approves, they update the Status to "Approved." The Intake task changes to "Closed Complete" and automatically opens the Vetting task.

**Q: What does "Do not click Save as Draft" mean?** A: When creating the request in SPM, you should click "Submit" once all information is entered, not "Save as Draft."

---

## **Vetting Phase**

**Q: What happens during Vetting?** A: The Vetting task is used during the PeriSCOPE Meeting to update ticket status and capture discussion notes. The Change Management Program Manager (CM PgM) reviews all attached required Vetting documentation.

**Q: Who manages the Vetting phase?** A: The Change Management Program Managers (CM PgM) manage the Vetting task. Documentation is visible to all informatics team members in Workspace.

**Q: What are the possible outcomes of Vetting?** A: Possible statuses are:

* **Ready for Prioritization** \- Ticket is ready for SCOPE (Vetting task closes and Prioritization task opens)  
* **Further Review Needed** \- Reopens Intake task; ticket goes back to market for further review  
* **Dismissed** \- Ticket was dismissed in Vetting and can be closed

**Q: Does Vetting create a Define task?** A: Yes, if "Clinical Sponsorship Required" is set to "Yes" during Vetting, a Define Task is created for clinical service line review.

---

## **Prioritization Phase**

**Q: What happens during Prioritization?** A: System Informaticists and IT complete Effort Scoring on the task. Once scoring is complete, the status is updated to "Ready for Agenda" to inform the CM PgM the request is ready for the SCOPE agenda. During SCOPE, the ranked priority is added.

**Q: Who completes the Prioritization scoring?** A: System Informaticists and IT complete the Effort Scoring.

**Q: What are the possible outcomes of Prioritization?** A: Possible statuses are:

* **Ready for Design** \- Ticket moves forward (Prioritization closes, Design task created)  
* **Further Review Needed** \- Reopens Intake task; ticket returns to market  
* **Dismissed** \- Ticket was dismissed at SCOPE and is closed  
* **Needs Define** \- Creates a Define Task (if not already created) for additional Clinical Service Line review

**Q: How do I know my request has been prioritized?** A: When the status updates to "Ready for Design," the prioritization task is marked "Closed Complete" and a Design task is created.

---

## **Define Phase**

**Q: What is the Define phase for?** A: Define is used when clinical sponsorship/service line approval is required. It allows Clinical Service Lines to review and approve the request before design begins.

**Q: When is Define required?** A: Define is created when "Clinical Sponsorship Required" is set to "Yes" during Vetting or when Prioritization selects "Needs Define."

**Q: Who is responsible for the Define phase?** A: The Primary Informaticist is responsible for working with their Clinical Service Line member to secure an Agenda Date and update the Define task.

**Q: What are the possible outcomes of Define?** A: Possible statuses are:

* **Further Review Needed** \- Additional information requested; reopens Intake task  
* **In Progress** \- Requester is working to secure agenda time  
* **Dismissed** \- Clinical Service Line does not support the change request  
* **Approved** \- Define complete; informaticist can move to Design task

**Q: What information is needed for Define?** A: The CM PgM enters the Primary Define Body. The Primary Informaticist adds the Primary Define Agenda Date once secured and the Primary Define Approval Date once approved.

---

## **Design Phase**

**Q: What happens during the Design phase?** A: Design sessions are held to develop the technical solution for the EHR changes. The process varies between Cerner and Epic but generally includes:

* Reviewing EHR requirements  
* Documenting current state and future state workflows  
* Identifying affected applications  
* Creating design documentation  
* Obtaining design approvals

**Q: Who schedules and facilitates design sessions?** A:

* **System requests**: The SCI schedules and facilitates  
* **Cerner**: Primary Informaticist schedules after CM PgM obtains participants  
* **Epic Multi-team tickets**: Process Owner schedules initial session, then hands to Primary Applications Engineer  
* **Epic single application**: The Engineer schedules design sessions

**Q: Do I need a design session?** A: This is indicated by the "Is design already complete?" field:

* **Design is Complete** \- No session needed; proceed with documentation  
* **Design Session Needed** \- Sessions must be scheduled

**Q: What happens during Cerner Design Review Call?** A: If design is not complete:

* Status is set to "Ready for Agenda"  
* "Design Session Needed" is selected  
* CM PgM updates Status to "Resources Needed"  
* Regional and IT leaders have 2 weeks to add participants  
* After 2 weeks, proceed to Design Session

If design is complete, you update key fields (Target Domain, Validators, Release Type, etc.) and set Status to "Ready for Agenda" for approval.

**Q: What happens during Epic Backlog Grooming?** A: If design is not complete:

* Create Epic Optimization Form from template  
* Update Status to "Ready for Agenda" and select "Design Session Needed"

If design is complete:

* Update Status to "Ready for Agenda" and select "Design is Complete"

**Q: Who participates in design sessions?** A: Participants include:

* Primary CI/Rev Cycle Ops Contact (leads discussion)  
* Regional participants (added by regions)  
* IT Application Groups and Assignees  
* SMEs as needed

**Q: What information must be completed in Design?** A: Required information includes:

* Design Document Link  
* Affected Applications  
* Release Type  
* Target Domain (Cerner) or Impacted Solutions (Epic)  
* Validators  
* Finalized Design Summary (voting statement)

**Q: How do I know when Design is complete?** A: The CM PgM (Cerner) or Process Owner (Epic) updates the Status to "Complete," which closes the Demand workflow and creates a Feature ticket for the build phase.

**Q: What happens if the design needs to be changed after it's complete?** A: A "Redesign" task can be opened by Service Management on the original Demand. The Feature is placed in Phase "Redesign" and follows the same steps as the original Design Task.

---

## **Develop/Build Phase**

**Q: What happens during the Develop phase?** A: IT builds the EHR changes in a non-production environment. The Primary Informaticist and Validators work primarily in the O\&M Optimization section of the Feature. The phase includes:

* Building (IT)  
* Testing in non-production  
* Validation by informaticists  
* Change Communication creation (Cerner only)  
* Production testing and validation

**Q: Who builds the EHR changes?** A: IT builders/engineers build the changes based on the approved design documentation.

**Q: What is my role during Develop if I'm a validator?** A: When the status updates to "Testing," validators receive an email requesting validation. You complete testing, add comments to Work Notes, and once all domains are validated, the final validator updates Status to "Validated Successfully Non Prod."

**Q: What is Change Communication?** A: For Cerner only: Change Communication is a document created by the Primary Informaticist and attached in Google Drive. Update "Change Communication Phase" to "Attached" when complete. If no change communication is needed, update "Communication review" to "None Needed."

**Q: What does "Validated Successfully Non Prod" mean?** A: This status indicates that all testing in the non-production environment has been completed successfully by all validators.

**Q: What are the different statuses during Develop?** A:

* **Resources Needed** \- Initial status  
* **Assigned** \- IT has finalized resources  
* **Building** \- Build is in progress  
* **Testing** \- Ready for validation in non-production  
* **Validated Successfully Non Prod** \- Non-prod testing complete  
* **Pending Approval** \- Change approvals in process (Epic)  
* **Ready for Release Planning** \- Ready to schedule production release

**Q: Can you provide a timeline for build completion?** A: An estimate cannot be provided until NON prod build has started. You must work with IT to get an estimate for NON prod build completion. Timeline will be an estimate until NON prod testing is completed.

---

## **Deploy/Release Phase**

**Q: What happens during Deploy?** A: The approved build is released to production. This includes:

* Education/training plan initiation  
* EHR build cutover plan execution  
* Production testing  
* Issue tracking and resolution  
* Communication to stakeholders

**Q: Who initiates the Deploy phase?** A: IT initiates the EHR build cutover plan based on the agreed-upon release schedule.

**Q: What is production validation?** A: After release to production, the status updates to "Prod Validation" (Cerner) or "Building in Prod" then "Prod Validation" (Epic). Validators test in the live production environment and update Work Notes to indicate successful validation. The final validator updates Status to "Validated Successfully Prod."

**Q: What are the different statuses during Deploy?** A:

* **Release Planning** \- Initial status  
* **Assigned Release** \- Release date has been assigned  
* **Building/Building in Prod** \- Build being moved to production  
* **Prod Validation/Testing** \- Ready for production validation  
* **Validated Successfully Prod** \- Production validation complete

**Q: Who creates the training materials?** A: SCI/DCIs/MCIs/Instructional Designers create education for EHR changes (tip sheets addressing only EHR changes, not practice changes).

**Q: When does the EHR Enhancement become complete?** A: When Status is updated to "Validated Successfully Prod" after all domains are validated in production.

---

## **Roles and Responsibilities**

**Q: What does the Primary CI/Rev Cycle Ops Contact do?** A: The Primary Clinical Informaticist is responsible for:

* Leading the entire request through governance  
* Completing Intake form  
* Updating tasks throughout phases  
* Scheduling/facilitating design sessions (for system requests)  
* Leading design discussions  
* Creating/coordinating Change Communication  
* Coordinating validation  
* Communication and education

**Q: What does the CM PgM (Change Management Program Manager) do?** A: The CM PgM:

* Manages Vetting task  
* Reviews documentation  
* Adds requests to PeriSCOPE and SCOPE agendas  
* Updates status after governance meetings  
* Enters Primary Define Body  
* Documents approvals  
* Updates status to move requests through phases

**Q: What does IT do?** A: IT is responsible for:

* Adding resources (Application Groups and Assignees)  
* Building EHR changes based on design  
* Creating cutover plans  
* Providing build timelines  
* Releasing to production

**Q: What do Validators do?** A: Validators:

* Receive email notifications when testing is ready  
* Complete functionality testing in non-production  
* Update Work Notes with validation results  
* Complete production validation after release  
* Final validator updates Status to proceed to next phase

**Q: Who approves what?** A:

* **Intake**: System Informatics Leader  
* **Vetting**: PeriSCOPE meeting attendees (managed by CM PgM)  
* **Prioritization**: SCOPE meeting attendees (CM PgM documents)  
* **Define**: Clinical Service Line members  
* **Design**: Design Review Call attendees; provider groups if provider impact

---

## **Tools and Systems**

**Q: What is SPM?** A: Strategic Portfolio Management (SPM) \- the system where requests are created using forms.

**Q: What is SPW?** A: Strategic Planning Workspace (SPW) \- the task-driven system where you track and manage requests. Access via IT Portal \> Workspaces \> Strategic Planning Workspace.

**Q: What is the SCI Workbook?** A: A Google Sheets document used to track tasks and progress for each initiative. It includes tabs for Intake Questions, tracking, and Non-Hosted sites.

**Q: Where are documents stored?** A: In Google Drive folders:

* Request Folder Shared Drive (optimization folder)  
* System Clinical Informatics \> System Policies/Initiatives Folder (with DMND number and title)

**Q: How do I view EHR Task Details?** A: When accessing a Demand or Demand task for the first time, select the three dots to the left of the Demand Task, scroll down and select "EHR" under View to display the EHR Task Details section.

**Q: What is a Feature ticket?** A: A Feature ticket (FETR) is automatically created when the Design task is completed. It's where IT tracks the build work. Relevant data from the Parent Demand transfers to the Feature.

**Q: How do I view Feature information relevant to Informatics?** A: Set the Feature View to "Release" by clicking the three dots next to the Feature heading, scrolling down and selecting "Release."

---

## **Timelines and Expectations**

**Q: When will my EHR change go live?** A: The Go Live Date is established once NON prod testing is completed. The Initiative Task force agrees upon implementation dates. It will be an estimate until NON prod testing is completed.

**Q: How long does each phase take?** A: Timelines vary by complexity. General guidance:

* **Resources Needed to Assigned**: 2 weeks for regions to add participants (Cerner Design)  
* **Design approval**: 2 weeks for regions to provide Design Feedback  
* **Build estimate**: Cannot be provided until after Non Prod build has started

**Q: What if I need to meet a specific deadline?** A: Don't commit to timelines for EHR changes until working with IT on estimates. For urgent requests, note this during Intake and escalation paths can be considered.

---

## **Special Situations**

**Q: What are Draft User Requests?** A: These are requests submitted by end users through EHR Guided Questions that remain in Draft status until the Region decides on next steps and clicks "Submit Demand" to move to formal Intake.

**Q: What happens with Non-Hosted sites?** A: The SCI provides EHR Requirements/Design recommendations to responsible parties. Utilize the Non-Hosted Dashboard in the SCI Workbook for details on who to contact.

**Q: What if something needs to be changed after approval?** A: Depending on the phase:

* **After Intake/Vetting/Prioritization**: Status can be set to "Further Review Needed" to reopen Intake  
* **After Design**: A Redesign task can be opened  
* Any changes to EHR Requirements after sponsor sign-off will likely result in changes to implementation dates

**Q: What if the request is dismissed?** A: Requests can be dismissed at Vetting, Prioritization, or Define. When dismissed, the ticket is closed and no further work proceeds.

**Q: Are child requests sometimes needed?** A: Yes, if "Is Child request needed?" is answered yes, child tasks will be created that need to follow the same process steps.

**Q: What if there's both Cerner and Epic involved?** A: Selecting "System" or "System with Meditech" creates additional Design Tasks in the Design Phase, addressing each EHR separately.

---

## **Communication**

**Q: How will I be notified of status changes?** A: Email notifications are sent when validators need to test. Otherwise, monitor the Strategic Planning Workspace for status updates on your DMND number.

**Q: How do I communicate with Clinical Informatics about system changes?** A:

* Quarterly Informatics Insider Webinar for system-wide communication  
* Coordinate alternative methods with SCI leadership if needed before upcoming Webinar

**Q: Who needs to be informed during Deploy?** A: Communicate with:

* Clinical/Operational leaders  
* Regional Clinical Informatics leaders  
* IT Leaders  
* Peers  
* System policy team (if policy-related): system-policysupport@commonspirit.org

---

## **Troubleshooting**

**Q: What if I can't find my request?** A: Search by your DMND number in Strategic Planning Workspace. Check different lists (Intake, Vetting, Prioritization, Define, Design, Feature) as requests move through phases.

**Q: What if the wrong status is showing?** A: Contact the responsible party for that phase (Primary Informaticist, CM PgM, or IT) to update the status correctly.

**Q: What if I wasn't notified to validate?** A: Check if you're listed as a Validator in the task. If you should be validating but didn't receive notification, check the Feature status in SPW.

**Q: Where do I find help?** A: Contact your SCI leadership, the CM PgM, or refer to the guidebooks: System Initiative Process Guidebook, Cerner Governance Process Steps, or Epic Governance Process Steps.

---

This FAQ covers the most common questions based on the provided documents. Would you like me to expand on any particular area or add additional questions?

Retry  
M

be more specific. like whole updates the ticket to show ready for design? Who updates a ticket to show resources needed? How do I know when to schedule design sessions? How is a design task opened? When is a FETR created? How is it created? Think like a person who needs to know how to navigate this new complex process

Edit  
Strategized detailed process mapping for precise workflow clarity.

The user wants much more specific, actionable information \- they want to know exactly WHO does WHAT and WHEN. They're right that my previous FAQ was too general. Let me create a more practical, step-by-step FAQ that answers:

* Who specifically updates each status?  
* How do I know when to do my part?  
* What are the exact triggers for each action?  
* Who creates what and when?

Let me go through the documents more carefully to extract these specific details.

# **Practical Step-by-Step FAQ for EHR Governance Process**

## **Who Updates What Status?**

**Q: Who updates the status to "Approved" in Intake?** A: The **System Informatics Leader** reviews the Draft Request and updates the status to "Approved." This closes the Intake task and automatically opens the Vetting task.

**Q: Who updates the Vetting status?** A: The **CM PgM (Change Management Program Manager)** updates Vetting status during/after PeriSCOPE meetings to:

* Ready for Agenda (before meeting)  
* Ready for Prioritization (to move forward)  
* Further Review Needed (needs more info)  
* Dismissed (rejected)

**Q: Who updates the Prioritization status?** A: The **CM PgM** updates Prioritization status after SCOPE meetings to:

* Ready for Design (approved \- closes Prioritization, creates Design task)  
* Further Review Needed (needs more info)  
* Dismissed (rejected)  
* Needs Define (requires clinical service line approval)

**Q: Who updates the Define status?** A: The **Primary Informaticist** updates Define status to:

* In Progress (while securing agenda time)  
* Approved (once Clinical Service Line approves \- this closes Define and moves to Design)  
* Further Review Needed (needs more info)  
* Dismissed (Clinical Service Line rejected)

**Q: Who updates "Status" in Design phase \- Cerner?** A:

* **Primary Informaticist** updates to "Ready for Agenda" when ready for Design Review Call  
* **Primary Informaticist** updates to "In Design" when design sessions are scheduled  
* **CM PgM** updates to "Resources Needed" (after Design Review Call identifies need for participants)  
* **CM PgM** updates to "Complete" after design approval (this closes Design and creates a Feature)

**Q: Who updates "Status" in Design phase \- Epic?** A:

* **Primary Informaticist** updates to "Ready for Agenda"  
* **Primary Informaticist** updates to "In Design" when design sessions start  
* **Primary Informaticist** updates to "Complete" when design sessions done and all info entered

**Q: Who updates "Is design already complete?" field?** A: The **Primary Informaticist** selects either:

* "Design is Complete" (no sessions needed)  
* "Design Session Needed" (sessions required)

**Q: Who updates Develop/Build statuses?** A:

* **IT Process Owner** updates "Resources Needed" to "Assigned"  
* **IT Builder** updates "Assigned" to "Building"  
* **IT Builder** updates "Building" to "Testing" (triggers email to validators)  
* **Final Validator** updates "Testing" to "Validated Successfully Non Prod"  
* **IT Process Owner** updates to "Ready for Release Planning"

**Q: Who updates Deploy statuses?** A:

* **IT Process Owner** updates "Release Planning" to "Assigned Release"  
* **IT Builder** updates to "Building/Building in Prod" on release day  
* **IT Builder** updates to "Prod Validation/Testing" (triggers email to validators)  
* **Final Validator** updates to "Validated Successfully Prod"

---

## **How Tasks Are Created**

**Q: How is the Intake task created?** A: When you click "Submit" on the EHR Optimization Request form in EmployeeCentral, the system automatically creates:

* A Parent Demand with a DMND number  
* An Intake task attached to that Demand

**Q: How is the Vetting task created?** A: The system automatically creates the Vetting task when the System Informatics Leader updates Intake status to "Approved."

**Q: How is the Prioritization task created?** A: The system automatically creates the Prioritization task when CM PgM updates Vetting status to "Ready for Prioritization."

**Q: How is the Define task created?** A: The Define task is created when:

* "Clinical Spons

Retry  
SPM Workflow Charts  Phase 2 Responsible Epic Party.pdf

pdf

SPM Workflow Charts  Phase 2 Responsible Party Cerner 1.pdf

pdf

SPM Workflow Chart 1.pdf

pdf

M

here are some process documents to help leverage as you work to define this very comprehensive knowledge base

Edit  
Thinking about leveraging process documents for comprehensive knowledge base development

Perfect\! Now I have the detailed process flow charts that show exactly who does what and when. Let me revise my FAQ to be much more specific and practical, using these flow charts to answer the "who updates

Retry  
M

create in a canvas. I will ultimately need to give a reference document to Bolt to leverage. This agent's name is Sophia.

Edit  
Engineered comprehensive FAQ document for Sophia's EHR governance process.

The user wants me to create a comprehensive FAQ/knowledge base document for an agent named Sophia that will help users navigate the EHR governance process. This needs to be in a format that can be given to Bolt (a development tool) to create an app where users can ask questions.

Looking at the new process flow documents, I can extract much more specific information about:

1. Exactly who does what  
2. When tasks are created automatically  
3. The color-coded responsible parties  
4. The exact sequence of events

Let me create a comprehensive reference document that:

* Is structured for an AI agent to parse  
* Contains all the detailed Q\&A  
* Includes the process flows  
* Has clear role definitions  
* Provides exact status transitions

I'll create this in an artifact as a comprehensive markdown document.

\<artifact identifier="sophia-ehr-kb" type="application/vnd.ant.code" language="markdown" title="Sophia EHR Governance Knowledge Base"\> \# Sophia \- EHR Governance Assistant Knowledge Base

## **Agent Identity**

**Name:** Sophia  
 **Role:** EHR Governance Process Assistant  
 **Purpose:** Help users navigate the CommonSpirit Health EHR governance process by answering questions about status updates, responsibilities, timelines, and procedures.

---

## **Core Responsible Parties**

### **Color-Coded Roles:**

1. **Requesting Clinical Informaticist (Blue)** \- Primary CI/Rev Cycle Ops Contact  
2. **Change Management Program Manager \- CM PgM (Pink)** \- Manages governance meetings  
3. **IT Process Owner (Green)** \- Manages IT resources and releases  
4. **IT Analyst (Yellow)** \- Performs builds and technical work  
5. **Automatic Process (White)** \- System-automated actions

---

## **PHASE 1: INTAKE**

### **How Intake Starts**

**Q: How do I create a request?** A: Go to EmployeeCentral \> Technology \> Electronic Health Record \> EHR Change \> Optimization Request. Complete the form and click **Submit** (NOT "Save as Draft").

**Q: Who can submit an optimization request?** A: Only these roles can submit:

* Informaticist  
* LIS  
* Rev Cycle Resource  
* Governance Liaison

**Q: What happens when I click Submit?** A: The system **automatically creates**:

* A Parent Demand with a DMND number (e.g., DMND0000123)  
* An Intake Task with Status: **New**

**Q: What information do I need for the Intake form?** A: Required fields:

* Service Line: Clinical  
* EHR system: Cerner, Epic, System, or System with Meditech  
* Requesting Region  
* Governance Type: Full Governance or Governance Templated  
* Short Description (becomes the title)  
* Primary User Affected  
* Primary Clinical Informaticist  
* Care Setting: Acute, Ambulatory, or Both  
* Impacted Solutions  
* Intake Slide link  
* Google Drive link  
* Benefit Score

### **Intake Task Management**

**Q: Who reviews the Intake task?** A: The **System Informatics Leader** reviews the Draft Request.

**Q: What do I do during Market/System Internal Review?** A: Update the Status to **Approved** when ready to move forward. This is the internal review by your market/region/system informatics team.

**Q: Who updates Intake status to Approved?** A: The **Requesting Clinical Informaticist** (you) updates to Approved after internal market review.

**Q: What happens when Status changes to Approved?** A: **Automatically**:

* Intake Task closes (Complete)  
* Vetting Task opens with Status: New

**Q: What if we need more information during Intake?** A: If Status is "Further Review Needed" from any later phase, it always moves the ticket back to Intake for review.

### **Google Drive Setup**

**Q: What folders do I need to create?** A: Create two folders:

1. In Request Folder Shared Drive \- name it with your title (e.g., "System Valuables Policy Update")  
2. In System Clinical Informatics \> System Policies/Initiatives \- name it with title and date (e.g., "System Valuables Policy Update March 2023")

**Q: When do I update the folder name with DMND number?** A: After submission, update folder names to: "DMND\#\#\#\#\#\#\# Title" (e.g., "DMND0000123 System Valuables Policy Update")

**Q: What goes in the SCI Workbook?** A: Create a copy of the SCI Workbook template and document:

* Intake Questions  
* Tasks and progress (updated monthly minimum)  
* Non-Hosted site information

---

## **PHASE 2: VETTING & PRIORITIZATION**

### **Vetting Process**

**Q: Who manages the Vetting task?** A: The **Change Management Program Manager (CM PgM)** manages Vetting.

**Q: What meeting is Vetting associated with?** A: **PeriSCOPE Meeting**

**Q: Who updates Vetting status to Ready for Agenda?** A: The **CM PgM** updates status to Ready for Agenda once placed on the PeriSCOPE agenda.

**Q: What happens at the PeriSCOPE meeting?** A: The CM PgM updates status based on PeriSCOPE decision:

* **Ready for Prioritization** \- Moves forward  
* **Further Review** (back to intake) \- Needs more info  
* **Dismissed** \- Request rejected

**Q: When does Vetting close?** A: When CM PgM updates Status to **Ready for Prioritization**, Vetting Task closes and **automatically opens**:

* Prioritization Task (always)  
* Define Task (if Clinical Sponsorship Required \= Yes)

**Q: Can Define be created during Vetting?** A: Yes, if "Clinical Sponsorship Required" is set to **Yes** during Vetting, a Define Task is created.

### **Prioritization Process**

**Q: What meeting is Prioritization associated with?** A: **SCOPE Meeting**

**Q: Who updates Prioritization status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda after completing Effort Scoring.

**Q: What is Effort Scoring?** A: A meeting where System Informaticists and IT complete effort estimates for the request.

**Q: What happens at SCOPE?** A: The **CM PgM** updates status based on SCOPE decision:

* **Ready for Design** \- Approved, moves forward  
* **Needs Define** \- Requires Clinical Service Line review  
* **Denied** \- Demand closed  
* **Dismissed** \- Demand closed

**Q: When does Prioritization close?** A: When CM PgM updates Status to **Ready for Design**, Prioritization closes and **automatically opens**:

* Define Task (if needed and not already created)  
* Design Intake Task (always)

**Q: Can SCOPE create a Define task?** A: Yes, if SCOPE decides Define is needed, the CM PgM updates Status to **Needs Define** and a Define task is created (if not already done after PeriSCOPE).

---

## **PHASE 3: DEFINE**

### **Define Process**

**Q: When is Define required?** A: Define is created when:

* "Clinical Sponsorship Required" \= Yes (during Vetting), OR  
* SCOPE selects "Needs Define" (during Prioritization)

**Q: What meeting is Define associated with?** A: **Clinical Service Line (CLS) Define Body Meeting(s)**

**Q: Who manages the Define task?** A: The **Requesting Clinical Informaticist** works with the Clinical Service Line representative.

**Q: Who enters the Primary Define Body?** A: The **CM PgM** enters which Clinical Service Line will review (e.g., Critical Care, Cardiovascular, etc.)

**Q: What do I do during Define?** A: As the **Requesting Clinical Informaticist**:

1. Work with CLS group representative to secure agenda time  
2. Update Status to **Ready for Agenda** once date secured  
3. Present to Clinical Service Line  
4. Update Status to **Approved** once CLS approves

**Q: What are the possible Define outcomes?** A: The **Requesting Clinical Informaticist** updates Status to:

* **Approved** \- CLS supports, moves to Design  
* **Further Review Needed** \- Reopens Intake  
* **CLS denied enhancement** \- Demand Closed

**Q: When does Define close?** A: When Status is updated to **Approved**, Define closes and **automatically opens** Design Task.

---

## **PHASE 4: DESIGN**

### **Design Task Creation**

**Q: How is the Design task created?** A: **Automatically created** when:

* Prioritization Status \= Ready for Design (if no Define needed), OR  
* Define Status \= Approved

**Q: What's the first thing that happens in Design?** A: The Design Task opens with Status: **New**. The **Requesting Clinical Informaticist** must answer: "Is design already complete?"

### **Epic Design Process**

**Q: What meeting is Epic Design associated with?** A: **Refinement** (for Backlog Grooming)

**Q: Who updates Epic Design status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda when ready for Refinement.

**Q: What does "Is design already complete?" mean for Epic?** A: Select:

* **Design is Complete** \- No sessions needed, go straight to documentation  
* **Design Session Needed** \- Need to schedule design sessions

**Q: Who updates status to Resources Needed for Epic?** A: The **Requesting Clinical Informaticist** updates to **Resources Needed** (this triggers the need for IT resources).

**Q: When does IT assign resources for Epic?** A: After Status \= Resources Needed, **IT assigns resources**. Once assigned, **IT Process Owner** updates Status to **Assigned**.

**Q: Who schedules design sessions for Epic?** A:

* **Multi-team tickets**: Process Owner schedules initial session, then hands to Primary Applications Engineer  
* **Single application**: The Engineer schedules sessions  
* The **Requesting CI** leads the design discussion

**Q: Who updates Epic Design status to In Design?** A: The **IT Process Owner** updates to **In Design** once IT resources are assigned and sessions are scheduled.

**Q: Who updates Epic Design status to Complete?** A: The **Requesting CI and IT** update to **Complete** after design sessions are done and all documentation is entered.

### **Cerner Design Process**

**Q: What meeting is Cerner Design associated with?** A: **Design Review Call** (happens twice \- once for participant gathering, once for approval)

**Q: Who updates Cerner Design status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda when ready to request design participants OR present completed design.

**Q: What does "Is design already complete?" mean for Cerner?** A: Select:

* **Design is Complete** \- Skip to documentation  
* **Design Session Needed** \- Need participant gathering and sessions

**Q: Who updates status to Resources Needed for Cerner?** A: The **CM PgM** updates to **Resources Needed** after Design Review Call identifies need for participants.

**Q: How do participants get added for Cerner?** A: After Status \= Resources Needed:

1. Regional and IT leaders have **2 weeks** to add participants  
2. **Requesting CI** can add regional participants as needed  
3. **IT** adds Application Groups and Assignees

**Q: Who updates Cerner Design status to In Design?** A: The **Requesting Clinical Informaticist** updates to **In Design** once participants are added and design sessions are scheduled.

**Q: Who schedules design sessions for Cerner?** A: The **Requesting Clinical Informaticist** schedules and facilitates design sessions.

**Q: What happens after Cerner design sessions are complete?** A: The **Requesting CI**:

1. Updates Status to **Ready for Agenda** (to present at Design Review Call)  
2. Selects "Design is Complete"  
3. Completes all design documentation

**Q: What is the second Design Review Call for Cerner?** A: After design sessions, present design for approval at Design Review Call. Regions have **2 weeks** to provide feedback.

**Q: Who approves Cerner designs?** A:

* Design Review Call attendees approve  
* If provider impact, additional design approvals needed  
* **CM PgM** documents all approvals

**Q: Who updates Cerner Design status to Complete?** A: The **CM PgM** updates to **Complete** after all approvals are obtained.

### **When Design Closes**

**Q: What happens when Design Status \= Complete?** A: Design Task closes, Demand is complete, and a **FETR (Feature)** is **automatically opened** with Phase: **Develop**.

**Q: What is a FETR?** A: FETR \= Feature ticket. This is where IT builds the actual EHR changes. It's created automatically when Design is complete.

**Q: How do I find my Feature ticket?** A: In Strategic Planning Workspace \> Features List. Look for your DMND number. The Feature will have a FETR number.

---

## **PHASE 5: DEVELOP & DEPLOY**

### **Develop Phase \- Build & Testing**

**Q: Who works on the Feature during Develop?** A:

* **IT Analyst** \- Builds the changes  
* **IT Process Owner** \- Manages resources and releases  
* **Requesting CI and Validators** \- Test and validate

**Q: What view should I use to see Feature information?** A: Click the three dots next to Feature heading \> View \> **Release** (shows info relevant to Informatics)

**Q: What are the Develop phase statuses?** A: In order:

1. **Phase: Develop** \- Feature first opens here  
2. **Status: Assigned** \- IT resources confirmed, waiting for build  
3. **Status: Building** \- IT starts build in Non-Prod  
4. **Status: Testing** \- Ready for validation (validators emailed)  
5. **Status: Validated Successfully Non Prod** \- Testing complete

**Q: Who updates Status from Assigned to Building?** A: The **IT Analyst** updates when build starts in Non-Prod.

**Q: Who updates Status to Testing?** A: The **IT Analyst** updates to Testing when ready for validation and **emails validators**.

**Q: What do I do when I receive a validation email?** A: As a **Validator**:

1. Complete your testing in Non-Prod  
2. Add comments to **Work Notes** indicating validation is successful  
3. If you're the final validator, update Status to **Validated Successfully Non Prod**

**Q: Who is the "final validator"?** A: The last person to complete validation. After all domains/markets are validated, this person updates the Status.

**Q: What happens after Validated Successfully Non Prod?** A: Work with **IT Instructional Designers** to create education materials (Cerner: Change Communication; Epic: Tip sheets).

### **Cerner Change Communication**

**Q: What is Change Communication?** A: For **Cerner only**: A document created by the **Requesting CI** describing the EHR changes for end users.

**Q: Who creates Change Communication?** A: The **Requesting Clinical Informaticist** creates it and attaches in Google Drive.

**Q: How do I indicate Change Communication is done?** A: Update **Change Communication Phase** to **Attached**.

**Q: What if no Change Communication is needed?** A: Update **Communication review** to **None Needed**.

### **Moving to Deploy**

**Q: Who updates Status to Ready for Release Planning?** A: The **Requesting CI** updates to **Ready for Release Planning** once:

* Validated Successfully Non Prod \= complete  
* Education/Change Communication \= complete

**Q: What happens when Status \= Ready for Release Planning?** A: **Develop Phase closes**, **Deploy Phase opens** with Status: **Release Planning**.

### **Deploy Phase \- Production Release**

**Q: What are the Deploy phase statuses?** A: In order:

1. **Status: Release Planning** \- Waiting for release date  
2. **Status: Assigned Release** \- Release date assigned  
3. **Status: Building in Prod** \- Build moving to production  
4. **Status: Prod Validation** \- Ready for production testing (validators emailed)  
5. **Status: Validated Successfully Prod** \- Production validation complete

**Q: Who updates Status to Assigned Release?** A: The **IT Process Owner** reviews and updates to Assigned Release once release date is assigned.

**Q: When will my change go to production?** A: After IT assigns a release date. Timeline is an **estimate** until Non Prod testing is complete.

**Q: Who updates Status to Building in Prod?** A: The **IT Analyst** updates on release day when starting production build.

**Q: Who updates Status to Prod Validation?** A: The **IT Analyst** updates once build is complete and **emails validators** to start production testing.

**Q: What do I do for Prod Validation?** A: As a **Validator**:

1. Complete testing in Production environment  
2. Add comments to **Work Notes** indicating validation successful  
3. If you're the final validator for all domains/markets, update Status to **Validated Successfully Prod**

**Q: When is the ticket complete?** A: When Status \= **Validated Successfully Prod** \- the EHR enhancement is now live and complete\!

---

## **SPECIAL PATHWAYS**

### **Governance Templated**

**Q: What is Governance Templated?** A: A faster pathway that skips Vetting and Prioritization, going straight to Design. Used for:

* Items in CSH Triage Guidelines (Cerner)  
* Items on Epic Standard Request (EPSR) list  
* Radiology and Lab templated requests

**Q: How do I submit a Governance Templated request?** A: On the EHR Optimization Request form, select **Governance Type: Governance Templated**.

**Q: What happens with Governance Templated requests?** A: They skip to Design phase immediately. Radiology/Lab requests are routed to the correct Assignment Group to review and create a Feature.

**Q: Who can submit Governance Templated requests?** A: **SCI Team \- Pharmacy items only, unless approved by a leader** (per the documents).

### **Draft User Requests**

**Q: What are Draft User Requests?** A: Requests submitted by end users through **EHR Guided Questions** that need regional review before becoming formal requests.

**Q: Who manages Draft User Requests?** A: The **Regions** review these in the Draft \- User Requests list.

**Q: How do I move a Draft User Request forward?** A: Open the Demand and click **Submit Demand** button. This moves it to formal Intake.

**Q: How do end users submit requests?** A: EmployeeCentral \> Technology \> Electronic Health Records \> **EHR Guided Questions**. They answer questions and may be directed to submit an EHR Improvement form.

### **Redesign**

**Q: What is Redesign?** A: When additional design work is needed after a Feature is already created.

**Q: When is Redesign used?** A: If after Design is complete and Feature is created, you identify need for additional design sessions.

**Q: Who opens a Redesign task?** A: **Service Management** opens the Redesign task on the original Demand.

**Q: What happens during Redesign?** A:

* Feature is placed in Phase: **Redesign**  
* Follow the same steps as original Design Task for the requested EHR  
* Once complete, Feature is updated to Phase: **Develop**, Status: **Assigned**

### **System and Multi-EHR Requests**

**Q: What happens if I select "System" as the EHR?** A: Additional Design Tasks are created in the Design Phase, addressing each EHR (Cerner and Epic) separately.

**Q: What happens if I select "System with Meditech"?** A: Additional Design Tasks for Cerner, Epic, AND Meditech are created.

**Q: Do I need separate Features for each EHR?** A: Yes, each EHR will have its own Feature ticket for building.

### **Child Requests**

**Q: What is a child request?** A: Sometimes a request needs to be broken into smaller pieces. Child requests follow the same governance process.

**Q: When are child requests created?** A: During Design, if "Is Child request needed?" is answered **Yes**, child tasks are created.

**Q: Who creates child requests?** A: The **CM PgM** or **IT Process Owner** creates child demands that follow the full process.

### **Non-Hosted Sites**

**Q: What are Non-Hosted sites?** A: Sites that don't use CommonSpirit's main EHR instances (they have their own separate systems).

**Q: What is the SCI's role for Non-Hosted sites?** A: The **SCI provides EHR Requirements/Design recommendations** to responsible parties. They don't build directly.

**Q: Where do I find Non-Hosted site contact information?** A: In the **SCI Workbook \- Non-Hosted Tab** and **Non-Hosted Dashboard**.

---

## **TRACKING & NAVIGATION**

### **Finding Your Request**

**Q: How do I track my request?** A: In Strategic Planning Workspace (SPW):

1. Go to IT Portal \> Workspaces \> Strategic Planning Workspace  
2. Search for your DMND number  
3. Check different lists: Intake, Vetting, Prioritization, Define, Design, Feature

**Q: How do I access Strategic Planning Workspace?** A: IT Portal \> Workspaces tab \> Strategic Planning Workspace. Click the star icon to add to Favorites.

**Q: What lists are available in Workspace?** A: Lists are organized by:

* EHR (Cerner, Epic, All EHR, specific regions)  
* Phase (Intake, Vetting, Prioritization, Define, Design, Feature)  
* Special lists (Draft User Requests, All Demands)

**Q: How do I view EHR Task Details?** A: When opening a Demand or Demand task for the first time:

1. Click the three dots to the left of the Demand Task  
2. Scroll down  
3. Select **EHR** under View

**Q: What information is in the Parent Demand?** A:

* DMND number  
* Short Description (title)  
* All details from Intake form  
* List of all Demand Tasks and their status

**Q: What is the Demand Task tab?** A: Shows all tasks for this request:

* Intake, Vetting, Prioritization, Define, Design  
* Each task's State (Work in Progress or Closed Complete)

### **Understanding Status vs State**

**Q: What's the difference between Status and State?** A:

* **Status** \- Where the request is within a phase (New, Ready for Agenda, Approved, Complete, etc.)  
* **State** \- Whether the task is open or closed (Work in Progress or Closed Complete)

**Q: When does State change to Closed Complete?** A: When the Status reaches a completion point (Approved, Complete, Validated Successfully Prod, etc.)

---

## **ROLES & RESPONSIBILITIES SUMMARY**

### **Requesting Clinical Informaticist (You \- Primary Role)**

**You are responsible for:**

**During Intake:**

* Complete Intake form and submit  
* Create Google Drive folders  
* Create SCI Workbook copy  
* Update Status to Approved after internal review

**During Define:**

* Work with Clinical Service Line representative  
* Secure agenda time  
* Present to CLS  
* Update Status to Approved after CLS approves

**During Design:**

* Answer "Is design already complete?"  
* Update Status to Ready for Agenda  
* Schedule/facilitate design sessions (Cerner and System requests)  
* Lead design discussions  
* Complete design documentation  
* Update Status to In Design and Ready for Agenda at appropriate times

**During Develop:**

* Validate changes in Non-Prod  
* Create Change Communication (Cerner) or work with Instructional Designers (Epic)  
* Update Status to Ready for Release Planning

**During Deploy:**

* Validate changes in Production  
* Support go-live activities

### **Change Management Program Manager (CM PgM)**

**CM PgM is responsible for:**

**During Vetting:**

* Review documentation  
* Add to PeriSCOPE agenda (when Status \= Ready for Agenda)  
* Update Status based on PeriSCOPE decision

**During Prioritization:**

* Add to SCOPE agenda (when Status \= Ready for Agenda)  
* Update Status based on SCOPE decision  
* Document ranked priority

**During Define:**

* Enter Primary Define Body

**During Design (Cerner only):**

* Update Status to Resources Needed  
* Document design approvals  
* Update Status to Complete after all approvals

### **IT Process Owner**

**IT Process Owner is responsible for:**

**During Design:**

* Assign IT resources (Application Groups and Assignees)  
* Update Status to Assigned once resources confirmed (Epic)

**During Develop:**

* Manage Feature  
* Update Status to Ready for Release Planning

**During Deploy:**

* Review and assign release date  
* Update Status to Assigned Release

### **IT Analyst (Builder)**

**IT Analyst is responsible for:**

**During Develop:**

* Build changes in Non-Prod  
* Update Status to Building  
* Update Status to Testing when ready  
* Email validators

**During Deploy:**

* Build changes in Production  
* Update Status to Building in Prod  
* Update Status to Prod Validation when ready  
* Email validators

### **Validators**

**Validators are responsible for:**

**During Develop:**

* Complete testing in Non-Prod when emailed  
* Add Work Notes with results  
* Final validator: Update Status to Validated Successfully Non Prod

**During Deploy:**

* Complete testing in Production when emailed  
* Add Work Notes with results  
* Final validator: Update Status to Validated Successfully Prod

---

## **TIMELINES & EXPECTATIONS**

### **How Long Does Each Phase Take?**

**Q: How long is Intake?** A: Variable \- depends on internal market review. Could be same day to several weeks.

**Q: When does Vetting happen?** A: At scheduled PeriSCOPE meetings (check with CM PgM for meeting schedule).

**Q: When does Prioritization happen?** A: At scheduled SCOPE meetings (check with CM PgM for meeting schedule).

**Q: How long is Define?** A: Depends on Clinical Service Line meeting schedules. Work with your CLS representative.

**Q: How long is Design?** A: Variable:

* 2 weeks for participant gathering (Cerner after Resources Needed)  
* 2-4 weeks for design sessions (depends on complexity)  
* 2 weeks for design feedback (Cerner after presenting design)

**Q: How long is Develop?** A: Cannot estimate until Non-Prod build has started. Work with IT for timeline.

**Q: How long is Deploy?** A: Depends on release schedule. IT assigns release dates.

**Q: Can I commit to a specific go-live date?** A: **No**. Don't commit to timelines for EHR changes until working with IT on estimates after Non-Prod build starts.

### **Important Deadlines**

**Q: What is the 2-week window?** A: Several places have 2-week windows:

* Cerner: Regions have 2 weeks to add design participants after Resources Needed  
* Cerner: Regions have 2 weeks to provide design feedback after design presentation

**Q: What if I miss a meeting deadline?** A: Your request will be scheduled for the next available meeting (PeriSCOPE, SCOPE, CLS, Design Review, etc.)

---

## **COMMON ISSUES & TROUBLESHOOTING**

### **Status Not Updating**

**Q: The status hasn't changed \- what do I check?** A: Verify:

1. Was the status updated by the correct responsible party?  
2. Was the task saved after updating?  
3. Are you looking at the right task (Intake, Vetting, Prioritization, etc.)?  
4. Refresh your browser

**Q: Who do I contact if status is stuck?** A: Contact the responsible party for that phase:

* Intake: System Informatics Leader  
* Vetting/Prioritization: CM PgM  
* Define: Check with yourself (you should be updating)  
* Design: CM PgM (Cerner) or check if you should update (Epic)  
* Develop/Deploy: IT Process Owner or IT Analyst

### **Missing Information**

**Q: I can't find my Demand/FETR number** A:

* Check your email for submission confirmation  
* Search in Strategic Planning Workspace by title or your name  
* Check multiple lists (request moves between phases)  
* Contact CM PgM for help locating

**Q: I wasn't notified to validate** A:

* Check if you're listed as a Validator in the Feature  
* Check Feature status in SPW manually  
* Spam folder check  
* Contact IT Process Owner to add you as Validator

**Q: Required fields are missing from my task** A:

* Select three dots \> View \> EHR to display EHR Task Details  
* If still missing, contact CM PgM

### **Process Issues**

**Q: The request was dismissed \- can I resubmit?** A: No. Dismissed means rejected at Vetting, SCOPE, or CLS. You would need to address the concerns and submit as a new request.

**Q: The request needs Further Review \- what do I do?** A: The Intake task automatically reopens. Review feedback, gather additional information, and update the Intake task to move forward again.

**Q: Design needs to change after it's approved** A: Request a Redesign task through Service Management. The Feature moves to Phase: Redesign.

**Q: What if there's a production issue after go-live?** A: Log an incident ticket through normal IT support channels. This is separate from the governance process.

---

## **MEETINGS & GOVERNANCE BODIES**

### **PeriSCOPE**

**Q: What is PeriSCOPE?** A: Peripheral SCOPE \- a meeting for initial vetting of requests before they go to SCOPE.

**Q: Who attends PeriSCOPE?** A: CM PgM and informatics leadership.

**Q: Do I present at PeriSCOPE?** A: Not typically \- CM PgM reviews your Intake documentation and presents.

**Q: What does PeriSCOPE decide?** A: Whether request moves to Prioritization, needs more review, or should be dismissed.

### **SCOPE**

**Q: What is SCOPE?** A: System Coordinating Optimization and Prioritization Effort \- the meeting where requests are prioritized and ranked.

**Q: Who attends SCOPE?** A: Informatics leadership and IT leadership.

**Q: Do I present at SCOPE?** A: Not typically \- CM PgM presents your prioritization information.

**Q: What does SCOPE decide?** A:

* Priority ranking (1-10 scale)  
* Whether to proceed to Design  
* Whether Define is needed  
* Whether to dismiss or deny

### **Effort Scoring Meeting**

**Q: What is Effort Scoring?** A: A meeting where System Informaticists and IT estimate the effort required for the request.

**Q: Who attends Effort Scoring?** A: System Informaticists and IT representatives.

**Q: When does Effort Scoring happen?** A: During the Prioritization phase, before SCOPE.

**Q: What do I need to do for Effort Scoring?** A: Complete the scoring and update Status to Ready for Agenda when done.

### **Design Review Call**

**Q: What is Design Review Call?** A: For Cerner requests \- a call to gather design participants OR approve completed designs.

**Q: When does Design Review happen?** A:

* First time: When Status \= Ready for Agenda and need participants  
* Second time: When Status \= Ready for Agenda after design sessions complete

**Q: Who attends Design Review?** A: CM PgM, requesting CI, regional CIs, IT representatives.

**Q: Do I present at Design Review?** A: Yes, if presenting completed design for approval.

### **Refinement**

**Q: What is Refinement?** A: For Epic requests \- also called Backlog Grooming. Initial review of design requirements.

**Q: Who attends Refinement?** A: Epic Process Owners, requesting CI, IT.

**Q: What happens at Refinement?** A: Review Intake Slide, identify needed participants, determine if design sessions needed.

### **Clinical Service Line (CLS) Define Body**

**Q: What is the CLS Define Body?** A: The clinical service line committee that reviews and approves clinical practice changes (e.g., Critical Care Council, Cardiovascular Committee).

**Q: Who attends CLS meetings?** A: Varies by service line \- physicians, advanced practice providers, nurse leaders, pharmacists, etc.

**Q: Do I present at CLS?** A: Yes, you work with the CLS representative to present the request for approval.

**Q: What does CLS approve?** A: The clinical practice change and workflow \- not the EHR technical design.

---

## **DOCUMENTATION & TOOLS**

### **SCI Workbook**

**Q: What is the SCI Workbook used for?** A: Track tasks and progress for your initiative. Includes:

* Intake Questions tab  
* Task tracking  
* Non-Hosted site information  
* Monthly progress updates

**Q: How often should I update the SCI Workbook?** A: At minimum monthly, or with each major milestone.

**Q: Do I share the SCI Workbook?** A: Yes, with your team and stakeholders for communication and organization.

### **Intake Slides**

**Q: What are Intake Slides?** A: A Google Slides presentation created from template that summarizes the request for governance meetings.

**Q: Who creates Intake Slides?** A: The **Requesting Clinical Informaticist** creates from template.

**Q: What goes in Intake Slides?** A:

* Request overview  
* Clinical need/problem  
* Proposed solution  
* Benefit score  
* Impact assessment  
* Timeline estimate

**Q: Where do I put Intake Slides?** A: In the optimization folder in Google Drive, and link to them in the Intake form.

### **Design Documentation**

**Q: What design documentation is required?** A:

* **Cerner**: Design/build documents submitted to IT  
* **Epic**: Epic Optimization Form created from template  
* Both: Current state and future state workflows  
* Design session notes

**Q: Who creates design documentation?** A: The **Requesting Clinical Informaticist** with input from design session participants.

**Q: Where are design documents stored?** A: In the Google Drive folder (DMND\#\#\#\#\#\#\# Title folder).

### **Communication & Education**

**Q: What education materials are created?** A:

* **Cerner**: Change Communication document  
* **Epic**: Tip sheets (created by Instructional Designers)  
* Both: Training materials for clinical staff

**Q: Who creates education?** A:

* Change Communication: Requesting CI  
* Tip sheets: IT Instructional Designers (Epic)  
* Clinical training: Initiative sponsors/clinical leaders

**Q: When should education be ready?** A: Before Status updates to Ready for Release Planning.

---

## **COMMUNICATION STRATEGIES**

### **Who Needs to Know What?**

**Q: Who do I communicate with throughout the process?** A:

* **Clinical/Operational leaders** \- About practice changes  
* **Regional Clinical Informatics leaders** \- About EHR implementation  
* **IT Leaders** \- About build progress  
* **Peers** \- System Clinical Informaticists working on similar initiatives  
* **End users** \- Before go-live about changes

**Q: How do I communicate system-wide?** A:

* **Quarterly Informatics Insider Webinar** \- for broad announcements  
* Coordinate with SCI leadership for alternative methods if webinar timing doesn't work

**Q: What about policy-related communications?** A: If build is related to a system policy, email **system-policysupport@commonspirit.org** so they can update effective dates and publish.

### **Communication Templates**

**Q: Are there templates for communication?** A: Yes, use Communication Templates as guides for:

* Before go-live communication  
* During go-live updates  
* After go-live follow-up

**Q: When should I communicate?** A:

* **Before design**: Announce upcoming sessions  
* **After design approval**: Share what's coming  
* **Before build to prod**: Confirm go-live date  
* **At go-live**: Confirm changes are live  
* **Post go-live**: Gather feedback, address issues

---

## **SYSTEM INITIATIVES (SPECIAL CONSIDERATIONS)**

### **System-Wide Policies & Initiatives**

**Q: What makes something a system initiative vs. regional?** A: System initiatives:

* Impact multiple regions/markets  
* Related to system policies  
* Board goals or regulatory requirements  
* CommonSpirit Health standards

**Q: Is the process different for system initiatives?** A: The governance process is the same, but:

* SCI (not regional CI) is primary contact  
* Coordination across multiple regions required  
* System leadership approval needed  
* More complex communication plan

**Q: What is the System Initiative Process Guidebook?** A: A separate guide (in documents provided) for SCIs managing large-scale initiatives beyond just EHR changes.

### **5 D's Framework**

**Q: What are the 5 D's?** A: A framework for system initiatives:

1. **Discover** \- Learn about the topic, define the problem  
2. **Define** \- Narrow analysis, define measurement of success  
3. **Design** \- Focus on solution, evaluate ideas, build prototypes  
4. **Develop** \- Build agreed solution in non-prod, test  
5. **Deploy** \- Communication, training, readiness, move to prod

**Q: When do I use the 5 D's?** A: For complex system initiatives that involve more than just EHR changes (policy creation, workflow changes, practice transformation).

---

## **QUICK REFERENCE: WHO UPDATES WHAT STATUS**

| Phase | Status Change | Who Updates | What Happens Next |
| ----- | ----- | ----- | ----- |
| **Intake** | New → Approved | Requesting CI | Intake closes, Vetting opens |
| **Vetting** | New → Ready for Agenda | CM PgM | Added to PeriSCOPE agenda |
| **Vetting** | Ready for Agenda → Ready for Prioritization | CM PgM | Vetting closes, Prioritization & Define (if needed) open |
| **Prioritization** | New → Ready for Agenda | Requesting CI | Added to SCOPE agenda |
| **Prioritization** | Ready for Agenda → Ready for Design | CM PgM | Prioritization closes, Design opens |
| **Define** | New → Ready for Agenda | Requesting CI | Present to CLS |
| **Define** | Ready for Agenda → Approved | Requesting CI | Define closes, Design opens |
| **Design (Epic)** | New → Ready for Agenda | Requesting CI | Added to Refinement |
| **Design (Epic)** | Ready for Agenda → Resources Needed | Requesting CI | IT assigns resources |
| **Design (Epic)** | Resources Needed → In Design | IT Process Owner | Design sessions scheduled |
| **Design (Epic)** | In Design → Complete | Requesting CI & IT | Design closes, FETR opens |
| **Design (Cerner)** | New → Ready for Agenda | Requesting CI | Added to Design Review |
| **Design (Cerner)** | Ready for Agenda → Resources Needed | CM PgM | Participants needed |
| **Design (Cerner)** | Resources Needed → In Design | Requesting CI | Sessions scheduled |
| **Design (Cerner)** | In Design → Ready for Agenda | Requesting CI | Present for approval |
| **Design (Cerner)** | Ready for Agenda → Complete | CM PgM | Design closes, FETR opens |
| **Develop** | Assigned → Building | IT Analyst | Build starts |
| **Develop** | Building → Testing | IT Analyst | Validators emailed |
| **Develop** | Testing → Validated Successfully Non Prod | Final Validator | Work with ID on education |
| **Develop** | Validated Successfully Non Prod → Ready for Release Planning | Requesting CI | Deploy opens |
| **Deploy** | Release Planning → Assigned Release | IT Process Owner | Date assigned |
| **Deploy** | Assigned Release → Building in Prod | IT Analyst | Prod build starts |
| **Deploy** | Building in Prod → Prod Validation | IT Analyst | Validators emailed |
| **Deploy** | Prod Validation → Validated Successfully Prod | Final Validator | COMPLETE\! |

---

## **GLOSSARY**

**CLS** \- Clinical Service Line (e.g., Critical Care, Cardiovascular)

**CM PgM** \- Change Management Program Manager

**CI** \- Clinical Informaticist

**DCI** \- Divisional Clinical Informaticist

**DMND** \- Demand (request) number

**EHR** \- Electronic Health Record

**FETR** \- Feature ticket number

**ID** \- Instructional Designer

**LIS** \- Laboratory Information Systems

**MCI** \- Market Clinical Informaticist

**PeriSCOPE** \- Peripheral System Coordinating Optimization and Prioritization Effort (initial vetting meeting)

**RCI** \- Regional Clinical Informaticist

**SCOPE** \- System Coordinating Optimization and Prioritization Effort (prioritization meeting)

**SCI** \- System Clinical Informaticist

**SPM** \- Strategic Portfolio Management (form submission system)

**SPW** \- Strategic Planning Workspace (tracking system)

---

## **CONTACT & SUPPORT**

**Q: Who do I contact for help?** A: Depends on the phase:

* **General process questions**: SCI Leadership or CM PgM  
* **Intake issues**: Your manager or System Informatics Leader  
* **Vetting/Prioritization questions**: CM PgM  
* **Define issues**: Clinical Service Line representative  
* **Design questions**: CM PgM (Cerner) or IT Process Owner (Epic)  
* **Build/technical issues**: IT Process Owner or IT Analyst  
* **Validation problems**: IT Process Owner  
* **SPW/system issues**: IT Portal support

**Q: Where can I find additional documentation?** A:

* System Initiative Process Guidebook  
* Cerner Governance Process Steps  
* Epic Governance Process Steps (in development)  
* CI/MI Guide to Draft Intake Questions  
* Regional EHR Resource Requests templates  
* Communication Templates

---

## **FINAL TIPS FOR SUCCESS**

1. **Update your SCI Workbook monthly** \- Don't let it get stale  
2. **Don't commit to timelines** until Non-Prod build is done  
3. **Keep Google Drive organized** with DMND number in folder names  
4. **Communicate early and often** with all stakeholders  
5. **Document everything** in Work Notes and design documentation  
6. **Follow up proactively** \- don't wait for status to update automatically  
7. **Use templates** for consistency and efficiency  
8. **Star Strategic Planning Workspace** in your Favorites for quick access  
9. **Check responsible party colors** on flow charts when unsure who does what  
10. **Ask for help** \- Your SCI peers, leadership, and CM PgM are resources

---

*This knowledge base is based on documentation dated August 2025\. Process may evolve \- always verify with current governance documentation.* \</artifact\>

I've created a comprehensive knowledge base document for Sophia that covers:

1. **Detailed Q\&A format** \- Practical questions users would actually ask  
2. **Clear role assignments** \- Color-coded responsibilities from the flow charts  
3. **Exact status transitions** \- Who updates what, when, and what happens next  
4. **Phase-by-phase walkthrough** \- From Intake through Deploy  
5. **Quick reference table** \- At-a-glance "who does what"  
6. **Special situations** \- Governance Templated, Redesign, Multi-EHR, etc.  
7. **Troubleshooting** \- Common issues and solutions  
8. **Meetings guide** \- What each governance meeting does  
9. **Tools & documentation** \- What to use when

The document is structured so Bolt can easily parse it to build an intelligent agent that can answer questions like:

* "Who schedules design sessions for Epic?"  
* "How do I know when my item is prioritized?"  
* "When is a FETR created?"  
* "Who updates status to Resources Needed?"

