import { categories } from '../data';

export function CategoryBar({ active, setActive }: { active: string, setActive: (c: string) => void }) {
  return (
    <div className="sticky top-0 z-40 bg-[#030303]/70 backdrop-blur-2xl border-b border-white/5 py-3">
      <div className="flex gap-2.5 overflow-x-auto px-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
              active === cat 
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-500/50' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
