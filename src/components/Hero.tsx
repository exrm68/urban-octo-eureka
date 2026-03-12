import { useState, useEffect } from 'react';
import { Play, Plus } from 'lucide-react';
import { dummyContent } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function Hero({ onWatch }: { onWatch: (title: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroItems = dummyContent.slice(0, 3); // Use first 3 items as hero

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden bg-[#030303]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={heroItems[currentIndex].imageUrl}
          alt={heroItems[currentIndex].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-[#030303]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-10 flex flex-col gap-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            {heroItems[currentIndex].badges?.includes('NEW') && (
              <span className="text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                New Release
              </span>
            )}
            <h1 className="font-display text-5xl sm:text-7xl leading-[0.9] tracking-wide text-white drop-shadow-2xl">
              {heroItems[currentIndex].title}
            </h1>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-300 mt-1">
              <span className="text-amber-400 flex items-center gap-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                ★ {heroItems[currentIndex].rating}
              </span>
              <span className="text-gray-600">•</span>
              <span className="tracking-wide">{heroItems[currentIndex].genre}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3 pt-4">
          <button 
            onClick={() => onWatch(heroItems[currentIndex].title)}
            className="flex-1 bg-white text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <Play size={20} fill="currentColor" />
            WATCH NOW
          </button>
          <button className="flex-1 glass-panel text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-white/10 border border-white/20">
            <Plus size={20} />
            WATCHLIST
          </button>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {heroItems.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
