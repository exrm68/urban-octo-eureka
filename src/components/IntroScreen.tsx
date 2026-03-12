import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TelegramUser } from '../App';

interface IntroScreenProps {
  onExplore: () => void;
  user: TelegramUser | null;
}

const STATS = [
  { value: '10K+', label: 'কন্টেন্ট' },
  { value: '4K', label: 'কোয়ালিটি' },
  { value: '100%', label: 'ফ্রি' },
];

const FLOATING_ICONS = ['🎬', '🎭', '🔥', '⭐', '🎌', '🏆', '🎥', '💥'];

export function IntroScreen({ onExplore, user }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ['#a855f7', '#3b82f6', '#ec4899', '#fbbf24', '#6366f1'];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.1, color: colors[Math.floor(Math.random() * colors.length)] });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist / 100)})`; ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center text-white overflow-hidden bg-[#050308]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="absolute top-[40%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-pink-600/10 blur-[100px]" />
      </div>
      {FLOATING_ICONS.map((icon, i) => (
        <motion.div key={i} className="absolute text-2xl pointer-events-none select-none"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -120], x: [0, (i % 2 === 0 ? 1 : -1) * 30] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
          style={{ left: `${10 + (i * 11) % 80}%`, bottom: '10%' }}>{icon}</motion.div>
      ))}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-sm gap-6">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-purple-500/30 blur-xl scale-110" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)] border border-white/20">
              <span className="text-4xl">🎬</span>
            </div>
          </div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl font-black tracking-[0.15em] uppercase"
            style={{ background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Video Universe
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[10px] tracking-[0.3em] text-purple-300/70 uppercase font-medium">
            Premium Streaming Platform
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
          className="w-full relative overflow-hidden rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5" />
          <div className="relative p-5 flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-md scale-110" />
              {user?.photo_url ? (
                <img src={user.photo_url} alt={user.first_name} className="relative w-14 h-14 rounded-full object-cover border-2 border-purple-500/50 shadow-lg" />
              ) : (
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center border-2 border-purple-500/50 text-2xl shadow-lg">👤</div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#050308]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-purple-300/80 tracking-widest uppercase font-medium mb-0.5">স্বাগতম</p>
              <h2 className="text-xl font-bold text-white leading-tight">{user?.first_name || 'বন্ধু'} {user?.last_name || ''}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-[10px] text-yellow-400 font-bold tracking-wider">PRO MEMBER</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-3 w-full">
          {STATS.map((stat, i) => (
            <div key={i} className="flex-1 text-center p-3 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-xl font-black" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</div>
              <div className="text-[10px] text-gray-400 tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, type: 'spring' }}
          onClick={onExplore} onPointerDown={() => setIsPressed(true)} onPointerUp={() => setIsPressed(false)}
          className="relative w-full h-[60px] rounded-2xl overflow-hidden border border-white/20 transition-transform"
          style={{ transform: isPressed ? 'scale(0.96)' : 'scale(1)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-blue-500/80 to-pink-600/80" />
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
          <div className="relative flex items-center justify-center gap-3 text-white font-bold text-base tracking-wide">
            <span className="text-xl">🚀</span><span>Universe-এ প্রবেশ করুন</span>
          </div>
        </motion.button>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[10px] text-gray-600 tracking-[0.25em] uppercase">
          Unlimited Content • Free Forever
        </motion.p>
      </div>
    </div>
  );
}
