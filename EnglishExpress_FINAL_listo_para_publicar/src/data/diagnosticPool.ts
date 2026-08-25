import { Exercise, DiagnosticDiscipline, CEFRLevel } from '../types';
import { shuffleArray } from '../utils/audio';

/**
 * RICH DYNAMIC DIAGNOSTIC QUESTION POOLS
 * Contains multiple varied questions per CEFR level (A1, A2, B1, B2, C1, C2)
 * for Writing, Speaking, Listening, and Reading.
 * Ensures every diagnostic/reevaluation test has unique, unpredictable questions and randomized options.
 */

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
  // 1. WRITING (Multi-variant Pool)
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
        options: ['family', 'in', 'live', 'with', 'at', 'Mexico', 'my', 'I'],
        mexicanTip: 'Para ciudades y países usamos la preposición "in" (in Mexico, in Monterrey).',
        explanation: 'Estructura estándar Sujeto (I) + Verbo (live) + Lugar (in Mexico) + Compañía (with my family).'
      },
      {
        id: 'dyn_w_a1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Completa con la forma correcta del verbo: "They _____ to music every morning."',
        targetText: 'listen',
        options: ['listens', 'listening', 'listen', 'are listen'],
        mexicanTip: 'En presente simple con pronombres plurales (they, we, you), el verbo va en forma base sin "s".',
        explanation: '"They" requiere la forma base del verbo "listen" en presente simple.'
      },
      {
        id: 'dyn_w_a1_3',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A1',
        prompt: 'Ordena las palabras para formar: "Ella tiene dos hermanos."',
        targetText: 'She has two brothers',
        options: ['brothers', 'has', 'She', 'two', 'have', 'brother'],
        mexicanTip: 'Con He/She/It en presente simple se utiliza "has", no "have".',
        explanation: '"She has two brothers" es la conjugación correcta en 3ra persona singular.'
      },
      {
        id: 'dyn_w_a1_4',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A1',
        prompt: 'Selecciona el artículo o pronombre correcto: "_____ is your favorite food?"',
        targetText: 'What',
        options: ['Who', 'Where', 'What', 'When'],
        mexicanTip: 'Para preguntar por cosas u opciones abiertas usamos "What".',
        explanation: '"What" se utiliza para preguntar sobre cosas o conceptos.'
      }
    ],
    A2: [
      {
        id: 'dyn_w_a2_1',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Selecciona la preposición correcta de tiempo: "We have our English class _____ Friday at 9:00 AM."',
        targetText: 'on',
        options: ['at', 'on', 'in', 'by'],
        mexicanTip: 'En inglés se usa "on" para los días de la semana (on Monday, on Friday).',
        explanation: 'La regla de preposiciones temporales establece "on" para días específicos.'
      },
      {
        id: 'dyn_w_a2_2',
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
      {
        id: 'dyn_w_a2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'A2',
        prompt: 'Elige la forma en pasado continuo: "While I _____ a shower, the doorbell rang."',
        targetText: 'was taking',
        options: ['were taking', 'was taking', 'took', 'am taking'],
        mexicanTip: 'Con "I" en pasado continuo usamos "was" + gerundio (was taking).',
        explanation: 'Acción interrumpida en pasado: While + past continuous (was taking).'
      },
      {
        id: 'dyn_w_a2_4',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'A2',
        prompt: 'Ordena la comparación: "Este auto es más rápido que el mío."',
        targetText: 'This car is faster than mine',
        options: ['mine', 'car', 'faster', 'This', 'is', 'than', 'my'],
        mexicanTip: 'Los adjetivos cortos añaden "-er" (faster than). Al final usamos el pronombre posesivo "mine".',
        explanation: 'Estructura comparativa: Adjetivo-er + than + pronombre posesivo.'
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
        acceptableAnswers: [
          'If I had more free time, I would study another language',
          'If I had more time, I would study another language.',
          'If I had more time, I would study another language',
          'If I had more free time I would study another language.'
        ],
        mexicanTip: 'Segundo condicional para situaciones hipotéticas: If + Pasado Simple (had) ..., would + verbo base (would study).',
        explanation: 'Estructura condicional hipotética: "If I had ..., I would study...".'
      },
      {
        id: 'dyn_w_b1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Elige el conector adecuado: "_____ it was raining heavily, we walked to the office."',
        targetText: 'Although',
        options: ['Because', 'Although', 'Despite', 'In spite of'],
        mexicanTip: '"Although" (aunque) introduce una cláusula con sujeto y verbo ("it was raining").',
        explanation: '"Although" introduce contraste con una oración completa subordinada.'
      },
      {
        id: 'dyn_w_b1_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B1',
        prompt: 'Completa con el verbo modal de deducción: "She didn\'t answer the phone; she _____ be sleeping."',
        targetText: 'must',
        options: ['must', 'can', 'should to', 'ought'],
        mexicanTip: '"Must be" expresa una deducción lógica de alta certeza.',
        explanation: '"Must" se usa para deducciones lógicas afirmativas en presente.'
      },
      {
        id: 'dyn_w_b1_4',
        discipline: 'writing',
        type: 'writing_translate',
        level: 'B1',
        prompt: 'Traduce: "He vivido en esta ciudad desde el año pasado."',
        targetText: 'I have lived in this city since last year.',
        acceptableAnswers: [
          'I have lived in this city since last year',
          'I have been living in this city since last year.',
          'I have been living in this city since last year'
        ],
        mexicanTip: 'Usa "since" para puntos de inicio en el tiempo (since last year).',
        explanation: 'Presente perfecto para acciones que empezaron en el pasado y continúan.'
      }
    ],
    B2: [
      {
        id: 'dyn_w_b2_1',
        discipline: 'writing',
        type: 'writing_reorder',
        level: 'B2',
        prompt: 'Ordena la frase en presente perfecto continuo: "Llevo trabajando aquí durante dos años."',
        targetText: 'I have been working here for two years',
        options: ['working', 'years', 'I', 'since', 'two', 'here', 'have', 'for', 'been'],
        mexicanTip: 'En inglés usamos "for" para expresar duración de tiempo (for two years).',
        explanation: 'Presente Perfecto Continuo: have/has been + verbo-ing.'
      },
      {
        id: 'dyn_w_b2_2',
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
      },
      {
        id: 'dyn_w_b2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B2',
        prompt: 'Completa el tercer condicional: "If you had informed me earlier, I _____ you."',
        targetText: 'would have helped',
        options: ['would help', 'would have helped', 'will have helped', 'had helped'],
        mexicanTip: 'Tercer condicional para situaciones irreales del pasado: If + Past Perfect ..., would have + participio.',
        explanation: 'Estructura: would have + past participle (would have helped).'
      },
      {
        id: 'dyn_w_b2_4',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'B2',
        prompt: 'Elige la frase verbal correcta: "We need to _____ an innovative solution to this bottleneck."',
        targetText: 'come up with',
        options: ['come up with', 'run out of', 'put up with', 'look forward to'],
        mexicanTip: '"Come up with" es un phrasal verb esencial en ambientes laborales que significa "idear / proponer".',
        explanation: '"Come up with" significa idear o proponer una solución/plan.'
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
        mexicanTip: 'Tras adverbios negativos iniciales como "Hardly", se invierte el sujeto y el auxiliar.',
        explanation: 'Inversión enfática formal para acciones secuenciales en pasado.'
      },
      {
        id: 'dyn_w_c1_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Selecciona la forma del subjuntivo formal: "It is crucial that each employee _____ the security protocols."',
        targetText: 'follow',
        options: ['follows', 'is following', 'follow', 'followed'],
        mexicanTip: 'En el subjuntivo formal de inglés estadounidense ("It is crucial that..."), el verbo va en forma base.',
        explanation: 'Subjuntivo mandativo: "that each employee follow" (forma base sin "s").'
      },
      {
        id: 'dyn_w_c1_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C1',
        prompt: 'Completa con la frase de participio reducida: "_____ by the unexpected feedback, the team revised the entire architecture."',
        targetText: 'Surprised',
        options: ['Surprising', 'Surprised', 'Having surprised', 'To surprise'],
        mexicanTip: 'La cláusula de participio pasivo "Surprised by..." sintetiza oraciones subordinadas formales.',
        explanation: 'Past participle clause para describir la causa o reacción del sujeto.'
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
        acceptableAnswers: [
          'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results.',
          'Notwithstanding the unforeseen obstacles, the initiative yielded extraordinary results.',
          'Despite the unforeseen impediments, the initiative yielded extraordinary results.',
          'Notwithstanding the unforeseen impediments, the initiative yielded extraordinary results'
        ],
        mexicanTip: '"Notwithstanding" y "yielded" reflejan el registro léxico y sintáctico del nivel C2.',
        explanation: 'Construcción con conectores preposicionales y vocabulario avanzado.'
      },
      {
        id: 'dyn_w_c2_2',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C2',
        prompt: 'Completa con la inversión enfática de grado: "So compelling _____ that the committee unanimously endorsed the proposal."',
        targetText: 'were the arguments presented',
        options: ['the arguments presented were', 'were the arguments presented', 'was the arguments presented', 'the arguments were presented'],
        mexicanTip: 'Estructura "So + adjetivo + verbo + sujeto": demuestra dominio estilístico avanzado.',
        explanation: 'Inversión tras "So + adjetivo": requiere "were the arguments presented".'
      },
      {
        id: 'dyn_w_c2_3',
        discipline: 'writing',
        type: 'writing_fill_blank',
        level: 'C2',
        prompt: 'Selecciona la construcción de inversión negativa absoluta: "Under no circumstances _____ confidential client records without prior authorization."',
        targetText: 'should you disclose',
        options: ['you should disclose', 'should you disclose', 'you must disclose', 'did you disclosed'],
        mexicanTip: '"Under no circumstances" requiere inversión auxiliar-sujeto obligatoria.',
        explanation: 'Inversión negativa obligatoria con modal.'
      }
    ]
  },

  // ==========================================
  // 2. SPEAKING (Multi-variant Pool)
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
        mexicanTip: 'En "nice to meet you", conecta las palabras con fluidez y naturalidad.',
        explanation: 'Saludo elemental de presentación personal en inglés.'
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
        mexicanTip: 'En EE.UU. la "t" en "water" suena suave, similar a una "r" sencilla en español ("guá-rer").',
        explanation: 'Practica la entonación cortés de solicitud con "Can I get...".'
      },
      {
        id: 'dyn_s_a1_3',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia esta frase indicando tu profesión y procedencia:',
        audioText: 'I am a software engineer and I live in Guadalajara.',
        targetText: 'I am a software engineer and I live in Guadalajara.',
        phoneticGuide: 'Ái am a sóft-guer en-dji-níer end ái liv in Gwa-da-la-já-ra.',
        mexicanTip: '"Live" lleva vocal corta /ɪ/ ("liv"), mientras que "leave" lleva vocal larga ("liiv").',
        explanation: 'Presentación laboral y ubicación en presente simple.'
      },
      {
        id: 'dyn_s_a1_4',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A1',
        prompt: 'Pronuncia despidiéndote de manera amable:',
        audioText: 'Thank you very much. Have a wonderful day!',
        targetText: 'Thank you very much. Have a wonderful day!',
        phoneticGuide: 'Zenkiu ve-ri mach. Jav a wán-der-ful déi!',
        mexicanTip: 'La "th" en "Thank" se pronuncia sacando ligeramente la punta de la lengua.',
        explanation: 'Despedida cortés cotidiana.'
      }
    ],
    A2: [
      {
        id: 'dyn_s_a2_1',
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
      {
        id: 'dyn_s_a2_2',
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
      {
        id: 'dyn_s_a2_3',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia sobre planes a corto plazo:',
        audioText: 'We are going to visit our grandparents this weekend.',
        targetText: 'We are going to visit our grandparents this weekend.',
        phoneticGuide: 'Güi ar gó-ing tu ví-sit áur grand-pá-rents dis güík-end.',
        mexicanTip: '"Weekend" enfatiza la primera sílaba (WÍIK-end).',
        explanation: 'Expresión de planes futuros con "going to".'
      },
      {
        id: 'dyn_s_a2_4',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'A2',
        prompt: 'Pronuncia una disculpa cordial:',
        audioText: 'Sorry for being late, there was heavy traffic on the highway.',
        targetText: 'Sorry for being late, there was heavy traffic on the highway.',
        phoneticGuide: 'Só-ri for bí-ing léit, der güos jé-vi trá-fic on da jái-güei.',
        mexicanTip: '"Highway" se pronuncia "jái-güei".',
        explanation: 'Disculpa y justificación con vocabulario de transporte.'
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
        mexicanTip: '"Focus" lleva diptongo: "fóu-cus". Enlaza "focus on" fluidamente: "fóu-ca-son".',
        explanation: 'Expresión clara de opinión y énfasis en términos clave.'
      },
      {
        id: 'dyn_s_b1_2',
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
      {
        id: 'dyn_s_b1_3',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B1',
        prompt: 'Pronuncia una sugerencia colaborativa:',
        audioText: 'Why do not we schedule a quick meeting to go over the budget?',
        targetText: 'Why do not we schedule a quick meeting to go over the budget?',
        phoneticGuide: 'Guái dont güi ské-djul a kwik mí-ting tu gou óu-ver da bá-dyet?',
        mexicanTip: '"Schedule" en US English suena "ské-djul".',
        explanation: 'Sugerencia laboral educada con entonación natural.'
      }
    ],
    B2: [
      {
        id: 'dyn_s_b2_1',
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
      {
        id: 'dyn_s_b2_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia con enlace natural de palabras (linking):',
        audioText: 'I would have called you earlier, but my phone ran out of battery.',
        targetText: 'I would have called you earlier, but my phone ran out of battery.',
        phoneticGuide: 'Ái wudav cold iu ér-li-er, bat mái foun ran áutov bá-te-ri.',
        mexicanTip: 'En habla natural estadounidense, "would have" se contrae a "wud-av".',
        explanation: 'Dominio de formas débiles y reducciones en condicionales pasados.'
      },
      {
        id: 'dyn_s_b2_3',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'B2',
        prompt: 'Pronuncia con claridad y seguridad:',
        audioText: 'We must find a balance between speed of delivery and code quality.',
        targetText: 'We must find a balance between speed of delivery and code quality.',
        phoneticGuide: 'Güi mast fáind a bá-lans bi-twíin spiid ov de-lí-ve-ri end coud kwá-li-ti.',
        mexicanTip: '"Delivery" se pronuncia "de-lí-ve-ri" con énfasis en la segunda sílaba.',
        explanation: 'Demuestra fluidez en términos técnicos y corporativos.'
      }
    ],
    C1: [
      {
        id: 'dyn_s_c1_1',
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
      {
        id: 'dyn_s_c1_2',
        discipline: 'speaking',
        type: 'speaking_pronounce',
        level: 'C1',
        prompt: 'Pronuncia con fluidez continua y ritmo prosódico natural:',
        audioText: 'Implementing comprehensive measures will inevitably enhance long-term productivity.',
        targetText: 'Implementing comprehensive measures will inevitably enhance long-term productivity.',
        phoneticGuide: 'Im-ple-mén-ting com-pre-jén-siv mé-zhurs güil in-é-vi-ta-bli en-jáns long-term pro-duc-tí-vi-ti.',
        mexicanTip: 'En "measures", el sonido /ʒ/ es suave.',
        explanation: 'Entonación fluida de oraciones compuestas con adjetivos multislábicos.'
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
        mexicanTip: '"Throughput" combina la "th" sorda /θ/ con "r". Requiere precisión de dicción.',
        explanation: 'Prueba de maestría fonética en articulación rápida y clusters complejos.'
      },
      {
        id: 'dyn_s_c2_2',
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
  // 3. LISTENING (Multi-variant Pool)
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
        mexicanTip: 'En EE.UU. a las papas fritas se les llama "french fries" o simplemente "fries".',
        explanation: 'Comprensión auditiva de vocabulario elemental de alimentos y pedidos.'
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
        mexicanTip: 'En la mayoría de las ciudades de EE.UU. se dice "subway" para el metro.',
        explanation: 'Reconocimiento auditivo de preguntas de ubicación cotidianas.'
      },
      {
        id: 'dyn_l_a1_3',
        discipline: 'listening',
        type: 'listening_select',
        level: 'A1',
        prompt: 'Escucha el horario del vuelo y elige la hora de salida anunciada:',
        audioText: 'Attention passengers, flight 402 to Chicago will depart at 7:30 PM.',
        targetText: 'Vuelo 402 sale a las 7:30 PM',
        options: [
          'Vuelo 402 sale a las 7:30 PM',
          'Vuelo 402 sale a las 8:30 PM',
          'Vuelo 402 se canceló por lluvia',
          'Vuelo 402 sale a las 7:00 AM'
        ],
        mexicanTip: 'Atención a los números "seven-thirty PM".',
        explanation: 'Identificación auditiva de números y horarios en anuncios de aeropuerto.'
      }
    ],
    A2: [
      {
        id: 'dyn_l_a2_1',
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
        explanation: 'Comprensión de indicaciones espaciales.'
      },
      {
        id: 'dyn_l_a2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'A2',
        prompt: 'Escucha con atención y escribe la oración en pasado simple:',
        audioText: 'She bought a new laptop yesterday morning.',
        targetText: 'She bought a new laptop yesterday morning.',
        acceptableAnswers: ['She bought a new laptop yesterday morning'],
        mexicanTip: '"Bought" es el pasado irregular de "buy" (comprar).',
        explanation: 'Identificación auditiva de verbos irregulares en pasado simple.'
      },
      {
        id: 'dyn_l_a2_3',
        discipline: 'listening',
        type: 'listening_select',
        level: 'A2',
        prompt: 'Escucha el reporte del clima y responde: ¿Cómo estará el tiempo mañana?',
        audioText: 'Tomorrow it will be sunny in the morning, but expect heavy showers in the late afternoon.',
        targetText: 'Soleado por la mañana con lluvias fuertes por la tarde',
        options: [
          'Nevada intensa todo el día',
          'Soleado por la mañana con lluvias fuertes por la tarde',
          'Completamente nublado y con frío',
          'Día despejado y caluroso sin lluvia'
        ],
        mexicanTip: '"Heavy showers" se refiere a chubascos o lluvias fuertes repentinas.',
        explanation: 'Comprensión auditiva de vocabulario meteorológico cotidiano.'
      }
    ],
    B1: [
      {
        id: 'dyn_l_b1_1',
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
          'Porque el cliente cambió el presupuesto'
        ],
        mexicanTip: '"Flight was delayed" significa que el vuelo sufrió un retraso o demora.',
        explanation: 'Comprensión auditiva de causas y consecuencias laborales.'
      },
      {
        id: 'dyn_l_b1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'B1',
        prompt: 'Escucha con atención y escribe la frase condicional exacta:',
        audioText: 'If you need any help, please let me know right away.',
        targetText: 'If you need any help, please let me know right away.',
        acceptableAnswers: [
          'If you need any help please let me know right away',
          'If you need any help, please let me know right away'
        ],
        mexicanTip: '"Right away" es una frase hecha en EE.UU. que significa "de inmediato / en seguida".',
        explanation: 'Dictado de estructuras de ofrecimiento y frases idiomáticas cotidianas.'
      },
      {
        id: 'dyn_l_b1_3',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B1',
        prompt: 'Escucha la conversación en la cafetería y elige qué problema ocurrió:',
        audioText: 'Excuse me, I ordered an iced latte with oat milk, but this tastes like regular cow milk.',
        targetText: 'Le dieron leche regular de vaca en lugar de leche de avena',
        options: [
          'El café estaba demasiado caliente',
          'Le dieron leche regular de vaca en lugar de leche de avena',
          'Le cobraron de más en la cuenta',
          'No tenían vasos para llevar'
        ],
        mexicanTip: '"Oat milk" significa leche de avena.',
        explanation: 'Comprensión de reclamos amables y preferencias dietéticas en restaurantes.'
      }
    ],
    B2: [
      {
        id: 'dyn_l_b2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'B2',
        prompt: 'Escucha el fragmento del podcast corporativo y determina la postura del entrevistado:',
        audioText: 'While artificial intelligence will automate repetitive tasks, human creativity and critical judgment will remain irreplaceable in strategic decision-making.',
        targetText: 'La IA automatizará tareas rutinarias, pero la creatividad y juicio humano siguen siendo insustituibles',
        options: [
          'La IA reemplazará todos los puestos de trabajo humanos en dos años',
          'La IA no tiene ninguna utilidad práctica en empresas',
          'La IA automatizará tareas rutinarias, pero la creatividad y juicio humano siguen siendo insustituibles',
          'Las empresas deben prohibir la automatización de decisiones'
        ],
        mexicanTip: '"Irreplaceable" significa insustituible / irremplazable.',
        explanation: 'Comprensión auditiva de argumentos matizados y vocabulario profesional.'
      },
      {
        id: 'dyn_l_b2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'B2',
        prompt: 'Escucha y transcribe la frase con modales perfectos en pasado:',
        audioText: 'We should have double checked the contract before signing it.',
        targetText: 'We should have double checked the contract before signing it.',
        acceptableAnswers: [
          'We should have double checked the contract before signing it',
          'We should have double-checked the contract before signing it.',
          'We should have double-checked the contract before signing it'
        ],
        mexicanTip: '"Double checked" significa verificar dos veces / revisar a detalle.',
        explanation: 'Reconocimiento auditivo de formas modales de arrepentimiento o consejo pasado (should have + participio).'
      }
    ],
    C1: [
      {
        id: 'dyn_l_c1_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C1',
        prompt: 'Escucha el análisis económico y determina la implicación principal del orador:',
        audioText: 'Contrary to initial market forecasts, the fiscal contraction precipitated an abrupt deceleration in consumer spending across suburban retail corridors.',
        targetText: 'La contracción fiscal provocó una desaceleración abrupta en el gasto de los consumidores',
        options: [
          'El gasto del consumidor creció exponencialmente en las zonas suburbanas',
          'La contracción fiscal provocó una desaceleración abrupta en el gasto de los consumidores',
          'Los pronósticos iniciales del mercado resultaron completamente exactos',
          'El gobierno decidió reducir las tasas de interés de inmediato'
        ],
        mexicanTip: '"Precipitated an abrupt deceleration" connota causar una desaceleración repentina e imprevista.',
        explanation: 'Comprensión auditiva de discurso macroeconómico formal de alta densidad léxica.'
      },
      {
        id: 'dyn_l_c1_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'C1',
        prompt: 'Escucha con precisión y transcribe este extracto ejecutivo:',
        audioText: 'The unprecedented surge in demand overwhelmed our existing supply chain infrastructure.',
        targetText: 'The unprecedented surge in demand overwhelmed our existing supply chain infrastructure.',
        acceptableAnswers: [
          'The unprecedented surge in demand overwhelmed our existing supply chain infrastructure'
        ],
        mexicanTip: '"Unprecedented surge" (aumento sin precedentes) y "overwhelmed" (rebasó / colapsó) son términos de registro C1.',
        explanation: 'Transcripción auditiva exacta de vocabulario corporativo y estructuras complejas.'
      }
    ],
    C2: [
      {
        id: 'dyn_l_c2_1',
        discipline: 'listening',
        type: 'listening_comprehension',
        level: 'C2',
        prompt: 'Escucha la disertación académica e identifica el argumento central sobre la retórica:',
        audioText: 'The speaker subtly undermined empirical consensus by interweaving poignant anecdotes that appealed directly to visceral heuristics rather than verifiable data.',
        targetText: 'El orador debilitó sutilmente el consenso empírico apelando a heurísticas viscerales en lugar de datos verificables',
        options: [
          'El orador presentó pruebas estadísticas irrefutables y datos matemáticos',
          'El orador debilitó sutilmente el consenso empírico apelando a heurísticas viscerales en lugar de datos verificables',
          'El público rechazó unánimemente las anécdotas del expositor',
          'La conferencia demostró la superioridad del método cuantitativo'
        ],
        mexicanTip: '"Visceral heuristics" y "poignant anecdotes" expresan matices retóricos sofisticados.',
        explanation: 'Evaluación de comprensión auditiva crítica de nivel maestría nativa.'
      },
      {
        id: 'dyn_l_c2_2',
        discipline: 'listening',
        type: 'listening_dictation',
        level: 'C2',
        prompt: 'Escucha a velocidad nativa natural y transcribe con absoluta fidelidad ortográfica:',
        audioText: 'Meticulous scrutiny of the archival manuscripts revealed multiple subtle discrepancies.',
        targetText: 'Meticulous scrutiny of the archival manuscripts revealed multiple subtle discrepancies.',
        acceptableAnswers: [
          'Meticulous scrutiny of the archival manuscripts revealed multiple subtle discrepancies'
        ],
        mexicanTip: '"Scrutiny" y "discrepancies" evalúan discriminación fonética fina de alta velocidad.',
        explanation: 'Dictado de nivel C2 con palabras de etimología latina y consonantes sutiles.'
      }
    ]
  },

  // ==========================================
  // 4. READING (Multi-variant Pool)
  // ==========================================
  reading: {
    A1: [
      {
        id: 'dyn_r_a1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A1',
        prompt: 'Lee el letrero de la tienda:\n\n"WELCOME TO GREEN GROCERY\nOpen: Monday to Saturday (8:00 AM - 9:00 PM)\nSunday: Closed\nFree delivery on orders over $30."\n\n¿Qué día está cerrada la tienda?',
        targetText: 'El domingo',
        options: [
          'El sábado',
          'El domingo',
          'El lunes',
          'Nunca cierra'
        ],
        mexicanTip: '"Closed" significa cerrado.',
        explanation: 'Identificación de información básica en textos cotidianos.'
      },
      {
        id: 'dyn_r_a1_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A1',
        prompt: 'Lee el mensaje de texto:\n\n"Hi Maria! The party starts at 8 PM at Carlos\'s house. Bring some snacks or soda. See you tonight!"\n\n¿Dónde es la fiesta y qué debes llevar?',
        targetText: 'En casa de Carlos a las 8 PM y llevar botanas o refresco',
        options: [
          'En un restaurante a las 9 PM y llevar pastel',
          'En casa de Carlos a las 8 PM y llevar botanas o refresco',
          'En el parque a las 7 PM y llevar comida preparada',
          'En casa de María y llevar bebidas calientes'
        ],
        mexicanTip: '"Snacks" equivale a botanas/tentempiés y "soda" a refresco.',
        explanation: 'Comprensión de mensajes cortos y solicitudes simples.'
      },
      {
        id: 'dyn_r_a1_3',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A1',
        prompt: 'Lees en una etiqueta:\n\n"100% Cotton. Wash with cold water only. Do not bleach."\n\n¿Cómo debes lavar esta prenda?',
        targetText: 'Solo con agua fría y sin blanqueador',
        options: [
          'Con agua hirviendo y cloro',
          'Solo con agua fría y sin blanqueador',
          'Lavado en seco únicamente',
          'Con agua caliente y planchar de inmediato'
        ],
        mexicanTip: '"Bleach" significa blanqueador o cloro.',
        explanation: 'Comprensión de instrucciones breves en etiquetas de productos.'
      }
    ],
    A2: [
      {
        id: 'dyn_r_a2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A2',
        prompt: 'Lee el correo electrónico breve:\n\n"Subject: Team Lunch Tomorrow\nHi team,\nJust a reminder that our quarterly team lunch will take place tomorrow at 1:30 PM at Olive Bistro. Vegetarian and gluten-free options will be available. Please confirm your attendance by 5:00 PM today.\nBest,\nSarah"\n\n¿A qué hora debe confirmar el equipo su asistencia?',
        targetText: 'Hoy antes de las 5:00 PM',
        options: [
          'Mañana a la 1:30 PM',
          'Hoy antes de las 5:00 PM',
          'Al llegar al restaurante',
          'La próxima semana'
        ],
        mexicanTip: '"Confirm your attendance" significa confirmar tu asistencia.',
        explanation: 'Extracción de detalles clave en correos electrónicos de trabajo.'
      },
      {
        id: 'dyn_r_a2_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'A2',
        prompt: 'Lee el anuncio de viaje:\n\n"Passengers on Flight UA 782 to Houston: Your departure gate has changed from Gate B12 to Gate C4. Boarding will begin in 15 minutes."\n\n¿Qué cambio ocurrió?',
        targetText: 'La puerta de embarque cambió a la C4',
        options: [
          'El vuelo fue cancelado por mal tiempo',
          'La puerta de embarque cambió a la C4',
          'El vuelo saldrá con 3 horas de retraso',
          'El destino cambió a Dallas'
        ],
        mexicanTip: '"Departure gate" es la puerta de salida o abordaje.',
        explanation: 'Comprensión de avisos de transporte y cambios operativos.'
      }
    ],
    B1: [
      {
        id: 'dyn_r_b1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B1',
        prompt: 'Lee el artículo sobre trabajo remoto:\n\n"A recent survey revealed that hybrid work models have boosted employee satisfaction by 34%. Workers cite reduced commute stress and flexible hours as primary benefits. However, managers emphasize the ongoing need to maintain spontaneous communication and team cohesion through weekly synchronization rituals."\n\n¿Cuál es el principal reto que señalan los gerentes?',
        targetText: 'Mantener la comunicación espontánea y la cohesión del equipo',
        options: [
          'El costo del transporte público de los empleados',
          'Mantener la comunicación espontánea y la cohesión del equipo',
          'Que la productividad cayó un 34%',
          'La falta de computadoras en casa'
        ],
        mexicanTip: '"Commute" se refiere al trayecto o traslado diario entre la casa y el trabajo.',
        explanation: 'Comprensión de ideas principales y contrastes en artículos informativos.'
      },
      {
        id: 'dyn_r_b1_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B1',
        prompt: 'Lee la reseña de producto:\n\n"While the wireless headset delivers pristine sound quality and exceptional noise cancellation, the battery life falls slightly short of the advertised 20 hours when using maximum volume."\n\n¿Cuál es la crítica del usuario hacia los audífonos?',
        targetText: 'La duración de la batería rinde un poco menos de lo prometido a volumen máximo',
        options: [
          'El sonido es de muy mala calidad y distorsiona',
          'La cancelación de ruido no funciona en absoluto',
          'La duración de la batería rinde un poco menos de lo prometido a volumen máximo',
          'Son demasiado pesados e incómodos para viajar'
        ],
        mexicanTip: '"Falls short of" es una expresión que significa "quedarse corto respecto a lo esperado".',
        explanation: 'Identificación de matices y evaluaciones críticas en reseñas.'
      }
    ],
    B2: [
      {
        id: 'dyn_r_b2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B2',
        prompt: 'Lee el informe estratégico:\n\n"The company\'s decision to pivot toward renewable energy infrastructure was initially met with skepticism by short-term investors. Nonetheless, long-term indicators suggest that early adoption of decarbonization technologies has fortified the firm\'s market resilience and shielded it from impending regulatory penalties."\n\n¿Cuál fue el resultado a largo plazo de la decisión de la empresa?',
        targetText: 'Fortaleció la resiliencia de la empresa en el mercado y la protegió de futuras sanciones regulatorias',
        options: [
          'Provocó multas regulatorias millonarias y la quiebra inmediata',
          'Fortaleció la resiliencia de la empresa en el mercado y la protegió de futuras sanciones regulatorias',
          'Hizo que todos los inversionistas retiraran su capital permanentemente',
          'Obligó a la empresa a regresar a combustibles fósiles'
        ],
        mexicanTip: '"Shielded from" significa protegido o blindado contra algo negativo.',
        explanation: 'Comprensión de relaciones causa-efecto complejas y vocabulario de negocios.'
      },
      {
        id: 'dyn_r_b2_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'B2',
        prompt: 'Lee el análisis de ciberseguridad:\n\n"Multi-factor authentication, while inherently robust, is not completely impervious to sophisticated social engineering campaigns that exploit user complacency rather than cryptographic vulnerabilities."\n\n¿Por qué la autenticación de múltiples factores puede verse comprometida?',
        targetText: 'Por campañas de ingeniería social que explotan el descuido o confianza del usuario',
        options: [
          'Porque la criptografía utilizada está matemáticamente obsoleta',
          'Por campañas de ingeniería social que explotan el descuido o confianza del usuario',
          'Porque los servidores de autenticación siempre fallan',
          'Porque los usuarios nunca crean contraseñas seguras'
        ],
        mexicanTip: '"Impervious to" significa impenetrable o inmune a algo.',
        explanation: 'Comprensión de conceptos técnicos y factores humanos en seguridad digital.'
      }
    ],
    C1: [
      {
        id: 'dyn_r_c1_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C1',
        prompt: 'Lee el ensayo de análisis discursivo:\n\n"The author’s rhetorical strategy relies heavily on juxtaposing ostensible egalitarian ideals against the insidious entrenchment of bureaucratic hierarchies, thereby exposing the inherent contradictions within contemporary institutional reforms."\n\n¿Cuál es el propósito central de la estrategia retórica del autor?',
        targetText: 'Evidenciar las contradicciones inherentes yuxtaponiendo ideales igualitarios con jerarquías burocráticas',
        options: [
          'Defender la expansión sin límites de las jerarquías burocráticas',
          'Evidenciar las contradicciones inherentes yuxtaponiendo ideales igualitarios con jerarquías burocráticas',
          'Proponer la abolición total de todas las instituciones contemporáneas',
          'Demostrar que los ideales igualitarios nunca han existido en la historia'
        ],
        mexicanTip: '"Juxtaposing" (yuxtaponer) y "insidious entrenchment" (arraigo insidioso) son giros discursivos avanzados C1.',
        explanation: 'Análisis textual crítico e interpretación de recursos retóricos.'
      },
      {
        id: 'dyn_r_c1_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C1',
        prompt: 'Lee el artículo de política económica internacional:\n\n"Rather than dampening volatility, the central bank’s unilateral intervention exacerbated speculative capital flight, culminating in an unprecedented liquidity squeeze across emerging economies."\n\n¿Qué efecto no deseado tuvo la intervención unilateral del banco central?',
        targetText: 'Empeoró la fuga especulativa de capitales y desencadenó una crisis de liquidez sin precedentes',
        options: [
          'Estabilizó las tasas de cambio de forma permanente en todas las economías',
          'Empeoró la fuga especulativa de capitales y desencadenó una crisis de liquidez sin precedentes',
          'Eliminó por completo la volatilidad en los mercados emergentes',
          'Fomentó la inversión productiva a largo plazo en infraestructura'
        ],
        mexicanTip: '"Exacerbated" (empeoró/agravó) y "liquidity squeeze" (estrangulamiento de liquidez) reflejan análisis financiero formal.',
        explanation: 'Comprensión de consecuencias macroeconómicas y lenguaje especializado.'
      }
    ],
    C2: [
      {
        id: 'dyn_r_c2_1',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C2',
        prompt: 'Lee el tratado epistemológico:\n\n"The ubiquitous proliferation of algorithmic curation fosters an epistemic closure wherein disparate viewpoints are not merely marginalized but rendered fundamentally illegible, truncating the dialectical friction indispensable for genuine intellectual innovation."\n\nSegún el texto, ¿cuál es la consecuencia más grave de la curaduría algorítmica?',
        targetText: 'Produce un cierre epistémico que anula la fricción dialéctica indispensable para la innovación intelectual',
        options: [
          'Acelera la velocidad de procesamiento de datos en centros de cómputo',
          'Produce un cierre epistémico que anula la fricción dialéctica indispensable para la innovación intelectual',
          'Garantiza la democratización absoluta de todos los puntos de vista globales',
          'Elimina la necesidad de innovación en las ciencias humanas'
        ],
        mexicanTip: '"Epistemic closure" (cierre epistemológico) y "dialectical friction" (fricción dialéctica) corresponden al registro filosófico C2.',
        explanation: 'Comprensión profunda de textos conceptuales abstractos y vocabulario de máxima sofisticación.'
      },
      {
        id: 'dyn_r_c2_2',
        discipline: 'reading',
        type: 'reading_comprehension',
        level: 'C2',
        prompt: 'Lee la crítica literaria:\n\n"Far from indulging in superfluous aestheticism, the novelist’s laconic prose operates as an austere scaffold, compelling the reader to confront the profound ethical vacuum that undergirds the protagonist’s ostensibly benevolent machinations."\n\n¿Qué función cumple la prosa lacónica del novelista según el crítico?',
        targetText: 'Actúa como una estructura austera que obliga a encarar el vacío ético detrás de las maquinaciones del protagonista',
        options: [
          'Embellece la narrativa con descripciones poéticas superfluas y redundantes',
          'Actúa como una estructura austera que obliga a encarar el vacío ético detrás de las maquinaciones del protagonista',
          'Demuestra la falta de destreza técnica del autor para escribir novelas extensas',
          'Celebra la bondad incondicional de los actos del personaje principal'
        ],
        mexicanTip: '"Laconic prose" (prosa lacónica/concisa) y "austere scaffold" (andamio austero) muestran maestría literaria.',
        explanation: 'Interpretación de estilo literario y sutilezas éticas en textos de registro superior.'
      }
    ]
  }
};

/**
 * Generates a dynamic, fully randomized set of 8 progressive diagnostic questions
 * (2 random A1, 2 random A2, 2 random B1, 2 random B2) with shuffled options
 * so that no test can ever be memorized.
 */
export function generateDynamicDiagnosticQuestions(discipline: DiagnosticDiscipline): {
  baseQuestions: Exercise[];
  c1Questions: Exercise[];
  c2Questions: Exercise[];
} {
  const pool = DYNAMIC_DIAGNOSTIC_POOLS[discipline];

  // Helper to pick N distinct random items and shuffle their internal options/words
  const pickAndShuffle = (questions: Exercise[], count: number): Exercise[] => {
    const shuffled = shuffleArray([...questions]);
    const picked = shuffled.slice(0, count);

    return picked.map((q, idx) => {
      const cloned: Exercise = {
        ...q,
        id: `${q.id}_rnd_${Date.now()}_${idx}`
      };

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
