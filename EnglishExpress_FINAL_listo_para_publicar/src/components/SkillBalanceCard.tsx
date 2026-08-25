import React from 'react';
import { Bot, Sparkles, PenTool, Mic, Volume2, BookOpen, ArrowUpRight, Scale } from 'lucide-react';
import { UserProfile, Discipline } from '../types';

interface SkillBalanceCardProps {
  profile: UserProfile;
  onStartSession: (subLevel: any, quickCount?: number) => void;
}

export const SkillBalanceCard: React.FC<SkillBalanceCardProps> = ({
  profile,
  onStartSession
}) => {
  const { disciplineScores, disciplineLevels, allocation } = profile;

  const disciplinesConfig: {
    key: Discipline;
    name: string;
    subName: string;
    tag: string;
    color: string;
    barColor: string;
    count: number;
    score: number;
    level: string;
  }[] = [
    {
      key: 'writing',
      name: 'Writing',
      subName: 'Escritura & Gramática',
      tag: 'W',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
      barColor: 'bg-purple-500',
      count: allocation.writing,
      score: disciplineScores.writing,
      level: disciplineLevels.writing
    },
    {
      key: 'speaking',
      name: 'Speaking',
      subName: 'Habla & Fonética US',
      tag: 'S',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
      barColor: 'bg-orange-500',
      count: allocation.speaking,
      score: disciplineScores.speaking,
      level: disciplineLevels.speaking
    },
    {
      key: 'listening',
      name: 'Listening',
      subName: 'Comprensión Auditiva',
      tag: 'L',
      color: 'bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400',
      barColor: 'bg-green-500',
      count: allocation.listening,
      score: disciplineScores.listening,
      level: disciplineLevels.listening
    },
    {
      key: 'reading',
      name: 'Reading',
      subName: 'Lectura & Vocabulario',
      tag: 'R',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
      barColor: 'bg-blue-500',
      count: allocation.reading,
      score: disciplineScores.reading,
      level: disciplineLevels.reading
    }
  ];

  // Find lowest discipline
  const lowestDiscipline = [...disciplinesConfig].sort((a, b) => a.score - b.score)[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      
      {/* Header with AI Balancer Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
            <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white tracking-tight">
              Configuración de Próxima Sesión y Radar IA
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Distribución optimizada por IA basada en tu examen de nivelación de 40 reactivos
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Sesión de 40 Ejercicios</span>
        </div>
      </div>

      {/* 4 Disciplines High-Density Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {disciplinesConfig.map(d => {
          const isLowest = lowestDiscipline && lowestDiscipline.key === d.key;
          return (
            <div
              key={d.key}
              className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3.5"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${d.color}`}>
                {d.tag}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200 truncate">{d.name} ({d.level})</span>
                  <span className="text-slate-600 dark:text-slate-400 font-extrabold">{d.count} ej.</span>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full ${d.barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.min(100, Math.max(10, d.score))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Dominio: {d.score}%</span>
                  <span>{((d.count / 40) * 100).toFixed(0)}% carga</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Opportunity Alert Box & Action Buttons */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Prioridad de Refuerzo IA:
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 uppercase">
                {lowestDiscipline.name}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
              {allocation.reasoning}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onStartSession(profile.currentSubLevel, 10)}
            className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Sprint Rápido (10 Ejercicios)
          </button>

          <button
            onClick={() => onStartSession(profile.currentSubLevel, 40)}
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-200 dark:shadow-blue-900/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Sesión Completa (40 Ejercicios)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
