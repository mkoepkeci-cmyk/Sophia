import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Loader2 } from 'lucide-react';
import { phasesData } from '../data/phasesData';
import { askSophia, isClaudeConfigured } from '../services/claudeService';
import { logQuestion } from '../services/analyticsService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SophiaChatProps {
  onClose: () => void;
}

export function SophiaChat({ onClose }: SophiaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Sophia, your EHR Process Navigator assistant. Ask me anything about the governance process, like 'Who updates prioritization?' or 'What happens at SCOPE?'"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useClaudeAI, setUseClaudeAI] = useState(isClaudeConfigured());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const answerQuestion = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const phases = Object.values(phasesData);

    // Handle greetings and personal messages - Don't give governance info
    const greetingPatterns = [
      /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
      /my name is/i,
      /i am |i'm /i,
      /^(thanks|thank you|thx)/i,
      /^(ok|okay|sure|cool|great)/i
    ];

    if (greetingPatterns.some(pattern => pattern.test(lowerQuestion))) {
      return "Hello! I'm here to help with EHR governance process questions. Ask me about phases, meetings, statuses, or responsibilities!";
    }

    // Question: Who updates [something]
    if (lowerQuestion.includes('who updates') || lowerQuestion.includes('who changes')) {
      if (lowerQuestion.includes('prioritization') || lowerQuestion.includes('priority')) {
        return "The **CM Program Manager** updates the prioritization status after the SCOPE meeting. They document the ranked priority (1-10) and update the status based on the SCOPE committee's decision.";
      }
      if (lowerQuestion.includes('status')) {
        return "Status updates depend on the phase:\n\n• **Intake**: System Informatics Leader updates to 'Approved'\n• **Vetting**: CM Program Manager updates after PeriSCOPE\n• **Prioritization**: CM Program Manager updates after SCOPE\n• **Design**: You (CI) or IT updates as design progresses\n• **Build & Test**: IT updates to 'Testing', validators update when complete";
      }
    }

    // Question: What happens at [meeting]
    if (lowerQuestion.includes('what happens at') || lowerQuestion.includes('what is')) {
      if (lowerQuestion.includes('periscope')) {
        return "**PeriSCOPE Meeting** is the initial governance review during the Vetting phase. The CM Program Manager presents your request to review completeness and feasibility. Outcomes can be:\n\n✅ Ready for Prioritization (moves to SCOPE)\n⚠️ Further Review Needed (back to Intake)\n❌ Dismissed (rejected)";
      }
      if (lowerQuestion.includes('scope')) {
        return "**SCOPE Meeting** happens during the Prioritization phase. The committee:\n\n• Reviews your effort scoring\n• Assigns a priority ranking (1-10)\n• Decides next steps\n\nPossible outcomes: Ready for Design, Further Review Needed, Dismissed, or Needs Define (Clinical Service Line approval required).";
      }
    }

    // Question: How am I notified / How do I know
    if (lowerQuestion.includes('how am i notified') || lowerQuestion.includes('how do i know') || lowerQuestion.includes('notification')) {
      if (lowerQuestion.includes('priorit')) {
        return "You'll be notified about prioritization through:\n\n📧 **Email**: When CM PgM adds your request to SCOPE agenda\n🔄 **Status Change**: After SCOPE meeting, status updates in SPW\n💡 **Manual Check**: Search your DMND number in SPW anytime";
      }
      return "Notifications vary by phase but typically include:\n\n📧 Email notifications at key milestones\n🔄 Status changes in SPW (Strategic Planning Workspace)\n⏭️ Automatic task creation when moving to next phase\n💡 You can always search your DMND number in SPW to check current status";
    }

    // Question: What does [status] mean
    if (lowerQuestion.includes('further review needed') || lowerQuestion.includes('further review')) {
      return "**'Further Review Needed'** means additional information is required. This can happen at:\n\n• **Vetting (PeriSCOPE)**: Request needs more details - Intake task reopens\n• **Prioritization (SCOPE)**: Committee needs clarification - Intake task reopens\n\nYou'll need to provide the missing information, then the request goes back through the review process.";
    }
    if (lowerQuestion.includes('dismissed')) {
      return "**'Dismissed'** means your request has been rejected. This can happen at:\n\n• **PeriSCOPE**: Request doesn't align with governance\n• **SCOPE**: Committee decides not to prioritize\n• **Clinical Service Line**: No clinical sponsorship\n\nThe request closes permanently when dismissed.";
    }
    if (lowerQuestion.includes('ready for design')) {
      return "**'Ready for Design'** means your request has been approved and prioritized! Next steps:\n\n✅ Prioritization task closes\n✅ Design task automatically opens\n📊 You have a priority ranking (1-10)\n🎨 Time to schedule design sessions";
    }

    // Removed broad phase matching - was returning 500-line descriptions inappropriately

    // Question: Who is responsible
    if (lowerQuestion.includes('responsible') || lowerQuestion.includes('who does')) {
      if (lowerQuestion.includes('design')) {
        return "**Design Phase Responsibilities**:\n\n👤 **You (CI)**: Lead design sessions, document decisions, identify validators\n💻 **IT Applications Engineer**: Participates in design, completes technical specs\n🏢 **Regional CIs** (Cerner): Attend sessions for their region";
      }
      return "Responsibilities vary by phase. The main roles are:\n\n👤 **Clinical Informaticist (CI)**: Leads the request through all phases\n💼 **CM Program Manager**: Manages governance meetings (PeriSCOPE, SCOPE)\n💻 **IT**: Builds and deploys changes\n🏥 **System Leader**: Approves initial intake\n✅ **Validators**: Test builds in non-prod and prod";
    }

    // Question: Effort scoring
    if (lowerQuestion.includes('effort scoring') || lowerQuestion.includes('effort score')) {
      return "**Effort Scoring** happens in the Prioritization phase:\n\n• You meet with System Informaticists and IT\n• Both CI and IT complete their scoring sections\n• After BOTH complete scoring, update Status to 'Ready for Agenda'\n• This triggers adding your request to the SCOPE meeting agenda";
    }

    // Question: Validators
    if (lowerQuestion.includes('validator') || lowerQuestion.includes('validation')) {
      return "**Validators** are identified during the Design phase:\n\n✅ They test in non-prod when Status = 'Testing'\n✅ They test in production after deployment\n✅ The FINAL validator updates status to 'Validated Successfully'\n\nChoose validators with: access to affected environment, workflow knowledge, and testing ability.";
    }

    // Question: DMND number
    if (lowerQuestion.includes('dmnd') || lowerQuestion.includes('demand number')) {
      return "Your **DMND number** is created automatically when you submit the Intake form. You'll receive it via email confirmation. Use it to:\n\n🔍 Search for your request in SPW\n📁 Name your Google Drive folder: 'DMD####### Title'\n📊 Track progress through all phases";
    }

    // Generic search through phase data
    for (const phase of phases) {
      // Check troubleshooting
      for (const item of phase.troubleshooting) {
        if (item.problem.toLowerCase().includes(lowerQuestion.slice(0, 20)) ||
            lowerQuestion.includes(item.problem.toLowerCase().slice(0, 20))) {
          return `**Problem**: ${item.problem}\n\n**Solution**: ${item.solution}${item.contactRole ? `\n\n📞 Contact: ${item.contactRole}` : ''}`;
        }
      }
    }

    // Default response
    return "I can help you with questions like:\n\n• 'Who updates prioritization?'\n• 'What happens at SCOPE?'\n• 'How am I notified?'\n• 'What does Further Review Needed mean?'\n• 'Who is responsible for design?'\n• 'What is effort scoring?'\n\nTry asking about specific phases, meetings, statuses, or roles!";
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    const currentInput = inputMessage;

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let answer: string;

      // Always check if Claude is configured (in case .env was updated)
      const claudeIsConfigured = isClaudeConfigured();
      console.log('Claude configured:', claudeIsConfigured, 'useClaudeAI state:', useClaudeAI);

      if (claudeIsConfigured) {
        // Use Claude AI for enhanced responses
        console.log('Using Claude AI for response');
        const conversationHistory = messages.slice(1); // Exclude initial greeting
        answer = await askSophia(currentInput, conversationHistory);

        // Enable Claude AI for future messages if it worked
        if (!useClaudeAI) {
          setUseClaudeAI(true);
        }
      } else {
        // Fallback to pattern matching
        console.log('Using pattern matching fallback');
        answer = answerQuestion(currentInput);
        // Simulate network delay for consistency
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const assistantMessage: Message = { role: 'assistant', content: answer };
      setMessages(prev => [...prev, assistantMessage]);

      // Log question and response to analytics (non-blocking)
      logQuestion({
        question: currentInput,
        response: answer,
        used_claude_ai: useClaudeAI
      }).catch(err => console.error('Failed to log analytics:', err));
    } catch (error) {
      console.error('Error getting response:', error);

      // Fallback to pattern matching on error
      const fallbackAnswer = answerQuestion(currentInput);
      const assistantMessage: Message = {
        role: 'assistant',
        content: useClaudeAI
          ? `I'm having trouble connecting to my enhanced AI system right now. Here's what I can tell you:\n\n${fallbackAnswer}\n\n(I'll try using AI again for your next question)`
          : fallbackAnswer
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Don't permanently disable Claude AI - let it retry on next message
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/Cheerful Woman with Voluminous Curls.png"
            alt="Sophia"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="font-bold">Ask Sophia</h3>
            <p className="text-xs opacity-90">EHR Process Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-900">
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <p className="text-sm">Sophia is thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
