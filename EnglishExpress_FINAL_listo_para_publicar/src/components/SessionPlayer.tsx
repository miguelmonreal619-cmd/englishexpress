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
  
  const [currentIndex, setCurrentIndex] = useState(() => loadSessionProgress(sessionIdKey));
  const [showThemeGuide, setShowThemeGuide] = useState(false);
  const [showPreSessionIntro, setShowPreSessionIntro] = useState(true);

  const themeData = getSubLevelTheme(subLevel);
  const sessionPlan = themeData.sessions.find(s => s.sessionNumber === sessionNumber) || themeData.sessions[0];

  const [isSoundMuted, setIsSoundMuted] = useState(() => sound.isMuted());
  const [sessionStreak, setSessionStreak] = useState(0);

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

  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [spokenMissingWords, setSpokenMissingWords] = useState<string[]>([]);
  const [recognitionError, setRecognitionError] = useState('');
  const [speakingAttemptCount, setSpeakingAttemptCount] = useState(0);
  
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'almost' | 'incorrect'>('incorrect');
  const [exerciseScore, setExerciseScore] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedbackText, setAiFeedbackText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
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

  useEffect(() => {
    const sessionList = buildAdaptiveSessionExercises(tier, subLevel, profile.allocation, quickCount, sessionNumber);
    setExercises(sessionList);
    
    const savedIdx = loadSessionProgress(sessionIdKey);
    if (savedIdx > 0 && savedIdx < sessionList.length) {
      setCurrentIndex(savedIdx);
    }
  }, [subLevel, sessionNumber, quickCount]);

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

      recognition.onerror = () => {
        setIsRecording(false);
        setRecognitionError('No se pudo captar la voz claramente.');
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
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  // FUNCIONES CLAVE CORREGIDAS PARA EL MINIJUEGO DE EMPAREJAR VOCABULARIO
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
    } else if (currentExercise.discipline === 'speaking') {
      const response = spokenTranscript || textInput;
      const analysis = analyzeSpokenAccuracy(currentExercise.targetText, response);
      const missingWords = analysis.missingWords;
      const allWordsSpoken = analysis.allWordsPresent;

      setSpokenMissingWords(missingWords);

      if (!allWordsSpoken || missingWords.length > 0) {
        isCorrect = false;
        status = 'incorrect';
        score = 0;
      } else {
        status = 'correct';
        isCorrect = true;
        score = 100;
      }
    } else if (currentExercise.type === 'writing_reorder' || currentExercise.type === 'grammar_order') {
      const constructed = selectedWords.join(' ');
      const isExact = normalizeText(constructed) === normalizeText(currentExercise.targetText);
      if (isExact) {
        status = 'correct';
        isCorrect = true;
        score = 100;
      } else {
        status = 'incorrect';
        isCorrect = false;
        score = 0;
      }
    } else if (currentExercise.options) {
      const normSelected = normalizeText(selectedOption || '');
      const normTarget = normalizeText(currentExercise.targetText || '');
      const normCorrectOption = currentExercise.correctOption ? normalizeText(currentExercise.correctOption) : null;

      if (normSelected === normTarget || normSelected === normCorrectOption || currentExercise.type === 'vocab_flashcard') {
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
      if (normInput === normTarget) {
        status = 'correct';
        isCorrect = true;
        score = 100;
      } else {
        status = 'incorrect';
        isCorrect = false;
        score = 0;
      }
    }

    if (status === 'correct') {
      const nextStreak = sessionStreak + 1;
      setSessionStreak(nextStreak);
      sound.playCorrect(nextStreak);
      setCorrectCount(prev => prev + 1);
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
        correct: prev[currentExercise.discipline].correct + (isCorrect ? 1 : 0),
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
    clearSessionProgress(sessionIdKey);
    setSessionCompleted(true);
  };

  const handleFinishAndSave = () => {
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10;
    const earnedGems = 15;

    const updatedScores = { ...profile.disciplineScores };
    onFinishSession(earnedXp, earnedGems, sessionIdKey, updatedScores);
  };

  if (!currentExercise) return null;

  const discInfo: Record<Discipline, { bg: string; text: string; label: string; icon: any }> = {
    vocabulary: { bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', text: 'text-emerald-500', label: '1. Vocabulario', icon: BookOpen },
    grammar: { bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300', text: 'text-indigo-500', label: '2. Gramática', icon: Zap },
    reading: { bg: 'bg-sky-500/10 border-sky-500/30 text-sky-300', text: 'text-sky-500', label: '3. Lectura', icon: Award },
    writing: { bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300', text: 'text-amber-500', label: '4. Escritura', icon: Bot },
    listening: { bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300', text: 'text-cyan-500', label: '5. Escucha', icon: Volume2 },
    speaking: { bg: 'bg-rose-500/10 border-rose-500/30 text-rose-300', text: 'text-rose-500', label: '6. Habla', icon: Mic }
  };

  const currentDisc = discInfo[currentExercise.discipline] || discInfo.vocabulary;
  const DiscIcon = currentDisc.icon;
  const progressPercent = Math.round(((currentIndex + 1) / totalExercises) * 100);

  if (sessionCompleted) {
    const earnedXp = Math.round((correctCount / (totalExercises || 1)) * 50) + 10;
    const earnedGems = 15;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-5 shadow-xl animate-bounce">
              <Award className="w-10 h-10" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 uppercase tracking-wider inline-block mb-2">
              ¡Sesión Completada con Éxito!
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              {sessionPlan.title}
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-900">
                <Zap className="w-5 h-5 mx-auto text-amber-500 fill-amber-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-amber-400 block">Experiencia</span>
                <span className="text-base font-black text-amber-400">+{earnedXp} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-900">
                <Diamond className="w-5 h-5 mx-auto text-cyan-500 fill-cyan-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Gemas</span>
                <span className="text-base font-black text-cyan-400">+{earnedGems}</span>
              </div>
            </div>
            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2"
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
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-7 shadow-2xl">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
                  Etapa {subLevel}
                </span>
                <span className="text-xs font-bold text-slate-400">Sesión {sessionNumber} de 8</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              {sessionPlan.title}
            </h2>
            <p className="text-xs text-slate-400 mb-6">{themeData.unitTitle}</p>
            <button
              onClick={() => setShowPreSessionIntro(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2"
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
      <div className="min-h-full flex items-center justify-center p-4 py-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
          
          <div className="flex items-center justify-between gap-4 mb-6">
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 max-w-md">
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <span className="text-xs font-black text-slate-400">{currentIndex + 1}/{totalExercises}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${currentDisc.bg}`}>
              <DiscIcon className="w-3.5 h-3.5" />
              <span>{currentDisc.label}</span>
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {currentExercise.prompt}
            </h3>
          </div>

          <div className="mb-6">
            {currentExercise.type === 'vocab_match' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inglés</p>
                    {shuffledEngMatch.map(item => {
                      const isMatched = matchedPairIds.includes(item.id);
                      const isSelected = selectedEngId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={isMatched || hasSubmitted}
                          onClick={() => handleMatchSelectEng(item.id, item.text)}
                          className={`w-full p-3 rounded-2xl text-left text-xs font-bold border transition-all cursor-pointer ${
                            isMatched ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 opacity-60' :
                            isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg' :
                            'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                          }`}
                        >
                          {item.text}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Español</p>
                    {shuffledSpaMatch.map(item => {
                      const isMatched = matchedPairIds.includes(item.id);
                      const isSelected = selectedSpaId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={isMatched || hasSubmitted}
                          onClick={() => handleMatchSelectSpa(item.id)}
                          className={`w-full p-3 rounded-2xl text-left text-xs font-bold border transition-all cursor-pointer ${
                            isMatched ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 opacity-60' :
                            isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg' :
                            'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                          }`}
                        >
                          {item.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : currentExercise.options ? (
              <div className="space-y-2.5">
                {(displayOptions.length > 0 ? displayOptions : currentExercise.options).map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasSubmitted}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      selectedOption === opt
                        ? 'bg-blue-950/40 border-blue-500 text-blue-200 shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                rows={2}
                disabled={hasSubmitted}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {hasSubmitted && (
            <div className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm ${
              answerStatus === 'correct' ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-rose-950/40 border-rose-800 text-rose-200'
            }`}>
              <p className="font-black">
                {answerStatus === 'correct' ? '¡Excelente! Respuesta correcta' : 'Respuesta incorrecta'}
              </p>
            </div>
          )}

          <div>
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={
                  currentExercise.type === 'vocab_match' ? matchedPairIds.length < matchPairs.length :
                  currentExercise.options ? !selectedOption : !textInput.trim()
                }
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>Comprobar Respuesta</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
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
