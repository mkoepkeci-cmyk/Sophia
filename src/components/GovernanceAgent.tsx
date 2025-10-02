import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, FileText, Trash2 } from 'lucide-react';
import { useGovernanceAgent } from '../hooks/useGovernanceAgent';
import { ChatMessage } from './ChatMessage';

export function GovernanceAgent() {
  const {
    selectedProcess,
    chatHistory,
    isLoading,
    sendMessage,
    clearChat
  } = useGovernanceAgent();

  const [inputMessage, setInputMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setShowWelcome(false);
    const message = inputMessage;
    setInputMessage('');

    await sendMessage(message);
  };

  const handleQuickAction = async (action: string) => {
    setShowWelcome(false);
    setInputMessage(action);
    await sendMessage(action);
    inputRef.current?.focus();
  };

  const handleClearChat = async () => {
    await clearChat();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full shadow-md overflow-hidden flex-shrink-0">
              <img
                src="/Cheerful Woman with Voluminous Curls.png"
                alt="Sophia"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#A7226E]">Sophia</h1>
              <p className="text-sm text-slate-600">
                Your Personal EHR Governance Assistant
              </p>
            </div>
          </div>

          {chatHistory.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
              title="Clear chat history"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[calc(100vh-180px)]">
              <div className="flex-1 overflow-y-auto p-6">
                {showWelcome && chatHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <h2 className="text-3xl font-bold text-[#A7226E] mb-4">
                      Hi, I'm Sophia!
                    </h2>
                    <p className="text-lg text-slate-600 max-w-md mb-8">
                      Your personal EHR governance assistant. I'm here to guide you through the {selectedProcess?.name || 'process'} step by step.
                      Ask me about your current phase, what's next, or any questions about the governance process.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                      <button
                        onClick={() => handleQuickAction("Let's get started")}
                        className="px-4 py-2 bg-[#A7226E] text-white text-sm font-semibold rounded-lg hover:bg-[#8B1B5A] transition-colors"
                      >
                        Get Started
                      </button>
                      <button
                        onClick={() => handleQuickAction("What's my current step?")}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Current Step
                      </button>
                      <button
                        onClick={() => handleQuickAction("Show me all steps")}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        See All Steps
                      </button>
                    </div>
                  </div>
                )}

                {chatHistory.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#A7226E] flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                    <div className="text-sm text-slate-500">Thinking...</div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-slate-200 p-4 bg-slate-50">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me about your governance process..."
                    className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A7226E] focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-5 py-3 bg-[#A7226E] text-white rounded-lg hover:bg-[#8B1B5A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Send</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
