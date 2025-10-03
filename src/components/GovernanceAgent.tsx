import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Users, GitBranch, Trash2, Calendar, ClipboardList } from 'lucide-react';
import { useGovernanceAgent } from '../hooks/useGovernanceAgent';

export function GovernanceAgent() {
  const {
    chatHistory,
    isLoading,
    sendMessage,
    clearChat
  } = useGovernanceAgent();

  const [inputMessage, setInputMessage] = useState('');
  const [activeView, setActiveView] = useState('chat');
  const [systemFilter, setSystemFilter] = useState('both');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    await sendMessage(message);
    inputRef.current?.focus();
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    inputRef.current?.focus();
  };

  const quickActions = [
    { text: "What happens at PeriSCOPE?", icon: Calendar },
    { text: "What happens at SCOPE?", icon: Calendar },
    { text: "My status is Further Review Needed", icon: ClipboardList },
    { text: "Explain the Design phase", icon: GitBranch },
    { text: "What's the difference between Epic and Cerner?", icon: GitBranch },
    { text: "When does FETR open?", icon: BookOpen }
  ];

  const phases = [
    {
      name: "Intake",
      description: "Initial submission and internal review",
      color: "#C71585",
    },
    {
      name: "Vetting & Prioritization",
      description: "PeriSCOPE and SCOPE review meetings",
      color: "#4169E1",
    },
    {
      name: "Define",
      description: "Detailed requirements gathering with Clinical Service Line",
      color: "#800080",
      optional: true,
    },
    {
      name: "Design",
      description: "Design sessions and approvals",
      color: "#FF8C00",
    },
    {
      name: "Develop & Deploy",
      description: "Build, test, and release",
      color: "#008B8B",
    }
  ];

  const meetings = [
    {
      name: "PeriSCOPE Meeting",
      phase: "Vetting & Prioritization",
      purpose: "Initial vetting of enhancement requests after intake",
      attendees: ["Change Mgmt Program Manager (lead)", "Clinical Informaticists", "IT Representatives"],
    },
    {
      name: "SCOPE Meeting",
      phase: "Vetting & Prioritization",
      purpose: "Prioritization and determination if Define is needed",
      attendees: ["IT Process Owner", "Clinical Leadership", "Change Management"],
    },
    {
      name: "CLS Define Body Meeting",
      phase: "Define",
      purpose: "Detailed requirements review with service line",
      ledBy: "Requesting Clinical Informaticist with CLS group representative",
    },
    {
      name: "Effort Scoring Meeting",
      phase: "Vetting & Prioritization",
      purpose: "Estimate resource requirements",
      timing: "After Prioritization Task",
    },
    {
      name: "Refinement (Epic)",
      phase: "Design",
      purpose: "Design review and refinement for Epic requests",
    },
    {
      name: "Design Review Call (Cerner)",
      phase: "Design",
      purpose: "Design review for Cerner requests",
    }
  ];

  const roles = [
    {
      name: "Requesting Clinical Informaticist",
      color: "#87CEEB",
      responsibilities: [
        "Submit CI Intake Form to create Demand",
        "Respond to Further Review requests (ticket returns to you)",
        "Lead Define phase - work with CLS group representative",
        "Participate in design sessions",
        "Host design sessions with IT (Epic only)"
      ]
    },
    {
      name: "Change Mgmt Program Manager",
      color: "#DDA0DD",
      responsibilities: [
        "Add items to PeriSCOPE agenda when Vetting Status: Ready for Agenda",
        "Update status based on PeriSCOPE decisions",
        "Manage vetting task throughout process"
      ]
    },
    {
      name: "IT Process Owner",
      color: "#90EE90",
      responsibilities: [
        "Manage prioritization task",
        "Participate in SCOPE meetings",
        "Assign IT resources after design complete"
      ]
    },
    {
      name: "IT Analyst",
      color: "#FFD700",
      responsibilities: [
        "Schedule design sessions (once resources assigned)",
        "Build in Non-Prod environment",
        "Update status to Testing and email validators",
        "Build in Prod environment",
        "Assign release dates",
        "Update all build-related statuses"
      ]
    }
  ];

  const renderQuickActions = () => (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <p className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, idx) => {
          const IconComponent = action.icon;
          return (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.text)}
              className="text-left p-2 bg-white border border-gray-200 rounded hover:bg-blue-50 text-sm transition-colors flex items-start gap-2"
            >
              <IconComponent size={16} className="mt-0.5 flex-shrink-0 text-gray-600" />
              <span className="flex-1">{action.text.length > 25 ? action.text.substring(0, 25) + '...' : action.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderProcessOverview = () => (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">SPM Governance Process Overview</h2>

      <div className="space-y-4">
        {phases.map((phase, idx) => (
          <div key={idx} className="border-l-4 pl-4 py-2" style={{ borderColor: phase.color }}>
            <h3 className="font-bold text-lg" style={{ color: phase.color }}>{phase.name}</h3>
            <p className="text-gray-700 text-sm mt-1">{phase.description}</p>
            {phase.optional && <p className="text-orange-600 text-sm mt-1">⚠️ Optional phase</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2 text-gray-800">Process Flow:</h3>
        <div className="text-sm text-gray-700">
          Intake → Vetting & Prioritization → Define (optional) → Design → Develop & Deploy
        </div>
      </div>
    </div>
  );

  const renderMeetingGuide = () => (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Meeting Guide</h2>

      <div className="space-y-4">
        {meetings.map((meeting, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-lg text-blue-600">{meeting.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Phase: {meeting.phase}</p>
            <p className="text-gray-700 mt-2">{meeting.purpose}</p>
            {meeting.attendees && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-800">Attendees:</p>
                <ul className="text-sm text-gray-600 ml-4">
                  {meeting.attendees.map((a, i) => <li key={i}>• {a}</li>)}
                </ul>
              </div>
            )}
            {meeting.ledBy && (
              <p className="text-sm text-gray-600 mt-2"><strong>Led by:</strong> {meeting.ledBy}</p>
            )}
            {meeting.timing && (
              <p className="text-sm text-gray-600 mt-2"><strong>Timing:</strong> {meeting.timing}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoleGuide = () => (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Role Guide</h2>

      <div className="space-y-4">
        {roles.map((role, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4" style={{ borderLeftWidth: '4px', borderLeftColor: role.color }}>
            <h3 className="font-bold text-lg text-gray-800">{role.name}</h3>
            <div className="mt-2">
              <p className="text-sm font-medium mb-2 text-gray-700">Key Responsibilities:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {role.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src="/Cheerful Woman with Voluminous Curls.png"
              alt="Sophia"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold">Sophia</h1>
              <p className="text-sm opacity-90">Your SPM Governance Assistant</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {chatHistory.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors"
                title="Clear chat history"
              >
                <Trash2 size={16} />
                Clear Chat
              </button>
            )}
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="px-3 py-1 rounded bg-white text-gray-800 text-sm font-medium"
            >
              <option value="both">Both Systems</option>
              <option value="epic">Epic Only</option>
              <option value="cerner">Cerner Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-6xl mx-auto w-full">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">Navigation</h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            <button
              onClick={() => setActiveView('chat')}
              className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                activeView === 'chat' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Send size={20} />
              <span>Chat Assistant</span>
            </button>

            <button
              onClick={() => setActiveView('overview')}
              className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                activeView === 'overview' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <GitBranch size={20} />
              <span>Process Overview</span>
            </button>

            <button
              onClick={() => setActiveView('meetings')}
              className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                activeView === 'meetings' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Calendar size={20} />
              <span>Meeting Guide</span>
            </button>

            <button
              onClick={() => setActiveView('roles')}
              className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                activeView === 'roles' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Users size={20} />
              <span>Role Guide</span>
            </button>
          </div>

          {activeView === 'chat' && renderQuickActions()}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {activeView === 'chat' ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <img
                      src="/Cheerful Woman with Voluminous Curls.png"
                      alt="Sophia"
                      className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-xl mb-6"
                    />
                    <h2 className="text-3xl font-bold text-purple-600 mb-4">
                      Hi! I'm Sophia, your SPM Governance Assistant
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mb-6">
                      Ask me anything about the enhancement request process:
                    </p>
                    <ul className="text-left text-gray-600 space-y-2 mb-8">
                      <li>• What happens at meetings (PeriSCOPE, SCOPE, etc.)?</li>
                      <li>• Who's responsible for tasks?</li>
                      <li>• What do status updates mean?</li>
                      <li>• How to navigate any phase?</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Try: "What happens at PeriSCOPE?" or "My status is Further Review Needed"
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.is_user ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-2xl ${
                        msg.is_user ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                      } rounded-lg p-4 shadow`}>
                        <div className="whitespace-pre-line text-sm leading-relaxed">{msg.message}</div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4 shadow">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="animate-pulse">Thinking...</div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2 max-w-4xl mx-auto">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything about the SPM governance process..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
                  >
                    <Send size={20} />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : activeView === 'overview' ? (
            renderProcessOverview()
          ) : activeView === 'meetings' ? (
            renderMeetingGuide()
          ) : (
            renderRoleGuide()
          )}
        </div>
      </div>
    </div>
  );
}
