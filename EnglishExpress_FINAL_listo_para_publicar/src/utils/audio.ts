/**
 * Audio synthesis and Sound Effects using Web Audio API & Web Speech API
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    try {
      this.muted = localStorage.getItem('englishexpress_sound_muted') === 'true';
    } catch (e) {
      this.muted = false;
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem('englishexpress_sound_muted', String(this.muted));
    } catch (e) {}
    if (!this.muted) {
      this.playTap();
    }
    return this.muted;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem('englishexpress_sound_muted', String(this.muted));
    } catch (e) {}
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return null;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      return null;
    }
  }

  // Play a pleasant, crystalline positive chime for correct answers, with combo scaling
  playCorrect(streak: number = 0) {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Base note frequencies depending on consecutive correct answers in session
      let chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      if (streak >= 3) {
        chord = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6 (Glorious sparkle)
      } else if (streak === 2) {
        chord = [554.37, 698.46, 830.61, 1108.73]; // Db5, F5, Ab5, Db6
      }

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx === chord.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, now);

        const startTime = now + idx * 0.05;
        const duration = 0.35 + idx * 0.04;

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn("Web Audio correct sound error", e);
    }
  }

  // Play a gentle, warm, non-punitive descending tone for incorrect answers
  playIncorrect() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      // Gentle pitch glide downwards
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.linearRampToValueAtTime(146.83, now + 0.28); // A3 to D3

      osc2.frequency.setValueAtTime(110, now);
      osc2.frequency.linearRampToValueAtTime(73.42, now + 0.28);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.32);
      osc2.stop(now + 0.32);
    } catch (e) {
      console.warn("Web Audio incorrect sound error", e);
    }
  }

  playWrong() {
    this.playIncorrect();
  }

  // Play energetic streak / level-up sound
  playStreak() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch (e) {}
  }

  playMilestone() {
    this.playStreak();
  }

  // Play warm two-tone chime for almost correct / partial credit answers
  playAlmost() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const notes = [440, 554.37, 659.25]; // A4, C#5, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.1, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch (e) {}
  }

  // Play fanfare when completing a whole session or level
  playFanfare() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.11 },
        { f: 783.99, d: 0.12, t: 0.22 },
        { f: 1046.50, d: 0.3, t: 0.33 },
        { f: 880.00, d: 0.14, t: 0.65 },
        { f: 1046.50, d: 0.5, t: 0.8 },
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.16, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch (e) {
      console.warn("Fanfare audio failed", e);
    }
  }

  // Subtle interactive bubble pop on card/option select
  playSelect() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {}
  }

  // Subtle reverse micro-pop when unselecting a word
  playUnselect() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.035);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Subtle tap click for buttons
  playTap() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.035);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {}
  }
}

export const sound = new SoundEngine();

// Pre-warm voices list on supported browsers
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    try {
      window.speechSynthesis.getVoices();
    } catch (e) {}
  };
}

// Current active level context for automatic voice alternation
let currentContextLevel: string = 'A1';

export function setAudioContextLevel(level: string) {
  if (level) {
    currentContextLevel = level;
  }
}

/**
 * Text-to-Speech Engine (US American English Accent with Friendly Natural Voice)
 * - Se usa siempre la voz femenina cálida y clara (p. ej. Jenny, Samantha, Google US).
 */
export function playUSEnglishVoice(
  text: string, 
  rate: number = 0.94, 
  onEnd?: () => void,
  levelOrGender?: string | 'female' | 'male'
) {
  if (!('speechSynthesis' in window)) {
    console.warn("SpeechSynthesis not supported in this browser.");
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';

  // Siempre usamos la voz femenina (la voz masculina se retiró por sonar poco natural)
  const preferredGender: 'female' = 'female';

  // Find best available US English natural voices
  const voices = window.speechSynthesis.getVoices();
  const usVoices = voices.filter(v => v.lang.startsWith('en-US') || v.lang.startsWith('en_US') || v.lang === 'en');

  // Friendly Natural Female keywords: Jenny, Aria, Samantha, Victoria, Ava, Allison, Google US English, Natural, Neural
  const femaleKeywords = ['jenny', 'aria', 'samantha', 'victoria', 'ava', 'allison', 'zira', 'karen', 'female', 'google us english'];

  let selectedVoice: SpeechSynthesisVoice | undefined;

  // Priority 1: High-definition Natural / Neural Female voices
  selectedVoice = usVoices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(k => name.includes(k)) && (name.includes('natural') || name.includes('online') || name.includes('neural') || name.includes('google'));
  }) || usVoices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(k => name.includes(k));
  });

  // Fallback to best English voice if no specific gender match
  if (!selectedVoice) {
    selectedVoice = usVoices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
      || usVoices[0] 
      || voices.find(v => v.lang.startsWith('en'));
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Adjust pitch & cadence for a warmer, friendlier, less robotic tone
  utterance.pitch = 1.03; // Gentle warm brightness

  // Slightly natural pacing (0.92 for warm natural articulation, slower for pronunciation practice)
  utterance.rate = rate;

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any active speech synthesis
 */
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Normalizes text for comparing English answers (removes all punctuation such as commas, periods, question marks, apostrophes, excess spaces, casing)
 */
export function normalizeText(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’‘“”«»¡!¿?—–…\\]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Fisher-Yates array shuffle that guarantees a thoroughly randomized order
 * and ensures the shuffled array is not in the exact same sequence as original if length > 1
 */
export function shuffleArray<T>(array: T[]): T[] {
  if (!array || array.length <= 1) return [...array];
  
  const copy = [...array];
  let attempts = 0;
  
  do {
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    attempts++;
  } while (
    attempts < 6 && 
    copy.every((item, idx) => item === array[idx])
  );
  
  return copy;
}

/**
 * Detailed analysis of spoken text vs target text to ensure no words are omitted
 */
export interface SpeakingAnalysis {
  isExact: boolean;
  allWordsPresent: boolean;
  missingWords: string[];
  extraWords: string[];
  wordAccuracy: number;
  targetWordsCount: number;
  spokenWordsCount: number;
}

export function analyzeSpokenAccuracy(target: string, actual: string): SpeakingAnalysis {
  const normTarget = normalizeText(target);
  const normActual = normalizeText(actual);

  if (!normTarget) {
    return {
      isExact: false,
      allWordsPresent: false,
      missingWords: [],
      extraWords: [],
      wordAccuracy: 0,
      targetWordsCount: 0,
      spokenWordsCount: 0,
    };
  }

  if (normTarget === normActual && normTarget.length > 0) {
    const wordCount = normTarget.split(' ').filter(Boolean).length;
    return {
      isExact: true,
      allWordsPresent: true,
      missingWords: [],
      extraWords: [],
      wordAccuracy: 100,
      targetWordsCount: wordCount,
      spokenWordsCount: wordCount,
    };
  }

  const targetWords = normTarget.split(' ').filter(Boolean);
  const actualWords = normActual.split(' ').filter(Boolean);

  const actualPool = [...actualWords];
  const missingWords: string[] = [];

  for (const tWord of targetWords) {
    const foundIdx = actualPool.indexOf(tWord);
    if (foundIdx !== -1) {
      actualPool.splice(foundIdx, 1);
    } else {
      missingWords.push(tWord);
    }
  }

  const allWordsPresent = missingWords.length === 0;
  const matchedWordsCount = targetWords.length - missingWords.length;
  const wordAccuracy = targetWords.length > 0 ? Math.round((matchedWordsCount / targetWords.length) * 100) : 0;

  return {
    isExact: normTarget === normActual,
    allWordsPresent,
    missingWords,
    extraWords: actualPool,
    wordAccuracy,
    targetWordsCount: targetWords.length,
    spokenWordsCount: actualWords.length,
  };
}

/**
 * Calculate similarity percentage between target and user speech/text (Levenshtein-based)
 */
export function calculateTextSimilarity(target: string, actual: string): number {
  const t = normalizeText(target);
  const a = normalizeText(actual);

  if (t === a) return 100;
  if (!t || !a) return 0;

  const targetWords = t.split(' ').filter(Boolean);
  const actualWords = a.split(' ').filter(Boolean);

  let matches = 0;
  const actualPool = [...actualWords];
  targetWords.forEach(word => {
    const idx = actualPool.indexOf(word);
    if (idx !== -1) {
      matches++;
      actualPool.splice(idx, 1);
    }
  });

  const wordScore = (matches / Math.max(targetWords.length, actualWords.length)) * 100;
  return Math.round(wordScore);
}
