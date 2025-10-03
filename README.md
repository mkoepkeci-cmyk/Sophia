# EHR Process Navigator

A comprehensive **static reference guide** that helps CommonSpirit Health users navigate the complex EHR governance process. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🎯 What This Application Does

The EHR Process Navigator answers critical questions users have at each phase:

- ❓ "How do I know when my request has been prioritized?"
- ❓ "Who updates the ticket status?"
- ❓ "What happens if my request is dismissed?"
- ❓ "How am I notified that further review is needed?"
- ❓ "What does this status mean?"

### ✅ This App IS:
- A **reference guide** for the EHR governance process
- A tool to understand **who does what** and **when**
- A way to learn **how you'll be notified** at each step
- A **searchable knowledge base** of the entire process

### ❌ This App IS NOT:
- A status tracker (users check SPW for that)
- Connected to live systems
- A replacement for SPW
- A notification system

---

## 🌟 Key Features

### 🔍 Powerful Search
- Search across all phases, actions, statuses, and roles
- Real-time results that auto-navigate to relevant phase
- Find answers in seconds

### 🎭 Role-Based Filtering
- Select your role (CI, CM PgM, IT, System Leader, Validator)
- See only actions relevant to your role
- Cleaner, more focused guidance

### 📊 7-Phase Coverage
1. **Intake** (Pink) - Request creation and internal review
2. **Vetting** (Blue) - PeriSCOPE meeting review
3. **Prioritization** (Orange) - SCOPE meeting prioritization
4. **Define** (Purple) - Clinical Service Line approval
5. **Design** (Indigo) - Design sessions and approvals
6. **Build & Test** (Teal) - Development and validation
7. **Deploy & Close** (Green) - Production deployment and close-out

### 📑 4-Tab Dashboard
Each phase includes:
- **📋 Overview**: Action items, outcomes, meetings
- **🔔 Notifications**: How you'll be notified at each step
- **👥 Responsibilities**: Who does what (role-based)
- **❓ Troubleshooting**: Common problems and solutions

### 🎨 Visual Timeline
- Sticky phase navigation
- Click any phase to view details
- Color-coded for easy recognition
- Mobile-friendly horizontal scroll

### ⚡ Quick Actions
- External link to SPW
- Download/Print guide
- Contact help
- Access resources

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Search bar, role selector
│   ├── PhaseTimeline.tsx       # Sticky phase navigation
│   ├── PhaseDashboard.tsx      # Main content (4 tabs)
│   └── QuickActions.tsx        # Fixed bottom action bar
├── data/
│   └── phasesData.ts           # All 7 phases data
└── App.tsx                      # Main application
```

---

## 🎨 Design System

### Phase Colors
```
Intake:          Pink (#db2777)
Vetting:         Blue (#2563eb)
Prioritization:  Orange (#f97316)
Define:          Purple (#9333ea)
Design:          Indigo (#4f46e5)
Build & Test:    Teal (#0d9488)
Deploy & Close:  Green (#16a34a)
```

### Role Colors
```
Clinical Informaticist:  Blue (#2563eb)
CM Program Manager:      Pink (#ec4899)
IT/Applications:         Green (#16a34a)
System Leader:           Gray (#374151)
Validator:               Purple (#9333ea)
```

---

## 📖 User Guide

### Finding Information

**By Search:**
```
Type: "who updates prioritization"
→ Navigates to Prioritization phase, Responsibilities tab
```

**By Phase:**
```
Click: "Design" in timeline
→ View Design phase with all tabs
```

**By Role:**
```
Select: "Clinical Informaticist"
→ See only CI actions across all phases
```

### Understanding Notifications

Each phase's **Notifications tab** explains:
- 📧 When you'll receive emails
- 🔄 How status changes in SPW
- ⏭️ When next phase automatically opens
- 💡 How to manually check progress in SPW

### Troubleshooting Issues

Each phase's **Troubleshooting tab** provides:
- Common problems encountered
- Step-by-step solutions
- Who to contact for help

---

## 🎯 Example Use Cases

### Use Case 1: "How do I know my request was prioritized?"
```
1. Search "how am I notified prioritization"
2. Auto-navigate to Prioritization phase
3. Click "Notifications" tab
4. See: Email, Status Change, Manual Check options
```

### Use Case 2: "What does 'Further Review Needed' mean?"
```
1. Search "further review needed"
2. View phase where it appears
3. Click "Overview" tab
4. See outcome card with meaning and what happens next
```

### Use Case 3: "I'm a CI - what do I do in Design?"
```
1. Select role: "Clinical Informaticist"
2. Click "Design" phase
3. Overview tab shows ONLY CI actions
4. Clear, focused guidance
```

---

## 📱 Responsive Design

- **Desktop**: Full layout with all features
- **Tablet**: Optimized for touch
- **Mobile**: Horizontal scrolling timeline, stacked layout

---

## 🔄 Updating Content

### To Add/Edit Phase Information

Edit `src/data/phasesData.ts`:

```typescript
intake: {
  // Add new action
  actions: {
    ci: [
      'Existing action',
      'NEW ACTION HERE'
    ]
  },

  // Add new troubleshooting
  troubleshooting: [
    {
      problem: 'New problem',
      solution: 'How to solve',
      contactRole: 'Who to contact'
    }
  ]
}
```

Then rebuild:
```bash
npm run build
```

---

## 📚 Documentation

- **[Complete Implementation Guide](./PROCESS_NAVIGATOR_GUIDE.md)** - Comprehensive documentation
- **[Branding Guide](./BRANDING_UPDATE.md)** - Sophia branding and design
- **[Sophia Proactive Guide](./SOPHIA_PROACTIVE_GUIDE.md)** - AI chat capabilities (legacy)

---

## 🎓 Key Principles

1. **Everything answers "How will I know?"** at each step
2. **Role-based filtering** shows only relevant information
3. **Search-first design** for quick answers
4. **Static reference** - not connected to live systems
5. **Mobile-friendly** responsive design

---

## 🆘 Support

### For Users
- Use the search bar to find answers quickly
- Check the Troubleshooting tab for your current phase
- Click "Contact Help" in Quick Actions

### For Developers
- Review [Implementation Guide](./PROCESS_NAVIGATOR_GUIDE.md)
- Check component TypeScript interfaces
- Test with `npm run dev`

---

## ✅ Features Checklist

- [x] 7 complete phases (Intake through Deploy)
- [x] 4-tab dashboard (Overview, Notifications, Responsibilities, Troubleshooting)
- [x] Role-based filtering
- [x] Comprehensive search
- [x] Sticky phase timeline navigation
- [x] External SPW link
- [x] Mobile responsive design
- [x] Professional Sophia branding
- [x] Quick Actions bar
- [x] Print/download capability

---

## 🚧 Future Enhancements

- [ ] Sophia AI chat integration (components ready)
- [ ] Interactive process map visualization
- [ ] Video tutorial embeds
- [ ] User feedback collection
- [ ] Bookmark favorite sections
- [ ] Print-optimized CSS

---

## 📊 Success Metrics

Target outcomes:
- ✅ 50% reduction in "how do I know?" support questions
- ✅ < 30 seconds to find any answer
- ✅ > 80% search success rate
- ✅ > 4/5 user satisfaction rating

---

## 🙏 Credits

**Built with:**
- React + TypeScript + Vite
- Tailwind CSS
- Lucide React Icons
- Sophia branding by CommonSpirit Health

**Powered by:**
- Comprehensive EHR governance knowledge base
- User-centered design principles
- Iterative feedback and refinement

---

## 📄 License

This project is proprietary to CommonSpirit Health.

---

**Ready to navigate the EHR governance process with confidence!** 🎉
