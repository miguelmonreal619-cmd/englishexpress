import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight, Zap, BookOpen, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CEFRLevel, SubLevel, VocabPair } from '../types';
import { sound, playUSEnglishVoice, shuffleArray } from '../utils/audio';

// Rich level-based vocabulary pools for matching pairs
const VOCAB_POOLS: Record<CEFRLevel, VocabPair[]> = {
  A1: [
    { id: 'v1', english: 'Schedule', spanish: 'Horario / Agenda', phonetic: 'ské-yul', contextUsage: 'What is your schedule today?' },
    { id: 'v2', english: 'Actually', spanish: 'En realidad / De hecho', phonetic: 'ák-chua-li', contextUsage: 'Actually, I prefer coffee.' },
    { id: 'v3', english: 'To go', spanish: 'Para llevar (comida)', phonetic: 'tu góu', contextUsage: 'Two tacos to go, please.' },
    { id: 'v4', english: 'Right now', spanish: 'Ahorita / En este momento', phonetic: 'ráit náu', contextUsage: 'I am busy right now.' },
    { id: 'v5', english: 'How much', spanish: '¿Cuánto cuesta?', phonetic: 'jáu mach', contextUsage: 'How much is this ticket?' },
    { id: 'v6', english: 'Check', spanish: 'La cuenta (restaurante)', phonetic: 'chek', contextUsage: 'Could we get the check?' },
    { id: 'v7', english: 'Receipt', spanish: 'Ticket / Recibo', phonetic: 'ri-síit', contextUsage: 'Do you need your receipt?' },
    { id: 'v8', english: 'Restroom', spanish: 'Baño (en EE.UU.)', phonetic: 'rést-rum', contextUsage: 'Where is the restroom?' }
  ],
  A2: [
    { id: 'v201', english: 'Grocery store', spanish: 'Supermercado / Tienda de abarrotes', phonetic: 'gróu-se-ri stor', contextUsage: 'I need to go to the grocery store.' },
    { id: 'v202', english: 'Hang out', spanish: 'Pasar el rato / Convivir', phonetic: 'jang áut', contextUsage: 'Let\'s hang out this Friday.' },
    { id: 'v203', english: 'Take your time', spanish: 'Tómate tu tiempo / Con calma', phonetic: 'téik iur táim', contextUsage: 'No rush, take your time.' },
    { id: 'v204', english: 'Never mind', spanish: 'Olvídalo / No importa', phonetic: 'né-ver máind', contextUsage: 'Never mind, I found it.' },
    { id: 'v205', english: 'Look for', spanish: 'Buscar', phonetic: 'luk for', contextUsage: 'I am looking for my keys.' },
    { id: 'v206', english: 'By the way', spanish: 'Por cierto / A propósito', phonetic: 'bái da uéi', contextUsage: 'By the way, are you coming?' },
    { id: 'v207', english: 'Traffic jam', spanish: 'Embotellamiento / Tráfico pesado', phonetic: 'trá-fik yam', contextUsage: 'Stuck in a traffic jam.' },
    { id: 'v208', english: 'Gas station', spanish: 'Gasolinera', phonetic: 'gás stéi-shon', contextUsage: 'Stop by the gas station.' }
  ],
  B1: [
    { id: 'v301', english: 'Touch base', spanish: 'Ponernos de acuerdo / Platicar brevemente', phonetic: 'tach béis', contextUsage: 'Let\'s touch base tomorrow morning.' },
    { id: 'v302', english: 'Push back', spanish: 'Posponer / Aplazar', phonetic: 'push bák', contextUsage: 'The meeting was pushed back.' },
    { id: 'v303', english: 'Cut corners', spanish: 'Hacer las cosas a medias / Ahorrar costos', phonetic: 'cat cór-ners', contextUsage: 'Don\'t cut corners on safety.' },
    { id: 'v304', english: 'Headquarters', spanish: 'Oficinas centrales / Sede', phonetic: 'jéd-kuar-ters', contextUsage: 'Their headquarters are in Texas.' },
    { id: 'v305', english: 'Look forward to', spanish: 'Esperar con entusiasmo', phonetic: 'luk fór-uard tu', contextUsage: 'I look forward to meeting you.' },
    { id: 'v306', english: 'Run out of', spanish: 'Quedarse sin (inventario/tiempo)', phonetic: 'ran áut ov', contextUsage: 'We ran out of coffee.' },
    { id: 'v307', english: 'Feedback', spanish: 'Retroalimentación / Opinión constructiva', phonetic: 'fíid-bak', contextUsage: 'Thanks for the honest feedback.' },
    { id: 'v308', english: 'Deadline', spanish: 'Fecha límite de entrega', phonetic: 'déd-lain', contextUsage: 'The deadline is next Friday.' }
  ],
  B2: [
    { id: 'v401', english: 'Bottleneck', spanish: 'Cuello de botella / Obstáculo', phonetic: 'bó-tol-nek', contextUsage: 'Identify the workflow bottleneck.' },
    { id: 'v402', english: 'Ballpark figure', spanish: 'Cifra aproximada / Estimado', phonetic: 'ból-park fí-guiur', contextUsage: 'Give me a ballpark figure.' },
    { id: 'v403', english: 'Play devil\'s advocate', spanish: 'Ver el lado contrario / Cuestionar', phonetic: 'pléi dé-vils ád-vo-keit', contextUsage: 'Let me play devil\'s advocate.' },
    { id: 'v404', english: 'Rule of thumb', spanish: 'Regla general / Práctica estándar', phonetic: 'ruul ov zamb', contextUsage: 'A good rule of thumb.' },
    { id: 'v405', english: 'Call it a day', spanish: 'Dar por terminado el trabajo de hoy', phonetic: 'col it a déi', contextUsage: 'Let\'s call it a day.' },
    { id: 'v406', english: 'Trade-off', spanish: 'Compensación / Sacrificio de beneficio', phonetic: 'tréid-of', contextUsage: 'Cost vs quality trade-off.' }
  ],
  C1: [
    { id: 'v501', english: 'Specious', spanish: 'Engañoso / Aparentemente válido pero falso', phonetic: 'spíi-shas', contextUsage: 'A specious argument in court.' },
    { id: 'v502', english: 'Ubiquitous', spanish: 'Omnipresente / En todas partes', phonetic: 'iu-bí-kui-tas', contextUsage: 'Smartphones are ubiquitous.' },
    { id: 'v503', english: 'Mitigate', spanish: 'Atenuar / Mitigar riesgos', phonetic: 'mí-ti-gueit', contextUsage: 'Mitigate potential risks.' },
    { id: 'v504', english: 'Paradigm shift', spanish: 'Cambio radical de modelo', phonetic: 'pá-ra-daim shift', contextUsage: 'A technological paradigm shift.' }
  ],
  C2: [
    { id: 'v601', english: 'Disparate', spanish: 'Heterogéneo / Esencialmente diferente', phonetic: 'dís-pa-rat', contextUsage: 'Disparate data sources.' },
    { id: 'v602', english: 'Inextricable', spanish: 'Inseparable / Complejo de desenredar', phonetic: 'in-éks-tri-ca-bol', contextUsage: 'Inextricable connection.' },
    { id: 'v603', english: 'Sycophant', spanish: 'Adulador servil', phonetic: 'sí-co-fant', contextUsage: 'Surrounded by sycophants.' },
    { id: 'v604', english: 'Quintessential', spanish: 'El ejemplo más representativo por excelencia', phonetic: 'kuin-te-sén-shol', contextUsage: 'Quintessential American diner.' }
  ]
};

interface VocabularyMatchProps {
  subLevel: SubLevel;
  onCompleted: (bonusXp: number, bonusGems: number) => void;
  onSkip?: () => void;
}

export const VocabularyMatch: React.FC<VocabularyMatchProps> = ({
  subLevel,
  onCompleted,
  onSkip
}) => {
  const tier = (subLevel.substring(0, 2) as CEFRLevel) || 'A1';
  const rawPool = VOCAB_POOLS[tier] || VOCAB_POOLS.A1;

  // Pick 5 random pairs
  const [pairs] = useState<VocabPair[]>(() => {
    const shuffled = shuffleArray([...rawPool]);
    return shuffled.slice(0, 5);
  });

  const [shuffledEnglish, setShuffledEnglish] = useState<{ id: string; text: string; phonetic?: string }[]>([]);
  const [shuffledSpanish, setShuffledSpanish] = useState<{ id: string; text: string }[]>([]);

  // Selection & Match state
  const [selectedEnglishId, setSelectedEnglishId] = useState<string | null>(null);
  const [selectedSpanishId, setSelectedSpanishId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ englishId: string; spanishId: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const eng = pairs.map(p => ({ id: p.id, text: p.english, phonetic: p.phonetic }));
    const spa = pairs.map(p => ({ id: p.id, text: p.spanish }));

    setShuffledEnglish(shuffleArray(eng));
    setShuffledSpanish(shuffleArray(spa));
  }, [pairs]);

  const handleSelectEnglish = (id: string, text: string) => {
    if (matchedIds.includes(id)) return;
    sound.playTap();
    playUSEnglishVoice(text, 0.95);
    setSelectedEnglishId(id);

    if (selectedSpanishId) {
      checkMatch(id, selectedSpanishId);
    }
  };

  const handleSelectSpanish = (id: string) => {
    if (matchedIds.includes(id)) return;
    sound.playTap();
    setSelectedSpanishId(id);

    if (selectedEnglishId) {
      checkMatch(selectedEnglishId, id);
    }
  };

  const checkMatch = (engId: string, spaId: string) => {
    if (engId === spaId) {
      // Match found!
      sound.playCorrect();
      const updated = [...matchedIds, engId];
      setMatchedIds(updated);
      setSelectedEnglishId(null);
      setSelectedSpanishId(null);
      setWrongPair(null);

      if (updated.length === pairs.length) {
        // Complete!
        sound.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setIsFinished(true);
      }
    } else {
      // Mismatch
      sound.playIncorrect();
      setWrongPair({ englishId: engId, spanishId: spaId });
      setTimeout(() => {
        setSelectedEnglishId(null);
        setSelectedSpanishId(null);
        setWrongPair(null);
      }, 700);
    }
  };

  const handleContinue = () => {
    onCompleted(15, 10); // Bonus 15 XP, 10 Gems
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full mx-auto animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
              Desafío de Vocabulario
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Conecta cada palabra en inglés con su significado correspondiente en español.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>+15 XP Bonus</span>
        </div>
      </div>

      {/* Progress pill */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3 px-1">
        <span>Progreso de parejas:</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
          {matchedIds.length} de {pairs.length} completadas
        </span>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div 
          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${(matchedIds.length / pairs.length) * 100}%` }}
        />
      </div>

      {/* Matching columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        
        {/* Left: English Words */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
            Palabras en Inglés (US)
          </span>

          {shuffledEnglish.map(item => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedEnglishId === item.id;
            const isWrong = wrongPair?.englishId === item.id;

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectEnglish(item.id, item.text)}
                className={`w-full p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm border transition-all flex items-center justify-between cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 opacity-60 cursor-default'
                    : isWrong
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-200 animate-shake'
                    : isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-500 text-blue-800 dark:text-blue-200 ring-2 ring-blue-400 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="block font-black text-slate-900 dark:text-white">
                    {item.text}
                  </span>
                  {item.phonetic && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal italic">
                      /{item.phonetic}/
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500" />
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Spanish Translations */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
            Significados en Español
          </span>

          {shuffledSpanish.map(item => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedSpanishId === item.id;
            const isWrong = wrongPair?.spanishId === item.id;

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectSpanish(item.id)}
                className={`w-full p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm border transition-all flex items-center justify-between cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 opacity-60 cursor-default'
                    : isWrong
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-200 animate-shake'
                    : isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-400 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:bg-slate-50'
                }`}
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {item.text}
                </span>

                {isMatched && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Completion Box or Action */}
      {isFinished ? (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
          <p className="font-black text-emerald-800 dark:text-emerald-200 text-base flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>¡Excelente trabajo de vocabulario! (+15 XP & +10 Gemas)</span>
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            Hemos registrado las {pairs.length} palabras aprendidas en tu memoria de largo plazo.
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver Resumen de la Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] text-slate-400">
            Toca una palabra en inglés y luego su significado en español.
          </p>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Saltar dinámica
            </button>
          )}
        </div>
      )}

    </div>
  );
};
