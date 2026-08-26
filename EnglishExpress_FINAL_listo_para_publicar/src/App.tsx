import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Flame, Zap, Diamond, Award, Bot, BookOpen, 
  RotateCcw, ArrowRight, CheckCircle, Bell, UserCheck, Play, Lock, Check,
  Home, BarChart3, Trophy, Settings as SettingsIcon, HelpCircle,
  ChevronDown, ChevronUp, Brain, LogIn, UserPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, DiagnosticResult, SubLevel, CEFRLevel, Discipline } from './types';
import { 
  loadUserProfile, saveUserProfile, checkAndUpdateDailyStreak, 
  calculateAdaptiveAllocation, clearAllLocalStorageData 
} from './utils/storage';
import { sound, setAudioContextLevel } from './utils/audio';
import { LEVEL_TIERS, generateSessionsForSubLevel } from './data/curriculum';
import { Navbar } from './components/Navbar';
import { OnboardingModal } from './components/OnboardingModal';
import { DiagnosticExamModal } from './components/DiagnosticExamModal';
import { LevelPath } from './components/LevelPath';
import { SessionPlayer } from './components/SessionPlayer';
import { MilestoneExamModal } from './components/MilestoneExamModal';
import { VocabChallengeModal } from './components/VocabChallengeModal';
import { MemoryGameModal } from './components/MemoryGameModal';
import { LibraryModal } from './components/LibraryModal';
import { NotificationsSettingsModal } from './components/NotificationsSettingsModal';
import { StreakCelebrationModal } from './components/StreakCelebrationModal';
import { DailyGoalCard } from './components/DailyGoalCard';
import { getSubLevelTheme } from './data/thematicCurriculum';

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const p = loadUserProfile();
    return checkAndUpdateDailyStreak(p);
  });

  // Estado para controlar si hay una sesión activa o si se muestra la pantalla de bienvenida/login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const p = loadUserProfile();
    return !!p.registered;
  });

  // Modal view states
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDiagnosticExam, setShowDiagnosticExam] = useState(false);
  const [activeSession, setActiveSession] = useState<{
    subLevel: SubLevel;
    sessionNumber: number;
    quickCount?: number;
  } | null>(null);
  const [milestoneExamLevel, setMilestoneExamLevel] = useState<CEFRLevel | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showVocabGame, setShowVocabGame] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [showCurriculumUnits, setShowCurriculumUnits] = useState(false);
  const [activeTab, setActiveTab] = useState<'path' | 'library' | 'vocab' | 'memory'>('path');

  // Dark mode synchronization with DOM
  useEffect(() => {
    if (profile.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.isDarkMode]);

  // Audio voice level sync
  useEffect(() => {
    setAudioContextLevel(profile.currentSubLevel || profile.globalLevel || 'A1');
  }, [profile.currentSubLevel, profile.globalLevel]);

  // Save profile helper
  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      saveUserProfile(updated);
      return updated;
    });
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    const nextDark = !profile.isDarkMode;
    sound.playTap();
    handleUpdateProfile({ isDarkMode: nextDark });
  };

  // Complete Onboarding & Open Diagnostic
  const handleCompleteOnboarding = (name: string, email: string) => {
    handleUpdateProfile({
      name,
      email,
      registered: true
    });
    setIsLoggedIn(true);
    setShowOnboarding(false);
    setShowDiagnosticExam(true);
  };

  // Login existing user
  const handleLoginExistingUser = () => {
    sound.playTap();
    const loaded = loadUserProfile();
    if (loaded.registered) {
      setProfile(loaded);
      setIsLoggedIn(true);
    } else {
      setShowOnboarding(true);
    }
  };

  // Logout (Oculta la sesión pero JAMÁS borra los datos)
  const handleLogout = () => {
    sound.playTap();
    setIsLoggedIn(false);
  };

  // Complete Diagnostic Exam (40 Questions)
  const handleFinishDiagnostic = (result: DiagnosticResult) => {
    handleUpdateProfile({
      hasCompletedDiagnostic: true,
      globalLevel: result.globalLevel,
      currentSubLevel: result.initialSubLevel,
      disciplineScores: result.disciplineScores,
      disciplineLevels: result.disciplineLevels,
      allocation: result.allocation,
      xp: profile.xp + 100,
      gems: profile.gems + 50
    });
    setShowDiagnosticExam(false);
  };

  // Start Session
  const handleStartSession = (subLevel: SubLevel, sessionNumOrCount?: number, explicitQuickCount?: number) => {
    let sessionNumber = 1;
    let quickCount = 10;

    if (explicitQuickCount !== undefined) {
      sessionNumber = sessionNumOrCount || 1;
      quickCount = explicitQuickCount;
    } else if (sessionNumOrCount !== undefined) {
      if (sessionNumOrCount === 10 || sessionNumOrCount === 40) {
        quickCount = sessionNumOrCount;
        sessionNumber = 1;
      } else {
        sessionNumber = sessionNumOrCount;
        quickCount = 10;
      }
    }
    
    setActiveSession({
      subLevel,
      sessionNumber,
      quickCount
    });
  };

  // Finish Session
  const handleFinishSession = (
    earnedXp: number, 
    earnedGems: number, 
    completedSessionId: string, 
    updatedScores: any
  ) => {
    const updatedSessions = Array.from(new Set([...profile.completedSessions, completedSessionId]));
    const newAllocation = calculateAdaptiveAllocation(updatedScores);
    
    const minutesAdded = activeSession?.quickCount === 40 ? 15 : 5;
    const newPracticedMinutes = (profile.todayMinutesPracticed || 0) + minutesAdded;
    const targetGoal = profile.dailyGoalMinutes || 15;
    const justAchievedGoal = newPracticedMinutes >= targetGoal && !profile.dailyGoalCompletedToday;

    let bonusXp = 0;
    let bonusGems = 0;

    if (justAchievedGoal) {
      bonusXp = 50;
      bonusGems = 10;
      sound.playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    handleUpdateProfile({
      xp: profile.xp + earnedXp + bonusXp,
      gems: profile.gems + earnedGems + bonusGems,
      disciplineScores: updatedScores,
      allocation: newAllocation,
      completedSessions: updatedSessions,
      todayMinutesPracticed: newPracticedMinutes,
      dailyGoalCompletedToday: profile.dailyGoalCompletedToday || justAchievedGoal
    });

    setActiveSession(null);

    if (justAchievedGoal || updatedSessions.length === 1) {
      setTimeout(() => setShowStreakCelebration(true), 600);
    }
  };

  // Pass Milestone Certification Exam
  const handlePassMilestoneExam = (levelPassed: CEFRLevel) => {
    const nextLevels: Record<CEFRLevel, { nextLevel: CEFRLevel; nextSub: SubLevel }> = {
      A1: { nextLevel: 'A2', nextSub: 'A2.0' },
      A2: { nextLevel: 'B1', nextSub: 'B1.0' },
      B1: { nextLevel: 'B2', nextSub: 'B2.0' },
      B2: { nextLevel: 'C1', nextSub: 'C1.0' },
      C1: { nextLevel: 'C2', nextSub: 'C2.0' },
      C2: { nextLevel: 'C2', nextSub: 'C2.9' }
    };

    const next = nextLevels[levelPassed];
    const completedExams = Array.from(new Set([...profile.completedMilestoneExams, levelPassed]));

    handleUpdateProfile({
      globalLevel: next.nextLevel,
      currentSubLevel: next.nextSub,
      completedMilestoneExams: completedExams,
      xp: profile.xp + 250,
      gems: profile.gems + 100
    });

    setMilestoneExamLevel(null);
  };

  const levelsOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const userTierIndex = levelsOrder.indexOf(profile.globalLevel);

  const isLevelUnlocked = (lvl: CEFRLevel) => {
    const targetIdx = levelsOrder.indexOf(lvl);
    return targetIdx <= userTierIndex || profile.completedMilestoneExams.includes(levelsOrder[targetIdx - 1]);
  };

  const isLevelPassed = (lvl: CEFRLevel) => {
    const targetIdx = levelsOrder.indexOf(lvl);
    return targetIdx < userTierIndex || profile.completedMilestoneExams.includes(lvl);
  };

  const currentSessions = generateSessionsForSubLevel(profile.currentSubLevel, true, profile.completedSessions);
  const nextAvailableSession = currentSessions.find(s => !s.isCompleted) || currentSessions[0];
  const activeSessionNum = nextAvailableSession ? nextAvailableSession.sessionNumber : 1;
  const completedInCurrentSub = currentSessions.filter(s => s.isCompleted).length;

  const disciplinesConfig = [
    {
      key: 'writing' as Discipline,
      name: 'Writing',
      label: 'Writing (Escritura)',
      tag: 'W',
      color: 'bg-purple-500',
      badgeBg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
      score: profile.disciplineScores.writing,
      subLevelStr: profile.disciplineLevels.writing,
      count: profile.allocation.writing
    },
    {
      key: 'speaking' as Discipline,
      name: 'Speaking',
      label: 'Speaking (Habla)',
      tag: 'S',
      color: 'bg-orange-500',
      badgeBg: 'bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
      score: profile.disciplineScores.speaking,
      subLevelStr: profile.disciplineLevels.speaking,
      count: profile.allocation.speaking
    },
    {
      key: 'listening' as Discipline,
      name: 'Listening',
      label: 'Listening (Escucha)',
      tag: 'L',
      color: 'bg-green-500',
      badgeBg: 'bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400',
      score: profile.disciplineScores.listening,
      subLevelStr: profile.disciplineLevels.listening,
      count: profile.allocation.listening
    },
    {
      key: 'reading' as Discipline,
      name: 'Reading',
      label: 'Reading (Lectura)',
      tag: 'R',
      color: 'bg-blue-500',
      badgeBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
      score: profile.disciplineScores.reading,
      subLevelStr: profile.disciplineLevels.reading,
      count: profile.allocation.reading
    }
  ];

  const lowestDiscipline = [...disciplinesConfig].sort((a, b) => a.score - b.score)[0];

  const themeBgClasses: Record<string, string> = {
    indigo: 'bg-[#F1F5F9] dark:bg-slate-950 text-slate-800 dark:text-slate-100',
    emerald: 'bg-[#F0FDF4] dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100',
    amber: 'bg-[#FFFBEB] dark:bg-amber-950/40 text-amber-950 dark:text-amber-100',
    obsidian: 'bg-[#0B0F17] text-slate-100'
  };

  const activeThemeClass = themeBgClasses[profile.theme || 'indigo'] || themeBgClasses.indigo;

  // ==========================================
  // PANTALLA DE BIENVENIDA / LOGIN POR DEFECTO
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center">
          
          {/* Logo / Brand */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30 text-3xl">
            E
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest inline-block mb-3">
            US ⇄ MX Platform
          </span>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Welcome to EnglishExpress!
          </h1>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Domina el inglés americano real desde el nivel A1 hasta C2 con un sistema adaptativo inteligente y dinámico.
          </p>

          <div className="space-y-3">
            {/* Botón Crear Cuenta / Registrarse */}
            <button
              type="button"
              onClick={() => setShowOnboarding(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Crear Cuenta Nueva</span>
            </button>

            {/* Botón Iniciar Sesión (si ya tiene datos guardados) */}
            <button
              type="button"
              onClick={handleLoginExistingUser}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-blue-400" />
              <span>Iniciar Sesión en este Dispositivo</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-6">
            Tus avances, rachas y lecciones se guardan de forma segura en tu navegador.
          </p>
        </div>

        {/* Modal de Onboarding para Registro */}
        {showOnboarding && (
          <OnboardingModal
            onComplete={handleCompleteOnboarding}
          />
        )}

        {/* Modal de Examen Diagnóstico al crear cuenta nueva */}
        {showDiagnosticExam && (
          <DiagnosticExamModal
            userName={profile.name}
            onFinish={(res) => {
              handleFinishDiagnostic(res);
              setIsLoggedIn(true);
            }}
            onClose={() => setShowDiagnosticExam(false)}
          />
        )}
      </div>
    );
  }

  // ==========================================
  // APLICACIÓN PRINCIPAL (CUANDO HAY SESIÓN ACTIVA)
  // ==========================================
  return (
    <div className={`min-h-screen ${activeThemeClass} flex flex-col font-sans transition-colors`}>
      
      {/* Navigation Header con el botón de Cerrar Sesión integrado */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'library') setShowLibrary(true);
          if (tab === 'vocab') setShowVocabGame(true);
          if (tab === 'memory') setShowMemoryGame(true);
        }}
        onOpenLibrary={() => setShowLibrary(true)}
        onOpenVocabGame={() => setShowVocabGame(true)}
        onOpenMemoryGame={() => setShowMemoryGame(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenStreakCelebration={() => setShowStreakCelebration(true)}
        onRetakeDiagnostic={() => setShowDiagnosticExam(true)}
        onToggleDarkMode={handleToggleDarkMode}
        onChangeTheme={(th) => handleUpdateProfile({ theme: th })}
        onLogout={handleLogout}
      />

      {/* Main High-Density App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        
        {/* 1. TOP: COMPACT NIVEL GLOBAL CEFR BAR */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
              Nivel Global
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                Nivel Global CEFR: <span className="text-blue-600 dark:text-blue-400">{profile.globalLevel}</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                ({profile.globalLevel === 'A1' ? 'Principiante' : profile.globalLevel === 'A2' ? 'Elemental' : profile.globalLevel === 'B1' ? 'Intermedio' : profile.globalLevel === 'B2' ? 'Intermedio Alto' : profile.globalLevel === 'C1' ? 'Avanzado' : 'Maestría'})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {[
              { lvl: 'A1' as CEFRLevel, name: 'A1' },
              { lvl: 'A2' as CEFRLevel, name: 'A2' },
              { lvl: 'B1' as CEFRLevel, name: 'B1' },
              { lvl: 'B2' as CEFRLevel, name: 'B2' },
              { lvl: 'C1' as CEFRLevel, name: 'C1' },
              { lvl: 'C2' as CEFRLevel, name: 'C2' }
            ].map(item => {
              const isCurrent = profile.globalLevel === item.lvl;
              const isPassed = isLevelPassed(item.lvl);
              const isUnlocked = isLevelUnlocked(item.lvl);

              if (isCurrent) {
                return (
                  <div
                    key={item.lvl}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-blue-600 text-white font-black text-xs shadow-sm ring-2 ring-blue-100 dark:ring-blue-900"
                    title={`Nivel ${item.lvl} (Tu nivel actual)`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[9px] bg-blue-400 px-1 rounded uppercase font-black">Act</span>
                  </div>
                );
              }

              if (isPassed) {
                return (
                  <div
                    key={item.lvl}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/80 text-green-700 dark:text-green-300 font-bold text-xs"
                    title={`Nivel ${item.lvl} (Acreditado)`}
                  >
                    <span>{item.name}</span>
                    <span className="text-green-600 dark:text-green-400 text-[11px] font-black">✓</span>
                  </div>
                );
              }

              return (
                <div
                  key={item.lvl}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-bold text-xs opacity-60"
                  title={`Nivel ${item.lvl} (Bloqueado)`}
                >
                  <span>{item.name}</span>
                  <span className="text-[10px]">🔒</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. META DIARIA DE PRÁCTICA */}
        <DailyGoalCard
          profile={profile}
          onStartPractice={() => handleStartSession(profile.currentSubLevel, activeSessionNum)}
          onOpenSettings={() => setShowNotifications(true)}
          onUpdateGoalMinutes={(min) => handleUpdateProfile({ dailyGoalMinutes: min })}
        />

        {/* 3. RUTA DE APRENDIZAJE UNIFICADA */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
          {(() => {
            const activeSubLevelTheme = getSubLevelTheme(profile.currentSubLevel);
            const currentSessionPlan = activeSubLevelTheme.sessions.find(s => s.sessionNumber === activeSessionNum) || activeSubLevelTheme.sessions[0];
            const isLevelCertified = profile.completedMilestoneExams.includes(profile.globalLevel);

            return (
              <div className="flex flex-col justify-between h-full space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {activeSubLevelTheme.americanBookModule}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {completedInCurrentSub}/8 Sesiones de etapa
                      </span>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/80">
                        Nivel {profile.globalLevel}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight">
                      Ruta de Aprendizaje • Sesión {activeSessionNum}: {currentSessionPlan.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">
                      🎯 {currentSessionPlan.grammarFocus} • 🌎 {currentSessionPlan.realLifeContext}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
                    <button
                      onClick={() => handleStartSession(profile.currentSubLevel, activeSessionNum)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all cursor-pointer text-xs sm:text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>EMPEZAR SESIÓN {activeSessionNum}</span>
                    </button>

                    <button
                      onClick={() => setShowCurriculumUnits(!showCurriculumUnits)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer border border-slate-200 dark:border-slate-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{showCurriculumUnits ? 'Ocultar unidades' : 'Explorar 60 unidades'}</span>
                      <ChevronDown className={`w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${showCurriculumUnits ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between items-center px-2 sm:px-4 relative py-2 overflow-x-auto gap-1 sm:gap-2">
                    <div className="absolute h-1 bg-slate-200 dark:bg-slate-700 top-1/2 left-4 right-6 -z-0"></div>
                    
                    {currentSessions.map((session) => {
                      const isCurrent = session.sessionNumber === activeSessionNum;
                      const isDone = session.isCompleted;

                      if (isDone) {
                        return (
                          <div
                            key={session.id}
                            onClick={() => handleStartSession(profile.currentSubLevel, session.sessionNumber)}
                            className="z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:scale-110 hover:shadow-md transition-all shrink-0"
                            title={`Sesión ${session.sessionNumber} (Completada)`}
                          >
                            ✓
                          </div>
                        );
                      }

                      if (isCurrent) {
                        return (
                          <div
                            key={session.id}
                            onClick={() => handleStartSession(profile.currentSubLevel, session.sessionNumber)}
                            className="z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-sm sm:text-base font-black shadow-md ring-4 ring-blue-200 dark:ring-blue-900/60 cursor-pointer hover:scale-110 hover:shadow-lg transition-all shrink-0 animate-pulse"
                            title={`Sesión ${session.sessionNumber} (Activa)`}
                          >
                            {session.sessionNumber}
                          </div>
                        );
                      }

                      return (
                        <div
                          key={session.id}
                          onClick={() => session.isUnlocked && handleStartSession(profile.currentSubLevel, session.sessionNumber)}
                          className={`z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                            session.isUnlocked
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer hover:scale-110 hover:shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                          }`}
                          title={`Sesión ${session.sessionNumber}`}
                        >
                          {session.sessionNumber}
                        </div>
                      );
                    })}

                    <div 
                      onClick={() => setMilestoneExamLevel(profile.globalLevel)}
                      className={`z-10 px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105 hover:shadow-md transition-all shrink-0 ${
                        isLevelCertified
                          ? 'bg-amber-500 text-white border-amber-400'
                          : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <Award className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="text-xs font-black whitespace-nowrap">
                        {isLevelCertified ? `Certificado ${profile.globalLevel} ✓` : `Examen de Nivel ${profile.globalLevel}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Disciplinas:</span>
                    {disciplinesConfig.map(d => (
                      <span
                        key={d.key}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${d.badgeBg}`}
                      >
                        <span className="font-bold">{d.tag}:</span>
                        <span>{d.name}</span>
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleStartSession(profile.currentSubLevel, activeSessionNum, 10)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Práctica Rápida (10 ej.)</span>
                  </button>
                </div>

                {showCurriculumUnits && (
                  <div className="mt-4 pt-5 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Mapa Completo del Marco Común Europeo (MCER A1 - C2)
                        </h4>
                      </div>
                    </div>
                    <LevelPath
                      profile={profile}
                      onStartSession={handleStartSession}
                      onOpenMilestoneExam={(lvl) => setMilestoneExamLevel(lvl)}
                    />
                  </div>
                )}

              </div>
            );
          })()}
        </div>

        {/* 4. RADAR DE DISCIPLINAS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Calibración Adaptativa
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                Radar de Disciplinas
              </h3>
            </div>
            
            <div className="p-1.5 px-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/60 rounded-xl text-center sm:text-right">
              <p className="text-[11px] text-red-700 dark:text-red-400 font-bold">
                ⚠️ Refuerzo prioritario: <b>{lowestDiscipline.name}</b> ({lowestDiscipline.count}/40 ejercicios en tus sesiones)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-end">
            {disciplinesConfig.map(d => (
              <div key={d.key} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                
                <span className="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tight">
                  {d.subLevelStr}
                </span>

                <div className="w-5 sm:w-6 h-20 sm:h-24 bg-slate-200/70 dark:bg-slate-700/60 rounded-full p-0.5 flex flex-col justify-end overflow-hidden shadow-inner my-0.5">
                  <div 
                    className={`w-full rounded-full ${d.color} transition-all duration-700 shadow-sm`}
                    style={{ height: `${Math.min(100, Math.max(14, d.score))}%` }}
                    title={`${d.name}: ${d.score}%`}
                  />
                </div>

                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {d.score}%
                </span>

                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-black text-white ${d.color} shrink-0`}>
                    {d.tag}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {d.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* MODALS & OVERLAYS */}
      {showDiagnosticExam && (
        <DiagnosticExamModal
          userName={profile.name}
          onFinish={handleFinishDiagnostic}
          onClose={() => setShowDiagnosticExam(false)}
        />
      )}

      {activeSession && (
        <SessionPlayer
          subLevel={activeSession.subLevel}
          sessionNumber={activeSession.sessionNumber}
          quickCount={activeSession.quickCount}
          profile={profile}
          onFinishSession={handleFinishSession}
          onClose={() => setActiveSession(null)}
        />
      )}

      {milestoneExamLevel && (
        <MilestoneExamModal
          initialLevel={milestoneExamLevel}
          profile={profile}
          onPassExam={handlePassMilestoneExam}
          onClose={() => setMilestoneExamLevel(null)}
        />
      )}

      {showLibrary && (
        <LibraryModal
          profile={profile}
          onClose={() => setShowLibrary(false)}
          onRewardUser={(xp, gems) => {
            handleUpdateProfile({
              xp: profile.xp + xp,
              gems: profile.gems + gems
            });
          }}
        />
      )}

      {showVocabGame && (
        <VocabChallengeModal
          profile={profile}
          onClose={() => setShowVocabGame(false)}
          onUpdateXpAndGems={(xp, gems) => {
            handleUpdateProfile({
              xp: profile.xp + xp,
              gems: profile.gems + gems
            });
          }}
        />
      )}

      {showMemoryGame && (
        <MemoryGameModal
          profile={profile}
          onClose={() => setShowMemoryGame(false)}
          onRewardUser={(xp, gems) => {
            handleUpdateProfile({
              xp: profile.xp + xp,
              gems: profile.gems + gems
            });
          }}
        />
      )}

      {showNotifications && (
        <NotificationsSettingsModal
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setShowNotifications(false)}
          onOpenStreakCelebration={() => {
            setShowNotifications(false);
            setShowStreakCelebration(true);
          }}
        />
      )}

      {showStreakCelebration && (
        <StreakCelebrationModal
          profile={profile}
          onClose={() => setShowStreakCelebration(false)}
          onOpenSettings={() => {
            setShowStreakCelebration(false);
            setShowNotifications(true);
          }}
          onBuyStreakFreeze={() => {
            if (profile.gems >= 50) {
              handleUpdateProfile({
                gems: profile.gems - 50,
                streak: {
                  ...profile.streak,
                  freezeCount: profile.streak.freezeCount + 1
                }
              });
              sound.playFanfare();
            }
          }}
        />
      )}

    </div>
  );
}

export default App;
