import { useState, useMemo, useEffect } from 'react';
import { MessageCircle, GitCompare, BarChart3, Book } from 'lucide-react';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { PhaseDashboard } from './components/PhaseDashboard';
import { SophiaChat } from './components/SophiaChat';
import { GovernanceTypeSelector } from './components/GovernanceTypeSelector';
import { PathwayComparison } from './components/PathwayComparison';
import { GovernanceAnalytics } from './components/GovernanceAnalytics';
import { phasesData } from './data/phasesData';
import { supabase, GovernanceType } from './lib/supabase';

type ViewMode = 'process' | 'analytics';

function App() {
  const [selectedRole] = useState('all');
  const [selectedPhaseId, setSelectedPhaseId] = useState('intake');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('process');
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

      {/* View Mode Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode('process')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                viewMode === 'process'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Book size={20} />
              Process Guide
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                viewMode === 'analytics'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={20} />
              Analytics Dashboard
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'process' && (
        <>
          <PhaseTimeline
            phases={phases}
            selectedPhaseId={selectedPhaseId}
            onPhaseSelect={setSelectedPhaseId}
            governanceType={governanceTypeDisplay}
          />

          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Governance Type Selector Section */}
              <div className="mb-6">
                <GovernanceTypeSelector
                  selectedTypeId={selectedGovernanceTypeId}
                  onSelect={setSelectedGovernanceTypeId}
                  governanceTypes={governanceTypes}
                  showComparison={true}
                />
              </div>

              {/* Comparison Toggle Button */}
              <div className="mb-6 flex justify-center">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <GitCompare size={20} />
                  {showComparison ? 'Hide' : 'Show'} Detailed Pathway Comparison
                </button>
              </div>

              {/* Pathway Comparison */}
              {showComparison && (
                <div className="mb-6">
                  <PathwayComparison />
                </div>
              )}
            </div>

            <PhaseDashboard
              phase={selectedPhase}
              selectedRole={selectedRole}
            />
          </main>
        </>
      )}

      {viewMode === 'analytics' && (
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <GovernanceAnalytics />
          </div>
        </main>
      )}

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
