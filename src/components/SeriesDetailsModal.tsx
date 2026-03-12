import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle, ListVideo, ChevronRight } from 'lucide-react';
import { ContentItem } from '../data';

interface SeriesDetailsModalProps {
  isOpen: boolean;
  series: ContentItem | null;
  onClose: () => void;
  onWatchAll: (series: ContentItem) => void;
}

export function SeriesDetailsModal({ isOpen, series, onClose, onWatchAll }: SeriesDetailsModalProps) {
  const [activeSeason, setActiveSeason] = useState<number>(1);

  // Reset active season when a new series is opened
  useEffect(() => {
    if (series && series.seasons && series.seasons.length > 0) {
      setActiveSeason(series.seasons[0].seasonNumber);
    } else {
      setActiveSeason(1);
    }
  }, [series]);

  if (!series) return null;

  const currentEpisodes = series.seasons 
    ? series.seasons.find(s => s.seasonNumber === activeSeason)?.episodes || []
    : series.episodes || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg max-h-[85vh] flex flex-col glass-panel bg-[#0a0a0a]/95 sm:rounded-3xl rounded-t-3xl pointer-events-auto border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              {/* Header Image & Close Button */}
              <div className="relative h-48 shrink-0">
                <img 
                  src={series.imageUrl} 
                  alt={series.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold tracking-wider mb-1">
                    <ListVideo size={14} />
                    <span>{series.seasons ? `${series.seasons.length} SEASONS` : `${currentEpisodes.length} EPISODES`}</span>
                  </div>
                  <h2 className="font-display text-3xl text-white drop-shadow-lg">{series.title}</h2>
                </div>
              </div>

              {/* Season Selector (Only show if multiple seasons exist) */}
              {series.seasons && series.seasons.length > 1 && (
                <div className="px-6 pt-4 pb-2 shrink-0">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {series.seasons.map((season) => (
                      <button
                        key={season.seasonNumber}
                        onClick={() => setActiveSeason(season.seasonNumber)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                          activeSeason === season.seasonNumber
                            ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        Season {season.seasonNumber}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Episodes List */}
              <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3 no-scrollbar">
                {currentEpisodes.map((ep, idx) => (
                  <div 
                    key={ep.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-mono font-bold border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-200 font-medium truncate group-hover:text-white">{ep.title}</h4>
                      <p className="text-xs text-gray-500">{ep.duration}</p>
                    </div>
                    <PlayCircle size={24} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Bottom Action Button */}
              <div className="p-6 bg-gradient-to-t from-[#0a0a0a] to-transparent shrink-0">
                <button 
                  onClick={() => onWatchAll(series)}
                  className="w-full group relative h-14 rounded-2xl bg-purple-600 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-100" />
                  <div className="relative flex items-center justify-center gap-2 text-white font-bold tracking-wide text-lg">
                    <span>সব দেখতে ক্লিক করুন</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
