# SPM Governance Process Assistant

An interactive chatbot assistant that guides users through the SPM governance process for enhancement requests. Built with React, TypeScript, Vite, and Supabase.

## Features

### 🤖 Intelligent Chat Assistant
- Natural language Q&A about the governance process
- Enhanced search with fuzzy matching for typos and abbreviations
- Context-aware responses that remember conversation history
- Smart "I don't know" handling with helpful suggestions
- Related topic suggestions after each answer

### 📊 Multiple Views
- **Chat Assistant**: Interactive Q&A interface
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
