import { LibraryStory } from '../types';

export const PUBLIC_DOMAIN_STORIES: LibraryStory[] = [
  {
    id: 'tortoise-and-hare',
    title: 'The Tortoise and the Hare',
    titleEs: 'La Liebre y la Tortuga',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'A1',
    category: 'fable',
    readTimeMinutes: 2,
    wordCount: 190,
    coverEmoji: '🐢',
    summary: 'A boastful hare laughs at a slow tortoise and challenges him to a foot race.',
    summaryEs: 'Una liebre vanidosa se burla de una tortuga lenta y la reta a una carrera de velocidad.',
    moral: {
      en: 'Slow and steady wins the race. Consistency beats arrogant talent.',
      es: 'Poco a poco se llega lejos. La constancia y la disciplina vencen al exceso de confianza.'
    },
    paragraphs: [
      {
        en: 'Once upon a time, there was a fast and boastful Hare who loved to mock everyone in the forest. He constantly bragged about his speed to all the other animals.',
        es: 'Había una vez una Liebre veloz y presumida a la que le encantaba burlarse de todos en el bosque. Constantemente presumía de su rapidez ante todos los demás animales.'
      },
      {
        en: '"Nobody can run as fast as I can!" laughed the Hare. "I challenge anyone here to race me!" A calm Tortoise looked up and said quietly, "I will accept your challenge."',
        es: '"¡Nadie puede correr tan rápido como yo!", se reía la Liebre. "¡Reto a cualquiera aquí a correr contra mí!". Una tranquila Tortuga levantó la mirada y dijo con calma: "Yo acepto tu reto".'
      },
      {
        en: 'The Hare laughed out loud. "You? That is hilarious! You move slower than a snail!" But the Tortoise remained calm and ready. The race began at sunrise.',
        es: 'La Liebre soltó una carcajada. "¿Tú? ¡Eso es graciosísimo! ¡Te mueves más despacio que un caracol!". Pero la Tortuga se mantuvo tranquila y lista. La carrera comenzó al amanecer.'
      },
      {
        en: 'The Hare darted ahead and was soon far out of sight. Confident of his victory, he decided to take a short nap under a shady oak tree. "I have plenty of time," he whispered.',
        es: 'La Liebre salió disparada hacia adelante y pronto desapareció de la vista. Confiada de su victoria, decidió tomar una pequeña siesta bajo la sombra de un roble. "Tengo tiempo de sobra", susurró.'
      },
      {
        en: 'Meanwhile, the Tortoise kept moving step by step, never stopping, never giving up. When the Hare finally woke up, he ran as fast as the wind, but it was too late: the Tortoise had already crossed the finish line!',
        es: 'Mientras tanto, la Tortuga siguió avanzando paso a paso, sin detenerse nunca, sin rendirse jamás. Cuando la Liebre por fin despertó, corrió tan rápido como el viento, ¡pero ya era demasiado tarde: la Tortuga ya había cruzado la meta!'
      }
    ],
    vocabulary: [
      {
        word: 'boastful',
        phonetic: 'bóust-ful',
        meaning: 'Presumido / Vanidoso',
        context: 'He was a boastful Hare who loved to brag.'
      },
      {
        word: 'mock',
        phonetic: 'mak',
        meaning: 'Burlarse de / Ridiculizar',
        context: 'He loved to mock other animals.'
      },
      {
        word: 'darted',
        phonetic: 'dár-tid',
        meaning: 'Salió disparado / Corrió veloz',
        context: 'The Hare darted ahead immediately.'
      },
      {
        word: 'steady',
        phonetic: 'sté-di',
        meaning: 'Constante / Firme',
        context: 'Slow and steady wins the race.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Why did the Hare stop to take a nap during the race?',
        questionEs: '¿Por qué la Liebre se detuvo a tomar una siesta durante la carrera?',
        options: [
          'He was injured and could not run',
          'He was confident of winning and felt he had plenty of time',
          'The Tortoise told him to take a rest',
          'It started raining heavily'
        ],
        correctIndex: 1,
        explanation: 'The Hare was overly confident of victory, believing he had so much time that taking a nap would not hurt him.'
      },
      {
        id: 'q2',
        question: 'What is the central moral lesson of the story?',
        questionEs: '¿Cuál es la moraleja principal de la historia?',
        options: [
          'Speed is the only thing that matters in life',
          'Sleeping under trees is dangerous',
          'Consistency, persistence, and focus overcome arrogance',
          'Hares are not good runners'
        ],
        correctIndex: 2,
        explanation: 'The moral "Slow and steady wins the race" teaches us that patience and steady work beat overconfidence.'
      }
    ],
    xpReward: 35,
    gemsReward: 10
  },
  {
    id: 'boy-who-cried-wolf',
    title: 'The Boy Who Cried Wolf',
    titleEs: 'El Pastorcillo Mentiroso',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'A2',
    category: 'fable',
    readTimeMinutes: 3,
    wordCount: 220,
    coverEmoji: '🐺',
    summary: 'A bored young shepherd pranks the villagers with false wolf alarms until tragedy strikes.',
    summaryEs: 'Un joven pastor aburrido engaña a los aldeanos gritando que viene el lobo hasta que la mentira le cobra factura.',
    moral: {
      en: 'Nobody believes a liar, even when he is telling the absolute truth.',
      es: 'A un mentiroso nadie le cree, aun cuando esté diciendo la pura verdad.'
    },
    paragraphs: [
      {
        en: 'A young shepherd boy watched over the village sheep on a lonely hillside. Day after day, watching sheep became boring, and he wanted some excitement.',
        es: 'Un joven pastor cuidaba las ovejas del pueblo en una colina solitaria. Día tras día, cuidar ovejas se volvió aburrido, y él deseaba algo de emoción.'
      },
      {
        en: 'To amuse himself, he ran toward the village screaming at the top of his lungs: "Wolf! Wolf! A giant wolf is chasing the sheep!" The villagers dropped their tools and rushed up the hill to help him.',
        es: 'Para divertirse, corrió hacia el pueblo gritando a todo pulmón: "¡El lobo! ¡El lobo! ¡Un lobo gigante está persiguiendo a las ovejas!". Los aldeanos soltaron sus herramientas y corrieron colina arriba para ayudarlo.'
      },
      {
        en: 'When they arrived, they found no wolf, only the boy laughing hysterically. The angry villagers returned to their work. A few days later, the boy played the exact same cruel trick again, and again the villagers came running.',
        es: 'Cuando llegaron, no encontraron ningún lobo, solo al muchacho riéndose a carcajadas. Los aldeanos enojados regresaron a sus labores. Unos días después, el chico repitió exactamente la misma broma pesada, y de nuevo los aldeanos vinieron corriendo.'
      },
      {
        en: 'One evening, a real wolf emerged from the dark shadows of the forest and attacked the flock. Terrified, the shepherd boy screamed frantically: "Wolf! Please, help! A real wolf is here!"',
        es: 'Una tarde, un lobo de verdad salió de las sombras oscuras del bosque y atacó al rebaño. Aterrorizado, el pastorcillo gritó desesperado: "¡El lobo! ¡Por favor, ayuda! ¡Hay un lobo de verdad aquí!".'
      },
      {
        en: 'The villagers heard his cries, but they simply shook their heads. "He is trying to fool us again," they said, and nobody came. The wolf scattered the entire flock into the night.',
        es: 'Los aldeanos escucharon sus gritos, pero simplemente sacudieron la cabeza. "Está tratando de engañarnos otra vez", dijeron, y nadie acudió. El lobo dispersó a todo el rebaño en la noche.'
      }
    ],
    vocabulary: [
      {
        word: 'shepherd',
        phonetic: 'shé-perd',
        meaning: 'Pastor (de ovejas)',
        context: 'A young shepherd boy watched over the sheep.'
      },
      {
        word: 'flock',
        phonetic: 'flak',
        meaning: 'Rebaño / Manada',
        context: 'The wolf attacked the flock.'
      },
      {
        word: 'frantically',
        phonetic: 'frán-tik-li',
        meaning: 'Desesperadamente / Frenéticamente',
        context: 'He screamed frantically for help.'
      },
      {
        word: 'scattered',
        phonetic: 'ská-terd',
        meaning: 'Dispersó / Desperdigó',
        context: 'The wolf scattered the entire flock.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Why did the villagers refuse to help when the wolf actually arrived?',
        questionEs: '¿Por qué los aldeanos se negaron a ayudar cuando el lobo realmente llegó?',
        options: [
          'They did not hear the boy yelling',
          'They were afraid of the dark',
          'They thought he was lying again to fool them',
          'They had sold the sheep earlier that morning'
        ],
        correctIndex: 2,
        explanation: 'Because he had lied twice before, the villagers lost all trust in his word and assumed it was another joke.'
      },
      {
        id: 'q2',
        question: 'What is the main takeaway regarding trust and credibility?',
        questionEs: '¿Cuál es la lección principal sobre la confianza y la credibilidad?',
        options: [
          'You should never herd sheep alone',
          'Once trust is broken with repeated lies, your truth will not be believed',
          'Wolves are only hungry in the evening',
          'Villagers are lazy workers'
        ],
        correctIndex: 1,
        explanation: 'Honesty is essential; repeatedly lying destroys credibility so that even genuine calls for help are ignored.'
      }
    ],
    xpReward: 40,
    gemsReward: 12
  },
  {
    id: 'lion-and-mouse',
    title: 'The Lion and the Mouse',
    titleEs: 'El León y el Ratón',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'A2',
    category: 'fable',
    readTimeMinutes: 2,
    wordCount: 210,
    coverEmoji: '🦁',
    summary: 'A mighty king of the jungle spares a tiny mouse, who later saves his life from hunters.',
    summaryEs: 'El poderoso rey de la selva le perdona la vida a un diminuto ratón, quien más tarde lo salva de una trampa de cazadores.',
    moral: {
      en: 'No act of kindness, no matter how small, is ever wasted. Even the small can help the great.',
      es: 'Ningún acto de bondad, por pequeño que sea, se desperdicia. Hasta el más pequeño puede ayudar al más grande.'
    },
    paragraphs: [
      {
        en: 'A great Lion lay asleep in the warm sun of the savannah. A little Mouse scampered across his nose, accidentally waking the mighty beast.',
        es: 'Un gran León dormía bajo el cálido sol de la sabana. Un pequeño Ratón corrió sobre su nariz, despertando por accidente a la imponente fiera.'
      },
      {
        en: 'The Lion trapped the tiny rodent under his heavy paw and opened his huge jaws to swallow him. "Please, King of the Jungle!" begged the Mouse. "Spare my life, and one day I will repay your kindness!"',
        es: 'El León atrapó al diminuto roedor bajo su pesada pata y abrió sus enormes fauces para devorarlo. "¡Por favor, Rey de la Selva!", suplicó el Ratón. "¡Perdóname la vida, y algún día te devolveré tu favor!".'
      },
      {
        en: 'The Lion roared with laughter. How could a tiny, helpless mouse ever help the mighty King of Beasts? Yet, feeling generous and amused, he lifted his paw and let the mouse go free.',
        es: 'El León rugió de risa. ¿Cómo podría un ratoncito diminuto e indefenso ayudar al poderoso Rey de las Fieras? Aun así, sintiéndose generoso y divertido, levantó su pata y lo dejó libre.'
      },
      {
        en: 'A few weeks later, the Lion was captured by hunters who tied him to a strong tree with thick ropes. Unable to break free, the Lion roared in agony across the valley.',
        es: 'Unas semanas después, el León fue capturado por cazadores que lo ataron a un árbol fuerte con cuerdas gruesas. Incapaz de liberarse, el León rugió de agonía por todo el valle.'
      },
      {
        en: 'Recognizing the voice, the little Mouse arrived quickly. Using his sharp little teeth, he gnawed through the thick ropes until the Lion was free. "You laughed when I promised to help," smiled the Mouse, "but now you see that even a mouse can save a lion."',
        es: 'Reconociendo la voz, el pequeño Ratón llegó velozmente. Con sus afilados dientecitos, royó las gruesas cuerdas hasta que el León quedó libre. "Te reíste cuando prometí ayudarte", sonrió el Ratón, "pero ahora ves que hasta un ratón puede salvar a un león".'
      }
    ],
    vocabulary: [
      {
        word: 'scampered',
        phonetic: 'skám-perd',
        meaning: 'Correteó / Correteaba rápidamente',
        context: 'A little mouse scampered across his nose.'
      },
      {
        word: 'gnawed',
        phonetic: 'nod',
        meaning: 'Royó / Mordisqueó',
        context: 'He gnawed through the thick ropes.'
      },
      {
        word: 'spare',
        phonetic: 'sper',
        meaning: 'Perdonar (la vida) / Ahorrar',
        context: 'Spare my life and I will repay you.'
      },
      {
        word: 'mighty',
        phonetic: 'mái-ti',
        meaning: 'Poderoso / Imponente',
        context: 'The mighty king of the jungle.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'How did the Mouse free the captured Lion?',
        questionEs: '¿Cómo liberó el Ratón al León capturado?',
        options: [
          'He fought the hunters with a stick',
          'He gnawed the thick ropes with his sharp teeth',
          'He untied the knots with his paws',
          'He called a herd of elephants'
        ],
        correctIndex: 1,
        explanation: 'The mouse used his sharp teeth to chew through the ropes holding the lion captive.'
      },
      {
        id: 'q2',
        question: 'What does this fable teach us about judging others by their size or status?',
        questionEs: '¿Qué nos enseña esta fábula sobre juzgar a otros por su tamaño o estatus?',
        options: [
          'Lions are naturally weak animals',
          'Never underestimate someone because of their size or humble position',
          'Mice should never enter the forest',
          'Hunters always catch lions'
        ],
        correctIndex: 1,
        explanation: 'No person is too small or humble to make a meaningful difference and show genuine gratitude.'
      }
    ],
    xpReward: 40,
    gemsReward: 12
  },
  {
    id: 'ant-and-grasshopper',
    title: 'The Ant and the Grasshopper',
    titleEs: 'La Cigarra y la Hormiga',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'B1',
    category: 'fable',
    readTimeMinutes: 3,
    wordCount: 240,
    coverEmoji: '🐜',
    summary: 'While the industrious ant gathers food for the harsh winter, the carefree grasshopper sings and plays.',
    summaryEs: 'Mientras la trabajadora hormiga almacena comida para el crudo invierno, la despreocupada cigarra canta y holgazanea.',
    moral: {
      en: 'There is a time for work and a time for play. Preparing today protects your tomorrow.',
      es: 'Hay un tiempo para trabajar y un tiempo para jugar. Prepararse hoy asegura tu mañana.'
    },
    paragraphs: [
      {
        en: 'On a sunny, bright summer day, a carefree Grasshopper was hopping about in the green meadow, chirping and singing to his heart\'s content.',
        es: 'En un día de verano soleado y radiante, una despreocupada Cigarra saltaba por el prado verde, cantando y chirriando a todo pulmón.'
      },
      {
        en: 'An Ant walked past him, sweating under the weight of a heavy kernel of corn that she was struggling to drag back to her underground nest.',
        es: 'Una Hormiga pasó a su lado, sudando bajo el peso de un pesado grano de maíz que batallaba por arrastrar hacia su nido subterráneo.'
      },
      {
        en: '"Why work so hard on such a gorgeous day?" called the Grasshopper. "Come, sit with me, sing a song, and enjoy the glorious sunshine!"',
        es: '"¿Por qué trabajar tan duro en un día tan hermoso?", le gritó la Cigarra. "¡Ven, siéntate conmigo, canta una canción y disfruta de este sol tan glorioso!".'
      },
      {
        en: '"I am storing food for the upcoming winter," replied the Ant, catching her breath. "And I strongly advise you to do the same." The Grasshopper just laughed: "Winter is far away! We have plenty of food right now."',
        es: '"Estoy almacenando comida para el invierno que se avecina", contestó la Hormiga tomando aire. "Y te aconsejo de corazón que hagas lo mismo". La Cigarra solo se rió: "¡El invierno está lejísimos! Tenemos comida de sobra ahorita mismo".'
      },
      {
        en: 'When the freezing winter arrived and snow covered the earth, the shivering Grasshopper found himself starving with nothing to eat. He saw the ants distributing delicious corn and grain from their warm, well-stocked pantry.',
        es: 'Cuando llegó el invierno congelante y la nieve cubrió la tierra, la temblorosa Cigarra se encontró hambrienta sin nada que comer. Vio a las hormigas repartiendo delicioso maíz y granos desde su alacena cálida y bien surtida.'
      }
    ],
    vocabulary: [
      {
        word: 'carefree',
        phonetic: 'kér-fri',
        meaning: 'Despreocupado / Sin preocupaciones',
        context: 'A carefree Grasshopper was singing.'
      },
      {
        word: 'industrious',
        phonetic: 'in-dás-tri-as',
        meaning: 'Trabajador / Hacendoso',
        context: 'The industrious ant worked all summer.'
      },
      {
        word: 'well-stocked',
        phonetic: 'wel-stákt',
        meaning: 'Bien surtido / Bien abastecido',
        context: 'Their warm, well-stocked pantry.'
      },
      {
        word: 'starving',
        phonetic: 'stár-vin',
        meaning: 'Muriéndose de hambre / Famélico',
        context: 'He found himself starving in winter.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What did the Grasshopper do all summer instead of preparing for winter?',
        questionEs: '¿Qué hizo la Cigarra todo el verano en lugar de prepararse para el invierno?',
        options: [
          'He built a large house',
          'He sang, rested, and enjoyed the sunshine',
          'He migrated to the south',
          'He helped the bees collect honey'
        ],
        correctIndex: 1,
        explanation: 'The grasshopper spent the summer relaxing and singing, ignoring the need to save food for cold months.'
      },
      {
        id: 'q2',
        question: 'Which modern skill or habit reflects the moral of this fable?',
        questionEs: '¿Qué hábito o habilidad moderna refleja la moraleja de esta fábula?',
        options: [
          'Procrastinating until the last minute',
          'Financial savings, planning ahead, and disciplined daily work',
          'Only working when forced to',
          'Ignoring future risks'
        ],
        correctIndex: 1,
        explanation: 'Planning ahead, saving for emergencies, and daily discipline are the core values taught by the ant.'
      }
    ],
    xpReward: 45,
    gemsReward: 15
  },
  {
    id: 'fox-and-grapes',
    title: 'The Fox and the Grapes',
    titleEs: 'La Zorra y las Uvas',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'B1',
    category: 'moral',
    readTimeMinutes: 2,
    wordCount: 185,
    coverEmoji: '🍇',
    summary: 'Unable to reach juicy ripe grapes on a high vine, a fox convinces himself they were sour anyway.',
    summaryEs: 'Incapaz de alcanzar unas uvas jugosas en una vid alta, una zorra se convence de que de todos modos estaban verdes y agrias.',
    moral: {
      en: 'It is easy to despise what you cannot obtain (the origin of the expression "sour grapes").',
      es: 'Es fácil despreciar lo que no se puede alcanzar (origen de la expresión "uvas agrias" o resentimiento).'
    },
    paragraphs: [
      {
        en: 'One sweltering afternoon, a hungry Fox was wandering through an orchard when he stopped before a tall trellis with magnificent, deep purple clusters of ripe grapes.',
        es: 'Una tarde calurosa y sofocante, una Zorra hambrienta paseaba por un huerto cuando se detuvo ante una alta enramada con magníficos racimos morados de uvas maduras.'
      },
      {
        en: '"Just the thing to quench my thirst and satisfy my hunger!" thought the Fox, his mouth watering as he stared at the glistening fruit high above.',
        es: '"¡Justo lo que necesito para calmar mi sed y saciar mi hambre!", pensó la Zorra, haciéndosele agua la boca mientras contemplaba la fruta brillante en lo alto.'
      },
      {
        en: 'Taking a few paces backward, the Fox ran forward and made a mighty leap into the air, but he missed the grapes completely. He tried again and again, leaping with all his strength, but the grapes hung just inches beyond his reach.',
        es: 'Dando unos pasos hacia atrás, la Zorra tomó impulso y dio un salto tremendo por el aire, pero no alcanzó las uvas. Lo intentó una y otra vez, saltando con todas sus fuerzas, pero las uvas colgaban a solo unos centímetros fuera de su alcance.'
      },
      {
        en: 'Exhausted and out of breath, the Fox finally gave up. Rolling his eyes and lifting his nose in the air, he walked away declaring: "I am sure they are sour and unripe anyway. I would not eat them even if they fell at my feet!"',
        es: 'Agotada y sin aliento, la Zorra finalmente se dio por vencida. Rodando los ojos y levantando la nariz con desdén, se alejó diciendo: "Seguro que están agrias y verdes de todos modos. ¡No me las comería ni aunque cayeran a mis pies!".'
      }
    ],
    vocabulary: [
      {
        word: 'sweltering',
        phonetic: 'suél-ter-in',
        meaning: 'Abrasador / Sofocante de calor',
        context: 'One sweltering afternoon.'
      },
      {
        word: 'quench',
        phonetic: 'kuench',
        meaning: 'Calmar / Saciar (la sed)',
        context: 'To quench my thirst.'
      },
      {
        word: 'unripe',
        phonetic: 'an-ráip',
        meaning: 'Inmaduro / Verde (fruta)',
        context: 'They are sour and unripe.'
      },
      {
        word: 'sour grapes',
        phonetic: 'sáur greips',
        meaning: 'Desdén fingido por despecho / Envidia',
        context: 'The psychological idiom "sour grapes".'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Why did the Fox say the grapes were sour?',
        questionEs: '¿Por qué la Zorra dijo que las uvas estaban agrias?',
        options: [
          'Because he tasted one and it was bitter',
          'To protect his ego after failing to reach them',
          'Because the farmer told him they were poisoned',
          'Because birds had ruined the fruit'
        ],
        correctIndex: 1,
        explanation: 'He rationalized his failure by claiming he did not want them anyway, which is where the phrase "sour grapes" comes from.'
      }
    ],
    xpReward: 35,
    gemsReward: 10
  },
  {
    id: 'gift-of-the-magi',
    title: 'The Gift of the Magi',
    titleEs: 'El Regalo de los Reyes Magos',
    author: 'O. Henry (Public Domain / Dominio Público, 1905)',
    source: 'Dominio Público universal • Cuento Clásico de O. Henry',
    level: 'B2',
    category: 'classic',
    readTimeMinutes: 4,
    wordCount: 380,
    coverEmoji: '🎁',
    summary: 'A young married couple with very little money sacrifice their most prized possessions to buy Christmas gifts for each other.',
    summaryEs: 'Una joven pareja de recién casados con muy poco dinero sacrifican sus posesiones más valiosas para comprarse regalos de Navidad.',
    moral: {
      en: 'Love and selfless sacrifice are the greatest gifts of all, far more precious than material wealth.',
      es: 'El amor y el sacrificio desinteresado son los regalos más grandes de todos, infinitamente más valiosos que cualquier bien material.'
    },
    paragraphs: [
      {
        en: 'One dollar and eighty-seven cents. That was all the money young Della had saved after months of careful pinching at the grocery store. And tomorrow was Christmas Day.',
        es: 'Un dólar con ochenta y siete centavos. Ese era todo el dinero que la joven Della había ahorrado tras meses de cuidar cada centavo en el mercado. Y mañana era Navidad.'
      },
      {
        en: 'Della wept upon the worn sofa. There was clearly nothing to do but flop down and cry. But love demanded a worthy gift for her husband, Jim, whom she adored with all her heart.',
        es: 'Della lloró en el desgastado sillón. Parecía que no había nada más que hacer salvo desplomarse y llorar. Pero el amor le exigía un regalo digno para su esposo, Jim, a quien adoraba con todo su corazón.'
      },
      {
        en: 'Now, there were two possessions of the James Dillingham Young family in which they both took immense pride: one was Jim\'s antique gold pocket watch, inherited from his grandfather; the other was Della\'s long, cascading chestnut hair that fell like a rippling brown waterfall.',
        es: 'Había dos posesiones en la familia por las cuales ambos sentían un inmenso orgullo: una era el reloj de bolsillo de oro antiguo de Jim, heredado de su abuelo; la otra era el largo y ondulado cabello castaño de Della, que caía como una cascada brillante.'
      },
      {
        en: 'Making her decision, Della went to Madame Sofronie\'s hair salon. "Will you buy my hair?" asked Della. "I buy hair," said Madame. Twenty dollars were placed into Della\'s hand. She spent the next two hours searching the city for Jim\'s gift: a platinum watch chain, simple and chaste in design.',
        es: 'Tomando su decisión, Della fue a la peluquería de Madame Sofronie. "¿Compraría usted mi cabello?", preguntó Della. "Compro cabello", dijo la encargada. Veinte dólares fueron puestos en la mano de Della. Pasó las dos horas siguientes buscando el regalo de Jim: una cadena de platino para reloj, elegante y sobria.'
      },
      {
        en: 'When Jim arrived home that evening and saw Della\'s short hair, he stopped in shock. He pulled a package from his coat: a set of pure tortoiseshell hair combs she had dreamed of for months. Then Della presented the platinum chain for his watch, only for Jim to smile gently and say: "Della, I sold my gold watch to buy your combs."',
        es: 'Cuando Jim llegó a casa esa noche y vio el cabello corto de Della, se quedó atónito. Sacó un paquete de su abrigo: un juego de peinetas de carey puro con las que ella había soñado durante meses. Entonces Della le entregó la cadena de platino para su reloj, y Jim solo sonrió con ternura y dijo: "Della, vendí mi reloj de oro para comprar tus peinetas".'
      }
    ],
    vocabulary: [
      {
        word: 'cascading',
        phonetic: 'kas-kéi-din',
        meaning: 'Que cae en cascada / Ondulante',
        context: 'Her long cascading chestnut hair.'
      },
      {
        word: 'chaste',
        phonetic: 'cheist',
        meaning: 'Sobrio / Puro / Sin adornos excesivos',
        context: 'Simple and chaste in design.'
      },
      {
        word: 'tortoiseshell',
        phonetic: 'tór-tas-shel',
        meaning: 'Carey (material elegante tradicional)',
        context: 'Pure tortoiseshell combs.'
      },
      {
        word: 'selfless',
        phonetic: 'sélf-les',
        meaning: 'Desinteresado / Generoso sin egoísmo',
        context: 'Their selfless love for each other.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What irony occurs at the end of the story?',
        questionEs: '¿Qué ironía ocurre al final de la historia?',
        options: [
          'Neither of them bought any gift',
          'Both sacrificed the very possession for which the other person had bought an accessory',
          'The store refused to take back the gifts',
          'Jim lost his job on Christmas Eve'
        ],
        correctIndex: 1,
        explanation: 'Della sold her hair to buy a chain for Jim\'s watch, while Jim sold his watch to buy combs for Della\'s hair.'
      },
      {
        id: 'q2',
        question: 'Why does the author call them the "Magi"?',
        questionEs: '¿Por qué el autor los llama "los Reyes Magos"?',
        options: [
          'Because they possessed magical powers',
          'Because they were wealthy kings from the East',
          'Because their gifts of deep love and sacrifice were the wisest gifts of all',
          'Because they traveled around the world'
        ],
        correctIndex: 2,
        explanation: 'Like the biblical Magi who invented the tradition of giving, their willingness to sacrifice for love made them the wisest gift-givers.'
      }
    ],
    xpReward: 60,
    gemsReward: 20
  },
  {
    id: 'happy-prince',
    title: 'The Happy Prince',
    titleEs: 'El Príncipe Feliz',
    author: 'Oscar Wilde (Public Domain / Dominio Público, 1888)',
    source: 'Dominio Público universal • Clásico de Oscar Wilde',
    level: 'C1',
    category: 'classic',
    readTimeMinutes: 4,
    wordCount: 350,
    coverEmoji: '🕊️',
    summary: 'A gilded statue of a prince and a little swallow give everything they have to bring warmth to the poor and suffering.',
    summaryEs: 'La estatua dorada de un príncipe y una pequeña golondrina entregan todo lo que tienen para aliviar el sufrimiento de los necesitados.',
    moral: {
      en: 'True beauty lies in compassion and sacrifice for those in need, not in gold or vanity.',
      es: 'La verdadera belleza radica en la compasión y el sacrificio por los que sufren, no en el oro ni la vanidad exterior.'
    },
    paragraphs: [
      {
        en: 'High above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt.',
        es: 'En lo alto de la ciudad, sobre una alta columna, se erguía la estatua del Príncipe Feliz. Estaba cubierto por completo de finas hojas de oro puro, por ojos tenía dos zafiros brillantes, y un gran rubí rojo resplandecía en la empuñadura de su espada.'
      },
      {
        en: 'One night, a little Swallow flying to Egypt stopped to rest between the feet of the Prince. Just as he put his head under his wing, a large drop of water fell on him. Looking up, he saw the Prince\'s eyes brimming with tears.',
        es: 'Una noche, una pequeña Golondrina que volaba hacia Egipto se detuvo a descansar entre los pies del Príncipe. Justo cuando metía la cabeza bajo su ala, una gran gota de agua le cayó encima. Al mirar hacia arriba, vio los ojos del Príncipe anegados en lágrimas.'
      },
      {
        en: '"When I was alive with a human heart," explained the statue, "I lived in the Palace of Sans-Souci where sorrow was forbidden. Now that I stand high above, I see all the misery, poverty, and ugliness of my city, and though my heart is made of lead, I cannot choose but weep."',
        es: '"Cuando estaba vivo con un corazón humano", explicó la estatua, "vivía en el Palacio donde el dolor estaba prohibido. Ahora que estoy en lo alto, veo toda la miseria, la pobreza y la fealdad de mi ciudad, y aunque mi corazón es de plomo, no puedo evitar llorar".'
      },
      {
        en: 'At the Prince\'s request, the Swallow postponed his journey to pluck the ruby from the sword for a starving seamstress, the sapphires for a freezing playwright and a poor matchgirl, and the golden leaves to feed hungry children.',
        es: 'A petición del Príncipe, la Golondrina pospuso su viaje para arrancarle el rubí de la espada a una costurera hambrienta, los zafiros para un dramaturgo con frío y una niña vendedora de fósforos, y las hojas de oro para alimentar a niños hambrientos.'
      },
      {
        en: 'When the winter froze the ground, the blind Prince was bare and grey, and the loyal Swallow died of cold at his feet. The statue\'s leaden heart snapped in two. In Heaven, God declared the dead bird and the broken heart the two most precious things in the entire city.',
        es: 'Cuando el invierno congeló el suelo, el Príncipe ciego quedó despojado y gris, y la leal Golondrina murió de frío a sus pies. El corazón de plomo de la estatua se partió en dos. En el Cielo, Dios declaró al pajarillo muerto y al corazón roto las dos cosas más preciosas de toda la ciudad.'
      }
    ],
    vocabulary: [
      {
        word: 'gilded',
        phonetic: 'gíl-did',
        meaning: 'Dorado / Recubierto en pan de oro',
        context: 'Gilded all over with thin leaves of fine gold.'
      },
      {
        word: 'brimming',
        phonetic: 'brí-min',
        meaning: 'Rebosando / Lleno hasta el borde',
        context: 'Eyes brimming with tears.'
      },
      {
        word: 'leaden',
        phonetic: 'lé-den',
        meaning: 'De plomo / Pesado',
        context: 'His leaden heart snapped in two.'
      },
      {
        word: 'seamstress',
        phonetic: 'sím-stras',
        meaning: 'Costurera',
        context: 'A starving seamstress.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Why was the statue weeping despite being named "The Happy Prince"?',
        questionEs: '¿Por qué lloraba la estatua a pesar de llamarse "El Príncipe Feliz"?',
        options: [
          'Because he wanted to fly to Egypt with the birds',
          'Because from his high column he could now see the poverty and suffering of the citizens',
          'Because the rain was ruining his gold coat',
          'Because hunters damaged his sword'
        ],
        correctIndex: 1,
        explanation: 'He wept out of profound empathy for the misery and hunger of the poor people in his city.'
      }
    ],
    xpReward: 70,
    gemsReward: 25
  },
  {
    id: 'crow-and-pitcher',
    title: 'The Crow and the Pitcher',
    titleEs: 'El Cuervo y la Jarra',
    author: "Aesop's Fables (Public Domain / Dominio Público)",
    source: 'Dominio Público universal • Fábulas de Esopo',
    level: 'A2',
    category: 'fable',
    readTimeMinutes: 2,
    wordCount: 170,
    coverEmoji: '🦅',
    summary: 'A thirsty crow uses clever problem-solving and physics to drink water from a deep pitcher.',
    summaryEs: 'Un cuervo sediento utiliza su ingenio y la física para elevar el nivel del agua y poder beber de una jarra profunda.',
    moral: {
      en: 'Little by little does the trick. Ingenuity and patience solve seemingly impossible problems.',
      es: 'Poco a poco se logra la meta. El ingenio y la perseverancia resuelven problemas que parecen imposibles.'
    },
    paragraphs: [
      {
        en: 'A thirsty Crow that was dying of thirst flew over a parched field searching desperately for water. Finally, he spotted a tall clay pitcher standing near a farmhouse.',
        es: 'Un Cuervo sediento que desfallecía de sed voló sobre un campo reseco buscando agua desesperadamente. Finalmente, divisó una alta jarra de barro cerca de una granja.'
      },
      {
        en: 'He flew down excitedly and peered inside. There was water at the bottom, but the neck of the pitcher was too narrow and the water was too deep for his beak to reach.',
        es: 'Bajó volando emocionado y miró al interior. Había agua en el fondo, pero el cuello de la jarra era demasiado estrecho y el agua estaba muy honda para que su pico la alcanzara.'
      },
      {
        en: 'He tried to tip the pitcher over, but it was far too heavy for him to budge. Despair crept in, but the crow did not give up. Looking around, he noticed small pebbles scattered across the dry ground.',
        es: 'Intentó volcar la jarra, pero era demasiado pesada para moverla. La desesperación se apoderó de él, pero el cuervo no se rindió. Al mirar a su alrededor, notó pequeñas piedras esparcidas por el suelo seco.'
      },
      {
        en: 'An ingenious idea struck him! Taking the pebbles one by one in his beak, he dropped them into the pitcher. With each pebble, the water level rose higher and higher until it reached the brim. The clever Crow quenched his thirst and saved his life.',
        es: '¡Una idea ingeniosa cruzó por su mente! Tomando las piedritas una a una con el pico, las fue arrojando dentro de la jarra. Con cada piedra, el nivel del agua subió más y más hasta llegar al borde. El astuto Cuervo sació su sed y salvó su vida.'
      }
    ],
    vocabulary: [
      {
        word: 'parched',
        phonetic: 'parcht',
        meaning: 'Reseco / Sediento',
        context: 'A parched dry field.'
      },
      {
        word: 'pebbles',
        phonetic: 'pé-bals',
        meaning: 'Piedritas / Guijarros',
        context: 'He dropped small pebbles into the pitcher.'
      },
      {
        word: 'brim',
        phonetic: 'brim',
        meaning: 'Borde superior',
        context: 'The water reached the brim.'
      },
      {
        word: 'ingenuity',
        phonetic: 'in-je-nú-i-ti',
        meaning: 'Ingenio / Creatividad',
        context: 'Ingenuity and patience solved the problem.'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'How did the Crow solve the problem of reaching the deep water?',
        questionEs: '¿Cómo resolvió el Cuervo el problema de alcanzar el agua honda?',
        options: [
          'He broke the clay pitcher with a stone',
          'He waited for the rain to fill it',
          'He dropped pebbles into the pitcher to displace and raise the water level',
          'He asked another bird for help'
        ],
        correctIndex: 2,
        explanation: 'By dropping pebbles into the pitcher, the water was displaced upward until the crow could drink comfortably.'
      }
    ],
    xpReward: 35,
    gemsReward: 10
  }
];
