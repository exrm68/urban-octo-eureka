import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ExternalLink, X, ShieldAlert } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  contentTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DisclaimerModal({ isOpen, contentTitle, onClose, onConfirm }: DisclaimerModalProps) {
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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm glass-panel bg-[#0a0a0a]/90 rounded-3xl p-6 pointer-events-auto border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[50px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px]" />

              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-1"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center gap-4 mt-2">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <ShieldAlert size={32} className="text-amber-500" />
                </div>
                
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wide mb-1">Unlock Full Video 🔓</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="text-white font-semibold">"{contentTitle}"</span> সম্পূর্ণ HD কোয়ালিটিতে দেখতে আমাদের Official Telegram App-এ প্রবেশ করুন।
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full text-left flex gap-3 items-start mt-2">
                  <AlertTriangle size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    <strong className="text-gray-200">Exclusive Access:</strong> এই কন্টেন্টটি শুধুমাত্র আমাদের মিনি অ্যাপ ব্যবহারকারীদের জন্য উন্মুক্ত।
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full mt-4">
                  <button 
                    onClick={onConfirm}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <span>🚀 Open Mini App (ফ্রি দেখুন)</span>
                    <ExternalLink size={18} />
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full bg-transparent text-gray-400 hover:text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    ফিরে যান
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
