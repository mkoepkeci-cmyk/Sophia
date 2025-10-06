import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select Governance Type</h3>
          <p className="text-sm text-gray-600 mt-1">
            Choose the appropriate pathway for your request
          </p>
        </div>
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <HelpCircle size={18} />
          Need help deciding?
        </button>
      </div>

      {showHelper && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <HelpCircle className="text-blue-600" size={20} />
            How to Choose the Right Pathway
          </h4>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="pl-4">
              <p className="font-medium text-green-700 mb-1">✓ Use Governance Templated if:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>Request is in CSH Triage Guidelines (Cerner)</li>
                <li>Request is on EPSR list (Epic)</li>
                <li>Request is Radiology or Lab maintenance</li>
                <li>Request is Pharmacy-related and you're SCI Team</li>
                <li>Request is routine maintenance</li>
                <li>Pre-approved by leadership for templated pathway</li>
              </ul>
            </div>

            <div className="pl-4">
              <p className="font-medium text-orange-700 mb-1">✓ Use Full Governance if:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>Request is new or not previously approved</li>
                <li>Request involves clinical practice changes</li>
                <li>Request impacts multiple regions/markets</li>
                <li>Request requires clinical service line review</li>
                <li>System-wide policy or initiative</li>
                <li>When in doubt - default to Full Governance</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> All items are considered Full Governance unless the Governance
              Templated process has already been established. If unsure, select Full Governance -
              requests can be moved to templated pathway if appropriate.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {fullGov && (
          <button
            onClick={() => onSelect(fullGov.id)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedTypeId === fullGov.id
                ? 'border-orange-500 bg-orange-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {selectedTypeId === fullGov.id && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="text-orange-600" size={24} />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="text-orange-600" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{fullGov.name}</h4>
              </div>

              <p className="text-sm text-gray-600">{fullGov.description}</p>

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-gray-600">
                    Timeline: <span className="font-medium">{fullGov.estimated_duration}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="text-gray-400" size={16} />
                  <span className="text-gray-600">
                    <span className="font-medium">{fullGov.phases_included.length}</span> phases included
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500">
                  Includes: Intake → Vetting → Prioritization → Define → Design → Develop → Deploy
                </p>
              </div>
            </div>
          </button>
        )}

        {templatedGov && (
          <button
            onClick={() => onSelect(templatedGov.id)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedTypeId === templatedGov.id
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {selectedTypeId === templatedGov.id && (
              <div className="absolute top-4 right-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{templatedGov.name}</h4>
              </div>

              <p className="text-sm text-gray-600">{templatedGov.description}</p>

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-gray-600">
                    Timeline: <span className="font-medium text-green-600">{templatedGov.estimated_duration}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="text-gray-400" size={16} />
                  <span className="text-gray-600">
                    <span className="font-medium">{templatedGov.phases_included.length}</span> phases included
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-1">
                <p className="text-xs text-green-700 font-medium">
                  Fast Track: Skips Vetting and Prioritization
                </p>
                <p className="text-xs text-gray-500">
                  Includes: Intake → Design → Develop → Deploy
                </p>
              </div>
            </div>
          </button>
        )}
      </div>

      {showComparison && selectedTypeId && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={18} />
            Selected Pathway Details
          </h4>
          <div className="text-sm text-gray-700">
            {selectedTypeId === fullGov?.id && (
              <div className="space-y-2">
                <p>Your request will go through the complete governance process including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PeriSCOPE meeting for vetting</li>
                  <li>SCOPE meeting for prioritization</li>
                  <li>Possible Clinical Service Line review (Define phase)</li>
                  <li>Full design review and approval process</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  This ensures thorough review but requires more time for governance approvals.
                </p>
              </div>
            )}
            {selectedTypeId === templatedGov?.id && (
              <div className="space-y-2">
                <p className="text-green-700 font-medium">Fast-tracked pathway benefits:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Bypasses PeriSCOPE and SCOPE meetings</li>
                  <li>Moves directly from Intake to Design</li>
                  <li>Significantly reduced timeline</li>
                  <li>Pre-approved for implementation</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  Note: Only available for pre-approved request types with established guidelines.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
