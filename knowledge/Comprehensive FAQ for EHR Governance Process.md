# Sophia - EHR Governance Assistant Knowledge Base

## **Agent Identity**

**Name:** Sophia
**Role:** EHR Governance Process Assistant
**Purpose:** Help users navigate the CommonSpirit Health EHR governance process by answering questions about status updates, responsibilities, timelines, and procedures.

---

## **Core Responsible Parties**

### **Color-Coded Roles:**

1. **Requesting Clinical Informaticist (Blue)** - Primary CI/Rev Cycle Ops Contact
2. **Change Management Program Manager - CM PgM (Pink)** - Manages governance meetings
3. **IT Process Owner (Green)** - Manages IT resources and releases
4. **IT Analyst (Yellow)** - Performs builds and technical work
5. **Automatic Process (White)** - System-automated actions

---

## **PHASE 1: INTAKE**

### **How Intake Starts**

**Q: How do I create a request?** A: Go to EmployeeCentral > Technology > Electronic Health Record > EHR Change > Optimization Request. Complete the form and click **Submit** (NOT "Save as Draft").

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

1. In Request Folder Shared Drive - name it with your title (e.g., "System Valuables Policy Update")
2. In System Clinical Informatics > System Policies/Initiatives - name it with title and date (e.g., "System Valuables Policy Update March 2023")

**Q: When do I update the folder name with DMND number?** A: After submission, update folder names to: "DMND####### Title" (e.g., "DMND0000123 System Valuables Policy Update")

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

* **Ready for Prioritization** - Moves forward
* **Further Review** (back to intake) - Needs more info
* **Dismissed** - Request rejected

**Q: When does Vetting close?** A: When CM PgM updates Status to **Ready for Prioritization**, Vetting Task closes and **automatically opens**:

* Prioritization Task (always)
* Define Task (if Clinical Sponsorship Required = Yes)

**Q: Can Define be created during Vetting?** A: Yes, if "Clinical Sponsorship Required" is set to **Yes** during Vetting, a Define Task is created.

### **Prioritization Process**

**Q: What meeting is Prioritization associated with?** A: **SCOPE Meeting**

**Q: Who updates Prioritization status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda after completing Effort Scoring.

**Q: What is Effort Scoring?** A: A meeting where System Informaticists and IT complete effort estimates for the request.

**Q: What happens at SCOPE?** A: The **CM PgM** updates status based on SCOPE decision:

* **Ready for Design** - Approved, moves forward
* **Needs Define** - Requires Clinical Service Line review
* **Denied** - Demand closed
* **Dismissed** - Demand closed

**Q: When does Prioritization close?** A: When CM PgM updates Status to **Ready for Design**, Prioritization closes and **automatically opens**:

* Define Task (if needed and not already created)
* Design Intake Task (always)

**Q: Can SCOPE create a Define task?** A: Yes, if SCOPE decides Define is needed, the CM PgM updates Status to **Needs Define** and a Define task is created (if not already done after PeriSCOPE).

---

## **PHASE 3: DEFINE**

### **Define Process**

**Q: When is Define required?** A: Define is created when:

* "Clinical Sponsorship Required" = Yes (during Vetting), OR
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

* **Approved** - CLS supports, moves to Design
* **Further Review Needed** - Reopens Intake
* **CLS denied enhancement** - Demand Closed

**Q: When does Define close?** A: When Status is updated to **Approved**, Define closes and **automatically opens** Design Task.

---

## **PHASE 4: DESIGN**

### **Design Task Creation**

**Q: How is the Design task created?** A: **Automatically created** when:

* Prioritization Status = Ready for Design (if no Define needed), OR
* Define Status = Approved

**Q: What's the first thing that happens in Design?** A: The Design Task opens with Status: **New**. The **Requesting Clinical Informaticist** must answer: "Is design already complete?"

**Q: What triggers a ticket to be ready for design?** A: When the status of the ticket in the Define phase is updated to **Approved**, the Define task closes automatically and automatically opens a Design task. If no Define phase is required, when the CM PgM updates the Prioritization status to **Ready for Design**, the Prioritization task closes automatically and automatically opens a Design task.

### **Epic Design Process**

**Q: What meeting is Epic Design associated with?** A: **Refinement** (for Backlog Grooming)

**Q: Who updates Epic Design status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda when ready for Refinement.

**Q: What does "Is design already complete?" mean for Epic?** A: Select:

* **Design is Complete** - No sessions needed, go straight to documentation
* **Design Session Needed** - Need to schedule design sessions

**Q: Who updates status to Resources Needed for Epic?** A: The **Requesting Clinical Informaticist** updates to **Resources Needed** (this triggers the need for IT resources).

**Q: When does IT assign resources for Epic?** A: After Status = Resources Needed, **IT assigns resources**. Once assigned, **IT Process Owner** updates Status to **Assigned**.

**Q: Who schedules design sessions for Epic?** A:

* **Multi-team tickets**: Process Owner schedules initial session, then hands to Primary Applications Engineer
* **Single application**: The Engineer schedules sessions
* The **Requesting CI** leads the design discussion

**Q: Who updates Epic Design status to In Design?** A: The **IT Process Owner** updates to **In Design** once IT resources are assigned and sessions are scheduled.

**Q: Who updates Epic Design status to Complete?** A: The **Requesting CI and IT** update to **Complete** after design sessions are done and all documentation is entered.

### **Cerner Design Process**

**Q: What meeting is Cerner Design associated with?** A: **Design Review Call** (happens twice - once for participant gathering, once for approval)

**Q: Who updates Cerner Design status to Ready for Agenda?** A: The **Requesting Clinical Informaticist** updates to Ready for Agenda when ready to request design participants OR present completed design.

**Q: What does "Is design already complete?" mean for Cerner?** A: Select:

* **Design is Complete** - Skip to documentation
* **Design Session Needed** - Need participant gathering and sessions

**Q: Who updates status to Resources Needed for Cerner?** A: The **CM PgM** updates to **Resources Needed** after Design Review Call identifies need for participants.

**Q: How do participants get added for Cerner?** A: After Status = Resources Needed:

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

**Q: What happens when Design Status = Complete?** A: Design Task closes, Demand is complete, and a **FETR (Feature)** is **automatically opened** with Phase: **Develop**.

**Q: What is a FETR?** A: FETR = Feature ticket. This is where IT builds the actual EHR changes. It's created automatically when Design is complete.

**Q: How is a FETR created?** A: The FETR is **automatically created by the system** when the Design task status is updated to **Complete**. This is an automated process - no manual creation is needed.

**Q: How do I find my Feature ticket?** A: In Strategic Planning Workspace > Features List. Look for your DMND number. The Feature will have a FETR number.

---

## **PHASE 5: DEVELOP & DEPLOY**

### **Develop Phase - Build & Testing**

**Q: Who works on the Feature during Develop?** A:

* **IT Analyst** - Builds the changes
* **IT Process Owner** - Manages resources and releases
* **Requesting CI and Validators** - Test and validate

**Q: What view should I use to see Feature information?** A: Click the three dots next to Feature heading > View > **Release** (shows info relevant to Informatics)

**Q: What are the Develop phase statuses?** A: In order:

1. **Phase: Develop** - Feature first opens here
2. **Status: Assigned** - IT resources confirmed, waiting for build
3. **Status: Building** - IT starts build in Non-Prod
4. **Status: Testing** - Ready for validation (validators emailed)
5. **Status: Validated Successfully Non Prod** - Testing complete

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

* Validated Successfully Non Prod = complete
* Education/Change Communication = complete

**Q: What happens when Status = Ready for Release Planning?** A: **Develop Phase closes**, **Deploy Phase opens** with Status: **Release Planning**.

### **Deploy Phase - Production Release**

**Q: What are the Deploy phase statuses?** A: In order:

1. **Status: Release Planning** - Waiting for release date
2. **Status: Assigned Release** - Release date assigned
3. **Status: Building in Prod** - Build moving to production
4. **Status: Prod Validation** - Ready for production testing (validators emailed)
5. **Status: Validated Successfully Prod** - Production validation complete

**Q: Who updates Status to Assigned Release?** A: The **IT Process Owner** reviews and updates to Assigned Release once release date is assigned.

**Q: When will my change go to production?** A: After IT assigns a release date. Timeline is an **estimate** until Non Prod testing is complete.

**Q: Who updates Status to Building in Prod?** A: The **IT Analyst** updates on release day when starting production build.

**Q: Who updates Status to Prod Validation?** A: The **IT Analyst** updates once build is complete and **emails validators** to start production testing.

**Q: What do I do for Prod Validation?** A: As a **Validator**:

1. Complete testing in Production environment
2. Add comments to **Work Notes** indicating validation successful
3. If you're the final validator for all domains/markets, update Status to **Validated Successfully Prod**

**Q: When is the ticket complete?** A: When Status = **Validated Successfully Prod** - the EHR enhancement is now live and complete!

---

## **SPECIAL PATHWAYS**

### **Governance Templated**

**Q: What is Governance Templated?** A: A faster pathway that skips Vetting and Prioritization, going straight to Design. Used for:

* Items in CSH Triage Guidelines (Cerner)
* Items on Epic Standard Request (EPSR) list
* Radiology and Lab templated requests

**Q: How do I submit a Governance Templated request?** A: On the EHR Optimization Request form, select **Governance Type: Governance Templated**.

**Q: What happens with Governance Templated requests?** A: They skip to Design phase immediately. Radiology/Lab requests are routed to the correct Assignment Group to review and create a Feature.

### **Draft User Requests**

**Q: What are Draft User Requests?** A: Requests submitted by end users through **EHR Guided Questions** that need regional review before becoming formal requests.

**Q: Who manages Draft User Requests?** A: The **Regions** review these in the Draft - User Requests list.

**Q: How do I move a Draft User Request forward?** A: Open the Demand and click **Submit Demand** button. This moves it to formal Intake.

### **Redesign**

**Q: What is Redesign?** A: When additional design work is needed after a Feature is already created.

**Q: When is Redesign used?** A: If after Design is complete and Feature is created, you identify need for additional design sessions.

**Q: Who opens a Redesign task?** A: **Service Management** opens the Redesign task on the original Demand.

**Q: What happens during Redesign?** A:

* Feature is placed in Phase: **Redesign**
* Follow the same steps as original Design Task for the requested EHR
* Once complete, Feature is updated to Phase: **Develop**, Status: **Assigned**

---

## **TRACKING & NAVIGATION**

### **Finding Your Request**

**Q: How do I track my request?** A: In Strategic Planning Workspace (SPW):

1. Go to IT Portal > Workspaces > Strategic Planning Workspace
2. Search for your DMND number
3. Check different lists: Intake, Vetting, Prioritization, Define, Design, Feature

**Q: How do I access Strategic Planning Workspace?** A: IT Portal > Workspaces tab > Strategic Planning Workspace. Click the star icon to add to Favorites.

**Q: How do I view EHR Task Details?** A: When opening a Demand or Demand task for the first time:

1. Click the three dots to the left of the Demand Task
2. Scroll down
3. Select **EHR** under View

### **Understanding Status vs State**

**Q: What's the difference between Status and State?** A:

* **Status** - Where the request is within a phase (New, Ready for Agenda, Approved, Complete, etc.)
* **State** - Whether the task is open or closed (Work in Progress or Closed Complete)

**Q: When does State change to Closed Complete?** A: When the Status reaches a completion point (Approved, Complete, Validated Successfully Prod, etc.)

---

## **ROLES & RESPONSIBILITIES SUMMARY**

### **Requesting Clinical Informaticist (You - Primary Role)**

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

**During Vetting:**
* Review documentation
* Add to PeriSCOPE agenda (when Status = Ready for Agenda)
* Update Status based on PeriSCOPE decision

**During Prioritization:**
* Add to SCOPE agenda (when Status = Ready for Agenda)
* Update Status based on SCOPE decision
* Document ranked priority

**During Define:**
* Enter Primary Define Body

**During Design (Cerner only):**
* Update Status to Resources Needed
* Document design approvals
* Update Status to Complete after all approvals

### **IT Process Owner**

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

**Q: How long is Intake?** A: Variable - depends on internal market review. Could be same day to several weeks.

**Q: When does Vetting happen?** A: At scheduled PeriSCOPE meetings (check with CM PgM for meeting schedule).

**Q: When does Prioritization happen?** A: At scheduled SCOPE meetings (check with CM PgM for meeting schedule).

**Q: How long is Design?** A: Variable:
* 2 weeks for participant gathering (Cerner after Resources Needed)
* 2-4 weeks for design sessions (depends on complexity)
* 2 weeks for design feedback (Cerner after presenting design)

**Q: How long is Develop?** A: Cannot estimate until Non-Prod build has started. Work with IT for timeline.

**Q: Can I commit to a specific go-live date?** A: **No**. Don't commit to timelines for EHR changes until working with IT on estimates after Non-Prod build starts.

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
| **Deploy** | Prod Validation → Validated Successfully Prod | Final Validator | COMPLETE! |

---

## **GLOSSARY**

**CLS** - Clinical Service Line (e.g., Critical Care, Cardiovascular)

**CM PgM** - Change Management Program Manager

**CI** - Clinical Informaticist

**DMND** - Demand (request) number

**EHR** - Electronic Health Record

**FETR** - Feature ticket number

**IT** - Information Technology

**PeriSCOPE** - Peripheral System Coordinating Optimization and Prioritization Effort (initial vetting meeting)

**SCOPE** - System Coordinating Optimization and Prioritization Effort (prioritization meeting)

**SCI** - System Clinical Informaticist

**SPM** - Strategic Portfolio Management (form submission system)

**SPW** - Strategic Planning Workspace (tracking system)

---

## **DETAILED PROCESS STEPS TABLE**

This comprehensive table provides step-by-step instructions for each phase of the EHR governance process.

### **PHASE 1: INTAKE**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 1 | Submit Request | Create and submit the initial optimization request | 1. Go to EmployeeCentral > Technology > Electronic Health Record > EHR Change > Optimization Request<br>2. Complete all required fields: Service Line (Clinical), EHR system (Cerner/Epic/System/System with Meditech), Requesting Region, Governance Type, Short Description, Primary User Affected, Primary Clinical Informaticist, Care Setting, Impacted Solutions, Intake Slide link, Google Drive link, Benefit Score<br>3. Click **Submit** (NOT 'Save as Draft')<br>4. System automatically creates Parent Demand with DMND number and Intake Task with Status: New | • Only Informaticist, LIS, Rev Cycle Resource, or Governance Liaison can submit<br>• Selecting 'System' or 'System with Meditech' creates additional Design Tasks for each EHR<br>• Keep DMND number - needed to track your request<br>• Governance Templated skips Vetting and Prioritization | Same day | Requesting Clinical Informaticist |
| 1b | Set Up Project Workspace | Create folders and documentation to organize request materials | 1. Create folder in Request Folder Shared Drive with title<br>2. Create 5 subfolders: 01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout<br>3. [SCI Only] Create folder in System Clinical Informatics > System Policies/Initiatives with title and date<br>4. After receiving DMND number, rename BOTH folders to 'DMND####### Title'<br>5. [SCI Only] Create copy of SCI Workbook from template<br>6. [SCI Only] Save SCI Workbook in BOTH locations<br>7. Create Intake Slides from template<br>8. Save Intake Slides in 01_Intake subfolder | • SCI Workbook must be in Request Folder for team access<br>• Update SCI Workbook monthly minimum<br>• Partner with System Leader to document Intake Questions<br>• Keep all documentation organized by subfolder | 1-2 days | Requesting Clinical Informaticist |
| 1c | Internal Review & Approval | Complete market/region/system internal review | 1. Go to SPW > ALL - EHR System > Intake Filter<br>2. Click three dots > View > EHR to display Task Details<br>3. System Informatics Leader reviews Draft Request<br>4. If additional information needed: provide requested information<br>5. Update Status to 'Approved' when ready to move forward<br>6. Add notes in Feedback Comments | • Click star icon to add SPW to Favorites<br>• Status begins as 'New'<br>• When Status = 'Approved': Intake closes automatically, Vetting opens with Status: New<br>• If 'Further Review Needed' from later phase: returns to Intake | 1-3 days | Requesting Clinical Informaticist + System Informatics Leader |

### **PHASE 2: VETTING & PRIORITIZATION**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 2a | PeriSCOPE Meeting | CM PgM presents request for initial review | 1. Go to SPW > ALL - EHR System > Vetting Filter<br>2. [CM PgM] Review all Vetting documentation<br>3. [CM PgM] Update Status to 'Ready for Agenda' once on PeriSCOPE agenda<br>4. [CM PgM] Present request at PeriSCOPE<br>5. [CM PgM] Document PeriSCOPE decision<br>6. [CM PgM] If CLS review required: Set 'Clinical Sponsorship Required' = Yes (automatically creates Define Task)<br>7. [CM PgM] Update Status: 'Ready for Prioritization', 'Further Review Needed', or 'Dismissed' | • Requesting CI attendance optional but available for questions<br>• If 'Further Review Needed': gather info, update Intake Slides, work with System Leader<br>• When Status = 'Ready for Prioritization': Vetting closes, opens Prioritization Task (always) and Define Task (if Clinical Sponsorship = Yes) | 1-2 weeks | CM PgM (with Requesting CI support) |
| 2b | Effort Scoring | System Informaticists and IT estimate effort | 1. Go to SPW > ALL - EHR System > Prioritization Filter<br>2. Participate in Effort Scoring meeting<br>3. Requesting CI: Complete CI effort scoring section<br>4. [IT] Complete IT effort scoring section<br>5. Coordinate to ensure BOTH sections complete<br>6. Update Status to 'Ready for Agenda' after BOTH complete<br>7. [CM PgM] Add to SCOPE agenda<br>8. Wait for SCOPE decision | • Status begins as 'New'<br>• Do NOT update Status until both CI and IT sections done<br>• Effort estimates help SCOPE prioritize | 1 week | Requesting Clinical Informaticist + IT |
| 2c | SCOPE Meeting | SCOPE assigns priority and decides next steps | 1. [CM PgM] Present request at SCOPE<br>2. [CM PgM] Document ranked priority (1-10 scale)<br>3. [CM PgM] Document additional notes/requirements<br>4. [CM PgM] Update Status: 'Ready for Design', 'Needs Define', 'Further Review Needed', 'Denied', or 'Dismissed'<br>5. Requesting CI: Review ranked priority | • CM PgM presents - Requesting CI typically does not present<br>• SCOPE determines: priority ranking, proceed to Design, need Define, dismiss/deny<br>• When Status = 'Ready for Design': Prioritization closes, opens Define (if needed) and Design Intake (always)<br>• If Status = 'Needs Define': CM PgM creates Define task | 1 week | CM PgM |

### **PHASE 3: DEFINE**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 3 | Secure Clinical Service Line Approval | Present to CLS and obtain approval for clinical practice changes | 1. Go to SPW > ALL - EHR System > Define Filter<br>2. [CM PgM] Enter Primary Define Body (which CLS will review)<br>3. Requesting CI: Work with CLS representative to secure agenda time<br>4. Requesting CI: Update Status to 'In Progress' while securing agenda<br>5. Requesting CI: Enter Primary Define Agenda Date once secured<br>6. Requesting CI: Update Status to 'Ready for Agenda'<br>7. Requesting CI: Present to CLS meeting<br>8. Requesting CI: Enter Primary Define Approval Date after approval<br>9. If multiple CLS approvals required: Repeat for each<br>10. Requesting CI: Update Status to 'Approved' after FINAL approval | • Define only created if 'Clinical Sponsorship Required' = Yes OR SCOPE selects 'Needs Define'<br>• CLS attendees vary: physicians, APPs, nurse leaders, pharmacists<br>• Present clinical practice change, not technical design<br>• Status options: In Progress, Ready for Agenda, Approved, Further Review Needed, Dismissed<br>• When Status = 'Approved': Define closes, automatically opens Design Task | 2-4 weeks | Requesting Clinical Informaticist |

### **PHASE 4A: DESIGN - CERNER**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 4a | Indicate Design Status | Answer whether design is complete or sessions needed | 1. Go to SPW > ALL - EHR System > Design Filter<br>2. Click three dots > View > EHR if needed<br>3. Answer 'Is design already complete?': Select 'Design is Complete' OR 'Design Session Needed'<br>4. Update Status to 'Ready for Agenda' | • Design created automatically when Prioritization = Ready for Design OR Define = Approved<br>• Status begins as 'New'<br>• Design Review Call happens twice: participant gathering, design approval | Same day | Requesting Clinical Informaticist |
| 4b | Gather Participants | First Design Review Call to add design participants | 1. [CM PgM] Review Intake Slide at first Design Review Call<br>2. [CM PgM] Identify need for participants<br>3. [CM PgM] Update Status to 'Resources Needed' (opens 2-week window)<br>4. Regional CIs: Add yourself as Design Participant during 2-week window<br>5. [IT] Add Application Group and Assignee during 2-week window<br>6. Requesting CI: Add additional regional participants as needed<br>7. [CM PgM] Track progress and support escalations | • 2-week 'Resources Needed' window for adding participants<br>• After window closes, proceed to scheduling<br>• Regions have 2 weeks to add participants | 2 weeks | CM PgM + Regional CIs + IT |
| 4c | Design Sessions | Conduct Cerner design sessions | 1. Requesting CI: Wait for 2-week window to close<br>2. Requesting CI: Schedule design sessions (avoid Tue/Wed, min 2 weeks notice)<br>3. Requesting CI: Update Status to 'In Design'<br>4. Requesting CI: Lead design discussion in all sessions<br>5. [IT] Participate, provide technical guidance, complete technical documentation<br>6. Requesting CI: Document design decisions | • Avoid Tuesday/Wednesday (governance meeting days)<br>• Minimum 2 weeks notice for scheduling<br>• Requesting CI schedules and facilitates for Cerner<br>• Participants: Requesting CI (leads), Regional participants, IT, SMEs | 2-4 weeks | Requesting Clinical Informaticist + IT + Participants |
| 4d | Complete Design Documentation | Complete all design documentation after sessions | 1. Requesting CI: Complete Design Document Link (Cerner design/build docs in Google Drive)<br>2. Requesting CI: Select Affected Applications<br>3. Requesting CI: Select Release Type<br>4. Requesting CI: Select Cerner Target Domain (PRD domain(s))<br>5. Requesting CI: Identify and enter Cerner Validators (people who will test)<br>6. Requesting CI: Enter Finalized Design Summary<br>7. Requesting CI: Update Status to 'Ready for Agenda'<br>8. Requesting CI: Select 'Design is Complete' | • Validators identified based on who needs to test the build<br>• All documentation stored in Google Drive DMND####### folder<br>• Once complete, ready for design approval | 1 week | Requesting Clinical Informaticist |
| 4e | Design Approval | Present completed design for approval at second Design Review Call | 1. Requesting CI: Present design for approval at second Design Review Call<br>2. [CM PgM] Facilitate approval discussion<br>3. Regions: Provide Design Feedback (2 weeks)<br>4. [CM PgM] If provider impact: coordinate additional approvals<br>5. [CM PgM] Document all approvals<br>6. [CM PgM] Update Status to 'Complete' | • Design Review Call attendees approve<br>• If provider impact: additional approvals needed<br>• Regions have 2 weeks for feedback<br>• When Status = 'Complete': Design closes, Demand complete, FETR (Feature) automatically opens with Phase: Develop | 2 weeks | CM PgM + Requesting CI + Regional CIs |

### **PHASE 4B: DESIGN - EPIC**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 5a | Indicate Design Status | Answer whether design is complete and create Epic Optimization Form | 1. Go to SPW > ALL - EHR System > Design Filter<br>2. Answer 'Is design already complete?': Select 'Design is Complete' OR 'Design Session Needed'<br>3. If 'Design Session Needed': Create Epic Optimization Form from template, save in Google Drive DMND folder<br>4. Update Status to 'Ready for Agenda' | • Design created automatically when Prioritization = Ready for Design OR Define = Approved<br>• Status begins as 'New'<br>• Epic Optimization Form template available<br>• Refinement is Epic's initial design review (Backlog Grooming) | Same day | Requesting Clinical Informaticist |
| 5b | Refinement Meeting | Present request at Refinement for initial design review | 1. Requesting CI: Present at Refinement using Intake Slide and Epic Optimization Form<br>2. Epic Process Owners and Requesting CI: Review slides, identify participants, determine if sessions needed<br>3. Epic Process Owners: Update Design Participants as Approvers and Session Attendees<br>4. Requesting CI: Add Regional Participants if needed post-Refinement | • Refinement attendees: Epic Process Owners, Requesting CI, IT<br>• Also called 'Backlog Grooming'<br>• Requesting CI presents and answers questions | 1 week | Requesting Clinical Informaticist + Epic Process Owners |
| 5c | IT Assigns Resources | IT assigns resources and schedules design sessions | 1. Requesting CI: Update Status to 'Resources Needed' (triggers IT resource assignment)<br>2. [IT] Assign resources: Application Groups and Assignees<br>3. [IT] IT Process Owner updates Status to 'Assigned'<br>4. [IT] Schedule design sessions (Multi-team: Process Owner schedules initial, hands to Engineer; Single app: Engineer schedules)<br>5. [IT] Coordinate with Requesting CI on scheduling<br>6. [IT] IT Process Owner updates Status to 'In Design' | • When Status = Resources Needed: IT assigns resources<br>• IT schedules Epic design sessions (different from Cerner)<br>• Multi-team vs single application determines who schedules | 1-2 weeks | IT Process Owner + IT Analyst |
| 5d | Design Sessions | Conduct Epic design sessions | 1. Requesting CI: Lead design discussion in all sessions<br>2. Participants: Requesting CI (leads), Design Participants, IT, SMEs<br>3. [IT] Participate, provide technical guidance, complete technical documentation<br>4. Requesting CI: Document design decisions in Design Feedback: Regional/System/SME input, Finalized Design Summary, Design Documentation Link, Epic Validators | • Requesting CI leads design discussion<br>• IT participates and provides technical guidance | 2-4 weeks | Requesting Clinical Informaticist + IT + Participants |
| 5e | Complete Design Documentation | Complete all Epic design documentation | 1. Requesting CI: Ensure Epic Optimization Form complete in Google Drive<br>2. Requesting CI: Complete Design Document Link<br>3. Requesting CI: Select Affected Applications<br>4. Requesting CI: Identify and enter Epic Validators (per market or application area)<br>5. Requesting CI: Enter Finalized Design Summary<br>6. Requesting CI and IT: Both update Status to 'Complete' | • BOTH Requesting CI and IT must update Status<br>• Validators identified based on who validates functionality<br>• All documentation stored in Google Drive DMND####### folder<br>• When Status = 'Complete': Design closes, Demand complete, FETR automatically opens with Phase: Develop | 1 week | Requesting Clinical Informaticist + IT |

### **PHASE 5: DEVELOP**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 6a | IT Builds in Non-Prod | IT builds EHR changes in non-production environment | 1. Feature automatically created when Design Status = Complete<br>2. Feature opens with Phase: Develop, Status: Assigned<br>3. Click three dots > View > 'Release'<br>4. [IT] IT Analyst reviews approved design documentation<br>5. [IT] IT Analyst completes build in non-production<br>6. [IT] IT Analyst updates Status 'Assigned' to 'Building'<br>7. [IT] IT Analyst updates 'Ready for Build Date'<br>8. [IT] IT Analyst updates Estimated Size and Planned Delivery Date<br>9. Requesting CI: Monitor build progress, coordinate on questions, be available for clarifications | • FETR = Feature ticket where IT builds actual EHR changes<br>• Timeline estimate cannot be provided until Non-Prod build starts<br>• Status progression: Assigned → Building → Testing → Validated Successfully Non Prod<br>• IT Analyst is the builder | 2-4 weeks | IT Analyst + Requesting CI |
| 6b | Validators Test in Non-Prod | Validators test build in non-production environment | 1. [IT] IT Analyst updates Status to 'Testing' when ready<br>2. [IT] IT Analyst emails validators<br>3. Validators: Receive email, complete testing in Non-Prod<br>4. Validators: Add comments to Work Notes indicating success<br>5. [IT] IT Analyst supports validators with questions<br>6. [IT] IT Analyst reviews validation documentation<br>7. [IT] IT Analyst addresses any issues found<br>8. Final Validator: After all domains/markets validated, update Status to 'Validated Successfully Non Prod' | • Validators identified during Design phase<br>• Final validator = last person to complete validation for all domains/markets<br>• Cerner: typically one validator per domain (ECISA/P0687, CAREB/P1284)<br>• Epic: typically validators per market or application area | 1-2 weeks | Validators + IT Analyst |
| 6c | Create Education/Change Communication | Create education materials for end users | **CERNER:**<br>1. Requesting CI: Create Change Communication document<br>2. Requesting CI: Attach in Google Drive<br>3. Requesting CI: Update 'Change Communication Phase' to 'In Development' when starting<br>4. Requesting CI: Update 'Change Communication Phase' to 'Attached' when complete<br>5. If none needed: Update 'Communication review' to 'None Needed'<br><br>**EPIC:**<br>1. Requesting CI: Work with IT Instructional Designers to create tip sheets<br>2. Requesting CI: Ensure materials accurate and complete | • Cerner: Change Communication document by Requesting CI<br>• Epic: Tip sheets by IT Instructional Designers<br>• Education addresses only EHR changes, not practice changes | 1 week | Requesting Clinical Informaticist + IT Instructional Designers |
| 6d | Ready for Release Planning | Coordinate production deployment timing | 1. Requesting CI: Coordinate with IT on production deployment timing<br>2. Requesting CI: Ensure education materials ready<br>3. **EPIC ONLY:** [IT] Add RTasks for change approvals based on EMG and INIs<br>4. **EPIC ONLY:** [IT] Update Status to 'Pending Approval' during approval process<br>5. **EPIC ONLY:** After approvals complete, proceed<br>6. Requesting CI: Update Status to 'Ready for Release Planning' once Validated Successfully Non Prod complete AND Education/Change Communication complete<br>7. Requesting CI: Update 'Ready for Deployment Date' | • When Status = 'Ready for Release Planning': Develop closes, Deploy opens with Status: Release Planning<br>• Epic requires change approvals (RTasks), Cerner does not<br>• Status 'Pending Approval' is Epic-specific | 3-5 days | Requesting Clinical Informaticist + IT |

### **PHASE 6: DEPLOY**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 7a | Release Planning | IT reviews request and assigns production release date | 1. Deploy Phase opens with Status: 'Release Planning'<br>2. [IT] IT Process Owner reviews request for production readiness<br>3. [IT] IT Process Owner assigns release date based on schedule<br>4. [IT] IT Process Owner updates Status to 'Assigned Release'<br>5. Requesting CI: Note assigned release date<br>6. Requesting CI: Prepare for go-live support | • Timeline is estimate until Non-Prod testing complete<br>• Release date assigned after non-prod validation successful<br>• Status progression: Release Planning → Assigned Release → Building in Prod → Prod Validation → Validated Successfully Prod | 1 week | IT Process Owner |
| 7b | IT Builds in Production | IT deploys build to production environment | 1. [IT] IT Analyst deploys build to production on assigned release day<br>2. [IT] IT Analyst updates Status to 'Building in Prod' on release day<br>3. [IT] IT Analyst completes production deployment<br>4. [IT] IT Analyst updates Status to 'Prod Validation'<br>5. [IT] IT Analyst emails validators to start production testing | • Production build happens on assigned release date<br>• Status 'Building in Prod' indicates deployment in progress<br>• Once Status = 'Prod Validation', validators receive email | Same day | IT Analyst |
| 7c | Validators Test in Production | Validators test build in production environment | 1. Validators: Receive email when Status = 'Prod Validation'<br>2. Validators: Complete testing in Production environment<br>3. Validators: Add comments to Work Notes indicating success<br>4. [IT] IT Analyst supports validators with questions<br>5. [IT] IT Analyst reviews validation documentation<br>6. [IT] IT Analyst addresses any issues found<br>7. Final Validator: After all domains/markets validated in production, update Status to 'Validated Successfully Prod' | • Production validation confirms enhancement works in live environment<br>• Final validator = last person to complete validation in production<br>• When Status = 'Validated Successfully Prod': EHR enhancement is live and complete!<br>• Production issues: log incident ticket through normal IT support (separate from governance) | 3-5 days | Validators + IT Analyst |

### **PHASE 7: CLOSE-OUT**

| Step ID | Task Name | Description | Detailed Steps | Key Notes & Requirements | Timeline | Responsible Party |
|---------|-----------|-------------|----------------|-------------------------|----------|-------------------|
| 8a | End-User Communication & Go-Live Support | Communicate changes and provide go-live support | 1. Requesting CI: Create and distribute end-user communication about: What changed, When live, How impacts workflow, Who to contact<br>2. Requesting CI: Communicate with: Clinical/Operational leaders, Regional CI leaders, IT Leaders, Peers, End users, System policy team (system-policysupport@commonspirit.org) if policy-related<br>3. Requesting CI: Coordinate go-live support: at-the-elbow support, super users, help desk briefing<br>4. Requesting CI: Be available on go-live day<br>5. Requesting CI: Work with regional teams for coverage<br>6. Requesting CI: Ensure escalation paths clear<br>7. [IT] Monitor production stability<br>8. [IT] Be available for technical issues | • Communication timing: Before go-live (confirm changes coming), At go-live (confirm live), Post go-live (gather feedback, address issues)<br>• Use Quarterly Informatics Insider Webinar for system-wide announcements<br>• Use Communication Templates as guides | 1-2 days | Requesting Clinical Informaticist + IT |
| 8b | Post-Deployment Monitoring | Monitor for issues after deployment | 1. Requesting CI: Monitor for issues post-deployment<br>2. Requesting CI: Track user questions and feedback<br>3. Requesting CI: Identify unexpected behaviors<br>4. Requesting CI: Document issues and resolutions<br>5. Requesting CI: Coordinate with IT on technical problems<br>6. [IT] Monitor production stability<br>7. [IT] Track system performance<br>8. [IT] Support post-deployment issues<br>9. [IT] Document technical issues and resolutions<br>10. Both: Escalate critical issues | • Monitor closely: First 24-48 hours (intensive), First 1-2 weeks (active monitoring), First month (periodic check-ins)<br>• Technical issues: IT supports<br>• Workflow/training issues: Requesting CI and regional informatics support | 1-4 weeks | Requesting Clinical Informaticist + IT |
| 8c | Close-Out Documentation | Complete final documentation and lessons learned | 1. Requesting CI: Complete close-out documentation in Feature/Demand<br>2. Requesting CI: Update final metrics (actual vs. expected outcomes)<br>3. Requesting CI: Document lessons learned: What went well, What could be improved, Unexpected challenges and resolutions, Recommendations for future, Actual vs. estimated timeline<br>4. Requesting CI: Update SCI Workbook with final status<br>5. Requesting CI: Archive all documentation in Google Drive subfolders (01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout)<br>6. [IT] Complete technical close-out documentation<br>7. [IT] Document final build specifications<br>8. [IT] Archive technical documentation<br>9. [IT] Update technical knowledge bases | • Close-out documentation provides historical record and learning<br>• Lessons learned help improve future governance processes<br>• Final metrics track implementation success | 1 week | Requesting Clinical Informaticist + IT |
| 8d | Close the Request | Finalize and close the request | 1. Requesting CI: Confirm all activities complete: Production validation complete, End-user communication distributed, Go-live support complete, Post-deployment monitoring complete, All issues resolved or escalated, Close-out documentation complete, Final metrics and lessons learned documented<br>2. Requesting CI: Update request status to indicate all activities complete<br>3. Requesting CI: Close Feature/Demand in SPW<br>4. Enhancement is fully implemented and governance process complete! | • Feature/Demand remains in system for historical tracking<br>• Request can only be closed when ALL activities complete<br>• Celebrate successful implementation! | Same day | Requesting Clinical Informaticist |

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
