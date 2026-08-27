import React, { useState } from 'react';
import { 
  Flame, Diamond, Zap, Bell, BookOpen, Trophy, Award, Sparkles, 
  UserCheck, Settings, Palette, Check, Moon, Sun, Target, Home, 
  Brain, LogOut
} from 'lucide-react';
import { UserProfile, AppTheme } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  profile: UserProfile;
  activeTab: 'path' | 'library' | 'vocab' | 'memory';
  onSelectTab: (tab: 'path' | 'library' | 'vocab' | 'memory') => void;
  onOpenLibrary: () => void;
  onOpenVocabGame: () => void;
  onOpenMemoryGame: () => void;
  onOpenNotifications: () => void;
  onOpenStreakCelebration: () => void;
  onRetakeDiagnostic: () => void;
  onToggleDarkMode?: () => void;
  onChangeTheme?: (theme: AppTheme) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  onSelectTab,
  onOpenLibrary,
  onOpenVocabGame,
  onOpenMemoryGame,
  onOpenNotifications,
  onOpenStreakCelebration,
  onRetakeDiagnostic,
  onToggleDarkMode,
  onChangeTheme,
  onLogout
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const themeOptions: { id: AppTheme; name: string; color: string; badge: string }[] = [
    { id: 'indigo', name: 'Azul Ejecutivo', color: 'bg-blue-600', badge: 'border-blue-500' },
    { id: 'emerald', name: 'Esmeralda Pro', color: 'bg-emerald-600', badge: 'border-emerald-500' },
    { id: 'amber', name: 'Ámbar Cálido', color: 'bg-amber-600', badge: 'border-amber-500' },
    { id: 'obsidian', name: 'Obsidiana Dark', color: 'bg-slate-900', badge: 'border-slate-700' }
  ];

  const handleLogoutClick = () => {
    sound.playTap();
    setShowThemeMenu(false);
    setShowLogoutConfirm(true);
  };

  return (
    <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      
      {/* Primary Brand & Stats Row */}
      <header className="h-16 flex items-center justify-between px-3 sm:px-6 md:px-8">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div 
            onClick={() => onSelectTab('path')}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 cursor-pointer transition-all hover:scale-105"
          >
            E
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 
                onClick={() => onSelectTab('path')}
                className="text-base sm:text-lg font-black leading-tight text-slate-900 dark:text-white tracking-tight cursor-pointer"
              >
                English<span className="text-blue-600 font-bold">Express</span>
              </h1>
              <span className="text-[10px] uppercase font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded-md">
                US ⇄ MX
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              English (US) → Español (MX) • MCER {profile.globalLevel}
            </p>
          </div>
        </div>

        {/* Gamification Stats: Streak, Gems, XP & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Animated Streak Badge with Flame */}
          <button 
            onClick={onOpenStreakCelebration}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/40 px-2.5 sm:px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300 text-xs font-black cursor-pointer hover:scale-105 transition-all shadow-sm group"
            title={`¡Racha de ${profile.streak.count} días! Haz clic para ver hitos y protectores`}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-flame group-hover:scale-110 transition-transform" />
            <span>{profile.streak.count} Días</span>
          </button>

          {/* Gems */}
          <div 
            className="flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 sm:px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-900/50 text-cyan-700 dark:text-cyan-400 text-xs font-extrabold"
            title="Gemas ganadas"
          >
            <Diamond className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
            <span>{profile.gems}</span>
          </div>

          {/* XP */}
          <div 
            className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 px-2.5 sm:px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-xs font-extrabold"
            title="Puntos de Experiencia (XP)"
          >
            <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span className="hidden xs:inline">{profile.xp.toLocaleString()} XP</span>
            <span className="xs:hidden">{profile.xp}</span>
          </div>

          {/* Theme, Dark Mode, Settings & Logout */}
          <div className="flex items-center gap-1 sm:gap-1.5 relative">
            {/* Quick Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={profile.isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {profile.isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Theme Palette Switcher (ahora también incluye la cuenta y cerrar sesión) */}
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Cambiar Diseño, Cuenta y Paleta Visual"
            >
              <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-12 z-50 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                <div className="px-2.5 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{profile.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{profile.email || 'Estudiante activo'}</p>
                </div>

                <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
                  Diseños de Tema
                </span>
                {themeOptions.map((th) => {
                  const isCurrent = (profile.theme || 'indigo') === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        onChangeTheme?.(th.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${th.color} shadow-sm`} />
                        <span>{th.name}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    </button>
                  );
                })}

                <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={onOpenNotifications}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
              title="Ajustes, Metas y Modo Oscuro"
            >
              <Settings className="w-4 h-4" />
              {profile.notificationsEnabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================
          TOP ACTION & FEATURE NAVIGATION BAR (VISIBLE IMMEDIATELY)
      ======================================================== */}
      <nav className="px-3 sm:px-6 md:px-8 py-2 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* 1. Ruta de Aprendizaje (Home) */}
          <button
            onClick={() => onSelectTab('path')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm ${
              activeTab === 'path'
                ? 'bg-blue-600 text-white shadow-blue-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
            title="Ruta Curricular y Sesiones de Aprendizaje"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Ruta de Aprendizaje</span>
          </button>

          {/* 2. Library (Lecturas y Fábulas Libres de Copyright) */}
          <button
            onClick={onOpenLibrary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Biblioteca de lecturas, fábulas de Esopo y cuentos clásicos de dominio público con audio nativo y traducción"
          >
            <BookOpen className="w-3.5 h-3.5 fill-emerald-500 text-emerald-600 dark:text-emerald-400" />
            <span className="flex items-center gap-1">
              Library
              <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded font-black">
                Fábulas
              </span>
            </span>
          </button>

          {/* 3. Reto 100 Palabras */}
          <button
            onClick={onOpenVocabGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Reto 100 Palabras - Adivina el vocabulario y alcanza el título G.O.A.T."
          >
            <Trophy className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Reto 100 Palabras</span>
          </button>

          {/* 4. Memorama de Vocabulario */}
          <button
            onClick={onOpenMemoryGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-300 dark:border-purple-800 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Juego de Memorama: Elige tópicos variados (animales, verbos, objetos, ropa) y empareja vocabulario"
          >
            <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Memorama</span>
          </button>

          {/* 5. Reevaluar Nivel (Diagnóstico Dinámico para evaluar o brincarse niveles) */}
          <button
            onClick={onRetakeDiagnostic}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-300 dark:border-blue-800 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Reevaluar Nivel de Inglés: Examen adaptativo con preguntas dinámicas y aleatorias para reubicar o calibrar tu nivel CEFR (A1 a C2)"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Reevaluar Nivel</span>
          </button>

        </div>

        {/* Right side helper info */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
          <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            🎯 Meta Diaria: <b>{profile.dailyGoalMinutes || 15} min</b>
          </span>
        </div>
      </nav>

      {/* Confirmación de Cerrar Sesión */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
              ¿Cerrar sesión?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Tu progreso y tus lecciones se mantendrán guardados en este dispositivo.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
              >
                Sí, Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
