import { Exercise, Discipline, SubLevel, CEFRLevel, VocabPair } from '../types';
import { getSubLevelTheme, ThematicSessionPlan } from './thematicCurriculum';

export const THEMATIC_EXERCISES_DATABASE: Record<string, Exercise[]> = {
  'A1.0_1': [
    {
      id: 'a1_0_s1_v1',
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Tarjeta de Vocabulario: Aprende el saludo básico',
      targetText: 'Hello',
      correctOption: 'Hello',
      spanishTranslation: 'Hola',
      audioText: 'Hello',
      phoneticGuide: 'Jelóu',
      options: ['Hello', 'Goodbye', 'Please', 'Thanks'],
      acceptableAnswers: ['Hello', 'hello'],
      mexicanTip: '"Hello" es el saludo estándar en EE.UU.',
      explanation: '"Hello" significa "Hola".'
    },
    {
      id: 'a1_0_s1_v2',
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Tarjeta de Vocabulario: Saludo matutino',
      targetText: 'Good morning',
      correctOption: 'Good morning',
      spanishTranslation: 'Buenos días',
      audioText: 'Good morning',
      phoneticGuide: 'Gud mór-ning',
      options: ['Good morning', 'Good night', 'Goodbye', 'Hello'],
      acceptableAnswers: ['Good morning', 'good morning'],
      mexicanTip: 'Se usa desde la mañana hasta las 12:00 PM.',
      explanation: '"Good morning" significa "Buenos días".'
    },
    {
      id: 'a1_0_s1_v3',
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: '¿Cómo te despides diciendo "Adiós" en inglés?',
      targetText: 'Goodbye',
      correctOption: 'Goodbye',
      audioText: 'Goodbye',
      phoneticGuide: 'Gud-bái',
      options: ['Goodbye', 'Hello', 'Please', 'Good morning'],
      acceptableAnswers: ['Goodbye', 'goodbye', 'Bye', 'bye'],
      mexicanTip: 'De forma casual puedes decir simplemente "Bye!".',
      explanation: '"Goodbye" significa "Adiós".'
    },
    {
      id: 'a1_0_s1_v4',
      discipline: 'vocabulary',
      type: 'vocab_association',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: '¿Qué palabra usas para decir "Gracias"?',
      targetText: 'Thank you',
      correctOption: 'Thank you',
      audioText: 'Thank you',
      phoneticGuide: 'Zank iu',
      options: ['Thank you', 'Please', 'Hello', 'Goodbye'],
      acceptableAnswers: ['Thank you', 'thank you', 'Thanks', 'thanks'],
      mexicanTip: 'Pon la lengua entre los dientes al pronunciar "Th".',
      explanation: '"Thank you" significa "Gracias".'
    },
    {
      id: 'a1_0_s1_v5',
      discipline: 'vocabulary',
      type: 'vocab_match',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Empareja cada saludo en inglés con su significado',
      targetText: 'Hello, Good morning, Goodbye, Thank you',
      vocabPairs: [
        { id: 'vp1', english: 'Hello', spanish: 'Hola', phonetic: 'Jelóu' },
        { id: 'vp2', english: 'Good morning', spanish: 'Buenos días', phonetic: 'Gud mór-ning' },
        { id: 'vp3', english: 'Goodbye', spanish: 'Adiós', phonetic: 'Gud-bái' },
        { id: 'vp4', english: 'Thank you', spanish: 'Gracias', phonetic: 'Zank iu' }
      ],
      mexicanTip: 'Bloque básico de cortesía.',
      explanation: 'Saludos esenciales.'
    },
    {
      id: 'a1_0_s1_g1',
      discipline: 'grammar',
      type: 'grammar_rule_builder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Elige la forma correcta para decir "Yo soy Carlos":',
      ruleFormula: '[I] + [am] + [Nombre]',
      targetText: 'I am Carlos',
      correctOption: 'I am Carlos',
      audioText: 'I am Carlos.',
      options: ['I am Carlos', 'I are Carlos', 'I is Carlos', 'I be Carlos'],
      mexicanTip: 'Con "I" siempre va "am".',
      explanation: 'Estructura básica de presentación.'
    },
    {
      id: 'a1_0_s1_g2',
      discipline: 'grammar',
      type: 'grammar_fill_blank',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Completa el espacio: "You _____ Sofia."',
      ruleFormula: '[You] + [are]',
      targetText: 'are',
      correctOption: 'are',
      audioText: 'You are Sofia.',
      options: ['are', 'am', 'is', 'be'],
      mexicanTip: 'Con "You" siempre se usa "are".',
      explanation: 'Verbo To Be en segunda persona.'
    },
    {
      id: 'a1_0_s1_g3',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: '¿Cómo dirías de forma natural "Soy David" usando contracción?',
      ruleFormula: 'I am = I\'m',
      targetText: "I'm David",
      correctOption: "I'm David",
      audioText: "I'm David.",
      options: ["I'm David", "Im David", "I am's David", "Me is David"],
      mexicanTip: 'Los nativos usan "I\'m" al hablar.',
      explanation: 'Contracción estándar de "I am".'
    },
    {
      id: 'a1_0_s1_g4',
      discipline: 'grammar',
      type: 'grammar_order',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Ordena las palabras para formar: "Hola, yo soy María."',
      targetText: 'Hello, I am Maria.',
      options: ['am', 'Maria.', 'Hello,', 'I'],
      mexicanTip: 'Saludo + Sujeto + Verbo.',
      explanation: 'Estructura afirmativa.'
    },
    {
      id: 'a1_0_s1_g5',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: '¿Cuál es la frase correcta para decir tu nombre?',
      targetText: 'My name is Alex',
      correctOption: 'My name is Alex',
      audioText: 'My name is Alex.',
      options: ['My name is Alex', 'My name are Alex', 'My name am Alex', 'Me name is Alex'],
      mexicanTip: '"My name" lleva "is".',
      explanation: 'Fórmula clásica de presentación.'
    },
    {
      id: 'a1_0_s1_r1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      passage: 'Alex: "Hello! Good morning."\nSofia: "Good morning! My name is Sofia."',
      prompt: '¿Quién saludó primero?',
      targetText: 'Alex',
      correctOption: 'Alex',
      options: ['Alex', 'Sofia', 'Carlos', 'Nadie'],
      mexicanTip: 'Lee el orden del diálogo.',
      explanation: 'Alex inicia la conversación.'
    },
    {
      id: 'a1_0_s1_w1',
      discipline: 'writing',
      type: 'writing_reorder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Ordena las palabras para formar un saludo:',
      targetText: 'Good morning, my name is Carlos.',
      options: ['morning,', 'is', 'Carlos.', 'name', 'Good', 'my'],
      mexicanTip: 'Mayúscula al inicio y punto al final.',
      explanation: 'Estructura escrita correcta.'
    },
    {
      id: 'a1_0_s1_l1',
      discipline: 'listening',
      type: 'listening_select',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Escucha el audio y elige lo que dijo la persona:',
      audioText: 'Good morning! My name is Carlos.',
      targetText: 'Buenos días! Mi nombre es Carlos.',
      correctOption: 'Buenos días! Mi nombre es Carlos.',
      options: [
        'Buenos días! Mi nombre es Carlos.',
        'Buenas noches! Yo soy David.',
        'Hasta luego Carlos.',
        'Hola! Toma asiento.'
      ],
      mexicanTip: 'Atento al saludo matutino.',
      explanation: 'Audio de presentación.'
    },
    {
      id: 'a1_0_s1_s1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Pronuncia esta presentación con ritmo natural:',
      audioText: "Hello! My name is Carlos.",
      targetText: "Hello! My name is Carlos.",
      phoneticGuide: 'Jelóu! Mái néim is Cár-los.',
      mexicanTip: 'Exhala suavemente en la "H".',
      explanation: 'Práctica oral.'
    }
  ]
};

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

  // Extraer las palabras clave reales del tema (ej. pancakes, eggs, bacon, coffee)
  const vocabWords = sessionPlan.vocabFocus.split(',').map(s => s.trim()).filter(Boolean);
  const v1 = vocabWords[0] || sessionPlan.topic;
  const v2 = vocabWords[1] || 'toast';
  const v3 = vocabWords[2] || 'coffee';
  const v4 = vocabWords[3] || 'juice';

  // Banco limpio de opciones de vocabulario basadas estrictamente en las palabras clave reales
  const cleanVocabPool = [v1, v2, v3, v4, 'water', 'bread', 'milk', 'fruit', 'tea', 'sugar'];

  const getCleanOptions = (target: string) => {
    const others = cleanVocabPool.filter(w => w.toLowerCase() !== target.toLowerCase());
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
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
      prompt: `Tarjeta de Vocabulario: Aprende e identifica el término "${v1}"`,
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
      prompt: `Elige la opción correcta para el vocabulario "${v2}":`,
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
      prompt: `Asociación en situación real (${sessionPlan.realLifeContext}): ¿Qué palabra representa "${v3}"?`,
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
      prompt: `Identifica la opción correcta para el término "${v4}":`,
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
        { id: 'dvp1', english: v1, spanish: `${v1} (Concepto 1)` },
        { id: 'dvp2', english: v2, spanish: `${v2} (Concepto 2)` },
        { id: 'dvp3', english: v3, spanish: `${v3} (Concepto 3)` },
        { id: 'dvp4', english: v4, spanish: `${v4} (Concepto 4)` }
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
