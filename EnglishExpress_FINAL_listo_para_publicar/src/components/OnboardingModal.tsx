import React, { useState } from 'react';
import { Sparkles, Mail, User, ShieldCheck, ArrowRight, BookOpen, Volume2, Mic, PenTool, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  onComplete: (name: string, email: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('work');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido para vincular tu progreso.');
      return;
    }
    onComplete(name.trim(), email.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl transition-all my-auto">
        
        {/* Header Header & Welcome */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 mb-2.5 sm:mb-3">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            ¡Bienvenido a <span className="text-emerald-500">EnglishExpress</span>!
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Aprende inglés estadounidense (US English) adaptado al español mexicano con el sistema europeo <span className="font-semibold text-slate-900 dark:text-slate-200">MCER (A1 a C2)</span>.
          </p>
        </div>

        {/* 4 Disciplines Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 sm:mb-6">
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center">
            <PenTool className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300">Writing</p>
            <span className="text-[10px] text-amber-600 dark:text-amber-400">Escritura</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-center">
            <Mic className="w-4 h-4 mx-auto text-rose-600 dark:text-rose-400 mb-1" />
            <p className="text-xs font-bold text-rose-800 dark:text-rose-300">Speaking</p>
            <span className="text-[10px] text-rose-600 dark:text-rose-400">Pronunciación</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 text-center">
            <Volume2 className="w-4 h-4 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
            <p className="text-xs font-bold text-sky-800 dark:text-sky-300">Listening</p>
            <span className="text-[10px] text-sky-600 dark:text-sky-400">Audición US</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-center">
            <BookOpen className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Reading</p>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Comprensión</span>
          </div>
        </div>

        {/* Diagnostic Exam Info Box */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 mb-4 sm:mb-6">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Paso 1: Examen Diagnóstico Adaptativo (MCER)
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Sin límite de tiempo. Evaluarás una disciplina a la vez (Writing, Speaking, Listening y Reading) con 8 preguntas base (2 de A1, 2 de A2, 2 de B1 y 2 de B2). Si respondes bien hasta B2, se desbloquearán preguntas de nivel C1 y C2 para calibrar tu nivel exacto.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tu Nombre Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Miguel Monreal"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Correo Electrónico (Para vincular tu cuenta)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu_correo@ejemplo.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              ¿Cuál es tu principal objetivo con el inglés?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'work', label: '💼 Trabajo y Negocios' },
                { id: 'travel', label: '✈️ Viajes a EE.UU.' },
                { id: 'study', label: '🎓 Estudios / Certificación' },
                { id: 'daily', label: '🗣️ Conversación Fluida' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                    goal === opt.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Iniciar Examen Diagnóstico Adaptativo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Progreso guardado automáticamente • Micrófono requerido para Speaking
          </p>
        </div>

      </div>
    </div>
  </div>
  );
};
