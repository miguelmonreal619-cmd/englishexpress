import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Volume2, RotateCcw, Sparkles, Trophy, Check, ArrowRight, 
  Flame, Diamond, Zap, Play, Clock, HelpCircle, Layers, Grid, Award, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { MEMORY_TOPICS, MemoryTopic, MemoryCardItem } from '../data/memoryTopics';
import { sound, playUSEnglishVoice, stopSpeech } from '../utils/audio';

interface MemoryGameModalProps {
  profile: UserProfile;
  onClose: () => void;
  onRewardUser: (xp: number, gems: number) => void;
}

interface ActiveCard {
  uid: string; // Unique id for the card instance
  itemId: string; // ID of the underlying vocabulary pair
  type: 'english' | 'spanish';
  text: string;
  subText?: string;
  emoji: string;
  phonetic?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; label: string; gridCols: string; xp: number; gems: number }> = {
  easy: { pairs: 4, label: '4 Pares (8 Cartas)', gridCols: 'grid-cols-2 sm:grid-cols-4', xp: 25, gems: 5 },
  medium: { pairs: 6, label: '6 Pares (12 Cartas)', gridCols: 'grid-cols-3 sm:grid-cols-4', xp: 45, gems: 10 },
  hard: { pairs: 8, label: '8 Pares (16 Cartas)', gridCols: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4', xp: 65, gems: 15 },
  expert: { pairs: 10, label: '10 Pares (20 Cartas)', gridCols: 'grid-cols-4 sm:grid-cols-5', xp: 90, gems: 25 }
};

export const MemoryGameModal: React.FC<MemoryGameModalProps> = ({
  profile,
  onClose,
  onRewardUser
}) => {
  const [selectedTopic, setSelectedTopic] = useState<MemoryTopic | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameState, setGameState] = useState<'topic_select' | 'playing' | 'victory'>('topic_select');

  // Game play state
  const [cards, setCards] = useState<ActiveCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<ActiveCard[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [comboStreak, setComboStreak] = useState(0);
  const [lastMatchedWord, setLastMatchedWord] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format time (mm:ss)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start / Init a Game Session
  const handleStartGame = (topic: MemoryTopic, diff: Difficulty = difficulty) => {
    sound.playTap();
    setSelectedTopic(topic);
    setDifficulty(diff);

    const pairCount = DIFFICULTY_CONFIG[diff].pairs;
    // Shuffle topic items and pick required count
    const shuffledItems = [...topic.items].sort(() => 0.5 - Math.random()).slice(0, pairCount);

    // Build the pair of cards: 1 English card + 1 Spanish card per item
    const generatedCards: ActiveCard[] = [];

    shuffledItems.forEach((item, index) => {
      // English card
      generatedCards.push({
        uid: `${item.id}_en_${Date.now()}_${index}`,
        itemId: item.id,
        type: 'english',
        text: item.english,
        subText: item.phonetic ? `/${item.phonetic}/` : undefined,
        emoji: item.emoji,
        phonetic: item.phonetic,
        isFlipped: false,
        isMatched: false
      });

      // Spanish card
      generatedCards.push({
        uid: `${item.id}_es_${Date.now()}_${index}`,
        itemId: item.id,
        type: 'spanish',
        text: item.spanish,
        subText: 'Español (MX)',
        emoji: item.emoji,
        phonetic: item.phonetic,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the full card deck
    const randomizedCards = generatedCards.sort(() => 0.5 - Math.random());

    setCards(randomizedCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairsCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setComboStreak(0);
    setLastMatchedWord(null);
    setGameState('playing');
  };

  // Handle Card Click
  const handleCardClick = (clickedCard: ActiveCard) => {
    if (isEvaluating || clickedCard.isMatched || clickedCard.isFlipped) return;

    sound.playTap();

    // Speak English pronunciation if an English card is clicked, or speak the item's English version
    const parentItem = selectedTopic?.items.find(i => i.id === clickedCard.itemId);
    if (parentItem) {
      playUSEnglishVoice(parentItem.english, 0.95);
    }

    // Flip the card
    const updatedCards = cards.map(c => 
      c.uid === clickedCard.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // If 2 cards are now flipped, evaluate match
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsEvaluating(true);

      const [first, second] = newFlipped;
      const isMatch = first.itemId === second.itemId && first.type !== second.type;

      if (isMatch) {
        // MATCH!
        setTimeout(() => {
          sound.playCorrect(comboStreak);
          setComboStreak(prev => prev + 1);

          if (parentItem) {
            setLastMatchedWord(`${parentItem.english} = ${parentItem.spanish}`);
            playUSEnglishVoice(parentItem.english, 0.9);
          }

          const matchedCards = updatedCards.map(c => 
            c.itemId === first.itemId ? { ...c, isMatched: true, isFlipped: true } : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setIsEvaluating(false);

          const newMatchedCount = matchedPairsCount + 1;
          setMatchedPairsCount(newMatchedCount);

          // Check for full game victory
          const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
          if (newMatchedCount >= totalPairs) {
            handleVictory();
          }
        }, 450);
      } else {
        // NO MATCH -> Flip back after delay
        setTimeout(() => {
          sound.playIncorrect();
          setComboStreak(0);
          const restoredCards = updatedCards.map(c => 
            c.uid === first.uid || c.uid === second.uid
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(restoredCards);
          setFlippedCards([]);
          setIsEvaluating(false);
        }, 950);
      }
    }
  };

  // Victory Handler
  const handleVictory = () => {
    setIsTimerRunning(false);
    const rewardConfig = DIFFICULTY_CONFIG[difficulty];
    const bonusXp = moves <= rewardConfig.pairs * 1.5 ? 20 : 5;
    const finalXp = rewardConfig.xp + bonusXp;
    const finalGems = rewardConfig.gems;

    onRewardUser(finalXp, finalGems);

    setTimeout(() => {
      sound.playFanfare();
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      setGameState('victory');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all">
        
        {/* ===================================================
            HEADER: Brand & Controls
        =================================================== */}
        <div className="px-5 sm:px-7 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <div className="flex items-center gap-3">
            {gameState !== 'topic_select' && (
              <button
                onClick={() => {
                  sound.playTap();
                  setIsTimerRunning(false);
                  setGameState('topic_select');
                }}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Volver a lista de temas"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-purple-500/20">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Memorama Vocabulario
                </h2>
                <span className="text-[10px] uppercase font-black bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-md">
                  US ⇄ MX
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {gameState === 'topic_select' 
                  ? 'Elige tu tema favorito y entrena tu memoria visual y auditiva' 
                  : `${selectedTopic?.title} • Empareja inglés con español`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playTap();
                stopSpeech();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ===================================================
            VIEW 1: TOPIC & DIFFICULTY SELECTOR
        =================================================== */}
        {gameState === 'topic_select' && (
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
            
            {/* Difficulty Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  1. Selecciona la Dificultad
                </h3>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">
                  +{DIFFICULTY_CONFIG[difficulty].xp} XP • +{DIFFICULTY_CONFIG[difficulty].gems} Gemas
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((diffKey) => {
                  const conf = DIFFICULTY_CONFIG[diffKey];
                  const isSelected = difficulty === diffKey;
                  return (
                    <button
                      key={diffKey}
                      onClick={() => {
                        sound.playTap();
                        setDifficulty(diffKey);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 ring-2 ring-purple-400/30 text-purple-900 dark:text-purple-200 shadow-sm'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-purple-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black capitalize">
                          {diffKey === 'easy' ? 'Fácil' : diffKey === 'medium' ? 'Medio' : diffKey === 'hard' ? 'Difícil' : 'Experto'}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {conf.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  2. Elige un Tópico ({MEMORY_TOPICS.length} Categorías Disponibles)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MEMORY_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleStartGame(topic, difficulty)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                          {topic.emoji}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${topic.badgeBg}`}>
                          {topic.items.length} palabras
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold mb-1">
                        {topic.titleEn}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {topic.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                      <span>Jugar Memorama</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================================================
            VIEW 2: ACTIVE GAME BOARD
        =================================================== */}
        {gameState === 'playing' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between space-y-4">
            
            {/* Top Stats Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedTopic?.emoji}</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {selectedTopic?.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pares: <b>{matchedPairsCount}</b> / {DIFFICULTY_CONFIG[difficulty].pairs}
                  </p>
                </div>
              </div>

              {/* Middle: Combos or Matched Word Helper */}
              {lastMatchedWord && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{lastMatchedWord}</span>
                </div>
              )}

              {/* Right Stats: Timer & Moves */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>{formatTime(timerSeconds)}</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
                  <span>{moves} Movimientos</span>
                </div>

                <button
                  onClick={() => selectedTopic && handleStartGame(selectedTopic, difficulty)}
                  className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors cursor-pointer"
                  title="Reiniciar partida"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className={`grid ${DIFFICULTY_CONFIG[difficulty].gridCols} gap-2.5 sm:gap-3 flex-1 auto-rows-fr`}>
              {cards.map((card) => {
                const isFlipped = card.isFlipped || card.isMatched;

                return (
                  <motion.div
                    key={card.uid}
                    onClick={() => handleCardClick(card)}
                    whileHover={{ scale: card.isMatched ? 1 : 1.02 }}
                    whileTap={{ scale: card.isMatched ? 1 : 0.98 }}
                    className={`relative min-h-[95px] sm:min-h-[115px] rounded-2xl cursor-pointer select-none transition-all duration-300 ${
                      card.isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-600 shadow-sm opacity-90'
                        : isFlipped
                        ? 'bg-white dark:bg-slate-800 border-2 border-purple-500 shadow-md ring-2 ring-purple-300/30'
                        : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-800 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-md'
                    }`}
                  >
                    {/* Card Front (Hidden Mystery state) */}
                    {!isFlipped && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
                        <span className="text-2xl sm:text-3xl opacity-80 mb-1">
                          {selectedTopic?.emoji || '✨'}
                        </span>
                        <span className="text-[10px] font-black tracking-widest text-indigo-200 uppercase">
                          EnglishExpress
                        </span>
                      </div>
                    )}

                    {/* Card Back (Revealed Word state) */}
                    {isFlipped && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2.5 sm:p-3 text-center">
                        <span className="text-2xl sm:text-3xl mb-1">
                          {card.emoji}
                        </span>

                        <p className={`font-black text-xs sm:text-sm leading-tight ${
                          card.type === 'english'
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-slate-800 dark:text-slate-100'
                        }`}>
                          {card.text}
                        </p>

                        <div className="flex items-center gap-1 mt-1">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            card.type === 'english'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {card.type === 'english' ? 'English (US)' : 'Español (MX)'}
                          </span>

                          {card.type === 'english' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playUSEnglishVoice(card.text, 0.9);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                              title="Escuchar pronunciación"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Hint footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>💡 Haz clic en una carta en inglés para escuchar su pronunciación nativa estadounidense.</span>
              <button
                onClick={() => setGameState('topic_select')}
                className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
              >
                Cambiar de tema
              </button>
            </div>

          </div>
        )}

        {/* ===================================================
            VIEW 3: VICTORY & REWARDS CELEBRATION
        =================================================== */}
        {gameState === 'victory' && (
          <div className="p-6 sm:p-10 flex-1 flex flex-col items-center justify-center text-center space-y-6">
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30"
            >
              🏆
            </motion.div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ¡Memorama Completado!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Has emparejado todo el vocabulario de <b>{selectedTopic?.title}</b> con éxito.
              </p>
            </div>

            {/* Stats Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tiempo</span>
                <span className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
                  {formatTime(timerSeconds)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Movimientos</span>
                <span className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
                  {moves}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Recompensas</span>
                <span className="text-xs sm:text-sm font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                  +{DIFFICULTY_CONFIG[difficulty].xp} XP
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
              <button
                onClick={() => selectedTopic && handleStartGame(selectedTopic, difficulty)}
                className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Jugar Otra Ronda</span>
              </button>

              <button
                onClick={() => setGameState('topic_select')}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Cambiar de Tema</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
