import { CheckCircle, X, Clock, Users, FileText, Zap } from 'lucide-react';

interface PathwayComparisonProps {
  className?: string;
}

export function PathwayComparison({ className = '' }: PathwayComparisonProps) {
  const comparisonData = [
    {
      aspect: 'Phases',
      fullGov: 'Intake → Vetting → Prioritization → Define → Design → Develop → Deploy',
      templated: 'Intake → Design → Develop → Deploy',
      icon: FileText
    },
    {
      aspect: 'Governance Meetings',
      fullGov: 'PeriSCOPE, SCOPE, possibly CLS Define',
      templated: 'None - bypasses governance meetings',
      icon: Users
    },
    {
      aspect: 'Timeline',
      fullGov: 'Weeks to months for approval',
      templated: 'Days to weeks',
      icon: Clock
    },
    {
      aspect: 'Approval Requirements',
      fullGov: 'Multiple: PeriSCOPE, SCOPE, potentially CLS',
      templated: 'Pre-approved through guidelines',
      icon: CheckCircle
    },
    {
      aspect: 'Best For',
      fullGov: 'New enhancements, practice changes, system-wide initiatives',
      templated: 'Maintenance, established guidelines, standard requests',
      icon: Zap
    }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="bg-[#56565B] p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Governance Pathway Comparison</h3>
        <p className="text-white text-opacity-90">
          Understanding the differences between Full Governance and Governance Templated processes
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aspect</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#BA4B9C]">
                Full Governance
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#00A3E0]">
                Governance Templated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comparisonData.map((row, index) => {
              const Icon = row.icon;
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon className="text-gray-600" size={16} />
                      </div>
                      <span className="font-medium text-gray-900">{row.aspect}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.fullGov}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.templated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50">
        <div className="space-y-3">
          <h4 className="font-bold text-[#BA4B9C] flex items-center gap-2">
            <CheckCircle size={20} />
            Use Full Governance if:
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is for something new or not previously approved</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>Request involves clinical practice changes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>Request impacts multiple regions/markets</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>Request requires clinical service line review</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>System-wide policy or initiative</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#BA4B9C] flex-shrink-0 mt-0.5" size={16} />
              <span>When in doubt - default to Full Governance</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-[#00A3E0] flex items-center gap-2">
            <Zap size={20} />
            Use Governance Templated if:
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is in CSH Triage Guidelines (Cerner)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is on EPSR list (Epic)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is Radiology or Lab maintenance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is Pharmacy-related (SCI Team only)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Request is routine maintenance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
              <span>Pre-approved by leadership</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#F3781E]/10 border-t border-[#F3781E]/20 p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#F3781E]/20 flex items-center justify-center">
              <X className="text-[#F3781E]" size={20} />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Important Note</h4>
            <p className="text-sm text-gray-700">
              "All items are considered Full Governance unless the Governance Templated process has
              already been established." If unsure, select Full Governance - requests can always be
              moved to templated pathway if appropriate. The CM PgM can reroute if a request qualifies
              for Governance Templated.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <h4 className="font-bold text-gray-900 mb-3">Tracking Both Types</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="flex items-start gap-2">
            <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
            <span>Both pathways are tracked in Strategic Planning Workspace (SPW)</span>
          </p>
          <p className="flex items-start gap-2">
            <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
            <span>
              Governance Templated requests appear in Design lists (skip Vetting/Prioritization lists)
            </span>
          </p>
          <p className="flex items-start gap-2">
            <CheckCircle className="text-[#00A3E0] flex-shrink-0 mt-0.5" size={16} />
            <span>Use DMND number to track in all cases</span>
          </p>
        </div>
      </div>
    </div>
  );
}
