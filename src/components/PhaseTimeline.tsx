import { Phase } from '../data/phasesData';
import { Zap } from 'lucide-react';

interface PhaseTimelineProps {
  phases: Phase[];
  selectedPhaseId: string;
  onPhaseSelect: (phaseId: string) => void;
  governanceType?: 'full' | 'templated' | null;
}

export function PhaseTimeline({ phases, selectedPhaseId, onPhaseSelect, governanceType = null }: PhaseTimelineProps) {
  const skippedPhases = governanceType === 'templated' ? ['vetting', 'prioritization'] : [];
  const isPhaseSkipped = (phaseId: string) => skippedPhases.includes(phaseId);
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {governanceType && (
          <div className="mb-3 flex items-center justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              governanceType === 'templated'
                ? 'bg-[#00A3E0]/10 text-[#00A3E0] border border-[#00A3E0]/30'
                : 'bg-[#BA4B9C]/10 text-[#BA4B9C] border border-[#BA4B9C]/30'
            }`}>
              {governanceType === 'templated' && <Zap size={16} />}
              <span>
                {governanceType === 'templated' ? 'Governance Templated' : 'Full Governance'} Pathway
              </span>
              {governanceType === 'templated' && (
                <span className="text-xs bg-[#00A3E0]/20 px-2 py-0.5 rounded">Fast Track</span>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {phases.map((phase, index) => {
            const isSelected = phase.id === selectedPhaseId;
            const isCompleted = false;
            const isSkipped = isPhaseSkipped(phase.id);

            return (
              <div key={phase.id} className="flex items-center flex-shrink-0">
                {/* Phase Button */}
                <button
                  onClick={() => !isSkipped && onPhaseSelect(phase.id)}
                  disabled={isSkipped}
                  className={`relative flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isSkipped
                      ? 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? `${phase.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={isSkipped ? 'This phase is skipped in Governance Templated pathway' : ''}
                >
                  {isSkipped && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F3781E] rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">⚡</span>
                    </div>
                  )}
                  {/* Phase Number Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSkipped
                        ? 'bg-gray-200 text-gray-400 line-through'
                        : isSelected
                        ? 'bg-white bg-opacity-30'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {phase.order}
                  </div>

                  {/* Phase Name */}
                  <span className={`text-xs font-semibold whitespace-nowrap ${isSkipped ? 'line-through' : ''}`}>
                    {phase.name}
                  </span>
                </button>

                {/* Arrow */}
                {index < phases.length - 1 && (
                  <div className="mx-2 text-gray-400">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile scroll hint */}
        <div className="sm:hidden text-center text-xs text-gray-500 mt-2">
          Swipe to see all phases →
        </div>
      </div>
    </div>
  );
}
