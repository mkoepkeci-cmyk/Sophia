interface PlainOverviewProps {
  content: string;
}

export function PlainOverview({ content }: PlainOverviewProps) {
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          const title = line.replace(/^##\s*\*\*(.*?)\*\*/, '$1').replace(/^##\s*/, '');
          // Skip rendering phase title headers like "PHASE X: NAME"
          if (title.match(/^PHASE\s+\d+:/i)) {
            return null;
          }
          return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{title}</h2>;
        }

        if (line.startsWith('### ')) {
          const title = line.replace(/^###\s*\*\*(.*?)\*\*/, '$1').replace(/^###\s*/, '');
          return <h3 key={index} className="text-xl font-bold text-gray-800 mt-5 mb-3">{title}</h3>;
        }

        if (line.startsWith('**') && line.endsWith(':**')) {
          const label = line.replace(/^\*\*/, '').replace(/:\*\*$/, '');
          return <p key={index} className="font-bold text-gray-900 mt-4 mb-2">{label}:</p>;
        }

        if (line.match(/^\d+\.\s/)) {
          const text = line.replace(/^\d+\.\s/, '');
          return (
            <div key={index} className="ml-6 mb-2">
              <span className="font-semibold text-gray-900">{line.match(/^\d+/)}.&nbsp;</span>
              <span
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: text
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                    .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-[#00A3E0]/10 text-[#00A3E0] text-xs font-medium px-2 py-1 rounded">$1</span>')
                }}
              />
            </div>
          );
        }

        if (line.trim().startsWith('- ')) {
          const text = line.trim().replace(/^-\s*/, '');
          return (
            <div key={index} className="flex gap-3 ml-6 mb-2">
              <span className="text-[#00A3E0] font-bold flex-shrink-0">•</span>
              <span
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: text
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                    .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-[#00A3E0]/10 text-[#00A3E0] text-xs font-medium px-2 py-1 rounded">$1</span>')
                }}
              />
            </div>
          );
        }

        if (line.trim() === '---') {
          return <hr key={index} className="my-6 border-gray-300" />;
        }

        if (line.trim() && !line.startsWith('#')) {
          return (
            <p
              key={index}
              className="text-gray-700 mb-3 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">$1</span>')
              }}
            />
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="space-y-2">
      {formatContent(content)}
    </div>
  );
}
