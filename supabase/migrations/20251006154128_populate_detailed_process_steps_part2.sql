/*
  # Populate Detailed Process Steps - Part 2
  
  Continues inserting process steps: Design (Cerner), Design (Epic), Develop, Deploy, Close-Out phases
*/

INSERT INTO process_steps (process_id, step_number, title, description, required_actions, tips, estimated_duration) VALUES
-- PHASE 4A: DESIGN - CERNER
('345c95c4-e364-4f71-89ea-676dc8f04c53', 8, 'Design - Cerner - Indicate Design Status',
'Answer whether design is already complete or sessions are needed.',
ARRAY[
  'Go to SPW > ALL - EHR System > Design Filter',
  'Click three dots > View > EHR to display EHR Task Details if needed',
  'Answer ''Is design already complete?'': Select ''Design is Complete'' (no sessions needed, go straight to documentation) OR ''Design Session Needed'' (need to schedule design sessions)',
  'Update Status to ''Ready for Agenda'''
],
ARRAY[
  'Design task created automatically when Prioritization Status = Ready for Design (if no Define needed) OR Define Status = Approved',
  'Status begins as ''New''',
  'Design Review Call happens twice: once for participant gathering (if needed), once for design approval'
],
'Same day'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 9, 'Design - Cerner - Gather Participants (If Sessions Needed)',
'First Design Review Call to identify and add design participants.',
ARRAY[
  '[CM PgM Only] Review Intake Slide at first Design Review Call with attendees',
  '[CM PgM Only] Identify need for design participants',
  '[CM PgM Only] Update Status to ''Resources Needed'' to open 2-week participant window',
  'Regional CIs: Add yourself as Design Participant for your region during 2-week window',
  '[IT Only] IT Leaders add Application Group and Assignee during 2-week window',
  'Requesting CI: Can add additional regional participants as needed during 2-week window',
  '[CM PgM Only] Track design progress and support with escalations if needed'
],
ARRAY[
  '2-week ''Resources Needed'' window allows regions and IT to add participants',
  'After 2-week window closes, proceed to scheduling design sessions',
  'Regions have 2 weeks to add design participants after Status = Resources Needed'
],
'2 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 10, 'Design - Cerner - Design Sessions',
'Schedule and conduct Cerner design sessions to develop technical solution.',
ARRAY[
  'Requesting CI: Wait for 2-week ''Resources Needed'' window to close before scheduling',
  'Requesting CI: Schedule design sessions with all participants listed in Design Participants section (Avoid Tuesday/Wednesday, schedule with minimum 2 weeks notice)',
  'Requesting CI: Update Status to ''In Design'' once sessions are scheduled',
  'Requesting CI: Lead design discussion in all sessions',
  'Participants include: Requesting CI (leads), Regional participants, IT Application Groups and Assignees, SMEs as needed',
  '[IT Only] Participate in sessions, provide technical guidance, complete technical design documentation, document application impacts',
  'Requesting CI: Document design decisions in design/build documents'
],
ARRAY[
  'Avoid Tuesday/Wednesday (governance meeting days)',
  'Minimum 2 weeks notice for scheduling',
  'Requesting CI schedules and facilitates design sessions for Cerner',
  'Design session discussions led by Primary CI/Rev Cycle Ops Contact'
],
'2-4 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 11, 'Design - Cerner - Complete Design Documentation',
'Complete all design documentation after sessions are done.',
ARRAY[
  'Requesting CI: Complete Design Document Link (Cerner design/build documents in Google Drive)',
  'Requesting CI: Select Affected Applications (based on design)',
  'Requesting CI: Select Release Type',
  'Requesting CI: Select Cerner Target Domain (appropriate PRD domain(s))',
  'Requesting CI: Identify and enter Cerner Validators (ECISA/P0687, CAREB/P1284) - people who will test the build',
  'Requesting CI: Enter Finalized Design Summary (voting statement for approval)',
  'Requesting CI: Update Status to ''Ready for Agenda'' (to present at second Design Review Call)',
  'Requesting CI: Select ''Design is Complete'''
],
ARRAY[
  'Validators identified during Design phase based on who needs to test the build',
  'All design documentation stored in Google Drive folder (DMND####### Title folder)',
  'Once documentation complete, ready for design approval'
],
'1 week'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 12, 'Design - Cerner - Design Approval',
'Present completed design for approval at second Design Review Call.',
ARRAY[
  'Requesting CI: Present design for approval at second Design Review Call',
  '[CM PgM Only] Facilitate design approval discussion',
  'Regions have 2 weeks to provide Design Feedback in Design Feedback section',
  '[CM PgM Only] If provider impact: coordinate additional design approvals from provider groups',
  '[CM PgM Only] Document all approvals in Approval section',
  '[CM PgM Only] Update Status to ''Complete'' after all approvals are obtained'
],
ARRAY[
  'Design Review Call attendees approve the design',
  'If provider impact: additional design approvals needed from provider groups',
  'CM PgM documents all approvals',
  'Regions have 2 weeks for design feedback after design presentation',
  'When Status = ''Complete'': Design Task closes, Demand is complete, and FETR (Feature) is automatically opened with Phase: Develop'
],
'2 weeks'),

-- PHASE 4B: DESIGN - EPIC
('345c95c4-e364-4f71-89ea-676dc8f04c53', 13, 'Design - Epic - Indicate Design Status and Prepare',
'Answer whether design is already complete or sessions are needed, and create Epic Optimization Form if needed.',
ARRAY[
  'Go to SPW > ALL - EHR System > Design Filter',
  'Answer ''Is design already complete?'': Select ''Design is Complete'' (no sessions needed) OR ''Design Session Needed'' (need sessions)',
  'If ''Design Session Needed'': Create Epic Optimization Form from template and save in Google Drive DMND folder',
  'Update Status to ''Ready for Agenda'' (ready for Refinement)'
],
ARRAY[
  'Design task created automatically when Prioritization Status = Ready for Design (if no Define needed) OR Define Status = Approved',
  'Status begins as ''New''',
  'Epic Optimization Form template available in templates',
  'Refinement is Epic''s initial design review meeting (also called Backlog Grooming)'
],
'Same day'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 14, 'Design - Epic - Refinement Meeting',
'Present request at Refinement for initial design review.',
ARRAY[
  'Requesting CI: Present request at Refinement meeting using Intake Slide and Epic Optimization Form',
  'Epic Process Owners and Requesting CI review: Intake Slide, Epic Optimization Form, identify needed participants, determine if design sessions needed',
  'Epic Process Owners: Update Design Participants as Approvers for regions and Design Session Attendees',
  'Requesting CI: Add Regional Participants if needed post-Refinement'
],
ARRAY[
  'Refinement attendees: Epic Process Owners, Requesting CI, IT representatives',
  'Also called ''Backlog Grooming''',
  'Requesting CI presents and answers questions'
],
'1 week'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 15, 'Design - Epic - IT Assigns Resources',
'IT assigns resources and schedules design sessions.',
ARRAY[
  'Requesting CI: Update Status to ''Resources Needed'' after Refinement (triggers need for IT resources)',
  '[IT Only] Assign resources: Application Groups and Assignees',
  '[IT Only] IT Process Owner updates Status to ''Assigned'' once resources are confirmed',
  '[IT Only] Schedule design sessions: Multi-team tickets (Process Owner schedules initial session, then hands to Primary Applications Engineer for additional sessions), Single application (Applications Engineer schedules sessions)',
  '[IT Only] Coordinate with Requesting CI on scheduling (avoid scheduling conflicts)',
  '[IT Only] IT Process Owner updates Status to ''In Design'' once sessions are scheduled'
],
ARRAY[
  'When Status = Resources Needed: IT assigns resources',
  'IT schedules Epic design sessions (different from Cerner where CI schedules)',
  'Multi-team vs single application determines who schedules'
],
'1-2 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 16, 'Design - Epic - Design Sessions',
'Conduct Epic design sessions to develop technical solution.',
ARRAY[
  'Requesting CI: Lead design discussion in all sessions',
  'Participants include: Requesting CI (leads), Design Participants (identified at Refinement), IT Application Groups and Assignees, SMEs as needed',
  '[IT Only] Participate in sessions, provide technical guidance, complete technical design documentation',
  'Requesting CI: Document design decisions in Design Feedback section: Regional/System/SME input, Finalized Design Summary, Design Documentation Link, Epic Validators'
],
ARRAY[
  'Requesting CI leads design discussion',
  'IT participates and provides technical guidance',
  'Design session discussions led by Primary CI/Rev Cycle Ops Contact'
],
'2-4 weeks'),

('345c95c4-e364-4f71-89ea-676dc8f04c53', 17, 'Design - Epic - Complete Design Documentation',
'Complete all Epic design documentation after sessions are done.',
ARRAY[
  'Requesting CI: Ensure Epic Optimization Form is complete and in Google Drive',
  'Requesting CI: Complete Design Document Link (Epic Optimization Form)',
  'Requesting CI: Select Affected Applications (based on design)',
  'Requesting CI: Identify and enter Epic Validators (people who will test the build, per market or application area)',
  'Requesting CI: Enter Finalized Design Summary (voting statement)',
  'Requesting CI and IT: Both update Status to ''Complete'' when all documentation is entered'
],
ARRAY[
  'Both Requesting CI and IT must update Status to Complete',
  'Validators identified during Design phase based on who needs to validate functionality',
  'All design documentation stored in Google Drive folder (DMND####### Title folder)',
  'When Status = ''Complete'': Design Task closes, Demand is complete, and FETR (Feature) is automatically opened with Phase: Develop'
],
'1 week');

-- Continue with remaining steps
