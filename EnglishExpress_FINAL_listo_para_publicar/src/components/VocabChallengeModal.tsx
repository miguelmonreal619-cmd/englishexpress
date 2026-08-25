import React, { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, Heart, X, Volume2, Sparkles, RefreshCw,
  Flame, CheckCircle2, XCircle, ArrowRight, Zap,
  Crown, Play, AlertCircle, ShieldAlert, Rocket, Target, Skull
} from 'lucide-react';
import { VocabGameWord, VocabGameStats, UserProfile } from '../types';
import { CURATED_VOCAB_BANK, generate100WordsRun } from '../data/vocabGameBank';
import { playUSEnglishVoice, sound } from '../utils/audio';
import { apiUrl } from '../config';

interface VocabChallengeModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateXpAndGems?: (xpEarned: number, gemsEarned: number) => void;
}

interface MilestoneAlertData {
  step: number;
  title: string;
  tag: string;
  message: string;
  emoji: string;
  buttonText: string;
  gradient: string;
  accentBg: string;
  borderColor: string;
  textColor: string;
}

const MILESTONE_DEFINITIONS: Record<number, MilestoneAlertData> = {
  0: {
    step: 0,
    title: "Let's warm up! 🎯",
    tag: "Preguntas 1 a 20 • Calentamiento Esencial",
    message: "Comenzamos con vocabulario cotidiano indispensable. Concéntrate, afina el oído y cuida tus 3 strikes.",
    emoji: "🎯",
    buttonText: "¡Empezar Reto!",
    gradient: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/60",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-700 dark:text-emerald-300"
  },
  20: {
    step: 20,
    title: "You are on fire! 🔥",
    tag: "Preguntas 21 a 40 • Subiendo el Nivel",
    message: "¡Excelente racha inicial! Subiremos el nivel un poco. Mantén el enfoque y no te confíes.",
    emoji: "🔥",
    buttonText: "¡Vamos por más!",
    gradient: "from-amber-500 to-orange-600",
    accentBg: "bg-orange-50 dark:bg-orange-950/60",
    borderColor: "border-orange-200 dark:border-orange-800",
    textColor: "text-orange-700 dark:text-orange-300"
  },
  40: {
    step: 40,
    title: "Keep it up! ⚡",
    tag: "Preguntas 41 a 60 • Vocabulario Intermedio y Laboral",
    message: "Entrando a términos de oficina, compras, viajes y falsos amigos comunes. ¡Vas con gran ritmo!",
    emoji: "⚡",
    buttonText: "¡Continuar!",
    gradient: "from-blue-600 to-indigo-600",
    accentBg: "bg-indigo-50 dark:bg-indigo-950/60",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    textColor: "text-indigo-700 dark:text-indigo-300"
  },
  60: {
    step: 60,
    title: "Unstoppable! 🚀",
    tag: "Preguntas 61 a 80 • Nivel Avanzado",
    message: "Subiendo la dificultad a conceptos más precisos y situaciones retadoras. ¡Demuestra tu dominio!",
    emoji: "🚀",
    buttonText: "¡Acepto el reto!",
    gradient: "from-purple-600 to-fuchsia-600",
    accentBg: "bg-purple-50 dark:bg-purple-950/60",
    borderColor: "border-purple-200 dark:border-purple-800",
    textColor: "text-purple-700 dark:text-purple-300"
  },
  80: {
    step: 80,
    title: "You are killing it! 💀🔥",
    tag: "Preguntas 81 a 100 • Fase Final C1/C2",
    message: "¡Vamos con las palabras más difíciles y modismos estadounidenses avanzados! You better get ready!",
    emoji: "💀🔥",
    buttonText: "¡A por el título G.O.A.T.!",
    gradient: "from-rose-600 via-red-600 to-amber-600",
    accentBg: "bg-rose-50 dark:bg-rose-950/60",
    borderColor: "border-rose-200 dark:border-rose-800",
    textColor: "text-rose-700 dark:text-rose-300"
  }
};

const STATS_STORAGE_KEY = 'norteno_vocab_game_stats';

export const VocabChallengeModal: React.FC<VocabChallengeModalProps> = ({
  profile,
  onClose,
  onUpdateXpAndGems
}) => {
  // Game states
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover' | 'victory'>('intro');
  const [wordsList, setWordsList] = useState<VocabGameWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strikes, setStrikes] = useState(0); // 0, 1, 2, 3 (Max 3 strikes)
  const [score, setScore] = useState(0); // 0 to 100
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [isLoadingWords, setIsLoadingWords] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<MilestoneAlertData | null>(null);
  const [stats, setStats] = useState<VocabGameStats>({
    gamesPlayed: 0,
    bestScore: 0,
    perfectGamesCount: 0,
    totalWordsGuessed: 0,
    recentWordIds: []
  });
  const [missedWords, setMissedWords] = useState<{ word: VocabGameWord; chosen: string }[]>([]);

  // Load stats from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load vocab game stats', e);
    }
  }, []);

  // Fetch or generate 100 dynamic words
  const startNewGame = useCallback(async () => {
    setIsLoadingWords(true);
    setCurrentIndex(0);
    setStrikes(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrectAnswer(null);
    setMissedWords([]);

    // Recent words to exclude/limit overlap (keep max ~20, introduce ~80 new)
    const excludeIds = stats.recentWordIds.slice(-80);

    let aiWords: VocabGameWord[] = [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(apiUrl('/api/gemini/vocab-challenge'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          count: 35,
          excludeWords: excludeIds,
          subLevel: profile.currentSubLevel || 'A2'
        })
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data.success && Array.isArray(data.words) && data.words.length > 0) {
        aiWords = data.words;
      }
    } catch (err) {
      console.log('Using local high-variety vocab bank');
    }

    // Generate 100 progressive words
    const final100 = generate100WordsRun(excludeIds, aiWords);
    setWordsList(final100);
    setIsLoadingWords(false);
    setGameState('playing');

    // Trigger initial warm-up milestone at question 0
    setActiveMilestone(MILESTONE_DEFINITIONS[0]);
    sound.playStreak();
  }, [stats.recentWordIds, profile.currentSubLevel]);

  // Current active word
  const currentWord = wordsList[currentIndex];

  // Play pronunciation
  const handlePlayAudio = (slow: boolean = false) => {
    if (!currentWord) return;
    playUSEnglishVoice(currentWord.english, slow ? 0.50 : 0.95);
  };

  // Close milestone alert and start/continue the current word
  const handleDismissMilestone = () => {
    setActiveMilestone(null);
    if (wordsList[currentIndex]) {
      setTimeout(() => {
        playUSEnglishVoice(wordsList[currentIndex].english, 0.95);
      }, 300);
    }
  };

  // Handle Option Selection
  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentWord) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.trim().toLowerCase() === currentWord.spanish.trim().toLowerCase();
    setIsCorrectAnswer(isCorrect);

    if (isCorrect) {
      sound.playCorrect();
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Auto advance on correct answer after a short pause
      setTimeout(() => {
        advanceNextStep(newScore, strikes);
      }, 1000);
    } else {
      sound.playWrong();
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      setStreak(0);
      setMissedWords(prev => [...prev, { word: currentWord, chosen: option }]);

      // If 3 strikes reached -> Game Over!
      if (newStrikes >= 3) {
        setTimeout(() => {
          finishGame(score, newStrikes);
        }, 1600);
      }
    }
  };

  // Advance to next word or check completion and milestone alerts
  const advanceNextStep = (currentScore: number, currentStrikes: number) => {
    const nextIdx = currentIndex + 1;

    // Check if reached 100 words
    if (nextIdx >= 100 || nextIdx >= wordsList.length) {
      finishGame(currentScore, currentStrikes);
      return;
    }

    setCurrentIndex(nextIdx);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrectAnswer(null);

    // Check for milestone alerts every 20 completed questions (indices 20, 40, 60, 80)
    if (MILESTONE_DEFINITIONS[nextIdx]) {
      setActiveMilestone(MILESTONE_DEFINITIONS[nextIdx]);
      sound.playFanfare();
    } else {
      // Pronounce the new word
      const nextWord = wordsList[nextIdx];
      if (nextWord) {
        setTimeout(() => {
          playUSEnglishVoice(nextWord.english, 0.95);
        }, 200);
      }
    }
  };

  // Finish Game & Record Stats
  const finishGame = (finalScore: number, finalStrikes: number) => {
    const playedIds = wordsList.slice(0, currentIndex + 1).map(w => w.id);
    const updatedStats: VocabGameStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      bestScore: Math.max(stats.bestScore, finalScore),
      perfectGamesCount: stats.perfectGamesCount + (finalScore === 100 && finalStrikes === 0 ? 1 : 0),
      totalWordsGuessed: stats.totalWordsGuessed + finalScore,
      recentWordIds: [...stats.recentWordIds.slice(-150), ...playedIds]
    };

    setStats(updatedStats);
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updatedStats));
    } catch (e) {}

    // Rewards
    const xpGained = finalScore * 2 + (finalScore >= 98 ? 50 : 0);
    const gemsGained = finalScore >= 98 ? 10 : Math.floor(finalScore / 20);
    if (onUpdateXpAndGems) {
      onUpdateXpAndGems(xpGained, gemsGained);
    }

    // Determine Victory vs Game Over
    if (finalScore >= 98) {
      sound.playFanfare();
      setGameState('victory');
    } else {
      setGameState('gameover');
    }
  };

  // Difficulty Tier Info
  const getDifficultyTierLabel = () => {
    if (currentIndex < 20) {
      return { label: 'Bloque 1: Calentamiento (1-20)', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' };
    } else if (currentIndex < 40) {
      return { label: 'Bloque 2: Nivel Aumentando (21-40)', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' };
    } else if (currentIndex < 60) {
      return { label: 'Bloque 3: Intermedio & Laboral (41-60)', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800' };
    } else if (currentIndex < 80) {
      return { label: 'Bloque 4: Vocabulario Avanzado (61-80)', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800' };
    } else {
      return { label: 'Bloque 5: Fase Final C1/C2 (81-100)', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800' };
    }
  };

  const tierInfo = getDifficultyTierLabel();
  const isPerfectScore = score === 100 && strikes === 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 relative">
        
        {/* ================= HEADER ================= */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  Reto 100 Palabras
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Vocab Challenge
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adivina hasta 100 palabras • 3 strikes permitidos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= INTRO SCREEN ================= */}
        {gameState === 'intro' && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/30">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ¿Cuántas palabras puedes acertar?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Pon a prueba tu vocabulario en inglés estadounidense. Empezarás con palabras cotidianas y subirás de nivel cada 20 aciertos hasta llegar a términos avanzados y modismos.
              </p>
            </div>

            {/* Rules Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                  <Flame className="w-4 h-4" />
                  <span>100 Palabras</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dificultad progresiva con alertas amigables de nivel cada 20 palabras.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>Solo 3 Strikes</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Al cometer 3 errores el juego termina y recibes tu calificación (0-100).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  <Crown className="w-4 h-4" />
                  <span>G.O.A.T Status</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  98-100 aciertos para ganar. ¡100/100 sin errores para ser el G.O.A.T!
                </p>
              </div>
            </div>

            {/* Previous Stats Bar */}
            {stats.gamesPlayed > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-around text-xs max-w-lg mx-auto">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Partidas</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">{stats.gamesPlayed}</span>
                </div>
                <div className="h-6 w-px bg-amber-200 dark:bg-amber-800" />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Mejor Puntuación</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">{stats.bestScore} / 100</span>
                </div>
                <div className="h-6 w-px bg-amber-200 dark:bg-amber-800" />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Palabras Acertadas</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{stats.totalWordsGuessed}</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={startNewGame}
                disabled={isLoadingWords}
                className="w-full max-w-sm mx-auto py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isLoadingWords ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Preparando lote de 100 palabras...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>¡Iniciar Reto de 100 Palabras!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= ACTIVE PLAYING SCREEN ================= */}
        {gameState === 'playing' && currentWord && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            
            {/* Top Game Bar: Progress, Score & 3 Strikes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                {/* Word counter */}
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-extrabold">
                    Palabra {currentIndex + 1} de 100
                  </span>
                  <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold ${tierInfo.color}`}>
                    {tierInfo.label}
                  </span>
                </div>

                {/* Score & Strikes */}
                <div className="flex items-center gap-3">
                  {/* Streak */}
                  {streak >= 3 && (
                    <div className="flex items-center gap-1 text-orange-500 font-extrabold animate-pulse">
                      <Flame className="w-4 h-4 fill-orange-500" />
                      <span>{streak} racha</span>
                    </div>
                  )}

                  {/* 3 Strikes Indicators */}
                  <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-rose-900">
                    <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 mr-1">Strikes:</span>
                    {[0, 1, 2].map((idx) => {
                      const isStriked = idx < strikes;
                      return (
                        <span key={idx} className="transition-all duration-300">
                          {isStriked ? (
                            <XCircle className="w-4 h-4 text-rose-600 fill-rose-100 dark:fill-rose-950" />
                          ) : (
                            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {/* Current Score */}
                  <div className="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black border border-amber-300 dark:border-amber-800">
                    Puntos: {score}
                  </div>
                </div>
              </div>

              {/* Progress Bar (0 to 100%) */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentIndex) / 100) * 100}%` }}
                />
              </div>
            </div>

            {/* Word Center Display Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-3 relative shadow-inner">
              {currentWord.category && (
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  {currentWord.category}
                </span>
              )}

              {/* English Word */}
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentWord.english}
              </h2>

              {/* Phonetic Pronunciation Guide */}
              {currentWord.phonetic && (
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Pronunciación: <span className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 px-2 py-0.5 rounded">/{currentWord.phonetic}/</span>
                </p>
              )}

              {/* Audio Pronunciation Buttons (Normal 1.0x & Lento 0.50x) */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePlayAudio(false)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                  title="Reproducir pronunciación en inglés estadounidense normal"
                >
                  <Volume2 className="w-4 h-4 text-indigo-500" />
                  <span>Escuchar</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePlayAudio(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                  title="Reproducir a velocidad lenta (0.50x) para fonética detallada"
                >
                  <span>🐢 0.50x Lento</span>
                </button>
              </div>
            </div>

            {/* 4 Spanish Multiple Choice Options (Concise single-meaning format) */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center">
                Selecciona el significado correcto en español:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentWord.options.map((option, optIdx) => {
                  const isSelected = selectedOption === option;
                  const isThisCorrect = option.trim().toLowerCase() === currentWord.spanish.trim().toLowerCase();

                  let buttonStyle = 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isThisCorrect) {
                      buttonStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
                    } else {
                      buttonStyle = 'opacity-40 bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(option)}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between shadow-sm active:scale-[0.98] cursor-pointer ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center">
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </span>
                        <span className="font-bold">{option}</span>
                      </span>

                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-in zoom-in" />
                      )}
                      {isAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 animate-in zoom-in" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedback & Example (shown if answered) */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 ${
                isCorrectAnswer 
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' 
                  : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 text-xs">
                    <p className={`font-extrabold ${isCorrectAnswer ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                      {isCorrectAnswer ? '¡Correcto! +1 punto' : `¡Strike! La traducción correcta es: "${currentWord.spanish}"`}
                    </p>
                    {currentWord.exampleSentence && (
                      <p className="text-slate-600 dark:text-slate-300 italic">
                        "{currentWord.exampleSentence}"
                        {currentWord.exampleTranslation && <span className="block not-italic text-slate-500 dark:text-slate-400 mt-0.5">({currentWord.exampleTranslation})</span>}
                      </p>
                    )}
                  </div>

                  {!isCorrectAnswer && strikes < 3 && (
                    <button
                      onClick={() => advanceNextStep(score, strikes)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer shadow"
                    >
                      <span>Siguiente</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= MILESTONE ALERT OVERLAY (Every 20 words) ================= */}
        {activeMilestone && gameState === 'playing' && (
          <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-full max-w-md p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border ${activeMilestone.borderColor} shadow-2xl text-center space-y-4`}>
              
              {/* Top Milestone Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <span>{activeMilestone.tag}</span>
              </div>

              {/* Big Emoji / Icon Box */}
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${activeMilestone.gradient} text-white flex items-center justify-center shadow-lg text-3xl`}>
                {activeMilestone.emoji}
              </div>

              {/* Alert Title & Message */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeMilestone.title}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                  {activeMilestone.message}
                </p>
              </div>

              {/* Current Status Pill */}
              <div className={`p-3 rounded-2xl ${activeMilestone.accentBg} border ${activeMilestone.borderColor} flex items-center justify-around text-xs font-bold ${activeMilestone.textColor}`}>
                <div>
                  <span className="block text-[10px] opacity-75">Progreso</span>
                  <span>Palabra {currentIndex + 1} / 100</span>
                </div>
                <div className="h-5 w-px bg-current opacity-20" />
                <div>
                  <span className="block text-[10px] opacity-75">Puntos</span>
                  <span>{score} acertadas</span>
                </div>
                <div className="h-5 w-px bg-current opacity-20" />
                <div>
                  <span className="block text-[10px] opacity-75">Vidas</span>
                  <span>{3 - strikes} strikes restantes</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDismissMilestone}
                className={`w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r ${activeMilestone.gradient} text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
              >
                <span>{activeMilestone.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= GAME OVER SCREEN (3 Strikes) ================= */}
        {gameState === 'gameover' && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 flex items-center justify-center shadow-lg">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                ¡Fin del Juego (3 Strikes)!
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Has alcanzado los 3 strikes permitidos en esta ronda.
              </p>
            </div>

            {/* Score Ring / Card */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tu Calificación de la Ronda</span>
              <div className="text-5xl font-black text-amber-500 tracking-tight">
                {score} <span className="text-2xl text-slate-400 font-bold">/ 100</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Llegaste a la palabra #{currentIndex + 1} de 100
              </p>
            </div>

            {/* Missed Words Review */}
            {missedWords.length > 0 && (
              <div className="max-w-md mx-auto text-left space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Palabras que fallaste:</span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {missedWords.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{item.word.english}</span>
                      <span className="text-rose-700 dark:text-rose-300 font-semibold">Correcto: {item.word.spanish}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={startNewGame}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Jugar Otra Ronda (Nuevas Palabras)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
              >
                Volver al Menú
              </button>
            </div>
          </div>
        )}

        {/* ================= VICTORY SCREEN (98, 99, 100 Puntos) ================= */}
        {gameState === 'victory' && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-center animate-in zoom-in-95">
            
            {/* Trophy Graphic */}
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-yellow-500/50 ring-4 ring-yellow-400/40">
                <Trophy className="w-12 h-12 fill-amber-950" />
              </div>
              <Sparkles className="w-7 h-7 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
            </div>

            {/* Special G.O.A.T Recognition for 100/100 without a single error */}
            {isPerfectScore ? (
              <div className="space-y-2 max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                  <span>🐐 LEGENDARY MASTER • 0 STRIKES 🐐</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight">
                  PERFECT SCORE! YOU ARE THE G.O.A.T! 🐐🏆
                </h2>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                  ¡Increíble hazaña! Lograste adivinar las 100 palabras en inglés sin equivocarte ni una sola vez. Eres el verdadero Greatest Of All Time.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                  <span>🏆 ¡JUEGO GANADO! 🏆</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  ¡Felicidades, eres un Campeón del Vocabulario!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Has completado con éxito el Desafío de 100 Palabras con una puntuación sobresaliente.
                </p>
              </div>
            )}

            {/* Victory Score Card */}
            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 max-w-sm mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Calificación Final</span>
              <div className="text-5xl font-black text-amber-600 dark:text-amber-400">
                {score} <span className="text-2xl text-slate-400">/ 100</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <span>Strikes: {strikes}/3</span>
                <span>•</span>
                <span>Mejor racha: {bestStreak} 🔥</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={startNewGame}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Jugar Otra Ronda (Palabras Nuevas)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
              >
                Cerrar y Continuar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

