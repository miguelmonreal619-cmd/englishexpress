import { UserProfile, DiagnosticResult, Discipline, DiagnosticDiscipline, CEFRLevel, SubLevel, DisciplineAllocation } from '../types';

const STORAGE_KEY = 'norteno_english_profile_v1';
const DIAGNOSTIC_KEY = 'norteno_english_diagnostic_v1';
const SESSION_PROGRESS_PREFIX = 'norteno_session_progress_';

export const DEFAULT_ALLOCATION: DisciplineAllocation = {
  writing: 10,
  speaking: 10,
  listening: 10,
  reading: 10,
  total: 40,
  reasoning: 'Distribución equilibrada estándar de 10 ejercicios por disciplina.'
};

export const INITIAL_PROFILE: UserProfile = {
  id: 'user_default',
  name: 'Estudiante',
  email: '',
  registered: false,
  hasCompletedDiagnostic: false,
  globalLevel: 'A1',
  currentSubLevel: 'A1.0',
  disciplineScores: {
    writing: 50,
    speaking: 50,
    listening: 50,
    reading: 50
  },
  disciplineLevels: {
    writing: 'A1.0',
    speaking: 'A1.0',
    listening: 'A1.0',
    reading: 'A1.0'
  },
  allocation: DEFAULT_ALLOCATION,
  streak: {
    count: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    longestStreak: 1,
    frozenToday: false,
    freezeCount: 2
  },
  xp: 0,
  gems: 100,
  completedSessions: [],
  completedMilestoneExams: [],
  dailyGoalMinutes: 15,
  todayMinutesPracticed: 0,
  dailyGoalCompletedToday: false,
  isDarkMode: false,
  notificationsEnabled: true,
  reminderTime: '20:00'
};

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_PROFILE, ...parsed };
  } catch (e) {
    console.error('Error loading profile', e);
    return INITIAL_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function loadDiagnosticResult(): DiagnosticResult | null {
  try {
    const raw = localStorage.getItem(DIAGNOSTIC_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveDiagnosticResult(result: DiagnosticResult): void {
  try {
    localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(result));
  } catch (e) {
    console.error('Error saving diagnostic', e);
  }
}

// ==========================================
// PERSISTENCIA DE PROGRESO PARCIAL EN SESIONES
// ==========================================

export function saveSessionProgress(subLevelId: string, exerciseIndex: number): void {
  try {
    localStorage.setItem(`${SESSION_PROGRESS_PREFIX}${subLevelId}`, JSON.stringify({
      exerciseIndex,
      updatedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Error saving session progress', e);
  }
}

export function loadSessionProgress(subLevelId: string): number {
  try {
    const raw = localStorage.getItem(`${SESSION_PROGRESS_PREFIX}${subLevelId}`);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return typeof parsed.exerciseIndex === 'number' ? parsed.exerciseIndex : 0;
  } catch (e) {
    return 0;
  }
}

export function clearSessionProgress(subLevelId: string): void {
  try {
    localStorage.removeItem(`${SESSION_PROGRESS_PREFIX}${subLevelId}`);
  } catch (e) {
    console.error('Error clearing session progress', e);
  }
}

/**
 * Borra todos los datos locales del usuario y reinicia la app (Cerrar Sesión)
 */
export function clearAllLocalStorageData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DIAGNOSTIC_KEY);
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(SESSION_PROGRESS_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error('Error clearing local storage', e);
  }
}

/**
 * Calculates CEFR level from score (0-100)
 */
export function scoreToCEFRLevel(score: number): CEFRLevel {
  if (score >= 90) return 'C2';
  if (score >= 80) return 'C1';
  if (score >= 65) return 'B2';
  if (score >= 50) return 'B1';
  if (score >= 30) return 'A2';
  return 'A1';
}

/**
 * Calculates SubLevel (A1.0 to C2.9) from percentage score (0-100)
 */
export function scoreToSubLevel(score: number): SubLevel {
  if (score >= 90) {
    const frac = Math.min(9, Math.floor(((score - 90) / 10) * 10));
    return `C2.${frac}` as SubLevel;
  } else if (score >= 80) {
    const frac = Math.min(9, Math.floor(((score - 80) / 10) * 10));
    return `C1.${frac}` as SubLevel;
  } else if (score >= 65) {
    const frac = Math.min(9, Math.floor(((score - 65) / 15) * 10));
    return `B2.${frac}` as SubLevel;
  } else if (score >= 50) {
    const frac = Math.min(9, Math.floor(((score - 50) / 15) * 10));
    return `B1.${frac}` as SubLevel;
  } else if (score >= 30) {
    const frac = Math.min(9, Math.floor(((score - 30) / 20) * 10));
    return `A2.${frac}` as SubLevel;
  } else {
    const frac = Math.min(9, Math.floor((score / 30) * 10));
    return `A1.${frac}` as SubLevel;
  }
}

/**
 * Dynamically computes exercise distribution out of 40 exercises for a session
 */
export function calculateAdaptiveAllocation(scores: {
  writing: number;
  speaking: number;
  listening: number;
  reading: number;
}): DisciplineAllocation {
  const disciplines: DiagnosticDiscipline[] = ['writing', 'speaking', 'listening', 'reading'];
  
  const deficits = disciplines.map(d => ({
    discipline: d,
    score: scores[d],
    deficit: Math.max(15, 100 - scores[d])
  }));

  const totalDeficit = deficits.reduce((sum, item) => sum + item.deficit, 0);

  const rawAllocations: Record<DiagnosticDiscipline, number> = {
    writing: 0,
    speaking: 0,
    listening: 0,
    reading: 0
  };

  let allocatedSum = 0;
  deficits.forEach(item => {
    const count = Math.max(5, Math.round((item.deficit / totalDeficit) * 40));
    rawAllocations[item.discipline] = count;
    allocatedSum += count;
  });

  const diff = 40 - allocatedSum;
  if (diff !== 0) {
    const sorted = [...deficits].sort((a, b) => b.deficit - a.deficit);
    rawAllocations[sorted[0].discipline] += diff;
  }

  const weakest = [...deficits].sort((a, b) => a.score - b.score)[0];
  const strongest = [...deficits].sort((a, b) => b.score - a.score)[0];

  const discNames: Record<DiagnosticDiscipline, string> = {
    writing: 'Writing (Escritura)',
    speaking: 'Speaking (Habla y Pronunciación)',
    listening: 'Listening (Comprensión Auditiva)',
    reading: 'Reading (Comprensión Lectora)'
  };

  const reasoning = weakest.score === strongest.score
    ? 'Distribución equilibrada: 10 ejercicios para cada una de las 4 disciplinas.'
    : `La IA detectó que tu disciplina con mayor área de oportunidad es ${discNames[weakest.discipline]} (${weakest.score}%). Se han asignado ${rawAllocations[weakest.discipline]} ejercicios de esta habilidad para nivelarla rápidamente con tu ${discNames[strongest.discipline]} (${strongest.score}%).`;

  return {
    writing: rawAllocations.writing,
    speaking: rawAllocations.speaking,
    listening: rawAllocations.listening,
    reading: rawAllocations.reading,
    total: 40,
    reasoning
  };
}

/**
 * Streak check & update logic
 */
export function checkAndUpdateDailyStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = profile.streak.lastActiveDate;

  if (lastActive === today) {
    return profile;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newCount = profile.streak.count;
  let newFrozen = false;

  if (lastActive === yesterday) {
    newCount += 1;
  } else {
    if (profile.streak.freezeCount > 0 && !profile.streak.frozenToday) {
      newFrozen = true;
      profile.streak.freezeCount -= 1;
    } else {
      newCount = 1;
    }
  }

  const updated: UserProfile = {
    ...profile,
    streak: {
      ...profile.streak,
      count: newCount,
      lastActiveDate: today,
      longestStreak: Math.max(profile.streak.longestStreak, newCount),
      frozenToday: newFrozen
    },
    todayMinutesPracticed: 0,
    dailyGoalCompletedToday: false
  };

  saveUserProfile(updated);
  return updated;
}
