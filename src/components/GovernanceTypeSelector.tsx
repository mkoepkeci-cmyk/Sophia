import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Zap, HelpCircle } from 'lucide-react';
import { GovernanceType } from '../lib/supabase';

interface GovernanceTypeSelectorProps {
  selectedTypeId: string | null;
  onSelect: (typeId: string) => void;
  governanceTypes: GovernanceType[];
  showComparison?: boolean;
}

export function GovernanceTypeSelector({
  selectedTypeId,
  onSelect,
  governanceTypes,
  showComparison = true
}: GovernanceTypeSelectorProps) {
  const [showHelper, setShowHelper] = useState(false);

  const fullGov = governanceTypes.find(g => g.name === 'Full Governance');
  const templatedGov = governanceTypes.find(g => g.name === 'Governance Templated');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Select Governance Pathway</h3>
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="flex items-center gap-1.5 text-xs text-white hover:text-white/80 font-medium bg-white/20 px-3 py-1.5 rounded-full transition-colors"
        >
          <HelpCircle size={14} />
          Need help?
        </button>
      </div>

      {showHelper && (
        <div className="bg-white/95 backdrop-blur rounded-lg p-3 text-xs space-y-2">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-green-700 mb-1">✓ Governance Templated if:</p>
              <ul className="space-y-0.5 list-disc pl-4 text-gray-700">
                <li>CSH Triage Guidelines (Cerner)</li>
                <li>EPSR list (Epic)</li>
                <li>Radiology/Lab maintenance</li>
                <li>Pharmacy maintenance (SCI Team)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-orange-700 mb-1">✓ Full Governance if:</p>
              <ul className="space-y-0.5 list-disc pl-4 text-gray-700">
                <li>New or not pre-approved</li>
                <li>Clinical practice changes</li>
                <li>Multi-region impacts</li>
                <li>When in doubt - use Full</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {fullGov && (
          <button
            onClick={() => onSelect(fullGov.id)}
            className={`relative p-3 rounded-lg border-2 transition-all text-left ${
              selectedTypeId === fullGov.id
                ? 'border-white bg-white/20 shadow-lg'
                : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/15'
            }`}
          >
            {selectedTypeId === fullGov.id && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="text-white" size={18} />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <AlertCircle className="text-white" size={16} />
                </div>
                <h4 className="text-sm font-bold text-white">{fullGov.name}</h4>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/90">
                <Clock size={12} />
                <span>{fullGov.estimated_duration}</span>
              </div>

              <p className="text-xs text-white/80 leading-tight">
                All phases: Intake → Vetting → Prioritization → Design → Develop → Deploy
              </p>
            </div>
          </button>
        )}

        {templatedGov && (
          <button
            onClick={() => onSelect(templatedGov.id)}
            className={`relative p-3 rounded-lg border-2 transition-all text-left ${
              selectedTypeId === templatedGov.id
                ? 'border-white bg-white/20 shadow-lg'
                : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/15'
            }`}
          >
            {selectedTypeId === templatedGov.id && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="text-white" size={18} />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="text-white" size={16} />
                </div>
                <h4 className="text-sm font-bold text-white">{templatedGov.name}</h4>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-white/90">
                  <Clock size={12} />
                  <span className="font-medium">{templatedGov.estimated_duration}</span>
                </div>
                <span className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full font-medium">
                  Fast Track
                </span>
              </div>

              <p className="text-xs text-white/80 leading-tight">
                Intake → Design → Develop → Deploy (Skips Vetting & Prioritization)
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
