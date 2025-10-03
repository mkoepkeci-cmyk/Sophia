import { ChatMessage as ChatMessageType } from '../lib/supabase';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.is_user;

  // Detect phase mentions for color coding
  const getPhaseColor = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('intake')) return 'border-l-4 border-l-[#C71585]';
    if (lowerText.includes('vetting') || lowerText.includes('periscope') || lowerText.includes('prioritization') || lowerText.includes('scope')) return 'border-l-4 border-l-[#4169E1]';
    if (lowerText.includes('define')) return 'border-l-4 border-l-[#800080]';
    if (lowerText.includes('design')) return 'border-l-4 border-l-[#FF8C00]';
    if (lowerText.includes('develop') || lowerText.includes('deploy')) return 'border-l-4 border-l-[#008B8B]';
    return null;
  };

  const phaseColorClass = !isUser ? getPhaseColor(message.message) : null;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
        isUser ? 'bg-[#4169E1]' : 'bg-[#A7226E]'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" strokeWidth={1.5} />
        ) : (
          <Bot className="w-5 h-5 text-white" strokeWidth={1.5} />
        )}
      </div>

      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#4169E1] text-white'
            : `bg-white border border-slate-200 text-slate-800 ${phaseColorClass || ''}`
        }`}>
          <div className={`text-sm leading-relaxed whitespace-pre-wrap ${!isUser ? 'font-semibold' : ''}`}>{message.message}</div>
        </div>
      </div>
    </div>
  );
}
