import React, { useState } from 'react';
import { 
  Check, Lock, Play, Award, ChevronDown, ChevronRight, Sparkles, BookOpen, Star 
} from 'lucide-react';
import { LEVEL_TIERS, generateSessionsForSubLevel } from '../data/curriculum';
import { UserProfile, CEFRLevel, SubLevel } from '../types';

interface LevelPathProps {
  profile: UserProfile;
  onStartSession: (subLevel: SubLevel, sessionNum?: number) => void;
  onOpenMilestoneExam: (level: CEFRLevel) => void;
}

export const LevelPath: React.FC<LevelPathProps> = ({
  profile,
  onStartSession,
  onOpenMilestoneExam
}) => {
  const [selectedTier, setSelectedTier] = useState<CEFRLevel>(profile.globalLevel || 'A1');
  const [expandedSubLevel, setExpandedSubLevel] = useState<SubLevel>(profile.currentSubLevel || 'A1.0');

  const currentTierData = LEVEL_TIERS.find(t => t.level === selectedTier) || LEVEL_TIERS[0];
  const isTierUnlocked = (level: CEFRLevel) => {
    const levelsOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const userTierIndex = levelsOrder.indexOf(profile.globalLevel);
    const targetIndex = levelsOrder.indexOf(level);
    return targetIndex <= userTierIndex || profile.completedMilestoneExams.includes(levelsOrder[targetIndex - 1]);
  };

  return (
    <div className="space-y-4">
      
      {/* CEFR Tiers Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {LEVEL_TIERS.map(tier => {
          const unlocked = isTierUnlocked(tier.level);
          const isSelected = selectedTier === tier.level;
          const isUserCurrent = profile.globalLevel === tier.level;

          return (
            <button
              key={tier.level}
              onClick={() => {
                setSelectedTier(tier.level);
                setExpandedSubLevel(`${tier.level}.0` as SubLevel);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100 dark:ring-blue-900/40'
                  : unlocked
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  : 'bg-white/60 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-60'
              }`}
            >
              {isUserCurrent && (
                <span className={`absolute -top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                  isSelected ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'
                }`}>
                  ACTUAL
                </span>
              )}

              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
                  isSelected 
                    ? 'bg-blue-500/80 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {tier.level}
                </span>
                {!unlocked ? (
                  <Lock className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`} />
                ) : (
                  <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-green-500'}`} />
                )}
              </div>

              <p className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                {tier.title.split(':')[1] || tier.title}
              </p>
              <span className={`text-[10px] block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                10 Subetapas
              </span>
            </button>
          );
        })}
      </div>

      {/* Tier Overview Banner */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              Nivel {currentTierData.level}
            </span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {currentTierData.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {currentTierData.description}
          </p>
        </div>

        {/* Milestone Exam Action for this tier */}
        <button
          onClick={() => onOpenMilestoneExam(currentTierData.level)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 transition-all shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Examen de Certificación {currentTierData.level}</span>
        </button>
      </div>

      {/* Sub-Levels Progression Accordion */}
      <div className="space-y-2.5">
        {currentTierData.subLevels.map((sub) => {
          const isExpanded = expandedSubLevel === sub.subLevel;
          const isUserCurrentSubLevel = profile.currentSubLevel === sub.subLevel;
          const sessions = generateSessionsForSubLevel(sub.subLevel, true, profile.completedSessions);
          const completedCount = sessions.filter(s => s.isCompleted).length;
          const isSubLevelCompleted = completedCount === sessions.length && sessions.length > 0;

          return (
            <div
              key={sub.subLevel}
              className={`rounded-2xl border transition-all duration-200 ${
                isExpanded
                  ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shadow-md'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              {/* Sublevel Header Bar */}
              <button
                onClick={() => setExpandedSubLevel(isExpanded ? ('' as SubLevel) : sub.subLevel)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSubLevelCompleted
                      ? 'bg-green-500 text-white'
                      : isUserCurrentSubLevel
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-100 dark:ring-blue-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {isSubLevelCompleted ? <Check className="w-4 h-4" /> : sub.subLevel}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Etapa {sub.subLevel}
                      </h4>
                      {isUserCurrentSubLevel && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          Tu Etapa Actual
                        </span>
                      )}
                      {sessions[0]?.thematicUnit && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {sessions[0].thematicUnit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {sub.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 hidden sm:block">
                    {completedCount} / {sub.sessionsCount} sesiones
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Sessions Grid (Inside expanded sublevel) */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 mt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
                    {sessions.map(session => (
                      <div
                        key={session.id}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                          session.isCompleted
                            ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50 hover:shadow-md hover:-translate-y-0.5'
                            : session.isUnlocked
                            ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 shadow-sm'
                            : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold text-slate-400">
                              Sesión {session.sessionNumber}
                            </span>
                            {session.isCompleted ? (
                              <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                            ) : !session.isUnlocked ? (
                              <Lock className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                            )}
                          </div>

                          <p className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 mb-1">
                            {session.title}
                          </p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 block">
                            {session.grammarFocus || '4 Disciplinas Adaptadas'}
                          </span>
                        </div>

                        <button
                          onClick={() => onStartSession(sub.subLevel, session.sessionNumber)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            session.isCompleted
                              ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-200'
                              : session.isUnlocked
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/20'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{session.isCompleted ? 'Repasar' : 'Comenzar'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
