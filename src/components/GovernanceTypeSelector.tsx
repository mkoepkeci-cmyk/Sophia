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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Select Governance Pathway</h3>
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="flex items-center gap-1 text-xs text-white hover:text-white/80 font-medium bg-white/20 px-2 py-1 rounded-full transition-colors"
        >
          <HelpCircle size={12} />
          Need help?
        </button>
      </div>

      {showHelper && (
        <div className="bg-white/95 backdrop-blur rounded-lg p-2 text-xs space-y-1.5">
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <p className="font-semibold text-green-700 mb-0.5">✓ Governance Templated if:</p>
              <ul className="space-y-0 list-disc pl-4 text-gray-700 text-xs">
                <li>CSH Triage Guidelines (Cerner)</li>
                <li>EPSR list (Epic)</li>
                <li>Radiology/Lab maintenance</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-orange-700 mb-0.5">✓ Full Governance if:</p>
              <ul className="space-y-0 list-disc pl-4 text-gray-700 text-xs">
                <li>New or not pre-approved</li>
                <li>Clinical practice changes</li>
                <li>When in doubt - use Full</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-2">
        {fullGov && (
          <button
            onClick={() => onSelect(fullGov.id)}
            className={`relative p-2 rounded-lg border-2 transition-all text-left ${
              selectedTypeId === fullGov.id
                ? 'border-white bg-white/20 shadow-lg'
                : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/15'
            }`}
          >
            {selectedTypeId === fullGov.id && (
              <div className="absolute top-1.5 right-1.5">
                <CheckCircle className="text-white" size={14} />
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-white" size={12} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white">{fullGov.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-white/80 mt-0.5">
                  <Clock size={10} />
                  <span className="text-xs">{fullGov.estimated_duration}</span>
                </div>
              </div>
            </div>
          </button>
        )}

        {templatedGov && (
          <button
            onClick={() => onSelect(templatedGov.id)}
            className={`relative p-2 rounded-lg border-2 transition-all text-left ${
              selectedTypeId === templatedGov.id
                ? 'border-white bg-white/20 shadow-lg'
                : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/15'
            }`}
          >
            {selectedTypeId === templatedGov.id && (
              <div className="absolute top-1.5 right-1.5">
                <CheckCircle className="text-white" size={14} />
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" size={12} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">{templatedGov.name}</h4>
                  <span className="text-xs bg-white/30 text-white px-1.5 py-0.5 rounded-full font-medium">
                    Fast Track
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/80 mt-0.5">
                  <Clock size={10} />
                  <span className="text-xs font-medium">{templatedGov.estimated_duration}</span>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
