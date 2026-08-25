import { SubLevel, CEFRLevel, Discipline } from '../types';

export interface ThematicSessionPlan {
  sessionNumber: number;
  title: string;
  topic: string;
  grammarFocus: string;
  vocabFocus: string;
  realLifeContext: string;
  culturalNote: string;
}

export interface SubLevelTheme {
  subLevel: SubLevel;
  unitNumber: number;
  unitTitle: string;
  americanBookModule: string; // e.g. "Touchstone 1 / American English File 1 - Unit 1"
  themeDescription: string;
  keyGrammar: string;
  keyVocabulary: string;
  realWorldScenario: string;
  sessions: ThematicSessionPlan[];
}

/**
 * COMPREHENSIVE THEMATIC CURRICULUM MAPPED TO AMERICAN ENGLISH COURSEBOOKS
 * (Touchstone, American English File, Interchange, Top Notch & Cambridge American English)
 */
export const THEMATIC_CURRICULUM: Partial<Record<SubLevel, SubLevelTheme>> = {
  // =========================================================================
  // A1: PRINCIPIANTE (FUNDAMENTOS DEL INGLÉS AMERICANO)
  // =========================================================================
  'A1.0': {
    subLevel: 'A1.0',
    unitNumber: 1,
    unitTitle: 'Greetings, Names & The Alphabet',
    americanBookModule: 'American English File Starter - Unit 1: Hello & Welcome',
    themeDescription: 'Primeros contactos, saludos formales e informales, deletreo de nombres y números del 1 al 10.',
    keyGrammar: 'Subject pronouns (I, you), Verb to be (am, are), Possessive adjectives (my, your).',
    keyVocabulary: 'Hello, hi, good morning/evening, name, spell, letters, first/last name, numbers 1-10.',
    realWorldScenario: 'Presentarte con un compañero de trabajo o recepcionista en una empresa o hotel en EE.UU.',
    sessions: [
      {
        sessionNumber: 1,
        title: 'Hi & Hello: Saludos y Despedidas',
        topic: 'Greetings & Goodbyes',
        grammarFocus: 'I am / You are (I\'m / You\'re)',
        vocabFocus: 'Good morning, afternoon, evening, bye, see you',
        realLifeContext: 'Saludar a vecinos o colegas al inicio y final del día.',
        culturalNote: 'En EE.UU. "How are you doing?" suele ser un saludo casual, no una pregunta médica detallada.'
      },
      {
        sessionNumber: 2,
        title: 'What\'s Your Name? Deletreo en Inglés',
        topic: 'Names & The Alphabet',
        grammarFocus: 'Possessives: My name is..., Your name is...',
        vocabFocus: 'Alphabet A-Z, spell, first name, last name',
        realLifeContext: 'Deletrear tu apellido mexicano en la aduana o al reservar un vuelo.',
        culturalNote: 'En EE.UU. se usa "First Name" (primer nombre) y "Last Name / Surname" (apellido del padre).'
      },
      {
        sessionNumber: 3,
        title: 'Nice to Meet You: Cortesía y Títulos',
        topic: 'Social Courtesies',
        grammarFocus: 'Questions: What\'s your name? / Nice to meet you',
        vocabFocus: 'Mr., Ms., Mrs., please, thank you, you\'re welcome',
        realLifeContext: 'Presentación formal en una entrevista o cita de negocios.',
        culturalNote: '"Ms." /mɪz/ es el título profesional neutral más común para mujeres en EE.UU.'
      },
      {
        sessionNumber: 4,
        title: 'Numbers 1-10 & Phone Numbers',
        topic: 'Contact Information',
        grammarFocus: 'What is your phone number? It is...',
        vocabFocus: 'Zero to ten, phone number, area code',
        realLifeContext: 'Dar tu número de WhatsApp o teléfono en un formulario.',
        culturalNote: 'En EE.UU. el 0 en números de teléfono frecuentemente se pronuncia como "Oh" /oʊ/.'
      },
      {
        sessionNumber: 5,
        title: 'Where Are You From? México y EE.UU.',
        topic: 'Countries & Origins',
        grammarFocus: 'I am from [Country/City], Are you from...?',
        vocabFocus: 'Mexico, United States, Guadalajara, Monterrey, Texas, California',
        realLifeContext: 'Conversación casual en un avión o conferencia sobre tu lugar de origen.',
        culturalNote: 'Los estadounidenses dicen "I\'m from Dallas" o "I\'m from California" mencionando su estado.'
      },
      {
        sessionNumber: 6,
        title: 'Personal Info: Correo y Registro',
        topic: 'Forms & Registrations',
        grammarFocus: 'Wh- questions: What, Where, How',
        vocabFocus: 'Email, dot, at (@), address, zip code',
        realLifeContext: 'Llenar un formulario para rentar un auto o comprar en línea.',
        culturalNote: 'En correos electrónicos se dice "at" para @ y "dot" para el punto (ej. john at gmail dot com).'
      },
      {
        sessionNumber: 7,
        title: 'Introducing Others: Conoce a mi amigo',
        topic: 'Third Person Introductions',
        grammarFocus: 'This is [Name], He is / She is my friend',
        vocabFocus: 'Friend, coworker, boss, classmate, this is',
        realLifeContext: 'Presentar a tu colega con un cliente estadounidense.',
        culturalNote: 'Presentar a alguien con su título o rol ayuda a establecer rapport rápidamente.'
      },
      {
        sessionNumber: 8,
        title: 'Checkpoint Integrador: Primera Conversación',
        topic: 'Comprehensive Simulation',
        grammarFocus: 'Verb To Be consolidación completa',
        vocabFocus: 'Integración de Saludos + Deletreo + Teléfono + Origen',
        realLifeContext: 'Check-in completo en un evento o conferencia internacional.',
        culturalNote: 'El contacto visual firme y una sonrisa abierta denotan confianza en la cultura de EE.UU.'
      }
    ]
  },

  'A1.1': {
    subLevel: 'A1.1',
    unitNumber: 2,
    unitTitle: 'Personal Pronouns, To Be & Nationalities',
    americanBookModule: 'Touchstone 1 - Unit 1 & 2: All About You',
    themeDescription: 'Dominio de todos los pronombres personales (I, you, he, she, it, we, they), formas afirmativas, negativas y preguntas del verbo To Be, y nacionalidades.',
    keyGrammar: 'Verb To Be (am/is/are), Contractions (\'m, \'s, \'re, isn\'t, aren\'t), Yes/No Questions and Short Answers.',
    keyVocabulary: 'Nationalities (Mexican, American, Canadian), He/She/It/They, occupations (student, teacher, engineer).',
    realWorldScenario: 'Identificar personas y nacionalidades en un equipo de trabajo multinacional.',
    sessions: [
      {
        sessionNumber: 1,
        title: 'He, She, It: Pronombres Singulares',
        topic: 'Third-Person Pronouns',
        grammarFocus: 'He is, She is, It is / He\'s, She\'s, It\'s',
        vocabFocus: 'Man, woman, city, company, thing',
        realLifeContext: 'Describir a un compañero o hablar de un producto o ciudad.',
        culturalNote: '"It" se usa para objetos, animales y conceptos, nunca para personas.'
      },
      {
        sessionNumber: 2,
        title: 'We & They: Pronombres Plurales',
        topic: 'Plural Subjects',
        grammarFocus: 'We are, They are (We\'re, They\'re)',
        vocabFocus: 'Coworkers, team, students, tourists, they',
        realLifeContext: 'Hablar de tu equipo de trabajo o de tu familia.',
        culturalNote: '"They" se usa tanto para hombres como para mujeres en plural, y como pronombre singular neutro.'
      },
      {
        sessionNumber: 3,
        title: 'Nationalities & Flags: Mexican, American, Canadian',
        topic: 'Nationalities & Languages',
        grammarFocus: 'Adjectives of nationality: Mexican, American, Spanish, English',
        vocabFocus: 'Mexico/Mexican, USA/American, Canada/Canadian, Japan/Japanese',
        realLifeContext: 'Hablar de los orígenes de clientes y proveedores.',
        culturalNote: 'En inglés, las nacionalidades e idiomas SIEMPRE se escriben con mayúscula (English, Mexican).'
      },
      {
        sessionNumber: 4,
        title: 'Negations: Isn\'t & Aren\'t en Acción',
        topic: 'Negative Statements',
        grammarFocus: 'Is not (isn\'t), Are not (aren\'t), I am not (I\'m not)',
        vocabFocus: 'Not, isn\'t, aren\'t, different, correct',
        realLifeContext: 'Aclarar una confusión de nombres o roles en la oficina.',
        culturalNote: 'Las contracciones como "isn\'t" son el estándar en el habla conversacional cotidiana.'
      },
      {
        sessionNumber: 5,
        title: 'Yes/No Questions & Respuestas Cortas',
        topic: 'Questions with To Be',
        grammarFocus: 'Is he...? Yes, he is. / No, he isn\'t.',
        vocabFocus: 'Are you ready? Is she here? Yes/No short answers',
        realLifeContext: 'Confirmar asistencia o estatus en el trabajo.',
        culturalNote: 'Responder solo "Yes" o "No" suena cortante; lo cortés es "Yes, I am" o "No, I\'m not".'
      },
      {
        sessionNumber: 6,
        title: 'Professions & Jobs: ¿A qué te dedicas?',
        topic: 'Occupations',
        grammarFocus: 'Articles a/an with jobs: He is an engineer, She is a doctor',
        vocabFocus: 'Doctor, teacher, software developer, accountant, manager',
        realLifeContext: 'Responder a "¿What do you do?" en un evento de networking.',
        culturalNote: 'En inglés es obligatorio usar "a" o "an" antes de profesiones ("I am a developer").'
      },
      {
        sessionNumber: 7,
        title: 'Who is that? Preguntas con Wh-',
        topic: 'Information Questions',
        grammarFocus: 'Who is..., Where is..., How is...',
        vocabFocus: 'Who, where, what, why, when, how',
        realLifeContext: 'Preguntar por un nuevo colega o la ubicación de una sala de juntas.',
        culturalNote: '"Who\'s that?" es la forma natural y rápida que usan los nativos al señalar a alguien.'
      },
      {
        sessionNumber: 8,
        title: 'Checkpoint Integrador: Perfiles de Equipo',
        topic: 'Team Profile Review',
        grammarFocus: 'To Be en todas sus formas + Pronombres completos',
        vocabFocus: 'Integración completa de Nacionalidades + Profesiones + Pronombres',
        realLifeContext: 'Presentar el organigrama de un equipo binacional México-EE.UU.',
        culturalNote: 'Las empresas estadounidenses valoran las biografías cortas y directas ("elevator pitch").'
      }
    ]
  },

  'A1.2': {
    subLevel: 'A1.2',
    unitNumber: 3,
    unitTitle: 'Numbers, Prices, Cafés & Shopping',
    americanBookModule: 'Interchange 1 - Unit 3: How Much Is It?',
    themeDescription: 'Números del 11 al 100, precios en dólares y pesos, artículos demostrativos (this, that, these, those), y cómo ordenar en cafeterías y tiendas de conveniencia en EE.UU.',
    keyGrammar: 'Demonstratives (this/that/these/those), How much is/are...?, Plural nouns (-s, -es, irregulars).',
    keyVocabulary: 'Coffee, water, bagel, dollars, cents, price, cheap, expensive, size (small, medium, large).',
    realWorldScenario: 'Comprar café en Starbucks, pagar en Target o pedir algo en una tienda de conveniencia en Texas o California.',
    sessions: [
      {
        sessionNumber: 1,
        title: 'Numbers 11-100 & Counting Money',
        topic: 'Numbers & Currency',
        grammarFocus: 'Numbers: eleven to one hundred, dollar/dollars, cent/cents',
        vocabFocus: 'Twelve, twenty, thirty, fifty, hundred, cash, card',
        realLifeContext: 'Entender el total de una cuenta cuando el cajero lo dice rápido.',
        culturalNote: 'Presta atención a la diferencia de acentuación: fourTEEN (14) vs FORty (40).'
      },
      {
        sessionNumber: 2,
        title: 'This & That: Cosas Cerca y Lejos',
        topic: 'Demonstrative Pronouns (Singular)',
        grammarFocus: 'This (cerca) vs That (lejos)',
        vocabFocus: 'This coffee, that menu, this jacket, that laptop',
        realLifeContext: 'Señalar un producto en un escaparate o mostrador.',
        culturalNote: 'En EE.UU. la combinación "th" en "this/that" es sonora, sonando como una /ð/ suave.'
      },
      {
        sessionNumber: 3,
        title: 'These & Those: Plurales en el Mostrador',
        topic: 'Demonstrative Pronouns (Plural)',
        grammarFocus: 'These (estos) vs Those (aquellos), Plural nouns',
        vocabFocus: 'These shoes, those sunglasses, headphones, keys',
        realLifeContext: 'Preguntar por varios artículos en una tienda de ropa o electrónicos.',
        culturalNote: 'Palabras como "glasses", "pants" y "headphones" siempre van en plural en inglés.'
      },
      {
        sessionNumber: 4,
        title: 'How Much Is This? Preguntar Precios',
        topic: 'Asking for Prices',
        grammarFocus: 'How much is [singular]? / How much are [plural]?',
        vocabFocus: 'Cost, price, total, receipt, change',
        realLifeContext: 'Preguntar el costo de un producto sin etiqueta en un supermercado.',
        culturalNote: '"How much is this?" es más común y fluido en el habla cotidiana que "How much does it cost?".'
      },
      {
        sessionNumber: 5,
        title: 'Ordering at a Café: Coffee, Sizes & Extras',
        topic: 'Café & Restaurant Ordering',
        grammarFocus: 'I\'d like / Can I get a [item], please?',
        vocabFocus: 'Latte, black coffee, iced tea, milk, sugar, pastry, to go / for here',
        realLifeContext: 'Pedir tu café matutino en un café de EE.UU.',
        culturalNote: 'En EE.UU. te preguntarán: "For here or to go?" (¿Para comer aquí o para llevar?).'
      },
      {
        sessionNumber: 6,
        title: 'Paying: Cash, Card & Apple Pay',
        topic: 'Payment Methods',
        grammarFocus: 'Can I pay with...? / Do you take...?',
        vocabFocus: 'Debit, credit card, contactless, tap, receipt, tip',
        realLifeContext: 'Pagar con tarjeta o efectivo en la caja registradora.',
        culturalNote: 'En restaurantes estadounidenses con servicio a la mesa, la propina (tip) estándar es del 15% al 20%.'
      },
      {
        sessionNumber: 7,
        title: 'Colors, Sizes & Adjectives for Shopping',
        topic: 'Product Descriptions',
        grammarFocus: 'Adjective + Noun order (a black coffee, blue shirt)',
        vocabFocus: 'Colors (black, white, blue, red), Sizes (small, medium, large, XL)',
        realLifeContext: 'Pedir una talla diferente o un color específico a un vendedor.',
        culturalNote: 'En inglés los adjetivos SIEMPRE van antes del sustantivo ("red apple", no "apple red").'
      },
      {
        sessionNumber: 8,
        title: 'Checkpoint Integrador: Experiencia de Compra',
        topic: 'Shopping & Café Simulation',
        grammarFocus: 'Precios + Demostrativos + Pedidos de cortesía',
        vocabFocus: 'Integración completa de números, compras y comida rápida',
        realLifeContext: 'Hacer una compra completa, pedir recibo y pagar la propina.',
        culturalNote: 'La frase "Keep the change" (Quédese con el cambio) es muy común para pequeñas transacciones.'
      }
    ]
  },

  'A1.3': {
    subLevel: 'A1.3',
    unitNumber: 4,
    unitTitle: 'Family, Friends, Possessives & Descriptions',
    americanBookModule: 'Top Notch 1 - Unit 3: Extended Family',
    themeDescription: 'Miembros de la familia, el genitivo sajón (\'s possessive), adjetivos posesivos (his, her, our, their) y adjetivos básicos de personalidad y apariencia física.',
    keyGrammar: 'Possessive \'s (Carlos\'s car, my mother\'s house), Possessive adjectives (his/her/our/their), Have/has got.',
    keyVocabulary: 'Mother, father, brother, sister, parents, children, son, daughter, tall, short, young, friendly.',
    realWorldScenario: 'Compartir fotos familiares y describir a tus seres queridos y amigos a un colega extranjero.',
    sessions: [
      {
        sessionNumber: 1,
        title: 'Immediate Family: Padres y Hermanos',
        topic: 'Family Members',
        grammarFocus: 'Subject pronouns + family nouns',
        vocabFocus: 'Mother (mom), father (dad), brother, sister, parents',
        realLifeContext: 'Contar con quién vives o a quién visitas el fin de semana.',
        culturalNote: '"Mom" y "Dad" son las formas cariñosas más comunes en inglés estadounidense.'
      },
      {
        sessionNumber: 2,
        title: 'Possessive \'s: El Carro de Carlos',
        topic: 'The Saxon Genitive (\'s)',
        grammarFocus: 'Noun + \'s + noun (My sister\'s husband, John\'s office)',
        vocabFocus: 'Belonging, family tree, relationships',
        realLifeContext: 'Explicar de quién es un objeto o el parentesco de alguien.',
        culturalNote: 'Evita decir "the car of Carlos"; en inglés se dice siempre "Carlos\'s car".'
      },
      {
        sessionNumber: 3,
        title: 'His, Her, Our, Their: Posesivos Clave',
        topic: 'Possessive Adjectives',
        grammarFocus: 'His (de él), Her (de ella), Our (nuestro), Their (de ellos)',
        vocabFocus: 'His job, her house, our team, their children',
        realLifeContext: 'Hablar de las pertenencias y trabajos de otras personas.',
        culturalNote: 'No confundas "his" (de él) con "her" (de ella), error muy común entre hispanohablantes.'
      },
      {
        sessionNumber: 4,
        title: 'Extended Family: Tíos, Primos y Abuelos',
        topic: 'Extended Family',
        grammarFocus: 'Plural family terms (grandparents, cousins)',
        vocabFocus: 'Uncle, aunt, cousin, grandfather, grandmother, nephew, niece',
        realLifeContext: 'Platicar sobre las reuniones y fiestas familiares mexicanas.',
        culturalNote: 'En inglés "cousin" se usa tanto para primo como para prima.'
      },
      {
        sessionNumber: 5,
        title: 'Physical Appearance: Alto, Bajo, Cabello y Ojos',
        topic: 'Describing People (Looks)',
        grammarFocus: 'He has [adjective] hair / She is [adjective]',
        vocabFocus: 'Tall, short, dark hair, blonde, brown eyes, glasses',
        realLifeContext: 'Identificar a alguien en una foto o describirlo en un aeropuerto.',
        culturalNote: 'Se usa "He is tall" (con to be) pero "He has brown hair" (con have/has).'
      },
      {
        sessionNumber: 6,
        title: 'Personality Traits: Amable, Gracioso y Trabajador',
        topic: 'Personality Adjectives',
        grammarFocus: 'She is very [adjective], He is a bit [adjective]',
        vocabFocus: 'Friendly, funny, hardworking, smart, quiet, polite',
        realLifeContext: 'Dar una referencia sobre un candidato o hablar de un nuevo amigo.',
        culturalNote: '"Hardworking" y "reliable" (confiable) son adjetivos muy valorados en ambientes laborales de EE.UU.'
      },
      {
        sessionNumber: 7,
        title: 'Pets & Hobbies at Home: Mascotas y Vida Hogareña',
        topic: 'Pets & Home Life',
        grammarFocus: 'I have a dog / He has two cats',
        vocabFocus: 'Dog, cat, puppy, pet, living together',
        realLifeContext: 'Conversación casual sobre mascotas en un parque o reunión.',
        culturalNote: 'En EE.UU. las mascotas son consideradas parte integral de la familia ("fur babies").'
      },
      {
        sessionNumber: 8,
        title: 'Checkpoint Integrador: Álbum Familiar y Amigos',
        topic: 'Family Narrative Simulation',
        grammarFocus: 'Posesivos \'s + His/Her + Descripciones físicas y de personalidad',
        vocabFocus: 'Integración completa de familia, posesión y rasgos',
        realLifeContext: 'Presentar a tu familia en una cena o convivencia multicultural.',
        culturalNote: 'Mostrar fotos familiares en el celular es una excelente manera de romper el hielo (icebreaker).'
      }
    ]
  },

  'A1.4': {
    subLevel: 'A1.4',
    unitNumber: 5,
    unitTitle: 'Daily Routines, Time & The Simple Present',
    americanBookModule: 'American English File 1 - Unit 4: A Day in the Life',
    themeDescription: 'Rutinas diarias, horarios, días de la semana, la tercera persona singular (-s/-es), y preguntas con Do / Does.',
    keyGrammar: 'Simple Present (affirmative, negative, questions), Third-person singular rules, Prepositions of time (at 8:00, on Monday, in the morning).',
    keyVocabulary: 'Wake up, take a shower, eat breakfast, commute, work, go to bed, days of the week, morning/afternoon/night.',
    realWorldScenario: 'Describir tu jornada de trabajo o coordinar horarios para una junta con colegas en EE.UU.',
    sessions: [
      {
        sessionNumber: 1,
        title: 'Morning Routines: Despertar y Empezar el Día',
        topic: 'Daily Morning Habits',
        grammarFocus: 'I wake up, I brush my teeth, I have breakfast',
        vocabFocus: 'Wake up, get up, shower, breakfast, coffee, early',
        realLifeContext: 'Compartir cómo empieza tu día a día.',
        culturalNote: 'Diferencia clave: "wake up" (abrir los ojos) vs "get up" (levantarse de la cama).'
      },
      {
        sessionNumber: 2,
        title: 'Telling Time: What Time Is It?',
        topic: 'Telling Time in US English',
        grammarFocus: 'It is [time], at [time]',
        vocabFocus: 'O\'clock, half past, quarter to/after, AM, PM, noon, midnight',
        realLifeContext: 'Preguntar y responder la hora en la calle o estación.',
        culturalNote: 'En EE.UU. es muy común decir la hora digitalmente: "seven fifteen" en vez de "quarter past seven".'
      },
      {
        sessionNumber: 3,
        title: 'Third Person Singular: He works, She lives',
        topic: 'He/She/It Simple Present',
        grammarFocus: 'Adding -s / -es / -ies to verbs (plays, watches, studies, goes)',
        vocabFocus: 'Works, eats, sleeps, watches TV, drives to work',
        realLifeContext: 'Explicar la rutina de tu jefe, pareja o compañero.',
        culturalNote: 'La "s" de tercera persona es uno de los errores más comunes. ¡Practicarla da gran fluidez!'
      },
      {
        sessionNumber: 4,
        title: 'Days of the Week & Time Prepositions (In, On, At)',
        topic: 'Time Prepositions',
        grammarFocus: 'At 9:00 AM, On Friday, In the morning/evening, At night',
        vocabFocus: 'Monday through Sunday, weekend, weekday, schedule',
        realLifeContext: 'Agendar una videollamada o junta de trabajo.',
        culturalNote: 'Regla de oro: AT para horas específicas, ON para días/fechas, IN para meses/partes del día.'
      },
      {
        sessionNumber: 5,
        title: 'Questions with Do and Does: ¿A qué hora entras?',
        topic: 'Simple Present Questions',
        grammarFocus: 'Do you work...? / Does he work...?',
        vocabFocus: 'What time do you..., Where do you..., Do you usually...',
        realLifeContext: 'Entrevistar a alguien sobre sus hábitos de estudio o trabajo.',
        culturalNote: 'Con el auxiliar "Does", el verbo principal pierde la "s" ("Does she work here?", no "Does she works").'
      },
      {
        sessionNumber: 6,
        title: 'Adverbs of Frequency: Always, Usually, Never',
        topic: 'Frequency Adverbs',
        grammarFocus: 'Position: Subject + Adverb + Verb (I always drink coffee)',
        vocabFocus: 'Always, usually, often, sometimes, hardly ever, never',
        realLifeContext: 'Hablar de con qué frecuencia haces ejercicio o viajas.',
        culturalNote: 'El adverbio de frecuencia va antes del verbo principal, pero DESPUÉS del verbo To Be (I am always on time).'
      },
      {
        sessionNumber: 7,
        title: 'Commute & Transportation: Ir al Trabajo',
        topic: 'Commuting & Transit',
        grammarFocus: 'Take the bus, drive, ride a bike, walk, by car/train',
        vocabFocus: 'Traffic, highway, subway, commute, parking lot, gas station',
        realLifeContext: 'Platicar sobre el tráfico y cómo te trasladas a la oficina.',
        culturalNote: '"Commute" en EE.UU. engloba todo el trayecto de ida y vuelta de la casa al trabajo.'
      },
      {
        sessionNumber: 8,
        title: 'Checkpoint Integrador: Mi Día Típico',
        topic: 'Daily Routine Storytelling',
        grammarFocus: 'Presente Simple + Conectores (First, then, after that, finally)',
        vocabFocus: 'Integración completa de horarios, rutinas y frecuencia',
        realLifeContext: 'Describir tu balance de vida y trabajo a un nuevo contacto.',
        culturalNote: 'El concepto de "work-life balance" es un tema de conversación habitual en empresas americanas.'
      }
    ]
  },

  // A1.5 - A1.9
  'A1.5': {
    subLevel: 'A1.5',
    unitNumber: 6,
    unitTitle: 'Food, Dining Out & Mexican vs US Cuisine',
    americanBookModule: 'Touchstone 1 - Unit 6: Food & Restaurants',
    themeDescription: 'Comidas del día, sustantivos contables e incontables (some/any), ordenar en diners y drive-thrus en EE.UU., y vocabulario gastronómico.',
    keyGrammar: 'Countable vs Uncountable nouns, Some vs Any, Would like for ordering.',
    keyVocabulary: 'Breakfast, lunch, dinner, burger, fries, salad, water, soda, appetizer, main course, dessert.',
    realWorldScenario: 'Ordenar comida en un restaurante americano o explicar un platillo mexicano a un turista.',
    sessions: [
      { sessionNumber: 1, title: 'Meals of the Day & Breakfast Staples', topic: 'Breakfast & Meals', grammarFocus: 'Have for breakfast/lunch', vocabFocus: 'Pancakes, eggs, bacon, toast, cereal, orange juice', realLifeContext: 'Pedir desayuno en un hotel en EE.UU.', culturalNote: 'Los desayunos estadounidenses suelen incluir opciones dulces y saladas en el mismo plato.' },
      { sessionNumber: 2, title: 'Countable vs Uncountable Nouns', topic: 'Food Quantities', grammarFocus: 'An apple / Two apples vs Some water / Some bread', vocabFocus: 'Apples, burgers, rice, cheese, sugar, milk', realLifeContext: 'Hacer la lista de compras del supermercado.', culturalNote: '"Bread" y "cheese" son incontables en inglés; se dice "a slice of bread" o "some cheese".' },
      { sessionNumber: 3, title: 'Some & Any: ¿Hay algo de leche?', topic: 'Using Some & Any', grammarFocus: 'There is some... / Is there any...?', vocabFocus: 'Refrigerator, pantry, ingredients, grocery shopping', realLifeContext: 'Revisar qué ingredientes faltan en la cocina.', culturalNote: 'Usamos "some" en oraciones afirmativas y "any" en negativas y preguntas.' },
      { sessionNumber: 4, title: 'Ordering at a US Restaurant: Would Like', topic: 'Polite Ordering', grammarFocus: 'I would like (I\'d like) the steak, please', vocabFocus: 'Appetizer, entrée (plato fuerte), side dish, dessert, bill/check', realLifeContext: 'Cenar en un restaurante en EE.UU.', culturalNote: 'En EE.UU. el plato fuerte se llama "Entrée" (a diferencia de Francia donde significa entrada).' },
      { sessionNumber: 5, title: 'Drive-Thru Ordering & Fast Food Hacks', topic: 'Fast Food & Drive-Thru', grammarFocus: 'Can I get a number 2 combo? Make it large.', vocabFocus: 'Combo, meal, fries, soft drink, sauce, drive-thru window', realLifeContext: 'Pedir en el autoservicio de In-N-Out, Chick-fil-A o McDonald\'s.', culturalNote: 'En el drive-thru los micrófonos a veces tienen interferencia; habla claro y usa números de combo.' },
      { sessionNumber: 6, title: 'Explaining Mexican Food in English', topic: 'Mexican Cuisine in English', grammarFocus: 'It is made of..., It is similar to...', vocabFocus: 'Tacos, spicy, salsa, corn tortilla, guacamole, cilantro', realLifeContext: 'Recomendarle comida mexicana a un amigo extranjero.', culturalNote: 'En inglés se pronuncia "tacos" con /ɑ/ abierta y "guacamole" /ˌɡwɑːkəˈmoʊli/.' },
      { sessionNumber: 7, title: 'Dietary Preferences & Allergies', topic: 'Food Restrictions', grammarFocus: 'I am allergic to... / I don\'t eat...', vocabFocus: 'Vegetarian, vegan, gluten-free, peanuts, dairy, spicy', realLifeContext: 'Notificar al mesero sobre alergias o preferencias alimenticias.', culturalNote: 'En EE.UU. los restaurantes se toman muy en serio las alergias alimentarias.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Cena Completa con Clientes', topic: 'Full Dining Simulation', grammarFocus: 'Would like + Some/Any + Cortesía + Cuenta y propina', vocabFocus: 'Integración completa de restaurante y comida', realLifeContext: 'Llevar a un cliente a cenar y encargarte de toda la orden.', culturalNote: 'Saber pedir la cuenta ("Could we get the check, please?") demuestra dominio natural.' }
    ]
  },

  'A1.6': {
    subLevel: 'A1.6',
    unitNumber: 7,
    unitTitle: 'Places in the City, Navigation & Directions',
    americanBookModule: 'Interchange 1 - Unit 8: Around Town',
    themeDescription: 'Lugares de la ciudad, preposiciones de lugar (next to, across from, on the corner), y cómo pedir y dar direcciones en EE.UU.',
    keyGrammar: 'Prepositions of place (in front of, behind, between, on the corner of), Imperatives for directions (Turn left, Go straight).',
    keyVocabulary: 'Bank, pharmacy, gas station, supermarket, street, avenue, turn right, cross the street, block.',
    realWorldScenario: 'Orientarte en una ciudad estadounidense, tomar el transporte público o pedir indicaciones.',
    sessions: [
      { sessionNumber: 1, title: 'Places in the City: Banco, Farmacia y Tiendas', topic: 'City Buildings', grammarFocus: 'There is a [place] on [street]', vocabFocus: 'Bank, pharmacy, post office, library, gas station, park', realLifeContext: 'Buscar un cajero automático o farmacia en una ciudad.', culturalNote: 'En EE.UU. la farmacia ("pharmacy" / "drugstore" como CVS o Walgreens) vende de todo.' },
      { sessionNumber: 2, title: 'Prepositions of Place: Next to & Across from', topic: 'Spatial Prepositions', grammarFocus: 'The bank is next to the hotel / across from the station', vocabFocus: 'Next to, across from, between, behind, in front of', realLifeContext: 'Explicar dónde queda una tienda respecto a otra.', culturalNote: '"Across from" equivale a "enfrente de" o "cruzando la calle".' },
      { sessionNumber: 3, title: 'Giving Directions: Turn Left, Go Straight', topic: 'Imperatives for Navigation', grammarFocus: 'Turn left/right, Go straight for two blocks, Keep walking', vocabFocus: 'Turn, straight, corner, intersection, traffic light, block', realLifeContext: 'Guiar a un conductor de Uber o a un colega que viene en camino.', culturalNote: 'En EE.UU. las distancias en ciudades se miden por "blocks" (manzanas/cuadras).' },
      { sessionNumber: 4, title: 'Where is the Nearest...? Preguntar Direcciones', topic: 'Asking for Places', grammarFocus: 'Excuse me, where is the nearest...? / How do I get to...?', vocabFocus: 'Nearest, closest, walking distance, subway entrance', realLifeContext: 'Pedir ayuda a un peatón en Nueva York o Chicago.', culturalNote: 'Siempre inicia con "Excuse me, do you know where...?" para sonar cortés y natural.' },
      { sessionNumber: 5, title: 'Public Transportation: Subway, Bus & Rideshare', topic: 'City Transit', grammarFocus: 'Take the [line/train], get off at [station]', vocabFocus: 'Subway line, train, bus stop, platform, Uber, fare', realLifeContext: 'Moverte en el metro de Nueva York o tomar un autobús.', culturalNote: 'En EE.UU. se dice "subway" en NYC, "metro" en Washington DC, y "the L" en Chicago.' },
      { sessionNumber: 6, title: 'Airports & Terminals: Orientación de Vuelo', topic: 'Airport Layout', grammarFocus: 'Follow the signs for [Terminal/Gate]', vocabFocus: 'Gate, terminal, baggage claim, departures, arrivals, customs', realLifeContext: 'Hacer una conexión aérea en aeropuertos como Houston, Dallas o Atlanta.', culturalNote: '"Baggage claim" es la zona de reclamo de equipaje.' },
      { sessionNumber: 7, title: 'Neighborhoods & Landmarks: Lugares Icónicos', topic: 'City Landmarks', grammarFocus: 'Downtown, uptown, suburbs, landmark', vocabFocus: 'Downtown, main square, museum, skyscraper, mall', realLifeContext: 'Platicar sobre las zonas de la ciudad y recomendaciones turísticas.', culturalNote: '"Downtown" se refiere al centro financiero y de negocios de cualquier ciudad en EE.UU.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Llegar a tu Destino', topic: 'Navigation Simulation', grammarFocus: 'Imperativos + Preposiciones de lugar + Transporte', vocabFocus: 'Integración completa de direcciones y traslados urbanos', realLifeContext: 'Guiar a alguien paso a paso desde el aeropuerto hasta el hotel.', culturalNote: 'Utilizar puntos de referencia ("across from the gas station") facilita mucho la navegación.' }
    ]
  },

  'A1.7': {
    subLevel: 'A1.7',
    unitNumber: 8,
    unitTitle: 'Home, Furniture & Rooms in the House',
    americanBookModule: 'American English File 1 - Unit 7: House & Home',
    themeDescription: 'Habitaciones de la casa, muebles, electrodomésticos, y el uso de There is / There are.',
    keyGrammar: 'There is / There are (singular & plural), Some / Any with furniture, Prepositions (in, on, under).',
    keyVocabulary: 'Living room, kitchen, bedroom, bathroom, couch, table, bed, stove, fridge, closet.',
    realWorldScenario: 'Describir tu departamento, rentar un Airbnb en EE.UU. o reportar un problema al anfitrión.',
    sessions: [
      { sessionNumber: 1, title: 'Rooms of the House: Sala, Cocina y Recámara', topic: 'House Rooms', grammarFocus: 'In the living room, in the kitchen', vocabFocus: 'Living room, kitchen, bedroom, bathroom, backyard, garage', realLifeContext: 'Describir cómo es tu casa o departamento.', culturalNote: 'En EE.UU. "apartment" es el término común (en UK dicen "flat").' },
      { sessionNumber: 2, title: 'There Is vs There Are: ¿Qué hay en la sala?', topic: 'There is / There are', grammarFocus: 'There is a sofa / There are two chairs', vocabFocus: 'Sofa/couch, coffee table, TV, rug, lamp, window', realLifeContext: 'Verificar si un departamento amueblado tiene lo necesario.', culturalNote: '"Couch" y "sofa" se usan indistintamente en EE.UU., siendo "couch" muy común en habla coloquial.' },
      { sessionNumber: 3, title: 'Kitchen & Appliances: Refrigerador y Estufa', topic: 'Kitchen & Appliances', grammarFocus: 'There is a fridge, There is a microwave', vocabFocus: 'Refrigerator (fridge), stove, oven, microwave, dishwasher, sink', realLifeContext: 'Cocinar en un departamento rentado o comprar electrodomésticos.', culturalNote: 'La mayoría de los departamentos en EE.UU. incluyen estufa y refrigerador por ley.' },
      { sessionNumber: 4, title: 'Bedroom & Closet: Cama, Ropa y Espejo', topic: 'Bedroom Items', grammarFocus: 'Prepositions: under the bed, in the closet, on the nightstand', vocabFocus: 'Bed, pillows, blanket, closet, drawer, mirror, nightstand', realLifeContext: 'Acomodar tus cosas o pedir almohadas extras en un hotel.', culturalNote: 'Los tamaños de cama en EE.UU. son Twin (individual), Full (matrimonial), Queen y King.' },
      { sessionNumber: 5, title: 'Bathroom Essentials: Ducha y Toallas', topic: 'Bathroom Vocabulary', grammarFocus: 'Is there hot water? / Are there clean towels?', vocabFocus: 'Shower, toilet, sink, mirror, towel, soap, shampoo', realLifeContext: 'Pedir artículos de tocador a recepción o al anfitrión.', culturalNote: 'En lugares públicos en EE.UU. se le suele llamar "restroom" en vez de "bathroom".' },
      { sessionNumber: 6, title: 'Apartment Amenities: Estacionamiento y Gym', topic: 'Building Amenities', grammarFocus: 'The building has a pool / There is free parking', vocabFocus: 'Elevator, parking spot, pool, gym, laundry room, Wi-Fi', realLifeContext: 'Preguntar por las amenidades de un edificio o condominio.', culturalNote: '"Laundry room" es el cuarto de lavado común en muchos edificios de departamentos.' },
      { sessionNumber: 7, title: 'House Chores & Maintenance: Limpieza y Arreglos', topic: 'Chores & Maintenance', grammarFocus: 'The AC is not working / Can you fix the faucet?', vocabFocus: 'Air conditioning (AC), heater, leaky faucet, clean, fix', realLifeContext: 'Reportar una falla de aire acondicionado o plomería.', culturalNote: 'El aire acondicionado ("AC" /eɪ siː/) es omnipresente en el sur y calor de EE.UU.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Tour por el Hogar', topic: 'Home Tour Simulation', grammarFocus: 'There is/are + Preposiciones de lugar + Habitaciones y muebles', vocabFocus: 'Integración completa de vivienda y hospedaje', realLifeContext: 'Mostrarle tu hogar a visitas o evaluar un Airbnb para vacaciones.', culturalNote: 'Dar un tour por la casa a las visitas ("Make yourself at home") es una señal de calidez.' }
    ]
  },

  'A1.8': {
    subLevel: 'A1.8',
    unitNumber: 9,
    unitTitle: 'Hobbies, Sports, Abilities & Can/Can\'t',
    americanBookModule: 'Touchstone 1 - Unit 9: Free Time',
    themeDescription: 'Pasatiempos, deportes, actividades de fin de semana, el verbo modal Can/Can\'t para habilidades y permisos, y verbos de gusto (like, love, hate + -ing).',
    keyGrammar: 'Modal verb Can / Can\'t, Like / Love / Hate + Gerund (-ing), Play vs Go vs Do for sports.',
    keyVocabulary: 'Play soccer/basketball, play the guitar, swim, run, cook, read, can/can\'t, free time.',
    realWorldScenario: 'Hablar de tus gustos e intereses personales en una plática informal o perfil social.',
    sessions: [
      { sessionNumber: 1, title: 'What Do You Do for Fun? Pasatiempos', topic: 'Free Time & Hobbies', grammarFocus: 'In my free time, I like to [verb]', vocabFocus: 'Listen to music, watch movies, read books, travel, cook', realLifeContext: 'Conversación casual para conocer los intereses de alguien.', culturalNote: '"What do you do for fun?" es la forma más natural de preguntar por pasatiempos en EE.UU.' },
      { sessionNumber: 2, title: 'Can & Can\'t: Expresar Habilidades', topic: 'Modal Verb Can', grammarFocus: 'I can speak English / She can drive / Can you swim?', vocabFocus: 'Swim, drive, sing, dance, speak languages, fix things', realLifeContext: 'Mencionar qué sabes hacer en una entrevista o actividad grupal.', culturalNote: 'En inglés estadounidense "can\'t" suena con una /æ/ abierta y una T casi detenida (/kænt/).' },
      { sessionNumber: 3, title: 'Play, Go or Do? Deportes en Inglés', topic: 'Sports Collocations', grammarFocus: 'Play (con balón/equipo), Go (actividades -ing), Do (artes marciales/gimnasio)', vocabFocus: 'Play soccer/baseball, go swimming/running, do yoga/karate', realLifeContext: 'Platicar sobre tu rutina de ejercicio y deportes favoritos.', culturalNote: 'En EE.UU. "football" se refiere al fútbol americano (NFL), mientras que el balompié es "soccer".' },
      { sessionNumber: 4, title: 'Like, Love, Enjoy & Hate + Verb-ing', topic: 'Verbs of Preference', grammarFocus: 'I love cooking / I enjoy watching series / I hate waiting', vocabFocus: 'Love, enjoy, like, don\'t mind, dislike, hate', realLifeContext: 'Expresar tus preferencias y antipatías con naturalidad.', culturalNote: 'Después de "enjoy" siempre va el verbo con -ing ("I enjoy reading", no "I enjoy to read").' },
      { sessionNumber: 5, title: 'Weekend Plans: ¿Qué haces el fin de semana?', topic: 'Weekend Activities', grammarFocus: 'On weekends, I usually go to...', vocabFocus: 'Barbecue (BBQ), go out with friends, sleep in, relax, park', realLifeContext: 'Compartir tus planes de fin de semana con colegas.', culturalNote: '"Sleep in" significa levantarse tarde el fin de semana por gusto y descanso.' },
      { sessionNumber: 6, title: 'Music, Movies & Streaming: Entretenimiento', topic: 'Entertainment & Media', grammarFocus: 'My favorite genre is... / I am a fan of...', vocabFocus: 'Rock, pop, hip-hop, action movies, comedy, series, podcast', realLifeContext: 'Recomendar una película o serie de Netflix a un amigo.', culturalNote: '"Binge-watch" significa maratonear varios episodios de una serie seguidos.' },
      { sessionNumber: 7, title: 'Talents & Skills: ¿Qué tan bien lo haces?', topic: 'Degrees of Ability', grammarFocus: 'I am good at [verb-ing] / I am terrible at...', vocabFocus: 'Good at, great at, bad at, terrible at, fluent in', realLifeContext: 'Autoevaluar tus habilidades técnicas o sociales.', culturalNote: 'Recuerda: la preposición después de "good/bad" es "at" ("I am good at math").' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Perfil de Intereses', topic: 'Hobbies & Skills Narrative', grammarFocus: 'Can/Can\'t + Like/Love + -ing + Deportes y entretenimiento', vocabFocus: 'Integración completa de tiempo libre y habilidades', realLifeContext: 'Completar tu semblanza personal o participar en un juego de integración.', culturalNote: 'Tener pasatiempos en común es la forma más rápida de forjar amistades duraderas.' }
    ]
  },

  'A1.9': {
    subLevel: 'A1.9',
    unitNumber: 10,
    unitTitle: 'Weather, Seasons, Clothes & Present Continuous',
    americanBookModule: 'American English File 1 - Unit 10: What are you wearing?',
    themeDescription: 'El clima, las estaciones del año, prendas de vestir, y el Presente Continuo (acciones que suceden ahora mismo).',
    keyGrammar: 'Present Continuous (am/is/are + verb-ing), Present Simple vs Continuous, Wear vs Carry.',
    keyVocabulary: 'Sunny, rainy, cold, hot, jacket, jeans, t-shirt, dress, spring, summer, fall/autumn, winter.',
    realWorldScenario: 'Hablar del clima, empacar para un viaje a EE.UU. o describir qué está haciendo la gente ahora mismo.',
    sessions: [
      { sessionNumber: 1, title: 'What\'s the Weather Like? El Clima Hoy', topic: 'Weather Conditions', grammarFocus: 'It is sunny / It is raining / It is windy', vocabFocus: 'Sunny, cloudy, rainy, windy, snowy, hot, warm, cold', realLifeContext: 'Revisar el pronóstico del clima antes de salir.', culturalNote: 'En EE.UU. la temperatura se mide en grados Fahrenheit (°F), no Celsius (°C).' },
      { sessionNumber: 2, title: 'The Four Seasons: Primavera, Verano, Otoño e Invierno', topic: 'Seasons of the Year', grammarFocus: 'In the summer / In winter', vocabFocus: 'Spring, summer, fall (autumn), winter, season, temperature', realLifeContext: 'Planear vacaciones según la temporada del año.', culturalNote: 'En inglés estadounidense casi siempre se dice "fall" en lugar de "autumn".' },
      { sessionNumber: 3, title: 'Clothes & Outfits: Ropa de Diario y Formal', topic: 'Clothing Items', grammarFocus: 'I am wearing a [item] / She wears [clothes]', vocabFocus: 'Shirt, t-shirt, jeans, pants, jacket, suit, dress, shoes, sneakers', realLifeContext: 'Comprar ropa o vestirte según el código de vestimenta.', culturalNote: 'En EE.UU. a los tenis deportivos se les llama "sneakers" o "running shoes".' },
      { sessionNumber: 4, title: 'Present Continuous: Acciones en este Momento', topic: 'Present Continuous (Actions Now)', grammarFocus: 'Subject + am/is/are + verb-ing (I am studying, He is driving)', vocabFocus: 'Right now, at the moment, currently, today', realLifeContext: 'Explicar qué estás haciendo cuando te llaman por teléfono.', culturalNote: 'El Presente Continuo expresa lo que sucede en el instante mismo en que se habla.' },
      { sessionNumber: 5, title: 'Simple Present vs Continuous: ¿Rutina o Ahora?', topic: 'Simple vs Continuous Contrast', grammarFocus: 'I usually drink water, but today I am drinking coffee', vocabFocus: 'Usually vs Right now, Every day vs Today', realLifeContext: 'Distinguir entre tus hábitos diarios y lo que haces hoy.', culturalNote: 'Los verbos de estado (like, know, want) normalmente no se usan en continuo ("I want", no "I am wanting").' },
      { sessionNumber: 6, title: 'Packing for a Trip: La Maleta y el Clima', topic: 'Travel Packing & Clothes', grammarFocus: 'I need to pack a coat because it is freezing', vocabFocus: 'Luggage, suitcase, coat, umbrella, boots, sunglasses', realLifeContext: 'Preparar la maleta para viajar a Chicago en invierno o Miami en verano.', culturalNote: '"It\'s freezing" (está helando) e "It\'s boiling" (está hirviendo de calor) son expresiones muy comunes.' },
      { sessionNumber: 7, title: 'Describing a Picture: ¿Qué está haciendo la gente?', topic: 'Scene Description', grammarFocus: 'In this photo, the people are smiling and eating', vocabFocus: 'Sitting, standing, talking, walking, laughing, smiling', realLifeContext: 'Describir fotografías o escenas de una reunión.', culturalNote: 'En descripciones visuales siempre se usa el Presente Continuo.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador y Consolidación A1', topic: 'A1 Milestone Preparation', grammarFocus: 'Present Continuous + Simple Present + Clima y Ropa', vocabFocus: 'Integración completa del bloque A1 para el Examen de Hito', realLifeContext: 'Demostrar dominio completo de todos los fundamentos A1.', culturalNote: '¡Felicidades! Completar A1 te permite comunicarte en situaciones básicas del día a día.' }
    ]
  },

  // =========================================================================
  // A2: ELEMENTAL (VIAJES, EXPERIENCIAS Y COMUNICACIÓN COTIDIANA)
  // =========================================================================
  'A2.0': {
    subLevel: 'A2.0',
    unitNumber: 11,
    unitTitle: 'Past Simple & Irregular Verbs: Storytelling',
    americanBookModule: 'American English File 2 - Unit 1: Where are you from?',
    themeDescription: 'Pasado Simple con verbos regulares (-ed) e irregulares clave (was/were, went, saw, bought, had), y anécdotas de viajes pasados.',
    keyGrammar: 'Past Simple (affirmative, negative with didn\'t, questions with did), Past of To Be (was/were).',
    keyVocabulary: 'Yesterday, last week, ago, went, saw, bought, ate, drank, had, traveled.',
    realWorldScenario: 'Contar qué hiciste el fin de semana o en tus últimas vacaciones a un compañero extranjero.',
    sessions: [
      { sessionNumber: 1, title: 'Was & Were: El Pasado de To Be', topic: 'Past of To Be', grammarFocus: 'I was in Houston / We were tired / Were you at the meeting?', vocabFocus: 'Yesterday, last night, last year, at home, at the office', realLifeContext: 'Explicar dónde estuviste ayer o justificar una ausencia.', culturalNote: 'Con I, he, she, it usamos "was"; con you, we, they usamos "were".' },
      { sessionNumber: 2, title: 'Regular Verbs & Pronunciation of -ED', topic: 'Regular Past Verbs', grammarFocus: 'Worked /t/, Cleaned /d/, Wanted /ɪd/', vocabFocus: 'Walked, played, watched, started, decided, visited', realLifeContext: 'Pronunciar correctamente las terminaciones del pasado.', culturalNote: 'Solo pronunciamos la sílaba extra /ɪd/ cuando el verbo termina en sonido T o D (wanted, needed).' },
      { sessionNumber: 3, title: 'Top 20 Irregular Verbs in American English', topic: 'High-Frequency Irregular Verbs', grammarFocus: 'Go -> went, See -> saw, Have -> had, Buy -> bought', vocabFocus: 'Went, saw, bought, ate, took, made, came, gave, found', realLifeContext: 'Narrar compras y actividades pasadas con verbos clave.', culturalNote: 'Los verbos irregulares representan más del 70% de las conversaciones cotidianas en pasado.' },
      { sessionNumber: 4, title: 'Negations with Didn\'t: Lo que no pasó', topic: 'Negative Past Sentences', grammarFocus: 'Subject + didn\'t + base verb (I didn\'t go, She didn\'t call)', vocabFocus: 'Didn\'t know, didn\'t see, forgot, missed the flight', realLifeContext: 'Aclarar un malentendido sobre tareas o eventos no realizados.', culturalNote: 'Al usar "didn\'t", el verbo SIEMPRE regresa a su forma base ("I didn\'t buy", no "I didn\'t bought").' },
      { sessionNumber: 5, title: 'Questions with Did: ¿A dónde fuiste?', topic: 'Past Simple Questions', grammarFocus: 'Did you travel...? / Where did you go?', vocabFocus: 'Did you like it? How did you get there? When did you arrive?', realLifeContext: 'Preguntarle a alguien sobre su viaje o experiencia.', culturalNote: 'Las respuestas cortas naturales son: "Yes, I did" o "No, I didn\'t".' },
      { sessionNumber: 6, title: 'Time Expressions: Ago, Last & Yesterday', topic: 'Past Time Markers', grammarFocus: 'Two days ago, last month, yesterday afternoon', vocabFocus: 'An hour ago, two weeks ago, last summer, in 2022', realLifeContext: 'Precisar cuándo ocurrió exactamente un suceso.', culturalNote: '"Ago" siempre va AL FINAL del periodo de tiempo ("three years ago", hace tres años).' },
      { sessionNumber: 7, title: 'My Last Vacation: Anécdota de Viaje', topic: 'Vacation Stories', grammarFocus: 'Secuencia narrativa: First, Then, After that, But, So', vocabFocus: 'Flight, hotel, beach, sightseeing, souvenir, passport', realLifeContext: 'Platicar sobre tu viaje a Cancún, Los Ángeles o San Antonio.', culturalNote: '"Sightseeing" se refiere a visitar los monumentos y lugares turísticos de una ciudad.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Narración en Pasado', topic: 'Past Simple Masterclass', grammarFocus: 'Integración completa de regulares + irregulares + didn\'t + did', vocabFocus: 'Consolidación de anécdotas y experiencias pasadas', realLifeContext: 'Contar una historia completa y fluida en una comida con amigos.', culturalNote: 'El dominio del Pasado Simple es el puente que te lleva de principiante a hablante independiente.' }
    ]
  },

  'A2.1': {
    subLevel: 'A2.1',
    unitNumber: 12,
    unitTitle: 'Airports, Travel Check-in & Hotel Stays',
    americanBookModule: 'Touchstone 2 - Unit 2: Out of Town',
    themeDescription: 'Vocabulario de aeropuertos, aduanas e inmigración de EE.UU., reservaciones de hotel y cómo resolver inconvenientes de viaje.',
    keyGrammar: 'Can / Could for requests, Simple Past for travel experiences, Future with Going to for upcoming trips.',
    keyVocabulary: 'Boarding pass, carry-on, luggage, customs, gate, reservation, single/double room, check-in/out.',
    realWorldScenario: 'Pasar migración en el aeropuerto de EE.UU., hacer check-in en el hotel y pedir una habitación con vista.',
    sessions: [
      { sessionNumber: 1, title: 'At the Airport: Check-in & Boarding Pass', topic: 'Airport Check-in', grammarFocus: 'I would like to check in for flight...', vocabFocus: 'Boarding pass, window/aisle seat, carry-on, checked bag, passport', realLifeContext: 'Entregar tus maletas y elegir asiento en el mostrador de la aerolínea.', culturalNote: '"Aisle seat" se pronuncia /aɪl/ (la "s" es completamente muda).' },
      { sessionNumber: 2, title: 'US Customs & Border Control: Pasando Migración', topic: 'Immigration & Customs', grammarFocus: 'I am visiting for [business/tourism], I am staying for [days]', vocabFocus: 'Purpose of visit, length of stay, customs declaration, visa', realLifeContext: 'Responder con claridad y seguridad al oficial de CBP en EE.UU.', culturalNote: 'Responde siempre de forma breve, respetuosa y directa a las preguntas del oficial de aduanas.' },
      { sessionNumber: 3, title: 'Hotel Reservation: Llegada y Registro', topic: 'Hotel Check-in', grammarFocus: 'I have a reservation under the name of [Name]', vocabFocus: 'Reservation, room key, elevator, complimentary breakfast, Wi-Fi password', realLifeContext: 'Hacer el check-in en el hotel y solicitar la llave.', culturalNote: '"Complimentary" significa gratis o de cortesía (ej. complimentary breakfast).' },
      { sessionNumber: 4, title: 'Room Amenities & Special Requests', topic: 'Hotel Amenities', grammarFocus: 'Could we have extra towels? / Is room service available?', vocabFocus: 'King-size bed, view, non-smoking room, extra pillows, iron, hair dryer', realLifeContext: 'Llamar a la recepción para pedir lo que te haga falta.', culturalNote: 'En EE.UU. "non-smoking" es la regla casi universal en hoteles.' },
      { sessionNumber: 5, title: 'Luggage Troubles: Maletas Perdidas o Demoradas', topic: 'Lost Luggage Claims', grammarFocus: 'My suitcase did not arrive / It is a black rolling bag', vocabFocus: 'Baggage claim, lost and found, tracking number, claim form', realLifeContext: 'Reportar una maleta extraviada en el módulo de reclamo.', culturalNote: 'Describe tu maleta con precisión: "hard-shell suitcase", "with a blue tag".' },
      { sessionNumber: 6, title: 'Hotel Check-out & Bill Review', topic: 'Checking Out', grammarFocus: 'We would like to check out / Can I have a receipt?', vocabFocus: 'Check-out time, late check-out, minibar charges, luggage storage', realLifeContext: 'Pagar la cuenta del hotel y dejar las maletas antes de ir al aeropuerto.', culturalNote: '"Late check-out" permite quedarte unas horas extra en la habitación.' },
      { sessionNumber: 7, title: 'Car Rental & Road Travel in the US', topic: 'Car Rental', grammarFocus: 'I reserved a compact/SUV car / With insurance included', vocabFocus: 'Rental agreement, GPS, full tank, insurance coverage, toll road', realLifeContext: 'Rentar un auto en Enterprise, Hertz o Avis para recorrer EE.UU.', culturalNote: 'En EE.UU. la gasolina se vende por galones (gallons), no por litros.' },
      { sessionNumber: 8, title: 'Checkpoint Integrador: Misión Viaje a EE.UU.', topic: 'Full Travel Simulation', grammarFocus: 'Integración de Aeropuerto + Aduana + Hotel + Auto', vocabFocus: 'Vocabulario integral de viajes internacionales', realLifeContext: 'Completar una simulación de viaje internacional de punta a punta.', culturalNote: 'La seguridad y autonomía al viajar te abre un mundo de oportunidades personales y laborales.' }
    ]
  }
};

// Fallback generator for remaining sublevels to ensure 100% complete thematic coverage
export function getSubLevelTheme(subLevel: SubLevel): SubLevelTheme {
  if (THEMATIC_CURRICULUM[subLevel]) {
    return THEMATIC_CURRICULUM[subLevel];
  }

  const level = subLevel.substring(0, 2) as CEFRLevel;
  const subIdx = parseInt(subLevel.split('.')[1] || '0', 10);

  const levelThemesMap: Record<CEFRLevel, { unit: string; grammar: string; vocab: string; scenario: string }[]> = {
    A1: [
      { unit: 'Foundations & Greetings', grammar: 'Verb To Be & Pronouns', vocab: 'Greetings & Names', scenario: 'Conocer personas nuevas' },
      { unit: 'Identity & Flags', grammar: 'Nationalities & Jobs', vocab: 'Countries & Professions', scenario: 'Networking profesional' },
      { unit: 'Shopping & Cafés', grammar: 'Demonstratives & Prices', vocab: 'Numbers & Currency', scenario: 'Compras en EE.UU.' },
      { unit: 'Family & Friends', grammar: 'Possessives & Descriptions', vocab: 'Family & Traits', scenario: 'Convivencia social' },
      { unit: 'Daily Routines', grammar: 'Simple Present & Time', vocab: 'Routines & Habits', scenario: 'Organización diaria' },
      { unit: 'Food & Dining', grammar: 'Countable/Uncountable & Would Like', vocab: 'Restaurants & Meals', scenario: 'Cenar en restaurantes' },
      { unit: 'City Navigation', grammar: 'Prepositions & Imperatives', vocab: 'Places & Transit', scenario: 'Moverse en la ciudad' },
      { unit: 'Home & Rooms', grammar: 'There is/are & Furniture', vocab: 'Apartment & Appliances', scenario: 'Hospedaje y vivienda' },
      { unit: 'Hobbies & Sports', grammar: 'Can/Can\'t & Like + ing', vocab: 'Free Time & Talents', scenario: 'Pláticas informales' },
      { unit: 'Weather & Seasons', grammar: 'Present Continuous & Outfits', vocab: 'Seasons & Clothes', scenario: 'Planes climáticos' }
    ],
    A2: [
      { unit: 'Past Stories & Travel', grammar: 'Past Simple (Regular & Irregular)', vocab: 'Vacations & Anecdotes', scenario: 'Contar anécdotas pasadas' },
      { unit: 'Airports & Hotels', grammar: 'Modal Requests & Check-in', vocab: 'Boarding & Lodging', scenario: 'Viajes a EE.UU.' },
      { unit: 'Health & Doctor Visits', grammar: 'Should / Ought to & Symptoms', vocab: 'Medicine & Body Parts', scenario: 'Consultas médicas' },
      { unit: 'Shopping for Clothes', grammar: 'Comparatives (-er, more than)', vocab: 'Sizes & Returns', scenario: 'Tiendas departamentales' },
      { unit: 'Future Plans & Goals', grammar: 'Going to vs Will', vocab: 'Projects & Predictions', scenario: 'Planear proyectos' },
      { unit: 'Past Continuous & Emergencies', grammar: 'Past Continuous with While/When', vocab: 'Accidents & News', scenario: 'Reportar incidentes' },
      { unit: 'Superlatives & Travel Wonders', grammar: 'The most / -est', vocab: 'Geography & Tourism', scenario: 'Elegir el mejor destino' },
      { unit: 'House Chores & Rules', grammar: 'Have to / Must / Don\'t have to', vocab: 'Obligations & Duties', scenario: 'Reglas de convivencia' },
      { unit: 'Present Perfect Experiences', grammar: 'Have you ever...? / Never', vocab: 'Milestones & Bucket list', scenario: 'Entrevistas de vida' },
      { unit: 'A2 Final Consolidation', grammar: 'Review of A2 Grammar Structures', vocab: 'Comprehensive A2 Vocabulary', scenario: 'Examen de Certificación A2' }
    ],
    B1: [
      { unit: 'Travel Abroad & Customs', grammar: 'Present Perfect vs Past Simple', vocab: 'Culture & Etiquette', scenario: 'Intercambio cultural' },
      { unit: 'Tech & Social Media', grammar: 'Passive Voice in Technology', vocab: 'Apps & Cybersecurity', scenario: 'Uso de herramientas digitales' },
      { unit: 'Job Interviews & Resumes', grammar: 'Present Perfect Continuous', vocab: 'Careers & Achievements', scenario: 'Entrevistas de trabajo' },
      { unit: 'Hypothetical Scenarios', grammar: 'Second Conditional (If I had...)', vocab: 'Imagination & Decisions', scenario: 'Negociaciones hipotéticas' },
      { unit: 'Environment & Climate', grammar: 'Cause & Effect Linking Words', vocab: 'Sustainability & Ecology', scenario: 'Debates ambientales' },
      { unit: 'Giving Advice & Diplomatic Requests', grammar: 'Modal verbs of deduction & advice', vocab: 'Tactful Communication', scenario: 'Resolución de conflictos' },
      { unit: 'Movies & Cultural Reviews', grammar: 'Relative Clauses (who, which, that)', vocab: 'Cinema & Critique', scenario: 'Reseñas culturales' },
      { unit: 'Business Emails & Calls', grammar: 'Reported Speech & Formal Phrasing', vocab: 'Corporate Etiquette', scenario: 'Correspondencia comercial' },
      { unit: 'First & Zero Conditionals', grammar: 'Conditionals with Unless & As long as', vocab: 'Agreements & Terms', scenario: 'Condiciones de servicio' },
      { unit: 'B1 Fluency Consolidation', grammar: 'Integrated B1 Grammar & Discourse', vocab: 'Independent English Mastery', scenario: 'Certificación B1' }
    ],
    B2: [
      { unit: 'Corporate Negotiations', grammar: 'Third Conditional & Mixed Conditionals', vocab: 'Business Strategy & M&A', scenario: 'Cierre de contratos' },
      { unit: 'Past Deductions', grammar: 'Must have, Could have, Should have', vocab: 'Analysis & Hypotheses', scenario: 'Investigación de incidentes' },
      { unit: 'Advanced Essays & Reports', grammar: 'Cohesive Devices & Discourse Markers', vocab: 'Academic Writing', scenario: 'Informes ejecutivos' },
      { unit: 'US-Mexico Bilateral Trade', grammar: 'Passive Reporting & Formal Register', vocab: 'Logistics & Nearshoring', scenario: 'Comercio binacional' },
      { unit: 'Handling Difficult Clients', grammar: 'Tactful Language & De-escalation', vocab: 'Customer Experience', scenario: 'Atención a clientes VIP' },
      { unit: 'Fast Native Audio & Podcasts', grammar: 'Connected Speech & Assimilation', vocab: 'Idiomatic Expressions', scenario: 'Conferencias en vivo' },
      { unit: 'American Slang & Humor', grammar: 'Colloquial Registers & Irony', vocab: 'Pop Culture & Metaphors', scenario: 'Convivencia informal de alto nivel' },
      { unit: 'Emphasis & Cleft Sentences', grammar: 'What we need is... / It was X that...', vocab: 'Executive Persuasion', scenario: 'Discursos de impacto' },
      { unit: 'Data Storytelling & Pitches', grammar: 'Describing Trends & Projections', vocab: 'Analytics & KPIs', scenario: 'Presentaciones ante inversionistas' },
      { unit: 'B2 Professional Mastery', grammar: 'Advanced Syntax & Stylistics', vocab: 'Executive Vocabulary', scenario: 'Certificación B2 Pro' }
    ],
    C1: [
      { unit: 'Negative Inversion & High Rhetoric', grammar: 'Never before had..., Scarcely had...', vocab: 'Diplomacy & Public Policy', scenario: 'Oratoria de alto impacto' },
      { unit: 'The English Subjunctive', grammar: 'Mandative Subjunctive (I insist that he be...)', vocab: 'Governance & Compliance', scenario: 'Normativas institucionales' },
      { unit: 'Advanced Collocations', grammar: 'Nuanced Lexical Combinations', vocab: 'Finance & Venture Capital', scenario: 'Estrategia corporativa' },
      { unit: 'High-Level Debate & Oratory', grammar: 'Counter-argumentation Structures', vocab: 'Philosophy & Logic', scenario: 'Debates competitivos' },
      { unit: 'Legal English & Contracts', grammar: 'Legal Passives & Modals of Obligation', vocab: 'Jurisprudence & Clauses', scenario: 'Revisión contractual' },
      { unit: 'American Regional Dialects', grammar: 'Phonetic & Dialectal Variations', vocab: 'Southern, NYC, West Coast', scenario: 'Comunicación regional' },
      { unit: 'Leadership & Team Influence', grammar: 'Pragmatic Competence & Framing', vocab: 'Executive Mentorship', scenario: 'Liderazgo global' },
      { unit: 'Contemporary Literature & Media', grammar: 'Complex Syntactic Parsing', vocab: 'Literary & Critical Prose', scenario: 'Análisis editorial' },
      { unit: 'Executive Metaphors & Idioms', grammar: 'Metaphorical Mapping in Business', vocab: 'C-Suite Colloquialisms', scenario: 'Juntas directivas' },
      { unit: 'C1 Operational Mastery', grammar: 'Full Advanced Structural Mastery', vocab: 'Near-Native Precision', scenario: 'Certificación C1' }
    ],
    C2: [
      { unit: 'Stylistic Nuances & Satire', grammar: 'Subtle Irony & Register Shifts', vocab: 'High Cultural Satire', scenario: 'Crítica cultural' },
      { unit: 'Diplomatic Speeches & Whitepapers', grammar: 'Formal Policy Syntax', vocab: 'Geopolitics & Treaties', scenario: 'Foros internacionales' },
      { unit: 'Native Phonetic Mastery', grammar: 'Total Prosodic & Intonation Control', vocab: 'Accent Neutralization', scenario: 'Locución y doblaje' },
      { unit: 'Simultaneous Interpretation', grammar: 'Real-Time Syntactic Transposition', vocab: 'Bilingual Lexicon US-MEX', scenario: 'Traducción simultánea' },
      { unit: 'Media Analysis & Discourse', grammar: 'Critical Discourse Analysis', vocab: 'Political Science & Rhetoric', scenario: 'Panel de expertos' },
      { unit: 'Comparative Jurisprudence', grammar: 'Statutory Interpretation Syntax', vocab: 'Common Law vs Civil Law', scenario: 'Litigio internacional' },
      { unit: 'M&A International Negotiations', grammar: 'High-Stakes Diplomatic Phrasing', vocab: 'Investment Banking', scenario: 'Fusiones y adquisiciones' },
      { unit: 'Academic Research Publishing', grammar: 'Peer-Reviewed Journal Syntax', vocab: 'Empirical Epistemology', scenario: 'Artículos científicos' },
      { unit: 'Extreme Register Mastery', grammar: 'Slang to Archaic/Diplomatic Range', vocab: 'Total Sociolinguistic Spectrum', scenario: 'Dominio absoluto de registro' },
      { unit: 'C2 Bilingual Native Mastery', grammar: 'Comprehensive C2 Native Proficiency', vocab: 'Mastery Lexicon', scenario: 'Graduación y Título C2' }
    ]
  };

  const pool = levelThemesMap[level] || levelThemesMap.A1;
  const themeInfo = pool[subIdx % pool.length];

  const sessions: ThematicSessionPlan[] = [];
  for (let s = 1; s <= 8; s++) {
    sessions.push({
      sessionNumber: s,
      title: `Sesión ${s}: ${themeInfo.unit} (Enfoque ${s})`,
      topic: `${themeInfo.unit} - Parte ${s}`,
      grammarFocus: `${themeInfo.grammar} (Módulo ${s})`,
      vocabFocus: `${themeInfo.vocab} y colocaciones prácticas`,
      realLifeContext: `${themeInfo.scenario} en entornos reales`,
      culturalNote: 'Enfoque conversacional del inglés estadounidense estándar.'
    });
  }

  return {
    subLevel,
    unitNumber: subIdx + 1,
    unitTitle: `Unidad ${subIdx + 1}: ${themeInfo.unit}`,
    americanBookModule: `American English Coursebook ${level} - Unit ${subIdx + 1}`,
    themeDescription: `Dominio práctico de ${themeInfo.unit.toLowerCase()} con gramática aplicada de ${themeInfo.grammar.toLowerCase()}.`,
    keyGrammar: themeInfo.grammar,
    keyVocabulary: themeInfo.vocab,
    realWorldScenario: themeInfo.scenario,
    sessions
  };
}
