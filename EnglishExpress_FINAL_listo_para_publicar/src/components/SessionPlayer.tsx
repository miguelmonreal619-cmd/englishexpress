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
import { loadSessionProgress, saveSessionProgress, clearSessionProgress } from '../utils/storage';

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
  const sessionIdKey = `${subLevel}_s${sessionNumber}`;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  // PERSISTENCIA PARCIAL: Inicializar el índice leyendo el progreso guardado
  const [currentIndex, setCurrentIndex] = useState(() => loadSessionProgress(sessionIdKey));
  
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

  // Initialize Exercises on mount
  useEffect(() => {
    const sessionList = buildAdaptiveSessionExercises(tier, subLevel, profile.allocation, quickCount, sessionNumber);
    setExercises(sessionList);
    
    // Validar que el índice guardado no rebase el límite de la lista generada
    const savedIdx = loadSessionProgress(sessionIdKey);
    if (savedIdx > 0 && savedIdx < sessionList.length) {
      setCurrentIndex(savedIdx);
    }
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

    // Guardar progreso parcial actual
    saveSessionProgress(sessionIdKey, currentIndex);

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

  const handleSubmitAnswer = async () => {
    if (hasSubmitted || !currentExercise) return;

    let isCorrect = false;
    let status: 'correct' | 'almost' | 'incorrect' = 'incorrect';
    let score = 0;

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
    } else if (currentExercise.type === 'speaking_open_question' || currentExercise.type === 'speaking_idea_construction') {
      const response = spokenTranscript || textInput;
      const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
      
      if (wordCount >= 3) {
        isCorrect = true;
        score = 90;
        status = 'correct';
        setAiFeedbackText('¡Excelente respuesta hablada espontánea!');
      } else {
        isCorrect = false;
        score = 45;
        status = 'almost';
        setAiFeedbackText('Intenta elaborar una oración un poco más completa.');
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
          setAiFeedbackText(`Casi perfecto. Te faltó la palabra "${missingWords[0]}".`);
        } else {
          status = 'incorrect';
          score = 0;
          setAiFeedbackText(`Palabras omitidas: ${missingWords.join(', ')}.`);
        }
      } else {
        if (analysis.isExact || analysis.wordAccuracy >= 80) {
          status = 'correct';
          isCorrect = true;
          score = 100;
          setAiFeedbackText('¡Pronunciación clara y precisa!');
        } else if (analysis.wordAccuracy >= 60) {
          status = 'correct';
          isCorrect = true;
          score = 85;
          setAiFeedbackText('¡Bien hecho!');
        } else {
          status = 'almost';
          isCorrect = false;
          score = 55;
          setAiFeedbackText('Pronunciación entendible, practica la entonación.');
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
    
    // Limpiar progreso parcial al terminar con éxito
    clearSessionProgress(sessionIdKey);
    setSessionCompleted(true);
  };

  const handleFinishAndSave = () => {
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10 + vocabBonus.xp;
    const earnedGems = 15 + vocabBonus.gems;

    const updatedScores = { ...profile.disciplineScores };
    (Object.keys(disciplineHits) as Discipline[]).forEach(d => {
      const hit = disciplineHits[d];
      if (hit && hit.total > 0) {
        const accuracy = Math.round((hit.correct / hit.total) * 100);
        const prevScore = (updatedScores as any)[d] || 50;
        (updatedScores as any)[d] = Math.round(prevScore * 0.8 + accuracy * 0.2);
      }
    });

    onFinishSession(earnedXp, earnedGems, sessionIdKey, updatedScores);
  };

  if (!currentExercise) return null;

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
  const ORDERED_DISCIPLINES: Discipline[] = ['vocabulary', 'grammar', 'reading', 'writing', 'listening', 'speaking'];

  if (sessionCompleted) {
    const accuracy = Math.round((correctCount / totalExercises) * 100);
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10;
    const earnedGems = 15;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center my-auto transition-all">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-5 shadow-xl animate-bounce">
              <Award className="w-10 h-10" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 uppercase tracking-wider inline-block mb-2">
              ¡Sesión Completada con Éxito!
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {sessionPlan.title}
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                <Zap className="w-5 h-5 mx-auto text-amber-500 fill-amber-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Experiencia</span>
                <span className="text-base font-black text-amber-600">+{earnedXp} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200">
                <Diamond className="w-5 h-5 mx-auto text-cyan-500 fill-cyan-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-cyan-700 block">Gemas</span>
                <span className="text-base font-black text-cyan-600">+{earnedGems}</span>
              </div>
            </div>
            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Guardar Progreso y Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPreSessionIntro) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl my-auto transition-all">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
                  Etapa {subLevel}
                </span>
                <span className="text-xs font-bold text-slate-500">Sesión {sessionNumber} de 8</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {sessionPlan.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{themeData.unitTitle}</p>
            <button
              onClick={() => setShowPreSessionIntro(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>¡Entendido! Comenzar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-2.5 sm:p-4 py-4 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl my-auto transition-all">
          <div className="flex items-center justify-between gap-3 mb-3">
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <span className="text-xs font-black text-slate-600 dark:text-slate-400">{currentIndex + 1}/{totalExercises}</span>
          </div>

          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {currentExercise.prompt}
            </h3>
          </div>

          <div className="mb-6">
            {currentExercise.options && currentExercise.type !== 'vocab_flashcard' && (
              <div className="space-y-2">
                {(displayOptions.length > 0 ? displayOptions : currentExercise.options).map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border cursor-pointer ${selectedOption === opt ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {!currentExercise.options && currentExercise.discipline !== 'speaking' && (
              <textarea
                rows={2}
                disabled={hasSubmitted}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            )}
          </div>

          {hasSubmitted && (
            <div className="p-4 rounded-2xl border mb-4 text-xs bg-emerald-50 border-emerald-300 text-emerald-900">
              <p className="font-extrabold">¡Respuesta registrada!</p>
            </div>
          )}

          <div>
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedOption && !textInput.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Comprobar Respuesta</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
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
