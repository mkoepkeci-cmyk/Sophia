import { Search } from 'lucide-react';

interface HeaderProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export function Header({ selectedRole, onRoleChange, searchQuery, onSearchChange, onSearchSubmit }: HeaderProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row: Branding */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/Cheerful Woman with Voluminous Curls.png"
            alt="Sophia"
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-bold">EHR Process Navigator</h1>
            <p className="text-sm opacity-90">Reference Guide - CommonSpirit Health</p>
          </div>
        </div>

        {/* Bottom Row: Search and Role Selector */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-white opacity-75" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search guide (e.g., 'who updates prioritization', 'how am I notified')"
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition-colors"
              />
            </div>
            <button
              onClick={onSearchSubmit}
              className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Search
            </button>
          </div>

          {/* Role Selector */}
          <div className="sm:w-64">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="ci">Clinical Informaticist (CI)</option>
              <option value="cmpgm">CM Program Manager</option>
              <option value="it">IT / Applications Engineer</option>
              <option value="systemLeader">System Leader</option>
              <option value="validator">Validator</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
