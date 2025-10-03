import { CheckCircle, HelpCircle } from 'lucide-react';

interface FormattedOverviewProps {
  content: string;
}

interface Section {
  title: string;
  items: QAItem[];
}

interface QAItem {
  question: string;
  answer: string;
  isList?: boolean;
  listItems?: string[];
  isNote?: boolean;
}

function parseContent(content: string): Section[] {
  const lines = content.split('\n');
  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let currentQA: QAItem | null = null;

  for (const line of lines) {
    if (line.startsWith('### **')) {
      if (currentSection && currentQA) {
        currentSection.items.push(currentQA);
        currentQA = null;
      }
      if (currentSection) {
        sections.push(currentSection);
      }
      const title = line.replace(/###\s*\*\*(.*?)\*\*/, '$1');
      currentSection = { title, items: [] };
    } else if (line.startsWith('**Q:')) {
      if (currentQA && currentSection) {
        currentSection.items.push(currentQA);
      }
      const question = line.replace(/\*\*Q:\s*(.*?)\*\*/, '$1');
      currentQA = { question, answer: '', listItems: [] };
    } else if (line.startsWith('A:')) {
      if (currentQA) {
        currentQA.answer = line.replace(/^A:\s*/, '');
      }
    } else if (line.startsWith('- ') && currentQA) {
      if (!currentQA.listItems) currentQA.listItems = [];
      currentQA.listItems.push(line.replace(/^-\s*/, ''));
      currentQA.isList = true;
    } else if (line.trim() && currentQA && !line.startsWith('---') && !line.startsWith('##')) {
      if (currentQA.answer) {
        currentQA.answer += ' ' + line.trim();
      }
    }
  }

  if (currentQA && currentSection) {
    currentSection.items.push(currentQA);
  }
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export function FormattedOverview({ content }: FormattedOverviewProps) {
  const sections = parseContent(content);

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-200">
            <CheckCircle className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
          </div>

          <div className="space-y-6 ml-2">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <h4 className="text-base font-semibold text-gray-900">{item.question}</h4>
                </div>

                <div className="ml-8">
                  {item.answer && (
                    <p
                      className="text-gray-700 leading-relaxed mb-2"
                      dangerouslySetInnerHTML={{
                        __html: item.answer
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">$1</span>')
                      }}
                    />
                  )}

                  {item.listItems && item.listItems.length > 0 && (
                    <ul className="space-y-2 mt-3">
                      {item.listItems.map((listItem, listIdx) => (
                        <li key={listIdx} className="flex gap-3 items-start">
                          <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">•</span>
                          <span
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: listItem
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-1">$1</span>')
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
