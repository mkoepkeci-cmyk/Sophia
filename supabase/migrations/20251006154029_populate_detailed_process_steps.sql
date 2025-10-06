/*
  # Populate Detailed Process Steps

  1. Purpose
    - Insert 27 comprehensive process steps for EHR Governance workflow
    - Replaces previous 7 high-level steps with detailed, actionable steps
    - Covers all phases: Intake, Vetting, Prioritization, Define, Design (Cerner/Epic), Develop, Deploy, Close-Out

  2. Changes
    - Inserts detailed step-by-step instructions
    - Includes specific role responsibilities [CM PgM], [IT], [Requesting CI]
    - Adds key notes, requirements, and timelines
    - Separates Cerner and Epic design workflows
*/

INSERT INTO process_steps (process_id, step_number, title, description, required_actions, tips, estimated_duration) VALUES
-- PHASE 1: INTAKE
('345c95c4-e364-4f71-89ea-676dc8f04c53', 1, 'Intake Task - Submit Request', 
'Create and submit the initial optimization request. Work with System Leader to gather all necessary information before submitting.',
ARRAY[
  'Go to EmployeeCentral > Technology > Electronic Health Record > EHR Change > Optimization Request',
  'Complete all required fields: Service Line (Clinical), EHR system (Cerner/Epic/System/System with Meditech), Requesting Region, Governance Type (Full Governance or Governance Templated), Short Description (becomes title), Primary User Affected, Primary Clinical Informaticist, Care Setting (Acute/Ambulatory/Both), Impacted Solutions, Intake Slide link, Google Drive link, Benefit Score',
  'Click Submit (NOT ''Save as Draft'')',
  'System automatically creates Parent Demand with DMND number and Intake Task with Status: New'
],
ARRAY[
  'Only Informaticist, LIS, Rev Cycle Resource, or Governance Liaison can submit',
  'Selecting ''System'' or ''System with Meditech'' creates additional Design Tasks for each EHR',
  'Keep DMND number - you will need it to track your request',
  'Governance Templated skips Vetting and Prioritization (used for CSH Triage Guidelines items, EPSR list items, or approved exceptions)'
],
'Same day'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 2, 'Intake Task - Set Up Project Workspace',
'Create folders and documentation to organize your request materials.',
ARRAY[
  'Create folder in Request Folder Shared Drive with title (e.g., ''System Valuables Policy Update'')',
  'Create 5 subfolders in Request Folder: 01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout',
  '[SCI/System CI Only] Create folder in System Clinical Informatics > System Policies/Initiatives with title and date (e.g., ''System Valuables Policy Update March 2023'')',
  'After receiving DMND number, rename BOTH folders to ''DMND####### Title'' (e.g., ''DMND0000123 System Valuables Policy Update'')',
  '[SCI/System CI Only] Create copy of SCI Workbook from template',
  '[SCI/System CI Only] Save SCI Workbook in BOTH locations: System CI folder AND Request Folder Shared Drive',
  'Create Intake Slides from template showing: request overview, clinical need/problem, proposed solution, benefit score, impact assessment, timeline estimate',
  'Save Intake Slides in 01_Intake subfolder'
],
ARRAY[
  'SCI Workbook must be in Request Folder so all team members can access it',
  'Update SCI Workbook monthly minimum',
  '[SCI/System CI Only] Partner with System Leader to document Intake Questions in SCI Workbook',
  'Keep all documentation organized by subfolder'
],
'1-2 days'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 3, 'Intake Task - Internal Review & Approval',
'Complete market/region/system internal review before moving to Vetting.',
ARRAY[
  'Go to SPW > ALL - EHR System > Intake Filter',
  'Click three dots to left of Demand Task > scroll down > select ''EHR'' under View to display EHR Task Details',
  'System Informatics Leader reviews Draft Request for completeness and business alignment',
  'If additional information needed: Leader contacts you, you update Intake Slides if needed, provide requested information',
  'Update Status to ''Approved'' when internal market/region/system team is ready to move forward',
  'Add notes in Feedback Comments to track internal approval discussions'
],
ARRAY[
  'Click the star icon on Strategic Planning Workspace to add to Favorites for quick access',
  'Status begins as ''New''',
  'When Status changes to ''Approved'': Intake Task automatically closes (Complete) and Vetting Task opens with Status: New',
  'If ''Further Review Needed'' from later phase: Always moves ticket back to Intake for review'
],
'1-3 days'),

-- PHASE 2: VETTING & PRIORITIZATION
('345c95c4-e364-4f71-89ea-676dc8f04c53', 4, 'Vetting - PeriSCOPE Meeting',
'CM PgM presents request at PeriSCOPE for initial review to determine if it moves to prioritization.',
ARRAY[
  'Go to SPW > ALL - EHR System > Vetting Filter',
  '[CM PgM Only] Review all attached required Vetting documentation',
  '[CM PgM Only] Update Status to ''Ready for Agenda'' once placed on PeriSCOPE agenda',
  'Requesting CI: Be available to answer questions (attendance optional)',
  '[CM PgM Only] Present request at PeriSCOPE using Intake documentation',
  '[CM PgM Only] Document PeriSCOPE decision in task notes',
  '[CM PgM Only] If Clinical Service Line review required: Set ''Clinical Sponsorship Required'' = Yes (automatically creates Define Task)',
  '[CM PgM Only] Update Status based on PeriSCOPE decision: ''Ready for Prioritization'' (moves forward), ''Further Review Needed'' (back to Requesting CI), or ''Dismissed'' (rejected and closed)'
],
ARRAY[
  'Vetting task is visible to all informatics team members in Workspace',
  'If ''Further Review Needed'': Review feedback in task notes, gather additional information, update Intake Slides if needed, work with System Leader, update Status back to ''Approved'' when ready',
  'When Status = ''Ready for Prioritization'': Vetting Task closes and automatically opens Prioritization Task (always) and Define Task (if Clinical Sponsorship Required = Yes)'
],
'1-2 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 5, 'Prioritization - Effort Scoring',
'System Informaticists and IT estimate the effort required for the request.',
ARRAY[
  'Go to SPW > ALL - EHR System > Prioritization Filter',
  'Participate in Effort Scoring meeting with System Informaticists and IT',
  'Requesting CI: Complete CI effort scoring section',
  '[IT Only] Complete IT effort scoring section',
  'Coordinate with IT to ensure BOTH sections are complete',
  'Update Status to ''Ready for Agenda'' only after BOTH CI and IT complete their scoring',
  '[CM PgM Only] Add request to SCOPE agenda when Status = ''Ready for Agenda''',
  'Wait for SCOPE meeting decision'
],
ARRAY[
  'Status begins as ''New''',
  'Do not update Status until both CI and IT sections are done',
  'Effort estimates help SCOPE prioritize requests'
],
'1 week'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 6, 'Prioritization - SCOPE Meeting',
'SCOPE assigns priority ranking and decides whether request moves to Design.',
ARRAY[
  '[CM PgM Only] Present request at SCOPE meeting',
  '[CM PgM Only] Document ranked priority (1-10 scale) in task',
  '[CM PgM Only] Document any additional notes or requirements',
  '[CM PgM Only] Update Status based on SCOPE decision: ''Ready for Design'' (approved, moves forward), ''Needs Define'' (requires CLS review), ''Further Review Needed'' (needs more info), ''Denied'' (closed), or ''Dismissed'' (closed)',
  'Requesting CI: Review ranked priority assigned by SCOPE'
],
ARRAY[
  'CM PgM presents - Requesting CI typically does not present at SCOPE',
  'SCOPE determines: priority ranking, whether to proceed to Design, whether Define is needed, whether to dismiss/deny',
  'When Status = ''Ready for Design'': Prioritization closes and automatically opens Define Task (if needed and not already created) and Design Intake Task (always)',
  'If Status = ''Needs Define'': CM PgM creates Define task (if not already done after PeriSCOPE)'
],
'1 week'),

-- PHASE 3: DEFINE
('345c95c4-e364-4f71-89ea-676dc8f04c53', 7, 'Define - Secure Clinical Service Line Approval',
'Work with Clinical Service Line to present request and obtain approval for clinical practice changes.',
ARRAY[
  'Go to SPW > ALL - EHR System > Define Filter',
  '[CM PgM Only] Enter Primary Define Body (which Clinical Service Line will review: e.g., Critical Care, Cardiovascular, etc.)',
  'Requesting CI: Work with CLS group representative to secure agenda time',
  'Requesting CI: Update Status to ''In Progress'' while working to secure agenda time',
  'Requesting CI: Enter Primary Define Agenda Date once date is secured',
  'Requesting CI: Update Status to ''Ready for Agenda'' once date is secured',
  'Requesting CI: Present request to Clinical Service Line meeting (Present clinical practice change and workflow, not EHR technical design)',
  'Requesting CI: Enter Primary Define Approval Date after CLS approves',
  'If multiple CLS approvals required: Repeat steps for each required CLS group',
  'Requesting CI: Update Status to ''Approved'' ONLY after FINAL approval from all required Clinical Service Lines'
],
ARRAY[
  'Define only created if ''Clinical Sponsorship Required'' = Yes (during Vetting) OR SCOPE selects ''Needs Define'' (during Prioritization)',
  'CLS attendees vary by service line: physicians, advanced practice providers, nurse leaders, pharmacists, etc.',
  '[CM PgM Only] Tracks Define progress and coordinates if multiple CLS approvals needed',
  'Status options: ''In Progress'' (securing agenda time), ''Ready for Agenda'' (date secured), ''Approved'' (CLS supports - moves to Design), ''Further Review Needed'' (reopens Intake), ''Dismissed'' (CLS does not support - labeled as ''CLS denied enhancement'' - Demand Closed)',
  'When Status = ''Approved'': Define closes and automatically opens Design Task'
],
'2-4 weeks');

-- Continue with remaining steps in next query due to length
