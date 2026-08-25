import { Exercise, Discipline, SubLevel, CEFRLevel } from '../types';
import { generateThematicExercises } from './thematicExercises';

/**
 * Rich exercise database categorized by CEFR level, Sub-level, and Discipline
 * with Mexican Spanish context and US American pronunciation phonetics.
 */
export const EXERCISE_BANK: Record<CEFRLevel, Exercise[]> = {
  A1: [
    // Writing
    {
      id: 'a1_w_1',
      discipline: 'writing',
      type: 'writing_reorder',
      level: 'A1',
      subLevel: 'A1.0',
      prompt: 'Ordena las palabras para decir: "Hola, me llamo Carlos y soy de Guadalajara."',
      targetText: 'Hello, my name is Carlos and I am from Guadalajara.',
      options: ['is', 'from', 'Hello,', 'Carlos', 'are', 'and', 'my', 'Guadalajara.', 'am', 'name', 'in', 'I'],
      mexicanTip: 'En inglés estadounidense, las presentaciones formales e informales usan "I am from" o "I\'m from".',
      explanation: 'Sujeto + Verbo To Be (I am) + Preposición de origen (from).'
    },
    {
      id: 'a1_w_2',
      discipline: 'writing',
      type: 'writing_fill_blank',
      level: 'A1',
      subLevel: 'A1.1',
      prompt: 'Completa con el artículo correcto: "I want to order _____ apple pie."',
      targetText: 'an',
      options: ['a', 'an', 'the', 'some'],
      mexicanTip: 'Usamos "an" antes de palabras que inician con sonido de vocal (apple pie).',
      explanation: 'Regla de artículos indefinidos: "a" antes de consonante ("a taco"), "an" antes de sonido vocal ("an apple").'
    },
    {
      id: 'a1_w_3',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'A1',
      subLevel: 'A1.2',
      prompt: 'Traduce al inglés americano: "¿Cuánto cuesta este café?"',
      targetText: 'How much is this coffee?',
      acceptableAnswers: ['How much does this coffee cost?', 'How much is this coffee'],
      mexicanTip: 'En cafeterías de EE.UU. "How much is this coffee?" es la forma más natural y rápida de preguntar el precio.',
      explanation: '"How much is..." se usa para preguntar el precio de cosas incontables o singulares.'
    },
    {
      id: 'a1_w_4',
      discipline: 'writing',
      type: 'writing_reorder',
      level: 'A1',
      subLevel: 'A1.3',
      prompt: 'Ordena: "Mi hermana trabaja en un hospital en Monterrey."',
      targetText: 'My sister works in a hospital in Monterrey',
      options: ['hospital', 'works', 'Monterrey', 'at', 'in', 'My', 'work', 'sister', 'a', 'in'],
      mexicanTip: 'En presente simple con "she" agregamos "-s" al verbo: "works".',
      explanation: 'Tercera persona singular (he/she/it) requiere terminación -s o -es.'
    },

    // Speaking
    {
      id: 'a1_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.0',
      prompt: 'Pronuncia esta frase para pedir la cuenta en un restaurante:',
      audioText: 'Could we get the check, please?',
      targetText: 'Could we get the check, please?',
      phoneticGuide: 'Cud güi guét da chek, pliis?',
      mexicanTip: 'En EE.UU. la cuenta del restaurante se pide como "the check". En el Reino Unido dicen "the bill". En México decimos "la cuenta".',
      explanation: 'Recuerda que la "L" en "could" es muda: suena "cud".'
    },
    {
      id: 'a1_s_2',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.1',
      prompt: 'Pronuncia esta respuesta cortés:',
      audioText: "You're very welcome, have a great day!",
      targetText: "You're very welcome, have a great day!",
      phoneticGuide: 'Iur vé-ri güél-com, jav a greit déi!',
      mexicanTip: 'En "have a", conecta los sonidos para que suene continuo: "já-va".',
      explanation: 'La letra "v" se pronuncia vibrando el labio inferior con los dientes superiores.'
    },
    {
      id: 'a1_s_3',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A1',
      subLevel: 'A1.2',
      prompt: 'Pronuncia esta frase con la "t" suave estadounidense (Flap T):',
      audioText: 'I need a little bit of water.',
      targetText: 'I need a little bit of water.',
      phoneticGuide: 'Ái niid a lí-rol bitov guá-rer.',
      mexicanTip: 'En inglés estadounidense "little" suena "lí-rol" y "water" suena "guá-rer".',
      explanation: 'El sonido "Flap T" ocurre cuando la T está entre vocales y no es tónica.'
    },

    // Listening
    {
      id: 'a1_l_1',
      discipline: 'listening',
      type: 'listening_select',
      level: 'A1',
      subLevel: 'A1.0',
      prompt: 'Escucha el audio y selecciona qué bebida prefiere la persona:',
      audioText: 'I do not like black coffee, I always drink hot chocolate with milk.',
      targetText: 'Chocolate caliente con leche',
      options: ['Chocolate caliente con leche', 'Café negro sin azúcar', 'Té helado de limón', 'Agua de sabor'],
      mexicanTip: '"Black coffee" es café americano sin leche ni crema.',
      explanation: 'La persona aclara: "I do not like black coffee, I always drink hot chocolate with milk".'
    },
    {
      id: 'a1_l_2',
      discipline: 'listening',
      type: 'listening_dictation',
      level: 'A1',
      subLevel: 'A1.1',
      prompt: 'Escucha y escribe la frase en inglés:',
      audioText: 'What is your phone number?',
      targetText: 'What is your phone number?',
      acceptableAnswers: ['What is your phone number', "What's your phone number?"],
      mexicanTip: 'En números de teléfono en EE.UU., el cero se suele pronunciar como la letra "O" /oʊ/ o "zero".',
      explanation: 'Pregunta elemental para pedir datos de contacto.'
    },
    {
      id: 'a1_l_3',
      discipline: 'listening',
      type: 'listening_select',
      level: 'A1',
      subLevel: 'A1.2',
      prompt: 'Escucha el precio que menciona el cajero:',
      audioText: 'That will be twelve dollars and fifty cents, cash or card?',
      targetText: '$12.50 dólares',
      options: ['$12.50 dólares', '$20.15 dólares', '$15.20 dólares', '$12.15 dólares'],
      mexicanTip: 'Diferencia auditiva clave: "twelve" (12) vs "twenty" (20).',
      explanation: '"Twelve dollars and fifty cents" = 12 dólares con 50 centavos.'
    },

    // Reading
    {
      id: 'a1_r_1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'A1',
      subLevel: 'A1.0',
      passage: 'Luis is a mechanic from Puebla. Every morning at 7:00 AM, he opens his workshop in Houston, Texas. He repairs cars and trucks. In the afternoon, he calls his mother in Mexico.',
      prompt: '¿En qué ciudad trabaja Luis y a qué se dedica?',
      targetText: 'Es mecánico y trabaja en Houston, Texas',
      options: [
        'Es mecánico y trabaja en Houston, Texas',
        'Es doctor y trabaja en Puebla, México',
        'Es chofer de camión en Monterrey',
        'Es maestro de inglés en Dallas'
      ],
      mexicanTip: 'Muchos mexicanos en Texas y EE.UU. usan el inglés a diario en talleres ("auto shop") y servicios.',
      explanation: 'El texto indica "Luis is a mechanic" y "opens his workshop in Houston, Texas".'
    },
    {
      id: 'a1_r_2',
      discipline: 'reading',
      type: 'reading_vocab_context',
      level: 'A1',
      subLevel: 'A1.1',
      passage: 'Welcome to Supermart! Today we have fresh avocados, limes, and corn tortillas in the produce section.',
      prompt: '¿Qué tipo de productos encuentras en la sección "produce"?',
      targetText: 'Frutas y verduras frescas',
      options: ['Frutas y verduras frescas', 'Aparatos electrónicos', 'Ropa para caballero', 'Medicinas y vitaminas'],
      mexicanTip: 'En los supermercados de EE.UU. "produce" (con acento en la primera sílaba: PRÓ-dus) es el área de frutas y verduras.',
      explanation: '"Produce" como sustantivo se refiere a productos agrícolas frescos (aguacates, limones, etc.).'
    }
  ],

  A2: [
    // Writing
    {
      id: 'a2_w_1',
      discipline: 'writing',
      type: 'writing_reorder',
      level: 'A2',
      subLevel: 'A2.0',
      prompt: 'Ordena en pasado simple: "Ayer visitamos a nuestros primos en El Paso, Texas."',
      targetText: 'Yesterday we visited our cousins in El Paso, Texas',
      options: ['Yesterday', 'we', 'visited', 'our', 'cousins', 'in', 'El', 'Paso,', 'Texas', 'visiting', 'at'],
      mexicanTip: 'El pasado de "visit" es regular ("visited") y su terminación se pronuncia /ɪd/ ("ví-zi-tid").',
      explanation: 'Estructura temporal: Adverbio de tiempo (Yesterday) + Sujeto (we) + Verbo en pasado (visited) + Objeto.'
    },
    {
      id: 'a2_w_2',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'A2',
      subLevel: 'A2.1',
      prompt: 'Traduce: "No pude encontrar mis llaves esta mañana."',
      targetText: 'I could not find my keys this morning.',
      acceptableAnswers: [
        "I couldn't find my keys this morning.",
        "I could not find my keys this morning",
        "I couldn't find my keys this morning"
      ],
      mexicanTip: '"Could not" / "couldn\'t" es el pasado de "can\'t" (no poder).',
      explanation: 'Verbo modal en pasado: could not + verbo en forma base (find).'
    },
    {
      id: 'a2_w_3',
      discipline: 'writing',
      type: 'writing_fill_blank',
      level: 'A2',
      subLevel: 'A2.2',
      prompt: 'Elige la opción comparativa correcta: "Mexico City is much _____ than Austin."',
      targetText: 'bigger',
      options: ['bigger', 'more big', 'biggest', 'more bigger'],
      mexicanTip: 'Los adjetivos cortos de 1 sílaba como "big" forman el comparativo duplicando consonante y agregando "-er" (bigger).',
      explanation: 'Regla comparativa: big -> bigger. "More big" es un error común en hispanohablantes.'
    },

    // Speaking
    {
      id: 'a2_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A2',
      subLevel: 'A2.0',
      prompt: 'Pronuncia esta frase para pedir indicaciones de navegación:',
      audioText: 'Excuse me, how do I get to the highway?',
      targetText: 'Excuse me, how do I get to the highway?',
      phoneticGuide: 'Eks-kiús mi, jáu du ái guét tu da jái-güei?',
      mexicanTip: 'En EE.UU. a la autopista o periférico le llaman "highway" o "freeway". En México decimos "la autopista" o "la pista".',
      explanation: 'Estructura estándar para pedir direcciones: "How do I get to...".'
    },
    {
      id: 'a2_s_2',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'A2',
      subLevel: 'A2.1',
      prompt: 'Pronuncia con entonación de planes futuros (going to):',
      audioText: "We are going to travel to San Diego next month.",
      targetText: "We are going to travel to San Diego next month.",
      phoneticGuide: 'Güi ar gó-ing tu trá-vel tu San Dié-go nekst manth.',
      mexicanTip: 'En conversación informal estadounidense, "going to" a menudo se pronuncia "gonna": "We\'re gonna travel".',
      explanation: 'Uso de "be going to" para planes futuros previamente decididos.'
    },

    // Listening
    {
      id: 'a2_l_1',
      discipline: 'listening',
      type: 'listening_comprehension',
      level: 'A2',
      subLevel: 'A2.0',
      prompt: 'Escucha el reporte del clima y responde: ¿Qué ropa se recomienda llevar hoy?',
      audioText: "Good morning! It's going to be very windy and rainy this afternoon in Chicago, so make sure to bring a waterproof jacket and an umbrella.",
      targetText: 'Chamarra impermeable y paraguas',
      options: ['Chamarra impermeable y paraguas', 'Lentes de sol y playera ligera', 'Traje de baño y sandalias', 'Abrigo de nieve pesado y guantes'],
      mexicanTip: 'En México decimos "chamarra", en otros países "chaqueta". "Rainy and windy" = lluvioso y con viento.',
      explanation: 'El meteorólogo recomienda: "bring a waterproof jacket and an umbrella".'
    },
    {
      id: 'a2_l_2',
      discipline: 'listening',
      type: 'listening_dictation',
      level: 'A2',
      subLevel: 'A2.1',
      prompt: 'Escucha y escribe la frase en inglés americano:',
      audioText: 'Did you lock the front door?',
      targetText: 'Did you lock the front door?',
      acceptableAnswers: ['Did you lock the front door', 'did you lock the front door?'],
      mexicanTip: '"Lock" significa cerrar con llave o seguro. "Close" solo es cerrar la puerta físicamente.',
      explanation: 'Pregunta en pasado simple con el auxiliar "Did".'
    },

    // Reading
    {
      id: 'a2_r_1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'A2',
      subLevel: 'A2.0',
      passage: 'Customer Review: "I ordered a pair of running shoes online last Friday. The package arrived in just two days with free shipping. The shoes are lightweight, comfortable, and perfect for morning jogs."',
      prompt: '¿Por qué está satisfecho el cliente con su compra?',
      targetText: 'Llegaron rápido en 2 días con envío gratis y son cómodos para correr',
      options: [
        'Llegaron rápido en 2 días con envío gratis y son cómodos para correr',
        'Le regalaron un segundo par de zapatos',
        'La tienda física le quedaba muy cerca de su casa',
        'Le devolvieron el dinero porque no le quedaron'
      ],
      mexicanTip: '"Free shipping" es el término estándar para envío gratis en tiendas de EE.UU. como Amazon.',
      explanation: 'La reseña destaca: "arrived in two days with free shipping" y "comfortable and perfect for jogs".'
    }
  ],

  B1: [
    // Writing
    {
      id: 'b1_w_1',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'B1',
      subLevel: 'B1.0',
      prompt: 'Traduce al inglés: "He vivido en esta ciudad durante tres años, pero me gustaría mudarme a Dallas."',
      targetText: 'I have lived in this city for three years, but I would like to move to Dallas.',
      acceptableAnswers: [
        "I've lived in this city for three years, but I would like to move to Dallas.",
        "I have lived in this city for 3 years, but I'd like to move to Dallas."
      ],
      mexicanTip: '"For three years" se usa para duración en Presente Perfecto. No uses "since" para cantidades de tiempo.',
      explanation: 'Present Perfect (have lived) + for + duración temporal.'
    },
    {
      id: 'b1_w_2',
      discipline: 'writing',
      type: 'writing_fill_blank',
      level: 'B1',
      subLevel: 'B1.1',
      prompt: 'Phrasal Verb común en el trabajo: "We need to _____ the meeting until next Tuesday because the director is sick."',
      targetText: 'call off',
      options: ['call off', 'put off', 'look up', 'run into'],
      mexicanTip: '"Put off" significa posponer / aplazar; "call off" significa cancelar. En este caso posponer es "put off" o reprogramar.',
      explanation: '"Put off" = posponer para una fecha posterior.'
    },

    // Speaking
    {
      id: 'b1_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'B1',
      subLevel: 'B1.0',
      prompt: 'Pronuncia con naturalidad en una junta de trabajo:',
      audioText: 'Could you give us a quick overview of the budget?',
      targetText: 'Could you give us a quick overview of the budget?',
      phoneticGuide: 'Cud iu guiv as a kwik óu-ver-viú ov da bád-djet?',
      mexicanTip: '"Budget" se pronuncia "bád-djet" con la "g" como "dsh" suave. En México decimos "el presupuesto".',
      explanation: '"Overview" = resumen general ejecutivo.'
    },
    {
      id: 'b1_s_2_idea',
      discipline: 'speaking',
      type: 'speaking_idea_construction',
      level: 'B1',
      subLevel: 'B1.2',
      prompt: '🧠 Construcción de Ideas y Traducción Mental: Responde en voz alta en inglés formulando la idea directamente sin traducir palabra por palabra.',
      instruction: 'What is your morning routine before you start studying or working? Mention at least 2 activities.',
      targetText: 'Every morning, I usually wake up early, drink a cup of coffee, and get ready for work.',
      mexicanTip: 'Evita traducir literalmente "tomo café" como "I take coffee". En inglés usamos "I drink coffee" o "I have coffee".',
      explanation: 'Usa conectores sencillos como "first, then, after that" para enlazar oraciones completas de manera fluida.'
    },

    // Listening
    {
      id: 'b1_l_1',
      discipline: 'listening',
      type: 'listening_comprehension',
      level: 'B1',
      subLevel: 'B1.0',
      prompt: 'Escucha la nota de voz y elige el motivo de la llamada:',
      audioText: "Hey Andrea, I am calling to confirm our reservation at the Mexican grill for 8:00 PM tonight. Let me know if you want me to pick you up on my way there.",
      targetText: 'Confirmar la reservación en el restaurante y ofrecer pasar por ella en auto',
      options: [
        'Confirmar la reservación en el restaurante y ofrecer pasar por ella en auto',
        'Cancelar la cena porque no consiguió reservación',
        'Pedirle dinero prestado para pagar la cuenta',
        'Preguntarle a qué hora abre el restaurante mexicano'
      ],
      mexicanTip: '"Pick you up" es el phrasal verb cotidiano para "pasar por ti en el carro".',
      explanation: 'El audio dice: "confirm our reservation" y "pick you up on my way there".'
    },

    // Reading
    {
      id: 'b1_r_1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'B1',
      subLevel: 'B1.0',
      passage: 'Coffee Culture in Seattle: Seattle is world-famous for its thriving coffee scene. Beyond corporate giants like Starbucks, hundreds of independent roasters specialize in single-origin beans, cold brews, and oat milk lattes. For locals, grabbing a morning coffee is not just a caffeine boost, but a daily social ritual.',
      prompt: '¿Qué representa tomar café por la mañana para los habitantes locales de Seattle?',
      targetText: 'No solo energía por la cafeína, sino un ritual social cotidiano',
      options: [
        'No solo energía por la cafeína, sino un ritual social cotidiano',
        'Una obligación laboral impuesta por las empresas de tecnología',
        'Un gasto innecesario que prefieren evitar los fines de semana',
        'Una tradición que solo practican los turistas extranjeros'
      ],
      mexicanTip: '"Cold brew" es café infusionado en frío muy popular en EE.UU.',
      explanation: 'El texto concluye: "not just a caffeine boost, but a daily social ritual".'
    }
  ],

  B2: [
    // Writing
    {
      id: 'b2_w_1',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'B2',
      subLevel: 'B2.0',
      prompt: 'Traduce con tercer condicional: "Si me hubieras avisado antes, no habría reservado los boletos de avión."',
      targetText: 'If you had told me earlier, I would not have booked the flight tickets.',
      acceptableAnswers: [
        "If you had let me know earlier, I wouldn't have booked the flight tickets.",
        "If you had told me earlier, I wouldn't have booked the plane tickets."
      ],
      mexicanTip: 'Tercer condicional para arrepentimientos o situaciones hipotéticas en el pasado: If + Past Perfect ..., would have + Past Participle.',
      explanation: 'Condicional irreal en el pasado: If you had told me ... I would not have booked.'
    },

    // Speaking
    {
      id: 'b2_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'B2',
      subLevel: 'B2.0',
      prompt: 'Pronuncia esta frase con fluidez ejecutiva estadounidense:',
      audioText: 'We should leverage our competitive advantage to scale the platform across North America.',
      targetText: 'We should leverage our competitive advantage to scale the platform across North America.',
      phoneticGuide: 'Güi shud lé-ve-ridj áur com-pé-ti-tiv ad-ván-tidj tu skéil da plat-form a-crós North A-mé-ri-ca.',
      mexicanTip: '"Leverage" es un verbo corporativo estrella en EE.UU. que significa "apalancar / aprovechar al máximo".',
      explanation: 'Articulación de términos de estrategia comercial con entonación asertiva.'
    },
    {
      id: 'b2_s_2_open',
      discipline: 'speaking',
      type: 'speaking_open_question',
      level: 'B2',
      subLevel: 'B2.2',
      prompt: '🎙️ Conversación y Respuesta Espontánea: Construye tu respuesta oralmente en inglés sin traducir mentalmente palabra por palabra.',
      instruction: 'If you had the opportunity to launch a startup or new project in the US or Mexico, what industry would you choose and why?',
      targetText: 'I would choose the tech or sustainability industry because it offers strong growth and addresses real community problems.',
      mexicanTip: 'Usa conectores argumentativos como "In my opinion", "Furthermore", "As a result" para darle solidez a tu respuesta.',
      explanation: 'Formula oraciones compuestas expresando causas y consecuencias con naturalidad.'
    },

    // Listening
    {
      id: 'b2_l_1',
      discipline: 'listening',
      type: 'listening_dictation',
      level: 'B2',
      subLevel: 'B2.0',
      prompt: 'Escucha y transcribe la oración con vocabulario de negocios:',
      audioText: 'The merger will create significant synergies in supply chain management.',
      targetText: 'The merger will create significant synergies in supply chain management.',
      acceptableAnswers: ['The merger will create significant synergies in supply chain management'],
      mexicanTip: '"Merger" es una fusión de empresas. "Supply chain" es la cadena de suministro.',
      explanation: 'Reconocimiento auditivo de términos clave del comercio internacional.'
    },

    // Reading
    {
      id: 'b2_r_1',
      discipline: 'reading',
      type: 'reading_comprehension',
      level: 'B2',
      subLevel: 'B2.0',
      passage: 'The Rise of FinTech in Latin America: Cross-border remittances between the United States and Mexico exceed $60 billion annually. Traditional money transfer operators frequently charge high transaction fees and exchange rate markups. In response, modern FinTech platforms utilize blockchain and direct bank integrations to deliver near-instant transfers with minimal overhead, fundamentally disrupting the remittance corridor.',
      prompt: '¿Cómo están transformando las plataformas FinTech el corredor de remesas EE.UU.-México?',
      targetText: 'Ofreciendo transferencias casi instantáneas con comisiones mínimas gracias a la tecnología',
      options: [
        'Ofreciendo transferencias casi instantáneas con comisiones mínimas gracias a la tecnología',
        'Obligando a los usuarios a enviar dinero únicamente en efectivo por paquetería',
        'Aumentando las comisiones bancarias para proteger a los operadores tradicionales',
        'Eliminando por completo el uso de teléfonos celulares en las transacciones'
      ],
      mexicanTip: '"Remittances" (remesas) son cruciales en la economía familiar México-EE.UU.',
      explanation: 'El texto señala que usan blockchain e integraciones directas para transferencias inmediatas con costos mínimos.'
    }
  ],

  C1: [
    // Writing
    {
      id: 'c1_w_1',
      discipline: 'writing',
      type: 'writing_fill_blank',
      level: 'C1',
      subLevel: 'C1.0',
      prompt: 'Elige la estructura de inversión adecuada: "Not only _____ the deadline, but they also exceeded all performance metrics."',
      targetText: 'did they meet',
      options: ['did they meet', 'they met', 'they had met', 'they did meet'],
      mexicanTip: 'Tras "Not only" al inicio de una oración formal, se invierte la estructura como en una pregunta (did + sujeto + verbo base).',
      explanation: 'Inversión negativa enfática para nivel C1.'
    },
    // Speaking
    {
      id: 'c1_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'C1',
      subLevel: 'C1.0',
      prompt: 'Pronuncia con modulación y dicción formal avanzada:',
      audioText: 'Notwithstanding the unforeseen logistical hurdles, our contingency protocol proved exceptionally robust.',
      targetText: 'Notwithstanding the unforeseen logistical hurdles, our contingency protocol proved exceptionally robust.',
      phoneticGuide: 'Not-güith-stán-ding di an-for-síin lo-djís-ti-cal jár-dels, áur con-tín-djen-si próu-to-col pruuvd ek-sép-sho-nal-li ro-bást.',
      mexicanTip: '"Notwithstanding" es un conector formal muy elegante que equivale a "A pesar de / No obstante".',
      explanation: 'Vocabulario diplomático y corporativo de nivel C1.'
    },
    // Listening
    {
      id: 'c1_l_1',
      discipline: 'listening',
      type: 'listening_comprehension',
      level: 'C1',
      subLevel: 'C1.0',
      prompt: 'Escucha el análisis y determina la conclusión del panel:',
      audioText: 'The panel concurred that unless proactive antitrust regulatory frameworks are enacted swiftly, technological monopolies will consolidate insurmountable moats.',
      targetText: 'Que se requieren marcos regulatorios antimonopolio para evitar barreras insuperables',
      options: [
        'Que se requieren marcos regulatorios antimonopolio para evitar barreras insuperables',
        'Que los monopolios tecnológicos deben ser desregulados por completo',
        'Que las leyes actuales son suficientes y no requieren modificaciones',
        'Que las pequeñas empresas no deben preocuparse por la competencia'
      ],
      mexicanTip: '"Moats" (fosos) en negocios se refiere a ventajas competitivas defensivas insuperables.',
      explanation: 'El panel concluyó que sin regulación antimonopolio, los monopolios consolidarán ventajas insalvables.'
    },
    // Reading
    {
      id: 'c1_r_1',
      discipline: 'reading',
      type: 'reading_vocab_context',
      level: 'C1',
      subLevel: 'C1.0',
      passage: 'The diplomatic negotiations culminated in an accord that, while ostensibly equitable, was characterized by political commentators as a pyrrhic victory for the opposition.',
      prompt: '¿Qué significa la expresión "pyrrhic victory" (victoria pírrica)?',
      targetText: 'Una victoria obtenida a un costo tan desmedido que equivale casi a una derrota',
      options: [
        'Una victoria obtenida a un costo tan desmedido que equivale casi a una derrota',
        'Un triunfo contundente y sin ninguna pérdida para los vencedores',
        'Un acuerdo alcanzado de manera pacífica sin ninguna discusión',
        'Una derrota que se celebró como si fuera un éxito'
      ],
      mexicanTip: '"Pyrrhic victory" proviene de la historia del rey Pirro y se usa comúnmente en análisis político de alto nivel.',
      explanation: 'Victoria pírrica = triunfo con pérdidas tan graves que anulan el beneficio.'
    }
  ],

  C2: [
    // Writing
    {
      id: 'c2_w_1',
      discipline: 'writing',
      type: 'writing_translate',
      level: 'C2',
      subLevel: 'C2.0',
      prompt: 'Traduce con estilo estilístico impecable: "Bajo ninguna circunstancia se debe comprometer la integridad ética en pos de ganancias efímeras."',
      targetText: 'Under no circumstances should ethical integrity be compromised in pursuit of ephemeral gains.',
      acceptableAnswers: [
        "Under no circumstances should ethical integrity be compromised in pursuit of fleeting gains.",
        "Under no circumstances must ethical integrity be compromised in pursuit of short-term gains."
      ],
      mexicanTip: '"Under no circumstances should..." demuestra control absoluto de inversión y registro solemne.',
      explanation: 'Inversión enfática formal con vocabulario de precisión magistral (ephemeral gains).'
    },
    // Speaking
    {
      id: 'c2_s_1',
      discipline: 'speaking',
      type: 'speaking_pronounce',
      level: 'C2',
      subLevel: 'C2.0',
      prompt: 'Pronuncia con cadencia retórica casi nativa:',
      audioText: 'Synthesizing disparate perspectives into a coherent doctrine demands profound intellectual dexterity.',
      targetText: 'Synthesizing disparate perspectives into a coherent doctrine demands profound intellectual dexterity.',
      phoneticGuide: 'Sín-ze-sai-zing dís-pa-reit per-spék-tivs ín-tu a co-jí-rent dóc-trin di-mánds pro-fáund in-te-lék-chu-al deks-té-ri-ti.',
      mexicanTip: '"Disparate" se pronuncia con acento en la primera sílaba: DÍS-per-it.',
      explanation: 'Articulación de consonantes compuestas y prosodia avanzada de nivel C2.'
    },
    // Listening
    {
      id: 'c2_l_1',
      discipline: 'listening',
      type: 'listening_comprehension',
      level: 'C2',
      subLevel: 'C2.0',
      prompt: 'Escucha la disertación filosófica y deduce la tesis central:',
      audioText: 'Epistemological humility does not imply intellectual paralysis; rather, it provides the requisite scaffolding for rigorous empirical inquiry.',
      targetText: 'Que la humildad epistemológica no paraliza, sino que sustenta la investigación empírica rigurosa',
      options: [
        'Que la humildad epistemológica no paraliza, sino que sustenta la investigación empírica rigurosa',
        'Que la investigación empírica es incompatible con cualquier duda intelectual',
        'Que los científicos deben evitar cuestionar sus propias hipótesis de trabajo',
        'Que el conocimiento empírico carece de valor sin aprobación dogmática'
      ],
      mexicanTip: '"Scaffolding" (andamio / estructura de soporte) es muy utilizado en pedagogía y epistemología.',
      explanation: 'La frase sostiene que reconocer los límites del conocimiento (humildad epistemológica) es la base para investigar con rigor.'
    },
    // Reading
    {
      id: 'c2_r_1',
      discipline: 'reading',
      type: 'reading_vocab_context',
      level: 'C2',
      subLevel: 'C2.0',
      passage: 'The appellate court overturned the lower tribunal\'s injunction, ruling that the plaintiff\'s contentions were wholly specious and devoid of merit under precedent jurisprudence.',
      prompt: '¿Qué denota el término jurídico y formal "specious"?',
      targetText: 'Aparentemente verosímil o convincente en la superficie, pero falso o engañoso en el fondo',
      options: [
        'Aparentemente verosímil o convincente en la superficie, pero falso o engañoso en el fondo',
        'Respaldado por evidencia empírica irrefutable y unánime',
        'Carente de redacción clara pero legalmente vinculante',
        'Presentado fuera de los plazos reglamentarios del juzgado'
      ],
      mexicanTip: '"Specious" (especioso) es un término clave en argumentación lógica y derecho anglosajón.',
      explanation: '"Specious" = superficially plausible, but actually wrong or misleading.'
    }
  ]
};

/**
 * Helper to build a dynamically balanced session matching the user's AI allocation
 * and grounded in the specific American English Unit Theme and Session Topic!
 */
export function buildAdaptiveSessionExercises(
  tier: CEFRLevel,
  subLevel: SubLevel,
  allocation: { writing: number; speaking: number; listening: number; reading: number },
  quickModeCount?: number,
  sessionNumber: number = 1
): Exercise[] {
  const count = quickModeCount || 10;
  return generateThematicExercises(tier, subLevel, sessionNumber, allocation, count);
}
