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
      prompt: 'Tarjeta de Vocabulario Clave: Aprende a saludar en inglés',
      targetText: 'Hello',
      correctOption: 'Hola',
      spanishTranslation: 'Hola',
      audioText: 'Hello! Hi!',
      phoneticGuide: 'Jelóu / Jai',
      options: ['Hola', 'Adiós', 'Por favor', 'Gracias'],
      acceptableAnswers: ['Hola', 'hola', 'Hello', 'hello'],
      mexicanTip: '"Hello" es el saludo estándar en EE.UU. "Hi" es la versión más casual y amigable.',
      explanation: '"Hello" significa "Hola". Es la palabra más importante para iniciar cualquier conversación.'
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
      correctOption: 'Buenos días',
      spanishTranslation: 'Buenos días',
      audioText: 'Good morning!',
      phoneticGuide: 'Gud mór-ning',
      options: ['Buenos días', 'Buenas noches', 'Hasta luego', 'Buen provecho'],
      acceptableAnswers: ['Buenos días', 'buenos dias', 'Good morning', 'good morning'],
      mexicanTip: 'En EE.UU. "Good morning" se usa desde que te levantas hasta las 12:00 del mediodía.',
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
      prompt: '¿Cómo te despides diciendo "Adiós" o "Hasta luego" en inglés?',
      targetText: 'Goodbye',
      correctOption: 'Goodbye',
      audioText: 'Goodbye! Bye!',
      phoneticGuide: 'Gud-bái / Bái',
      options: ['Goodbye', 'Hello', 'Please', 'Good morning'],
      acceptableAnswers: ['Goodbye', 'goodbye', 'Bye', 'bye'],
      mexicanTip: 'La mayoría de los estadounidenses simplemente dicen "Bye!" o "Bye-bye!".',
      explanation: '"Goodbye" o "Bye" significa "Adiós" o "Hasta luego".'
    },
    {
      id: 'a1_0_s1_v4',
      discipline: 'vocabulary',
      type: 'vocab_association',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Palabras de Cortesía: ¿Qué significa "Thank you" cuando alguien te ayuda?',
      targetText: 'Gracias',
      correctOption: 'Gracias',
      audioText: 'Thank you very much!',
      phoneticGuide: 'Zank iu',
      options: ['Gracias', 'Por favor', 'De nada', 'Disculpe'],
      acceptableAnswers: ['Gracias', 'gracias', 'Thank you', 'thanks'],
      mexicanTip: 'Pronuncia la "Th" poniendo la punta de la lengua suavemente entre los dientes.',
      explanation: '"Thank you" (o de forma casual "Thanks") significa "Gracias".'
    },
    {
      id: 'a1_0_s1_v5',
      discipline: 'vocabulary',
      type: 'vocab_match',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Juego de Memoria: Empareja cada saludo en inglés con su significado en español',
      targetText: 'Hello = Hola, Good morning = Buenos días, Goodbye = Adiós, Thank you = Gracias',
      vocabPairs: [
        { id: 'vp1', english: 'Hello', spanish: 'Hola', phonetic: 'Jelóu' },
        { id: 'vp2', english: 'Good morning', spanish: 'Buenos días', phonetic: 'Gud mór-ning' },
        { id: 'vp3', english: 'Goodbye', spanish: 'Adiós', phonetic: 'Gud-bái' },
        { id: 'vp4', english: 'Thank you', spanish: 'Gracias', phonetic: 'Zank iu' }
      ],
      mexicanTip: '¡Con estas 4 palabras ya puedes saludar y agradecer en cualquier lugar!',
      explanation: 'Dominio de saludos y cortesía elemental.'
    },
    {
      id: 'a1_0_s1_g1',
      discipline: 'grammar',
      type: 'grammar_rule_builder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Regla 1: El pronombre "I" significa "Yo". Con "I" SIEMPRE usamos "am". ¿Cuál es la forma correcta para decir "Yo soy Carlos"?',
      ruleFormula: '[Sujeto: I] + [Verbo: am] + [Nombre]',
      targetText: 'I am Carlos',
      correctOption: 'I am Carlos',
      audioText: 'I am Carlos.',
      options: ['I am Carlos', 'I are Carlos', 'I is Carlos', 'I be Carlos'],
      mexicanTip: 'El pronombre "I" (Yo) SIEMPRE se escribe con mayúscula en inglés.',
      explanation: 'Estructura básica: "I" va siempre con "am".'
    },
    {
      id: 'a1_0_s1_g2',
      discipline: 'grammar',
      type: 'grammar_fill_blank',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Regla 2: Para decir "Tú eres" o "Usted es", usamos "You are". Completa el espacio: "You _____ Sofia."',
      ruleFormula: '[Sujeto: You] + [Verbo: are]',
      targetText: 'are',
      correctOption: 'are',
      audioText: 'You are Sofia.',
      options: ['are', 'am', 'is', 'be'],
      mexicanTip: '"You" sirve tanto para "Tú" como para "Usted".',
      explanation: 'Con "You" siempre se utiliza "are".'
    },
    {
      id: 'a1_0_s1_g3',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Regla 3 (Contracciones): "I am" se abrevia como "I\'m" (áim). ¿Cómo dirías de forma natural "Soy David"?',
      ruleFormula: 'I am = I\'m',
      targetText: "I'm David",
      correctOption: "I'm David",
      audioText: "I'm David.",
      options: ["I'm David", "Im David", "I am's David", "Me is David"],
      mexicanTip: 'Los estadounidenses usan "I\'m" el 95% de las veces al hablar.',
      explanation: '"I\'m" es la contracción estándar de "I am".'
    },
    {
      id: 'a1_0_s1_g4',
      discipline: 'grammar',
      type: 'grammar_order',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Construcción Gramatical: Ordena las palabras para formar la oración: "Hola, yo soy María."',
      targetText: 'Hello, I am Maria.',
      options: ['am', 'Maria.', 'Hello,', 'I'],
      mexicanTip: 'Primero el saludo, luego el sujeto y el verbo.',
      explanation: 'Orden: Saludo + Sujeto + Verbo + Nombre.'
    },
    {
      id: 'a1_0_s1_g5',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Decir tu nombre: ¿Cuál de las siguientes frases es correcta para presentarte?',
      targetText: 'My name is Alex',
      correctOption: 'My name is Alex',
      audioText: 'My name is Alex.',
      options: ['My name is Alex', 'My name are Alex', 'My name am Alex', 'Me name is Alex'],
      mexicanTip: '"My name" equivale a tercera persona singular, por eso lleva "is".',
      explanation: 'Fórmula clásica: "My name is [Nombre]".'
    },
    {
      id: 'a1_0_s1_r1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      passage: 'Conversation:\nAlex: "Hello! Good morning."\nSofia: "Good morning! My name is Sofia."\nAlex: "Nice to meet you, Sofia. I am Alex."',
      prompt: 'Lee la conversación corta: ¿Quién saludó primero?',
      targetText: 'Alex',
      correctOption: 'Alex',
      options: ['Alex', 'Sofia', 'Carlos', 'El recepcionista'],
      mexicanTip: '"Nice to meet you" significa "Mucho gusto en conocerte".',
      explanation: 'Alex inicia diciendo "Hello! Good morning".'
    },
    {
      id: 'a1_0_s1_w1',
      discipline: 'writing',
      type: 'writing_reorder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Ordena las palabras para formar un saludo cortés completo:',
      targetText: 'Good morning, my name is Carlos.',
      options: ['morning,', 'is', 'Carlos.', 'name', 'Good', 'my'],
      mexicanTip: 'Empieza con mayúscula y finaliza con punto.',
      explanation: 'Estructura: Saludo + Posesivo + Nombre + Verbo To Be.'
    },
    {
      id: 'a1_0_s1_l1',
      discipline: 'listening',
      type: 'listening_select',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Escucha con atención el audio y elige qué fue lo que dijo la persona:',
      audioText: 'Good morning! My name is Carlos.',
      targetText: 'Buenos días! Mi nombre es Carlos.',
      correctOption: 'Buenos días! Mi nombre es Carlos.',
      options: [
        'Buenos días! Mi nombre es Carlos.',
        'Buenas noches! Yo soy David.',
        'Hasta luego Carlos, que tengas buen día.',
        'Hola! Por favor toma asiento Carlos.'
      ],
      mexicanTip: '"Good morning" tiene un sonido suave en la "d".',
      explanation: 'El audio pronuncia claramente "Good morning! My name is Carlos."'
    },
    {
      id: 'a1_0_s1_s1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Presiona el micrófono y pronuncia esta presentación con ritmo natural:',
      audioText: "Hello! My name is Carlos.",
      targetText: "Hello! My name is Carlos.",
      phoneticGuide: 'Jelóu! Mái néim is Cár-los.',
      mexicanTip: 'Pronuncia la "H" de "Hello" como una ligera exhalación de aire.',
      explanation: 'Práctica de saludo y presentación personal.'
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

  const vocabWords = sessionPlan.vocabFocus.split(',').map(s => s.trim()).filter(Boolean);
  const v1 = vocabWords[0] || sessionPlan.topic;
  const v2 = vocabWords[1] || 'Core concept';
  const v3 = vocabWords[2] || 'Common phrase';
  const v4 = vocabWords[3] || 'Essential term';

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
      options: [v1, v2, sessionPlan.topic, 'Daily expression'],
      acceptableAnswers: [v1, v1.toLowerCase()],
      mexicanTip: `Enfoque comunicativo en EE.UU.: ${sessionPlan.culturalNote}`,
      explanation: `Término fundamental para el escenario real: ${sessionPlan.realLifeContext}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v2_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cuál de los siguientes términos corresponde al concepto principal de esta sesión?`,
      targetText: v2,
      correctOption: v2,
      audioText: v2,
      options: [v2, v1, 'Context reference', 'Common term'],
      acceptableAnswers: [v2, v2.toLowerCase()],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Vocabulario clave: ${sessionPlan.vocabFocus}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v3_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_association',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Asociación en situación real: ¿Qué expresión usarías en "${sessionPlan.realLifeContext}"?`,
      targetText: v3,
      correctOption: v3,
      audioText: v3,
      options: [v3, v1, 'Dialogue variant', 'Conversational phrase'],
      acceptableAnswers: [v3, v3.toLowerCase()],
      mexicanTip: `Diferencia cultural México-EE.UU.: ${sessionPlan.culturalNote}`,
      explanation: `Aplicación en la vida real: ${sessionPlan.realLifeContext}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_v4_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Identifica la palabra clave correcta para completar el vocabulario de la sesión:`,
      targetText: v4,
      correctOption: v4,
      audioText: v4,
      options: [v4, v2, 'Lexical reference', 'Target word'],
      acceptableAnswers: [v4, v4.toLowerCase()],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Palabra imprescindible de la unidad ${themeData.unitTitle}.`
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
      mexicanTip: `Aprender vocabulario por bloques temáticos acelera la fluidez conversacional.`,
      explanation: `Integración del vocabulario de la sesión ${sessionPlan.title}.`
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
      targetText: `We use ${sessionPlan.grammarFocus} for ${sessionPlan.topic}`,
      correctOption: `We use ${sessionPlan.grammarFocus} for ${sessionPlan.topic}`,
      audioText: `We use ${sessionPlan.grammarFocus} for ${sessionPlan.topic}`,
      options: [
        `We use ${sessionPlan.grammarFocus} for ${sessionPlan.topic}`,
        `${sessionPlan.topic} we use for ${sessionPlan.grammarFocus}`,
        `${sessionPlan.grammarFocus} we uses for ${sessionPlan.topic}`,
        `We using ${sessionPlan.grammarFocus} for ${sessionPlan.topic}`
      ],
      mexicanTip: `Regla para hispanohablantes: En inglés la estructura no omite elementos clave.`,
      explanation: `Estructura central de la sesión: ${sessionPlan.grammarFocus}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g2_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_fill_blank',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Aplica la regla de ${sessionPlan.grammarFocus}: Completa la oración con la forma correcta.`,
      ruleFormula: `[Patrón: ${sessionPlan.grammarFocus}]`,
      targetText: v1,
      correctOption: v1,
      options: [v1, 'is', 'are', 'was'],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Aplicación directa de ${sessionPlan.grammarFocus}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g3_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_choice',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `¿Cuál de las siguientes oraciones aplica correctamente la regla de ${sessionPlan.grammarFocus}?`,
      targetText: `This pattern is standard in American English: ${sessionPlan.grammarFocus}`,
      correctOption: `This pattern is standard in American English: ${sessionPlan.grammarFocus}`,
      options: [
        `This pattern is standard in American English: ${sessionPlan.grammarFocus}`,
        `Standard is this pattern American in English: ${sessionPlan.grammarFocus}`,
        `This pattern are standard in American English: ${sessionPlan.grammarFocus}`,
        `This pattern is standard the in American English: ${sessionPlan.grammarFocus}`
      ],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Estructura gramatical validada: ${sessionPlan.grammarFocus}.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g4_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_order',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Ordena los bloques para formar la oración gramatical correcta:`,
      targetText: `We are practicing ${v1} today.`,
      options: ['are', 'We', 'practicing', `${v1}`, 'today.'],
      mexicanTip: `En inglés el sujeto siempre precede al verbo en afirmaciones estándar.`,
      explanation: `Orden sintáctico: Sujeto + Verbo auxiliar + Verbo principal + Complemento.`
    },
    {
      id: `dyn_${subLevel}_s${sessionNum}_g5_${Date.now()}`,
      discipline: 'grammar',
      type: 'grammar_choice',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Decisión Gramatical en Conversación: ¿Cómo responderías adecuadamente aplicando ${sessionPlan.grammarFocus}?`,
      targetText: `Yes, we understand ${sessionPlan.grammarFocus} clearly.`,
      correctOption: `Yes, we understand ${sessionPlan.grammarFocus} clearly.`,
      audioText: `Yes, we understand ${sessionPlan.grammarFocus} clearly.`,
      options: [
        `Yes, we understand ${sessionPlan.grammarFocus} clearly.`,
        'No, we not understands the topic',
        'Yes, are understanding without subject',
        'No subject with incorrect auxiliary'
      ],
      mexicanTip: sessionPlan.culturalNote,
      explanation: `Consolidación de la gramática de la sesión.`
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
    passage: `Context Note (${themeData.unitTitle} - ${sessionPlan.title}): "In everyday American English, mastering ${sessionPlan.grammarFocus} and terms like ${sessionPlan.vocabFocus} allows you to communicate with confidence in scenarios such as ${sessionPlan.realLifeContext}."`,
    prompt: `¿Cuál es el beneficio de dominar ${sessionPlan.grammarFocus} según el texto?`,
    targetText: `Permite comunicarse con confianza en situaciones como ${sessionPlan.realLifeContext}`,
    correctOption: `Permite comunicarse con confianza en situaciones como ${sessionPlan.realLifeContext}`,
    options: [
      `Permite comunicarse con confianza en situaciones como ${sessionPlan.realLifeContext}`,
      'Solo sirve para aprobar exámenes escritos teóricos',
      'Obliga a hablar siempre de manera excesivamente formal',
      'Elimina por completo la necesidad de practicar conversación'
    ],
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Comprensión de lectura aplicada a ${sessionPlan.realLifeContext}.`
  };

  const writingExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_w1_${Date.now()}`,
    discipline: 'writing',
    type: 'writing_reorder',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Construcción Escrita: Ordena las palabras para expresar una idea clara en ${sessionPlan.topic}:`,
    targetText: `We are ready for ${v1} in our daily work.`,
    options: ['for', 'ready', 'We', 'are', `${v1}`, 'in', 'our', 'daily', 'work.'],
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Práctica de redacción aplicando el vocabulario y gramática aprendidos.`
  };

  const listeningExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_l1_${Date.now()}`,
    discipline: 'listening',
    type: 'listening_select',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Escucha con atención el audio sobre ${sessionPlan.topic} y responde:`,
    audioText: `Please make sure to review ${v1} for our meeting.`,
    targetText: `Revisar ${v1} para la reunión o actividad indicada`,
    correctOption: `Revisar ${v1} para la reunión o actividad indicada`,
    options: [
      `Revisar ${v1} para la reunión o actividad indicada`,
      'Cancelar la cita y posponer el evento',
      'Pagar una tarifa en ventanilla',
      'Pedir la cuenta en el restaurante'
    ],
    mexicanTip: `Conecta las palabras en inglés americano: ${sessionPlan.culturalNote}`,
    explanation: `Comprensión auditiva en acento estadounidense.`
  };

  const speakingExercise: Exercise = {
    id: `dyn_${subLevel}_s${sessionNum}_s1_${Date.now()}`,
    discipline: 'speaking',
    type: 'speaking_pronounce',
    level: tier,
    subLevel,
    thematicUnit: themeData.unitTitle,
    sessionTheme: sessionPlan.title,
    prompt: `Pronuncia con ritmo y entonación estadounidense aplicando ${sessionPlan.grammarFocus}:`,
    audioText: `Hello, I would like to practice ${v1} today.`,
    targetText: `Hello, I would like to practice ${v1} today.`,
    phoneticGuide: `Jelóu, ái gud láik tu prák-tis dis tu-déi.`,
    mexicanTip: sessionPlan.culturalNote,
    explanation: `Práctica oral para consolidar el tema de la sesión.`
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
