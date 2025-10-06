/*
  # Populate Detailed Process Steps - Part 3
  
  Final steps: Develop, Deploy, and Close-Out phases
*/

INSERT INTO process_steps (process_id, step_number, title, description, required_actions, tips, estimated_duration) VALUES
-- PHASE 5: DEVELOP
('345c95c4-e364-4f71-89ea-676dc8f04c53', 18, 'Develop - IT Builds in Non-Prod',
'IT builds the EHR changes in non-production environment.',
ARRAY[
  'Feature automatically created when Design Status = Complete',
  'Feature opens with Phase: Develop and Status: Assigned',
  'Click three dots next to Feature heading > View > ''Release'' (shows info relevant to Informatics)',
  '[IT Only] IT Analyst reviews approved design documentation',
  '[IT Only] IT Analyst completes build in non-production environment',
  '[IT Only] IT Analyst updates Status from ''Assigned'' to ''Building'' when build starts',
  '[IT Only] IT Analyst updates ''Ready for Build Date'' to current date',
  '[IT Only] IT Analyst updates Estimated Size based on approved design and Planned Delivery Date',
  'Requesting CI: Monitor build progress in the Feature (work in O&M Optimization section for Cerner or O&M section for Epic)',
  'Requesting CI: Coordinate with IT on any build questions',
  'Requesting CI: Be available to clarify design decisions'
],
ARRAY[
  'Feature ticket (FETR) is where IT builds the actual EHR changes',
  'Relevant data from Parent Demand transfers to Feature',
  'Timeline estimate cannot be provided until Non-Prod build has started - work with IT for estimates',
  'Status progression: Assigned → Building → Testing → Validated Successfully Non Prod',
  'IT Analyst is the builder'
],
'2-4 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 19, 'Develop - Validators Test in Non-Prod',
'Validators test the build in non-production environment to ensure it works as designed.',
ARRAY[
  '[IT Only] IT Analyst updates Status to ''Testing'' when ready for validation',
  '[IT Only] IT Analyst emails validators when Status = Testing',
  'Validators: Receive email notification when Status = Testing',
  'Validators: Complete testing in Non-Prod environment',
  'Validators: Add comments to Work Notes indicating validation is successful',
  '[IT Only] IT Analyst supports validators with build questions',
  '[IT Only] IT Analyst reviews validation documentation in Work Notes',
  '[IT Only] IT Analyst addresses any issues found during testing',
  'Final Validator: After all domains/markets are validated, update Status to ''Validated Successfully Non Prod'''
],
ARRAY[
  'Validators were identified during Design phase',
  'Final validator = last person to complete validation for all domains/markets',
  '''Validated Successfully Non Prod'' means all testing in non-production environment completed successfully by all validators',
  'Cerner typically has one validator per domain (ECISA/P0687, CAREB/P1284)',
  'Epic typically has validators per market or application area'
],
'1-2 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 20, 'Develop - Create Education/Change Communication',
'Create education materials for end users about the EHR changes.',
ARRAY[
  'CERNER: Requesting CI creates Change Communication document describing EHR changes for end users',
  'CERNER: Requesting CI attaches Change Communication in Google Drive',
  'CERNER: Requesting CI updates ''Change Communication Phase'' to ''In Development'' when starting',
  'CERNER: Requesting CI updates ''Change Communication Phase'' to ''Attached'' when complete',
  'CERNER: If no Change Communication needed, update ''Communication review'' to ''None Needed''',
  'EPIC: Requesting CI works with IT Instructional Designers to create tip sheets for Epic changes (addressing only EHR changes, not practice changes)',
  'EPIC: Requesting CI ensures education materials are accurate and complete'
],
ARRAY[
  'Cerner uses Change Communication document created by Requesting CI',
  'Epic uses tip sheets created by IT Instructional Designers',
  'Education addresses only EHR changes, not practice changes',
  'SCI/DCIs/MCIs/Instructional Designers create education materials'
],
'1 week'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 21, 'Develop - Ready for Release Planning',
'Coordinate with IT on production deployment timing and move to Deploy phase.',
ARRAY[
  'Requesting CI: Coordinate with IT on production deployment timing',
  'Requesting CI: Ensure education materials are ready',
  'EPIC: [IT Only] Add RTasks for change approvals based on EMG and INIs',
  'EPIC: [IT Only] Update Status to ''Pending Approval'' while approvals in process',
  'EPIC: After approvals complete, proceed to next step',
  'Requesting CI: Update Status to ''Ready for Release Planning'' once: Validated Successfully Non Prod = complete AND Education/Change Communication = complete',
  'Requesting CI: Update ''Ready for Deployment Date'' to current date'
],
ARRAY[
  'When Status = ''Ready for Release Planning'': Develop Phase closes, Deploy Phase opens with Status: Release Planning',
  'Epic requires change approvals (RTasks), Cerner does not',
  'Status ''Pending Approval'' is Epic-specific for change approval process'
],
'3-5 days'),

-- PHASE 6: DEPLOY
('345c95c4-e364-4f71-89ea-676dc8f04c53', 22, 'Deploy - Release Planning',
'IT reviews request and assigns production release date.',
ARRAY[
  'Deploy Phase opens with Status: ''Release Planning''',
  '[IT Only] IT Process Owner reviews request for production readiness',
  '[IT Only] IT Process Owner assigns release date based on release schedule',
  '[IT Only] IT Process Owner updates Status to ''Assigned Release'' once release date is assigned',
  'Requesting CI: Note assigned release date',
  'Requesting CI: Prepare for go-live support'
],
ARRAY[
  'Timeline is an estimate until Non-Prod testing is complete',
  'Release date assigned after non-prod validation is successful',
  'Status progression: Release Planning → Assigned Release → Building in Prod → Prod Validation → Validated Successfully Prod'
],
'1 week'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 23, 'Deploy - IT Builds in Production',
'IT deploys the build to production environment on release day.',
ARRAY[
  '[IT Only] IT Analyst deploys build to production on assigned release day',
  '[IT Only] IT Analyst updates Status to ''Building in Prod'' on release day when starting production build',
  '[IT Only] IT Analyst completes production deployment',
  '[IT Only] IT Analyst updates Status to ''Prod Validation'' once build is complete in production',
  '[IT Only] IT Analyst emails validators to start production testing'
],
ARRAY[
  'Production build happens on the assigned release date',
  'Status ''Building in Prod'' indicates deployment is in progress',
  'Once Status = ''Prod Validation'', validators receive email notification'
],
'Same day'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 24, 'Deploy - Validators Test in Production',
'Validators test the build in production environment to confirm it works correctly in live system.',
ARRAY[
  'Validators: Receive email notification when Status = ''Prod Validation''',
  'Validators: Complete testing in Production environment',
  'Validators: Add comments to Work Notes indicating validation is successful',
  '[IT Only] IT Analyst supports validators with any production questions',
  '[IT Only] IT Analyst reviews validation documentation in Work Notes',
  '[IT Only] IT Analyst addresses any issues found during production testing',
  'Final Validator: After all domains/markets are validated in production, update Status to ''Validated Successfully Prod'''
],
ARRAY[
  'Production validation confirms enhancement works correctly in live environment',
  'Final validator = last person to complete validation for all domains/markets in production',
  'When Status = ''Validated Successfully Prod'': EHR enhancement is now live and complete!',
  'If there''s a production issue after go-live, log an incident ticket through normal IT support channels (separate from governance process)'
],
'3-5 days'),

-- PHASE 7: CLOSE-OUT
('345c95c4-e364-4f71-89ea-676dc8f04c53', 25, 'Deploy & Close - End-User Communication & Go-Live Support',
'Communicate changes to end users and provide go-live support.',
ARRAY[
  'Requesting CI: Create and distribute end-user communication about the change: What changed in EHR, When change goes live, How it impacts workflow, Who to contact with questions',
  'Requesting CI: Communicate with: Clinical/Operational leaders (practice changes), Regional CI leaders (EHR implementation), IT Leaders (build and support needs), Peers (System CIs on similar initiatives), End users (before go-live about changes), System policy team if policy-related (system-policysupport@commonspirit.org)',
  'Requesting CI: Coordinate go-live support if needed: at-the-elbow support, super users, help desk briefing',
  'Requesting CI: Be available to answer questions on go-live day',
  'Requesting CI: Work with regional teams to provide coverage',
  'Requesting CI: Ensure escalation paths are clear',
  '[IT Only] Monitor production stability',
  '[IT Only] Be available for technical issues'
],
ARRAY[
  'Communication timing: Before go-live (confirm changes coming and date), At go-live (confirm changes are live), Post go-live (gather feedback, address issues)',
  'Use Quarterly Informatics Insider Webinar for system-wide broad announcements, or coordinate with SCI leadership for alternative methods',
  'Use Communication Templates as guides for before/during/after go-live communication'
],
'1-2 days'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 26, 'Deploy & Close - Post-Deployment Monitoring',
'Monitor for issues after deployment and support end users.',
ARRAY[
  'Requesting CI: Monitor for issues post-deployment',
  'Requesting CI: Track user questions and feedback',
  'Requesting CI: Identify any unexpected behaviors',
  'Requesting CI: Document issues and resolutions',
  'Requesting CI: Coordinate with IT on any technical problems',
  '[IT Only] Monitor production stability',
  '[IT Only] Track system performance',
  '[IT Only] Support any post-deployment issues',
  '[IT Only] Document technical issues and resolutions',
  'Both: Escalate critical issues through established channels'
],
ARRAY[
  'Monitor closely: First 24-48 hours (intensive monitoring), First 1-2 weeks (active monitoring and issue resolution), First month (periodic check-ins and metric tracking)',
  'Technical issues: IT supports and resolves',
  'Workflow/training issues: Requesting CI and regional informatics support',
  'Log production issues through normal IT support channels (separate from governance)'
],
'1-4 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 27, 'Deploy & Close - Close-Out Documentation',
'Complete final documentation, metrics, and lessons learned.',
ARRAY[
  'Requesting CI: Complete close-out documentation in Feature/Demand',
  'Requesting CI: Update final metrics: actual vs. expected outcomes',
  'Requesting CI: Document lessons learned: What went well, What could be improved, Unexpected challenges and how resolved, Recommendations for similar future projects, Actual timeline vs. estimated timeline',
  'Requesting CI: Update SCI Workbook with final status',
  'Requesting CI: Archive all documentation in Google Drive (ensure everything is in appropriate subfolders: 01_Intake, 02_Design, 03_Build_Test, 04_GoLive, 05_Closeout)',
  '[IT Only] Complete technical close-out documentation',
  '[IT Only] Document final build specifications',
  '[IT Only] Archive technical documentation',
  '[IT Only] Update any technical knowledge bases'
],
ARRAY[
  'Close-out documentation provides historical record and learning for future projects',
  'Lessons learned help improve future governance processes',
  'Final metrics track success of implementation',
  'Feature/Demand remains in system for historical tracking and reference',
  'Request can only be closed when ALL activities are complete'
],
'1 week');
