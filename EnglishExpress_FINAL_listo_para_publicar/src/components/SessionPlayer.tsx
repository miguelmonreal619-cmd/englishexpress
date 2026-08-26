import React, { useState, useEffect, useRef } from 'react';
import { 
  X, CheckCircle2, XCircle, AlertCircle, Volume2, VolumeX, Mic, ArrowRight, RotateCcw, 
  Sparkles, Award, Bot, Flame, Diamond, Zap, Shuffle, BookOpen, Info, Compass, Lightbulb, 
  ChevronRight, Layers, Check, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise, Discipline, SubLevel, CEFRLevel, UserProfile, VocabPair } from '../types';
import { buildAdaptiveSessionExercises } from '../data/exercisePool';
import { getSubLevelTheme } from '../data/thematicCurriculum';
import { playUSEnglishVoice, sound, calculateTextSimilarity, normalizeText, shuffleArray, analyzeSpokenAccuracy } from '../utils/audio';
import { VocabularyMatch } from './VocabularyMatch';

interface SessionPlayerProps {
  subLevel: SubLevel;
  sessionNumber: number;
  profile: UserProfile;
  quickCount?: number;
  onFinishSession: (earnedXp: number, earnedGems: number, completedSessionId: string, updatedScores: any) => void;
  onClose: () => void;
}

export const SessionPlayer: React.FC<SessionPlayerProps> = ({
  subLevel,
  sessionNumber,
  profile,
  quickCount = 10,
  onFinishSession,
  onClose
}) => {
  const tier = subLevel.substring(0, 2) as CEFRLevel;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThemeGuide, setShowThemeGuide] = useState(false);
  const [showPreSessionIntro, setShowPreSessionIntro] = useState(true);

  const themeData = getSubLevelTheme(subLevel);
  const sessionPlan = themeData.sessions.find(s => s.sessionNumber === sessionNumber) || themeData.sessions[0];

  // Sound and streak state
  const [isSoundMuted, setIsSoundMuted] = useState(() => sound.isMuted());
  const [sessionStreak, setSessionStreak] = useState(0);

  // Interaction state
  const [textInput, setTextInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  
  // In-exercise Mini Vocab Match state
  const [matchPairs, setMatchPairs] = useState<VocabPair[]>([]);
  const [shuffledEngMatch, setShuffledEngMatch] = useState<{ id: string; text: string; phonetic?: string }[]>([]);
  const [shuffledSpaMatch, setShuffledSpaMatch] = useState<{ id: string; text: string }[]>([]);
  const [selectedEngId, setSelectedEngId] = useState<string | null>(null);
  const [selectedSpaId, setSelectedSpaId] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongPairAnimation, setWrongPairAnimation] = useState<{ engId: string; spaId: string } | null>(null);

  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [spokenMissingWords, setSpokenMissingWords] = useState<string[]>([]);
  const [recognitionError, setRecognitionError] = useState('');
  const [speakingAttemptCount, setSpeakingAttemptCount] = useState(0);
  
  // Feedback state
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'almost' | 'incorrect'>('incorrect');
  const [exerciseScore, setExerciseScore] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedbackText, setAiFeedbackText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Session stats & End-of-session vocabulary match
  const [correctCount, setCorrectCount] = useState(0);
  const [showVocabMatch, setShowVocabMatch] = useState(false);
  const [vocabBonus, setVocabBonus] = useState<{ xp: number; gems: number }>({ xp: 0, gems: 0 });
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [disciplineHits, setDisciplineHits] = useState<Record<Discipline, { correct: number; total: number }>>({
    vocabulary: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
    writing: { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
    speaking: { correct: 0, total: 0 }
  });

  const recognitionRef = useRef<any>(null);

  // Initialize Exercises on mount with sessionNumber for authentic thematic syllabus
  useEffect(() => {
    const sessionList = buildAdaptiveSessionExercises(tier, subLevel, profile.allocation, quickCount, sessionNumber);
    setExercises(sessionList);
  }, [subLevel, sessionNumber, quickCount]);

  // Toggle Sound feedback
  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsSoundMuted(newMuted);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setSpokenTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        setRecognitionError('No se pudo captar la voz claramente. Puedes intentar de nuevo.');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, []);

  const currentExercise = exercises[currentIndex];
  const totalExercises = exercises.length;

  // Reset on exercise change
  useEffect(() => {
    if (!currentExercise) return;

    setTextInput('');
    setSelectedOption(null);
    setSpokenTranscript('');
    setSpokenMissingWords([]);
    setSpeakingAttemptCount(0);
    setHasSubmitted(false);
    setIsCurrentCorrect(false);
    setAnswerStatus('incorrect');
    setExerciseScore(0);
    setAiFeedbackText('');
    setRecognitionError('');

    // Mini Vocab Match setup
    if (currentExercise.type === 'vocab_match' && currentExercise.vocabPairs) {
      const pairs = currentExercise.vocabPairs;
      setMatchPairs(pairs);
      setMatchedPairIds([]);
      setSelectedEngId(null);
      setSelectedSpaId(null);
      setWrongPairAnimation(null);
      setShuffledEngMatch(shuffleArray(pairs.map(p => ({ id: p.id, text: p.english, phonetic: p.phonetic }))));
      setShuffledSpaMatch(shuffleArray(pairs.map(p => ({ id: p.id, text: p.spanish }))));
    }

    if ((currentExercise.type === 'writing_reorder' || currentExercise.type === 'grammar_order') && currentExercise.options) {
      setAvailableWords(shuffleArray(currentExercise.options));
      setSelectedWords([]);
    } else if (currentExercise.options) {
      setDisplayOptions(shuffleArray(currentExercise.options));
    } else {
      setDisplayOptions([]);
    }

    // Auto-play audio on listening or vocab flashcards if appropriate
    if ((currentExercise.discipline === 'listening' || currentExercise.type === 'vocab_flashcard') && currentExercise.audioText) {
      setTimeout(() => {
        handlePlayAudio(currentExercise.audioText!, 0.95);
      }, 300);
    }
  }, [currentIndex, exercises]);

  const handleReshuffleWords = () => {
    sound.playTap();
    if (currentExercise?.options) {
      setAvailableWords(shuffleArray(currentExercise.options));
      setSelectedWords([]);
    }
  };

  const handlePlayAudio = (text: string, rate: number = 0.94) => {
    setIsPlayingAudio(true);
    playUSEnglishVoice(text, rate, () => {
      setIsPlayingAudio(false);
    }, subLevel);
  };

  const startVoiceRecording = () => {
    setRecognitionError('');
    setSpokenTranscript('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {}
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
      } catch (e) {}
    }
  };

  // Word reordering
  const handleSelectWord = (word: string, index: number) => {
    sound.playSelect();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeselectWord = (word: string, index: number) => {
    sound.playUnselect();
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRetrySpeaking = () => {
    sound.playTap();
    setSpeakingAttemptCount(prev => prev + 1);
    setHasSubmitted(false);
    setSpokenTranscript('');
    setTextInput('');
    setSpokenMissingWords([]);
    setAiFeedbackText('');
    setAnswerStatus('incorrect');
  };

  // In-exercise Mini Vocab Match Logic
  const handleMatchSelectEng = (id: string, text: string) => {
    if (matchedPairIds.includes(id)) return;
    sound.playTap();
    handlePlayAudio(text, 1.0);
    setSelectedEngId(id);

    if (selectedSpaId) {
      checkMiniMatch(id, selectedSpaId);
    }
  };

  const handleMatchSelectSpa = (id: string) => {
    if (matchedPairIds.includes(id)) return;
    sound.playTap();
    setSelectedSpaId(id);

    if (selectedEngId) {
      checkMiniMatch(selectedEngId, id);
    }
  };

  const checkMiniMatch = (engId: string, spaId: string) => {
    if (engId === spaId) {
      sound.playCorrect(matchedPairIds.length + 1);
      const nextMatched = [...matchedPairIds, engId];
      setMatchedPairIds(nextMatched);
      setSelectedEngId(null);
      setSelectedSpaId(null);

      // If all matched, mark exercise as correct!
      if (nextMatched.length === matchPairs.length && matchPairs.length > 0) {
        setTimeout(() => {
          submitDirectSuccess();
        }, 500);
      }
    } else {
      sound.playIncorrect();
      setWrongPairAnimation({ engId, spaId });
      setTimeout(() => {
        setSelectedEngId(null);
        setSelectedSpaId(null);
        setWrongPairAnimation(null);
      }, 700);
    }
  };

  const submitDirectSuccess = () => {
    const nextStreak = sessionStreak + 1;
    setSessionStreak(nextStreak);
    sound.playCorrect(nextStreak);
    setCorrectCount(prev => prev + 1);
    setIsCurrentCorrect(true);
    setAnswerStatus('correct');
    setExerciseScore(100);
    setHasSubmitted(true);
    setDisciplineHits(prev => ({
      ...prev,
      [currentExercise.discipline]: {
        correct: prev[currentExercise.discipline].correct + 1,
        total: prev[currentExercise.discipline].total + 1
      }
    }));
  };

  // Submit Answer
  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentExercise) return;

    let isCorrect = false;
    let status: 'correct' | 'almost' | 'incorrect' = 'incorrect';
    let score = 0;

    // Vocab Match
    if (currentExercise.type === 'vocab_match') {
      if (matchedPairIds.length === matchPairs.length && matchPairs.length > 0) {
        isCorrect = true;
        status = 'correct';
        score = 100;
      } else {
        isCorrect = false;
        status = 'incorrect';
        score = 0;
      }
    }
    // Check if open-ended idea construction / conversation speaking
    else if (currentExercise.type === 'speaking_open_question' || currentExercise.type === 'speaking_idea_construction') {
      const response = spokenTranscript || textInput;
      const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
      
      if (wordCount >= 3) {
        isCorrect = true;
        score = 90;
        status = 'correct';
        setAiFeedbackText('¡Excelente respuesta hablada espontánea! Mantuviste la fluidez y estructura comunicativa.');
      } else {
        isCorrect = false;
        score = 45;
        status = 'almost';
        setAiFeedbackText('Intenta elaborar una oración un poco más completa (al menos 3 a 4 palabras).');
      }

    } else if (currentExercise.discipline === 'speaking') {
      const response = spokenTranscript || textInput;
      const analysis = analyzeSpokenAccuracy(currentExercise.targetText, response);
      const missingWords = analysis.missingWords;
      const allWordsSpoken = analysis.allWordsPresent;

      setSpokenMissingWords(missingWords);

      if (!allWordsSpoken || missingWords.length > 0) {
        isCorrect = false;
        if (missingWords.length === 1 && analysis.targetWordsCount >= 4 && analysis.wordAccuracy >= 70) {
          status = 'almost';
          score = Math.min(50, analysis.wordAccuracy);
          setAiFeedbackText(`Casi perfecto. Te faltó pronunciar la palabra "${missingWords[0]}".`);
        } else {
          status = 'incorrect';
          score = 0;
          setAiFeedbackText(`Palabras omitidas o no detectadas: ${missingWords.join(', ')}.`);
        }
      } else {
        if (analysis.isExact || analysis.wordAccuracy >= 80) {
          status = 'correct';
          isCorrect = true;
          score = 100;
          setAiFeedbackText('¡Pronunciación clara, completa y precisa!');
        } else if (analysis.wordAccuracy >= 60) {
          status = 'correct';
          isCorrect = true;
          score = 85;
          setAiFeedbackText('¡Bien hecho! Dijiste todas las palabras requeridas.');
        } else {
          status = 'almost';
          isCorrect = false;
          score = 55;
          setAiFeedbackText('Pronunciación entendible, pero practica la entonación nativa.');
        }
      }

    } else if (currentExercise.type === 'writing_reorder' || currentExercise.type === 'grammar_order') {
      const constructed = selectedWords.join(' ');
      const isExact = normalizeText(constructed) === normalizeText(currentExercise.targetText);
      if (isExact) {
        status = 'correct';
        isCorrect = true;
        score = 100;
      } else {
        const sim = calculateTextSimilarity(currentExercise.targetText, constructed);
        if (sim >= 60) {
          status = 'almost';
          isCorrect = false;
          score = Math.max(50, Math.round(sim * 0.75));
        } else {
          status = 'incorrect';
          isCorrect = false;
          score = 0;
        }
      }

    } else if (currentExercise.options && currentExercise.type !== 'writing_reorder' && currentExercise.type !== 'grammar_order') {
      const normSelected = normalizeText(selectedOption || '');
      const normTarget = normalizeText(currentExercise.targetText || '');
      const normCorrectOption = currentExercise.correctOption ? normalizeText(currentExercise.correctOption) : null;

      const isTargetMatch = normSelected === normTarget;
      const isCorrectOptionMatch = normCorrectOption ? normSelected === normCorrectOption : false;
      const isAcceptableMatch = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normSelected) || false;

      if (isTargetMatch || isCorrectOptionMatch || isAcceptableMatch) {
        status = 'correct';
        isCorrect = true;
        score = 100;
      } else {
        status = 'incorrect';
        isCorrect = false;
        score = 0;
      }

    } else {
      const normInput = normalizeText(textInput);
      const normTarget = normalizeText(currentExercise.targetText);
      const isExact = normInput === normTarget;
      const isAcceptable = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normInput);

      if (isExact || isAcceptable) {
        status = 'correct';
        isCorrect = true;
        score = 100;
      } else {
        const sim = calculateTextSimilarity(currentExercise.targetText, textInput);
        if (sim >= 88) {
          status = 'correct';
          isCorrect = true;
          score = 100;
        } else if (sim >= 55) {
          status = 'almost';
          isCorrect = false;
          score = Math.max(50, Math.round(sim * 0.8));
        } else {
          status = 'incorrect';
          isCorrect = false;
          score = 0;
        }
      }
    }

    if (status === 'correct') {
      const nextStreak = sessionStreak + 1;
      setSessionStreak(nextStreak);
      sound.playCorrect(nextStreak);
      setCorrectCount(prev => prev + 1);
    } else if (status === 'almost') {
      setSessionStreak(0);
      sound.playAlmost();
      setCorrectCount(prev => prev + 0.75);
    } else {
      setSessionStreak(0);
      sound.playIncorrect();
    }

    setIsCurrentCorrect(isCorrect);
    setAnswerStatus(status);
    setExerciseScore(score);
    setHasSubmitted(true);

    // Track discipline hit
    setDisciplineHits(prev => ({
      ...prev,
      [currentExercise.discipline]: {
        correct: prev[currentExercise.discipline].correct + (isCorrect ? 1 : status === 'almost' ? 0.75 : 0),
        total: prev[currentExercise.discipline].total + 1
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalExercises) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    sound.playFanfare();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setSessionCompleted(true);
  };

  const handleFinishAndSave = () => {
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10 + vocabBonus.xp;
    const earnedGems = 15 + vocabBonus.gems;
    const sessionId = `${subLevel}_s${sessionNumber}`;

    // Calibrate user discipline scores incrementally
    const updatedScores = { ...profile.disciplineScores };
    (Object.keys(disciplineHits) as Discipline[]).forEach(d => {
      const hit = disciplineHits[d];
      if (hit && hit.total > 0) {
        const accuracy = Math.round((hit.correct / hit.total) * 100);
        const prevScore = (updatedScores as any)[d] || 50;
        (updatedScores as any)[d] = Math.round(prevScore * 0.8 + accuracy * 0.2);
      }
    });

    onFinishSession(earnedXp, earnedGems, sessionId, updatedScores);
  };

  if (!currentExercise) return null;

  // Strict 6 Disciplines Palette & Metadata
  const discInfo: Record<Discipline, { bg: string; text: string; label: string; phaseNum: number; icon: any }> = {
    vocabulary: { bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300', text: 'text-emerald-500', label: '1. Vocabulario', phaseNum: 1, icon: BookOpen },
    grammar: { bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300', text: 'text-indigo-500', label: '2. Gramática', phaseNum: 2, icon: Zap },
    reading: { bg: 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300', text: 'text-sky-500', label: '3. Lectura', phaseNum: 3, icon: Award },
    writing: { bg: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300', text: 'text-amber-500', label: '4. Escritura', phaseNum: 4, icon: Bot },
    listening: { bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300', text: 'text-cyan-500', label: '5. Escucha', phaseNum: 5, icon: Volume2 },
    speaking: { bg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300', text: 'text-rose-500', label: '6. Habla', phaseNum: 6, icon: Mic }
  };

  const currentDisc = discInfo[currentExercise.discipline] || discInfo.vocabulary;
  const DiscIcon = currentDisc.icon;
  const progressPercent = Math.round(((currentIndex + 1) / totalExercises) * 100);

  // Ordered disciplines list for stepper
  const ORDERED_DISCIPLINES: Discipline[] = ['vocabulary', 'grammar', 'reading', 'writing', 'listening', 'speaking'];

  // ==========================================
  // RENDER COMPLETION MODAL
  // ==========================================
  if (sessionCompleted) {
    const accuracy = Math.round((correctCount / totalExercises) * 100);
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10;
    const earnedGems = 15;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center my-auto transition-all">
            
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/20 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider inline-block mb-2">
              ¡Sesión Completada con Éxito!
            </span>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {sessionPlan.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Completaste los 6 pilares: Vocabulario, Gramática, Lectura, Escritura, Escucha y Habla.
            </p>

            {/* Rewards Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                <Zap className="w-5 h-5 mx-auto text-amber-500 fill-amber-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 block">Experiencia</span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400">
                  +{earnedXp} XP
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50">
                <Diamond className="w-5 h-5 mx-auto text-cyan-500 fill-cyan-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-300 block">Gemas</span>
                <span className="text-base font-black text-cyan-600 dark:text-cyan-400">
                  +{earnedGems}
                </span>
              </div>
            </div>

            {/* Accuracy Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Precisión global de la sesión:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${accuracy}%` }} />
              </div>

              {/* Mini discipline checks */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Vocabulario</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-indigo-500" />
                  <span>Gramática</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-sky-500" />
                  <span>Lectura</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-amber-500" />
                  <span>Escritura</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-cyan-500" />
                  <span>Escucha</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-rose-500" />
                  <span>Habla</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Guardar Progreso y Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER PRE-SESSION INTRODUCTION SCREEN
  // ==========================================
  if (showPreSessionIntro) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl my-auto transition-all">
            
            {/* Header: Title & Close */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
                  Etapa {subLevel}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Sesión {sessionNumber} de 8
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thematic Unit & Book Module */}
            <div className="mb-4">
              <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                {themeData.americanBookModule}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {sessionPlan.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {themeData.unitTitle}
              </p>
            </div>

            {/* Structured 6-Step Discipline Roadmap */}
            <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/80 dark:to-blue-950/30 border border-slate-200/90 dark:border-slate-700/90">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Ruta Pedagógica de la Sesión:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 font-bold flex items-center gap-1.5">
                  <span>📚</span>
                  <span>1. Vocabulario (5)</span>
                </div>
                <div className="p-2 rounded-xl bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800 font-bold flex items-center gap-1.5">
                  <span>🧩</span>
                  <span>2. Gramática (5)</span>
                </div>
                <div className="p-2 rounded-xl bg-sky-100/70 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-800 font-bold flex items-center gap-1.5">
                  <span>📖</span>
                  <span>3. Lectura</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-bold flex items-center gap-1.5">
                  <span>✍️</span>
                  <span>4. Escritura</span>
                </div>
                <div className="p-2 rounded-xl bg-cyan-100/70 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-800 font-bold flex items-center gap-1.5">
                  <span>🎧</span>
                  <span>5. Escucha</span>
                </div>
                <div className="p-2 rounded-xl bg-rose-100/70 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 font-bold flex items-center gap-1.5">
                  <span>🎙️</span>
                  <span>6. Habla</span>
                </div>
              </div>
            </div>

            {/* Key Briefing Details */}
            <div className="space-y-2.5 my-4">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Enfoque de Gramática & Vocabulario
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                    {sessionPlan.grammarFocus}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Escenario en la Vida Real (EE.UU.)
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300/90 mt-0.5 font-medium">
                    {sessionPlan.realLifeContext}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={() => setShowPreSessionIntro(false)}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>¡Entendido! Comenzar con Vocabulario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER ACTIVE QUESTION
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-2.5 sm:p-4 py-4 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl my-auto transition-all">
        
        {/* Header Bar: Close + Discipline + Progress + Sound Toggle */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cerrar sesión"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-xs">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isSoundMuted
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-500 hover:bg-rose-100'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title={isSoundMuted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-xs font-black text-slate-600 dark:text-slate-400">
              {currentIndex + 1}/{totalExercises}
            </span>
          </div>
        </div>

        {/* 6-Phase Pipeline Tracker Bar */}
        <div className="mb-3.5 p-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max justify-between text-[11px] font-bold">
            {ORDERED_DISCIPLINES.map((disc, idx) => {
              const info = discInfo[disc];
              const isActive = currentExercise.discipline === disc;
              return (
                <div
                  key={disc}
                  className={`px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 ${
                    isActive
                      ? `${info.bg} ring-2 ring-blue-500 shadow-sm scale-105 font-black`
                      : 'text-slate-500 dark:text-slate-400 opacity-60'
                  }`}
                >
                  <span>{info.label.split(' ')[0]}</span>
                  <span>{info.label.split(' ')[1]}</span>
                  {idx < ORDERED_DISCIPLINES.length - 1 && <span className="opacity-30 ml-1">➔</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Thematic Unit & Session Context Banner */}
        <div className="mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-blue-950/30 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white">
                {themeData.unitTitle.split(':')[0] || 'Unidad'}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                {sessionPlan.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              🎯 <strong>Enfoque:</strong> {sessionPlan.grammarFocus} • 🌎 {sessionPlan.realLifeContext}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowThemeGuide(!showThemeGuide)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 shadow-sm shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
            title="Ver guía temática de la unidad"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Guía</span>
          </button>
        </div>

        {/* Thematic Guide Modal if expanded */}
        {showThemeGuide && (
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-xs text-blue-950 dark:text-blue-100">
                  {themeData.unitTitle} ({themeData.americanBookModule})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowThemeGuide(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5">📚 Gramática Clave:</span>
                {themeData.keyGrammar}
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5">🗣️ Vocabulario Clave:</span>
                {themeData.keyVocabulary}
              </div>
            </div>
          </div>
        )}

        {/* Discipline Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border shadow-sm ${currentDisc.bg}`}>
            <DiscIcon className="w-3.5 h-3.5" />
            {currentDisc.label}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Etapa {subLevel} • Sesión {sessionNumber}
          </span>
        </div>

        {/* Reading Passage if any */}
        {currentExercise.passage && (
          <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 mb-4 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
            <span className="font-sans text-[10px] uppercase font-bold text-sky-600 block mb-1">
              📖 Texto en Contexto Real:
            </span>
            {currentExercise.passage}
          </div>
        )}

        {/* Grammar Rule Formula Visualizer */}
        {currentExercise.ruleFormula && (
          <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-3.5 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-indigo-700 dark:text-indigo-300 block">
                Fórmula / Patrón Gramatical:
              </span>
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-100">
                {currentExercise.ruleFormula}
              </span>
            </div>
          </div>
        )}

        {/* Prompt Header */}
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
            {currentExercise.prompt}
          </h3>
          {currentExercise.phoneticGuide && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
              Fonética para mexicanos: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{currentExercise.phoneticGuide}</span>
            </p>
          )}
        </div>

        {/* Audio control if available */}
        {currentExercise.audioText && currentExercise.type !== 'vocab_flashcard' && (
          <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => handlePlayAudio(currentExercise.audioText!, 0.95)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              <span>{isPlayingAudio ? 'Reproduciendo...' : 'Audio US'}</span>
            </button>
            <button
              type="button"
              onClick={() => handlePlayAudio(currentExercise.audioText!, 0.50)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 cursor-pointer"
            >
              🐢 0.50x Lento
            </button>
          </div>
        )}

        {/* ==========================================
            INTERACTION CANVAS
        ========================================== */}
        <div className="mb-6">
          
          {/* 1. VOCABULARY FLASHCARD CARD */}
          {currentExercise.type === 'vocab_flashcard' && (
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/40 dark:to-slate-900 border-2 border-emerald-200 dark:border-emerald-800/70 text-center shadow-md">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                  Palabra / Frase en Inglés
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight my-2">
                  {currentExercise.targetText}
                </h2>

                {currentExercise.phoneticGuide && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold my-1">
                    <span>🗣️ Pronunciación:</span>
                    <span>"{currentExercise.phoneticGuide}"</span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText, 0.95)}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>Pronunciación</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText, 0.50)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold border border-emerald-300 dark:border-emerald-700 cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <span>🐢 0.50x Lento</span>
                  </button>
                </div>
              </div>

              {/* Options to confirm understanding */}
              {currentExercise.options && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block px-1">
                    {/^[\x00-\x7F\s.,!?¡¿'"()/&-]*$/.test(currentExercise.options.join(''))
                      ? 'Selecciona la palabra o frase correcta en inglés:'
                      : 'Selecciona el significado en español:'}
                  </span>
                  {displayOptions.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const normOpt = normalizeText(opt);
                    const isOptionCorrect = normOpt === normalizeText(currentExercise.correctOption || currentExercise.targetText) ||
                                           currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normOpt);

                    let buttonClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750';

                    if (hasSubmitted) {
                      if (isOptionCorrect) {
                        buttonClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-extrabold ring-2 ring-emerald-500';
                      } else if (isSelected && !isOptionCorrect) {
                        buttonClass = 'bg-rose-500 text-white border-rose-600 shadow-md font-extrabold ring-2 ring-rose-500';
                      } else {
                        buttonClass = 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      buttonClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasSubmitted}
                        onClick={() => {
                          sound.playSelect();
                          setSelectedOption(opt);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold border transition-all flex items-center justify-between cursor-pointer ${buttonClass}`}
                      >
                        <span>{opt}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          hasSubmitted && isOptionCorrect
                            ? 'border-white bg-white text-emerald-600 font-black text-[10px]'
                            : hasSubmitted && isSelected && !isOptionCorrect
                            ? 'border-white bg-white text-rose-600 font-black text-[10px]'
                            : isSelected
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300'
                        }`}>
                          {hasSubmitted && isOptionCorrect ? (
                            '✓'
                          ) : hasSubmitted && isSelected && !isOptionCorrect ? (
                            '✕'
                          ) : isSelected ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 2. MINI IN-EXERCISE VOCAB MATCH GAME */}
          {currentExercise.type === 'vocab_match' && matchPairs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Toca una palabra en inglés y su pareja en español:</span>
                <span className="text-emerald-600 font-extrabold">{matchedPairIds.length}/{matchPairs.length} emparejados</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* English Column */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block px-1">Inglés (US)</span>
                  {shuffledEngMatch.map(eng => {
                    const isMatched = matchedPairIds.includes(eng.id);
                    const isSelected = selectedEngId === eng.id;
                    const isWrong = wrongPairAnimation?.engId === eng.id;

                    return (
                      <button
                        key={eng.id}
                        disabled={isMatched || hasSubmitted}
                        onClick={() => handleMatchSelectEng(eng.id, eng.text)}
                        className={`w-full p-3 rounded-2xl text-left text-xs font-bold border transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 opacity-80 cursor-default'
                            : isWrong
                            ? 'bg-rose-100 border-rose-500 text-rose-800 animate-shake'
                            : isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{eng.text}</span>
                          {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        {eng.phonetic && !isMatched && (
                          <span className="text-[10px] text-slate-400 font-normal block italic">{eng.phonetic}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Spanish Column */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block px-1">Español</span>
                  {shuffledSpaMatch.map(spa => {
                    const isMatched = matchedPairIds.includes(spa.id);
                    const isSelected = selectedSpaId === spa.id;
                    const isWrong = wrongPairAnimation?.spaId === spa.id;

                    return (
                      <button
                        key={spa.id}
                        disabled={isMatched || hasSubmitted}
                        onClick={() => handleMatchSelectSpa(spa.id)}
                        className={`w-full p-3 rounded-2xl text-left text-xs font-bold border transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 opacity-80 cursor-default'
                            : isWrong
                            ? 'bg-rose-100 border-rose-500 text-rose-800 animate-shake'
                            : isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{spa.text}</span>
                          {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. SPEAKING DISCIPLINE */}
          {currentExercise.discipline === 'speaking' && (
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-center space-y-3">
              <span className="text-xs text-slate-500 block">Frase a pronunciar en voz alta:</span>
              <p className="text-lg font-black text-slate-900 dark:text-white">"{currentExercise.targetText}"</p>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                    isRecording ? 'bg-rose-600 animate-pulse scale-110' : 'bg-rose-500 hover:bg-rose-600'
                  }`}
                >
                  <Mic className="w-7 h-7" />
                </button>
              </div>

              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {isRecording ? '🎙️ Escuchando... habla ahora' : 'Presiona el micrófono para hablar'}
              </p>

              {spokenTranscript && (
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-xs">
                  <span className="text-[10px] text-slate-400 block">Tu voz reconocida:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{spokenTranscript}</span>
                </div>
              )}
            </div>
          )}

          {/* 4. WORD REORDER / GRAMMAR ORDER */}
          {(currentExercise.type === 'writing_reorder' || currentExercise.type === 'grammar_order') && (
            <div className="space-y-3">
              <div className="min-h-14 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toca las palabras abajo en el orden correcto...</span>
                ) : (
                  selectedWords.map((w, idx) => (
                    <button
                      key={idx}
                      disabled={hasSubmitted}
                      onClick={() => handleDeselectWord(w, idx)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      {w}
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Bloques disponibles:
                </span>
                {!hasSubmitted && (
                  <button
                    type="button"
                    onClick={handleReshuffleWords}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Shuffle className="w-3 h-3 text-amber-500" />
                    <span>Mezclar</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {availableWords.map((w, idx) => (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => handleSelectWord(w, idx)}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 hover:border-blue-500 shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. MULTIPLE CHOICE OPTIONS (Grammar Choice, Vocab Select, Reading Comprehension, Listening Select) */}
          {currentExercise.options && 
           currentExercise.type !== 'writing_reorder' && 
           currentExercise.type !== 'grammar_order' && 
           currentExercise.type !== 'vocab_flashcard' && 
           currentExercise.type !== 'vocab_match' && (
            <div className="space-y-2">
              {(displayOptions.length > 0 ? displayOptions : currentExercise.options).map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const normOpt = normalizeText(opt);
                const isOptionCorrect = normOpt === normalizeText(currentExercise.correctOption || currentExercise.targetText) ||
                                       currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normOpt);

                let buttonClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750';

                if (hasSubmitted) {
                  if (isOptionCorrect) {
                    buttonClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-extrabold ring-2 ring-emerald-500';
                  } else if (isSelected && !isOptionCorrect) {
                    buttonClass = 'bg-rose-500 text-white border-rose-600 shadow-md font-extrabold ring-2 ring-rose-500';
                  } else {
                    buttonClass = 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedOption(opt);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center justify-between cursor-pointer ${buttonClass}`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      hasSubmitted && isOptionCorrect
                        ? 'border-white bg-white text-emerald-600 font-black text-[10px]'
                        : hasSubmitted && isSelected && !isOptionCorrect
                        ? 'border-white bg-white text-rose-600 font-black text-[10px]'
                        : isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-300'
                    }`}>
                      {hasSubmitted && isOptionCorrect ? (
                        '✓'
                      ) : hasSubmitted && isSelected && !isOptionCorrect ? (
                        '✕'
                      ) : isSelected ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 6. FREE TEXT INPUT */}
          {!currentExercise.options && 
           currentExercise.discipline !== 'speaking' && 
           currentExercise.type !== 'vocab_match' && (
            <textarea
              rows={2}
              disabled={hasSubmitted}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Escribe en inglés estadounidense..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

        </div>

        {/* ==========================================
            FEEDBACK SHEET
        ========================================== */}
        {hasSubmitted && (
          <div className={`p-4 rounded-2xl border mb-4 text-xs transition-all shadow-sm ${
            answerStatus === 'correct'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
              : answerStatus === 'almost'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-start gap-2.5">
              {answerStatus === 'correct' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : answerStatus === 'almost' ? (
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <p className={`font-extrabold ${
                      answerStatus === 'correct'
                        ? 'text-emerald-800 dark:text-emerald-200'
                        : answerStatus === 'almost'
                        ? 'text-amber-900 dark:text-amber-200'
                        : 'text-rose-800 dark:text-rose-200'
                    }`}>
                      {answerStatus === 'correct'
                        ? '¡Correcto!'
                        : answerStatus === 'almost'
                        ? '¡Casi correcto! (Crédito parcial otorgado)'
                        : 'Respuesta incorrecta'}
                    </p>
                    {answerStatus === 'correct' && sessionStreak >= 2 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-800">
                        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                        <span>¡Racha x{sessionStreak}!</span>
                      </span>
                    )}
                  </div>
                  {answerStatus === 'almost' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                      {exerciseScore}% Crédito
                    </span>
                  )}
                </div>

                {answerStatus === 'almost' && (
                  <p className="text-amber-900 dark:text-amber-200 font-medium">
                    Tuviste algunos errores menores, pero la construcción o pronunciación estuvo muy próxima.
                  </p>
                )}

                {currentExercise.discipline === 'speaking' && spokenMissingWords.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs">
                    <p className="font-extrabold flex items-center gap-1.5">
                      <span>⚠️ Palabras omitidas en tu pronunciación:</span>
                    </p>
                    <p className="mt-1 font-bold">
                      {spokenMissingWords.map(w => `"${w}"`).join(', ')}
                    </p>
                  </div>
                )}

                {answerStatus !== 'correct' && currentExercise.type !== 'vocab_match' && (
                  <div className="pt-0.5">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {answerStatus === 'almost' ? 'Respuesta óptima recomendada:' : 'Respuesta esperada:'}
                    </span>
                    <p className="font-bold text-slate-900 dark:text-slate-100 bg-white/70 dark:bg-slate-900/50 p-2 rounded-xl border border-slate-200 dark:border-slate-800 mt-1">
                      "{currentExercise.correctOption || currentExercise.targetText}"
                    </p>
                  </div>
                )}

                {/* Speaking Attempt Counter / Limit Alert */}
                {currentExercise.discipline === 'speaking' && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      Intento {speakingAttemptCount + 1} de 3
                    </span>
                    {answerStatus !== 'correct' && (
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {speakingAttemptCount < 2 
                          ? `Tienes ${2 - speakingAttemptCount} ${2 - speakingAttemptCount === 1 ? 'reintento restante' : 'reintentos restantes'}` 
                          : 'Límite de 3 intentos alcanzado'}
                      </span>
                    )}
                  </div>
                )}

                {currentExercise.explanation && <p className="opacity-90 leading-relaxed text-slate-700 dark:text-slate-300">{currentExercise.explanation}</p>}
                {currentExercise.mexicanTip && (
                  <p className="text-amber-800 dark:text-amber-300 font-medium pt-0.5">
                    💡 Tip México vs EE.UU.: {currentExercise.mexicanTip}
                  </p>
                )}
                {aiFeedbackText && (
                  <div className="text-indigo-800 dark:text-indigo-200 font-medium pt-1 whitespace-pre-line bg-indigo-50/80 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <span className="font-bold block text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-0.5">
                      💬 Análisis y Recomendación:
                    </span>
                    <span className="text-xs leading-relaxed">{aiFeedbackText}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div>
          {!hasSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={
                aiLoading ||
                (currentExercise.type === 'vocab_match' && matchedPairIds.length < matchPairs.length) ||
                ((currentExercise.type === 'writing_reorder' || currentExercise.type === 'grammar_order') && selectedWords.length === 0) ||
                (currentExercise.options && currentExercise.type !== 'writing_reorder' && currentExercise.type !== 'grammar_order' && currentExercise.type !== 'vocab_match' && !selectedOption) ||
                (!currentExercise.options && currentExercise.discipline !== 'speaking' && currentExercise.type !== 'vocab_match' && !textInput.trim()) ||
                (currentExercise.discipline === 'speaking' && !spokenTranscript && !textInput.trim())
              }
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {aiLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Evaluando respuesta...</span>
                </>
              ) : currentExercise.type === 'vocab_match' && matchedPairIds.length < matchPairs.length ? (
                <span>Empareja todas las palabras para continuar ({matchedPairIds.length}/{matchPairs.length})</span>
              ) : (
                <span>Comprobar Respuesta</span>
              )}
            </button>
          ) : currentExercise.discipline === 'speaking' && answerStatus !== 'correct' && speakingAttemptCount < 2 ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleRetrySpeaking}
                className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Pronunciación ({speakingAttemptCount + 2}/3)</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentIndex + 1 === totalExercises ? 'Completar Sesión' : 'Continuar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 === totalExercises ? 'Completar Sesión' : 'Continuar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  </div>
  );
};
