/*
  # Update to EHR Clinical Enhancement Request Governance Process

  ## Overview
  This migration replaces the sample vendor approval process with the CommonSpirit Health
  Clinical EHR Enhancement Request process specifically for System Clinical Informaticists (SCI).
  
  ## Changes
  1. Remove existing sample process and steps
  2. Add EHR Clinical Enhancement Request process
  3. Add detailed steps for SCI/MI owned governance workflow including:
     - Intake Task (Draft and Active states)
     - Vetting and Prioritization
     - Define
     - Design (Cerner, Epic, Meditech paths)
     - Develop (Non-Prod Testing)
     - Deploy (Prod Testing)
  
  ## Security
  No security changes - existing RLS policies remain in place
*/

-- Remove existing sample data
DELETE FROM process_steps WHERE process_id IN (SELECT id FROM governance_processes WHERE name = 'Vendor Approval Process');
DELETE FROM governance_processes WHERE name = 'Vendor Approval Process';

-- Insert EHR Clinical Enhancement Request process
INSERT INTO governance_processes (name, description, is_active)
VALUES (
  'Clinical EHR Enhancement Request (SCI/MI Owned)',
  'Complete governance process for System Clinical Informaticists navigating EHR optimization requests through CommonSpirit Health''s Strategic Planning Workspace.',
  true
);

-- Get the process ID for inserting steps
DO $$
DECLARE
  process_uuid uuid;
BEGIN
  SELECT id INTO process_uuid FROM governance_processes WHERE name = 'Clinical EHR Enhancement Request (SCI/MI Owned)' LIMIT 1;
  
  IF process_uuid IS NOT NULL THEN
    INSERT INTO process_steps (process_id, step_number, title, description, required_actions, tips, estimated_duration)
    VALUES
      (
        process_uuid,
        1,
        'Intake Task - Draft State',
        'Create and submit the initial optimization request in draft state. Work with System Leader to gather all necessary information before submitting.',
        ARRAY[
          'Create an Optimization Folder in Request Folder Shared Drive',
          'Create folder in System Clinical Informatics > System Policies/Initiatives',
          'Create copy of SCI Workbook and place in folder',
          'Work with System Leader to document Intake Questions in SCI Workbook',
          'Create Intake Slides from template',
          'Create request using Draft State Intake Form in SPM (use Submit, not Save as Draft)',
          'Update Google Drive folder name to DMND####### Title format',
          'Complete all required fields: Impacted Region, Required by Date, Governance Type, Short Description, Primary CI/Rev Cycle Ops Contact, Care Setting, Impacted Solutions, Intake Slide link, Google Drive link, Benefit Score'
        ],
        ARRAY[
          'Do NOT click "Save as Draft" - always use Submit',
          'System Informatics Leader will review and may request additional information',
          'Leader will move Draft to Intake when ready for Vetting',
          'Use CI/MI Guide to Draft Intake questions for field directions'
        ],
        '1-2 days'
      ),
      (
        process_uuid,
        2,
        'Vetting and Prioritization',
        'Request is reviewed during PeriSCOPE meeting for initial vetting, then moves to SCOPE for prioritization and effort scoring.',
        ARRAY[
          'Go to SPW > ALL - EHR System > Vetting Filter to track',
          'Change Management Program Manager (CM PgM) manages Vetting task',
          'Request is placed on PeriSCOPE Agenda',
          'After Vetting approval, move to Prioritization',
          'System Informaticists and IT complete Effort Scoring',
          'Update Status to Ready for Agenda once scoring complete',
          'CM PgM adds request to SCOPE agenda',
          'Ranked priority is added during SCOPE meeting'
        ],
        ARRAY[
          'Vetting statuses: New, Ready for Agenda, Ready for Prioritization, Further Review Needed, Dismissed',
          'Clinical Sponsorship may be required - this creates a Define Task',
          'Prioritization statuses: Ready for Design (moves forward), Further Review Needed, Dismissed, Needs Define',
          'Typically takes 1-2 weeks through Vetting and Prioritization'
        ],
        '1-2 weeks'
      ),
      (
        process_uuid,
        3,
        'Define (if Clinical Sponsorship Required)',
        'Work with Clinical Service Line to secure agenda time and obtain approval. This step only occurs if requested during Vetting or Prioritization.',
        ARRAY[
          'CM PgM enters Primary Define Body in EHR Task Details',
          'Primary Informaticist works with Clinical Service Line to secure Agenda Date',
          'Add Primary Define Agenda date to Define task',
          'Select appropriate Status: In Progress, Further Review Needed, Dismissed, or Approved',
          'Enter Primary Define Approval Date once approved',
          'Change Status to Approved to move to Design task'
        ],
        ARRAY[
          'Only proceed to Approved after FINAL Define group approval',
          'Further Review Needed reopens Intake task',
          'Dismissed closes the request',
          'Approval allows movement to Design phase'
        ],
        '2-4 weeks'
      ),
      (
        process_uuid,
        4,
        'Design - Cerner',
        'Complete design documentation and sessions for Cerner EHR systems. Design may be pre-completed or require sessions.',
        ARRAY[
          'Go to SPW > ALL - EHR System > Design Filter',
          'If design is complete: Confirm Design Document link, select Affected Applications, Release Type, Cerner Target Domain, Cerner Validators, enter Finalized Design Summary',
          'If design sessions needed: Complete Affected Applications, update Status to Ready for Agenda for participant selection',
          'Add Design Participants (regions have 2 weeks)',
          'Schedule and conduct design sessions',
          'Update Status to In Design during sessions',
          'After completion: Update all design fields and set Status to Ready for Agenda with Design is Complete',
          'Present to Design Review Call for approval',
          'Regions have 2 weeks for Design Feedback'
        ],
        ARRAY[
          'CM PgM manages agenda additions',
          'Avoid Tuesday/Wednesday for sessions, schedule 2+ weeks out',
          'Provider impact requires additional approval from provider groups',
          'Status Complete creates Feature ticket'
        ],
        '3-6 weeks'
      ),
      (
        process_uuid,
        5,
        'Design - Epic',
        'Complete design documentation and sessions for Epic EHR systems using the Epic Optimization Form.',
        ARRAY[
          'Create Epic Opt Form from template if design sessions needed',
          'If design complete: Enter Status Ready for Agenda, select Design is Complete',
          'If design sessions needed: Select Design Session Needed, update Status to Ready for Agenda',
          'Epic Process Owners add to Epic Refinement Call',
          'Update Design Participants as Approvers and Design Session Attendees',
          'Primary Informaticist adds Regional Participants if needed',
          'Application Groups and Assignees updated during Bundle Planning',
          'Lead design discussion and document in Design Feedback: Regional/System/SME input, Finalized Design Summary, Design Documentation Link, Epic Validators',
          'Change Status to Complete when design is done'
        ],
        ARRAY[
          'Multi-team: Process Owner schedules initial session, hands to Primary Applications Engineer',
          'Single application: Engineer schedules sessions',
          'Primary CI/Rev Cycle leads design discussions',
          'All documentation goes in DMND folder'
        ],
        '3-6 weeks'
      ),
      (
        process_uuid,
        6,
        'Develop - Non-Prod Testing',
        'IT builds the enhancement and Primary Informaticist/Validators test in non-production environment.',
        ARRAY[
          'IT updates Status to Building when build starts',
          'Ready for Build Date set to current date',
          'IT updates Estimated Size and Planned Delivery Date',
          'When ready for validation, Status updated to Testing',
          'Validators receive email notification',
          'Complete testing and document results in Work Notes',
          'Last validator updates Status to Validated Successfully Non Prod',
          'For Cerner: Create Change Communication document, update Change Communication Phase to In Development, then Attached when complete'
        ],
        ARRAY[
          'Feature begins in Phase Develop with Status Assigned',
          'Work in O&M Optimization section (Cerner) or O&M section (Epic)',
          'If no Change Communication needed, update to None Needed',
          'Epic requires RTask approvals - Status goes to Pending Approval then Ready for Release Planning'
        ],
        '2-4 weeks'
      ),
      (
        process_uuid,
        7,
        'Deploy - Prod Testing',
        'Validate the enhancement in production environment after release.',
        ARRAY[
          'Deploy Phase begins with Release Planning status',
          'Status updated to Release Assigned once date assigned',
          'On release day, Status updated to Building (Cerner) or Building in Prod (Epic)',
          'When ready for validation, Status updated to Testing (Cerner) or Prod Validation (Epic)',
          'Validators receive email notification',
          'Complete prod testing and add comments to Work Notes',
          'Last validator updates Status to Validated Successfully Prod',
          'Enhancement is now complete!'
        ],
        ARRAY[
          'Cerner: Update Ready for Deployment date',
          'Epic: Ensure all validators complete testing',
          'Document any issues immediately',
          'Celebrate successful deployment!'
        ],
        '1-2 weeks'
      );
  END IF;
END $$;