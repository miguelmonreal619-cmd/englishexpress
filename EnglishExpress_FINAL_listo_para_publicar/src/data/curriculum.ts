import { Exercise, LevelTier, IdiomComparison, CEFRLevel, SubLevel, Discipline, DiagnosticDiscipline, SessionMeta } from '../types';
import { getSubLevelTheme } from './thematicCurriculum';

export interface DisciplineDiagnosticBank {
  discipline: DiagnosticDiscipline;
  name: string;
  label: string;
  baseQuestions: Exercise[]; // 8 questions: 2 A1, 2 A2, 2 B1, 2 B2
  c1Questions: Exercise[];   // 2 questions: C1
  c2Questions: Exercise[];   // 2 questions: C2
}

/**
 * 48 CURATED DIAGNOSTIC QUESTIONS (12 Writing, 12 Speaking, 12 Listening, 12 Reading)
 * Base: 8 progressive questions per discipline (2 A1, 2 A2, 2 B1, 2 B2)
 * Adaptive Extension: 2 C1 questions if B2 is mastered + 2 C2 questions if C1 is mastered.
 * Initial questions focus on clear, fundamental, natural English without confusing slang.
 */
export const DIAGNOSTIC_EXAM_BANK: Record<DiagnosticDiscipline, DisciplineDiagnosticBank> = {
  // ==========================================
  // 1. WRITING (12 Preguntas totales)
  // ==========================================
  writing: {
    discipline: 'writing',
    name: 'Writing',
    label: 'Writing (Escritura y Gramática)',
    baseQuestions: [
      // A1 - 1
      {
        id: 'diag_w_a1_1',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A1',
        prompt: 'Ordena las palabras para formar: "Vivo en México con mi familia."',
        targetText: 'I live in Mexico with my family',
        options: ['family', 'in', 'live', 'with', 'at', 'Mexico', 'my', 'I'],
        mexicanTip: 'Para ciudades y países usamos la preposición "in" (in Mexico, in Monterrey).',
        explanation: 'Estructura estándar Sujeto (I) + Verbo (live) + Lugar (in Mexico) + Compañía (with my family).'
      },
      // A1 - 2
      {
        id: 'diag_w_a1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Completa con la forma correcta del verbo: "They _____ to music every morning."',
        targetText: 'listen',
        options: ['listens', 'listening', 'listen', 'are listen'],
        mexicanTip: 'En presente simple con pronombres plurales (they, we, you), el verbo va en forma base sin "s".',
        explanation: '"They" requiere la forma base del verbo "listen" en presente simple.'
      },
      // A2 - 1
      {
        id: 'diag_w_a2_1',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Selecciona la preposición correcta de tiempo: "We have our English class _____ Friday at 9:00 AM."',
        targetText: 'on',
        options: ['at', 'on', 'in', 'by'],
        mexicanTip: 'En inglés se usa "on" para los días de la semana (on Monday, on Friday).',
        explanation: 'La regla de preposiciones temporales establece "on" para días específicos.'
      },
      // A2 - 2
      {
        id: 'diag_w_a2_2',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'A2',
        prompt: 'Traduce al inglés: "¿Dónde compraste tus zapatos nuevos?"',
        targetText: 'Where did you buy your new shoes?',
        acceptableAnswers: [
          'Where did you buy your new shoes',
          'Where did you get your new shoes?',
          'Where did you get your new shoes'
        ],
        mexicanTip: 'Con el auxiliar de pasado "did", el verbo principal se escribe en su forma base ("buy", no "bought").',
        explanation: 'Preguntas en pasado simple: Where + did + sujeto + verbo base (buy).'
      },
      // B1 - 1
      {
        id: 'diag_w_b1_1',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B1',
        prompt: 'Traduce: "Si tuviera más tiempo libre, estudiaría otro idioma."',
        targetText: 'If I had more free time, I would study another language.',
        acceptableAnswers: [
          'If I had more free time, I would study another language',
          'If I had more time, I would study another language.',
          'If I had more time, I would study another language',
          'If I had more free time I would study another language.'
        ],
        mexicanTip: 'Segundo condicional para situaciones hipotéticas: If + Pasado Simple (had) ..., would + verbo base (would study).',
        explanation: 'Estructura condicional hipotética: "If I had ..., I would study...".'
      },
      // B1 - 2
      {
        id: 'diag_w_b1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Elige el conector adecuado: "_____ it was raining heavily, we walked to the office."',
        targetText: 'Although',
        options: ['Because', 'Although', 'Despite', 'In spite of'],
        mexicanTip: '"Although" (aunque) introduce una cláusula con sujeto y verbo ("it was raining"). "Despite" requeriría sustantivo o gerundio.',
        explanation: '"Although" introduce contraste con una oración completa subordinada.'
      },
      // B2 - 1
      {
        id: 'diag_w_b2_1',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'B2',
        prompt: 'Ordena la frase en presente perfecto continuo: "Llevo trabajando aquí durante dos años."',
        targetText: 'I have been working here for two years',
        options: ['working', 'years', 'I', 'since', 'two', 'here', 'have', 'for', 'been'],
        mexicanTip: 'En inglés usamos "for" para expresar duración de tiempo (for two years) y "since" para puntos de inicio.',
        explanation: 'Presente Perfecto Continuo: have/has been + verbo-ing para acciones que comenzaron en el pasado y continúan.'
      },
      // B2 - 2
      {
        id: 'diag_w_b2_2',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B2',
        prompt: 'Traduce la voz pasiva: "El informe mensual fue aprobado por el director ayer."',
        targetText: 'The monthly report was approved by the director yesterday.',
        acceptableAnswers: [
          'The monthly report was approved by the director yesterday',
          'The monthly report was approved by the manager yesterday.',
          'The monthly report was approved by the manager yesterday'
        ],
        mexicanTip: 'En entornos profesionales, "was approved by" es la estructura estándar pasiva.',
        explanation: 'Voz pasiva en pasado simple: was/were + participio pasado (was approved).'
      }
    ],
    c1Questions: [
      // C1 - 1
      {
        id: 'diag_w_c1_1',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Elige la estructura de inversión formal: "Hardly _____ the presentation when the system crashed."',
        targetText: 'had they started',
        options: ['they had started', 'had they started', 'did they start', 'they started'],
        mexicanTip: 'Tras adverbios negativos iniciales como "Hardly" o "Scarcely", se invierte el sujeto y el auxiliar (had + they + started).',
        explanation: 'Inversión enfática formal para acciones secuenciales en pasado.'
      },
      // C1 - 2
      {
        id: 'diag_w_c1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Selecciona la forma del subjuntivo formal en inglés: "It is crucial that each employee _____ the security protocols."',
        targetText: 'follow',
        options: ['follows', 'is following', 'follow', 'followed'],
        mexicanTip: 'En el subjuntivo formal de inglés estadounidense ("It is crucial that..."), el verbo subordinado permanece en su forma base.',
        explanation: 'Subjuntivo mandativo: "that each employee follow" (forma base sin "s").'
      }
    ],
    c2Questions: [
      // C2 - 1
      {
        id: 'diag_w_c2_1',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'C2',
        prompt: 'Traduce al registro formal de alta precisión: "A pesar de los obstáculos imprevistos, la iniciativa generó resultados extraordinarios."',
        targetText: 'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results.',
        acceptableAnswers: [
          'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results.',
          'Notwithstanding the unforeseen obstacles, the initiative yielded extraordinary results.',
          'Despite the unforeseen impediments, the initiative yielded extraordinary results.',
          'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results'
        ],
        mexicanTip: '"Notwithstanding" y "yielded" reflejan el registro léxico y sintáctico del nivel C2.',
        explanation: 'Construcción con conectores preposicionales y vocabulario avanzado.'
      },
      // C2 - 2
      {
        id: 'diag_w_c2_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C2',
        prompt: 'Completa con la inversión enfática de grado: "So compelling _____ that the committee unanimously endorsed the proposal."',
        targetText: 'were the arguments presented',
        options: ['the arguments presented were', 'were the arguments presented', 'was the arguments presented', 'the arguments were presented'],
        mexicanTip: 'Estructura "So + adjetivo + verbo + sujeto": demuestra dominio estilístico avanzado.',
        explanation: 'Inversión tras "So + adjetivo": requiere "were the arguments presented".'
      }
    ]
  },

  // ==========================================
  // 2. SPEAKING (12 Preguntas totales)
  // ==========================================
  speaking: {
    discipline: 'speaking',
    name: 'Speaking',
    label: 'Speaking (Habla y Pronunciación)',
    baseQuestions: [
      // A1 - 1
      {
        id: 'diag_s_a1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia en voz alta la presentación básica:',
        audioText: 'Hi, nice to meet you. My name is Alex.',
        targetText: 'Hi, nice to meet you. My name is Alex.',
        phoneticGuide: 'Jái, náis tu mít iu. Mái néim is Álex.',
        mexicanTip: 'En "nice to meet you", conecta las palabras con fluidez y naturalidad.',
        explanation: 'Saludo elemental de presentación personal en inglés.'
      },
      // A1 - 2
      {
        id: 'diag_s_a1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia esta solicitud para pedir agua:',
        audioText: 'Can I get a glass of water, please?',
        targetText: 'Can I get a glass of water, please?',
        phoneticGuide: 'Ken ái guét a glas ov guá-rer, pliis?',
        mexicanTip: 'En EE.UU. la "t" en "water" suena suave, similar a una "r" sencilla en español ("guá-rer").',
        explanation: 'Practica la entonación cortés de solicitud con "Can I get...".'
      },
      // A2 - 1
      {
        id: 'diag_s_a2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia esta frase sobre hábitos diarios:',
        audioText: 'I usually have coffee and toast for breakfast.',
        targetText: 'I usually have coffee and toast for breakfast.',
        phoneticGuide: 'Ái iú-zhu-a-li jav có-fi end tóust for brék-fast.',
        mexicanTip: '"Breakfast" se pronuncia "brék-fast", con la primera vocal corta.',
        explanation: 'Atención a la fluidez en adverbios de frecuencia como "usually".'
      },
      // A2 - 2
      {
        id: 'diag_s_a2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia esta pregunta pidiendo indicaciones:',
        audioText: 'Could you tell me where the nearest pharmacy is?',
        targetText: 'Could you tell me where the nearest pharmacy is?',
        phoneticGuide: 'Cud iu tel mi güér da nír-est fár-ma-si is?',
        mexicanTip: 'La "l" en "could" es muda: suena "cud", nunca "culd".',
        explanation: 'Pregunta indirecta educada con entonación ascendente-descendente.'
      },
      // B1 - 1
      {
        id: 'diag_s_b1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B1',
        prompt: 'Pronuncia expresando una opinión profesional:',
        audioText: 'In my opinion, we should focus on customer satisfaction.',
        targetText: 'In my opinion, we should focus on customer satisfaction.',
        phoneticGuide: 'In mái o-pí-nion, güi shud fóu-cus on cás-to-mer sa-tis-fák-shon.',
        mexicanTip: '"Focus" lleva diptongo: "fóu-cus". Enlaza "focus on" fluidamente: "fóu-ca-son".',
        explanation: 'Expresión clara de opinión y énfasis en términos clave.'
      },
      // B1 - 2
      {
        id: 'diag_s_b1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B1',
        prompt: 'Pronuncia articulando la "TH" sonora en "although" y "weather":',
        audioText: 'Although the weather was cloudy, we went for a walk together.',
        targetText: 'Although the weather was cloudy, we went for a walk together.',
        phoneticGuide: 'Ol-dóu da güé-der güos cláu-di, güi güent for a guók tu-gué-der.',
        mexicanTip: 'La "th" sonora en "weather" y "together" se articula colocando la punta de la lengua entre los dientes.',
        explanation: 'Entrenamiento del fonema sonoro /ð/ en contextos conversacionales.'
      },
      // B2 - 1
      {
        id: 'diag_s_b2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia esta comunicación de trabajo:',
        audioText: "Let's touch base next Monday to review the project proposal.",
        targetText: "Let's touch base next Monday to review the project proposal.",
        phoneticGuide: 'Lets tach béis nekst Mán-dei tu ri-viú da pro-yekt pro-póu-sal.',
        mexicanTip: '"Touch base" es una expresión muy usada en oficinas para decir "comunicarnos / revisar avances".',
        explanation: 'Ritmo conversacional ágil y acento léxico en "proposal".'
      },
      // B2 - 2
      {
        id: 'diag_s_b2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia con enlace natural de palabras (linking):',
        audioText: 'I would have called you earlier, but my phone ran out of battery.',
        targetText: 'I would have called you earlier, but my phone ran out of battery.',
        phoneticGuide: 'Ái wudav cold iu ér-li-er, bat mái foun ran áutov bá-te-ri.',
        mexicanTip: 'En habla natural estadounidense, "would have" se contrae a "wud-av". "Ran out of" suena "ran-áu-rov".',
        explanation: 'Dominio de formas débiles y reducciones en condicionales pasados.'
      }
    ],
    c1Questions: [
      // C1 - 1
      {
        id: 'diag_s_c1_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C1',
        prompt: 'Pronuncia con entonación ejecutiva y claridad en clusters consonánticos:',
        audioText: 'Undoubtedly, the strategic acquisition will significantly broaden our market presence.',
        targetText: 'Undoubtedly, the strategic acquisition will significantly broaden our market presence.',
        phoneticGuide: 'An-dáu-ted-li, da stra-tí-djic ac-kwi-zí-shon güil sig-ní-fi-cant-li bró-den áur már-ket pré-zens.',
        mexicanTip: 'En "undoubtedly", la letra "b" es completamente muda (an-dáu-ted-li).',
        explanation: 'Articulación precisa de adverbios complejos y vocabulario estratégico.'
      },
      // C1 - 2
      {
        id: 'diag_s_c1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C1',
        prompt: 'Pronuncia con fluidez continua y ritmo prosódico natural:',
        audioText: 'Implementing comprehensive measures will inevitably enhance long-term productivity.',
        targetText: 'Implementing comprehensive measures will inevitably enhance long-term productivity.',
        phoneticGuide: 'Im-ple-mén-ting com-pre-jén-siv mé-zhurs güil in-é-vi-ta-bli en-jáns long-term pro-duc-tí-vi-ti.',
        mexicanTip: 'En "measures", el sonido /ʒ/ es suave (similar a una "y" o "ll" suave).',
        explanation: 'Entonación fluida de oraciones compuestas con adjetivos multislábicos.'
      }
    ],
    c2Questions: [
      // C2 - 1
      {
        id: 'diag_s_c2_1',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C2',
        prompt: 'Pronuncia con articulación impecable y control prosódico superior:',
        audioText: 'Simultaneously mitigating risks and maximizing throughput requires meticulous execution.',
        targetText: 'Simultaneously mitigating risks and maximizing throughput requires meticulous execution.',
        phoneticGuide: 'Sai-mul-téi-ni-os-li mí-ti-guei-ting risks end mák-si-mai-zing zrú-put ri-kwáiers me-tí-kiu-los ek-se-kiú-shon.',
        mexicanTip: '"Throughput" combina la "th" sorda /θ/ con "r". Requiere precisión de dicción.',
        explanation: 'Prueba de maestría fonética en articulación rápida y clusters complejos.'
      },
      // C2 - 2
      {
        id: 'diag_s_c2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C2',
        prompt: 'Pronuncia con elocuencia y matiz discursivo de nivel nativo:',
        audioText: 'Her eloquence and incisive critique dismantled the opposing arguments effortlessly.',
        targetText: 'Her eloquence and incisive critique dismantled the opposing arguments effortlessly.',
        phoneticGuide: 'Jer é-lo-kwens end in-sái-siv cri-tík dis-mán-teld di o-póu-zing ár-giu-ments éf-fort-les-li.',
        mexicanTip: 'El acento en "critique" recae en la segunda sílaba (cri-TÍK).',
        explanation: 'Demuestra ritmo, cadencia y precisión fonética de maestría C2.'
      }
    ]
  },

  // ==========================================
  // 3. LISTENING (12 Preguntas totales)
  // ==========================================
  listening: {
    discipline: 'listening',
    name: 'Listening',
    label: 'Listening (Comprensión Auditiva)',
    baseQuestions: [
      // A1 - 1
      {
        id: 'diag_l_a1_1',
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
        mexicanTip: 'En EE.UU. a las papas fritas se les llama "french fries" o simplemente "fries".',
        explanation: 'Comprensión auditiva de vocabulario elemental de alimentos y pedidos.'
      },
      // A1 - 2
      {
        id: 'diag_l_a1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'A1',
        prompt: 'Escucha el audio y escribe la pregunta exacta en inglés:',
        audioText: 'Where is the subway station?',
        targetText: 'Where is the subway station?',
        acceptableAnswers: ['Where is the subway station', 'where is the subway station?'],
        mexicanTip: 'En la mayoría de las ciudades de EE.UU. se dice "subway" para el metro.',
        explanation: 'Reconocimiento auditivo de preguntas de ubicación cotidianas.'
      },
      // A2 - 1
      {
        id: 'diag_l_a2_1',
        discipline: 'listening',
        type: 'listening_select',
        level: 'A2',
        prompt: 'Escucha las indicaciones y elige la ruta que describe el hablante:',
        audioText: 'Walk straight for two blocks, then turn right on Elm Street. The bank is on your left.',
        targetText: 'Caminar 2 cuadras derecho, girar a la derecha en Elm St y el banco está a la izquierda',
        options: [
          'Caminar 3 cuadras, girar a la izquierda y el banco está enfrente',
          'Caminar 1 cuadra, doblar a la derecha y el banco está en la esquina',
          'Caminar 2 cuadras derecho, girar a la derecha en Elm St y el banco está a la izquierda',
          'Cruzar la calle Elm y entrar al banco a la derecha'
        ],
        mexicanTip: '"Blocks" significa cuadras o manzanas urbanas.',
        explanation: 'Comprensión de indicaciones espaciales: "two blocks", "turn right", "on your left".'
      },
      // A2 - 2
      {
        id: 'diag_l_a2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'A2',
        prompt: 'Escucha con atención y escribe la oración en pasado simple:',
        audioText: 'She bought a new laptop yesterday morning.',
        targetText: 'She bought a new laptop yesterday morning.',
        acceptableAnswers: ['She bought a new laptop yesterday morning'],
        mexicanTip: '"Bought" es el pasado irregular de "buy" (comprar). Suena /bɔːt/ ("bot").',
        explanation: 'Identificación auditiva de verbos irregulares en pasado simple.'
      },
      // B1 - 1
      {
        id: 'diag_l_b1_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B1',
        prompt: 'Escucha el mensaje y responde: ¿Por qué se canceló la reunión presencial?',
        audioText: 'Hey Carlos, due to heavy rain at the airport, my flight was delayed. We need to reschedule our meeting.',
        targetText: 'Porque el vuelo se retrasó debido a una fuerte lluvia en el aeropuerto',
        options: [
          'Porque Carlos no tenía conexión a internet',
          'Porque el vuelo se retrasó debido a una fuerte lluvia en el aeropuerto',
          'Porque la sala de conferencias estaba ocupada',
          'Porque cambiaron la fecha del proyecto al próximo mes'
        ],
        mexicanTip: '"Delayed" significa demorado o con retraso.',
        explanation: 'El mensaje indica claramente: "due to heavy rain at the airport, my flight was delayed".'
      },
      // B1 - 2
      {
        id: 'diag_l_b1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'B1',
        prompt: 'Escucha y transcribe la oración:',
        audioText: 'I cannot put up with this slow internet connection anymore.',
        targetText: 'I cannot put up with this slow internet connection anymore.',
        acceptableAnswers: [
          "I can't put up with this slow internet connection anymore.",
          "I cannot put up with this slow internet connection anymore",
          "I can't put up with this slow internet connection anymore"
        ],
        mexicanTip: '"Put up with" significa tolerar o aguantar una situación molesta.',
        explanation: 'Comprensión auditiva de phrasal verbs de uso frecuente.'
      },
      // B2 - 1
      {
        id: 'diag_l_b2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B2',
        prompt: 'Escucha la conversación de trabajo y responde: ¿Cuál es la fecha límite real?',
        audioText: 'Even though the client originally asked for the project by Wednesday, the team negotiated an extension until Friday noon.',
        targetText: 'El viernes al mediodía',
        options: [
          'El miércoles al final del día',
          'El viernes al mediodía',
          'El próximo lunes por la mañana',
          'El martes a primera hora'
        ],
        mexicanTip: '"Noon" es exactamente las 12:00 PM (mediodía).',
        explanation: 'Comprensión de condiciones de negociación y fechas límite ("Friday noon").'
      },
      // B2 - 2
      {
        id: 'diag_l_b2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'B2',
        prompt: 'Escucha la oración corporativa y escríbela con ortografía precisa:',
        audioText: 'Our quarterly revenue exceeded expectations despite inflation.',
        targetText: 'Our quarterly revenue exceeded expectations despite inflation.',
        acceptableAnswers: ['Our quarterly revenue exceeded expectations despite inflation'],
        mexicanTip: '"Quarterly revenue" hace referencia a los ingresos del trimestre.',
        explanation: 'Discriminación auditiva de términos financieros: "quarterly", "revenue", "exceeded".'
      }
    ],
    c1Questions: [
      // C1 - 1
      {
        id: 'diag_l_c1_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C1',
        prompt: 'Escucha el fragmento y determina la conclusión del ponente sobre la IA:',
        audioText: 'While artificial intelligence undoubtedly streamlines routine workflows, it does not obviate the necessity for critical human oversight.',
        targetText: 'Que optimiza tareas pero no elimina la necesidad del juicio crítico humano',
        options: [
          'Que la inteligencia artificial reemplazará todas las decisiones humanas',
          'Que las herramientas de IA son ineficientes para flujos de trabajo rutinarios',
          'Que optimiza tareas pero no elimina la necesidad del juicio crítico humano',
          'Que el juicio humano ya no aporta valor en entornos tecnológicos'
        ],
        mexicanTip: '"Obviate" es un verbo formal que significa hacer innecesario o evitar.',
        explanation: 'El expositor argumenta que la IA agiliza flujos pero no elimina la supervisión humana.'
      },
      // C1 - 2
      {
        id: 'diag_l_c1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'C1',
        prompt: 'Escucha y transcribe la declaración ejecutiva formal:',
        audioText: 'The board reached a unanimous consensus regarding the overseas expansion.',
        targetText: 'The board reached a unanimous consensus regarding the overseas expansion.',
        acceptableAnswers: ['The board reached a unanimous consensus regarding the overseas expansion'],
        mexicanTip: '"Unanimous consensus" = consenso unánime.',
        explanation: 'Transcripción auditiva de oraciones con vocabulario formal de alta complejidad.'
      }
    ],
    c2Questions: [
      // C2 - 1
      {
        id: 'diag_l_c2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C2',
        prompt: 'Escucha el análisis y deduce el significado de la metáfora económica:',
        audioText: 'The central bank is walking a tightrope between curbing rampant inflation and stifling economic growth, with very little margin for error.',
        targetText: 'Que se encuentra en una posición sumamente delicada intentando equilibrar dos objetivos opuestos',
        options: [
          'Que el banco central ha decidido ignorar la inflación por completo',
          'Que se encuentra en una posición sumamente delicada intentando equilibrar dos objetivos opuestos',
          'Que la economía ya superó todos los riesgos inflacionarios',
          'Que se aumentarán las tasas de interés sin considerar el crecimiento'
        ],
        mexicanTip: '"Walking a tightrope" = caminar sobre la cuerda floja (situación de alto riesgo y equilibrio fino).',
        explanation: 'Interpretación de metáforas complejas y análisis macroeconómico avanzado.'
      },
      // C2 - 2
      {
        id: 'diag_l_c2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'C2',
        prompt: 'Escucha y transcribe la conclusión académica de nivel maestría:',
        audioText: 'Empirical evidence corroborates the hypothesis that bilingualism enhances cognitive flexibility.',
        targetText: 'Empirical evidence corroborates the hypothesis that bilingualism enhances cognitive flexibility.',
        acceptableAnswers: ['Empirical evidence corroborates the hypothesis that bilingualism enhances cognitive flexibility'],
        mexicanTip: '"Corroborates" = corrobora / respalda con evidencia.',
        explanation: 'Discriminación y transcripción de vocabulario científico-académico C2.'
      }
    ]
  },

  // ==========================================
  // 4. READING (12 Preguntas totales)
  // ==========================================
  reading: {
    discipline: 'reading',
    name: 'Reading',
    label: 'Reading (Comprensión Lectora)',
    baseQuestions: [
      // A1 - 1
      {
        id: 'diag_r_a1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A1',
        passage: 'Carlos is from Monterrey, Mexico. He works as a graphic designer in San Antonio, Texas. He loves eating tacos on weekends and playing soccer on Sunday mornings.',
        prompt: '¿Dónde trabaja Carlos y qué deporte practica los domingos por la mañana?',
        targetText: 'Trabaja en San Antonio, Texas y juega fútbol los domingos por la mañana',
        options: [
          'Trabaja en Monterrey y come tacos los domingos',
          'Trabaja en San Antonio, Texas y juega fútbol los domingos por la mañana',
          'Trabaja en San Antonio y diseña páginas web los domingos',
          'Trabaja en Austin y juega baloncesto con amigos'
        ],
        mexicanTip: 'En EE.UU. "soccer" es el fútbol tradicional.',
        explanation: 'El texto especifica su ciudad de trabajo y su actividad deportiva dominical.'
      },
      // A1 - 2
      {
        id: 'diag_r_a1_2',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'A1',
        passage: 'The grocery store opens at 8:00 AM and closes at 10:00 PM every day. Fresh fruits and vegetables are on sale on Tuesdays.',
        prompt: 'Según el texto, ¿qué significa la frase "on sale"?',
        targetText: 'En oferta / con descuento',
        options: [
          'A la venta por primera vez',
          'Agotado en la tienda',
          'En oferta / con descuento',
          'Exclusivo para empleados'
        ],
        mexicanTip: '"On sale" significa en oferta/rebaja. "For sale" significa que algo está a la venta.',
        explanation: 'Identificación de términos comerciales esenciales en inglés.'
      },
      // A2 - 1
      {
        id: 'diag_r_a2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A2',
        passage: 'Dear Passengers: Flight AA 452 from Dallas to Mexico City has been moved to Gate C14. Boarding will start at 4:30 PM. Please have your passports and boarding passes ready.',
        prompt: '¿A qué puerta fue cambiado el vuelo y qué deben tener listo los pasajeros?',
        targetText: 'A la puerta C14; deben tener listos pasaportes y pases de abordar',
        options: [
          'A la puerta B12; deben tener listo su equipaje documentado',
          'A la puerta C14; deben tener listos pasaportes y pases de abordar',
          'A la puerta C14; deben pagar una tarifa de cambio de vuelo',
          'A la puerta A05; el vuelo saldrá a las 4:30 AM'
        ],
        mexicanTip: '"Gate" en aeropuertos se refiere a la puerta o sala de embarque.',
        explanation: 'Comprensión de avisos informativos breves y datos de viaje.'
      },
      // A2 - 2
      {
        id: 'diag_r_a2_2',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'A2',
        passage: 'Maria works remotely from Guadalajara for a company in California. She usually commutes to the local office on her bicycle.',
        prompt: '¿Qué significa el verbo "commutes" en este contexto?',
        targetText: 'Se traslada / viaja de su casa al lugar de trabajo',
        options: [
          'Comunica noticias a sus compañeros de equipo',
          'Se traslada / viaja de su casa al lugar de trabajo',
          'Cambia de puesto de trabajo frecuentemente',
          'Paga la renta mensual de su espacio'
        ],
        mexicanTip: '"Commute" es la palabra clave en inglés para el trayecto diario entre casa y trabajo.',
        explanation: '"Commute" significa desplazarse habitualmente al lugar de trabajo o estudio.'
      },
      // B1 - 1
      {
        id: 'diag_r_b1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B1',
        passage: 'Remote work has transformed cross-border collaboration between Mexican developers and American tech firms. Companies value Mexican engineers for their technical skills and for being in aligned time zones (CST/PST), making real-time communication seamless.',
        prompt: '¿Cuál es una ventaja clave destacada de los ingenieros mexicanos frente a equipos en otros continentes?',
        targetText: 'La alineación de zonas horarias que facilita la comunicación en tiempo real',
        options: [
          'Que pagan menos impuestos en sus países de origen',
          'La alineación de zonas horarias que facilita la comunicación en tiempo real',
          'Que no necesitan comunicarse en inglés',
          'Que únicamente trabajan los fines de semana'
        ],
        mexicanTip: '"Time zone alignment" (alineación de husos horarios) es uno de los mayores valores del nearshoring México-EE.UU.',
        explanation: 'El texto destaca explícitamente: "being in aligned time zones, making real-time communication seamless".'
      },
      // B1 - 2
      {
        id: 'diag_r_b1_2',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'B1',
        passage: 'The team lead warned that cutting corners on security testing to meet the deadline would jeopardize the entire release.',
        prompt: '¿Qué significa la expresión "cutting corners"?',
        targetText: 'Tomar atajos de mala calidad / hacer las cosas de forma descuidada para ahorrar tiempo',
        options: [
          'Recortar físicamente esquinas de un documento',
          'Tomar atajos de mala calidad / hacer las cosas de forma descuidada para ahorrar tiempo',
          'Contratar a más evaluadores de seguridad',
          'Aumentar el presupuesto asignado'
        ],
        mexicanTip: '"Cutting corners" equivale en español a "hacer las cosas al ahí se va o con atajos descuidados".',
        explanation: '"Cut corners" = economizar o acelerar un proceso sacrificando calidad.'
      },
      // B2 - 1
      {
        id: 'diag_r_b2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B2',
        passage: 'Electric vehicle adoption in North America is accelerating, driven by federal incentives and expanding charging networks. However, power grid resilience remains a bottleneck. Utilities must modernize transmission lines to prevent blackouts during peak demand.',
        prompt: 'Según el texto, ¿cuál es el obstáculo o cuello de botella principal para la adopción masiva?',
        targetText: 'La capacidad y resistencia de la red eléctrica para soportar la alta demanda sin apagones',
        options: [
          'La falta total de subsidios gubernamentales',
          'El costo elevado de la gasolina en invierno',
          'La capacidad y resistencia de la red eléctrica para soportar la alta demanda sin apagones',
          'La falta de interés de los fabricantes de automóviles'
        ],
        mexicanTip: '"Bottleneck" (cuello de botella) describe una restricción en la capacidad de un sistema.',
        explanation: 'El texto afirma: "power grid resilience remains a bottleneck" y señala la necesidad de modernizar líneas.'
      },
      // B2 - 2
      {
        id: 'diag_r_b2_2',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'B2',
        passage: 'Despite several initial setbacks during testing, the startup pivoted its product strategy and achieved solid market traction.',
        prompt: 'En el contexto empresarial y de tecnología, ¿qué significa "pivoted"?',
        targetText: 'Cambió estratégicamente de dirección o enfoque de producto',
        options: [
          'Cerró sus operaciones por falta de financiamiento',
          'Cambió estratégicamente de dirección o enfoque de producto',
          'Reubicó sus oficinas físicas a otra ciudad',
          'Contrató un nuevo departamento de ventas'
        ],
        mexicanTip: '"Pivot" es el término estándar para reorientar el modelo o producto de una empresa.',
        explanation: '"To pivot" = cambiar de estrategia conservando los aprendizajes previos.'
      }
    ],
    c1Questions: [
      // C1 - 1
      {
        id: 'diag_r_c1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C1',
        passage: 'The bilateral trade framework under the USMCA has stimulated unprecedented nearshoring investments in northern Mexico. Nevertheless, supply chain analysts caution that sustaining this momentum will hinge on substantive upgrades in logistics throughput, water security, and reliable clean energy availability.',
        prompt: '¿De qué depende principalmente sostener el impulso de inversiones según el pasaje?',
        targetText: 'De mejoras sustanciales en logística, seguridad hídrica y disponibilidad de energía limpia',
        options: [
          'De cancelar los tratados de libre comercio vigentes',
          'De mejoras sustanciales en logística, seguridad hídrica y disponibilidad de energía limpia',
          'De reducir el salario de los trabajadores técnicos',
          'De detener la construcción de nuevas plantas de manufactura'
        ],
        mexicanTip: '"Hinge on" significa "depender de manera determinante de algo".',
        explanation: 'El texto concluye: "sustaining this momentum will hinge on substantive upgrades in logistics, water, and clean energy".'
      },
      // C1 - 2
      {
        id: 'diag_r_c1_2',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'C1',
        passage: 'The investment proposal was ultimately rejected because the committee deemed the venture too precarious to warrant further capital allocation.',
        prompt: '¿Qué significa el adjetivo "precarious" en este contexto?',
        targetText: 'Incierto, inestable o con excesivo riesgo de pérdida',
        options: [
          'Altamente rentable y de bajo riesgo',
          'Incierto, inestable o con excesivo riesgo de pérdida',
          'Completamente garantizado por el gobierno',
          'Innovador y fácil de implementar'
        ],
        mexicanTip: '"Precarious" proviene del latín y comparte significado con "precario" (inestable / riesgoso).',
        explanation: '"Precarious" = not securely held or in position; dangerously likely to fall or collapse.'
      }
    ],
    c2Questions: [
      // C2 - 1
      {
        id: 'diag_r_c2_1',
        discipline: 'reading',
        type: 'reading_vocab_context',
        level: 'C2',
        passage: 'The board praised the CEO for her perspicacious assessment of macroeconomic headwinds, which shielded the enterprise from an otherwise devastating liquidity crunch.',
        prompt: '¿Qué denota el término "perspicacious" en este pasaje?',
        targetText: 'Perspicaz / con agudo entendimiento y juicio certero',
        options: [
          'Temeraria y desinteresada en los riesgos financieros',
          'Indecisa en momentos de incertidumbre de mercado',
          'Perspicaz / con agudo entendimiento y juicio certero',
          'Dependiente de asesores externos para cada decisión'
        ],
        mexicanTip: '"Perspicacious" = dotada de gran agudeza visual y mental para anticipar escenarios complejos.',
        explanation: '"Perspicacious" = having a ready insight into and understanding of things; discerning.'
      },
      // C2 - 2
      {
        id: 'diag_r_c2_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C2',
        passage: 'The ubiquitous proliferation of algorithmic content curation has subtly reshaped intellectual autonomy, fostering echo chambers wherein counter-attitudinal viewpoints are systematically marginalized, thereby attenuating cognitive flexibility.',
        prompt: 'Según el texto, ¿cuál es una consecuencia directa de la curación algorítmica constante?',
        targetText: 'Que debilita la flexibilidad cognitiva al aislar al usuario de posturas contrarias a sus creencias',
        options: [
          'Que estimula el pensamiento crítico y la diversidad de opiniones',
          'Que debilita la flexibilidad cognitiva al aislar al usuario de posturas contrarias a sus creencias',
          'Que incrementa la velocidad de lectura de los usuarios',
          'Que elimina las noticias falsas de manera automática'
        ],
        mexicanTip: '"Attenuating" significa debilitar o disminuir gradualmente.',
        explanation: 'El pasaje expone que aislar posturas divergentes genera cámaras de eco y "attenuates cognitive flexibility".'
      }
    ]
  }
};

/**
 * Flattened baseline list of questions for compatibility
 */
export const PLACEMENT_EXAM_QUESTIONS: Exercise[] = [
  ...DIAGNOSTIC_EXAM_BANK.writing.baseQuestions,
  ...DIAGNOSTIC_EXAM_BANK.speaking.baseQuestions,
  ...DIAGNOSTIC_EXAM_BANK.listening.baseQuestions,
  ...DIAGNOSTIC_EXAM_BANK.reading.baseQuestions
];

/**
 * CEFR LEVEL TIERS with 10 Sub-Levels per Tier (A1.0 -> A1.9, A2.0 -> A2.9, etc.)
 */
export const LEVEL_TIERS: LevelTier[] = [
  {
    level: 'A1',
    title: 'Nivel A1: Principiante / Acceso',
    description: 'Bases sólidas: presentaciones, saludos, números, comida, direcciones y pronunciación inicial de inglés estadounidense.',
    color: 'emerald',
    accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    subLevels: [
      { subLevel: 'A1.0', sessionsCount: 8, description: 'Introducción fonética US, alfabeto, saludos y frases de supervivencia.' },
      { subLevel: 'A1.1', sessionsCount: 8, description: 'Verbo To Be, pronombres, nacionalidades y profesiones.' },
      { subLevel: 'A1.2', sessionsCount: 8, description: 'Números, dinero (dólares/centavos), compras básicas y comida rápida.' },
      { subLevel: 'A1.3', sessionsCount: 8, description: 'Familia, descripciones físicas y vocabulario del hogar.' },
      { subLevel: 'A1.4', sessionsCount: 8, description: 'Rutina diaria, la hora, días de la semana y preposiciones in/on/at.' },
      { subLevel: 'A1.5', sessionsCount: 8, description: 'Presente simple: gustos, disgustos y hobbies (like, love, hate).' },
      { subLevel: 'A1.6', sessionsCount: 8, description: 'Lugares en la ciudad, transporte público (subway/bus) y pedir direcciones.' },
      { subLevel: 'A1.7', sessionsCount: 8, description: 'Preguntas básicas con WH (What, Where, When, Who, Why, How).' },
      { subLevel: 'A1.8', sessionsCount: 8, description: 'Sustantivos contables e incontables, ordenar en restaurantes.' },
      { subLevel: 'A1.9', sessionsCount: 8, description: 'Consolidación A1 y preparación para el Examen de Certificación A1.' }
    ],
    milestoneExam: {
      id: 'milestone_a1',
      title: 'Examen de Certificación Nivel A1',
      description: 'Demuestra tu dominio en las 4 disciplinas del nivel A1 para desbloquear el Nivel A2.',
      minPassScore: 75
    }
  },
  {
    level: 'A2',
    title: 'Nivel A2: Plataforma / Elemental',
    description: 'Comunicación en situaciones cotidianas, hablar del pasado, viajes a EE.UU., compras y trabajo básico.',
    color: 'sky',
    accentBg: 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400',
    subLevels: [
      { subLevel: 'A2.0', sessionsCount: 8, description: 'Pasado Simple: verbos regulares, terminaciones -ed y fonética /t/, /d/, /ɪd/.' },
      { subLevel: 'A2.1', sessionsCount: 8, description: 'Pasado Simple: verbos irregulares de alta frecuencia en EE.UU.' },
      { subLevel: 'A2.2', sessionsCount: 8, description: 'Pasado Continuo y narración de anécdotas e historias pasadas.' },
      { subLevel: 'A2.3', sessionsCount: 8, description: 'Planes futuros: "Going to" vs "Will" y modismos de fin de semana.' },
      { subLevel: 'A2.4', sessionsCount: 8, description: 'Comparativos y superlativos: comparar ciudades, precios y tecnología.' },
      { subLevel: 'A2.5', sessionsCount: 8, description: 'Verbos modales: Can, Could, Must, Should (permisos, consejos y reglas).' },
      { subLevel: 'A2.6', sessionsCount: 8, description: 'Viajes a EE.UU.: aduanas, aeropuertos, hoteles y renta de autos.' },
      { subLevel: 'A2.7', sessionsCount: 8, description: 'Salud, síntomas, farmacia y emergencias médicas.' },
      { subLevel: 'A2.8', sessionsCount: 8, description: 'Presente Perfecto básico: experiencias vividas con "ever" y "never".' },
      { subLevel: 'A2.9', sessionsCount: 8, description: 'Consolidación A2 y simulacro de certificación.' }
    ],
    milestoneExam: {
      id: 'milestone_a2',
      title: 'Examen de Certificación Nivel A2',
      description: 'Supera este examen de 4 disciplinas para validar tu nivel elemental y acceder a B1 Intermedio.',
      minPassScore: 75
    }
  },
  {
    level: 'B1',
    title: 'Nivel B1: Intermedio / Umbral',
    description: 'Fluidez conversacional, debates, expresar opiniones, emails de trabajo y comprensión de audios naturales.',
    color: 'amber',
    accentBg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
    subLevels: [
      { subLevel: 'B1.0', sessionsCount: 8, description: 'Presente Perfecto vs Pasado Simple y marcadores de tiempo (already, yet, just).' },
      { subLevel: 'B1.1', sessionsCount: 8, description: 'Phrasal Verbs indispensables en la vida cotidiana en EE.UU.' },
      { subLevel: 'B1.2', sessionsCount: 8, description: 'Primer y Segundo Condicional (If I have vs If I had).' },
      { subLevel: 'B1.3', sessionsCount: 8, description: 'Emails profesionales, juntas de trabajo y etiqueta laboral en EE.UU.' },
      { subLevel: 'B1.4', sessionsCount: 8, description: 'Voz Pasiva en presente y pasado para reportes y noticias.' },
      { subLevel: 'B1.5', sessionsCount: 8, description: 'Cláusulas relativas (who, which, that, where, whose).' },
      { subLevel: 'B1.6', sessionsCount: 8, description: 'Estilo indirecto (Reported Speech) y transmitir mensajes de terceros.' },
      { subLevel: 'B1.7', sessionsCount: 8, description: 'Entrevistas de trabajo en empresas de EE.UU. (preguntas frecuentes y respuestas).' },
      { subLevel: 'B1.8', sessionsCount: 8, description: 'Modismos estadounidenses populares vs equivalentes mexicanos.' },
      { subLevel: 'B1.9', sessionsCount: 8, description: 'Consolidación B1 y preparación para dar el salto a B2.' }
    ],
    milestoneExam: {
      id: 'milestone_b1',
      title: 'Examen de Certificación Nivel B1',
      description: 'Evaluación integral intermedia requerida para desbloquear el nivel B2 Avanzado.',
      minPassScore: 75
    }
  },
  {
    level: 'B2',
    title: 'Nivel B2: Intermedio Alto / Independiente',
    description: 'Nivel profesional y académico: negociaciones, presentaciones complejas, fluidez espontánea y redacción.',
    color: 'indigo',
    accentBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    subLevels: [
      { subLevel: 'B2.0', sessionsCount: 8, description: 'Tercer condicional y condicionales mixtos para hipótesis pasadas.' },
      { subLevel: 'B2.1', sessionsCount: 8, description: 'Modales de deducción en pasado (must have, could have, should have).' },
      { subLevel: 'B2.2', sessionsCount: 8, description: 'Linking words avanzados y conectores de discurso para ensayos y reportes.' },
      { subLevel: 'B2.3', sessionsCount: 8, description: 'Redacción corporativa: propuestas, minutas y análisis de mercado.' },
      { subLevel: 'B2.4', sessionsCount: 8, description: 'Negociación y manejo de objeciones con clientes estadounidenses.' },
      { subLevel: 'B2.5', sessionsCount: 8, description: 'Comprensión auditiva de podcasts y conferencias de ritmo nativo rápido.' },
      { subLevel: 'B2.6', sessionsCount: 8, description: 'Slang moderno estadounidense, humor, ironía y matices culturales.' },
      { subLevel: 'B2.7', sessionsCount: 8, description: 'Estructuras enfáticas (cleft sentences: "What we really need is...").' },
      { subLevel: 'B2.8', sessionsCount: 8, description: 'Presentaciones ejecutivas efectivas con storytelling de datos.' },
      { subLevel: 'B2.9', sessionsCount: 8, description: 'Consolidación B2 y examen de suficiencia profesional.' }
    ],
    milestoneExam: {
      id: 'milestone_b2',
      title: 'Examen de Certificación Nivel B2',
      description: 'Valida tu dominio independiente y profesional del idioma para ingresar al nivel C1 Operativo.',
      minPassScore: 80
    }
  },
  {
    level: 'C1',
    title: 'Nivel C1: Dominio Operativo Eficaz',
    description: 'Uso flexible del idioma para fines sociales, académicos y profesionales de alto impacto y precisión léxica.',
    color: 'violet',
    accentBg: 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400',
    subLevels: [
      { subLevel: 'C1.0', sessionsCount: 8, description: 'Inversión negativa formal y estructuras retóricas avanzadas.' },
      { subLevel: 'C1.1', sessionsCount: 8, description: 'Subjuntivo en inglés y cláusulas de mandato formal.' },
      { subLevel: 'C1.2', sessionsCount: 8, description: 'Colocaciones sofisticadas y precisión léxica en finanzas y tecnología.' },
      { subLevel: 'C1.3', sessionsCount: 8, description: 'Debate de alto nivel: argumentación, contraargumentación y oratoria.' },
      { subLevel: 'C1.4', sessionsCount: 8, description: 'Análisis de textos legales, contratos y cláusulas comerciales bilaterales.' },
      { subLevel: 'C1.5', sessionsCount: 8, description: 'Variaciones dialectales en EE.UU. (Southern, New York, West Coast, Midwestern).' },
      { subLevel: 'C1.6', sessionsCount: 8, description: 'Estrategias de oratoria y modulación de voz para liderar equipos globales.' },
      { subLevel: 'C1.7', sessionsCount: 8, description: 'Comprensión de literatura contemporánea y artículos de fondo (The NYT, WSJ).' },
      { subLevel: 'C1.8', sessionsCount: 8, description: 'Metáforas complejas y modismos corporativos de alto rango.' },
      { subLevel: 'C1.9', sessionsCount: 8, description: 'Consolidación C1 y certificación de fluidez operativa avanzada.' }
    ],
    milestoneExam: {
      id: 'milestone_c1',
      title: 'Examen de Certificación Nivel C1',
      description: 'Prueba de maestría operativa requerida para acceder al nivel C2 Maestría.',
      minPassScore: 85
    }
  },
  {
    level: 'C2',
    title: 'Nivel C2: Maestría / Bilingüismo Nativo',
    description: 'Comprensión y expresión espontánea con precisión casi nativa, sutilezas estilísticas y control total de registro.',
    color: 'rose',
    accentBg: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
    subLevels: [
      { subLevel: 'C2.0', sessionsCount: 8, description: 'Matices estilísticos, ironía sutil y humor cultural estadounidense.' },
      { subLevel: 'C2.1', sessionsCount: 8, description: 'Redacción de discursos diplomáticos, editoriales y whitepapers.' },
      { subLevel: 'C2.2', sessionsCount: 8, description: 'Fonética nativa perfecta: asimilación, elisión y ritmo prosódico.' },
      { subLevel: 'C2.3', sessionsCount: 8, description: 'Traducción e interpretación simultánea US-México.' },
      { subLevel: 'C2.4', sessionsCount: 8, description: 'Crítica cultural, sátira política y análisis mediático profundo.' },
      { subLevel: 'C2.5', sessionsCount: 8, description: 'Terminología jurídica y jurisprudencia comparada.' },
      { subLevel: 'C2.6', sessionsCount: 8, description: 'Negociaciones de fusiones y adquisiciones internacionales.' },
      { subLevel: 'C2.7', sessionsCount: 8, description: 'Redacción académica para revistas indexadas de investigación.' },
      { subLevel: 'C2.8', sessionsCount: 8, description: 'Dominio de registros extremos: del más formal al argot callejero más cerrado.' },
      { subLevel: 'C2.9', sessionsCount: 8, description: 'Graduación y Examen Final de Maestría C2.' }
    ],
    milestoneExam: {
      id: 'milestone_c2',
      title: 'Examen de Maestría Nivel C2',
      description: 'El examen cumbre de NorteñoEnglish que certifica el bilingüismo pleno en inglés estadounidense.',
      minPassScore: 90
    }
  }
];

/**
 * MEXICAN SPANISH VS AMERICAN ENGLISH IDIOM COMPARISONS
 */
export const MEXICAN_US_IDIOMS: IdiomComparison[] = [
  {
    id: 'idiom_1',
    usPhrase: "I'm down / I'm in",
    mexicanEquivalent: "Jalo / Me apunto / Cuenten conmigo",
    literalTranslation: "Estoy abajo / Estoy dentro",
    contextUsage: "Aceptar un plan o invitación con entusiasmo entre amigos.",
    audioText: "Are you coming to the concert tonight? - Yeah, I'm down!",
    exampleSentence: "Are you coming to the concert tonight? - Yeah, I'm down!",
    exampleTranslation: "¿Vienes al concierto hoy en la noche? - ¡Sí, jalo!"
  },
  {
    id: 'idiom_2',
    usPhrase: "Piece of cake",
    mexicanEquivalent: "Está pelada / Está regalado / Pan comido",
    literalTranslation: "Pedazo de pastel",
    contextUsage: "Decir que una tarea o examen es extremadamente fácil.",
    audioText: "Don't worry about the driving test, it's a piece of cake.",
    exampleSentence: "Don't worry about the driving test, it's a piece of cake.",
    exampleTranslation: "No te preocupes por el examen de manejo, está bien fácil / regalado."
  },
  {
    id: 'idiom_3',
    usPhrase: "Hang out",
    mexicanEquivalent: "Echar el rol / Convivir / Pasar el rato",
    literalTranslation: "Colgar afuera",
    contextUsage: "Reunirse de manera informal sin un plan estricto.",
    audioText: "Let's hang out this Saturday and grab some tacos.",
    exampleSentence: "Let's hang out this Saturday and grab some tacos.",
    exampleTranslation: "Vamos a echar el rol este sábado y nos comemos unos tacos."
  },
  {
    id: 'idiom_4',
    usPhrase: "Spill the beans",
    mexicanEquivalent: "Soltar la sopa / Chismear / Decir el secreto",
    literalTranslation: "Derramar los frijoles",
    contextUsage: "Revelar un secreto o contar todo lo que pasó.",
    audioText: "Come on, tell me who you saw at the party. Spill the beans!",
    exampleSentence: "Come on, tell me who you saw at the party. Spill the beans!",
    exampleTranslation: "Ándale, dime a quién viste en la fiesta. ¡Suelta la sopa!"
  },
  {
    id: 'idiom_5',
    usPhrase: "Hit the nail on the head",
    mexicanEquivalent: "Darle al clavo / Dar en el blanco",
    literalTranslation: "Golpear el clavo en la cabeza",
    contextUsage: "Decir exactamente lo correcto o identificar la causa exacta de algo.",
    audioText: "Your analysis hit the nail on the head; that is our biggest issue.",
    exampleSentence: "Your analysis hit the nail on the head; that is our biggest issue.",
    exampleTranslation: "Tu análisis le dio al mero clavo; ese es nuestro mayor problema."
  },
  {
    id: 'idiom_6',
    usPhrase: "Take a rain check",
    mexicanEquivalent: "Dejársela para después / Te la debo para la otra",
    literalTranslation: "Tomar un cheque de lluvia",
    contextUsage: "Declinar cortésmente una invitación prometiendo reprogramarla después.",
    audioText: "I'd love to go for drinks, but can I take a rain check? I'm exhausted.",
    exampleSentence: "I'd love to go for drinks, but can I take a rain check? I'm exhausted.",
    exampleTranslation: "Me encantaría ir por unas cheves, pero ¿me la dejas para la otra? Estoy muerto de cansancio."
  },
  {
    id: 'idiom_7',
    usPhrase: "Under the weather",
    mexicanEquivalent: "Andar achicopalado / Andar malo / Sentirse indispuesto",
    literalTranslation: "Bajo el clima",
    contextUsage: "Sentirse enfermo de forma leve (resfriado, dolor de cabeza).",
    audioText: "I won't be able to make it to the office today, I feel under the weather.",
    exampleSentence: "I won't be able to make it to the office today, I feel under the weather.",
    exampleTranslation: "No voy a poder ir a la oficina hoy, ando medio malo."
  },
  {
    id: 'idiom_8',
    usPhrase: "Break a leg",
    mexicanEquivalent: "¡Mucha mierda! / ¡Éxito! / ¡Rómpela!",
    literalTranslation: "Rómpete una pierna",
    contextUsage: "Desear buena suerte antes de una presentación o show sin decir 'good luck' por superstición.",
    audioText: "You prepared well for the pitch. Go out there and break a leg!",
    exampleSentence: "You prepared well for the pitch. Go out there and break a leg!",
    exampleTranslation: "Te preparaste súper bien para la presentación. ¡Sal y rómpela!"
  }
];

/**
 * HELPER TO GENERATE SESSIONS FOR A SUB-LEVEL (ENRICHED WITH THEMATIC AMERICAN ENGLISH SYLLABUS)
 */
export function generateSessionsForSubLevel(subLevel: SubLevel, isUnlockedInitial: boolean, completedList: string[]): SessionMeta[] {
  const count = 8;
  const sessions: SessionMeta[] = [];
  const themeData = getSubLevelTheme(subLevel);

  for (let i = 1; i <= count; i++) {
    const sessionId = `${subLevel}_s${i}`;
    const isCompleted = completedList.includes(sessionId);
    // Unlocked if first session of unlocked sublevel or previous session is completed
    const prevSessionId = `${subLevel}_s${i - 1}`;
    const isUnlocked = isUnlockedInitial && (i === 1 || completedList.includes(prevSessionId));

    const plan = themeData.sessions.find(s => s.sessionNumber === i) || {
      sessionNumber: i,
      title: `Sesión ${i}: ${themeData.unitTitle}`,
      topic: themeData.unitTitle,
      grammarFocus: themeData.keyGrammar,
      vocabFocus: themeData.keyVocabulary,
      realLifeContext: themeData.realWorldScenario,
      culturalNote: 'Enfoque conversacional del inglés estadounidense estándar.'
    };

    sessions.push({
      id: sessionId,
      subLevel,
      sessionNumber: i,
      title: plan.title,
      description: `${plan.grammarFocus} • ${plan.realLifeContext}`,
      topic: plan.topic,
      iconName: i % 2 === 0 ? 'Sparkles' : 'BookOpen',
      isCompleted,
      isUnlocked,
      thematicUnit: themeData.unitTitle,
      unitNumber: themeData.unitNumber,
      grammarFocus: plan.grammarFocus,
      vocabFocus: plan.vocabFocus,
      realLifeContext: plan.realLifeContext,
      culturalNote: plan.culturalNote,
      americanBookModule: themeData.americanBookModule
    });
  }

  return sessions;
}
