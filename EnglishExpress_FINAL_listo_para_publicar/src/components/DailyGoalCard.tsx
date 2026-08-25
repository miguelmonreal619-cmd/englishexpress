import React, { useState } from 'react';
import { 
  Target, Zap, Flame, CheckCircle, Sparkles, Trophy, 
  Settings2, Clock, ChevronRight, Award 
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { sound } from '../utils/audio';

interface DailyGoalCardProps {
  profile: UserProfile;
  onStartPractice: () => void;
  onOpenSettings: () => void;
  onUpdateGoalMinutes?: (minutes: number) => void;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  profile,
  onStartPractice,
  onOpenSettings,
  onUpdateGoalMinutes
}) => {
  const [showQuickGoalSelector, setShowQuickGoalSelector] = useState(false);
  
  const targetMinutes = profile.dailyGoalMinutes || 15;
  const practicedMinutes = profile.todayMinutesPracticed || 0;
  const percentage = Math.min(100, Math.round((practicedMinutes / targetMinutes) * 100));
  const isGoalReached = percentage >= 100;
  const remainingMinutes = Math.max(0, targetMinutes - practicedMinutes);

  const goalPresets = [
    { min: 10, label: '10 min', title: 'Casual' },
    { min: 15, label: '15 min', title: 'Recomendado' },
    { min: 20, label: '20 min', title: 'Avanzado' },
    { min: 30, label: '30 min', title: 'Intensivo' }
  ];

  const handleSelectGoal = (minutes: number) => {
    sound.playTap();
    onUpdateGoalMinutes?.(minutes);
    setShowQuickGoalSelector(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 relative overflow-hidden">
      
      {/* Header & Goal Selector Trigger */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            isGoalReached
              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400'
              : 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400'
          }`}>
            {isGoalReached ? (
              <Trophy className="w-5 h-5 fill-current animate-bounce" />
            ) : (
              <Target className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Meta Diaria de Práctica
              </h3>
              {isGoalReached && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>¡Cumplida!</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isGoalReached
                ? '¡Felicidades! Has completado tu objetivo de estudio de hoy.'
                : `Te faltan ${remainingMinutes} min para cumplir tu objetivo diario.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowQuickGoalSelector(!showQuickGoalSelector)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Cambiar meta diaria"
          >
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">{targetMinutes} min</span>
          </button>
        </div>
      </div>

      {/* Quick Goal Selector Popover */}
      {showQuickGoalSelector && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span>Elige tu ritmo diario</span>
            <span>Meta activa: {targetMinutes} min</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {goalPresets.map(preset => (
              <button
                key={preset.min}
                onClick={() => handleSelectGoal(preset.min)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  targetMinutes === preset.min
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="leading-tight">{preset.label}</div>
                <div className={`text-[10px] font-normal ${targetMinutes === preset.min ? 'text-blue-100' : 'text-slate-400'}`}>
                  {preset.title}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Visual Progress Bar & Metrics */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{practicedMinutes} de {targetMinutes} minutos completados</span>
          </div>
          <span className={`font-black text-xs sm:text-sm ${isGoalReached ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
            {percentage}%
          </span>
        </div>

        {/* Progress Track */}
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full transition-all ${
              isGoalReached
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/30'
                : 'bg-gradient-to-r from-blue-600 to-indigo-500 shadow-sm shadow-blue-500/30'
            }`}
          />
        </div>
      </div>

      {/* Rewards & Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>+50 XP Recompensa</span>
          </div>
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Protege tu racha</span>
          </div>
        </div>

        <button
          onClick={onStartPractice}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isGoalReached
              ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]'
          }`}
        >
          <span>{isGoalReached ? 'Seguir Practicando (+Extra)' : 'Completar Meta de Hoy'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
