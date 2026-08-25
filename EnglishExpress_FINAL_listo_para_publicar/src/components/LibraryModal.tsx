import React, { useState } from 'react';
import { 
  X, BookOpen, Volume2, VolumeX, Sparkles, Check, ChevronRight, 
  HelpCircle, Award, Compass, Search, Filter, ArrowLeft, Lightbulb,
  CheckCircle2, Play, Pause, Bookmark, RotateCcw, Zap, Diamond, Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LibraryStory, CEFRLevel, UserProfile } from '../types';
import { PUBLIC_DOMAIN_STORIES } from '../data/libraryStories';
import { sound, playUSEnglishVoice } from '../utils/audio';

interface LibraryModalProps {
  profile: UserProfile;
  onClose: () => void;
  onRewardUser: (xp: number, gems: number) => void;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  profile,
  onClose,
  onRewardUser
}) => {
  const [selectedStory, setSelectedStory] = useState<LibraryStory | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Reader state
  const [showSpanishTranslation, setShowSpanishTranslation] = useState<boolean>(true);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  
  // Quiz state
  const [activeTab, setActiveTab] = useState<'read' | 'vocab' | 'quiz'>('read');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedStoryIds, setCompletedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('completed_library_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter stories
  const filteredStories = PUBLIC_DOMAIN_STORIES.filter(story => {
    const matchesLevel = selectedLevelFilter === 'all' || story.level === selectedLevelFilter;
    const matchesSearch = 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.titleEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  // Handle TTS playback for a paragraph or whole story
  const handlePlayParagraph = (text: string, index?: number) => {
    if (index !== undefined) {
      setActiveParagraphIndex(index);
    }
    setIsPlayingAudio(true);
    playUSEnglishVoice(text, playbackSpeed, () => {
      setIsPlayingAudio(false);
      setActiveParagraphIndex(null);
    });
  };

  const handleStopAudio = () => {
    setIsPlayingAudio(false);
    setActiveParagraphIndex(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Submit Comprehension Quiz
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    sound.playTap();
  };

  const handleSubmitQuiz = () => {
    if (!selectedStory) return;
    setQuizSubmitted(true);

    const totalQuestions = selectedStory.questions.length;
    let correctCount = 0;
    selectedStory.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === totalQuestions) {
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      if (!completedStoryIds.includes(selectedStory.id)) {
        const nextCompleted = [...completedStoryIds, selectedStory.id];
        setCompletedStoryIds(nextCompleted);
        try {
          localStorage.setItem('completed_library_stories', JSON.stringify(nextCompleted));
        } catch {}
        onRewardUser(selectedStory.xpReward, selectedStory.gemsReward);
      }
    } else {
      sound.playAlmost();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* ==========================================
            MODAL HEADER
        ========================================== */}
        <header className="px-5 py-4 sm:px-7 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            {selectedStory ? (
              <button
                onClick={() => {
                  handleStopAudio();
                  setSelectedStory(null);
                  setQuizSubmitted(false);
                  setUserAnswers({});
                  setActiveTab('read');
                }}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 p-2 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Biblioteca</span>
              </button>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {selectedStory ? selectedStory.title : 'Library • Lecturas y Fábulas'}
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Dominio Público
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {selectedStory 
                  ? `${selectedStory.titleEs} • ${selectedStory.author}`
                  : 'Fábulas de Esopo, cuentos clásicos y lecturas libres de copyright en inglés con audio nativo y traducción'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleStopAudio();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ==========================================
            BODY CONTENT: CATALOG OR STORY READER
        ========================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {!selectedStory ? (
            /* ---------------- CATALOG VIEW ---------------- */
            <div className="space-y-6">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar historia, autor o palabra..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Level Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setSelectedLevelFilter(lvl);
                        sound.playTap();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        selectedLevelFilter === lvl
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {lvl === 'all' ? 'Todos los Niveles' : `Nivel ${lvl}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Story Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStories.map(story => {
                  const isCompleted = completedStoryIds.includes(story.id);

                  return (
                    <div
                      key={story.id}
                      onClick={() => {
                        setSelectedStory(story);
                        setUserAnswers({});
                        setQuizSubmitted(false);
                        setActiveTab('read');
                        sound.playTap();
                      }}
                      className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                    >
                      {isCompleted && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 dark:bg-green-950/70 text-green-700 dark:text-green-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-300 dark:border-green-800">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>Completada</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                            {story.coverEmoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                MCER {story.level}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                ⏱️ {story.readTimeMinutes} min • {story.wordCount} palabras
                              </span>
                            </div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {story.title}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {story.titleEs}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                          {story.summaryEs}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs font-bold">
                          <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 fill-blue-600" />
                            +{story.xpReward} XP
                          </span>
                          <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                            <Diamond className="w-3.5 h-3.5 fill-cyan-500" />
                            +{story.gemsReward} Gemas
                          </span>
                        </div>

                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Leer ahora <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStories.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-bold text-sm">No se encontraron lecturas para ese filtro</p>
                  <p className="text-xs text-slate-500 mt-1">Prueba seleccionando "Todos los Niveles" o limpiando el buscador.</p>
                </div>
              )}

            </div>
          ) : (
            /* ---------------- IMMERSIVE READER VIEW ---------------- */
            <div className="space-y-6">
              
              {/* Reader Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab('read')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'read'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    📖 Lectura
                  </button>
                  <button
                    onClick={() => setActiveTab('vocab')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'vocab'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    🔤 Vocabulario Clave ({selectedStory.vocabulary.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'quiz'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    🎯 Quiz de Comprensión ({selectedStory.questions.length})
                  </button>
                </div>

                {/* Audio & Bilingual Controls */}
                <div className="flex items-center gap-2">
                  {/* Speed toggle */}
                  <button
                    onClick={() => {
                      const speeds = [0.8, 1.0, 1.2];
                      const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                      setPlaybackSpeed(speeds[nextIdx]);
                      sound.playTap();
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Velocidad de reproducción de audio"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Play all audio */}
                  <button
                    onClick={() => {
                      if (isPlayingAudio) {
                        handleStopAudio();
                      } else {
                        const fullText = selectedStory.paragraphs.map(p => p.en).join('. ');
                        handlePlayParagraph(fullText);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer shadow-sm"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-amber-600" />
                        <span>Pausar Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Escuchar Historia</span>
                      </>
                    )}
                  </button>

                  {/* Translation toggle */}
                  <button
                    onClick={() => {
                      setShowSpanishTranslation(!showSpanishTranslation);
                      sound.playTap();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      showSpanishTranslation
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                    title="Mostrar u ocultar traducción al español mexicano"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{showSpanishTranslation ? 'Español Activado' : 'Solo Inglés'}</span>
                  </button>
                </div>
              </div>

              {/* 1. READ TAB */}
              {activeTab === 'read' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {/* Story title header banner */}
                  <div className="text-center py-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-3xl mb-2 block">{selectedStory.coverEmoji}</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {selectedStory.title}
                    </h1>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                      {selectedStory.titleEs}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                      {selectedStory.source}
                    </p>
                  </div>

                  {/* Paragraphs with interactive audio and translation */}
                  <div className="space-y-5">
                    {selectedStory.paragraphs.map((p, idx) => {
                      const isCurrentlyPlaying = activeParagraphIndex === idx;

                      return (
                        <div
                          key={idx}
                          className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 border ${
                            isCurrentlyPlaying
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 ring-2 ring-blue-400/20'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                              {p.en}
                            </p>

                            <button
                              onClick={() => handlePlayParagraph(p.en, idx)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 transition-colors cursor-pointer"
                              title="Escuchar este párrafo en inglés con pronunciación nativa"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {showSpanishTranslation && (
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                              {p.es}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Moral of the Story Card */}
                  {selectedStory.moral && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900/60 shadow-sm">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Moraleja / Moral Lesson</span>
                      </div>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        "{selectedStory.moral.en}"
                      </p>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                        "{selectedStory.moral.es}"
                      </p>
                    </div>
                  )}

                  {/* Call to action to take quiz */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('quiz');
                        sound.playTap();
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completar Quiz de Comprensión (+{selectedStory.xpReward} XP)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. VOCABULARY TAB */}
              {activeTab === 'vocab' && (
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 font-medium">
                    💡 <b>Vocabulario clave</b> extraído de esta historia. Haz clic en la bocina para escuchar la pronunciación y su contexto de uso.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedStory.vocabulary.map((vocab, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-slate-900 dark:text-white">
                              {vocab.word}
                            </span>
                            {vocab.phonetic && (
                              <span className="text-xs text-slate-400 font-mono">
                                /{vocab.phonetic}/
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => playUSEnglishVoice(vocab.word, 0.9)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {vocab.meaning}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          "{vocab.context}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. QUIZ TAB */}
              {activeTab === 'quiz' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 font-medium flex items-center justify-between">
                    <span>
                      🎯 Responde las preguntas para verificar tu comprensión y ganar <b>+{selectedStory.xpReward} XP</b> y <b>+{selectedStory.gemsReward} Gemas</b>.
                    </span>
                  </div>

                  <div className="space-y-5">
                    {selectedStory.questions.map((q, qIdx) => {
                      const selectedOpt = userAnswers[q.id];
                      const isAnswered = selectedOpt !== undefined;

                      return (
                        <div
                          key={q.id}
                          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4"
                        >
                          <div>
                            <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400">
                              Pregunta {qIdx + 1} de {selectedStory.questions.length}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                              {q.question}
                            </h4>
                            {q.questionEs && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {q.questionEs}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selectedOpt === optIdx;
                              let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100';

                              if (quizSubmitted) {
                                if (optIdx === q.correctIndex) {
                                  btnStyle = 'bg-green-500 text-white border-green-600 font-bold';
                                } else if (isSelected && optIdx !== q.correctIndex) {
                                  btnStyle = 'bg-red-500 text-white border-red-600 font-bold';
                                } else {
                                  btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-500';
                                }
                              } else if (isSelected) {
                                btnStyle = 'bg-blue-600 text-white border-blue-700 font-bold shadow-md';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectAnswer(q.id, optIdx)}
                                  disabled={quizSubmitted}
                                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{opt}</span>
                                    {quizSubmitted && optIdx === q.correctIndex && (
                                      <Check className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300">
                              <b>Explicación:</b> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    {!quizSubmitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(userAnswers).length < selectedStory.questions.length}
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all"
                      >
                        Comprobar Respuestas
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedStory(null);
                          setUserAnswers({});
                          setQuizSubmitted(false);
                          setActiveTab('read');
                        }}
                        className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-md cursor-pointer hover:opacity-90 transition-all"
                      >
                        Volver a la Biblioteca
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
