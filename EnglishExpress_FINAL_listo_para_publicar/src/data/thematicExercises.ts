import { Exercise, Discipline, SubLevel, CEFRLevel, VocabPair } from '../types';
import { getSubLevelTheme, ThematicSessionPlan } from './thematicCurriculum';

/**
 * RICH THEMATIC EXERCISES DATABASE
 * Strictly organized with:
 * 1. 5 Vocabulary gamified intro exercises (Flashcards, Translation, Word Association, Match)
 * 2. 5 Grammar gamified exercises (Rule Builders, Fill Blank, Contractions, Word Order)
 * 3. Reading comprehension exercises
 * 4. Writing exercises
 * 5. Listening exercises
 * 6. Speaking exercises
 */
export const THEMATIC_EXERCISES_DATABASE: Record<string, Exercise[]> = {
  // =============================================================
  // A1.0 SESSION 1: HI & HELLO (ULTRA-INTUITIVE FOR ZERO-ENGLISH BEGINNERS)
  // =============================================================
  'A1.0_1': [
    // ---------------- VOCABULARY (5 Reactivos Lúdicos) ----------------
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
      mexicanTip: '"Hello" es el saludo estándar en EE.UU. "Hi" es la versión más casual y amigable entre conocidos.',
      explanation: '"Hello" significa "Hola". Es la palabra más importante para iniciar cualquier conversación en inglés.'
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
      explanation: '"Good morning" significa "Buenos días" (Good = Bueno, Morning = Mañana).'
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
      mexicanTip: 'En el día a día, la mayoría de los estadounidenses simplemente dicen "Bye!" o "Bye-bye!".',
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
      mexicanTip: '¡Con estas 4 palabras ya puedes saludar y agradecer en cualquier tienda o aeropuerto de EE.UU.!',
      explanation: 'Dominio de saludos y cortesía elemental en inglés americano.'
    },

    // ---------------- GRAMMAR (5 Reactivos Lúdicos) ----------------
    {
      id: 'a1_0_s1_g1',
      discipline: 'grammar',
      type: 'grammar_rule_builder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Regla 1: El pronombre "I" significa "Yo". Con "I" SIEMPRE usamos "am" (Yo soy / Yo estoy). ¿Cuál es la forma correcta para decir "Yo soy Carlos"?',
      ruleFormula: '[Sujeto: I] + [Verbo: am] + [Nombre/Complemento]',
      targetText: 'I am Carlos',
      correctOption: 'I am Carlos',
      audioText: 'I am Carlos.',
      options: ['I am Carlos', 'I are Carlos', 'I is Carlos', 'I be Carlos'],
      mexicanTip: 'En inglés el pronombre "I" (Yo) SIEMPRE se escribe con mayúscula, incluso en medio de una oración.',
      explanation: 'Estructura básica: "I" (Yo) va siempre con "am" (soy/estoy).'
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
      mexicanTip: '"You" sirve tanto para "Tú" (informal) como para "Usted" (formal) en inglés.',
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
      prompt: 'Regla 3 (Contracciones): En el inglés hablado cotidiano, "I am" se abrevia como "I\'m" (se pronuncia "áim"). ¿Cómo dirías de forma natural "Soy David"?',
      ruleFormula: 'I am = I\'m (pronunciado: áim)',
      targetText: "I'm David",
      correctOption: "I'm David",
      audioText: "I'm David.",
      options: ["I'm David", "Im David", "I am's David", "Me is David"],
      mexicanTip: 'Los estadounidenses usan "I\'m" el 95% de las veces en conversaciones orales porque suena más fluido.',
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
      mexicanTip: 'Primero colocas el saludo ("Hello"), luego la coma, luego el sujeto ("I") y el verbo ("am").',
      explanation: 'Orden de la oración afirmativa: Saludo + Sujeto (I) + Verbo (am) + Nombre (Maria).'
    },
    {
      id: 'a1_0_s1_g5',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: 'Hi & Hello: Saludos y Despedidas',
      prompt: 'Decir tu nombre: ¿Cuál de las siguientes frases es gramaticalmente correcta para presentarte?',
      targetText: 'My name is Alex',
      correctOption: 'My name is Alex',
      audioText: 'My name is Alex.',
      options: ['My name is Alex', 'My name are Alex', 'My name am Alex', 'Me name is Alex'],
      mexicanTip: '"My name" equivale a una tercera persona singular ("It"), por eso lleva "is".',
      explanation: 'Fórmula clásica: "My name is [Nombre]" (Mi nombre es...).'
    },

    // ---------------- READING ----------------
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
      explanation: 'Alex inicia diciendo "Hello! Good morning", y luego Sofia se presenta.'
    },

    // ---------------- WRITING ----------------
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
      mexicanTip: 'Empieza con mayúscula en "Good" y finaliza con punto después del nombre.',
      explanation: 'Estructura: Saludo + Posesivo + Nombre + Verbo To Be.'
    },

    // ---------------- LISTENING ----------------
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
      mexicanTip: '"Good morning" tiene un sonido suave en la "d" final de good.',
      explanation: 'El audio pronuncia claramente "Good morning! My name is Carlos."'
    },

    // ---------------- SPEAKING ----------------
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
      mexicanTip: 'Pronuncia la "H" de "Hello" como una ligera exhalación de aire (no como la J fuerte en español).',
      explanation: 'Práctica de saludo y presentación personal en voz alta.'
    }
  ],

  // =============================================================
  // A1.0 SESSION 2: WHAT'S YOUR NAME & SPELLING
  // =============================================================
  'A1.0_2': [
    // VOCABULARY
    {
      id: 'a1_0_s2_v1',
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Tarjeta de Vocabulario: Datos Personales',
      targetText: 'First name',
      correctOption: 'Primer nombre',
      spanishTranslation: 'Primer nombre',
      audioText: 'First name',
      phoneticGuide: 'Ferst néim',
      options: ['Primer nombre', 'Apellido', 'Firma', 'Dirección'],
      acceptableAnswers: ['Primer nombre', 'primer nombre', 'First name'],
      mexicanTip: 'En EE.UU. "First name" es tu nombre de pila (ej. Carlos).',
      explanation: '"First name" = Primer nombre.'
    },
    {
      id: 'a1_0_s2_v2',
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Tarjeta de Vocabulario: Apellidos',
      targetText: 'Last name',
      correctOption: 'Apellido',
      spanishTranslation: 'Apellido',
      audioText: 'Last name / Surname',
      phoneticGuide: 'Last néim',
      options: ['Apellido', 'Segundo nombre', 'Código postal', 'Apodo'],
      acceptableAnswers: ['Apellido', 'apellido', 'Last name'],
      mexicanTip: 'En formularios oficiales de EE.UU. también verás la palabra "Surname" o "Family name".',
      explanation: '"Last name" = Apellido.'
    },
    {
      id: 'a1_0_s2_v3',
      discipline: 'vocabulary',
      type: 'vocab_select_translation',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: '¿Cómo se dice la acción de "Deletrear" una palabra o nombre letra por letra?',
      targetText: 'Spell',
      correctOption: 'Spell',
      audioText: 'How do you spell that?',
      phoneticGuide: 'Spel',
      options: ['Spell', 'Speak', 'Write', 'Read'],
      mexicanTip: 'En aduanas y hoteles te preguntarán frecuentemente: "How do you spell your last name?".',
      explanation: '"Spell" significa deletrear.'
    },
    {
      id: 'a1_0_s2_v4',
      discipline: 'vocabulary',
      type: 'vocab_association',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: '¿Cuál es la pregunta que te hace alguien cuando quiere saber tu nombre?',
      targetText: "What is your name?",
      correctOption: "What is your name?",
      audioText: "What is your name?",
      phoneticGuide: 'Uát is iur néim?',
      options: ["What is your name?", "Where are you from?", "How old are you?", "What time is it?"],
      mexicanTip: 'En habla rápida suena conectado: "Uáts-iur-néim?".',
      explanation: '"What is your name?" = ¿Cómo te llamas? / ¿Cuál es tu nombre?'
    },
    {
      id: 'a1_0_s2_v5',
      discipline: 'vocabulary',
      type: 'vocab_match',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Juego de Memoria: Empareja los términos de registro personal',
      targetText: 'First name = Primer nombre, Last name = Apellido, Spell = Deletrear, Letters = Letras',
      vocabPairs: [
        { id: 'vp1', english: 'First name', spanish: 'Primer nombre', phonetic: 'Ferst néim' },
        { id: 'vp2', english: 'Last name', spanish: 'Apellido', phonetic: 'Last néim' },
        { id: 'vp3', english: 'Spell', spanish: 'Deletrear', phonetic: 'Spel' },
        { id: 'vp4', english: 'Letters', spanish: 'Letras', phonetic: 'Lé-ters' }
      ],
      mexicanTip: 'Términos indispensables para llenar documentos migratorios o registros de hotel.',
      explanation: 'Vocabulario clave para formularios y deletreo en inglés.'
    },

    // GRAMMAR
    {
      id: 'a1_0_s2_g1',
      discipline: 'grammar',
      type: 'grammar_rule_builder',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Regla: Posesivos "My" (Mi) vs "Your" (Tu / Su de usted). ¿Cómo dices "Tu nombre es Ana"?',
      ruleFormula: '[Posesivo: Your] + [Sustantivo: name] + [is] + [Nombre]',
      targetText: 'Your name is Ana',
      correctOption: 'Your name is Ana',
      audioText: 'Your name is Ana.',
      options: ['Your name is Ana', 'You name is Ana', 'Yours name is Ana', 'You are name Ana'],
      mexicanTip: 'Usa "My" para tus cosas (My name) y "Your" para las de la otra persona (Your name).',
      explanation: '"Your" es el adjetivo posesivo para indicar posesión de la segunda persona.'
    },
    {
      id: 'a1_0_s2_g2',
      discipline: 'grammar',
      type: 'grammar_fill_blank',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Preguntas con "What": Completa la pregunta para saber el nombre de alguien: "_____ is your name?"',
      ruleFormula: '[Wh-word: What] + [is] + [your name]?',
      targetText: 'What',
      correctOption: 'What',
      audioText: 'What is your name?',
      options: ['What', 'Where', 'Who', 'How'],
      mexicanTip: '"What" se usa para preguntar "¿Qué?" o "¿Cuál?".',
      explanation: '"What is your name?" es la estructura correcta para preguntar el nombre.'
    },
    {
      id: 'a1_0_s2_g3',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Contracción de "What is": En inglés conversacional "What is" se contrae como "What\'s". ¿Cuál es la forma correcta?',
      ruleFormula: 'What is = What\'s (pronunciado: uáts)',
      targetText: "What's your last name?",
      correctOption: "What's your last name?",
      audioText: "What's your last name?",
      options: ["What's your last name?", "Whats' your last name?", "What are your last name?", "Which is you last name?"],
      mexicanTip: 'El apóstrofe sustituye la letra "i" de "is".',
      explanation: '"What\'s" es la contracción estándar de "What is".'
    },
    {
      id: 'a1_0_s2_g4',
      discipline: 'grammar',
      type: 'grammar_order',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Construcción: Ordena las palabras para preguntar "¿Cómo deletreas tu nombre?"',
      targetText: 'How do you spell your name?',
      options: ['spell', 'How', 'your', 'name?', 'do', 'you'],
      mexicanTip: 'Estructura de pregunta en presente: [How] + [Auxiliar: do] + [Sujeto: you] + [Verbo: spell] + [Complemento].',
      explanation: '"How do you spell your name?" es la frase estándar de deletreo.'
    },
    {
      id: 'a1_0_s2_g5',
      discipline: 'grammar',
      type: 'grammar_choice',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Respuesta al deletreo: Para responder cómo se deletrea tu nombre en inglés, ¿cuál es la forma correcta?',
      targetText: "It is C-A-R-L-O-S",
      correctOption: "It is C-A-R-L-O-S",
      audioText: "It is C-A-R-L-O-S.",
      options: ["It is C-A-R-L-O-S", "I am C-A-R-L-O-S", "My spell is C-A-R-L-O-S", "You are C-A-R-L-O-S"],
      mexicanTip: 'Usamos "It is..." (o "It\'s...") para referirnos a cómo se escribe una palabra o nombre.',
      explanation: 'Para indicar el deletreo se usa "It is [L-E-T-R-A-S]".'
    },

    // READING
    {
      id: 'a1_0_s2_r1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      passage: 'Hotel Registration:\nOfficer: "Good afternoon. What is your last name?"\nGuest: "My last name is Gomez. G-O-M-E-Z."\nOfficer: "Thank you, Mr. Gomez. Here is your room key."',
      prompt: '¿Cuál es el apellido (last name) que deletreó el huésped?',
      targetText: 'Gomez',
      correctOption: 'Gomez',
      options: ['Gomez', 'Garcia', 'Gonzalez', 'Garza'],
      mexicanTip: '"Room key" significa la llave de la habitación del hotel.',
      explanation: 'El texto indica claramente: "My last name is Gomez. G-O-M-E-Z."'
    },

    // WRITING
    {
      id: 'a1_0_s2_w1',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Traduce al inglés: "¿Cuál es tu primer nombre?"',
      targetText: 'What is your first name?',
      acceptableAnswers: ["What's your first name?", "What is your first name"],
      mexicanTip: '"First name" no lleva guión ni preposiciones intermedias en inglés moderno.',
      explanation: 'Traducción directa: "What is your first name?".'
    },

    // LISTENING
    {
      id: 'a1_0_s2_l1',
      discipline: 'listening',
      type: 'listening_dictation',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Escucha con atención y escribe exactamente la frase que escuchas:',
      audioText: 'My last name is Ramos.',
      targetText: 'My last name is Ramos.',
      acceptableAnswers: ['My last name is Ramos', 'my last name is ramos'],
      mexicanTip: 'Recuerda poner mayúscula en la primera letra y en el apellido Ramos.',
      explanation: 'Dictado de presentación de apellido formal.'
    },

    // SPEAKING
    {
      id: 'a1_0_s2_s1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.0',
      thematicUnit: 'Greetings, Names & Alphabet',
      sessionTheme: "What's Your Name? Deletreo en Inglés",
      prompt: 'Presiona el micrófono y pronuncia la pregunta:',
      audioText: "What is your first name?",
      targetText: "What is your first name?",
      phoneticGuide: 'Uát is iur ferst néim?',
      mexicanTip: 'En "first", el sonido "ir" se pronuncia con la boca relajada: "ferst".',
      explanation: 'Pregunta conversacional fundamental en inglés americano.'
    }
  ]
};

/**
 * Builds thematic exercises dynamically adhering to the strict pedagogical pipeline:
 * 1. 5 Vocabulary gamified items (Flashcard, Translation, Association, Match)
 * 2. 5 Grammar gamified items (Rule Builder, Fill Blank, Contraction, Order, Choice)
 * 3. Reading comprehension
 * 4. Writing
 * 5. Listening
 * 6. Speaking
 */
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

  // If a direct curated session bank exists with the 6 disciplines, use it!
  if (directBank && directBank.length >= 6) {
    // Return direct curated bank
    return directBank;
  }

  // Otherwise, dynamically generate the complete 6-discipline structured pipeline:
  // 5 Vocabulary + 5 Grammar + 1 Reading + 1 Writing + 1 Listening + 1 Speaking
  const vocabWords = sessionPlan.vocabFocus.split(',').map(s => s.trim()).filter(Boolean);
  const v1 = vocabWords[0] || 'Key term';
  const v2 = vocabWords[1] || 'Important phrase';
  const v3 = vocabWords[2] || 'Common expression';
  const v4 = vocabWords[3] || 'Essential word';

  const vocabExercises: Exercise[] = [
    {
      id: `dyn_${subLevel}_s${sessionNum}_v1_${Date.now()}`,
      discipline: 'vocabulary',
      type: 'vocab_flashcard',
      level: tier,
      subLevel,
      thematicUnit: themeData.unitTitle,
      sessionTheme: sessionPlan.title,
      prompt: `Tarjeta de Vocabulario: Descubre el término central del tema "${sessionPlan.title}"`,
      targetText: v1,
      correctOption: v1,
      audioText: v1,
      phoneticGuide: `Pronunciación guiada en inglés americano`,
      options: [v1, 'Alternative term', 'Casual expression', 'Formal phrase'],
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
      prompt: `¿Cuál de los siguientes términos corresponde a "${v2}" en el contexto de ${sessionPlan.topic}?`,
      targetText: v2,
      correctOption: v2,
      audioText: v2,
      options: [v2, 'Secondary option', 'Incorrect form', 'Unrelated word'],
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
      options: [v3, 'Out-of-context expression', 'Discontinued term', 'Non-applicable informal phrase'],
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
      prompt: `Identifica la pronunciación y significado correcto para "${v4}":`,
      targetText: v4,
      correctOption: v4,
      audioText: v4,
      options: [v4, 'Grammar term', 'False friend', 'Inexact synonym'],
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
        { id: 'dvp1', english: v1, spanish: `Término: ${v1}` },
        { id: 'dvp2', english: v2, spanish: `Frase: ${v2}` },
        { id: 'dvp3', english: v3, spanish: `Concepto: ${v3}` },
        { id: 'dvp4', english: v4, spanish: `Uso: ${v4}` }
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
      mexicanTip: `Regla para hispanohablantes: En inglés la estructura ${sessionPlan.grammarFocus} no omite elementos clave.`,
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
      explanation: `Consolidación de la gramática de la sesión ${sessionPlan.title}.`
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

  // Strictly return in the requested discipline order:
  // 1. Vocabulary (5)
  // 2. Grammar (5)
  // 3. Reading (1)
  // 4. Writing (1)
  // 5. Listening (1)
  // 6. Speaking (1)
  return [
    ...vocabExercises,
    ...grammarExercises,
    readingExercise,
    writingExercise,
    listeningExercise,
    speakingExercise
  ];
}
