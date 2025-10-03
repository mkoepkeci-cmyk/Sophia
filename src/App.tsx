import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { PhaseDashboard } from './components/PhaseDashboard';
import { QuickActions } from './components/QuickActions';
import { phasesData } from './data/phasesData';

function App() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhaseId, setSelectedPhaseId] = useState('intake');

  // Convert phases object to array and sort by order
  const phases = useMemo(() => {
    return Object.values(phasesData).sort((a, b) => a.order - b.order);
  }, []);

  // Get selected phase
  const selectedPhase = useMemo(() => {
    return phases.find(p => p.id === selectedPhaseId) || phases[0];
  }, [phases, selectedPhaseId]);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();

    // Search through all phases
    for (const phase of phases) {
      // Search in phase name and description
      if (phase.name.toLowerCase().includes(lowerQuery) ||
          phase.description.toLowerCase().includes(lowerQuery)) {
        setSelectedPhaseId(phase.id);
        return;
      }

      // Search in actions
      for (const actions of Object.values(phase.actions)) {
        if (actions.some(action => action.toLowerCase().includes(lowerQuery))) {
          setSelectedPhaseId(phase.id);
          return;
        }
      }

      // Search in outcomes
      if (phase.outcomes.some(outcome =>
        outcome.status.toLowerCase().includes(lowerQuery) ||
        outcome.meaning.toLowerCase().includes(lowerQuery)
      )) {
        setSelectedPhaseId(phase.id);
        return;
      }

      // Search in responsibilities
      if (phase.responsibilities.some(resp =>
        resp.role.toLowerCase().includes(lowerQuery) ||
        resp.actions.some(action => action.toLowerCase().includes(lowerQuery))
      )) {
        setSelectedPhaseId(phase.id);
        return;
      }

      // Search in troubleshooting
      if (phase.troubleshooting.some(item =>
        item.problem.toLowerCase().includes(lowerQuery) ||
        item.solution.toLowerCase().includes(lowerQuery)
      )) {
        setSelectedPhaseId(phase.id);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />

      <PhaseTimeline
        phases={phases}
        selectedPhaseId={selectedPhaseId}
        onPhaseSelect={setSelectedPhaseId}
      />

      <main className="flex-1 pb-20">
        <PhaseDashboard
          phase={selectedPhase}
          selectedRole={selectedRole}
        />
      </main>

      <div className="fixed bottom-0 left-0 right-0">
        <QuickActions />
      </div>
    </div>
  );
}

export default App;
