import React, { useState, useEffect } from 'react';
import { 
  Award, X, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CEFRLevel, UserProfile } from '../types';
import { LEVEL_TIERS } from '../data/curriculum';
import { sound, playUSEnglishVoice, shuffleArray } from '../utils/audio';

interface MilestoneExamModalProps {
  initialLevel: CEFRLevel;
  profile: UserProfile;
  onPassExam: (levelPassed: CEFRLevel) => void;
  onClose: () => void;
}

export interface MilestoneQuestion {
  discipline: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

// Master question pool for milestone certification (10 questions per level from which 5 random are drawn)
const MASTER_MILESTONE_POOLS: Record<CEFRLevel, MilestoneQuestion[]> = {
  A1: [
    {
      discipline: 'Writing & Grammar',
      question: 'Selecciona la opción correcta: "Where ___ you from?"',
      options: ['is', 'are', 'am', 'be'],
      correct: 'are',
      explanation: 'En inglés estadounidense, con el pronombre "you" siempre se conjuga "are".'
    },
    {
      discipline: 'Listening & Vocab',
      question: '¿Qué significa la expresión cotidiana estadounidense: "What\'s up?"',
      options: ['¿Qué hay arriba?', '¿Cómo estás? / ¿Qué onda?', '¿A qué hora?', '¿Dónde está el techo?'],
      correct: '¿Cómo estás? / ¿Qué onda?',
      explanation: 'Es el saludo informal más común en EE.UU., equivalente directo a "¿Qué onda?" o "¿Qué tal?".'
    },
    {
      discipline: 'Reading Comprehension',
      question: 'Lees en un letrero: "Cash Only". ¿Qué significa?',
      options: ['Se aceptan todas las tarjetas', 'Solo dinero en efectivo', 'Cajero automático', 'Caja cerrada'],
      correct: 'Solo dinero en efectivo',
      explanation: '"Cash" significa dinero en efectivo ("efectivo" / "lana").'
    },
    {
      discipline: 'Speaking & Pronunciation',
      question: 'En US English, ¿cómo suena comúnmente la letra "T" intermedia en "water" o "bottle"?',
      options: ['Como una "T" fuerte española', 'Como una "R" suave mexicana (Flap T)', 'Es completamente muda', 'Como una "S"'],
      correct: 'Como una "R" suave mexicana (Flap T)',
      explanation: 'La "Flap T" suena casi idéntica a la "R" suave en palabras como "pero" o "caro".'
    },
    {
      discipline: 'Writing Structure',
      question: '¿Cuál es la forma correcta para decir "Tengo 25 años" en inglés?',
      options: ['I have 25 years', 'I am 25 years old', 'I got 25 years', 'I possess 25 years'],
      correct: 'I am 25 years old',
      explanation: 'En inglés la edad se expresa con el verbo "to be" (I am), nunca con "have".'
    },
    {
      discipline: 'Grammar & Negation',
      question: 'Selecciona la forma negativa correcta: "She ___ like spicy food."',
      options: ['doesn\'t', 'don\'t', 'isn\'t', 'not'],
      correct: 'doesn\'t',
      explanation: 'Para la 3ra persona singular (he/she/it) en presente simple se usa "doesn\'t".'
    },
    {
      discipline: 'Daily Vocab',
      question: '¿Cómo pides educadamente un vaso de agua en un restaurante?',
      options: ['Give me water', 'Can I get a glass of water, please?', 'I want water now', 'Bring water'],
      correct: 'Can I get a glass of water, please?',
      explanation: '"Can I get... please?" es la forma cordial estándar más común en EE.UU.'
    },
    {
      discipline: 'Reading Comprehension',
      question: 'Lees en una puerta: "Push". ¿Qué debes hacer para abrirla?',
      options: ['Empujar', 'Jalar hacia ti', 'Tocar el timbre', 'Girar a la derecha'],
      correct: 'Empujar',
      explanation: '"Push" significa empujar; "Pull" significa jalar.'
    },
    {
      discipline: 'Pronouns & Possessives',
      question: 'Completa: "This is my brother. ___ name is Carlos."',
      options: ['His', 'Her', 'Their', 'Your'],
      correct: 'His',
      explanation: 'Para el posesivo masculino singular ("de él") se utiliza "His".'
    },
    {
      discipline: 'Time & Numbers',
      question: 'Si son las 3:30, ¿cómo se dice comúnmente en inglés estadounidense?',
      options: ['Three thirty / Half past three', 'Three half', 'Thirty three', 'Half to three'],
      correct: 'Three thirty / Half past three',
      explanation: '"Three thirty" o "half past three" son las expresiones estándar para las 3:30.'
    }
  ],
  A2: [
    {
      discipline: 'Grammar (Past Simple)',
      question: 'Completa en pasado: "Yesterday, I ___ tacos with my friends."',
      options: ['eat', 'eated', 'ate', 'eating'],
      correct: 'ate',
      explanation: '"Ate" es el pasado irregular de "eat".'
    },
    {
      discipline: 'Conversational US',
      question: 'En un restaurante estadounidense el mesero pregunta: "For here or to go?". ¿Qué significa?',
      options: ['¿Para aquí o para llevar?', '¿Vas a pagar ya?', '¿Estás esperando a alguien?', '¿Quieres postre?'],
      correct: '¿Para aquí o para llevar?',
      explanation: '"To go" es la forma estándar estadounidense para pedir comida para llevar.'
    },
    {
      discipline: 'Listening & Context',
      question: 'Si alguien te dice "Take it easy", te está diciendo:',
      options: ['Tómalo con la mano', 'Cálmate / Llévatela leve / Que te vaya bien', 'Está muy fácil', 'Apúrate'],
      correct: 'Cálmate / Llévatela leve / Que te vaya bien',
      explanation: 'Expresión informal muy usada para despedirse o calmar los ánimos.'
    },
    {
      discipline: 'Modal Verbs',
      question: '¿Cuál oración expresa una obligación?',
      options: ['You might go', 'You should go', 'You must have a passport', 'You could go'],
      correct: 'You must have a passport',
      explanation: '"Must" o "have to" denotan obligación estricta.'
    },
    {
      discipline: 'Reading Notice',
      question: 'Un letrero dice: "No jaywalking allowed". ¿A qué se refiere?',
      options: ['Prohibido fumar', 'Prohibido cruzar la calle por lugares no peatonales', 'Prohibido estacionarse', 'Prohibido patinar'],
      correct: 'Prohibido cruzar la calle por lugares no peatonales',
      explanation: '"Jaywalking" es cruzar la calle imprudentemente fuera del paso peatonal.'
    },
    {
      discipline: 'Comparative Adjectives',
      question: 'Completa la comparación: "Chicago is ___ than Austin."',
      options: ['more cold', 'colder', 'coldest', 'more colder'],
      correct: 'colder',
      explanation: 'Los adjetivos cortos de una sílaba forman el comparativo con el sufijo "-er" (colder).'
    },
    {
      discipline: 'Past Continuous',
      question: 'Completa: "I ___ a movie when you called me."',
      options: ['was watching', 'watched', 'were watching', 'am watching'],
      correct: 'was watching',
      explanation: 'Para una acción continua interrumpida en el pasado se usa el Past Continuous ("was watching").'
    },
    {
      discipline: 'Prepositions of Place',
      question: '¿Cuál preposición es correcta? "I will meet you ___ the airport."',
      options: ['at', 'on', 'to', 'into'],
      correct: 'at',
      explanation: 'Para puntos de encuentro o ubicaciones específicas se usa "at".'
    },
    {
      discipline: 'Daily Situations',
      question: 'En una tienda en EE.UU., el cajero pregunta: "Did you find everything okay?". ¿Qué responde un cliente satisfecho?',
      options: ['Yes, thank you!', 'I am not fine', 'Where is it?', 'Nothing'],
      correct: 'Yes, thank you!',
      explanation: '"Yes, thank you!" o "Yes, I did, thanks!" es la respuesta cortés habitual.'
    },
    {
      discipline: 'Future Intentions',
      question: 'Selecciona la frase correcta para un plan decidido: "We ___ visit our cousins next week."',
      options: ['are going to', 'go to', 'will going', 'going to'],
      correct: 'are going to',
      explanation: '"Be going to" se usa para planes futuros predeterminados.'
    }
  ],
  B1: [
    {
      discipline: 'Conditionals',
      question: 'Completa el segundo condicional: "If I won the lottery, I ___ buy a house in San Antonio."',
      options: ['will', 'would', 'can', 'shall'],
      correct: 'would',
      explanation: 'El 2do condicional utiliza "If + past simple" junto con "would + infinitive".'
    },
    {
      discipline: 'US Business Context',
      question: 'Tu jefe en EE.UU. dice: "Let\'s touch base on Monday". ¿Qué significa?',
      options: ['Vamos a jugar béisbol', 'Vamos a ponernos de acuerdo / platicar brevemente el lunes', 'Lleguemos a la base militar', 'Cancelemos todo'],
      correct: 'Vamos a ponernos de acuerdo / platicar brevemente el lunes',
      explanation: '"Touch base" es una metáfora laboral clásica en EE.UU. para tener una reunión breve de actualización.'
    },
    {
      discipline: 'Writing Clarity',
      question: 'Selecciona la frase gramaticalmente correcta y formal:',
      options: ['I look forward to hearing from you.', 'I look forward to hear from you.', 'I looking forward to hear you.', 'I look forward for your hear.'],
      correct: 'I look forward to hearing from you.',
      explanation: 'La estructura requiere gerundio después de la preposición: "look forward to + V-ing".'
    },
    {
      discipline: 'Listening & Nuance',
      question: 'En inglés estadounidense, "I could care less" se usa coloquialmente para significar:',
      options: ['Me importa muchísimo', 'Me da exactamente igual / No me importa nada', 'Tengo mucho cuidado', 'Debo preocuparme más'],
      correct: 'Me da exactamente igual / No me importa nada',
      explanation: 'Aunque literalmente es contradictoria, en la cultura estadounidense coloquial significa "no me importa en lo absoluto".'
    },
    {
      discipline: 'Reading Analysis',
      question: '"The deadline has been pushed back to Friday." ¿Qué pasó con la fecha límite?',
      options: ['Se adelantó', 'Se pospuso / aplazó para el viernes', 'Se canceló el proyecto', 'Venció hoy'],
      correct: 'Se pospuso / aplazó para el viernes',
      explanation: '"To push back" significa posponer o dar más plazo.'
    },
    {
      discipline: 'Present Perfect vs Past Simple',
      question: 'Completa: "I have lived in Dallas ___ five years."',
      options: ['for', 'since', 'during', 'from'],
      correct: 'for',
      explanation: 'Se usa "for" para periodos de duración (five years) y "since" para puntos de partida específicos.'
    },
    {
      discipline: 'Passive Voice',
      question: 'Convierte a voz pasiva: "They built the bridge in 1995."',
      options: ['The bridge was built in 1995.', 'The bridge built in 1995.', 'The bridge is built in 1995.', 'The bridge has built in 1995.'],
      correct: 'The bridge was built in 1995.',
      explanation: 'En pasado simple pasivo se usa "was/were + participio pasado" (was built).'
    },
    {
      discipline: 'Reported Speech',
      question: 'Ella dijo: "I am working on the report." En estilo indirecto (reported speech) se expresa:',
      options: ['She said she was working on the report.', 'She said she is working on the report.', 'She said she had worked on the report.', 'She says she was working.'],
      correct: 'She said she was working on the report.',
      explanation: 'En estilo indirecto en pasado, "am working" pasa a "was working".'
    },
    {
      discipline: 'Phrasal Verbs',
      question: 'En una oficina, "call off the meeting" significa:',
      options: ['Cancelar la reunión', 'Posponer la reunión', 'Grabar la reunión', 'Iniciar la reunión'],
      correct: 'Cancelar la reunión',
      explanation: '"Call off" significa cancelar definitivamente; "Put off" significa posponer.'
    },
    {
      discipline: 'Discourse Markers',
      question: '¿Cuál conector expresa contraste formal?',
      options: ['However', 'Furthermore', 'Therefore', 'In addition'],
      correct: 'However',
      explanation: '"However" (sin embargo) introduce una idea contrastante.'
    }
  ],
  B2: [
    {
      discipline: 'Advanced Inversion',
      question: 'Elige la inversión formal: "Rarely ___ such dedication."',
      options: ['I have seen', 'have I seen', 'did I saw', 'I saw'],
      correct: 'have I seen',
      explanation: 'Con adverbios negativos al inicio (Rarely, Seldom, Never), se aplica inversión auxiliar-sujeto.'
    },
    {
      discipline: 'US Colloquial Metaphor',
      question: '"We are cutting corners on this project." ¿Qué significa?',
      options: ['Estamos podando esquinas', 'Estamos tomando atajos o sacrificando calidad por ahorrar costos', 'Vamos a tiempo', 'Estamos construyendo un edificio'],
      correct: 'Estamos tomando atajos o sacrificando calidad por ahorrar costos',
      explanation: '"Cut corners" significa ahorrar dinero o esfuerzo a costa de la calidad.'
    },
    {
      discipline: 'Subjunctive Mood',
      question: '"The manager insisted that he ___ on time for the quarterly review."',
      options: ['is', 'was', 'be', 'were'],
      correct: 'be',
      explanation: 'En US English, se utiliza el subjuntivo con la forma base del verbo (that he be).'
    },
    {
      discipline: 'Listening Nuance',
      question: '¿Qué connota decir "Take it with a grain of salt"?',
      options: ['Agrégale sal a la comida', 'No te lo tomes tan en serio / tómalo con reservas o escepticismo', 'Es un hecho 100% comprobado', 'Es algo muy amargo'],
      correct: 'No te lo tomes tan en serio / tómalo con reservas o escepticismo',
      explanation: 'Significa ser escéptico o no creerse todo lo que se dice al pie de la letra.'
    },
    {
      discipline: 'Reading Pragmatics',
      question: '"The initiative is in jeopardy due to supply chain bottlenecks." ¿Qué significa "in jeopardy"?',
      options: ['En concurso de televisión', 'En grave peligro o riesgo', 'Completamente seguro', 'En fase de pruebas exitosa'],
      correct: 'En grave peligro o riesgo',
      explanation: '"In jeopardy" significa estar en riesgo o peligro inminente de fracaso.'
    },
    {
      discipline: 'Mixed Conditionals',
      question: 'Completa: "If she had taken that job in Seattle, she ___ a director today."',
      options: ['would be', 'would have been', 'will be', 'had been'],
      correct: 'would be',
      explanation: 'Condicional mixto: condición pasada con consecuencia en el presente ("would be today").'
    },
    {
      discipline: 'Cleft Sentences',
      question: 'Identifica la oración enfática (cleft sentence) correcta:',
      options: ['What we need most is clear communication.', 'That we need is communication.', 'Which we need is communication.', 'The thing what we need is communication.'],
      correct: 'What we need most is clear communication.',
      explanation: '"What + clause + is..." es la estructura estándar de una pseudo-cleft sentence.'
    },
    {
      discipline: 'Collocations & Precision',
      question: 'Selecciona la combinación natural de palabras en inglés profesional:',
      options: ['make a decision', 'do a decision', 'take a decision', 'perform a decision'],
      correct: 'make a decision',
      explanation: 'En inglés estadounidense estándar se dice "make a decision".'
    },
    {
      discipline: 'Idiomatic Nuances',
      question: 'Si alguien dice "The ball is in your court", significa:',
      options: ['Es tu turno de tomar una decisión o actuar', 'El juego de tenis comenzó', 'Perdiste el juego', 'Debes regresar el balón'],
      correct: 'Es tu turno de tomar una decisión o actuar',
      explanation: 'Metáfora que significa que la responsabilidad de la siguiente acción recae sobre ti.'
    },
    {
      discipline: 'Register & Tone',
      question: '¿Cuál opción tiene el tono más profesional para declinar una oferta laboral?',
      options: ['Thank you for the offer, but I have decided to pursue another opportunity.', 'I don\'t want this job, bye.', 'No thanks, your offer is too low.', 'Forget about my resume.'],
      correct: 'Thank you for the offer, but I have decided to pursue another opportunity.',
      explanation: 'Mantiene una cortesía impecable, asertividad y registro corporativo adecuado.'
    }
  ],
  C1: [
    {
      discipline: 'Nuanced Register',
      question: '¿Cuál opción sustituye con mayor precisión formal a "The results show that..." en un reporte académico?',
      options: ['The findings corroborate that...', 'The numbers tell like...', 'The data points out big things that...', 'The results look nice that...'],
      correct: 'The findings corroborate that...',
      explanation: '"Corroborate" expresa validación rigurosa de evidencia con registro C1.'
    },
    {
      discipline: 'US Idiomatic Mastery',
      question: '"He decided to bite the bullet and resign." ¿Qué hizo?',
      options: ['Mordió una bala real', 'Afrontó con valentía una situación difícil e inevitable', 'Disparó un arma', 'Huyó sin avisar'],
      correct: 'Afrontó con valentía una situación difícil e inevitable',
      explanation: '"Bite the bullet" proviene de soportar el dolor y encarar algo inevitable con entereza.'
    },
    {
      discipline: 'Advanced Grammar',
      question: '"Had it not been for your guidance, we ___ the quarterly target."',
      options: ['would not meet', 'would not have met', 'had not met', 'will not meet'],
      correct: 'would not have met',
      explanation: 'Condicional mixto/tercero invertido formal.'
    },
    {
      discipline: 'Phonetic Intonation',
      question: 'En un discurso estadounidense de alto nivel, la entonación descendente (falling intonation) al final de una frase aseverativa transmite:',
      options: ['Inseguridad y duda', 'Certeza, autoridad y conclusión de idea', 'Una pregunta abierta', 'Sarcasmo'],
      correct: 'Certeza, autoridad y conclusión de idea',
      explanation: 'La caída de tono marca contundencia y conclusión en la retórica US.'
    },
    {
      discipline: 'Complex Synthesis',
      question: 'Identifica el antónimo más preciso de "ubiquitous":',
      options: ['Pervasive', 'Omnipresent', 'Scarce / Rare', 'Inconspicuous'],
      correct: 'Scarce / Rare',
      explanation: '"Ubiquitous" significa presente en todas partes; lo opuesto es escaso o raro.'
    },
    {
      discipline: 'Participle Clauses',
      question: 'Selecciona la cláusula de participio elegante: "Having concluded the audit, ___."',
      options: ['the team submitted their comprehensive report', 'the report was submitted by the team quickly', 'it was submitted the report', 'submitting the report was done'],
      correct: 'the team submitted their comprehensive report',
      explanation: 'El sujeto del participio ("the team") debe coincidir con el sujeto de la cláusula principal (dangling modifier prevention).'
    },
    {
      discipline: 'Advanced Inversion',
      question: 'Elige la estructura correcta: "Not only ___ the revenue target, but they also expanded market share."',
      options: ['did they surpass', 'they surpassed', 'they did surpass', 'surpassed they'],
      correct: 'did they surpass',
      explanation: 'Tras "Not only" al inicio de oración se realiza inversión con auxiliar (did they surpass).'
    },
    {
      discipline: 'Subtle Rhetoric',
      question: '¿Qué denota la expresión "play devil\'s advocate"?',
      options: ['Defender una postura contraria para examinar la solidez de un argumento', 'Adorar al demonio', 'Engañar intencionalmente al interlocutor', 'Causar discordia maliciosa'],
      correct: 'Defender una postura contraria para examinar la solidez de un argumento',
      explanation: 'Término argumentativo para retar hipótesis y someterlas a escrutinio crítico.'
    },
    {
      discipline: 'Pragmatic Register',
      question: 'En un memorando ejecutivo, ¿cuál frase expresa desacuerdo diplomático constructivo?',
      options: ['While I acknowledge the merits of this proposal, I harbor reservations regarding its scalability.', 'This plan makes zero sense.', 'I completely hate this approach.', 'You are mistaken about the numbers.'],
      correct: 'While I acknowledge the merits of this proposal, I harbor reservations regarding its scalability.',
      explanation: 'Mantiene una diplomacia ejecutiva impecable con vocabulario avanzado (harbor reservations, scalability).'
    },
    {
      discipline: 'Lexical Density',
      question: 'El término "ephemeral" describe algo que es:',
      options: ['Transitorio o de muy corta duración', 'Eterno y duradero', 'Peligroso', 'Complicado de entender'],
      correct: 'Transitorio o de muy corta duración',
      explanation: '"Ephemeral" denota fugacidad y brevedad en el tiempo.'
    }
  ],
  C2: [
    {
      discipline: 'Mastery & Rhetoric',
      question: '¿Qué figura retórica se aprecia en: "It was an open secret among Wall Street insiders"?',
      options: ['Oxymoron', 'Hyperbole', 'Litotes', 'Metonymy'],
      correct: 'Oxymoron',
      explanation: '"Open secret" yuxtapone dos términos contradictorios, formando un oxímoron.'
    },
    {
      discipline: 'Native US Colloquialisms',
      question: '"He is notorious for throwing someone under the bus." ¿Qué conducta describe?',
      options: ['Empujar a alguien físicamente', 'Culpar o traicionar a un compañero para salvarse uno mismo', 'Conducir autobuses velozmente', 'Salvar a un amigo'],
      correct: 'Culpar o traicionar a un compañero para salvarse uno mismo',
      explanation: 'Modismo que denota sacrificar o incriminar a un aliado por beneficio egoísta.'
    },
    {
      discipline: 'Pragmatic Competence',
      question: '"Her remarks were deemed entirely germane to the ongoing negotiations." ¿Qué significa "germane"?',
      options: ['Alemanas', 'Pertinentes y relevantes', 'Ofensivas', 'Inútiles'],
      correct: 'Pertinentes y relevantes',
      explanation: '"Germane" es un término culto que denota pertinencia y relación directa con el tema.'
    },
    {
      discipline: 'Subtle Stylistic Inversion',
      question: 'Elige la construcción de mayor elegancia estilística nativa:',
      options: ['Under no circumstances should such confidential disclosures be made.', 'You shouldn\'t make confidential disclosures ever.', 'Never you make disclosures that are secret.', 'Under any circumstance do not make disclosures.'],
      correct: 'Under no circumstances should such confidential disclosures be made.',
      explanation: 'Inversión negativa formal utilizada en contratos y discursos diplomáticos.'
    },
    {
      discipline: 'Cultural Semantics',
      question: 'En la cultura corporativa de EE.UU., cuando un ejecutivo dice "Let\'s not boil the ocean", pide:',
      options: ['Cuidar el medio ambiente', 'No intentar abarcar un alcance imposiblemente ambicioso e innecesario', 'Acelerar el calentamiento global', 'Cocinar mariscos'],
      correct: 'No intentar abarcar un alcance imposiblemente ambicioso e innecesario',
      explanation: '"Boil the ocean" significa emprender una tarea absurdamente vasta y poco práctica.'
    },
    {
      discipline: 'Philosophical Nuance',
      question: 'Identifica el significado exacto de "solipsism" en un debate intelectual:',
      options: ['La teoría de que solo la propia mente es segura de existir', 'La soledad absoluta', 'El amor propio desmedido', 'La adoración al sol'],
      correct: 'La teoría de que solo la propia mente es segura de existir',
      explanation: '"Solipsism" es una tesis epistemológica sobre los límites del conocimiento ontológico.'
    },
    {
      discipline: 'Advanced Stylistics',
      question: 'Identifica la figura retórica de atenuación elegante en: "It was not the worst outcome we could have anticipated":',
      options: ['Litotes', 'Zeugma', 'Synecdoche', 'Anaphora'],
      correct: 'Litotes',
      explanation: 'Litotes es la figura de afirmar algo positivo mediante la negación de su contrario.'
    },
    {
      discipline: 'Nuanced Verbosity',
      question: '¿Qué significa "obfuscate" en un análisis de comunicación?',
      options: ['Oscurecer o hacer deliberadamente confuso un mensaje', 'Aclarar un punto', 'Criticar con furia', 'Resumir brevemente'],
      correct: 'Oscurecer o hacer deliberadamente confuso un mensaje',
      explanation: '"Obfuscate" significa tornar ininteligible o confusa la información.'
    },
    {
      discipline: 'Diplomatic Nuance',
      question: 'En alta diplomacia, "a tacit agreement" es:',
      options: ['Un acuerdo implícito o sobreentendido sin haber sido expresado verbalmente', 'Un tratado firmado con sellos', 'Un acuerdo temporal', 'Un desacuerdo violento'],
      correct: 'Un acuerdo implícito o sobreentendido sin haber sido expresado verbalmente',
      explanation: '"Tacit" proviene del latín taciturnus (silencioso, implícito).'
    },
    {
      discipline: 'Stylistic Mastery',
      question: '¿Qué connota "he spoke with great perspicacity"?',
      options: ['Habló con agudeza de entendimiento y profunda perspicacia', 'Habló sudando copiosamente', 'Habló de manera aburrida', 'Habló con voz temblorosa'],
      correct: 'Habló con agudeza de entendimiento y profunda perspicacia',
      explanation: '"Perspicacity" es la cualidad de discernimiento penetrante y lucidez intelectual.'
    }
  ]
};

// Generator that picks 5 unique questions from the pool and shuffles each question's options
function generateMilestoneExam(level: CEFRLevel): MilestoneQuestion[] {
  const pool = MASTER_MILESTONE_POOLS[level] || MASTER_MILESTONE_POOLS.A1;
  const shuffledPool = shuffleArray(pool);
  const selected = shuffledPool.slice(0, 5);

  return selected.map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));
}

export const MilestoneExamModal: React.FC<MilestoneExamModalProps> = ({
  initialLevel,
  profile,
  onPassExam,
  onClose
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(initialLevel);
  const [questions, setQuestions] = useState<MilestoneQuestion[]>(() => generateMilestoneExam(initialLevel));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const totalQ = questions.length;

  const handleSelectLevel = (level: CEFRLevel) => {
    setSelectedLevel(level);
    setQuestions(generateMilestoneExam(level));
    setCurrentIndex(0);
    setUserSelectedOption(null);
    setHasChecked(false);
    setScore(0);
    setIsCompleted(false);
  };

  const restartExam = () => {
    setQuestions(generateMilestoneExam(selectedLevel));
    setCurrentIndex(0);
    setUserSelectedOption(null);
    setHasChecked(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleCheck = () => {
    if (!userSelectedOption || hasChecked) return;
    const isCorrect = userSelectedOption === currentQ.correct;
    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
    } else {
      sound.playIncorrect();
    }
    setHasChecked(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex(prev => prev + 1);
      setUserSelectedOption(null);
      setHasChecked(false);
    } else {
      setIsCompleted(true);
      const passed = (score + (userSelectedOption === currentQ.correct ? 0 : 0)) >= 4;
      if (passed) {
        sound.playFanfare();
        confetti({ particleCount: 150, spread: 90 });
      }
    }
  };

  const percentage = Math.round((score / totalQ) * 100);
  const isPassed = percentage >= 80;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl my-auto transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Examen de Certificación Nivel {selectedLevel}
              </h3>
              <p className="text-[11px] text-slate-500">
                Puntaje mínimo de aprobación: 80% (Puedes repetirlo cuantas veces quieras)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Selector */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => handleSelectLevel(lvl)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                selectedLevel === lvl
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Nivel {lvl}
            </button>
          ))}
        </div>

        {/* Results Screen */}
        {isCompleted ? (
          <div className="text-center py-4 space-y-4">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl ${
              isPassed ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-rose-500 shadow-rose-500/30'
            }`}>
              {isPassed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <h4 className="text-2xl font-black text-slate-900 dark:text-white">
              {isPassed ? `¡Felicidades! Aprobaste la Certificación del Nivel ${selectedLevel}` : 'No alcanzaste el 80% requerido'}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Puntaje obtenido: <span className="font-extrabold text-slate-900 dark:text-white">{percentage}% ({score}/{totalQ})</span>
            </p>

            {isPassed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs">
                <p className="font-bold">🎯 Nivel Acreditado con Éxito</p>
                <p className="mt-1 opacity-90">Has demostrado el dominio necesario para continuar desbloqueando las etapas superiores de {selectedLevel}.</p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs">
                <p className="font-bold">Continúa practicando en tus sesiones</p>
                <p className="mt-1 opacity-90">Puedes repasar las lecciones de tu nivel y volver a intentar esta evaluación cuando quieras.</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={restartExam}
                className="flex-1 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Intentar de Nuevo</span>
              </button>

              {isPassed && (
                <button
                  onClick={() => onPassExam(selectedLevel)}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Acreditar y Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question */
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className="text-violet-600 dark:text-violet-400 font-extrabold">{currentQ.discipline}</span>
              <span>Pregunta {currentIndex + 1} de {totalQ}</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-violet-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentIndex + 1) / totalQ) * 100)}%` }}
              />
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 leading-snug">
              {currentQ.question}
            </h4>

            <div className="space-y-2 mb-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userSelectedOption === opt;
                return (
                  <button
                    key={idx}
                    disabled={hasChecked}
                    onClick={() => {
                      sound.playTap();
                      setUserSelectedOption(opt);
                    }}
                    className={`w-full p-3 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-500 text-violet-800 dark:text-violet-200 ring-2 ring-violet-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-300'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {hasChecked && (
              <div className={`p-3.5 rounded-2xl border mb-4 text-xs ${
                userSelectedOption === currentQ.correct
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-start gap-2">
                  {userSelectedOption === currentQ.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{userSelectedOption === currentQ.correct ? '¡Correcto!' : `Respuesta: ${currentQ.correct}`}</p>
                    <p className="mt-0.5 opacity-90">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              {!hasChecked ? (
                <button
                  type="button"
                  disabled={!userSelectedOption}
                  onClick={handleCheck}
                  className="w-full py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  Comprobar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{currentIndex + 1 === totalQ ? 'Ver Resultados' : 'Siguiente'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  </div>
  );
};
