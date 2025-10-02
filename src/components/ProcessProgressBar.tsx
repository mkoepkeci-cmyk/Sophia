import { ProcessStep, UserProgress } from '../lib/supabase';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProcessProgressBarProps {
  steps: ProcessStep[];
  progress: UserProgress | null;
}

export function ProcessProgressBar({ steps, progress }: ProcessProgressBarProps) {
  if (!progress || steps.length === 0) return null;

  const currentStepNumber = progress.current_step;
  const completedSteps = progress.completed_steps;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Your Progress</h3>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.step_number);
          const isCurrent = step.step_number === currentStepNumber;
          const isPending = step.step_number > currentStepNumber;

          return (
            <div key={step.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-[#A7226E]" />
                ) : isCurrent ? (
                  <Circle className="w-5 h-5 text-[#A7226E] fill-[#FCE7F3]" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${
                  isCompleted ? 'text-slate-500 line-through' :
                  isCurrent ? 'text-slate-900' :
                  'text-slate-400'
                }`}>
                  Step {step.step_number}: {step.title}
                </div>

                {isCurrent && (
                  <div className="text-xs text-slate-500 mt-1">
                    {step.estimated_duration && `⏱️ ${step.estimated_duration}`}
                  </div>
                )}
              </div>

              {isCompleted && (
                <span className="text-xs font-semibold text-[#A7226E] bg-[#FCE7F3] px-2 py-1 rounded-full">
                  Done
                </span>
              )}
              {isCurrent && (
                <span className="text-xs font-semibold text-[#A7226E] bg-[#FCE7F3] px-2 py-1 rounded-full">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>{completedSteps.length} of {steps.length} steps completed</span>
          <span className="font-medium">
            {Math.round((completedSteps.length / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
          <div
            className="bg-[#A7226E] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
