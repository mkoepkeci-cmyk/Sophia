import { ExternalLink, Download, Phone, MessageCircle, Map } from 'lucide-react';

interface QuickActionsProps {
  onOpenSophia?: () => void;
}

export function QuickActions({ onOpenSophia }: QuickActionsProps) {
  return (
    <div className="bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Open SPW */}
          <a
            href="https://commonspirit.service-now.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <ExternalLink size={16} />
            Open SPW
          </a>

          {/* Download Guide */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Download size={16} />
            Download Guide
          </button>

          {/* View Process Map */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Map size={16} />
            Process Map
          </button>

          {/* Contact Help */}
          <a
            href="mailto:support@commonspirit.org"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Phone size={16} />
            Contact Help
          </a>

          {/* Ask Sophia */}
          {onOpenSophia && (
            <button
              onClick={onOpenSophia}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <MessageCircle size={16} />
              Ask Sophia
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
