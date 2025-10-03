# Sophia - SPM Governance Assistant

Meet **Sophia**, your intelligent SPM Governance Assistant that guides users through the enhancement request process. Built with React, TypeScript, Vite, and Supabase.

## Features

### 💬 Meet Sophia
Sophia is your friendly, professional assistant with a modern, clean interface featuring:
- **Profile Image**: Professional avatar with personality
- **Outline Icons**: Clean, professional Lucide React icons throughout
- **Professional Branding**: Purple-to-blue gradient header with consistent design
- **Proactive Engagement**: Asks thoughtful clarifying questions to provide better answers

### 🤖 Intelligent Chat Assistant with Proactive Questioning
- **Natural Language Q&A**: Ask questions in plain English about the governance process
- **Proactive Clarification**: Sophia asks 1-3 targeted questions to provide more relevant answers
- **Context-Aware**: Remembers conversation history and provides personalized responses
- **Fuzzy Matching**: Handles typos and abbreviations (e.g., "periscope" → "PeriSCOPE")
- **Smart Suggestions**: Offers relevant follow-up questions based on the current topic
- **Adaptive Responses**: Tailors questions to your situation rather than generic prompts
- **Clear Chat**: Start fresh anytime with the clear chat button

**Example Proactive Interactions:**
- You: "Tell me about design"
- Sophia: [Provides design overview] "**To help you better:** Which EHR system is your request for? *The design process differs between systems* • Epic | Cerner | Both"

- You: "I need help with intake"
- Sophia: [Explains intake] "**To help you better:** Are you submitting a new request, or tracking an existing one? • Submitting new | Tracking existing | Just learning the process"

### 📊 Multiple Views
- **Chat Assistant**: Interactive Q&A interface with Sophia
- **Process Overview**: Visual guide to all phases (Intake, Vetting, Define, Design, Develop & Deploy)
- **Meeting Guide**: Details about all governance meetings (PeriSCOPE, SCOPE, etc.)
- **Role Guide**: Responsibilities for each role (CI, Change Mgmt, IT Process Owner, IT Analyst)

### 🎨 Phase-Based Color Coding
- **Intake**: Pink/Magenta (#C71585)
- **Vetting & Prioritization**: Blue (#4169E1)
- **Define**: Purple (#800080)
- **Design**: Orange (#FF8C00)
- **Develop & Deploy**: Teal (#008B8B)

### 🔍 Enhanced Search Capabilities
- **Fuzzy Matching**: Handles typos (e.g., "periscope" → "PeriSCOPE")
- **Abbreviation Expansion**: Recognizes "CI", "SCI", "CM PgM", "RFA"
- **Keyword Extraction**: Identifies phases, meetings, roles, statuses
- **Context Awareness**: Remembers recent conversation topics
- **Follow-up Detection**: Understands "What about...", "And then..."

### ⚡ Quick Actions
- What happens at PeriSCOPE?
- What happens at SCOPE?
- My status is Further Review Needed
- Explain the Design phase
- What's the difference between Epic and Cerner?
- When does FETR open?

## Example Questions

**Meeting Questions:**
- "What happens at PeriSCOPE?"
- "Who takes items to SCOPE?"
- "Tell me about the Design Review Call"

**Phase Questions:**
- "Walk me through the Design phase"
- "What's the Intake process?"
- "Explain Develop & Deploy"

**Status Questions:**
- "My status is Further Review Needed"
- "What does Resources Needed mean?"
- "When does FETR open?"

**Role Questions:**
- "What does a Clinical Informaticist do?"
- "Who is responsible for IT Analyst tasks?"
- "Tell me about the Change Mgmt Program Manager"

**System Differences:**
- "What's the difference between Epic and Cerner?"
- "How does Epic validation work?"
- "Tell me about Cerner design process"

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Static hosting ready

## Search Enhancements

### Fuzzy Matching
Handles common typos and variations:
- "periscope" / "peroscope" → "PeriSCOPE"
- "CI" / "SCI" → "Clinical Informaticist"
- "RFA" → "Ready for Agenda"
- "CM PgM" → "Change Management Program Manager"

### Context Awareness
Remembers conversation history:
```
You: "Tell me about Epic design"
Bot: [Epic design info]
You: "What about scheduling?"
Bot: "💡 Based on our discussion about Epic, I'm providing Epic-specific guidance."
```

### Smart Fallback
When the bot doesn't know:
- Detects keywords you mentioned
- Suggests related clarifying questions
- Provides general help menu for very vague queries

## Database Schema

The application uses Supabase with the following tables:

- **governance_processes**: Main process definitions
- **process_steps**: Individual steps within each process
- **user_progress**: Track user progress through processes
- **chat_history**: Conversation history for context awareness

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (`.env`)
4. Run migrations to set up database schema
5. Start dev server: `npm run dev`
6. Build for production: `npm run build`

## Environment Variables

Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Color Scheme

The interface uses phase-specific colors throughout:
- **Header**: Purple to Blue gradient
- **User Messages**: Blue (#4169E1)
- **Bot Messages**: Gray background with phase-colored left borders
- **Navigation**: Blue highlights (#4169E1)
- **Phase Cards**: Color-coded left borders matching phase colors

## Future Enhancements

- Export conversation history
- Bookmark favorite answers
- Search across all conversations
- Advanced filtering by phase/role/system
- Integration with actual SPM system for real-time status updates
