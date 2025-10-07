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
      if (!supabase) {
        // Use fallback data if Supabase is not available
        setGovernanceTypes([
          {
            id: '1',
            name: 'Full Governance',
            description: 'Complete governance process for all new or complex requests',
            phases_included: ['intake', 'vetting', 'prioritization', 'define', 'design', 'develop', 'deploy'],
            phases_skipped: [],
            estimated_duration: 'Weeks to months',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Governance Templated',
            description: 'Expedited process for pre-approved maintenance and routine requests',
            phases_included: ['intake', 'design', 'develop', 'deploy'],
            phases_skipped: ['vetting', 'prioritization'],
            estimated_duration: 'Days to weeks',
            created_at: new Date().toISOString()
          }
        ]);
        return;
      }

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
        <div className="bg-[#56565B] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1">
                <GovernanceTypeSelector
                  selectedTypeId={selectedGovernanceTypeId}
                  onSelect={setSelectedGovernanceTypeId}
                  governanceTypes={governanceTypes}
                  showComparison={false}
                />
              </div>

              {/* Comparison Toggle Button */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition-all border border-white/30 whitespace-nowrap"
              >
                <GitCompare size={12} />
                Compare Full vs Templated Governance
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
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#00A3E0] to-[#0088CC] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 hover:scale-110"
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
