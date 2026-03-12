import { Home, Search, Download, User } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'downloads', icon: Download, label: 'Downloads' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Gradient fade for content behind nav */}
      <div className="absolute bottom-full left-0 w-full h-16 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
      
      <div className="glass-panel bg-[#030303]/80 backdrop-blur-2xl border-t border-white/10 pb-safe pt-3 px-6 flex justify-between items-center h-[72px]">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1.5 relative w-16"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-purple-400 -translate-y-1 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-gray-500 hover:text-gray-300'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-semibold tracking-wide transition-all duration-300 ${isActive ? 'text-purple-400 opacity-100' : 'text-gray-500 opacity-0 translate-y-2'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-b-full shadow-[0_0_12px_rgba(168,85,247,1)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
