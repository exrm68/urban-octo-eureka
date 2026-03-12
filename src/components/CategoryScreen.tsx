import { useState } from 'react';
import { motion } from 'motion/react';
import { categories, dummyContent } from '../data';
import { ShieldAlert, Search, Sparkles, ChevronRight, PlaySquare } from 'lucide-react';

interface CategoryScreenProps {
  onSelectCategory: (category: string) => void;
  user?: any;
}

// Dedicated high-quality thumbnails for each category
const categoryImages: Record<string, string> = {
  "Bangla": "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=800",
  "Hindi": "https://images.unsplash.com/photo-1585507086876-0c66b840e695?auto=format&fit=crop&q=80&w=800",
  "English": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
  "Korean": "https://images.unsplash.com/photo-1580331451062-99ff652288d7?auto=format&fit=crop&q=80&w=800",
  "Tamil": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
  "Web Series": "https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&q=80&w=800",
  "18+ Adult": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800",
};

export function CategoryScreen({ onSelectCategory, user }: CategoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Get content count for each category
  const getCategoryCount = (cat: string) => {
    return dummyContent.filter(c => c.category === cat).length;
  };

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-30 bg-transparent text-white overflow-y-auto overflow-x-hidden pb-10">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-white/10 px-5 py-4 pt-8">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight text-white drop-shadow-md">Explore</h2>
          </div>
          
          {/* Premium User Profile */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md py-1.5 px-2 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex flex-col items-end pl-2">
              <span className="font-display text-sm tracking-wide font-bold text-white drop-shadow-md leading-none">
                {user?.first_name || 'Premium'}
              </span>
              <span className="text-[9px] text-purple-300 font-medium uppercase tracking-widest mt-0.5">Pro Member</span>
            </div>
            {user?.photo_url ? (
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500 blur-[4px] opacity-50"></div>
                <img src={user.photo_url} alt={user.first_name} className="relative w-9 h-9 rounded-full object-cover border-2 border-white/20 shadow-lg" />
              </div>
            ) : (
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] border-2 border-white/20">
                <Sparkles size={14} className="text-white" />
              </div>
            )}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ক্যাটাগরি খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors backdrop-blur-md placeholder-gray-500 text-sm shadow-inner" 
          />
        </div>
      </div>

      {/* 1-Column Premium Serial List */}
      <div className="p-5 flex flex-col gap-5">
        {filteredCategories.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            কোনো ক্যাটাগরি পাওয়া যায়নি
          </div>
        ) : (
          filteredCategories.map((cat, idx) => {
            const count = getCategoryCount(cat);
            const bgImage = categoryImages[cat] || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800';

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                onClick={() => onSelectCategory(cat)}
                className="group relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white/10 active:scale-[0.98] transition-all bg-zinc-900"
              >
                {/* Dedicated Category Background Image */}
                <img 
                  src={bgImage} 
                  alt={cat} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Subtle Gradient for Text Readability (Only at bottom) */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Small Video Count Badge (Top Right) */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
                  <PlaySquare size={10} className="text-purple-400" />
                  <span className="text-white text-[10px] font-bold tracking-wider">{count}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-5 flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-display font-bold text-2xl sm:text-3xl tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {cat}
                    </h3>
                  </div>
                  
                  {/* Action Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-xl">
                    <ChevronRight size={24} className="text-current ml-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer / Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 pt-6 border-t border-white/10 text-center pb-8"
      >
        <div className="flex justify-center items-center gap-2 mb-3">
          <ShieldAlert size={16} className="text-gray-500" />
          <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Secure & Private</span>
        </div>
        <p className="text-gray-600 text-[11px] leading-relaxed max-w-xs mx-auto mb-4">
          ⚠️ <strong className="text-gray-400">Disclaimer:</strong> Some categories may contain age-restricted (18+) content. Viewer discretion is advised.
        </p>
        <p className="text-gray-700 text-[10px] mt-4">© 2024 Premium Hub. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
