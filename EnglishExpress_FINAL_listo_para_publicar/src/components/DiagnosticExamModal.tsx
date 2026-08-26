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

const DISCIPLINES_ORDER: DiagnosticDiscipline[] = ['writing', 'speaking', 'listening', 'reading'];

export const DiagnosticExamModal: React.FC<DiagnosticExamModalProps> = ({
  userName,
  onFinish,
  onClose
}) => {
  // Pantalla de introducción previa al diagnóstico y alerta de Skip
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [showSkipAlert, setShowSkipAlert] = useState(false);

  // Dynamically generate fresh, randomized questions and shuffled options on every modal mount / retake
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

  // Discipline progression state
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const currentDisciplineKey = DISCIPLINES_ORDER[currentDisciplineIndex];
  const currentDisciplineData: DisciplineDiagnosticBank = DIAGNOSTIC_EXAM_BANK[currentDisciplineKey];

  // Active question queue for current discipline (starts with 8 dynamically randomized base questions)
  const [disciplineQuestions, setDisciplineQuestions] = useState<Exercise[]>(
    dynamicBanks[DISCIPLINES_ORDER[0]].baseQuestions
  );
  const [currentQuestionIndexInDiscipline, setCurrentQuestionIndexInDiscipline] = useState(0);

  // Bonus level unlock tracking per discipline
  const [unlockedBonusLevels, setUnlockedBonusLevels] = useState<Record<DiagnosticDiscipline, { c1: boolean; c2: boolean }>>({
    writing: { c1: false, c2: false },
    speaking: { c1: false, c2: false },
    listening: { c1: false, c2: false },
    reading: { c1: false, c2: false }
  });

  // Interstitial modal states
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

  // Answers store
  const [userAnswers, setUserAnswers] = useState<Record<string, { isCorrect: boolean; userText: string; score: number }>>({});
  
  // Exercise inputs
  const [textInput, setTextInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  
  // Submission & evaluation loading
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [aiEvaluationLoading, setAiEvaluationLoading] = useState(false);
  
  // Audio playing
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Diagnostic Completion State
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<DiagnosticResult | null>(null);
  const [analyzingWithAI, setAnalyzingWithAI] = useState(false);

  // Exit Confirmation State
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
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setRecognitionError('El acceso al micrófono está bloqueado o denegado. Es obligatorio permitir el acceso al micrófono en tu navegador para medir tu nivel de Speaking.');
        } else if (event.error === 'no-speech') {
          setRecognitionError('No se detectó sonido de voz. Presiona el micrófono y pronuncia la frase con claridad.');
        } else {
          setRecognitionError('No se pudo captar el audio con claridad. Presiona el micrófono para intentar de nuevo.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

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

  // Reset inputs on question switch
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

    // Auto-play audio for listening exercises
    if (currentExercise && currentExercise.discipline === 'listening' && currentExercise.audioText) {
      setTimeout(() => {
        handlePlayAudio(currentExercise.audioText!, 0.95);
      }, 300);
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
      setSpeechSupported(false);
      setRecognitionError('Tu navegador no soporta reconocimiento de voz nativo. Por favor utiliza Google Chrome, Microsoft Edge o Safari con micrófono habilitado.');
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      } catch (err: any) {
        console.warn('Microphone permission blocked:', err);
        setRecognitionError('El acceso al micrófono está bloqueado o denegado. Es obligatorio habilitar el micrófono en tu navegador para evaluar tu nivel de Speaking.');
        return;
      }
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.warn('Recognition start failed', e);
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
            setIsRecording(true);
          }, 150);
        } catch (retryErr) {
          setRecognitionError('No se pudo iniciar la captura de voz. Presiona el micrófono nuevamente.');
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

  const computeDisciplineScore = (disc: DiagnosticDiscipline, answers: Record<string, { isCorrect: boolean; userText: string; score: number }>) => {
    const bank = dynamicBanks[disc];
    const answeredBase = bank.baseQuestions.filter(q => answers[q.id] !== undefined);
    const correctCount = answeredBase.filter(q => (answers[q.id]?.score || 0) >= 70).length;
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
      if (correctCount === 0) finalDiscScore = 15;
      else if (correctCount === 1) finalDiscScore = 24;
      else if (correctCount === 2) finalDiscScore = 35;
      else if (correctCount === 3) finalDiscScore = 44;
      else if (correctCount === 4) finalDiscScore = 52;
      else if (correctCount === 5) finalDiscScore = 60;
      else if (correctCount >= 6) finalDiscScore = 70;
    } else {
      const baseScores = bank.baseQuestions.map(q => answers[q.id]?.score || 0);
      const baseAvg = baseScores.reduce((a, b) => a + b, 0) / 8;
      finalDiscScore = Math.round((baseAvg / 100) * 78);
    }

    const finalScore = Math.min(100, Math.max(10, finalDiscScore));
    const subLevel = scoreToSubLevel(finalScore);
    const cefrLevel = scoreToCEFRLevel(finalScore);

    return {
      score: finalScore,
      subLevel,
      cefrLevel,
      totalAnswered: answeredTotal,
      correctCount
    };
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
        score = (missingWords.length === 1 && analysis.targetWordsCount >= 4 && analysis.wordAccuracy >= 70) ? Math.min(50, analysis.wordAccuracy) : 0;
      } else {
        if (analysis.isExact || analysis.wordAccuracy >= 80) {
          isCorrect = true;
          score = 100;
        } else if (analysis.wordAccuracy >= 60) {
          isCorrect = true;
          score = 80;
        } else {
          isCorrect = false;
          score = 45;
        }
      }
    } else if (currentExercise.type === 'writing_reorder') {
      const constructed = selectedWords.join(' ');
      studentResponse = constructed;
      const normConstructed = normalizeText(constructed);
      const normTarget = normalizeText(currentExercise.targetText);
      
      if (normConstructed === normTarget) {
        isCorrect = true;
        score = 100;
      } else {
        const sim = calculateTextSimilarity(currentExercise.targetText, constructed);
        isCorrect = false;
        score = sim >= 60 ? Math.max(50, Math.round(sim * 0.75)) : 0;
      }
    } else if (currentExercise.options) {
      studentResponse = selectedOption || '';
      const normSelected = normalizeText(selectedOption || '');
      const normTarget = normalizeText(currentExercise.targetText || '');
      const normCorrectOption = currentExercise.correctOption ? normalizeText(currentExercise.correctOption) : null;

      const isTargetMatch = normSelected === normTarget;
      const isCorrectOptionMatch = normCorrectOption ? normSelected === normCorrectOption : false;
      const isAcceptableMatch = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normSelected) || false;

      if (isTargetMatch || isCorrectOptionMatch || isAcceptableMatch) {
        isCorrect = true;
        score = 100;
      } else {
        isCorrect = false;
        score = 0;
      }
    } else {
      studentResponse = textInput;
      const normInput = normalizeText(textInput);
      const normTarget = normalizeText(currentExercise.targetText);
      const isExact = normInput === normTarget;
      const isAcceptable = currentExercise.acceptableAnswers?.some(a => normalizeText(a) === normInput);

      if (isExact || isAcceptable) {
        isCorrect = true;
        score = 100;
      } else {
        const sim = calculateTextSimilarity(currentExercise.targetText, textInput);
        if (sim >= 88) {
          isCorrect = true;
          score = 100;
        } else if (sim >= 55) {
          isCorrect = false;
          score = Math.max(50, Math.round(sim * 0.8));
        } else {
          isCorrect = false;
          score = 0;
        }
      }
    }

    sound.playTap();

    const updatedAnswers = {
      ...userAnswers,
      [currentExercise.id]: {
        isCorrect: isCorrect || score >= 75,
        userText: studentResponse,
        score
      }
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
    const recentMistakes = baseQuestionsAnswered.filter(q => (answers[q.id]?.score || 0) < 70).length;
    
    let consecutiveMistakes = 0;
    for (let i = currentQIdx; i >= 0; i--) {
      const qId = currentBank.baseQuestions[i]?.id;
      if (qId && (answers[qId]?.score || 0) < 70) {
        consecutiveMistakes++;
      } else {
        break;
      }
    }

    const shouldEarlyStop = (
      (currentQIdx === 1 && recentMistakes >= 2) ||
      (currentQIdx < 7 && consecutiveMistakes >= 2) ||
      (currentQIdx < 7 && recentMistakes >= 3)
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
      const passedB2 = b2Scores.some(s => s >= 70) || avgBaseScore >= 75;

      if (passedB2) {
        sound.playFanfare();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        setUnlockedBonusLevels(prev => ({
          ...prev,
          [currentDisc]: { ...prev[currentDisc], c1: true }
        }));
        setDisciplineQuestions(prev => [...prev, ...currentBank.c1Questions]);
        setBonusUnlockedNotification({
          level: 'C1',
          discipline: currentDisc,
          message: `¡Excelente desempeño en ${currentDisciplineData.name}! Respondiste con precisión las preguntas base. Has desbloqueado 2 preguntas de nivel C1 (Avanzado) para medir tu nivel superior.`
        });
        setCurrentQuestionIndexInDiscipline(8);
        return;
      }
    }

    if (currentQIdx === 9 && disciplineQuestions.length === 10) {
      const c1Scores = currentBank.c1Questions.map(q => answers[q.id]?.score || 0);
      const avgC1Score = c1Scores.reduce((a, b) => a + b, 0) / 2;

      if (avgC1Score >= 70) {
        sound.playFanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setUnlockedBonusLevels(prev => ({
          ...prev,
          [currentDisc]: { ...prev[currentDisc], c2: true }
        }));
        setDisciplineQuestions(prev => [...prev, ...currentBank.c2Questions]);
        setBonusUnlockedNotification({
          level: 'C2',
          discipline: currentDisc,
          message: `¡Impresionante dominio en ${currentDisciplineData.name}! Superaste el nivel C1. Desbloqueaste las 2 preguntas de nivel C2 (Maestría) para medir tu precisión nativa.`
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
    const disciplineScores: Record<DiagnosticDiscipline, number> = {
      writing: 0,
      speaking: 0,
      listening: 0,
      reading: 0
    };

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
        finalDiscScore = Math.round((baseAvg / 100) * 78);
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

    setAnalyzingWithAI(true);
    try {
      const res = await fetch(apiUrl('/api/gemini/analyze-diagnostic'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userScores: { globalScore: globalAvg, globalLevel },
          totalQuestions: Object.keys(answersToUse).length,
          disciplineBreakdown: {
            ...disciplineScores,
            writingLevel: disciplineLevels.writing,
            speakingLevel: disciplineLevels.speaking,
            listeningLevel: disciplineLevels.listening,
            readingLevel: disciplineLevels.reading
          }
        })
      });
      const data = await res.json();
      if (data.success && data.roadmap) {
        setFinalResult(prev => prev ? { ...prev, aiRoadmap: data.roadmap } : prev);
      }
    } catch (e) {
      console.warn('AI diagnostic analysis failed', e);
    } finally {
      setAnalyzingWithAI(false);
    }
  };

  const disciplineBadgeColors: Record<DiagnosticDiscipline, { bg: string; border: string; text: string; bar: string; label: string; icon: any; desc: string }> = {
    writing: { 
      bg: 'bg-amber-500/10 dark:bg-amber-950/30', 
      border: 'border-amber-500/30 dark:border-amber-800',
      text: 'text-amber-600 dark:text-amber-400', 
      bar: 'bg-amber-500',
      label: 'Writing (Escritura)', 
      icon: Bot,
      desc: 'Capacidad de redactar oraciones, sintaxis, orden gramatical y vocabulario escrito.'
    },
    speaking: { 
      bg: 'bg-rose-500/10 dark:bg-rose-950/30', 
      border: 'border-rose-500/30 dark:border-rose-800',
      text: 'text-rose-600 dark:text-rose-400', 
      bar: 'bg-rose-500',
      label: 'Speaking (Pronunciación)', 
      icon: Mic,
      desc: 'Articulación fonética, fluidez hablada y pronunciación completa de frases en inglés.'
    },
    listening: { 
      bg: 'bg-sky-500/10 dark:bg-sky-950/30', 
      border: 'border-sky-500/30 dark:border-sky-800',
      text: 'text-sky-600 dark:text-sky-400', 
      bar: 'bg-sky-500',
      label: 'Listening (Audición)', 
      icon: Volume2,
      desc: 'Comprensión auditiva en inglés estadounidense a velocidades natural y moderada.'
    },
    reading: { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30', 
      border: 'border-emerald-500/30 dark:border-emerald-800',
      text: 'text-emerald-600 dark:text-emerald-400', 
      bar: 'bg-emerald-500',
      label: 'Reading (Lectura)', 
      icon: Award,
      desc: 'Comprensión lectora de textos, inferencia y contexto de vocabulario real.'
    }
  };

  // ==========================================
  // PANTALLA DE INTRODUCCIÓN PREVIA (SKIP & ADVERTENCIA)
  // ==========================================
  if (showIntroScreen) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200 relative">
          
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
            Antes de arrancar, realizaremos una breve evaluación inteligente para medir tu nivel real de inglés (Writing, Speaking, Listening y Reading). Esto nos permite calibrar las lecciones exactamente a tu medida.
          </p>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowIntroScreen(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comenzar Evaluación Diagnóstica</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowSkipAlert(true)}
              className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Omitir evaluación por ahora (Skip)
            </button>
          </div>
        </div>

        {/* Alerta de advertencia al presionar Skip */}
        {showSkipAlert && (
          <div className="fixed inset-0 z-[70] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                ¿Estás seguro de omitir la evaluación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Si te saltas la evaluación, comenzarás desde el nivel inicial (Principiante - A1). No te preocupes: podrás realizar una reevaluación o examen de nivelación más adelante desde el menú secundario cuando lo desees.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSkipAlert(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  Volver y Evaluarme
                </button>
                <button
                  type="button"
                  onClick={handleSkipDiagnostic}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg cursor-pointer"
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

  // ==========================================
  // RENDER INTERSTITIAL / BONUS UNLOCKED MODAL
  // ==========================================
  if (bonusUnlockedNotification) {
    const discInfo = disciplineBadgeColors[bonusUnlockedNotification.discipline];
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8 relative">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-8 text-center shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200 relative">
            {onClose && (
              <button
                type="button"
                onClick={() => setShowExitConfirmation(true)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Salir de la evaluación"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-lg mb-3 sm:mb-4">
              <Unlock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 inline-block mb-3">
              ¡Nivel {bonusUnlockedNotification.level} Desbloqueado!
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              Reto Avanzado de {discInfo.label}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {bonusUnlockedNotification.message}
            </p>
            <button
              type="button"
              onClick={() => setBonusUnlockedNotification(null)}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comenzar Preguntas de Nivel {bonusUnlockedNotification.level}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showExitConfirmation && (
          <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                ¿Deseas salir de la reevaluación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Si sales ahora, no se guardará el progreso de esta prueba y conservarás tu nivel y calibración actual. Podrás volver a iniciar la reevaluación cuando gustes.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowExitConfirmation(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  Continuar Evaluación
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExit}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-colors cursor-pointer"
                >
                  Salir de la Prueba
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER DISCIPLINE SUMMARY & TRANSITION MODAL
  // ==========================================
  if (disciplineTransition) {
    const nextDiscInfo = disciplineBadgeColors[disciplineTransition.nextDiscipline];
    const completedDiscInfo = disciplineBadgeColors[disciplineTransition.completedDiscipline];
    const CompletedIcon = completedDiscInfo.icon;
    const NextIcon = nextDiscInfo.icon;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto relative">
            {onClose && (
              <button
                type="button"
                onClick={() => setShowExitConfirmation(true)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Salir de la evaluación"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="text-center mb-5 sm:mb-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${completedDiscInfo.bg} ${completedDiscInfo.border} ${completedDiscInfo.text} border shadow-lg mb-2.5 sm:mb-3`}>
                <CompletedIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 inline-block mb-2">
                Sección Completada
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {completedDiscInfo.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hemos guardado tus respuestas de esta competencia
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800/90 dark:to-slate-900/90 text-white border border-slate-700 shadow-xl mb-4 sm:mb-5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                    Promedio Obtenido
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {disciplineTransition.score}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                    Nivel Asignado
                  </span>
                  <div className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/20 mt-0.5">
                    <span className="text-xl font-black text-emerald-400">{disciplineTransition.subLevel}</span>
                    <span className="text-xs font-bold text-slate-300">({disciplineTransition.cefrLevel})</span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-4">
                <div className={`h-full rounded-full transition-all duration-1000 ${completedDiscInfo.bar}`} style={{ width: `${disciplineTransition.score}%` }} />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Preguntas Evaluadas</span>
                  <span className="text-sm font-extrabold text-white">{disciplineTransition.totalAnswered} ejercicios</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Aciertos Precisos</span>
                  <span className="text-sm font-extrabold text-emerald-400">{disciplineTransition.correctCount} correctas</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-5 sm:mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                ¿Qué sigue a continuación?
              </span>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${nextDiscInfo.bg} ${nextDiscInfo.border} ${nextDiscInfo.text} border shrink-0`}>
                  <NextIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Evaluación de {nextDiscInfo.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    8 preguntas progresivas desde A1 hasta B2 (con opción a retos C1/C2).
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinueAfterTransition}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <NextIcon className="w-4 h-4" />
              <span>Continuar con {nextDiscInfo.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showExitConfirmation && (
          <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                ¿Deseas salir de la reevaluación?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Si sales ahora, no se guardará el progreso de esta prueba y conservarás tu nivel y calibración actual. Podrás volver a iniciar la reevaluación cuando gustes.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowExitConfirmation(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  Continuar Evaluación
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExit}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-colors cursor-pointer"
                >
                  Salir de la Prueba
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER RESULTS SCREEN
  // ==========================================
  if (isExamCompleted && finalResult) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl my-auto transition-all relative">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cerrar resultados"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          
            <div className="text-center mb-5 sm:mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/25 mb-2.5 sm:mb-3">
                <Award className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ¡Examen Diagnóstico Completado, {userName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Evaluación adaptativa por disciplinas calibrada con el estándar europeo MCER
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                  Nivel Global Asignado
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black">{finalResult.initialSubLevel}</span>
                  <span className="text-xl font-bold text-emerald-100">({finalResult.globalLevel})</span>
                </div>
                <p className="text-xs text-emerald-100 mt-2 max-w-md">
                  Puntaje promedio: <span className="font-bold text-white">{finalResult.globalScore}%</span>. Iniciarás en la etapa {finalResult.initialSubLevel} con un plan de nivelación personalizado para tus fortalezas y debilidades.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
                <span className="text-xs font-bold text-emerald-100 block">Preguntas Respondidas</span>
                <span className="text-2xl font-black text-white">{Object.keys(userAnswers).length} ejercicios</span>
                <span className="text-[10px] text-emerald-200 block mt-0.5">Adaptativo (A1 a C2)</span>
              </div>
            </div>

            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              Desglose de Nivel por Disciplina
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Bot className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Writing (Escritura)</span>
                  </div>
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                    {finalResult.disciplineLevels.writing} ({finalResult.disciplineScores.writing}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${finalResult.disciplineScores.writing}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <Mic className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Speaking (Pronunciación)</span>
                  </div>
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                    {finalResult.disciplineLevels.speaking} ({finalResult.disciplineScores.speaking}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: `${finalResult.disciplineScores.speaking}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Volume2 className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Listening (Audición)</span>
                  </div>
                  <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                    {finalResult.disciplineLevels.listening} ({finalResult.disciplineScores.listening}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full transition-all duration-1000" style={{ width: `${finalResult.disciplineScores.listening}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Award className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Reading (Lectura)</span>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {finalResult.disciplineLevels.reading} ({finalResult.disciplineScores.reading}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${finalResult.disciplineScores.reading}%` }} />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-indigo-950 dark:text-indigo-200">
                    Calibración de tu Plan Personalizado para tus Sesiones (40 Ejercicios)
                  </h4>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-1 leading-relaxed">
                    {finalResult.allocation.reasoning}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-xs font-bold text-amber-600 dark:text-amber-400">
                      Writing: {finalResult.allocation.writing} ejercicios
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-xs font-bold text-rose-600 dark:text-rose-400">
                      Speaking: {finalResult.allocation.speaking} ejercicios
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-xs font-bold text-sky-600 dark:text-sky-400">
                      Listening: {finalResult.allocation.listening} ejercicios
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Reading: {finalResult.allocation.reading} ejercicios
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {finalResult.aiRoadmap && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 mb-6">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Recomendaciones Estratégicas:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {finalResult.aiRoadmap.personalizedTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => onFinish(finalResult)}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comenzar Mi Ruta de Aprendizaje ({finalResult.initialSubLevel})</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER ACTIVE EXAM QUESTION
  // ==========================================
  const discInfo = disciplineBadgeColors[currentExercise?.discipline || 'writing'];
  const DiscIcon = discInfo.icon;
  const currentDisciplineNumber = currentDisciplineIndex + 1;
  const totalDisciplines = DISCIPLINES_ORDER.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
      <div className="min-h-full flex items-start sm:items-center justify-center p-2.5 sm:p-4 py-4 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl my-auto transition-all">
        
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold border ${discInfo.bg}`}>
                <DiscIcon className="w-3.5 h-3.5" />
                {discInfo.label} ({currentDisciplineNumber}/{totalDisciplines})
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Nivel {currentExercise?.level}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Pregunta {currentQuestionIndexInDiscipline + 1} de {disciplineQuestions.length}
              </span>
              {onClose && (
                <button
                  type="button"
                  onClick={() => setShowExitConfirmation(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/50 border border-slate-200 hover:border-rose-200 dark:border-slate-700 dark:hover:border-rose-900 transition-colors cursor-pointer"
                  title="Salir de la evaluación de nivel"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Salir</span>
                </button>
              )}
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndexInDiscipline + 1) / disciplineQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {currentExercise?.passage && (
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 mb-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
            <span className="font-sans text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              Texto de lectura:
            </span>
            {currentExercise.passage}
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
            {currentExercise?.prompt}
          </h3>
        </div>

        {currentExercise?.discipline === 'listening' && currentExercise?.audioText && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => handlePlayAudio(currentExercise.audioText!, 0.95)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              <span>{isPlayingAudio ? 'Reproduciendo...' : 'Escuchar Audio US'}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePlayAudio(currentExercise.audioText!, 0.50)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>🐢 Más Lento (0.50x)</span>
            </button>
          </div>
        )}

        <div className="mb-6">
          {currentExercise?.discipline === 'speaking' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-center">
                
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Lee y pronuncia en voz alta:
                  </span>
                  <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white px-2 py-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-rose-100 dark:border-rose-950/60">
                    "{currentExercise.targetText}"
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 text-[11px] font-extrabold mb-3">
                  <Mic className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Uso de micrófono obligatorio para evaluar Speaking</span>
                </div>

                <div className="flex justify-center my-3">
                  <button
                    type="button"
                    disabled={isAdvancing || aiEvaluationLoading}
                    onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer disabled:opacity-50 ${
                      isRecording
                        ? 'bg-rose-600 ring-4 ring-rose-300 dark:ring-rose-800 animate-pulse scale-110 shadow-rose-600/50'
                        : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30 hover:scale-105'
                    }`}
                    title={isRecording ? 'Detener grabación' : 'Iniciar grabación con micrófono'}
                  >
                    {isRecording ? <Mic className="w-9 h-9" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  {isRecording
                    ? '🎙️ Grabando... Pronuncia la oración con claridad en inglés'
                    : spokenTranscript
                    ? 'Audio capturado. Puedes volver a presionar el micrófono si deseas repetir tu pronunciación.'
                    : 'Presiona el micrófono para comenzar a hablar'}
                </p>

                {spokenTranscript ? (
                  <div className="mt-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-left shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Tu pronunciación detectada:</span>
                      </span>
                      <button
                        type="button"
                        disabled={isAdvancing || aiEvaluationLoading}
                        onClick={startVoiceRecording}
                        className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Shuffle className="w-3 h-3" />
                        <span>Volver a grabar</span>
                      </button>
                    </div>
                    <p className="text-sm font-black text-rose-700 dark:text-rose-300 bg-rose-50/50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/50">
                      "{spokenTranscript}"
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    * Pronuncia todas las palabras de la oración para que tu nivel sea evaluado con total precisión.
                  </p>
                )}

                {recognitionError && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-start gap-2 text-left">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p>{recognitionError}</p>
                      <button
                        type="button"
                        onClick={startVoiceRecording}
                        className="mt-1.5 px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900/80 hover:bg-amber-300 text-amber-900 dark:text-amber-100 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Reintentar acceso al micrófono
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentExercise?.type === 'writing_reorder' && (
            <div className="space-y-3">
              <div className="min-h-14 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toca las palabras abajo en el orden correcto...</span>
                ) : (
                  selectedWords.map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAdvancing || aiEvaluationLoading}
                      onClick={() => handleDeselectWord(word, idx)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-rose-500 transition-colors cursor-pointer"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Palabras disponibles:
                </span>
                <button
                  type="button"
                  disabled={isAdvancing || aiEvaluationLoading}
                  onClick={handleReshuffleWords}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                  title="Mezclar y desordenar palabras disponibles"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mezclar / Desordenar</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-1">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAdvancing || aiEvaluationLoading}
                    onClick={() => handleSelectWord(word, idx)}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-sm hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentExercise?.options && currentExercise.type !== 'writing_reorder' && (
            <div className="space-y-2.5">
              {(displayOptions.length > 0 ? displayOptions : currentExercise.options).map((option, idx) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAdvancing || aiEvaluationLoading}
                    onClick={() => {
                      sound.playTap();
                      setSelectedOption(option);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center justify-between cursor-pointer disabled:opacity-75 ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {!currentExercise?.options && currentExercise?.discipline !== 'speaking' && (
            <div>
              <textarea
                rows={3}
                disabled={isAdvancing || aiEvaluationLoading}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Escribe tu respuesta en inglés..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors disabled:opacity-50"
              />
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleConfirmAndAdvance}
            disabled={
              isAdvancing ||
              aiEvaluationLoading ||
              (currentExercise?.type === 'writing_reorder' && selectedWords.length === 0) ||
              (currentExercise?.options && currentExercise.type !== 'writing_reorder' && !selectedOption) ||
              (!currentExercise?.options && currentExercise?.discipline !== 'speaking' && !textInput.trim()) ||
              (currentExercise?.discipline === 'speaking' && !spokenTranscript.trim())
            }
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {aiEvaluationLoading || isAdvancing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Guardando y Evaluando...</span>
              </>
            ) : (
              <>
                <span>
                  {currentQuestionIndexInDiscipline + 1 === disciplineQuestions.length && currentDisciplineIndex + 1 === DISCIPLINES_ORDER.length
                    ? 'Finalizar y Ver Diagnóstico Completo'
                    : currentQuestionIndexInDiscipline + 1 === disciplineQuestions.length
                    ? `Guardar y Ver Resultados de ${discInfo.label}`
                    : 'Guardar y Continuar'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>

    {showExitConfirmation && (
      <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            ¿Deseas salir de la reevaluación?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Si sales ahora, no se guardará el progreso de esta prueba y conservarás tu nivel y calibración actual. Podrás volver a iniciar la reevaluación cuando gustes.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => setShowExitConfirmation(false)}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Continuar Evaluación
            </button>
            <button
              type="button"
              onClick={handleConfirmExit}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-colors cursor-pointer"
            >
              Salir de la Prueba
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};
