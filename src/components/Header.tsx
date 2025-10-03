export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}
