import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { PhaseDashboard } from './components/PhaseDashboard';
import { SophiaChat } from './components/SophiaChat';
import { phasesData } from './data/phasesData';

function App() {
  const [selectedRole] = useState('all');
  const [selectedPhaseId, setSelectedPhaseId] = useState('intake');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Convert phases object to array and sort by order
  const phases = useMemo(() => {
    return Object.values(phasesData).sort((a, b) => a.order - b.order);
  }, []);

  // Get selected phase
  const selectedPhase = useMemo(() => {
    return phases.find(p => p.id === selectedPhaseId) || phases[0];
  }, [phases, selectedPhaseId]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <PhaseTimeline
        phases={phases}
        selectedPhaseId={selectedPhaseId}
        onPhaseSelect={setSelectedPhaseId}
      />

      <main className="flex-1">
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
