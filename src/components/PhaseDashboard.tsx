import { useState } from 'react';
import { Bell, Users, AlertCircle, ClipboardList, CheckCircle, Mail, RefreshCw, AlertTriangle, XCircle } from 'lucide-react';
import { Phase } from '../data/phasesData';

interface PhaseDashboardProps {
  phase: Phase;
  selectedRole: string;
}

type TabType = 'overview' | 'notifications' | 'responsibilities' | 'troubleshooting';

export function PhaseDashboard({ phase, selectedRole }: PhaseDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: ClipboardList },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'responsibilities' as TabType, label: 'Responsibilities', icon: Users },
    { id: 'troubleshooting' as TabType, label: 'Troubleshooting', icon: AlertCircle },
  ];

  // Filter actions by selected role
  const getFilteredActions = () => {
    if (selectedRole === 'all') {
      return Object.entries(phase.actions).flatMap(([role, actions]) =>
        actions.map(action => ({ role, action }))
      );
    }
    return (phase.actions[selectedRole as keyof typeof phase.actions] || []).map(action => ({
      role: selectedRole,
      action
    }));
  };

  const outcomeIcons: Record<string, React.ReactNode> = {
    '✅': <CheckCircle className="text-green-600" size={20} />,
    '⚠️': <AlertTriangle className="text-yellow-600" size={20} />,
    '❌': <XCircle className="text-red-600" size={20} />,
    '🔄': <RefreshCw className="text-blue-600" size={20} />,
    '👥': <Users className="text-blue-600" size={20} />,
    '🎨': <ClipboardList className="text-purple-600" size={20} />,
    '✍️': <ClipboardList className="text-indigo-600" size={20} />,
    '🔨': <ClipboardList className="text-orange-600" size={20} />,
    '🧪': <ClipboardList className="text-blue-600" size={20} />,
    '🚀': <ClipboardList className="text-purple-600" size={20} />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Phase Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center text-xl font-bold`}>
            {phase.order}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{phase.name}</h2>
            <p className="text-gray-600 mt-1">{phase.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Action Items */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Action Items for This Phase
              </h3>
              {selectedRole !== 'all' && (
                <p className="text-sm text-gray-600 mb-4 bg-blue-50 border border-blue-200 rounded p-3">
                  Showing actions for: <span className="font-semibold">{selectedRole === 'ci' ? 'Clinical Informaticist' : selectedRole === 'cmpgm' ? 'CM Program Manager' : selectedRole === 'it' ? 'IT / Applications Engineer' : selectedRole === 'systemLeader' ? 'System Leader' : 'Validator'}</span>
                </p>
              )}
              <ul className="space-y-3">
                {getFilteredActions().map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="text-purple-600 font-bold flex-shrink-0 mt-1">→</span>
                    <span className="text-gray-700">{item.action}</span>
                  </li>
                ))}
              </ul>
              {getFilteredActions().length === 0 && (
                <p className="text-gray-500 italic">No specific actions for the selected role in this phase.</p>
              )}
            </div>

            {/* Possible Outcomes */}
            {phase.outcomes.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Possible Outcomes
                </h3>
                <div className="grid gap-4">
                  {phase.outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {outcomeIcons[outcome.icon] || <span className="text-2xl">{outcome.icon}</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-900">Status:</span>
                            <span className={`font-semibold ${outcome.color}`}>"{outcome.status}"</span>
                          </div>
                          <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Meaning:</span> {outcome.meaning}
                          </p>
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">What happens:</span> {outcome.whatHappens}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Meetings */}
            {phase.meetings.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Meetings</h3>
                <ul className="space-y-2">
                  {phase.meetings.map((meeting, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      {meeting}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="text-purple-600" size={24} />
              How You'll Be Notified
            </h3>

            {/* Email Notifications */}
            {phase.notifications.email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Notification</h4>
                    <p className="text-gray-700">{phase.notifications.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Change Notifications */}
            {phase.notifications.statusChange && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Status Change in SPW</h4>
                    <p className="text-gray-700">{phase.notifications.statusChange}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Phase Notifications */}
            {phase.notifications.nextPhase && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Next Phase Opens</h4>
                    <p className="text-gray-700">{phase.notifications.nextPhase}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Check */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Manual Check</h4>
                  <p className="text-gray-700">{phase.notifications.manualCheck}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'responsibilities' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="text-purple-600" size={24} />
              Who Does What
            </h3>

            {phase.responsibilities.map((resp, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className={`font-bold text-lg mb-3 ${resp.roleColor}`}>
                  {resp.role}
                </h4>
                <ul className="space-y-2">
                  {resp.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="flex gap-3 items-start">
                      <span className="text-purple-600 font-bold flex-shrink-0">•</span>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
                {resp.contact && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Contact: <span className="font-medium">{resp.contact}</span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-purple-600" size={24} />
              Common Issues & Solutions
            </h3>

            {phase.troubleshooting.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Problem: {item.problem}</h4>
                    <div className="bg-green-50 border border-green-200 rounded p-3 mb-2">
                      <p className="text-gray-700">
                        <span className="font-semibold text-green-700">✓ Solution:</span> {item.solution}
                      </p>
                    </div>
                    {item.contactRole && (
                      <p className="text-sm text-gray-600">
                        Contact: <span className="font-medium text-purple-600">{item.contactRole}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {phase.troubleshooting.length === 0 && (
              <p className="text-gray-500 italic text-center py-8">
                No common issues documented for this phase yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
