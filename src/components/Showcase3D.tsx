import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Eye, Trophy, Info } from 'lucide-react';
import { ContentItem } from '../data';

interface Showcase3DProps {
  items: ContentItem[];
  onWatch: (item: ContentItem) => void;
  onInfo: (item: ContentItem) => void;
}

export function Showcase3D({ items, onWatch, onInfo }: Showcase3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Reset index if items change (e.g., category switch)
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const activeItem = items[currentIndex] || items[0];

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000); // 4 seconds interval
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, items.length, currentIndex]);

  // Format viewers count (e.g., 12500 -> 12.5K)
  const formatViewers = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!activeItem) return null;

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#050505] flex flex-col items-center justify-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Dynamic Blurred Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={activeItem.id}
          src={activeItem.imageUrl}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover blur-[80px] saturate-150 opacity-50"
        />
      </AnimatePresence>
      
      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29]/90 via-transparent to-[#050505] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] z-0" />

      {/* 3D Coverflow Stage with Framer Motion Drag */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, { offset }) => {
          const swipeThreshold = 40;
          if (offset.x < -swipeThreshold) {
            setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
          } else if (offset.x > swipeThreshold) {
            setCurrentIndex((prev) => Math.max(0, prev - 1));
          }
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="relative w-full h-[55vh] flex items-center justify-center perspective-[1200px] z-10 mt-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const isCenter = offset === 0;
          
          // 3D Math Calculations
          const x = offset * 140; // Horizontal spacing
          const z = Math.abs(offset) * -120; // Depth
          const rotateY = offset * -35; // Rotation facing center
          const scale = isCenter ? 1 : 0.85;
          const opacity = Math.abs(offset) >= 3 ? 0 : 1 - Math.abs(offset) * 0.25;
          const zIndex = 50 - Math.abs(offset);

          return (
            <motion.div
              key={item.id}
              animate={{ x, z, rotateY, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
              className="absolute w-[240px] sm:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => {
                if (isCenter) {
                  onWatch(item);
                } else {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }
              }}
            >
              {/* Card Image */}
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Top 10 Badge for the first item in the list */}
              {index === 0 && (
                <div className="absolute top-0 right-4 bg-gradient-to-b from-red-500 to-red-700 text-white text-[10px] font-bold px-2 py-3 rounded-b-md shadow-lg z-40 flex flex-col items-center gap-1 border-x border-b border-red-400/30">
                  <Trophy size={12} />
                  <span>TOP</span>
                  <span className="text-sm">10</span>
                </div>
              )}

              {/* Active Card Glow & Holographic Shine */}
              {isCenter && (
                <>
                  <div className="absolute inset-0 border-2 border-white/20 rounded-2xl z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
                  <motion.div 
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent bg-[length:200%_200%] z-30 pointer-events-none mix-blend-overlay"
                  />
                  {/* Bottom Gradient for Thumbnail Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  {/* Live Viewers Badge (Social Proof) */}
                  <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
                    <Eye size={12} className="text-white/80" />
                    <span className="text-[11px] font-bold text-white tracking-wide">
                      {formatViewers(item.viewers)}
                    </span>
                  </div>
                </>
              )}

              {/* Inactive Card Darken Overlay */}
              {!isCenter && (
                <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Info Panel (Professional Left-Aligned Layout) */}
      <div className="absolute bottom-0 left-0 w-full h-[45vh] flex flex-col justify-end pb-8 px-6 sm:px-10 z-20 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-3xl flex flex-col items-start text-left gap-3 pointer-events-auto"
          >
            {/* Title (Handles long text gracefully) */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] line-clamp-2">
              {activeItem.title}
            </h1>

            {/* Professional Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-300 font-medium drop-shadow-md">
              <span className="text-green-400 font-bold flex items-center gap-1">
                <Star size={14} className="fill-current" /> {activeItem.rating}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{activeItem.year}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span className="border border-gray-400/50 px-1.5 py-0.5 rounded text-xs tracking-wider uppercase bg-white/5 backdrop-blur-sm">
                {activeItem.type}
              </span>
              {activeItem.isAdult && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span className="text-red-500 font-bold border border-red-500/50 px-1.5 py-0.5 rounded text-xs bg-red-500/10">18+</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-3 w-full sm:w-auto">
              <button 
                onClick={() => onWatch(activeItem)}
                className="flex-1 sm:flex-none group relative h-12 sm:h-14 px-6 sm:px-10 rounded-xl bg-white text-black font-bold tracking-wide text-sm sm:text-base overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
              >
                <Play size={20} fill="currentColor" />
                <span>{activeItem.type === 'series' ? 'Watch Episodes' : 'Play Now'}</span>
              </button>
              
              <button 
                onClick={() => onInfo(activeItem)}
                className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-95"
              >
                <Info size={24} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
