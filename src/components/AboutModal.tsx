import { motion, AnimatePresence } from 'motion/react';
import { Info, Shield, Code, X, Cpu, Star } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
              style={{ perspective: 1000 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm glass-panel bg-[#0a0a0a]/95 rounded-3xl p-1 pointer-events-auto border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <div className="bg-[#030303] rounded-[22px] p-6 relative overflow-hidden">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center gap-2 relative z-10">
                  <div className="w-16 h-16 mb-2 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                    <div className="w-full h-full bg-[#030303] rounded-2xl flex items-center justify-center">
                      <Cpu size={32} className="text-purple-400" />
                    </div>
                  </div>
                  
                  <h3 className="font-display text-3xl text-white tracking-widest">UNIVERSE</h3>
                  <div className="bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/30 mb-4">
                    v2.0.0-beta (Showcase Build)
                  </div>

                  <div className="w-full space-y-3 mt-2">
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Code size={18} className="text-gray-400" />
                      <div className="text-left">
                        <p className="text-[11px] text-gray-500 uppercase font-bold tracking-wider">Engineered By</p>
                        <p className="text-sm text-gray-200 font-medium">Professional Dev Team</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Shield size={18} className="text-emerald-400" />
                      <div className="text-left">
                        <p className="text-[11px] text-gray-500 uppercase font-bold tracking-wider">Security Status</p>
                        <p className="text-sm text-emerald-400 font-medium">Verified & Encrypted</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Star size={18} className="text-amber-400" />
                      <div className="text-left">
                        <p className="text-[11px] text-gray-500 uppercase font-bold tracking-wider">Experience</p>
                        <p className="text-sm text-amber-400 font-medium">Premium 3D UI/UX</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 mt-6 max-w-[250px] leading-relaxed">
                    This is a high-performance showcase application. All rights reserved © 2026.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
