import { Exercise, Discipline, SubLevel, CEFRLevel, VocabPair } from '../types';
import { getSubLevelTheme, ThematicSessionPlan } from './thematicCurriculum';

export const THEMATIC_EXERCISES_DATABASE: Record<string, Exercise[]> = {};

export function generateThematicExercises(
  tier: CEFRLevel,
  subLevel: SubLevel,
  sessionNum: number,
  allocation: { writing: number; speaking: number; listening: number; reading: number; vocabulary?: number; grammar?: number },
  count: number = 10
): Exercise[] {
  const themeData = getSubLevelTheme(subLevel);
  const sessionPlan = themeData.sessions.find(s => s.sessionNumber === sessionNum) || themeData.sessions[0];
  const sessionKey = `${subLevel}_${sessionNum}`;

  const directBank = THEMATIC_EXERCISES_DATABASE[sessionKey];
  if (directBank && directBank.length >= 5) {
    return directBank;
  }

  const vocabWords = sessionPlan.vocabFocus.split(',').map(s => s.trim()).filter(Boolean);
  const v1 = vocabWords[0] || sessionPlan.topic;
  const v2 = vocabWords[1] || 'toast';
  const v3 = vocabWords[2] || 'coffee';
  const v4 = vocabWords[3] || 'juice';

  const cleanVocabPool = [v1, v2, v3, v4, 'water', 'bread', 'milk', 'fruit', 'coffee', 'tea', 'pancakes', 'eggs', 'bacon'];

  const getCleanOptions = (target: string) => {
    const others = cleanVocabPool.filter(w => w.toLowerCase() !== target.toLowerCase());
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
  };

  const translationMap: Record<string, string> = {
    'pancakes': 'hotcakes / panqueques',
    'eggs': 'huevos',
    'bacon': 'tocino',
    'coffee': 'café',
    'toast': 'pan tostado',
    'juice': 'jugo',
    'water': 'agua',
    'bread': 'pan',
    'milk': 'leche',
    'fruit': 'fruta',
    'tea': 'té',
    'sugar': 'azúcar',
    'Hello': 'Hola',
    'Good morning': 'Buenos días',
    'Goodbye': 'Adiós',
    'Thank you': 'Gracias'
  };

  const getSpanishLabel = (word: string) => {
    return translationMap[word] || translationMap[word.toLowerCase()] || word;
  };

  const vocabExercises: Exercise[] = [
    {
      id: `dyn_${subLevel}_s${sessionNum}_v1_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cómo se dice en inglés "${getSpanishLabel(v1)}"?`,
      targetText: v1,
      correctOption: v1,
      audioText: v1,
      phoneticGuide: `Pronunciación guiada en inglés estadounidense`,
      options: getCleanOptions(v1),
      acceptableAnswers: [v1, v1.toLowerCase()],
      mexicanTip: `Contexto en EE.UU.: ${sessionPlan.culturalNote}`,
      explanation: `Término fundamental para: ${sessionPlan.realLifeContext}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v2_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cómo se dice en inglés "${getSpanishLabel(v2)}"?`,
      targetText: v2,
      correctOption: v2,
      audioText: v2,
      options: getCleanOptions(v2),
      acceptableAnswers: [v2, v2.toLowerCase()],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Vocabulario clave de la sesión: ${v2}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v3_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_association',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cómo se dice en inglés "${getSpanishLabel(v3)}"?`,
      targetText: v3,
      correctOption: v3,
      audioText: v3,
      options: getCleanOptions(v3),
      acceptableAnswers: [v3, v3.toLowerCase()],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Aplicación práctica: ${v3}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v4_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cómo se dice en inglés "${getSpanishLabel(v4)}"?`,
      targetText: v4,
      correctOption: v4,
      audioText: v4,
      options: getCleanOptions(v4),
      acceptableAnswers: [v4, v4.toLowerCase()],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Palabra imprescindible de la unidad.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v5_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_match',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Mini Juego de Vocabulario: Conecta las palabras clave de la sesión "${sessionPlan.title}"`,
      targetText: `${v1}, ${v2}, ${v3}, ${v4}`,
      vocabPairs: [
        { id: 'p1', english: v1, spanish: getSpanishLabel(v1) },
        { id: 'p2', english: v2, spanish: getSpanishLabel(v2) },
        { id: 'p3', english: v3, spanish: getSpanishLabel(v3) },
        { id: 'p4', english: v4, spanish: getSpanishLabel(v4) }
      ],
      mexicanTip: `Aprender vocabulario por bloques temáticos acelera la fluidez.`,
      explanation: `Integración del vocabulario de la sesión.`
    }
  ];

  const grammarExercises: Exercise[] = [
    {
      id: `dyn_${subLevel}_s${sessionNum}_g1_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_rule_builder',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Regla Gramatical: Enfoque en "${sessionPlan.grammarFocus}". Selecciona la estructura correcta:`,
      ruleFormula: `Estructura clave: ${sessionPlan.grammarFocus}`,
      targetText: `We use ${sessionPlan.grammarFocus} correctly.`,
      correctOption: `We use ${sessionPlan.grammarFocus} correctly.`,
      audioText: `We use ${sessionPlan.grammarFocus} correctly.`,
      options: [
        `We use ${sessionPlan.grammarFocus} correctly.`,
        `We uses ${sessionPlan.grammarFocus} incorrect.`,
        `Using ${sessionPlan.grammarFocus} structure wrong.`,
        `Incorrect grammar form for ${sessionPlan.grammarFocus}`
      ],
      mexicanTip: `Estructura clave validada para el nivel.`,
      explanation: `Estructura central: ${sessionPlan.grammarFocus}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g2_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_fill_blank',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Aplica la regla de ${sessionPlan.grammarFocus}: Completa con la opción correcta.`,
      ruleFormula: `[Patrón: ${sessionPlan.grammarFocus}]`,
      targetText: v1,
      correctOption: v1,
      options: [v1, 'is', 'are', 'do'],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Aplicación directa de gramática.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g3_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_choice',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cuál de las siguientes oraciones aplica correctamente ${sessionPlan.grammarFocus}?`,
      targetText: `This sentence is grammatically correct using ${sessionPlan.grammarFocus}.`,
      correctOption: `This sentence is grammatically correct using ${sessionPlan.grammarFocus}.`,
      options: [
        `This sentence is grammatically correct using ${sessionPlan.grammarFocus}.`,
        `This sentence are incorrect with ${sessionPlan.grammarFocus}.`,
        `Incorrect structure without ${sessionPlan.grammarFocus}.`,
        `Wrong grammar pattern application.`
      ],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Validación de regla gramatical.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g4_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_order',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Ordena los bloques para formar la oración correcta:`,
      targetText: `We practice ${v1} today.`,
      options: ['We', 'practice', `${v1}`, 'today.'],
      mexicanTip: `Sujeto + Verbo + Complemento.`,
      explanation: `Orden sintáctico estándar.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g5_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_choice',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Decisión Gramatical: ¿Cómo estructurarías una oración usando ${sessionPlan.grammarFocus}?`,
      targetText: `Yes, we apply ${sessionPlan.grammarFocus} properly.`,
      correctOption: `Yes, we apply ${sessionPlan.grammarFocus} properly.`,
      audioText: `Yes, we apply ${sessionPlan.grammarFocus} properly.`,
      options: [
        `Yes, we apply ${sessionPlan.grammarFocus} properly.`,
        'No structure applied correctly',
        'Wrong grammatical agreement',
        'Invalid sentence construction'
      ],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Consolidación gramatical.`
    }
  ];

  const readingExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_r1_${Date.now()}`,
    discipline: 'reading',
    type: 'reading_comprehension',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    passage: `Context Note (${themeData.unitTitle} - ${sessionPlan.title}): "When talking about ${sessionPlan.topic}, knowing terms like ${v1} and ${v2} helps you communicate naturally in situations such as ${sessionPlan.realLifeContext}."`,
    prompt: `¿Cuál es el beneficio de conocer términos como ${v1} según el texto?`,
    targetText: `Ayuda a comunicarse de forma natural en situaciones como ${sessionPlan.realLifeContext}`,
    correctOption: `Ayuda a comunicarse de forma natural en situaciones como ${sessionPlan.realLifeContext}`,
    options: [
      `Ayuda a comunicarse de forma natural en situaciones como ${sessionPlan.realLifeContext}`,
      'Solo es útil para exámenes escritos teóricos',
      'No tiene ninguna aplicación en la vida real',
      'Impide comprender conversaciones cotidianas'
    ],
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Comprensión de lectura aplicada.`
  };

  const writingExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_w1_${Date.now()}`,
    discipline: 'writing',
    type: 'writing_reorder',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Construcción Escrita: Ordena las palabras para formar una idea clara:`,
    targetText: `I want to order ${v1} please.`,
    options: ['I', 'want', 'to', 'order', `${v1}`, 'please.'],
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Práctica de redacción aplicada.`
  };

  const listeningExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_l1_${Date.now()}`,
    discipline: 'listening',
    type: 'listening_select',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Escucha el audio relacionado con ${sessionPlan.topic} y selecciona la respuesta:`,
    audioText: `I would like some ${v1} and ${v2} please.`,
    targetText: `Pedir ${v1} y ${v2} de forma educada`,
    correctOption: `Pedir ${v1} y ${v2} de forma educada`,
    options: [
      `Pedir ${v1} y ${v2} de forma educada`,
      'Cancelar el pedido por completo',
      'Rechazar la comida ofrecida',
      'Preguntar por la cuenta de la luz'
    ],
    mexicanTip: `Usa "I would like" para pedir alimentos con cortesía.`,
    explanation: `Comprensión auditiva contextual.`
  };

  const speakingExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_s1_${Date.now()}`,
    discipline: 'speaking',
    type: 'speaking_pronounce',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Pronuncia con claridad la siguiente frase relacionada con alimentos y pedidos:`,
    audioText: `Can I have some ${v1} please?`,
    targetText: `Can I have some ${v1} please?`,
    phoneticGuide: `Kán ai háv sam ${v1} plís?`,
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Práctica oral para fluidez en restaurantes y tiendas.`
  };

  return [
    ...vocabExercises,
    ...grammarExercises,
    readingExercise,
    writingExercise,
    listeningExercise,
    speakingExercise
  ];
}
