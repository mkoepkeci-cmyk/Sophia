import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { PhaseDashboard } from './components/PhaseDashboard';
import { phasesData } from './data/phasesData';

function App() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhaseId, setSelectedPhaseId] = useState('intake');
  const [searchResultMessage, setSearchResultMessage] = useState('');

  // Convert phases object to array and sort by order
  const phases = useMemo(() => {
    return Object.values(phasesData).sort((a, b) => a.order - b.order);
  }, []);

  // Get selected phase
  const selectedPhase = useMemo(() => {
    return phases.find(p => p.id === selectedPhaseId) || phases[0];
  }, [phases, selectedPhaseId]);

  // Search functionality - only update query, don't navigate on every keystroke
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Search execution - called on Enter or button click
  const executeSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResultMessage('');
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Search through all phases
    for (const phase of phases) {
      // Search in phase name and description
      if (phase.name.toLowerCase().includes(lowerQuery) ||
          phase.description.toLowerCase().includes(lowerQuery)) {
        setSelectedPhaseId(phase.id);
        setSearchResultMessage(`Found in ${phase.name} phase`);
        return;
      }

      // Search in actions
      for (const actions of Object.values(phase.actions)) {
        if (actions.some(action => action.toLowerCase().includes(lowerQuery))) {
          setSelectedPhaseId(phase.id);
          setSearchResultMessage(`Found in ${phase.name} phase (Actions)`);
          return;
        }
      }

      // Search in outcomes
      if (phase.outcomes.some(outcome =>
        outcome.status.toLowerCase().includes(lowerQuery) ||
        outcome.meaning.toLowerCase().includes(lowerQuery)
      )) {
        setSelectedPhaseId(phase.id);
        setSearchResultMessage(`Found in ${phase.name} phase (Outcomes)`);
        return;
      }

      // Search in responsibilities
      if (phase.responsibilities.some(resp =>
        resp.role.toLowerCase().includes(lowerQuery) ||
        resp.actions.some(action => action.toLowerCase().includes(lowerQuery))
      )) {
        setSelectedPhaseId(phase.id);
        setSearchResultMessage(`Found in ${phase.name} phase (Responsibilities)`);
        return;
      }

      // Search in troubleshooting
      if (phase.troubleshooting.some(item =>
        item.problem.toLowerCase().includes(lowerQuery) ||
        item.solution.toLowerCase().includes(lowerQuery)
      )) {
        setSelectedPhaseId(phase.id);
        setSearchResultMessage(`Found in ${phase.name} phase (Troubleshooting)`);
        return;
      }
    }

    // No results found
    setSearchResultMessage(`No results found for "${query}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={executeSearch}
      />

      <PhaseTimeline
        phases={phases}
        selectedPhaseId={selectedPhaseId}
        onPhaseSelect={(id) => {
          setSelectedPhaseId(id);
          setSearchResultMessage('');
        }}
      />

      {/* Search Result Banner */}
      {searchResultMessage && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-blue-800 font-medium">{searchResultMessage}</p>
            <button
              onClick={() => setSearchResultMessage('')}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        <PhaseDashboard
          phase={selectedPhase}
          selectedRole={selectedRole}
        />
      </main>

    </div>
  );
}

export default App;
