import { useState, useMemo, useEffect } from 'react';
import { MessageCircle, GitCompare } from 'lucide-react';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { PhaseDashboard } from './components/PhaseDashboard';
import { SophiaChat } from './components/SophiaChat';
import { GovernanceTypeSelector } from './components/GovernanceTypeSelector';
import { PathwayComparison } from './components/PathwayComparison';
import { phasesData } from './data/phasesData';
import { supabase, GovernanceType } from './lib/supabase';

function App() {
  const [selectedRole] = useState('all');
  const [selectedPhaseId, setSelectedPhaseId] = useState('intake');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [governanceTypes, setGovernanceTypes] = useState<GovernanceType[]>([]);
  const [selectedGovernanceTypeId, setSelectedGovernanceTypeId] = useState<string | null>(null);

  // Fetch governance types from database
  useEffect(() => {
    const fetchGovernanceTypes = async () => {
      const { data, error } = await supabase
        .from('governance_types')
        .select('*')
        .order('name');

      if (data && !error) {
        setGovernanceTypes(data);
      }
    };

    fetchGovernanceTypes();
  }, []);

  // Convert phases object to array and sort by order
  const phases = useMemo(() => {
    return Object.values(phasesData).sort((a, b) => a.order - b.order);
  }, []);

  // Get selected phase
  const selectedPhase = useMemo(() => {
    return phases.find(p => p.id === selectedPhaseId) || phases[0];
  }, [phases, selectedPhaseId]);

  // Determine governance type for display
  const governanceTypeDisplay = useMemo(() => {
    if (!selectedGovernanceTypeId) return null;
    const govType = governanceTypes.find(gt => gt.id === selectedGovernanceTypeId);
    return govType?.name === 'Governance Templated' ? 'templated' : 'full';
  }, [selectedGovernanceTypeId, governanceTypes]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <PhaseTimeline
        phases={phases}
        selectedPhaseId={selectedPhaseId}
        onPhaseSelect={setSelectedPhaseId}
        governanceType={governanceTypeDisplay}
      />

      <main className="flex-1">
        {/* Compact Governance Type Selector Hero */}
        <div className="bg-slate-700 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <GovernanceTypeSelector
              selectedTypeId={selectedGovernanceTypeId}
              onSelect={setSelectedGovernanceTypeId}
              governanceTypes={governanceTypes}
              showComparison={false}
            />

            {/* Comparison Toggle Button */}
            <div className="mt-2 flex justify-center">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition-all border border-white/30"
              >
                <GitCompare size={12} />
                {showComparison ? 'Hide' : 'Show'} Detailed Pathway Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Pathway Comparison */}
        {showComparison && (
          <div className="bg-gray-50 py-6 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PathwayComparison />
            </div>
          </div>
        )}

        <PhaseDashboard
          phase={selectedPhase}
          selectedRole={selectedRole}
        />
      </main>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 hover:scale-110"
          aria-label="Open Sophia Chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Sophia Chat Window */}
      {isChatOpen && <SophiaChat onClose={() => setIsChatOpen(false)} />}

    </div>
  );
}

export default App;
