import { Phase } from '../data/phasesData';

interface PhaseTimelineProps {
  phases: Phase[];
  selectedPhaseId: string;
  onPhaseSelect: (phaseId: string) => void;
}

export function PhaseTimeline({ phases, selectedPhaseId, onPhaseSelect }: PhaseTimelineProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {phases.map((phase, index) => {
            const isSelected = phase.id === selectedPhaseId;
            const isCompleted = false; // This is a reference guide, not a tracker

            return (
              <div key={phase.id} className="flex items-center flex-shrink-0">
                {/* Phase Button */}
                <button
                  onClick={() => onPhaseSelect(phase.id)}
                  className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isSelected
                      ? `${phase.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {/* Phase Number Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSelected
                        ? 'bg-white bg-opacity-30'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {phase.order}
                  </div>

                  {/* Phase Name */}
                  <span className="text-xs font-semibold whitespace-nowrap">
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
