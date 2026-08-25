import React, { useState } from 'react';
import { 
  Bell, Flame, Diamond, Clock, ShieldCheck, X, Check, Sparkles, Mail, Send, 
  Moon, Sun, Volume2, VolumeX, Target, Sliders, Palette 
} from 'lucide-react';
import { UserProfile, AppTheme } from '../types';
import { sound } from '../utils/audio';

interface NotificationsSettingsModalProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
  onOpenStreakCelebration?: () => void;
}

export const NotificationsSettingsModal: React.FC<NotificationsSettingsModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
  onOpenStreakCelebration
}) => {
  const [isDarkMode, setIsDarkMode] = useState(profile.isDarkMode ?? false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(profile.notificationsEnabled);
  const [reminderTime, setReminderTime] = useState(profile.reminderTime || '20:00');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(profile.dailyGoalMinutes || 15);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [testSent, setTestSent] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'goals' | 'streak'>('general');

  const handleToggleDarkMode = (enableDark: boolean) => {
    setIsDarkMode(enableDark);
    sound.playTap();
    onUpdateProfile({ isDarkMode: enableDark });
    if (enableDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSave = () => {
    onUpdateProfile({
      isDarkMode,
      notificationsEnabled,
      reminderTime,
      dailyGoalMinutes
    });
    sound.playTap();
    onClose();
  };

  const handleSendTestNotification = () => {
    sound.playCorrect();
    setTestSent(true);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🔥 EnglishExpress: ¡Mantén tu Racha!', {
        body: `¡Hola ${profile.name}! Tienes 1 sesión pendiente para no perder tu racha de ${profile.streak.count} días.`,
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('🔥 EnglishExpress: ¡Mantén tu Racha!', {
            body: `¡Hola ${profile.name}! Tienes 1 sesión pendiente para no perder tu racha de ${profile.streak.count} días.`
          });
        }
      });
    }

    setTimeout(() => setTestSent(false), 4000);
  };

  const handleBuyStreakFreeze = () => {
    if (profile.gems < 50) {
      setPurchaseSuccess('Necesitas 50 gemas para comprar un protector de racha.');
      return;
    }
    onUpdateProfile({
      gems: profile.gems - 50,
      streak: {
        ...profile.streak,
        freezeCount: profile.streak.freezeCount + 1
      }
    });
    sound.playFanfare();
    setPurchaseSuccess('¡Protector de racha adquirido con éxito!');
    setTimeout(() => setPurchaseSuccess(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Configuración y Preferencias
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personaliza modo oscuro, metas de estudio y rachas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl gap-1">
          {[
            { id: 'general', label: 'Apariencia & Sistema' },
            { id: 'goals', label: 'Metas Diarias' },
            { id: 'streak', label: 'Racha & Alertas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================
            TAB 1: GENERAL & DARK MODE
        ======================================================== */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            {/* Dark Mode Switcher Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-950 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                  {isDarkMode ? <Moon className="w-5 h-5 fill-current" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                    Modo Oscuro (Dark Theme)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isDarkMode ? 'Interfaz oscura relajante para la vista' : 'Tema claro de alto contraste'}
                  </span>
                </div>
              </div>

              <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => handleToggleDarkMode(false)}
                  className={`p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    !isDarkMode
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Modo Claro"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Claro</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleDarkMode(true)}
                  className={`p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    isDarkMode
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Modo Oscuro"
                >
                  <Moon className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Oscuro</span>
                </button>
              </div>
            </div>

            {/* Sound FX Switch */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!isMuted ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'}`}>
                  {!isMuted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                    Efectos de Sonido
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Audio de aciertos, rachas y gamificación
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleSound}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !isMuted
                    ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500'
                }`}
              >
                {!isMuted ? 'Activados' : 'Silenciados'}
              </button>
            </div>

            {/* User Profile Info */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{profile.name}</span>
                  <span className="text-slate-500 text-[11px]">{profile.email || 'Estudiante EnglishExpress'}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                Nivel {profile.globalLevel} ({profile.currentSubLevel})
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: DAILY GOALS (METAS DIARIAS)
        ======================================================== */}
        {activeTab === 'goals' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
                Selecciona tu Meta Diaria de Estudio
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Completar tu meta diaria otorga bonos de experiencia (XP) y gemas adicionales.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { min: 10, label: '10 min / día', title: 'Casual', desc: '1 sesión rápida', icon: '⚡' },
                  { min: 15, label: '15 min / día', title: 'Recomendado', desc: '1 sesión + vocabulario', icon: '🎯' },
                  { min: 20, label: '20 min / día', title: 'Avanzado', desc: '2 sesiones completas', icon: '🚀' },
                  { min: 30, label: '30 min / día', title: 'Intensivo', desc: 'Inmersión profunda', icon: '🔥' }
                ].map(g => (
                  <button
                    key={g.min}
                    type="button"
                    onClick={() => setDailyGoalMinutes(g.min)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      dailyGoalMinutes === g.min
                        ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base">{g.icon}</span>
                      {dailyGoalMinutes === g.min && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </div>
                    <div className="font-black text-xs sm:text-sm">{g.label}</div>
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{g.title} • {g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Goal Progress summary */}
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
              <div className="flex justify-between items-center text-xs font-bold text-blue-900 dark:text-blue-300 mb-1.5">
                <span>Progreso de hoy</span>
                <span>{profile.todayMinutesPracticed || 0} / {dailyGoalMinutes} min</span>
              </div>
              <div className="h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all"
                  style={{ width: `${Math.min(100, Math.round(((profile.todayMinutesPracticed || 0) / dailyGoalMinutes) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: STREAK & NOTIFICATIONS
        ======================================================== */}
        {activeTab === 'streak' && (
          <div className="space-y-4">
            {/* Streak Hero Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider opacity-90 block">
                  Racha Actual
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{profile.streak.count} Días</span>
                  <span className="text-xs opacity-90">(Récord: {profile.streak.longestStreak}d)</span>
                </div>
                <p className="text-xs opacity-95 mt-0.5">
                  {profile.streak.freezeCount} Protectores de Racha disponibles
                </p>
              </div>

              <div className="flex flex-col gap-1.5 items-end">
                <button
                  type="button"
                  onClick={onOpenStreakCelebration}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Ver Animación 🔥
                </button>
                <button
                  type="button"
                  onClick={handleBuyStreakFreeze}
                  className="px-3 py-1.5 rounded-xl bg-white text-orange-700 hover:bg-orange-50 text-xs font-black shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Diamond className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
                  <span>+1 Protector (50💎)</span>
                </button>
              </div>
            </div>

            {purchaseSuccess && (
              <p className="text-xs font-bold text-emerald-600 text-center animate-bounce">{purchaseSuccess}</p>
            )}

            {/* Daily Notification toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-emerald-500" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Recordatorios Diarios
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Aviso antes de que termine el día para no perder tu racha
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hora de Recordatorio Diario
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-500">Horario de México</span>
              </div>
            </div>

            {/* Test Notification Preview */}
            <button
              type="button"
              onClick={handleSendTestNotification}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-emerald-500" />
              <span>{testSent ? '¡Notificación simulada enviada!' : 'Probar Notificación de Alerta'}</span>
            </button>
          </div>
        )}

        {/* Save and Close Actions */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
          >
            Guardar Configuración
          </button>
        </div>

      </div>
    </div>
  </div>
  );
};
