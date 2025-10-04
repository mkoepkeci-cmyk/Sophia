import { useState } from 'react';
import { CheckCircle, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';

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
    if (line.match(/^##[#]?\s*\*\*/)) {
      if (currentSection && currentQA) {
        currentSection.items.push(currentQA);
        currentQA = null;
      }
      if (currentSection) {
        sections.push(currentSection);
      }
      const title = line.replace(/^##[#]?\s*\*\*(.*?)\*\*/, '$1');
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-200">
            <CheckCircle className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
          </div>

          <div className="space-y-3 ml-2">
            {section.items.map((item, itemIdx) => {
              const itemKey = `${sectionIdx}-${itemIdx}`;
              const isExpanded = expandedItems.has(itemKey);

              return (
                <div key={itemIdx} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleItem(itemKey)}
                    className="w-full flex items-start gap-3 p-5 text-left hover:bg-gray-100 transition-colors"
                  >
                    <HelpCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <h4 className="text-base font-semibold text-gray-900 flex-1">{item.question}</h4>
                    {isExpanded ? (
                      <ChevronDown className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                    ) : (
                      <ChevronRight className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                    )}
                  </button>

                  <div
                    className={`ml-8 mr-5 overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[2000px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                    }`}
                  >
                  {item.answer && (
                    <p
                      className="text-gray-700 leading-relaxed mb-2"
                      dangerouslySetInnerHTML={{
                        __html: item.answer
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-1">$1</span>')
                      }}
                    />
                  )}

                  {item.listItems && item.listItems.length > 0 && (
                    <ul className="space-y-3 mt-3">
                      {item.listItems.map((listItem, listIdx) => {
                        const isRoleSpecific = listItem.trim().startsWith('[') && listItem.includes(']');
                        const hasNestedList = listItem.includes('\n  -') || (listIdx + 1 < item.listItems!.length && item.listItems![listIdx + 1].startsWith('  -'));

                        if (listItem.trim().startsWith('  -')) {
                          return (
                            <li key={listIdx} className="flex gap-3 items-start ml-6">
                              <span className="text-gray-400 font-bold flex-shrink-0 mt-0.5">◦</span>
                              <span
                                className="text-gray-600 text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: listItem.trim().replace(/^-\s*/, '')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                }}
                              />
                            </li>
                          );
                        }

                        if (isRoleSpecific) {
                          return (
                            <li key={listIdx} className="bg-blue-50 border-l-4 border-blue-400 rounded-r p-3 -ml-3">
                              <span
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: listItem
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                    .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">$1</span>')
                                }}
                              />
                            </li>
                          );
                        }

                        return (
                          <li key={listIdx} className="flex gap-3 items-start">
                            <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">•</span>
                            <span
                              className="text-gray-700 flex-1"
                              dangerouslySetInnerHTML={{
                                __html: listItem
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                  .replace(/\[([^\]]+)\]/g, '<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-1">$1</span>')
                              }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
