import { Exercise, DiagnosticDiscipline, CEFRLevel } from '../types';
import { shuffleArray } from '../utils/audio';

interface TierQuestionBank {
  A1: Exercise[];
  A2: Exercise[];
  B1: Exercise[];
  B2: Exercise[];
  C1: Exercise[];
  C2: Exercise[];
}

export const DYNAMIC_DIAGNOSTIC_POOLS: Record<DiagnosticDiscipline, TierQuestionBank> = {
  // ==========================================
  // 1. WRITING (Expanded Master Pool)
  // ==========================================
  writing: {
    A1: [
      {
        id: 'dyn_w_a1_1',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A1',
        prompt: 'Ordena las palabras para formar: "Vivo en México con mi familia."',
        targetText: 'I live in Mexico with my family',
        options: ['family', 'in', 'live', 'with', 'Mexico', 'my', 'I'],
        explanation: 'Estructura estándar: Sujeto (I) + Verbo (live) + Lugar (in Mexico) + Compañía (with my family).'
      },
      {
        id: 'dyn_w_a1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Completa con la forma verbal correcta: "They _____ to music every morning."',
        targetText: 'listen',
        options: ['listens', 'listening', 'listen', 'are listen'],
        explanation: 'En presente simple con pronombres plurales (they), el verbo va en forma base sin "s".'
      },
      {
        id: 'dyn_w_a1_3',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A1',
        prompt: 'Ordena las palabras para formar: "Ella tiene dos hermanos."',
        targetText: 'She has two brothers',
        options: ['brothers', 'has', 'She', 'two', 'have', 'brother'],
        explanation: 'Con He/She/It en presente simple se utiliza "has", no "have".'
      },
      {
        id: 'dyn_w_a1_4',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Selecciona la palabra interrogativa correcta: "_____ is your favorite food?"',
        targetText: 'What',
        options: ['Who', 'Where', 'What', 'When'],
        explanation: '"What" se utiliza para preguntar sobre cosas o conceptos específicos.'
      },
      {
        id: 'dyn_w_a1_5',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Elige el pronombre objeto correcto: "Please give the book to _____."',
        targetText: 'me',
        options: ['I', 'my', 'me', 'mine'],
        explanation: 'Después de una preposición ("to") se utiliza el pronombre objeto ("me").'
      }
    ],
    A2: [
      {
        id: 'dyn_w_a2_1',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Selecciona la preposición de tiempo correcta: "We have our class _____ Friday morning."',
        targetText: 'on',
        options: ['at', 'on', 'in', 'by'],
        explanation: 'En inglés se usa "on" para días específicos de la semana.'
      },
      {
        id: 'dyn_w_a2_2',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'A2',
        prompt: 'Traduce al inglés: "¿Dónde compraste tus zapatos nuevos?"',
        targetText: 'Where did you buy your new shoes?',
        acceptableAnswers: ['Where did you buy your new shoes', 'Where did you get your new shoes?'],
        explanation: 'Preguntas en pasado simple: Where + did + sujeto + verbo en forma base (buy).'
      },
      {
        id: 'dyn_w_a2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Elige el pasado continuo correcto: "While I _____ a shower, the phone rang."',
        targetText: 'was taking',
        options: ['were taking', 'was taking', 'took', 'am taking'],
        explanation: 'Con el pronombre "I" en pasado continuo se utiliza "was" + gerundio.'
      },
      {
        id: 'dyn_w_a2_4',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A2',
        prompt: 'Ordena la comparación: "Este auto es más rápido que el mío."',
        targetText: 'This car is faster than mine',
        options: ['mine', 'car', 'faster', 'This', 'is', 'than'],
        explanation: 'Estructura comparativa: Adjetivo con terminación -er + than + pronombre posesivo.'
      },
      {
        id: 'dyn_w_a2_5',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Completa con el modal de permiso: "_____ I use your phone, please?"',
        targetText: 'May',
        options: ['Must', 'May', 'Do', 'Are'],
        explanation: '"May" o "Can" se emplean para solicitar permiso de forma educada.'
      }
    ],
    B1: [
      {
        id: 'dyn_w_b1_1',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B1',
        prompt: 'Traduce: "Si tuviera más tiempo libre, estudiaría otro idioma."',
        targetText: 'If I had more free time, I would study another language.',
        acceptableAnswers: ['If I had more free time, I would study another language', 'If I had more time, I would study another language.'],
        explanation: 'Segundo condicional para situaciones hipotéticas: If + Pasado Simple ..., would + verbo base.'
      },
      {
        id: 'dyn_w_b1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Elige el conector adecuado: "_____ it was raining heavily, we walked to the office."',
        targetText: 'Although',
        options: ['Because', 'Although', 'Despite', 'In spite of'],
        explanation: '"Although" introduce una cláusula concesiva completa con sujeto y verbo.'
      },
      {
        id: 'dyn_w_b1_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Completa con el modal de deducción: "She didn\'t answer the phone; she _____ be sleeping."',
        targetText: 'must',
        options: ['must', 'can', 'should', 'ought'],
        explanation: '"Must" se utiliza para expresar una deducción lógica afirmativa de alta certeza.'
      },
      {
        id: 'dyn_w_b1_4',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B1',
        prompt: 'Traduce: "He vivido en esta ciudad desde el año pasado."',
        targetText: 'I have lived in this city since last year.',
        acceptableAnswers: ['I have lived in this city since last year', 'I have been living in this city since last year.'],
        explanation: 'Presente perfecto con "since" para indicar un punto de inicio temporal.'
      },
      {
        id: 'dyn_w_b1_5',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Elige el gerundio o infinitivo correcto: "I look forward to _____ you soon."',
        targetText: 'seeing',
        options: ['see', 'seeing', 'to see', 'saw'],
        explanation: 'La frase idiomática "look forward to" siempre va seguida de un verbo en gerundio (-ing).'
      }
    ],
    B2: [
      {
        id: 'dyn_w_b2_1',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'B2',
        prompt: 'Ordena en presente perfecto continuo: "Llevo trabajando aquí durante dos años."',
        targetText: 'I have been working here for two years',
        options: ['working', 'years', 'I', 'two', 'here', 'have', 'for', 'been'],
        explanation: 'Presente Perfecto Continuo: have/has been + verbo con terminación -ing.'
      },
      {
        id: 'dyn_w_b2_2',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B2',
        prompt: 'Traduce la voz pasiva: "El informe mensual fue aprobado por el director ayer."',
        targetText: 'The monthly report was approved by the director yesterday.',
        acceptableAnswers: ['The monthly report was approved by the director yesterday'],
        explanation: 'Voz pasiva en pasado simple: was/were + participio pasado (approved).'
      },
      {
        id: 'dyn_w_b2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B2',
        prompt: 'Completa el tercer condicional: "If you had informed me earlier, I _____ you."',
        targetText: 'would have helped',
        options: ['would help', 'would have helped', 'will have helped', 'had helped'],
        explanation: 'Tercer condicional: If + Past Perfect ..., would have + participio pasado.'
      },
      {
        id: 'dyn_w_b2_4',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B2',
        prompt: 'Elige la frase verbal correcta: "We need to _____ an innovative solution to this bottleneck."',
        targetText: 'come up with',
        options: ['come up with', 'run out of', 'put up with', 'look forward to'],
        explanation: '"Come up with" significa idear o proponer una solución o estrategia.'
      },
      {
        id: 'dyn_w_b2_5',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B2',
        prompt: 'Completa con el relativo correcto: "The engineer _____ design was selected works in Querétaro."',
        targetText: 'whose',
        options: ['who', 'which', 'whose', 'whom'],
        explanation: '"Whose" indica posesión o pertenencia para personas y cosas en cláusulas relativas.'
      }
    ],
    C1: [
      {
        id: 'dyn_w_c1_1',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Elige la estructura de inversión formal: "Hardly _____ the presentation when the system crashed."',
        targetText: 'had they started',
        options: ['they had started', 'had they started', 'did they start', 'they started'],
        explanation: 'Tras adverbios negativos iniciales como "Hardly", se invierte el sujeto y el auxiliar.'
      },
      {
        id: 'dyn_w_c1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Selecciona la forma del subjuntivo formal: "It is crucial that each employee _____ the security protocols."',
        targetText: 'follow',
        options: ['follows', 'is following', 'follow', 'followed'],
        explanation: 'Subjuntivo mandativo en inglés formal: verbo en forma base sin desinencias.'
      },
      {
        id: 'dyn_w_c1_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Completa con la frase de participio reducida: "_____ by the unexpected feedback, the team revised the architecture."',
        targetText: 'Surprised',
        options: ['Surprising', 'Surprised', 'Having surprised', 'To surprise'],
        explanation: 'Cláusula de participio pasivo reducida para denotar causa o reacción.'
      },
      {
        id: 'dyn_w_c1_4',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Elige el conector avanzado de contraste: "_____ numerous challenges, the project was finalized ahead of schedule."',
        targetText: 'Notwithstanding',
        options: ['Although', 'Notwithstanding', 'Unless', 'Whereas'],
        explanation: '"Notwithstanding" funciona como preposición formal equivalente a "A pesar de".'
      }
    ],
    C2: [
      {
        id: 'dyn_w_c2_1',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'C2',
        prompt: 'Traduce al registro formal de alta precisión: "A pesar de los obstáculos imprevistos, la iniciativa generó resultados extraordinarios."',
        targetText: 'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results.',
        acceptableAnswers: ['Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results.'],
        explanation: 'Construcción con conectores preposicionales formales y vocabulario de nivel experto.'
      },
      {
        id: 'dyn_w_c2_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C2',
        prompt: 'Completa con la inversión enfática de grado: "So compelling _____ that the committee unanimously endorsed it."',
        targetText: 'were the arguments presented',
        options: ['the arguments presented were', 'were the arguments presented', 'was the arguments presented', 'the arguments were presented'],
        explanation: 'Inversión tras "So + adjetivo": requiere invertir verbo y sujeto ("were the arguments").'
      },
      {
        id: 'dyn_w_c2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C2',
        prompt: 'Selecciona la construcción de inversión negativa absoluta: "Under no circumstances _____ confidential client records."',
        targetText: 'should you disclose',
        options: ['you should disclose', 'should you disclose', 'you must disclose', 'did you disclosed'],
        explanation: 'Frases negativas absolutas al inicio requieren inversión auxiliar-sujeto obligatoria.'
      }
    ]
  },

  // ==========================================
  // 2. SPEAKING (Expanded Master Pool)
  // ==========================================
  speaking: {
    A1: [
      {
        id: 'dyn_s_a1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia en voz alta la presentación básica:',
        audioText: 'Hi, nice to meet you. My name is Alex.',
        targetText: 'Hi, nice to meet you. My name is Alex.',
        phoneticGuide: 'Jái, náis tu mít iu. Mái néim is Álex.',
        explanation: 'Saludo elemental de presentación personal.'
      },
      {
        id: 'dyn_s_a1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia esta solicitud para pedir agua:',
        audioText: 'Can I get a glass of water, please?',
        targetText: 'Can I get a glass of water, please?',
        phoneticGuide: 'Ken ái guét a glas ov guá-rer, pliis?',
        explanation: 'Práctica de entonación cortés con "Can I get...".'
      },
      {
        id: 'dyn_s_a1_3',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia indicando tu ocupación:',
        audioText: 'I am a software engineer and I live in Queretaro.',
        targetText: 'I am a software engineer and I live in Queretaro.',
        phoneticGuide: 'Ái am a sóft-guer en-dji-níer end ái liv in Ke-ré-ta-ro.',
        explanation: 'Presentación profesional en presente simple.'
      }
    ],
    A2: [
      {
        id: 'dyn_s_a2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia sobre hábitos cotidianos:',
        audioText: 'I usually have coffee and toast for breakfast.',
        targetText: 'I usually have coffee and toast for breakfast.',
        phoneticGuide: 'Ái iú-zhu-a-li jav có-fi end tóust for brék-fast.',
        explanation: 'Fluidez con adverbios de frecuencia.'
      },
      {
        id: 'dyn_s_a2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia pidiendo indicaciones urbanas:',
        audioText: 'Could you tell me where the nearest pharmacy is?',
        targetText: 'Could you tell me where the nearest pharmacy is?',
        phoneticGuide: 'Cud iu tel mi güér da nír-est fár-ma-si is?',
        explanation: 'Pregunta indirecta educada.'
      }
    ],
    B1: [
      {
        id: 'dyn_s_b1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B1',
        prompt: 'Pronuncia expresando una opinión profesional:',
        audioText: 'In my opinion, we should focus on customer satisfaction.',
        targetText: 'In my opinion, we should focus on customer satisfaction.',
        phoneticGuide: 'In mái o-pí-nion, güi shud fóu-cus on cás-to-mer sa-tis-fák-shon.',
        explanation: 'Expresión clara de puntos de vista y argumentos.'
      },
      {
        id: 'dyn_s_b1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B1',
        prompt: 'Pronuncia articulando la "TH" sonora:',
        audioText: 'Although the weather was cloudy, we went for a walk together.',
        targetText: 'Although the weather was cloudy, we went for a walk together.',
        phoneticGuide: 'Ol-dóu da güé-der güos cláu-di, güi güent for a guók tu-gué-der.',
        explanation: 'Entrenamiento fonético del fonema /ð/.'
      }
    ],
    B2: [
      {
        id: 'dyn_s_b2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia esta comunicación corporativa:',
        audioText: "Let's touch base next Monday to review the project proposal.",
        targetText: "Let's touch base next Monday to review the project proposal.",
        phoneticGuide: 'Lets tach béis nekst Mán-dei tu ri-viú da pro-yekt pro-póu-sal.',
        explanation: 'Ritmo conversacional ágil y acento léxico profesional.'
      },
      {
        id: 'dyn_s_b2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia con enlace natural de palabras (linking):',
        audioText: 'I would have called you earlier, but my phone ran out of battery.',
        targetText: 'I would have called you earlier, but my phone ran out of battery.',
        phoneticGuide: 'Ái wudav cold iu ér-li-er, bat mái foun ran áutov bá-te-ri.',
        explanation: 'Dominio de formas débiles y reducciones modales.'
      }
    ],
    C1: [
      {
        id: 'dyn_s_c1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C1',
        prompt: 'Pronuncia con entonación ejecutiva y claridad en clusters:',
        audioText: 'Undoubtedly, the strategic acquisition will significantly broaden our market presence.',
        targetText: 'Undoubtedly, the strategic acquisition will significantly broaden our market presence.',
        phoneticGuide: 'An-dáu-ted-li, da stra-tí-djic ac-kwi-zí-shon güil sig-ní-fi-cant-li bró-den áur már-ket pré-zens.',
        explanation: 'Articulación precisa de adverbios complejos y vocabulario estratégico.'
      }
    ],
    C2: [
      {
        id: 'dyn_s_c2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C2',
        prompt: 'Pronuncia con articulación impecable y control prosódico superior:',
        audioText: 'Simultaneously mitigating risks and maximizing throughput requires meticulous execution.',
        targetText: 'Simultaneously mitigating risks and maximizing throughput requires meticulous execution.',
        phoneticGuide: 'Sai-mul-téi-ni-os-li mí-ti-guei-ting risks end mák-si-mai-zing zrú-put ri-kwáiers me-tí-kiu-los ek-se-kiú-shon.',
        explanation: 'Maestría fonética en articulación rápida y clusters complejos.'
      }
    ]
  },

  // ==========================================
  // 3. LISTENING (Expanded Master Pool)
  // ==========================================
  listening: {
    A1: [
      {
        id: 'dyn_l_a1_1',
        discipline: 'listening',
        type: 'listening_select',
        level: 'A1',
        prompt: 'Escucha el audio y selecciona la opción correcta de lo que la persona pide:',
        audioText: 'Hi, I would like a cheeseburger with french fries and a bottle of water, please.',
        targetText: 'Una hamburguesa con queso, papas a la francesa y una botella de agua',
        options: [
          'Un sándwich de pollo con ensalada y refresco',
          'Una hamburguesa con queso, papas a la francesa y una botella de agua',
          'Una pizza de queso con papas y jugo de naranja',
          'Un hot dog con papas y café'
        ],
        explanation: 'Comprensión auditiva elemental de alimentos y pedidos.'
      },
      {
        id: 'dyn_l_a1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'A1',
        prompt: 'Escucha el audio y escribe la pregunta exacta en inglés:',
        audioText: 'Where is the subway station?',
        targetText: 'Where is the subway station?',
        acceptableAnswers: ['Where is the subway station', 'where is the subway station?'],
        explanation: 'Reconocimiento auditivo de preguntas de ubicación.'
      }
    ],
    A2: [
      {
        id: 'dyn_l_a2_1',
        discipline: 'listening',
        type: 'listening_select',
        level: 'A2',
        prompt: 'Escucha las indicaciones y elige la ruta descrita:',
        audioText: 'Walk straight for two blocks, then turn right on Elm Street. The bank is on your left.',
        targetText: 'Caminar 2 cuadras derecho, girar a la derecha en Elm St y el banco está a la izquierda',
        options: [
          'Caminar 3 cuadras, girar a la izquierda y el banco está enfrente',
          'Caminar 1 cuadra, doblar a la derecha y el banco está en la esquina',
          'Caminar 2 cuadras derecho, girar a la derecha en Elm St y el banco está a la izquierda',
          'Cruzar la calle Elm y entrar al banco a la derecha'
        ],
        explanation: 'Comprensión de indicaciones espaciales urbanas.'
      }
    ],
    B1: [
      {
        id: 'dyn_l_b1_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B1',
        prompt: 'Escucha el mensaje y responde: ¿Por qué se canceló la reunión?',
        audioText: 'Hey Carlos, due to heavy rain at the airport, my flight was delayed. We need to reschedule.',
        targetText: 'Porque el vuelo se retrasó debido a una fuerte lluvia en el aeropuerto',
        options: [
          'Porque Carlos no tenía conexión a internet',
          'Porque el vuelo se retrasó debido a una fuerte lluvia en el aeropuerto',
          'Porque la sala de conferencias estaba ocupada',
          'Porque el cliente cambió el presupuesto'
        ],
        explanation: 'Comprensión auditiva de causas y consecuencias laborales.'
      }
    ],
    B2: [
      {
        id: 'dyn_l_b2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B2',
        prompt: 'Escucha el fragmento del podcast corporativo y determina la postura del entrevistado:',
        audioText: 'While artificial intelligence will automate repetitive tasks, human creativity and critical judgment remain irreplaceable.',
        targetText: 'La IA automatizará tareas rutinarias, pero la creatividad y juicio humano siguen siendo insustituibles',
        options: [
          'La IA reemplazará todos los puestos de trabajo humanos en dos años',
          'La IA no tiene ninguna utilidad práctica en empresas',
          'La IA automatizará tareas rutinarias, pero la creatividad y juicio humano siguen siendo insustituibles',
          'Las empresas deben prohibir la automatización de decisiones'
        ],
        explanation: 'Comprensión auditiva de argumentos matizados.'
      }
    ],
    C1: [
      {
        id: 'dyn_l_c1_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C1',
        prompt: 'Escucha el análisis económico y determina la implicación principal:',
        audioText: 'Contrary to initial forecasts, the fiscal contraction precipitated an abrupt deceleration in consumer spending.',
        targetText: 'La contracción fiscal provocó una desaceleración abrupta en el gasto de los consumidores',
        options: [
          'El gasto del consumidor creció exponencialmente en las zonas suburbanas',
          'La contracción fiscal provocó una desaceleración abrupta en el gasto de los consumidores',
          'Los pronósticos iniciales del mercado resultaron completamente exactos',
          'El gobierno decidió reducir las tasas de interés de inmediato'
        ],
        explanation: 'Comprensión auditiva de discurso macroeconómico formal.'
      }
    ],
    C2: [
      {
        id: 'dyn_l_c2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C2',
        prompt: 'Escucha la disertación académica e identifica el argumento central:',
        audioText: 'The speaker subtly undermined empirical consensus by appealing directly to visceral heuristics rather than verifiable data.',
        targetText: 'El orador debilitó sutilmente el consenso empírico apelando a heurísticas viscerales en lugar de datos verificables',
        options: [
          'El orador presentó pruebas estadísticas irrefutables y datos matemáticos',
          'El orador debilitó sutilmente el consenso empírico apelando a heurísticas viscerales en lugar de datos verificables',
          'El público rechazó unánimemente las anécdotas del expositor',
          'La conferencia demostró la superioridad del método cuantitativo'
        ],
        explanation: 'Evaluación de comprensión auditiva crítica de nivel maestría.'
      }
    ]
  },

  // ==========================================
  // 4. READING (Expanded Master Pool)
  // ==========================================
  reading: {
    A1: [
      {
        id: 'dyn_r_a1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A1',
        prompt: 'Lee el letrero:\n\n"WELCOME TO GREEN GROCERY\nOpen: Mon-Sat (8 AM - 9 PM)\nSun: Closed"\n\n¿Qué día está cerrada la tienda?',
        targetText: 'El domingo',
        options: ['El sábado', 'El domingo', 'El lunes', 'Nunca cierra'],
        explanation: 'Identificación de información básica en textos cotidianos.'
      }
    ],
    A2: [
      {
        id: 'dyn_r_a2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A2',
        prompt: 'Lee el correo:\n\n"Subject: Team Lunch\nHi team, our quarterly lunch is tomorrow at 1:30 PM at Olive Bistro. Please confirm attendance by 5:00 PM today."',
        targetText: 'Hoy antes de las 5:00 PM',
        options: ['Mañana a la 1:30 PM', 'Hoy antes de las 5:00 PM', 'Al llegar al restaurante', 'La próxima semana'],
        explanation: 'Extracción de detalles clave en correos electrónicos.'
      }
    ],
    B1: [
      {
        id: 'dyn_r_b1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B1',
        prompt: 'Lee el artículo:\n\n"A recent survey revealed hybrid work boosted employee satisfaction by 34%. However, managers emphasize the need to maintain spontaneous communication."',
        targetText: 'Mantener la comunicación espontánea y la cohesión del equipo',
        options: [
          'El costo del transporte público',
          'Mantener la comunicación espontánea y la cohesión del equipo',
          'Que la productividad cayó un 34%',
          'La falta de computadoras'
        ],
        explanation: 'Comprensión de ideas principales y contrastes.'
      }
    ],
    B2: [
      {
        id: 'dyn_r_b2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B2',
        prompt: 'Lee el informe:\n\n"The company\'s pivot toward renewable energy was met with skepticism. Nonetheless, early adoption has fortified market resilience."',
        targetText: 'Fortaleció la resiliencia de la empresa en el mercado y la protegió de futuras sanciones',
        options: [
          'Provocó multas regulatorias y quiebra',
          'Fortaleció la resiliencia de la empresa en el mercado y la protegió de futuras sanciones',
          'Hizo que los inversionistas retiraran capital',
          'Obligó a regresar a combustibles fósiles'
        ],
        explanation: 'Comprensión de relaciones causa-efecto complejas en negocios.'
      }
    ],
    C1: [
      {
        id: 'dyn_r_c1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C1',
        prompt: 'Lee el ensayo:\n\n"The author’s rhetorical strategy relies on juxtaposing ostensible egalitarian ideals against the insidious entrenchment of bureaucratic hierarchies."',
        targetText: 'Evidenciar contradicciones yuxtaponiendo ideales igualitarios con jerarquías burocráticas',
        options: [
          'Defender la expansión de jerarquías burocráticas',
          'Evidenciar contradicciones yuxtaponiendo ideales igualitarios con jerarquías burocráticas',
          'Proponer la abolición total de las instituciones',
          'Demostrar que los ideales igualitarios nunca han existido'
        ],
        explanation: 'Análisis textual crítico e interpretación de recursos retóricos.'
      }
    ],
    C2: [
      {
        id: 'dyn_r_c2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C2',
        prompt: 'Lee el tratado epistemológico:\n\n"The ubiquitous proliferation of algorithmic curation fosters an epistemic closure wherein disparate viewpoints are rendered fundamentally illegible."',
        targetText: 'Produce un cierre epistémico que anula la fricción dialéctica indispensable para la innovación',
        options: [
          'Acelera la velocidad de procesamiento de datos',
          'Produce un cierre epistémico que anula la fricción dialéctica indispensable para la innovación',
          'Garantiza la democratización absoluta de puntos de vista',
          'Elimina la necesidad de ciencias humanas'
        ],
        explanation: 'Comprensión profunda de textos conceptuales abstractos y vocabulario de máxima sofisticación.'
      }
    ]
  }
};

export function generateDynamicDiagnosticQuestions(discipline: DiagnosticDiscipline): {
  baseQuestions: Exercise[];
  c1Questions: Exercise[];
  c2Questions: Exercise[];
} {
  const pool = DYNAMIC_DIAGNOSTIC_POOLS[discipline];

  const pickAndShuffle = (questions: Exercise[], count: number): Exercise[] => {
    const safeQuestions = questions && questions.length > 0 ? questions : [
      {
        id: `fallback_${discipline}_${Math.random()}`,
        discipline,
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Complete the sentence: "I _____ a student."',
        targetText: 'am',
        options: ['am', 'is', 'are', 'be'],
        explanation: 'Basic To Be verb.'
      }
    ];
    const shuffled = shuffleArray([...safeQuestions]);
    const picked: Exercise[] = [];
    
    // Si hay menos preguntas en el pool de las requeridas, reciclamos de manera segura
    for (let i = 0; i < count; i++) {
      const q = shuffled[i % shuffled.length];
      picked.push({
        ...q,
        id: `${q.id}_rnd_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 5)}`
      });
    }

    return picked.map(q => {
      const cloned: Exercise = { ...q };
      if (cloned.options && cloned.options.length > 0) {
        cloned.options = shuffleArray([...cloned.options]);
      }
      return cloned;
    });
  };

  const a1 = pickAndShuffle(pool.A1, 2);
  const a2 = pickAndShuffle(pool.A2, 2);
  const b1 = pickAndShuffle(pool.B1, 2);
  const b2 = pickAndShuffle(pool.B2, 2);
  const c1 = pickAndShuffle(pool.C1, 2);
  const c2 = pickAndShuffle(pool.C2, 2);

  return {
    baseQuestions: [...a1, ...a2, ...b1, ...b2],
    c1Questions: c1,
    c2Questions: c2
  };
}
