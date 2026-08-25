export interface MemoryCardItem {
  id: string;
  topicId: string;
  english: string;
  spanish: string;
  emoji: string;
  phonetic?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface MemoryTopic {
  id: string;
  title: string;
  titleEn: string;
  emoji: string;
  description: string;
  color: string;
  badgeBg: string;
  items: MemoryCardItem[];
}

export const MEMORY_TOPICS: MemoryTopic[] = [
  {
    id: 'animals',
    title: 'Animales',
    titleEn: 'Animals',
    emoji: '🦁',
    description: 'Animales terrestres, acuáticos y aves en inglés.',
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    items: [
      { id: 'an-1', topicId: 'animals', english: 'Lion', spanish: 'León', emoji: '🦁', phonetic: 'lai-on', exampleSentence: 'The lion roars loudly.', exampleTranslation: 'El león ruge fuerte.' },
      { id: 'an-2', topicId: 'animals', english: 'Elephant', spanish: 'Elefante', emoji: '🐘', phonetic: 'e-le-fent', exampleSentence: 'The elephant is huge.', exampleTranslation: 'El elefante es enorme.' },
      { id: 'an-3', topicId: 'animals', english: 'Eagle', spanish: 'Águila', emoji: '🦅', phonetic: 'ii-gl', exampleSentence: 'The eagle flies high.', exampleTranslation: 'El águila vuela alto.' },
      { id: 'an-4', topicId: 'animals', english: 'Wolf', spanish: 'Lobo', emoji: '🐺', phonetic: 'uulf', exampleSentence: 'The wolf howls at night.', exampleTranslation: 'El lobo aúlla de noche.' },
      { id: 'an-5', topicId: 'animals', english: 'Dolphin', spanish: 'Delfín', emoji: '🐬', phonetic: 'dol-fin', exampleSentence: 'Dolphins are very smart.', exampleTranslation: 'Los delfines son muy inteligentes.' },
      { id: 'an-6', topicId: 'animals', english: 'Bear', spanish: 'Oso', emoji: '🐻', phonetic: 'beer', exampleSentence: 'The brown bear catches fish.', exampleTranslation: 'El oso pardo atrapa peces.' },
      { id: 'an-7', topicId: 'animals', english: 'Rabbit', spanish: 'Conejo', emoji: '🐰', phonetic: 'ra-bit', exampleSentence: 'The rabbit eats carrots.', exampleTranslation: 'El conejo come zanahorias.' },
      { id: 'an-8', topicId: 'animals', english: 'Fox', spanish: 'Zorro', emoji: '🦊', phonetic: 'fox', exampleSentence: 'The fox is cunning.', exampleTranslation: 'El zorro es astuto.' },
      { id: 'an-9', topicId: 'animals', english: 'Turtle', spanish: 'Tortuga', emoji: '🐢', phonetic: 'ter-tl', exampleSentence: 'The turtle moves slowly.', exampleTranslation: 'La tortuga avanza despacio.' },
      { id: 'an-10', topicId: 'animals', english: 'Owl', spanish: 'Búho / Lechuza', emoji: '🦉', phonetic: 'aul', exampleSentence: 'The owl sees in the dark.', exampleTranslation: 'El búho ve en la oscuridad.' },
      { id: 'an-11', topicId: 'animals', english: 'Penguin', spanish: 'Pingüino', emoji: '🐧', phonetic: 'pen-gwin', exampleSentence: 'Penguins live in the cold.', exampleTranslation: 'Los pingüinos viven en el frío.' },
      { id: 'an-12', topicId: 'animals', english: 'Shark', spanish: 'Tiburón', emoji: '🦈', phonetic: 'shaark', exampleSentence: 'The shark swims fast.', exampleTranslation: 'El tiburón nada rápido.' }
    ]
  },
  {
    id: 'verbs',
    title: 'Verbos de Acción',
    titleEn: 'Action Verbs',
    emoji: '⚡',
    description: 'Acciones dinámicas y movimientos del día a día.',
    color: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    items: [
      { id: 'vb-1', topicId: 'verbs', english: 'Run', spanish: 'Correr', emoji: '🏃', phonetic: 'ran', exampleSentence: 'I run in the park every morning.', exampleTranslation: 'Corro en el parque cada mañana.' },
      { id: 'vb-2', topicId: 'verbs', english: 'Jump', spanish: 'Saltar / Brincar', emoji: '🦘', phonetic: 'yomp', exampleSentence: 'Jump as high as you can!', exampleTranslation: '¡Brinca tan alto como puedas!' },
      { id: 'vb-3', topicId: 'verbs', english: 'Swim', spanish: 'Nadar', emoji: '🏊', phonetic: 'suim', exampleSentence: 'They swim in the pool.', exampleTranslation: 'Ellos nadan en la alberca.' },
      { id: 'vb-4', topicId: 'verbs', english: 'Read', spanish: 'Leer', emoji: '📖', phonetic: 'riid', exampleSentence: 'She reads a great book.', exampleTranslation: 'Ella lee un gran libro.' },
      { id: 'vb-5', topicId: 'verbs', english: 'Write', spanish: 'Escribir', emoji: '✍️', phonetic: 'rait', exampleSentence: 'Write an email to your boss.', exampleTranslation: 'Escribe un correo a tu jefe.' },
      { id: 'vb-6', topicId: 'verbs', english: 'Cook', spanish: 'Cocinar', emoji: '🍳', phonetic: 'kuk', exampleSentence: 'We cook dinner together.', exampleTranslation: 'Cocinamos la cena juntos.' },
      { id: 'vb-7', topicId: 'verbs', english: 'Drive', spanish: 'Manejar / Conducir', emoji: '🚗', phonetic: 'draiv', exampleSentence: 'He drives to work every day.', exampleTranslation: 'Él maneja al trabajo todos los días.' },
      { id: 'vb-8', topicId: 'verbs', english: 'Sing', spanish: 'Cantar', emoji: '🎤', phonetic: 'sing', exampleSentence: 'She loves to sing pop songs.', exampleTranslation: 'A ella le encanta cantar canciones pop.' },
      { id: 'vb-9', topicId: 'verbs', english: 'Dance', spanish: 'Bailar', emoji: '💃', phonetic: 'dans', exampleSentence: 'Let’s dance tonight!', exampleTranslation: '¡Bailemos esta noche!' },
      { id: 'vb-10', topicId: 'verbs', english: 'Think', spanish: 'Pensar', emoji: '🧠', phonetic: 'zink', exampleSentence: 'Think before you speak.', exampleTranslation: 'Piensa antes de hablar.' },
      { id: 'vb-11', topicId: 'verbs', english: 'Fly', spanish: 'Volar', emoji: '✈️', phonetic: 'flai', exampleSentence: 'Birds fly south for winter.', exampleTranslation: 'Las aves vuelan al sur en invierno.' },
      { id: 'vb-12', topicId: 'verbs', english: 'Sleep', spanish: 'Dormir', emoji: '😴', phonetic: 'sliip', exampleSentence: 'I need to sleep eight hours.', exampleTranslation: 'Necesito dormir ocho horas.' }
    ]
  },
  {
    id: 'street_city',
    title: 'Objetos de la Calle y Ciudad',
    titleEn: 'Street & City Objects',
    emoji: '🚦',
    description: 'Semáforos, banquetas, edificios y elementos urbanos.',
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    items: [
      { id: 'st-1', topicId: 'street_city', english: 'Traffic light', spanish: 'Semáforo', emoji: '🚦', phonetic: 'tra-fic lait', exampleSentence: 'Wait until the traffic light turns green.', exampleTranslation: 'Espera a que el semáforo se ponga en verde.' },
      { id: 'st-2', topicId: 'street_city', english: 'Sidewalk', spanish: 'Banqueta / Acera', emoji: '🚶', phonetic: 'said-uok', exampleSentence: 'Walk safely on the sidewalk.', exampleTranslation: 'Camina seguro por la banqueta.' },
      { id: 'st-3', topicId: 'street_city', english: 'Crosswalk', spanish: 'Paso peatonal / Cruce', emoji: '🚸', phonetic: 'cros-uok', exampleSentence: 'Always cross the street at the crosswalk.', exampleTranslation: 'Siempre cruza la calle por el paso peatonal.' },
      { id: 'st-4', topicId: 'street_city', english: 'Fire hydrant', spanish: 'Hidrante / Boca de agua', emoji: '🚒', phonetic: 'fai-er hai-drant', exampleSentence: 'Never park in front of a fire hydrant.', exampleTranslation: 'Nunca te estaciones frente a un hidrante.' },
      { id: 'st-5', topicId: 'street_city', english: 'Streetlight', spanish: 'Lámpara de calle / Farola', emoji: '💡', phonetic: 'striit-lait', exampleSentence: 'The streetlights turn on at sunset.', exampleTranslation: 'Las farolas se encienden al atardecer.' },
      { id: 'st-6', topicId: 'street_city', english: 'Bus stop', spanish: 'Parada de autobús / camión', emoji: '🚏', phonetic: 'bas stop', exampleSentence: 'I wait for the bus at this bus stop.', exampleTranslation: 'Espero el camión en esta parada.' },
      { id: 'st-7', topicId: 'street_city', english: 'Skyscraper', spanish: 'Rascacielos', emoji: '🏙️', phonetic: 'skai-skrei-per', exampleSentence: 'That skyscraper has 80 floors.', exampleTranslation: 'Ese rascacielos tiene 80 pisos.' },
      { id: 'st-8', topicId: 'street_city', english: 'Billboard', spanish: 'Espectacular / Anuncio', emoji: '🪧', phonetic: 'bil-bord', exampleSentence: 'There is a huge billboard on the highway.', exampleTranslation: 'Hay un espectacular enorme en la autopista.' },
      { id: 'st-9', topicId: 'street_city', english: 'Bench', spanish: 'Banca de parque', emoji: '🪑', phonetic: 'bench', exampleSentence: 'Let’s sit on the bench and rest.', exampleTranslation: 'Sentémonos en la banca a descansar.' },
      { id: 'st-10', topicId: 'street_city', english: 'Mailbox', spanish: 'Buzón de correo', emoji: '📮', phonetic: 'meil-box', exampleSentence: 'Drop the letter into the blue mailbox.', exampleTranslation: 'Mete la carta en el buzón azul.' },
      { id: 'st-11', topicId: 'street_city', english: 'Bridge', spanish: 'Puente', emoji: '🌉', phonetic: 'briy', exampleSentence: 'The Golden Gate is a famous bridge.', exampleTranslation: 'El Golden Gate es un puente famoso.' },
      { id: 'st-12', topicId: 'street_city', english: 'Fountain', spanish: 'Fuente', emoji: '⛲', phonetic: 'faun-tn', exampleSentence: 'The water fountain is in the main square.', exampleTranslation: 'La fuente de agua está en la plaza principal.' }
    ]
  },
  {
    id: 'clothing',
    title: 'Prendas de Ropa y Accesorios',
    titleEn: 'Clothing & Accessories',
    emoji: '👕',
    description: 'Prendas de vestir, calzado y accesorios cotidianos.',
    color: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300',
    items: [
      { id: 'cl-1', topicId: 'clothing', english: 'Hoodie', spanish: 'Sudadera con gorra', emoji: '🧥', phonetic: 'ju-di', exampleSentence: 'Wear your warm hoodie today.', exampleTranslation: 'Ponte tu sudadera calientita hoy.' },
      { id: 'cl-2', topicId: 'clothing', english: 'Sneakers', spanish: 'Tenis / Zapatillas', emoji: '👟', phonetic: 'snii-kerz', exampleSentence: 'I bought new running sneakers.', exampleTranslation: 'Compré tenis nuevos para correr.' },
      { id: 'cl-3', topicId: 'clothing', english: 'Jeans', spanish: 'Pantalones de mezclilla / Jeans', emoji: '👖', phonetic: 'yiins', exampleSentence: 'Blue jeans are classic and comfortable.', exampleTranslation: 'Los jeans azules son clásicos y cómodos.' },
      { id: 'cl-4', topicId: 'clothing', english: 'Jacket', spanish: 'Chamarra / Chaqueta', emoji: '🧥', phonetic: 'ya-ket', exampleSentence: 'Bring a leather jacket for tonight.', exampleTranslation: 'Lleva una chamarra de piel para esta noche.' },
      { id: 'cl-5', topicId: 'clothing', english: 'T-shirt', spanish: 'Playera / Camiseta', emoji: '👕', phonetic: 'tii-shert', exampleSentence: 'A plain cotton T-shirt is best.', exampleTranslation: 'Una playera lisa de algodón es lo mejor.' },
      { id: 'cl-6', topicId: 'clothing', english: 'Cap', spanish: 'Gorra', emoji: '🧢', phonetic: 'cap', exampleSentence: 'Put on a cap to block the sun.', exampleTranslation: 'Ponte una gorra para taparte del sol.' },
      { id: 'cl-7', topicId: 'clothing', english: 'Sunglasses', spanish: 'Lentes de sol', emoji: '🕶️', phonetic: 'san-gla-sez', exampleSentence: 'Don’t forget your sunglasses at the beach.', exampleTranslation: 'No olvides tus lentes de sol en la playa.' },
      { id: 'cl-8', topicId: 'clothing', english: 'Boots', spanish: 'Botas', emoji: '🥾', phonetic: 'buuts', exampleSentence: 'These hiking boots protect your feet.', exampleTranslation: 'Estas botas de montaña protegen tus pies.' },
      { id: 'cl-9', topicId: 'clothing', english: 'Scarf', spanish: 'Bufanda', emoji: '🧣', phonetic: 'scarf', exampleSentence: 'Wrap the scarf around your neck.', exampleTranslation: 'Envuélvete la bufanda en el cuello.' },
      { id: 'cl-10', topicId: 'clothing', english: 'Gloves', spanish: 'Guantes', emoji: '🧤', phonetic: 'glavz', exampleSentence: 'Wear gloves when it snows.', exampleTranslation: 'Usa guantes cuando nieve.' },
      { id: 'cl-11', topicId: 'clothing', english: 'Belt', spanish: 'Cinturón', emoji: '🥋', phonetic: 'belt', exampleSentence: 'Fasten your leather belt.', exampleTranslation: 'Abróchate el cinturón de piel.' },
      { id: 'cl-12', topicId: 'clothing', english: 'Dress', spanish: 'Vestido', emoji: '👗', phonetic: 'dres', exampleSentence: 'She wears an elegant red dress.', exampleTranslation: 'Ella usa un vestido rojo elegante.' }
    ]
  },
  {
    id: 'food_drinks',
    title: 'Comida y Bebidas',
    titleEn: 'Food & Drinks',
    emoji: '🍕',
    description: 'Platillos, bebidas y antojos en inglés estadounidense.',
    color: 'from-red-500 to-amber-600',
    badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
    items: [
      { id: 'fd-1', topicId: 'food_drinks', english: 'Coffee', spanish: 'Café', emoji: '☕', phonetic: 'co-fi', exampleSentence: 'I drink hot coffee with milk.', exampleTranslation: 'Tomo café caliente con leche.' },
      { id: 'fd-2', topicId: 'food_drinks', english: 'Cheese', spanish: 'Queso', emoji: '🧀', phonetic: 'chiis', exampleSentence: 'Melted cheese makes it delicious.', exampleTranslation: 'El queso derretido lo hace delicioso.' },
      { id: 'fd-3', topicId: 'food_drinks', english: 'Bread', spanish: 'Pan', emoji: '🍞', phonetic: 'bred', exampleSentence: 'Freshly baked bread smells amazing.', exampleTranslation: 'El pan recién horneado huele increíble.' },
      { id: 'fd-4', topicId: 'food_drinks', english: 'Soup', spanish: 'Sopa / Caldo', emoji: '🥣', phonetic: 'suup', exampleSentence: 'Hot chicken soup heals everything.', exampleTranslation: 'El caldo de pollo caliente cura todo.' },
      { id: 'fd-5', topicId: 'food_drinks', english: 'Steak', spanish: 'Corte de carne / Filete', emoji: '🥩', phonetic: 'steik', exampleSentence: 'I ordered a medium-rare steak.', exampleTranslation: 'Pedí un filete término medio.' },
      { id: 'fd-6', topicId: 'food_drinks', english: 'Ice cream', spanish: 'Helado / Nieve', emoji: '🍨', phonetic: 'ais-criim', exampleSentence: 'Vanilla ice cream is my favorite.', exampleTranslation: 'El helado de vainilla es mi favorito.' },
      { id: 'fd-7', topicId: 'food_drinks', english: 'Salad', spanish: 'Ensalada', emoji: '🥗', phonetic: 'sa-lad', exampleSentence: 'A fresh green salad with avocado.', exampleTranslation: 'Una ensalada verde fresca con aguacate.' },
      { id: 'fd-8', topicId: 'food_drinks', english: 'Chocolate', spanish: 'Chocolate', emoji: '🍫', phonetic: 'choc-lit', exampleSentence: 'Dark chocolate is rich and sweet.', exampleTranslation: 'El chocolate amargo es rico y dulce.' },
      { id: 'fd-9', topicId: 'food_drinks', english: 'Sandwich', spanish: 'Sándwich / Torta', emoji: '🥪', phonetic: 'sand-uich', exampleSentence: 'A ham and cheese sandwich for lunch.', exampleTranslation: 'Un sándwich de jamón y queso para comer.' },
      { id: 'fd-10', topicId: 'food_drinks', english: 'Juice', spanish: 'Jugo', emoji: '🧃', phonetic: 'yus', exampleSentence: 'Freshly squeezed orange juice.', exampleTranslation: 'Jugo de naranja recién exprimido.' },
      { id: 'fd-11', topicId: 'food_drinks', english: 'Pizza', spanish: 'Pizza', emoji: '🍕', phonetic: 'piit-sa', exampleSentence: 'Let’s order a pepperoni pizza.', exampleTranslation: 'Vamos a pedir una pizza de pepperoni.' },
      { id: 'fd-12', topicId: 'food_drinks', english: 'Tea', spanish: 'Té', emoji: '🍵', phonetic: 'tii', exampleSentence: 'Green tea with honey before bed.', exampleTranslation: 'Té verde con miel antes de dormir.' }
    ]
  },
  {
    id: 'professions',
    title: 'Profesiones y Oficios',
    titleEn: 'Professions & Jobs',
    emoji: '💼',
    description: 'Carreras, trabajos y especialidades laborales.',
    color: 'from-violet-500 to-purple-600',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    items: [
      { id: 'pr-1', topicId: 'professions', english: 'Doctor', spanish: 'Doctor / Médico', emoji: '👨‍⚕️', phonetic: 'doc-ter', exampleSentence: 'The doctor checks your health.', exampleTranslation: 'El doctor revisa tu salud.' },
      { id: 'pr-2', topicId: 'professions', english: 'Teacher', spanish: 'Profesor / Maestro', emoji: '👩‍🏫', phonetic: 'tii-cher', exampleSentence: 'The teacher explains the lesson clearly.', exampleTranslation: 'La maestra explica la lección claramente.' },
      { id: 'pr-3', topicId: 'professions', english: 'Engineer', spanish: 'Ingeniero', emoji: '👷', phonetic: 'en-yi-niir', exampleSentence: 'The software engineer builds useful apps.', exampleTranslation: 'El ingeniero de software construye apps útiles.' },
      { id: 'pr-4', topicId: 'professions', english: 'Chef', spanish: 'Cocinero / Chef', emoji: '👨‍🍳', phonetic: 'shef', exampleSentence: 'The chef prepares exquisite dishes.', exampleTranslation: 'El chef prepara platillos exquisitos.' },
      { id: 'pr-5', topicId: 'professions', english: 'Pilot', spanish: 'Piloto', emoji: '👨‍✈️', phonetic: 'pai-lot', exampleSentence: 'The pilot landed the airplane safely.', exampleTranslation: 'El piloto aterrizó el avión con seguridad.' },
      { id: 'pr-6', topicId: 'professions', english: 'Firefighter', spanish: 'Bombero', emoji: '🧑‍🚒', phonetic: 'fai-er-fai-ter', exampleSentence: 'Brave firefighters put out the fire.', exampleTranslation: 'Los valientes bomberos apagaron el fuego.' },
      { id: 'pr-7', topicId: 'professions', english: 'Police officer', spanish: 'Oficial de policía', emoji: '👮', phonetic: 'po-liis o-fi-ser', exampleSentence: 'The police officer protects the neighborhood.', exampleTranslation: 'El policía protege el vecindario.' },
      { id: 'pr-8', topicId: 'professions', english: 'Architect', spanish: 'Arquitecto', emoji: '📐', phonetic: 'ar-ki-tect', exampleSentence: 'The architect drew the house blueprints.', exampleTranslation: 'El arquitecto dibujó los planos de la casa.' },
      { id: 'pr-9', topicId: 'professions', english: 'Nurse', spanish: 'Enfermero / Enfermera', emoji: '👩‍⚕️', phonetic: 'ners', exampleSentence: 'The nurse took good care of the patient.', exampleTranslation: 'La enfermera cuidó muy bien al paciente.' },
      { id: 'pr-10', topicId: 'professions', english: 'Musician', spanish: 'Músico', emoji: '🎸', phonetic: 'miu-zi-shn', exampleSentence: 'The musician plays the acoustic guitar.', exampleTranslation: 'El músico toca la guitarra acústica.' },
      { id: 'pr-11', topicId: 'professions', english: 'Lawyer', spanish: 'Abogado', emoji: '⚖️', phonetic: 'loi-er', exampleSentence: 'The lawyer defended his client in court.', exampleTranslation: 'El abogado defendió a su cliente en la corte.' },
      { id: 'pr-12', topicId: 'professions', english: 'Scientist', spanish: 'Científico', emoji: '🔬', phonetic: 'sai-en-tist', exampleSentence: 'Scientists discover new cures in labs.', exampleTranslation: 'Los científicos descubren nuevas curas en laboratorios.' }
    ]
  },
  {
    id: 'house_furniture',
    title: 'La Casa y Muebles',
    titleEn: 'Home & Furniture',
    emoji: '🛋️',
    description: 'Muebles, electrodomésticos y cuartos del hogar.',
    color: 'from-amber-600 to-yellow-600',
    badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-300',
    items: [
      { id: 'hf-1', topicId: 'house_furniture', english: 'Sofa', spanish: 'Sofá / Sillón', emoji: '🛋️', phonetic: 'sou-fa', exampleSentence: 'Rest on the comfortable leather sofa.', exampleTranslation: 'Descansa en el cómodo sillón de piel.' },
      { id: 'hf-2', topicId: 'house_furniture', english: 'Refrigerator', spanish: 'Refrigerador / Refri', emoji: '🧊', phonetic: 'ri-fri-ye-rei-tor', exampleSentence: 'Keep the milk in the refrigerator.', exampleTranslation: 'Guarda la leche en el refri.' },
      { id: 'hf-3', topicId: 'house_furniture', english: 'Mirror', spanish: 'Espejo', emoji: '🪞', phonetic: 'mi-ror', exampleSentence: 'Look at yourself in the bathroom mirror.', exampleTranslation: 'Mírate en el espejo del baño.' },
      { id: 'hf-4', topicId: 'house_furniture', english: 'Pillow', spanish: 'Almohada', emoji: '🛏️', phonetic: 'pi-lou', exampleSentence: 'A soft pillow helps you sleep well.', exampleTranslation: 'Una almohada suave te ayuda a dormir bien.' },
      { id: 'hf-5', topicId: 'house_furniture', english: 'Lamp', spanish: 'Lámpara', emoji: '🛋️', phonetic: 'lamp', exampleSentence: 'Turn on the bedside lamp to read.', exampleTranslation: 'Prende la lámpara de noche para leer.' },
      { id: 'hf-6', topicId: 'house_furniture', english: 'Dining table', spanish: 'Mesa de comedor', emoji: '🪑', phonetic: 'dai-ning tei-bl', exampleSentence: 'We gather around the dining table.', exampleTranslation: 'Nos reunimos alrededor de la mesa de comedor.' },
      { id: 'hf-7', topicId: 'house_furniture', english: 'Wardrobe', spanish: 'Ropero / Clóset', emoji: '🚪', phonetic: 'uor-droub', exampleSentence: 'Hang your coats inside the wardrobe.', exampleTranslation: 'Cuelga tus abrigos dentro del ropero.' },
      { id: 'hf-8', topicId: 'house_furniture', english: 'Bookshelf', spanish: 'Librero / Estantería', emoji: '📚', phonetic: 'buk-shelf', exampleSentence: 'The bookshelf is filled with novels.', exampleTranslation: 'El librero está lleno de novelas.' },
      { id: 'hf-9', topicId: 'house_furniture', english: 'Oven', spanish: 'Horno', emoji: '🔥', phonetic: 'o-vn', exampleSentence: 'Bake the cookies in the oven for 15 minutes.', exampleTranslation: 'Hornea las galletas en el horno por 15 minutos.' },
      { id: 'hf-10', topicId: 'house_furniture', english: 'Rug', spanish: 'Tapete / Alfombra', emoji: '🧶', phonetic: 'rag', exampleSentence: 'A cozy rug warms the living room floor.', exampleTranslation: 'Un tapete acogedor abriga el piso de la sala.' },
      { id: 'hf-11', topicId: 'house_furniture', english: 'Sink', spanish: 'Fregadero / Lavabo', emoji: '🚰', phonetic: 'sink', exampleSentence: 'Wash your hands in the sink.', exampleTranslation: 'Lávate las manos en el lavabo.' },
      { id: 'hf-12', topicId: 'house_furniture', english: 'Clock', spanish: 'Reloj de pared', emoji: '⏰', phonetic: 'clok', exampleSentence: 'The clock on the wall says 8:00 AM.', exampleTranslation: 'El reloj en la pared marca las 8:00 AM.' }
    ]
  },
  {
    id: 'body_parts',
    title: 'Partes del Cuerpo',
    titleEn: 'Body Parts',
    emoji: '🧠',
    description: 'Anatomía humana, sentidos y articulaciones.',
    color: 'from-red-400 to-rose-600',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    items: [
      { id: 'bp-1', topicId: 'body_parts', english: 'Brain', spanish: 'Cerebro', emoji: '🧠', phonetic: 'brein', exampleSentence: 'Your brain controls every thought.', exampleTranslation: 'Tu cerebro controla cada pensamiento.' },
      { id: 'bp-2', topicId: 'body_parts', english: 'Heart', spanish: 'Corazón', emoji: '❤️', phonetic: 'jaart', exampleSentence: 'Exercise keeps your heart strong.', exampleTranslation: 'El ejercicio mantiene tu corazón fuerte.' },
      { id: 'bp-3', topicId: 'body_parts', english: 'Eyes', spanish: 'Ojos', emoji: '👀', phonetic: 'ais', exampleSentence: 'Close your eyes and relax.', exampleTranslation: 'Cierra los ojos y relájate.' },
      { id: 'bp-4', topicId: 'body_parts', english: 'Hands', spanish: 'Manos', emoji: '🤲', phonetic: 'yands', exampleSentence: 'Clap your hands with the rhythm.', exampleTranslation: 'Aplaude con tus manos al ritmo.' },
      { id: 'bp-5', topicId: 'body_parts', english: 'Shoulders', spanish: 'Hombros', emoji: '💪', phonetic: 'shoul-derz', exampleSentence: 'Roll your shoulders back to improve posture.', exampleTranslation: 'Gira los hombros hacia atrás para mejorar la postura.' },
      { id: 'bp-6', topicId: 'body_parts', english: 'Knees', spanish: 'Rodillas', emoji: '🦵', phonetic: 'niis', exampleSentence: 'Bend your knees when lifting heavy boxes.', exampleTranslation: 'Dobla las rodillas al levantar cajas pesadas.' },
      { id: 'bp-7', topicId: 'body_parts', english: 'Feet', spanish: 'Pies', emoji: '🦶', phonetic: 'fiit', exampleSentence: 'Walking barefoot strengthens your feet.', exampleTranslation: 'Caminar descalzo fortalece tus pies.' },
      { id: 'bp-8', topicId: 'body_parts', english: 'Ears', spanish: 'Orejas / Oídos', emoji: '👂', phonetic: 'i-erz', exampleSentence: 'Listen carefully with both ears.', exampleTranslation: 'Escucha con atención con ambos oídos.' },
      { id: 'bp-9', topicId: 'body_parts', english: 'Lungs', spanish: 'Pulmones', emoji: '🫁', phonetic: 'langs', exampleSentence: 'Take a deep breath into your lungs.', exampleTranslation: 'Respira profundo llenando tus pulmones.' },
      { id: 'bp-10', topicId: 'body_parts', english: 'Fingers', spanish: 'Dedos de la mano', emoji: '👉', phonetic: 'fing-gerz', exampleSentence: 'She wears a silver ring on her finger.', exampleTranslation: 'Ella lleva un anillo de plata en su dedo.' },
      { id: 'bp-11', topicId: 'body_parts', english: 'Teeth', spanish: 'Dientes', emoji: '🦷', phonetic: 'tiiz', exampleSentence: 'Brush your teeth twice a day.', exampleTranslation: 'Cepíllate los dientes dos veces al día.' },
      { id: 'bp-12', topicId: 'body_parts', english: 'Spine', spanish: 'Columna vertebral / Espalda', emoji: '🦴', phonetic: 'spain', exampleSentence: 'Keep your spine straight while sitting.', exampleTranslation: 'Mantén tu columna recta al sentarte.' }
    ]
  },
  {
    id: 'emotions',
    title: 'Emociones y Sentimientos',
    titleEn: 'Emotions & Feelings',
    emoji: '😊',
    description: 'Estados de ánimo, actitudes y sentimientos.',
    color: 'from-emerald-400 to-cyan-600',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    items: [
      { id: 'em-1', topicId: 'emotions', english: 'Happy', spanish: 'Feliz / Contento', emoji: '😄', phonetic: 'ja-pi', exampleSentence: 'I feel happy when I achieve my goals.', exampleTranslation: 'Me siento feliz cuando cumplo mis metas.' },
      { id: 'em-2', topicId: 'emotions', english: 'Excited', spanish: 'Emocionado / Entusiasmado', emoji: '🤩', phonetic: 'ek-sai-tid', exampleSentence: 'We are excited about the upcoming trip.', exampleTranslation: 'Estamos muy emocionados por el próximo viaje.' },
      { id: 'em-3', topicId: 'emotions', english: 'Calm', spanish: 'Tranquilo / En calma', emoji: '😌', phonetic: 'caam', exampleSentence: 'Stay calm under pressure.', exampleTranslation: 'Mantén la calma bajo presión.' },
      { id: 'em-4', topicId: 'emotions', english: 'Proud', spanish: 'Orgulloso', emoji: '🎖️', phonetic: 'praud', exampleSentence: 'Your parents are proud of your progress.', exampleTranslation: 'Tus papás están orgullosos de tu avance.' },
      { id: 'em-5', topicId: 'emotions', english: 'Grateful', spanish: 'Agradecido', emoji: '🙏', phonetic: 'greit-fl', exampleSentence: 'I am grateful for all the support.', exampleTranslation: 'Estoy agradecido por todo el apoyo.' },
      { id: 'em-6', topicId: 'emotions', english: 'Brave', spanish: 'Valiente', emoji: '🦁', phonetic: 'breiv', exampleSentence: 'It takes a brave person to speak up.', exampleTranslation: 'Se necesita ser valiente para alzar la voz.' },
      { id: 'em-7', topicId: 'emotions', english: 'Curious', spanish: 'Curioso / Con ganas de aprender', emoji: '🧐', phonetic: 'kiu-ri-os', exampleSentence: 'Curious minds learn languages faster.', exampleTranslation: 'Las mentes curiosas aprenden idiomas más rápido.' },
      { id: 'em-8', topicId: 'emotions', english: 'Energetic', spanish: 'Lleno de energía / Activo', emoji: '⚡', phonetic: 'e-ner-ye-tic', exampleSentence: 'A healthy breakfast makes you energetic.', exampleTranslation: 'Un desayuno saludable te llena de energía.' },
      { id: 'em-9', topicId: 'emotions', english: 'Relieved', spanish: 'Aliviado / Tranquilo', emoji: '😮‍💨', phonetic: 'ri-liivd', exampleSentence: 'I felt relieved after submitting the exam.', exampleTranslation: 'Me sentí aliviado tras entregar el examen.' },
      { id: 'em-10', topicId: 'emotions', english: 'Hopeful', spanish: 'Esperanzado / Optimista', emoji: '🌱', phonetic: 'joup-fl', exampleSentence: 'We are hopeful about the new project.', exampleTranslation: 'Somos optimistas respecto al nuevo proyecto.' },
      { id: 'em-11', topicId: 'emotions', english: 'Patient', spanish: 'Paciente', emoji: '⏳', phonetic: 'pei-shent', exampleSentence: 'Be patient with your learning process.', exampleTranslation: 'Sé paciente con tu proceso de aprendizaje.' },
      { id: 'em-12', topicId: 'emotions', english: 'Surprised', spanish: 'Sorprendido', emoji: '😲', phonetic: 'ser-praisd', exampleSentence: 'I was pleasantly surprised by the gift.', exampleTranslation: 'Me quedé gratamente sorprendido por el regalo.' }
    ]
  },
  {
    id: 'tech_office',
    title: 'Tecnología y Oficina',
    titleEn: 'Tech & Office',
    emoji: '💻',
    description: 'Dispositivos, herramientas de trabajo y software.',
    color: 'from-blue-600 to-indigo-700',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    items: [
      { id: 'to-1', topicId: 'tech_office', english: 'Laptop', spanish: 'Computadora portátil / Laptop', emoji: '💻', phonetic: 'lap-top', exampleSentence: 'Open your laptop to start working.', exampleTranslation: 'Abre tu laptop para comenzar a trabajar.' },
      { id: 'to-2', topicId: 'tech_office', english: 'Keyboard', spanish: 'Teclado', emoji: '⌨️', phonetic: 'kii-bord', exampleSentence: 'Type fast on the ergonomic keyboard.', exampleTranslation: 'Escribe rápido en el teclado ergonómico.' },
      { id: 'to-3', topicId: 'tech_office', english: 'Headphones', spanish: 'Audífonos', emoji: '🎧', phonetic: 'jed-founs', exampleSentence: 'Put on your noise-canceling headphones.', exampleTranslation: 'Ponte tus audífonos con cancelación de ruido.' },
      { id: 'to-4', topicId: 'tech_office', english: 'Mouse', spanish: 'Ratón / Mouse', emoji: '🖱️', phonetic: 'maus', exampleSentence: 'Click the link with your wireless mouse.', exampleTranslation: 'Haz clic en el enlace con tu mouse inalámbrico.' },
      { id: 'to-5', topicId: 'tech_office', english: 'Printer', spanish: 'Impresora', emoji: '🖨️', phonetic: 'prin-ter', exampleSentence: 'Print the contract on the laser printer.', exampleTranslation: 'Imprime el contrato en la impresora láser.' },
      { id: 'to-6', topicId: 'tech_office', english: 'Charger', spanish: 'Cargador', emoji: '🔌', phonetic: 'chaar-yer', exampleSentence: 'Do you have an extra phone charger?', exampleTranslation: '¿Tienes un cargador de celular extra?' },
      { id: 'to-7', topicId: 'tech_office', english: 'Screen', spanish: 'Pantalla / Monitor', emoji: '🖥️', phonetic: 'scriin', exampleSentence: 'A secondary screen increases productivity.', exampleTranslation: 'Una segunda pantalla aumenta la productividad.' },
      { id: 'to-8', topicId: 'tech_office', english: 'Folder', spanish: 'Carpeta / Folder', emoji: '📁', phonetic: 'foul-der', exampleSentence: 'Save the document inside this folder.', exampleTranslation: 'Guarda el documento dentro de esta carpeta.' },
      { id: 'to-9', topicId: 'tech_office', english: 'Notebook', spanish: 'Cuaderno / Libreta', emoji: '📓', phonetic: 'nout-buk', exampleSentence: 'Take notes in your paper notebook.', exampleTranslation: 'Toma notas en tu libreta de papel.' },
      { id: 'to-10', topicId: 'tech_office', english: 'Smartwatch', spanish: 'Reloj inteligente', emoji: '⌚', phonetic: 'smart-uach', exampleSentence: 'My smartwatch counts my daily steps.', exampleTranslation: 'Mi reloj inteligente cuenta mis pasos diarios.' },
      { id: 'to-11', topicId: 'tech_office', english: 'Webcam', spanish: 'Cámara web', emoji: '📹', phonetic: 'ueb-cam', exampleSentence: 'Turn on your webcam for the video meeting.', exampleTranslation: 'Enciende tu cámara web para la videollamada.' },
      { id: 'to-12', topicId: 'tech_office', english: 'Flash drive', spanish: 'Memoria USB', emoji: '💾', phonetic: 'flash draiv', exampleSentence: 'Copy the presentation files to the flash drive.', exampleTranslation: 'Copia los archivos de la presentación a la USB.' }
    ]
  },
  {
    id: 'fruits_veggies',
    title: 'Frutas y Verduras',
    titleEn: 'Fruits & Veggies',
    emoji: '🥑',
    description: 'Frutos frescos, vegetales y legumbres nutritivas.',
    color: 'from-green-500 to-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    items: [
      { id: 'fv-1', topicId: 'fruits_veggies', english: 'Avocado', spanish: 'Aguacate', emoji: '🥑', phonetic: 'a-vo-ca-dou', exampleSentence: 'Fresh Mexican avocado makes great guacamole.', exampleTranslation: 'El aguacate fresco mexicano hace gran guacamole.' },
      { id: 'fv-2', topicId: 'fruits_veggies', english: 'Watermelon', spanish: 'Sandía', emoji: '🍉', phonetic: 'ua-ter-me-lon', exampleSentence: 'Cold watermelon is refreshing in summer.', exampleTranslation: 'La sandía fría es refrescante en verano.' },
      { id: 'fv-3', topicId: 'fruits_veggies', english: 'Strawberry', spanish: 'Fresa', emoji: '🍓', phonetic: 'stro-be-ri', exampleSentence: 'Strawberries with cream are a classic dessert.', exampleTranslation: 'Las fresas con crema son un postre clásico.' },
      { id: 'fv-4', topicId: 'fruits_veggies', english: 'Pineapple', spanish: 'Piña', emoji: '🍍', phonetic: 'pain-a-pl', exampleSentence: 'Sweet pineapple grows in tropical climates.', exampleTranslation: 'La piña dulce crece en climas tropicales.' },
      { id: 'fv-5', topicId: 'fruits_veggies', english: 'Banana', spanish: 'Plátano / Banano', emoji: '🍌', phonetic: 'ba-na-na', exampleSentence: 'Bananas are rich in natural potassium.', exampleTranslation: 'Los plátanos son ricos en potasio natural.' },
      { id: 'fv-6', topicId: 'fruits_veggies', english: 'Carrot', spanish: 'Zanahoria', emoji: '🥕', phonetic: 'ca-rot', exampleSentence: 'Crunchy carrots are good for your eyes.', exampleTranslation: 'Las zanahorias crujientes son buenas para la vista.' },
      { id: 'fv-7', topicId: 'fruits_veggies', english: 'Tomato', spanish: 'Jitomate / Tomate rojo', emoji: '🍅', phonetic: 'to-mei-to', exampleSentence: 'Dice the red tomatoes for the salsa.', exampleTranslation: 'Pica los jitomates rojos para la salsa.' },
      { id: 'fv-8', topicId: 'fruits_veggies', english: 'Broccoli', spanish: 'Brócoli', emoji: '🥦', phonetic: 'bro-co-li', exampleSentence: 'Steam the broccoli with olive oil.', exampleTranslation: 'Cocina el brócoli al vapor con aceite de oliva.' },
      { id: 'fv-9', topicId: 'fruits_veggies', english: 'Onion', spanish: 'Cebolla', emoji: '🧅', phonetic: 'on-yon', exampleSentence: 'Chop a white onion for the taco topping.', exampleTranslation: 'Pica una cebolla blanca para los tacos.' },
      { id: 'fv-10', topicId: 'fruits_veggies', english: 'Garlic', spanish: 'Ajo', emoji: '🧄', phonetic: 'gaar-lik', exampleSentence: 'Garlic gives fantastic flavor to dishes.', exampleTranslation: 'El ajo le da un sabor fantástico a la comida.' },
      { id: 'fv-11', topicId: 'fruits_veggies', english: 'Lemon', spanish: 'Limón amarillo / Limón', emoji: '🍋', phonetic: 'le-mon', exampleSentence: 'Squeeze fresh lemon juice on the fish.', exampleTranslation: 'Exprime jugo de limón fresco en el pescado.' },
      { id: 'fv-12', topicId: 'fruits_veggies', english: 'Mango', spanish: 'Mango', emoji: '🥭', phonetic: 'man-gou', exampleSentence: 'Sweet mango with chili powder and lime.', exampleTranslation: 'Mango dulce con chile piquín y limón.' }
    ]
  },
  {
    id: 'nature_weather',
    title: 'Naturaleza y Clima',
    titleEn: 'Nature & Weather',
    emoji: '🌲',
    description: 'Fenómenos climáticos, paisajes y ecosistemas.',
    color: 'from-sky-500 to-indigo-600',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    items: [
      { id: 'nw-1', topicId: 'nature_weather', english: 'Thunderstorm', spanish: 'Tormenta eléctrica', emoji: '⛈️', phonetic: 'zan-der-storm', exampleSentence: 'The thunderstorm brought heavy rain and wind.', exampleTranslation: 'La tormenta eléctrica trajo fuertes lluvias y viento.' },
      { id: 'nw-2', topicId: 'nature_weather', english: 'Rainbow', spanish: 'Arcoíris', emoji: '🌈', phonetic: 'rein-bou', exampleSentence: 'A colorful rainbow appeared after the rain.', exampleTranslation: 'Un colorido arcoíris apareció tras la lluvia.' },
      { id: 'nw-3', topicId: 'nature_weather', english: 'Mountain', spanish: 'Montaña / Cerro', emoji: '⛰️', phonetic: 'maun-tn', exampleSentence: 'We hiked up the snowy mountain.', exampleTranslation: 'Subimos a pie la montaña nevada.' },
      { id: 'nw-4', topicId: 'nature_weather', english: 'Waterfall', spanish: 'Cascada / Caída de agua', emoji: '🌊', phonetic: 'ua-ter-fol', exampleSentence: 'The crystal waterfall is hidden in the jungle.', exampleTranslation: 'La cascada cristalina está escondida en la selva.' },
      { id: 'nw-5', topicId: 'nature_weather', english: 'Forest', spanish: 'Bosque', emoji: '🌲', phonetic: 'fo-rest', exampleSentence: 'Pine trees grow tall inside the green forest.', exampleTranslation: 'Los pinos crecen altos dentro del bosque verde.' },
      { id: 'nw-6', topicId: 'nature_weather', english: 'Desert', spanish: 'Desierto', emoji: '🏜️', phonetic: 'de-zert', exampleSentence: 'The Sonora desert has giant saguaro cacti.', exampleTranslation: 'El desierto de Sonora tiene cactus saguaros gigantes.' },
      { id: 'nw-7', topicId: 'nature_weather', english: 'Ocean', spanish: 'Océano / Mar', emoji: '🌊', phonetic: 'ou-shn', exampleSentence: 'The Pacific Ocean has huge waves.', exampleTranslation: 'El Océano Pacífico tiene olas gigantescas.' },
      { id: 'nw-8', topicId: 'nature_weather', english: 'Sunrise', spanish: 'Amanecer / Salida del sol', emoji: '🌅', phonetic: 'san-rais', exampleSentence: 'Watching the sunrise gives me peace.', exampleTranslation: 'Ver el amanecer me transmite paz.' },
      { id: 'nw-9', topicId: 'nature_weather', english: 'Lightning', spanish: 'Rayo / Relámpago', emoji: '⚡', phonetic: 'lait-ning', exampleSentence: 'Lightning illuminated the dark night sky.', exampleTranslation: 'El rayo iluminó el oscuro cielo nocturno.' },
      { id: 'nw-10', topicId: 'nature_weather', english: 'Cloud', spanish: 'Nube', emoji: '☁️', phonetic: 'claud', exampleSentence: 'White fluffy clouds float in the blue sky.', exampleTranslation: 'Nubes blancas y esponjosas flotan en el cielo azul.' },
      { id: 'nw-11', topicId: 'nature_weather', english: 'Island', spanish: 'Isla', emoji: '🏝️', phonetic: 'ai-land', exampleSentence: 'Cozumel is a paradisiacal Mexican island.', exampleTranslation: 'Cozumel es una paradisíaca isla mexicana.' },
      { id: 'nw-12', topicId: 'nature_weather', english: 'River', spanish: 'Río', emoji: '🏞️', phonetic: 'ri-ver', exampleSentence: 'The clean river flows towards the lake.', exampleTranslation: 'El río limpio fluye hacia el lago.' }
    ]
  },
  {
    id: 'travel_transport',
    title: 'Viajes y Transporte',
    titleEn: 'Travel & Transport',
    emoji: '✈️',
    description: 'Medios de transporte, aeropuertos y viajes internacionales.',
    color: 'from-blue-500 to-cyan-600',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
    items: [
      { id: 'tt-1', topicId: 'travel_transport', english: 'Airplane', spanish: 'Avión', emoji: '✈️', phonetic: 'eer-plein', exampleSentence: 'The airplane departs at terminal two.', exampleTranslation: 'El avión despega en la terminal dos.' },
      { id: 'tt-2', topicId: 'travel_transport', english: 'Passport', spanish: 'Pasaporte', emoji: '🛂', phonetic: 'pas-port', exampleSentence: 'Keep your passport ready at immigration.', exampleTranslation: 'Ten listo tu pasaporte en migración.' },
      { id: 'tt-3', topicId: 'travel_transport', english: 'Suitcase', spanish: 'Maleta / Equipaje', emoji: '🧳', phonetic: 'suut-keis', exampleSentence: 'Pack your suitcase before tomorrow.', exampleTranslation: 'Empaca tu maleta antes de mañana.' },
      { id: 'tt-4', topicId: 'travel_transport', english: 'Bicycle', spanish: 'Bicicleta / Bici', emoji: '🚲', phonetic: 'bai-si-cl', exampleSentence: 'Riding a bicycle is eco-friendly and healthy.', exampleTranslation: 'Andar en bicicleta es ecológico y saludable.' },
      { id: 'tt-5', topicId: 'travel_transport', english: 'Train', spanish: 'Tren', emoji: '🚆', phonetic: 'trein', exampleSentence: 'The high-speed train travels between cities.', exampleTranslation: 'El tren de alta velocidad viaja entre ciudades.' },
      { id: 'tt-6', topicId: 'travel_transport', english: 'Subway / Metro', spanish: 'Metro subterráneo', emoji: '🚇', phonetic: 'sab-uei', exampleSentence: 'Take the subway to avoid rush hour traffic.', exampleTranslation: 'Toma el metro para evitar el tráfico de hora pico.' },
      { id: 'tt-7', topicId: 'travel_transport', english: 'Boarding pass', spanish: 'Pase de abordar', emoji: '🎫', phonetic: 'bor-ding pas', exampleSentence: 'Show your digital boarding pass at the gate.', exampleTranslation: 'Muestra tu pase de abordar digital en la puerta.' },
      { id: 'tt-8', topicId: 'travel_transport', english: 'Cruise ship', spanish: 'Crucero / Barco', emoji: '🚢', phonetic: 'cruus ship', exampleSentence: 'The cruise ship sailed into the Caribbean.', exampleTranslation: 'El crucero zarpó hacia el Caribe.' },
      { id: 'tt-9', topicId: 'travel_transport', english: 'Motorcycle', spanish: 'Motocicleta / Moto', emoji: '🏍️', phonetic: 'mou-tor-sai-cl', exampleSentence: 'Always wear a helmet when riding a motorcycle.', exampleTranslation: 'Siempre usa casco al andar en motocicleta.' },
      { id: 'tt-10', topicId: 'travel_transport', english: 'Helicopter', spanish: 'Helicóptero', emoji: '🚁', phonetic: 'je-li-cop-ter', exampleSentence: 'The helicopter landed on the building roof.', exampleTranslation: 'El helicóptero aterrizó en el techo del edificio.' },
      { id: 'tt-11', topicId: 'travel_transport', english: 'Taxi / Cab', spanish: 'Taxi', emoji: '🚕', phonetic: 'tax-i', exampleSentence: 'Call a taxi to go directly to the hotel.', exampleTranslation: 'Pide un taxi para ir directo al hotel.' },
      { id: 'tt-12', topicId: 'travel_transport', english: 'Ticket', spanish: 'Boleto / Pasaje', emoji: '🎟️', phonetic: 'ti-ket', exampleSentence: 'I booked a round-trip ticket online.', exampleTranslation: 'Compré un boleto redondo por internet.' }
    ]
  },
  {
    id: 'sports_hobbies',
    title: 'Pasatiempos y Deportes',
    titleEn: 'Sports & Hobbies',
    emoji: '⚽',
    description: 'Disciplinas deportivas, recreación y actividades lúdicas.',
    color: 'from-green-600 to-teal-700',
    badgeBg: 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300',
    items: [
      { id: 'sh-1', topicId: 'sports_hobbies', english: 'Soccer', spanish: 'Fútbol (Soccer)', emoji: '⚽', phonetic: 'so-ker', exampleSentence: 'Millions of fans watch the soccer final.', exampleTranslation: 'Millones de fanáticos ven la final de fútbol.' },
      { id: 'sh-2', topicId: 'sports_hobbies', english: 'Basketball', spanish: 'Básquetbol / Baloncesto', emoji: '🏀', phonetic: 'bas-ket-bol', exampleSentence: 'He shoots the basketball into the hoop.', exampleTranslation: 'Él encesta el balón en la canasta.' },
      { id: 'sh-3', topicId: 'sports_hobbies', english: 'Guitar', spanish: 'Guitarra', emoji: '🎸', phonetic: 'gi-taar', exampleSentence: 'Playing acoustic guitar relieves daily stress.', exampleTranslation: 'Tocar la guitarra acústica alivia el estrés diario.' },
      { id: 'sh-4', topicId: 'sports_hobbies', english: 'Chess', spanish: 'Ajedrez', emoji: '♟️', phonetic: 'ches', exampleSentence: 'Chess teaches strategic planning and focus.', exampleTranslation: 'El ajedrez enseña planeación estratégica y enfoque.' },
      { id: 'sh-5', topicId: 'sports_hobbies', english: 'Photography', spanish: 'Fotografía', emoji: '📸', phonetic: 'fo-to-gra-fi', exampleSentence: 'Landscape photography captures nature’s beauty.', exampleTranslation: 'La fotografía de paisajes captura la belleza de la naturaleza.' },
      { id: 'sh-6', topicId: 'sports_hobbies', english: 'Swimming', spanish: 'Natación', emoji: '🏊', phonetic: 'sui-ming', exampleSentence: 'Swimming exercises every muscle in the body.', exampleTranslation: 'La natación ejercita cada músculo del cuerpo.' },
      { id: 'sh-7', topicId: 'sports_hobbies', english: 'Hiking', spanish: 'Senderismo / Caminata de montaña', emoji: '🥾', phonetic: 'jai-king', exampleSentence: 'Go hiking on weekends to breathe fresh air.', exampleTranslation: 'Haz senderismo los fines de semana para respirar aire fresco.' },
      { id: 'sh-8', topicId: 'sports_hobbies', english: 'Painting', spanish: 'Pintura artística', emoji: '🎨', phonetic: 'pein-ting', exampleSentence: 'Oil painting allows rich color blending.', exampleTranslation: 'La pintura al óleo permite mezclar colores ricos.' },
      { id: 'sh-9', topicId: 'sports_hobbies', english: 'Gaming', spanish: 'Videojuegos / Gaming', emoji: '🎮', phonetic: 'gei-ming', exampleSentence: 'Multiplayer gaming connects friends globally.', exampleTranslation: 'Los videojuegos multijugador conectan amigos globalmente.' },
      { id: 'sh-10', topicId: 'sports_hobbies', english: 'Gardening', spanish: 'Jardinería', emoji: '🪴', phonetic: 'gaar-dning', exampleSentence: 'Gardening flowers and herbs brings joy.', exampleTranslation: 'La jardinería de flores y hierbas trae alegría.' },
      { id: 'sh-11', topicId: 'sports_hobbies', english: 'Tennis', spanish: 'Tenis', emoji: '🎾', phonetic: 'te-nis', exampleSentence: 'Hit the tennis ball with topspin.', exampleTranslation: 'Golpea la pelota de tenis con efecto.' },
      { id: 'sh-12', topicId: 'sports_hobbies', english: 'Yoga', spanish: 'Yoga', emoji: '🧘', phonetic: 'you-ga', exampleSentence: 'Morning yoga stretches increase flexibility.', exampleTranslation: 'Los estiramientos de yoga matutinos aumentan la flexibilidad.' }
    ]
  }
];
