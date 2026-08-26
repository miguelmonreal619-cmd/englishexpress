import React, { useState } from 'react';
import { Settings, LogOut, Bell, Moon, Sun, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  profile: UserProfile;
  activeTab?: string;
  onSelectTab?: (tab: any) => void;
  onOpenLibrary?: () => void;
  onOpenVocabGame?: () => void;
  onOpenMemoryGame?: () => void;
  onOpenNotifications: () => void;
  onOpenStreakCelebration?: () => void;
  onRetakeDiagnostic?: () => void;
  onToggleDarkMode?: () => void;
  onChangeTheme?: (th: string) => void;
  onLogout: () => void; // Prop estrictamente requerida para cerrar sesión
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenNotifications,
  onLogout
}) => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    sound.playTap();
    setShowSettingsMenu(false);
    setShowLogoutConfirm(true);
  };

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black flex items-center justify-center shadow-lg shadow-blue-500/20 text-lg">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white tracking-tight">EnglishExpress</h1>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-800 text-slate-300 border border-slate-700">
                US ⇄ MX
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              English (US) → Español (MX) • MCER {profile.globalLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
            <span className="text-sm">🔥</span>
            <span>{profile.streak.count} Días</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <span className="text-sm">💎</span>
            <span>{profile.gems}</span>
          </div>

          <button
            type="button"
            onClick={onOpenNotifications}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {showSettingsMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-white truncate">{profile.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{profile.email || 'Estudiante activo'}</p>
                </div>

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white mb-2">
              ¿Cerrar sesión?
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Tu progreso y tus lecciones se mantendrán guardados en este dispositivo.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
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
    </header>
  );
};
