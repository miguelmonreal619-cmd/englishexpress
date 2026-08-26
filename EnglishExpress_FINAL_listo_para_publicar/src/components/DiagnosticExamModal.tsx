import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, XCircle, Volume2, Mic, ArrowRight, RotateCcw, 
  Sparkles, Award, BarChart3, AlertCircle, HelpCircle, Bot, Zap, Play, Square,
  ChevronRight, Flame, Layers, Lock, Unlock, ShieldCheck, Shuffle, X, LogOut, Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise, DiagnosticResult, Discipline, DiagnosticDiscipline, CEFRLevel, SubLevel } from '../types';
import { DIAGNOSTIC_EXAM_BANK, DisciplineDiagnosticBank } from '../data/curriculum';
import { generateDynamicDiagnosticQuestions } from '../data/diagnosticPool';
import { playUSEnglishVoice, sound, calculateTextSimilarity, normalizeText, shuffleArray, analyzeSpokenAccuracy } from '../utils/audio';
import { scoreToCEFRLevel, scoreToSubLevel, calculateAdaptiveAllocation } from '../utils/storage';
import { apiUrl } from '../config';

interface DiagnosticExamModalProps {
  userName: string;
  onFinish: (result: DiagnosticResult) => void;
  onClose?: () => void;
}

// ORDEN ESTRICTO CERTIFICACIÓN: Listening -> Reading -> Writing -> Speaking
const DISCIPLINES_ORDER: DiagnosticDiscipline[] = ['listening', 'reading', 'writing', 'speaking'];

export const DiagnosticExamModal: React.FC<DiagnosticExamModalProps> = ({
  userName,
  onFinish,
  onClose
}) => {
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [showSkipAlert, setShowSkipAlert] = useState(false);

  const [dynamicBanks] = useState<Record<DiagnosticDiscipline, {
    baseQuestions: Exercise[];
    c1Questions: Exercise[];
    c2Questions: Exercise[];
  }>>(() => ({
    writing: generateDynamicDiagnosticQuestions('writing'),
    speaking: generateDynamicDiagnosticQuestions('speaking'),
    listening: generateDynamicDiagnosticQuestions('listening'),
    reading: generateDynamicDiagnosticQuestions('reading')
  }));

  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const currentDisciplineKey = DISCIPLINES_ORDER[currentDisciplineIndex];
  const currentDisciplineData: DisciplineDiagnosticBank = DIAGNOSTIC_EXAM_BANK[currentDisciplineKey];

  const [disciplineQuestions, setDisciplineQuestions] = useState<Exercise[]>(
    dynamicBanks[DISCIPLINES_ORDER[0]].baseQuestions
  );
  const [currentQuestionIndexInDiscipline, setCurrentQuestionIndexInDiscipline] = useState(0);

  const [unlockedBonusLevels, setUnlockedBonusLevels] = useState<Record<DiagnosticDiscipline, { c1: boolean; c2: boolean }>>({
    writing: { c1: false, c2: false },
    speaking: { c1: false, c2: false },
    listening: { c1: false, c2: false },
    reading: { c1: false, c2: false }
  });

  const [bonusUnlockedNotification, setBonusUnlockedNotification] = useState<{
    level: 'C1' | 'C2';
    discipline: DiagnosticDiscipline;
    message: string;
  } | null>(null);

  const [disciplineTransition, setDisciplineTransition] = useState<{
    completedDiscipline: DiagnosticDiscipline;
    nextDiscipline: DiagnosticDiscipline;
    score: number;
    subLevel: SubLevel;
    cefrLevel: CEFRLevel;
    totalAnswered: number;
    correctCount: number;
    unlockedC1?: boolean;
    unlockedC2?: boolean;
  } | null>(null);

  const [userAnswers, setUserAnswers] = useState<Record<string, { isCorrect: boolean; userText: string; score: number }>>({});
  
  const [textInput, setTextInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [aiEvaluationLoading, setAiEvaluationLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<DiagnosticResult | null>(null);
  const [analyzingWithAI, setAnalyzingWithAI] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const handleConfirmExit = () => {
    setShowExitConfirmation(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (onClose) onClose();
  };

  const handleSkipDiagnostic = () => {
    const defaultResult: DiagnosticResult = {
      completedAt: new Date().toISOString(),
      globalScore: 15,
      globalLevel: 'A1',
      initialSubLevel: 'A1.0',
      disciplineScores: { writing: 15, speaking: 15, listening: 15, reading: 15 },
      disciplineLevels: { writing: 'A1.0', speaking: 'A1.0', listening: 'A1.0', reading: 'A1.0' },
      weakestDiscipline: 'writing',
      strongestDiscipline: 'reading',
      allocation: calculateAdaptiveAllocation({ writing: 15, speaking: 15, listening: 15, reading: 15 })
    };
    onFinish(defaultResult);
  };

  const recognitionRef = useRef<any>(null);
  const currentExercise: Exercise = disciplineQuestions[currentQuestionIndexInDiscipline] || disciplineQuestions[0];

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
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setRecognitionError('El acceso al micrófono está bloqueado. Es obligatorio para Speaking.');
        } else {
          setRecognitionError('No se pudo captar el audio con claridad. Intenta de nuevo.');
        }
      };

      recognition.onend = () => { setIsRecording(false); };
      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, []);

  useEffect(() => {
    setTextInput('');
    setSelectedOption(null);
    setSpokenTranscript('');
    setRecognitionError('');

    if (currentExercise && currentExercise.type === 'writing_reorder' && currentExercise.options) {
      setAvailableWords(shuffleArray(currentExercise.options));
      setSelectedWords([]);
    } else if (currentExercise && currentExercise.options) {
      setDisplayOptions(shuffleArray(currentExercise.options));
    } else {
      setDisplayOptions([]);
    }

    if (currentExercise && currentExercise.discipline === 'listening' && currentExercise.audioText) {
      setTimeout(() => { handlePlayAudio(currentExercise.audioText!, 0.95); }, 300);
    }
  }, [currentExercise?.id, currentQuestionIndexInDiscipline]);

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
    }, currentExercise?.subLevel || currentExercise?.level || 'A1');
  };

  const startVoiceRecording = async () => {
    setRecognitionError('');
    setSpokenTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionError('Tu navegador no soporta reconocimiento de voz nativo.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
            setIsRecording(true);
          }, 150);
        } catch (retryErr) {
          setRecognitionError('No se pudo iniciar la captura de voz.');
        }
      }
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
    sound.playTap();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeselectWord = (word: string, index: number) => {
    sound.playTap();
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  // CALIBRACIÓN ESTRICTA ANTIFALSOS-POSITIVOS (Similitud TOEFL/Cambridge)
  const computeDisciplineScore = (disc: DiagnosticDiscipline, answers: Record<string, { isCorrect: boolean; userText: string; score: number }>) => {
    const bank = dynamicBanks[disc];
    const answeredBase = bank.baseQuestions.filter(q => answers[q.id] !== undefined);
    // Exigente: Solo cuenta como acierto pleno si el puntaje es de 90 o más
    const correctCount = answeredBase.filter(q => (answers[q.id]?.score || 0) >= 90).length;
    const answeredTotal = answeredBase.length;

    let finalDiscScore = 15;

    if (unlockedBonusLevels[disc].c2) {
      const c2Scores = bank.c2Questions.map(q => answers[q.id]?.score || 0);
      const c2Avg = c2Scores.length ? c2Scores.reduce((a, b) => a + b, 0) / c2Scores.length : 0;
      finalDiscScore = Math.round(90 + (c2Avg / 100) * 10);
    } else if (unlockedBonusLevels[disc].c1) {
      const c1Scores = bank.c1Questions.map(q => answers[q.id]?.score || 0);
      const c1Avg = c1Scores.length ? c1Scores.reduce((a, b) => a + b, 0) / c1Scores.length : 0;
      finalDiscScore = Math.round(80 + (c1Avg / 100) * 9);
    } else if (answeredTotal < 8) {
      // Escalera de penalización estricta para evitar sobrecalibrar hacia arriba
      if (correctCount === 0) finalDiscScore = 15;
      else if (correctCount === 1) finalDiscScore = 22;
      else if (correctCount === 2) finalDiscScore = 32;
      else if (correctCount === 3) finalDiscScore = 40;
      else if (correctCount === 4) finalDiscScore = 48;
      else if (correctCount === 5) finalDiscScore = 56;
      else if (correctCount >= 6) finalDiscScore = 65;
    } else {
      const baseScores = bank.baseQuestions.map(q => answers[q.id]?.score || 0);
      const baseAvg = baseScores.reduce((a, b) => a + b, 0) / 8;
      finalDiscScore = Math.round((baseAvg / 100) * 75);
    }

    const finalScore = Math.min(100, Math.max(10, finalDiscScore));
    const subLevel = scoreToSubLevel(finalScore);
    const cefrLevel = scoreToCEFRLevel(finalScore);

    return { score: finalScore, subLevel, cefrLevel, totalAnswered: answeredTotal, correctCount };
  };

  const handleConfirmAndAdvance = async () => {
    if (!currentExercise || isAdvancing) return;

    setIsAdvancing(true);
    stopVoiceRecording();

    let isCorrect = false;
    let score = 0;
    let studentResponse = '';

    if (currentExercise.discipline === 'speaking') {
      const responseToEvaluate = spokenTranscript.trim();
      studentResponse = responseToEvaluate;
      const analysis = analyzeSpokenAccuracy(currentExercise.targetText, responseToEvaluate);
      const missingWords = analysis.missingWords;
      const allWordsSpoken = analysis.allWordsPresent;

      if (!allWordsSpoken || missingWords.length > 0) {
        isCorrect = false;
        score = 0; // Estricto: si falta una palabra en speaking, penaliza severamente
      } else {
        if (analysis.isExact || analysis.wordAccuracy >= 90) { isCorrect = true; score = 100; }
        else if (analysis.wordAccuracy >= 75) { isCorrect = true; score = 80; }
        else { isCorrect = false; score = 40; }
      }
    } else if (currentExercise.type === 'writing_reorder') {
      const constructed = selectedWords.join(' ');
      studentResponse = constructed;
      const normConstructed = normalizeText(constructed);
      const normTarget = normalizeText(currentExercise.targetText);
      
      if (normConstructed === normTarget) { isCorrect = true; score = 100; }
      else {
        const sim = calculateTextSimilarity(currentExercise.targetText, constructed);
        isCorrect = false;
        score = sim >= 80 ? 50 : 0; // Exigente
      }
    } else if (currentExercise.options) {
      studentResponse = selectedOption || '';
      const normSelected = normalizeText(selectedOption || '');
      const normTarget = normalizeText(currentExercise.targetText || '');
      const normCorrectOption = currentExercise.correctOption ? normalizeText(currentExercise.correctOption) : null;

      const isTargetMatch = normSelected === normTarget;
      const isCorrectOptionMatch = normCorrectOption ? normSelected === normCorrectOption : false;
      const isAcceptableMatch = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normSelected) || false;

      if (isTargetMatch || isCorrectOptionMatch || isAcceptableMatch) { isCorrect = true; score = 100; }
      else { isCorrect = false; score = 0; }
    } else {
      studentResponse = textInput;
      const normInput = normalizeText(textInput);
      const normTarget = normalizeText(currentExercise.targetText);
      const isExact = normInput === normTarget;
      const isAcceptable = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normInput);

      if (isExact || isAcceptable) { isCorrect = true; score = 100; }
      else {
        const sim = calculateTextSimilarity(currentExercise.targetText, textInput);
        if (sim >= 95) { isCorrect = true; score = 100; }
        else { isCorrect = false; score = 0; }
      }
    }

    sound.playTap();

    const updatedAnswers = {
      ...userAnswers,
      [currentExercise.id]: { isCorrect: isCorrect || score >= 90, userText: studentResponse, score }
    };
    setUserAnswers(updatedAnswers);

    setTextInput('');
    setSelectedOption(null);
    setSelectedWords([]);
    setSpokenTranscript('');
    setIsAdvancing(false);

    advanceDiagnostic(updatedAnswers);
  };

  const advanceDiagnostic = (answers: Record<string, { isCorrect: boolean; userText: string; score: number }>) => {
    const currentQIdx = currentQuestionIndexInDiscipline;
    const currentDisc = currentDisciplineKey;
    const currentBank = dynamicBanks[currentDisc];

    const baseQuestionsAnswered = currentBank.baseQuestions.slice(0, currentQIdx + 1);
    const recentMistakes = baseQuestionsAnswered.filter(q => (answers[q.id]?.score || 0) < 90).length;
    
    let consecutiveMistakes = 0;
    for (let i = currentQIdx; i >= 0; i--) {
      const qId = currentBank.baseQuestions[i]?.id;
      if (qId && (answers[qId]?.score || 0) < 90) { consecutiveMistakes++; }
      else { break; }
    }

    // Corte temprano más estricto para evitar inflar niveles
    const shouldEarlyStop = (
      (currentQIdx === 1 && recentMistakes >= 1) ||
      (currentQIdx < 7 && consecutiveMistakes >= 2) ||
      (currentQIdx < 7 && recentMistakes >= 2)
    );

    if (shouldEarlyStop) {
      if (currentDisciplineIndex + 1 < DISCIPLINES_ORDER.length) {
        const nextDisc = DISCIPLINES_ORDER[currentDisciplineIndex + 1];
        const discResult = computeDisciplineScore(currentDisc, answers);

        setDisciplineTransition({
          completedDiscipline: currentDisc,
          nextDiscipline: nextDisc,
          score: discResult.score,
          subLevel: discResult.subLevel,
          cefrLevel: discResult.cefrLevel,
          totalAnswered: discResult.totalAnswered,
          correctCount: discResult.correctCount,
          unlockedC1: false,
          unlockedC2: false
        });
        return;
      } else {
        finishDiagnostic(answers);
        return;
      }
    }

    if (currentQIdx === 7 && disciplineQuestions.length === 8) {
      const baseScores = currentBank.baseQuestions.map(q => answers[q.id]?.score || 0);
      const avgBaseScore = baseScores.reduce((a, b) => a + b, 0) / 8;
      const b2Scores = [baseScores[6], baseScores[7]];
      const passedB2 = b2Scores.every(s => s >= 90) && avgBaseScore >= 85;

      if (passedB2) {
        sound.playFanfare();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        setUnlockedBonusLevels(prev => ({ ...prev, [currentDisc]: { ...prev[currentDisc], c1: true } }));
        setDisciplineQuestions(prev => [...prev, ...currentBank.c1Questions]);
        setBonusUnlockedNotification({
          level: 'C1',
          discipline: currentDisc,
          message: `¡Excelente desempeño! Has desbloqueado 2 preguntas de nivel C1 para medir tu nivel superior.`
        });
        setCurrentQuestionIndexInDiscipline(8);
        return;
      }
    }

    if (currentQIdx === 9 && disciplineQuestions.length === 10) {
      const c1Scores = currentBank.c1Questions.map(q => answers[q.id]?.score || 0);
      const avgC1Score = c1Scores.reduce((a, b) => a + b, 0) / 2;

      if (avgC1Score >= 90) {
        sound.playFanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setUnlockedBonusLevels(prev => ({ ...prev, [currentDisc]: { ...prev[currentDisc], c2: true } }));
        setDisciplineQuestions(prev => [...prev, ...currentBank.c2Questions]);
        setBonusUnlockedNotification({
          level: 'C2',
          discipline: currentDisc,
          message: `¡Impresionante dominio! Desbloqueaste las 2 preguntas de nivel C2 para medir tu precisión nativa.`
        });
        setCurrentQuestionIndexInDiscipline(10);
        return;
      }
    }

    if (currentQIdx + 1 < disciplineQuestions.length) {
      setCurrentQuestionIndexInDiscipline(prev => prev + 1);
      return;
    }

    if (currentDisciplineIndex + 1 < DISCIPLINES_ORDER.length) {
      const nextDisc = DISCIPLINES_ORDER[currentDisciplineIndex + 1];
      const discResult = computeDisciplineScore(currentDisc, answers);

      setDisciplineTransition({
        completedDiscipline: currentDisc,
        nextDiscipline: nextDisc,
        score: discResult.score,
        subLevel: discResult.subLevel,
        cefrLevel: discResult.cefrLevel,
        totalAnswered: discResult.totalAnswered,
        correctCount: discResult.correctCount,
        unlockedC1: unlockedBonusLevels[currentDisc].c1,
        unlockedC2: unlockedBonusLevels[currentDisc].c2
      });
      return;
    }

    finishDiagnostic(answers);
  };

  const handleContinueAfterTransition = () => {
    if (disciplineTransition) {
      const nextIndex = currentDisciplineIndex + 1;
      const nextKey = DISCIPLINES_ORDER[nextIndex];
      setCurrentDisciplineIndex(nextIndex);
      setDisciplineQuestions(dynamicBanks[nextKey].baseQuestions);
      setCurrentQuestionIndexInDiscipline(0);
      setDisciplineTransition(null);
    }
  };

  const finishDiagnostic = async (finalAnswersMap?: Record<string, { isCorrect: boolean; userText: string; score: number }>) => {
    sound.playFanfare();
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.5 } });

    const answersToUse = finalAnswersMap || userAnswers;
    const disciplines = DISCIPLINES_ORDER;
    const disciplineScores: Record<DiagnosticDiscipline, number> = { writing: 0, speaking: 0, listening: 0, reading: 0 };

    disciplines.forEach(disc => {
      const bank = dynamicBanks[disc];
      const baseScores = bank.baseQuestions.map(q => answersToUse[q.id]?.score || 0);
      const c1Scores = bank.c1Questions.map(q => answersToUse[q.id]?.score || 0);
      const c2Scores = bank.c2Questions.map(q => answersToUse[q.id]?.score || 0);

      const baseAvg = baseScores.reduce((a, b) => a + b, 0) / 8;
      let finalDiscScore = 0;

      if (unlockedBonusLevels[disc].c2) {
        const c2Avg = c2Scores.reduce((a, b) => a + b, 0) / 2;
        finalDiscScore = Math.round(90 + (c2Avg / 100) * 10);
      } else if (unlockedBonusLevels[disc].c1) {
        const c1Avg = c1Scores.reduce((a, b) => a + b, 0) / 2;
        finalDiscScore = Math.round(80 + (c1Avg / 100) * 9);
      } else {
        finalDiscScore = Math.round((baseAvg / 100) * 75);
      }

      disciplineScores[disc] = Math.min(100, Math.max(10, finalDiscScore));
    });

    const globalAvg = Math.round(
      (disciplineScores.writing + disciplineScores.speaking + disciplineScores.listening + disciplineScores.reading) / 4
    );

    const globalLevel = scoreToCEFRLevel(globalAvg);
    const initialSubLevel = scoreToSubLevel(globalAvg);
    const disciplineLevels = {
      writing: scoreToSubLevel(disciplineScores.writing),
      speaking: scoreToSubLevel(disciplineScores.speaking),
      listening: scoreToSubLevel(disciplineScores.listening),
      reading: scoreToSubLevel(disciplineScores.reading)
    };

    const sortedDiscs = [...disciplines].sort((a, b) => disciplineScores[a] - disciplineScores[b]);
    const weakestDiscipline = sortedDiscs[0];
    const strongestDiscipline = sortedDiscs[sortedDiscs.length - 1];
    const allocation = calculateAdaptiveAllocation(disciplineScores);

    const resultPayload: DiagnosticResult = {
      completedAt: new Date().toISOString(),
      globalScore: globalAvg,
      globalLevel,
      initialSubLevel,
      disciplineScores,
      disciplineLevels,
      weakestDiscipline,
      strongestDiscipline,
      allocation
    };

    setFinalResult(resultPayload);
    setIsExamCompleted(true);
  };

  const disciplineBadgeColors: Record<DiagnosticDiscipline, { bg: string; border: string; text: string; bar: string; label: string; icon: any; desc: string }> = {
    listening: { 
      bg: 'bg-sky-500/10 dark:bg-sky-950/30', 
      border: 'border-sky-500/30 dark:border-sky-800',
      text: 'text-sky-600 dark:text-sky-400', 
      bar: 'bg-sky-500',
      label: 'Listening (Audición)', 
      icon: Volume2,
      desc: 'Comprensión auditiva en inglés estadounidense.'
    },
    reading: { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30', 
      border: 'border-emerald-500/30 dark:border-emerald-800',
      text: 'text-emerald-600 dark:text-emerald-400', 
      bar: 'bg-emerald-500',
      label: 'Reading (Lectura)', 
      icon: Award,
      desc: 'Comprensión lectora y análisis de contexto.'
    },
    writing: { 
      bg: 'bg-amber-500/10 dark:bg-amber-950/30', 
      border: 'border-amber-500/30 dark:border-amber-800',
      text: 'text-amber-600 dark:text-amber-400', 
      bar: 'bg-amber-500',
      label: 'Writing (Escritura)', 
      icon: Bot,
      desc: 'Sintaxis, gramática y orden escrito.'
    },
    speaking: { 
      bg: 'bg-rose-500/10 dark:bg-rose-950/30', 
      border: 'border-rose-500/30 dark:border-rose-800',
      text: 'text-rose-600 dark:text-rose-400', 
      bar: 'bg-rose-500',
      label: 'Speaking (Pronunciación)', 
      icon: Mic,
      desc: 'Fonética, articulación y fluidez.'
    }
  };

  if (showIntroScreen) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Brain className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800 inline-block mb-3">
            Evaluación de Nivel Adaptativa
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            ¡Bienvenido, {userName}! Descubramos tu nivel
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Realizaremos una evaluación rigurosa estilo certificación (Listening, Reading, Writing y Speaking) para calibrar tu nivel exacto en el estándar MCER.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowIntroScreen(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Comenzar Evaluación Diagnóstica</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowSkipAlert(true)}
              className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs cursor-pointer"
            >
              Omitir evaluación por ahora (Skip)
            </button>
          </div>
        </div>

        {showSkipAlert && (
          <div className="fixed inset-0 z-[70] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                ¿Estás seguro de omitir la evaluación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Si te saltas la prueba, comenzarás desde el nivel inicial (A1). Podrás reevaluarte más adelante desde el menú.
              </p>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSkipAlert(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  Volver y Evaluarme
                </button>
                <button
                  type="button"
                  onClick={handleSkipDiagnostic}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
                >
                  Sí, comenzar desde el inicio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (bonusUnlockedNotification) {
    const discInfo = disciplineBadgeColors[bonusUnlockedNotification.discipline];
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 text-center shadow-2xl">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            ¡Reto Avanzado de {discInfo.label}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            {bonusUnlockedNotification.message}
          </p>
          <button
            type="button"
            onClick={() => setBonusUnlockedNotification(null)}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm cursor-pointer"
          >
            Continuar al Siguiente Nivel
          </button>
        </div>
      </div>
    );
  }

  if (disciplineTransition) {
    const nextDiscInfo = disciplineBadgeColors[disciplineTransition.nextDiscipline];
    const completedDiscInfo = disciplineBadgeColors[disciplineTransition.completedDiscipline];

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 text-center shadow-2xl">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            Sección {completedDiscInfo.label} Completada
          </h3>
          <p className="text-xs text-slate-500 mb-4">Promedio obtenido: {disciplineTransition.score}% ({disciplineTransition.subLevel})</p>
          <button
            type="button"
            onClick={handleContinueAfterTransition}
            className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white font-bold text-sm cursor-pointer"
          >
            Continuar con {nextDiscInfo.label}
          </button>
        </div>
      </div>
    );
  }

  if (isExamCompleted && finalResult) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-center shadow-2xl">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            ¡Diagnóstico Completado, {userName}!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Nivel Global Asignado: <span className="font-black text-emerald-500">{finalResult.initialSubLevel} ({finalResult.globalLevel})</span>
          </p>
          <button
            onClick={() => onFinish(finalResult)}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm cursor-pointer"
          >
            Comenzar Mi Ruta de Aprendizaje
          </button>
        </div>
      </div>
    );
  }

  const discInfo = disciplineBadgeColors[currentExercise?.discipline || 'listening'];
  const DiscIcon = discInfo.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${discInfo.bg}`}>
            <DiscIcon className="w-4 h-4" />
            {discInfo.label} ({currentDisciplineIndex + 1}/{DISCIPLINES_ORDER.length})
          </span>
          <span className="text-xs font-bold text-slate-500">
            Pregunta {currentQuestionIndexInDiscipline + 1} de {disciplineQuestions.length}
          </span>
        </div>

        {currentExercise?.passage && (
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 mb-4 text-xs font-serif">
            {currentExercise.passage}
          </div>
        )}

        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-4">
          {currentExercise?.prompt}
        </h3>

        {currentExercise?.discipline === 'listening' && currentExercise?.audioText && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => handlePlayAudio(currentExercise.audioText!, 0.95)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar Audio US</span>
            </button>
          </div>
        )}

        <div className="mb-6">
          {currentExercise?.discipline === 'speaking' && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-center">
              <p className="text-base font-black mb-3">"{currentExercise.targetText}"</p>
              <button
                type="button"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white cursor-pointer ${isRecording ? 'bg-rose-600 animate-pulse' : 'bg-rose-500'}`}
              >
                <Mic className="w-7 h-7" />
              </button>
              {spokenTranscript && <p className="mt-3 text-xs font-bold text-rose-600">Detectado: "{spokenTranscript}"</p>}
            </div>
          )}

          {currentExercise?.options && (
            <div className="space-y-2">
              {displayOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border cursor-pointer ${selectedOption === option ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleConfirmAndAdvance}
          disabled={!selectedOption && currentExercise?.discipline !== 'speaking'}
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>Guardar y Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
