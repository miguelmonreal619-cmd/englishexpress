export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type SubLevel =
  | 'A1.0' | 'A1.1' | 'A1.2' | 'A1.3' | 'A1.4' | 'A1.5' | 'A1.6' | 'A1.7' | 'A1.8' | 'A1.9'
  | 'A2.0' | 'A2.1' | 'A2.2' | 'A2.3' | 'A2.4' | 'A2.5' | 'A2.6' | 'A2.7' | 'A2.8' | 'A2.9'
  | 'B1.0' | 'B1.1' | 'B1.2' | 'B1.3' | 'B1.4' | 'B1.5' | 'B1.6' | 'B1.7' | 'B1.8' | 'B1.9'
  | 'B2.0' | 'B2.1' | 'B2.2' | 'B2.3' | 'B2.4' | 'B2.5' | 'B2.6' | 'B2.7' | 'B2.8' | 'B2.9'
  | 'C1.0' | 'C1.1' | 'C1.2' | 'C1.3' | 'C1.4' | 'C1.5' | 'C1.6' | 'C1.7' | 'C1.8' | 'C1.9'
  | 'C2.0' | 'C2.1' | 'C2.2' | 'C2.3' | 'C2.4' | 'C2.5' | 'C2.6' | 'C2.7' | 'C2.8' | 'C2.9';

export type Discipline = 'vocabulary' | 'grammar' | 'reading' | 'writing' | 'listening' | 'speaking';
export type DiagnosticDiscipline = 'writing' | 'speaking' | 'listening' | 'reading';

export type ExerciseType =
  | 'vocab_flashcard'
  | 'vocab_match'
  | 'vocab_select_translation'
  | 'vocab_association'
  | 'grammar_rule_builder'
  | 'grammar_choice'
  | 'grammar_fill_blank'
  | 'grammar_order'
  | 'reading_comprehension'
  | 'reading_vocab_context'
  | 'writing_translate'
  | 'writing_fill_blank'
  | 'writing_reorder'
  | 'listening_select'
  | 'listening_dictation'
  | 'listening_comprehension'
  | 'speaking_pronounce'
  | 'speaking_repeat_sentence'
  | 'speaking_open_question'
  | 'speaking_idea_construction';

export type AppTheme = 'emerald' | 'indigo' | 'amber' | 'obsidian';

export interface VocabPair {
  id: string;
  english: string;
  spanish: string;
  phonetic?: string;
  contextUsage?: string;
  audioText?: string;
}

export interface GrammarRuleItem {
  id: string;
  title: string;
  ruleFormula: string;
  explanation: string;
  mexicanComparison?: string;
  examples: { english: string; spanish: string; phonetic?: string }[];
}

export interface Exercise {
  id: string;
  discipline: Discipline;
  type: ExerciseType;
  level: CEFRLevel;
  subLevel?: SubLevel;
  prompt: string; // Spanish instruction/context
  instruction?: string; // Additional detailed instruction or open-ended question
  audioText?: string; // English text for listening/speaking
  targetText: string; // The correct answer or target speech
  correctOption?: string; // Expected option when options differ from targetText (e.g. Spanish translation in flashcards)
  spanishTranslation?: string; // Spanish translation helper
  options?: string[]; // Multiple choice options or draggable word bank
  passage?: string; // For reading comprehension passages
  mexicanTip?: string; // Cultural/idiomatic comparison between US and Mexico
  phoneticGuide?: string; // Approximated phonetics for Mexican speakers (e.g. "guá-rer" for water)
  explanation?: string; // Grammar or context breakdown
  acceptableAnswers?: string[]; // Alternative valid answers
  thematicUnit?: string; // e.g. "Greetings & Names"
  sessionTheme?: string; // e.g. "Personal Pronouns & Verb To Be"
  grammarFocus?: string; // e.g. "Subject Pronouns (I, You, He, She)"
  vocabFocus?: string; // e.g. "Nationalities, Professions, Names"
  realLifeContext?: string; // e.g. "Conocer a compañeros de trabajo en EE.UU."
  ruleFormula?: string; // For grammar rule builders (e.g. "[Sujeto] + [am/is/are] + [Complemento]")
  vocabPairs?: VocabPair[]; // For mini vocab matching games within an exercise
}

export interface DisciplineBreakdown {
  vocabulary?: number;
  grammar?: number;
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
  writingLevel: SubLevel;
  speakingLevel: SubLevel;
  listeningLevel: SubLevel;
  readingLevel: SubLevel;
}

export interface DisciplineAllocation {
  vocabulary?: number;
  grammar?: number;
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
  total: number;
  reasoning: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  registered: boolean;
  hasCompletedDiagnostic: boolean;
  globalLevel: CEFRLevel;
  currentSubLevel: SubLevel;
  disciplineScores: {
    vocabulary?: number;
    grammar?: number;
    reading: number;
    writing: number;
    listening: number;
    speaking: number;
  };
  disciplineLevels: {
    vocabulary?: SubLevel;
    grammar?: SubLevel;
    reading: SubLevel;
    writing: SubLevel;
    listening: SubLevel;
    speaking: SubLevel;
  };
  allocation: DisciplineAllocation;
  streak: {
    count: number;
    lastActiveDate: string;
    longestStreak: number;
    frozenToday: boolean;
    freezeCount: number;
  };
  xp: number;
  gems: number;
  completedSessions: string[]; // List of session ids (e.g. "A1.0_s1", "A1.0_s2")
  completedMilestoneExams: CEFRLevel[]; // e.g. ['A1'] unlocked A2
  dailyGoalMinutes: number;
  todayMinutesPracticed: number;
  dailyGoalCompletedToday?: boolean;
  isDarkMode?: boolean;
  notificationsEnabled: boolean;
  reminderTime: string; // "09:00"
  theme?: AppTheme;
}

export interface DiagnosticResult {
  completedAt: string;
  globalScore: number;
  globalLevel: CEFRLevel;
  initialSubLevel: SubLevel;
  disciplineScores: {
    writing: number;
    speaking: number;
    listening: number;
    reading: number;
  };
  disciplineLevels: {
    writing: SubLevel;
    speaking: SubLevel;
    listening: SubLevel;
    reading: SubLevel;
  };
  weakestDiscipline: Discipline;
  strongestDiscipline: Discipline;
  allocation: DisciplineAllocation;
  aiRoadmap?: {
    executiveSummary: string;
    personalizedTips: string[];
    motivationalMessage: string;
  };
}

export interface SessionMeta {
  id: string;
  subLevel: SubLevel;
  sessionNumber: number; // 1 to 8
  title: string;
  description: string;
  topic: string;
  iconName: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  thematicUnit?: string;
  unitNumber?: number;
  grammarFocus?: string;
  vocabFocus?: string;
  realLifeContext?: string;
  culturalNote?: string;
  americanBookModule?: string;
}

export interface LevelTier {
  level: CEFRLevel;
  title: string;
  description: string;
  color: string;
  accentBg: string;
  subLevels: {
    subLevel: SubLevel;
    sessionsCount: number;
    description: string;
  }[];
  milestoneExam: {
    id: string;
    title: string;
    description: string;
    minPassScore: number;
  };
}

export interface IdiomComparison {
  id: string;
  usPhrase: string;
  mexicanEquivalent: string;
  literalTranslation: string;
  contextUsage: string;
  audioText: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface VocabGameWord {
  id: string;
  english: string;
  phonetic?: string;
  spanish: string;
  alternateMeanings?: string[];
  distractors: string[];
  options: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface VocabGameStats {
  gamesPlayed: number;
  bestScore: number;
  perfectGamesCount: number;
  totalWordsGuessed: number;
  recentWordIds: string[];
}

export interface LibraryParagraph {
  en: string;
  es: string;
}

export interface LibraryVocab {
  word: string;
  phonetic?: string;
  meaning: string;
  context: string;
}

export interface LibraryQuestion {
  id: string;
  question: string;
  questionEs?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LibraryStory {
  id: string;
  title: string;
  titleEs: string;
  author: string;
  source: string;
  level: CEFRLevel;
  category: 'fable' | 'classic' | 'moral' | 'folklore';
  readTimeMinutes: number;
  wordCount: number;
  coverEmoji: string;
  summary: string;
  summaryEs: string;
  moral?: {
    en: string;
    es: string;
  };
  paragraphs: LibraryParagraph[];
  vocabulary: LibraryVocab[];
  questions: LibraryQuestion[];
  xpReward: number;
  gemsReward: number;
}
