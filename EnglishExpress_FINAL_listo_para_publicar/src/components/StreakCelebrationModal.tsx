import React, { useEffect } from 'react';
import { 
  Flame, Sparkles, Diamond, ShieldCheck, Trophy, Calendar, 
  ArrowRight, X, Zap, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { sound } from '../utils/audio';

interface StreakCelebrationModalProps {
  profile: UserProfile;
  onClose: () => void;
  onOpenSettings: () => void;
  onBuyStreakFreeze: () => void;
}

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({
  profile,
  onClose,
  onOpenSettings,
  onBuyStreakFreeze
}) => {
  const streakCount = profile.streak.count || 1;

  useEffect(() => {
    sound.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#F97316', '#F59E0B', '#EF4444', '#3B82F6', '#10B981']
    });
  }, []);

  // Compute days of the current week (Mon-Sun)
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const todayDayIdx = (new Date().getDay() + 6) % 7; // Monday is 0

  const milestones = [
    { days: 3, reward: '+25 Gemas', icon: Diamond, color: 'text-cyan-500', done: streakCount >= 3 },
    { days: 7, reward: '1x Protector de Racha', icon: ShieldCheck, color: 'text-blue-500', done: streakCount >= 7 },
    { days: 14, reward: '+150 XP Extra', icon: Zap, color: 'text-amber-500', done: streakCount >= 14 },
    { days: 30, reward: 'Insignia Leyenda Bilingüe', icon: Trophy, color: 'text-purple-500', done: streakCount >= 30 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden my-auto text-center"
        >
        {/* Background ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Animated Flame Emblem */}
        <div className="relative pt-3 flex justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating aura */}
            <div className="absolute w-36 h-36 rounded-full bg-orange-500/20 dark:bg-orange-500/30 animate-pulse-ring pointer-events-none" />
            <div className="absolute w-28 h-28 rounded-full bg-amber-400/20 blur-md pointer-events-none" />

            <motion.div 
              animate={{ 
                scale: [1, 1.08, 1],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity,
                ease: 'easeInOut' 
              }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 p-0.5 shadow-xl shadow-orange-500/30 flex items-center justify-center z-10"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 rounded-[22px] flex items-center justify-center relative">
                <Flame className="w-13 h-13 text-white fill-white drop-shadow-md animate-flame" />
                <Sparkles className="w-5 h-5 text-amber-200 absolute top-2 right-2 animate-bounce" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Streak Title & Count */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-900/60 text-xs font-black uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>¡Racha en Llamas!</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {streakCount} {streakCount === 1 ? 'Día Consecutivo' : 'Días Consecutivos'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {streakCount === 1 
              ? '¡Excelente comienzo! Practica todos los días para consolidar tu fluidez en inglés estadounidense.'
              : `¡Imparable! Has mantenido tu hábito de práctica activo. Tu récord histórico es de ${profile.streak.longestStreak} días.`}
          </p>
        </div>

        {/* Weekly Calendar Track */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Esta Semana</span>
            </span>
            <span className="text-orange-600 dark:text-orange-400">
              {streakCount} activos
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {daysOfWeek.map((day, idx) => {
              const isToday = idx === todayDayIdx;
              const isPassedOrToday = idx <= todayDayIdx;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                    isToday
                      ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/20 scale-105'
                      : isPassedOrToday
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/60 text-orange-700 dark:text-orange-300'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{day}</span>
                  <div className="mt-1">
                    {isPassedOrToday ? (
                      <Flame className={`w-4 h-4 ${isToday ? 'fill-white text-white' : 'fill-orange-500 text-orange-500'}`} />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Protectors & Milestones Mini-Card */}
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-300">
            <span>Hitos y Recompensas</span>
            <span className="text-[11px] text-slate-500">{profile.streak.freezeCount} Protectores</span>
          </div>

          <div className="space-y-1.5">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    m.done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${m.done ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block">{m.days} Días de Racha</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.reward}</span>
                    </div>
                  </div>

                  {m.done ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Alcanzado</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      Faltan {Math.max(1, m.days - streakCount)}d
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>¡Seguir Practicando!</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Configurar Notificaciones y Protectores
          </button>
        </div>

      </motion.div>
    </div>
  </div>
  );
};
