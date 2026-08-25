import React, { useState } from 'react';
import { BookOpen, X, Volume2, Search, Sparkles, Globe } from 'lucide-react';
import { playUSEnglishVoice } from '../utils/audio';

interface IdiomsExplorerModalProps {
  onClose: () => void;
}

interface IdiomItem {
  usIdiom: string;
  literalMeaning: string;
  mexicanEquivalent: string;
  mexicanExplanation: string;
  exampleUS: string;
  exampleTrans: string;
  category: 'daily' | 'work' | 'slang' | 'emotions';
}

const IDIOMS_DATA: IdiomItem[] = [
  {
    usIdiom: 'Hit the hay / Hit the sack',
    literalMeaning: 'Golpear el heno',
    mexicanEquivalent: 'Planchar la oreja / Irse a jetear',
    mexicanExplanation: 'Significa irse a dormir cuando estás exhausto.',
    exampleUS: "I'm exhausted, man. I'm going to hit the hay.",
    exampleTrans: 'Estoy agotadísimo, carnal. Me voy a planchar la oreja.',
    category: 'daily'
  },
  {
    usIdiom: 'Spill the beans',
    literalMeaning: 'Derramar los frijoles',
    mexicanEquivalent: 'Soltar la sopa / Cantar el chisme',
    mexicanExplanation: 'Revelar un secreto o confesar algo que no debías.',
    exampleUS: 'Come on, don\'t keep it to yourself, spill the beans!',
    exampleTrans: '¡Ándale, no te lo guardes, suelta la sopa!',
    category: 'daily'
  },
  {
    usIdiom: 'Piece of cake',
    literalMeaning: 'Pedazo de pastel',
    mexicanEquivalent: 'Está papita / Está regalado / Pan comido',
    mexicanExplanation: 'Algo que resulta facilísimo de hacer.',
    exampleUS: 'The driving test was a piece of cake.',
    exampleTrans: 'El examen de manejo estuvo regalado / papita.',
    category: 'daily'
  },
  {
    usIdiom: 'Under the weather',
    literalMeaning: 'Bajo el clima',
    mexicanEquivalent: 'Ando agüitado / Me siento apachurrado o enfermo',
    mexicanExplanation: 'Sentirse indispuesto, enfermo de gripe o decaído.',
    exampleUS: 'I won\'t be in today, I\'m feeling under the weather.',
    exampleTrans: 'No podré ir a trabajar hoy, me siento medio enfermo.',
    category: 'daily'
  },
  {
    usIdiom: 'Cut corners',
    literalMeaning: 'Cortar esquinas',
    mexicanEquivalent: 'Hacer las cosas al aventón / Tomar atajos chafas',
    mexicanExplanation: 'Ahorrar costos o esfuerzo descuidando la calidad.',
    exampleUS: 'Never cut corners when building a house foundation.',
    exampleTrans: 'Nunca hagas las cosas al aventón en los cimientos.',
    category: 'work'
  },
  {
    usIdiom: 'Touch base',
    literalMeaning: 'Tocar base',
    mexicanEquivalent: 'Echarnos una llamada rápida / Ponernos al tiro',
    mexicanExplanation: 'Reunirse brevemente para revisar el avance de algo.',
    exampleUS: 'Let\'s touch base tomorrow morning before the client call.',
    exampleTrans: 'Hay que echarnos una platicadita mañana antes del cliente.',
    category: 'work'
  },
  {
    usIdiom: 'Bite the bullet',
    literalMeaning: 'Morder la bala',
    mexicanEquivalent: 'Amarrarse los pantalones / Apechugar',
    mexicanExplanation: 'Afrontar con valentía una situación difícil e inevitable.',
    exampleUS: 'I had to bite the bullet and pay the penalty fee.',
    exampleTrans: 'Tuve que apechugar y pagar la multa.',
    category: 'emotions'
  },
  {
    usIdiom: 'Break a leg',
    literalMeaning: 'Rómpete una pierna',
    mexicanEquivalent: '¡Éxito! / ¡Mucho éxito / Rómpela!',
    mexicanExplanation: 'Desearle buena suerte a alguien antes de una presentación o prueba.',
    exampleUS: 'Break a leg at your job interview today!',
    exampleTrans: '¡Mucho éxito en tu entrevista hoy, rómpela!',
    category: 'daily'
  },
  {
    usIdiom: 'To be on the fence',
    literalMeaning: 'Estar en la cerca',
    mexicanEquivalent: 'Estar indeciso / Estar en el limbo',
    mexicanExplanation: 'No saber qué decisión tomar entre dos opciones.',
    exampleUS: 'I\'m still on the fence about moving to Austin.',
    exampleTrans: 'Todavía estoy indeciso sobre mudarme a Austin.',
    category: 'emotions'
  },
  {
    usIdiom: 'Cost an arm and a leg',
    literalMeaning: 'Costar un brazo y una pierna',
    mexicanEquivalent: 'Costar un ojo de la cara',
    mexicanExplanation: 'Algo sumamente costoso o caro.',
    exampleUS: 'Gasoline is costing an arm and a leg right now.',
    exampleTrans: 'La gasolina está costando un ojo de la cara ahorita.',
    category: 'slang'
  }
];

export const IdiomsExplorerModal: React.FC<IdiomsExplorerModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = IDIOMS_DATA.filter(item => {
    const matchesSearch = 
      item.usIdiom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mexicanEquivalent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mexicanExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-2.5 sm:p-4 py-4 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full h-[88vh] sm:h-[680px] max-h-[750px] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Diccionario de Modismos: EE.UU. ⇄ México
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aprende qué significa realmente el "slang" estadounidense y su gemelo mexicano
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por modismo US o frase mexicana..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'daily', label: 'Cotidiano' },
              { id: 'work', label: 'Trabajo' },
              { id: 'slang', label: 'Slang' },
              { id: 'emotions', label: 'Emociones' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
            >
              <div>
                {/* US Idiom Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    🇺🇸 {item.usIdiom}
                  </span>
                  <button
                    onClick={() => playUSEnglishVoice(item.usIdiom, 0.9)}
                    className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                    title="Escuchar pronunciación nativa"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Mexican Equivalent Badge */}
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 mb-3">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block uppercase">
                    🇲🇽 En México decimos:
                  </span>
                  <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                    "{item.mexicanEquivalent}"
                  </p>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                    {item.mexicanExplanation}
                  </p>
                </div>
              </div>

              {/* Example Context */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span>Ejemplo en contexto:</span>
                  <button
                    onClick={() => playUSEnglishVoice(item.exampleUS, 0.9)}
                    className="text-emerald-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Oír ejemplo</span>
                  </button>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 italic">
                  "{item.exampleUS}"
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.exampleTrans}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
  );
};
