import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Star, Calendar, Clock, ShieldAlert } from 'lucide-react';
import { ContentItem } from '../data';

interface DetailsModalProps {
  isOpen: boolean;
  content: ContentItem | null;
  onClose: () => void;
  onPlay: (item: ContentItem) => void;
}

export function DetailsModal({ isOpen, content, onClose, onPlay }: DetailsModalProps) {
  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-[#0f0c29] sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="relative w-full h-64 sm:h-80 shrink-0">
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/50 to-transparent" />
              
              {/* Floating Title */}
              <div className="absolute bottom-0 left-0 w-full p-6 pb-2">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white drop-shadow-lg leading-tight">
                  {content.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Details */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {/* Metadata Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-sm font-bold">
                  <Star size={14} className="fill-current" /> {content.rating}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-gray-300">
                  <Calendar size={14} /> {content.year}
                </span>
                <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-gray-300 uppercase tracking-wider">
                  {content.type}
                </span>
                {content.isAdult && (
                  <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-sm font-bold">
                    <ShieldAlert size={14} /> 18+
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {content.description || "Experience this amazing content in high quality. Watch now to explore the full story and enjoy premium entertainment."}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => {
                  onClose();
                  onPlay(content);
                }}
                className="w-full relative group h-14 rounded-xl bg-white text-black font-bold tracking-wide text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
              >
                <Play size={24} fill="currentColor" />
                <span>{content.type === 'series' ? 'Watch Episodes' : 'Play Now'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
