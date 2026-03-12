import React from 'react';
import { Play, Download, Lock } from 'lucide-react';
import { ContentItem } from '../data';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

export function ContentCard({ item, onWatch }: { item: ContentItem, onWatch: (title: string) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the parallax tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation angles (subtle tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative group flex-shrink-0 w-[160px] sm:w-[180px] flex flex-col gap-2 cursor-pointer"
    >
      {/* Card Container with Glow Effect */}
      <div 
        className={`relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] group-hover:ring-purple-500/60 ${item.isAdult ? 'blur-[10px] scale-105' : ''}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Real Image Background with Parallax Depth */}
        <motion.img 
          src={item.imageUrl} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transform: "translateZ(-20px)" }}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent opacity-90" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10" style={{ transform: "translateZ(30px)" }}>
          {item.badges.map(badge => (
            <span key={badge} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider ${
              badge === 'NEW' ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 
              badge === '18+' ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 
              badge === 'TOP' ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
              'bg-black/60 text-white backdrop-blur-md border border-white/10'
            }`}>
              {badge}
            </span>
          ))}
        </div>

        {/* Hover/Tap Overlay */}
        <div 
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3 z-20 backdrop-blur-[2px]"
          style={{ transform: "translateZ(40px)" }}
        >
          {item.isAdult ? (
            <button className="bg-red-600/90 hover:bg-red-500 text-white rounded-full p-3 backdrop-blur-md transition-transform hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.6)]">
              <Lock size={20} />
            </button>
          ) : (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); onWatch(item.title); }}
                className="bg-purple-600/90 hover:bg-purple-500 text-white rounded-full p-3 backdrop-blur-md transition-transform hover:scale-110 shadow-[0_0_20px_rgba(147,51,234,0.6)]"
              >
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-transform hover:scale-110 border border-white/20">
                <Download size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1 mt-1" style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-display text-lg leading-tight truncate tracking-wide text-gray-100 group-hover:text-purple-400 transition-colors">{item.title}</h3>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
          <span className="text-amber-400 flex items-center gap-0.5 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">★ {item.rating}</span>
          <span className="text-gray-600">•</span>
          <span className="truncate">{item.genre}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
          <span>{item.year}</span>
          {item.type === 'series' && item.episodes && (
            <>
              <span className="text-gray-600">•</span>
              <span className="text-purple-400/90">{item.episodes.length} Episodes</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
