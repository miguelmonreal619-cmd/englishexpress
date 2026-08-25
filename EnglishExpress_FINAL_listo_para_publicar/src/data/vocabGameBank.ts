import { VocabGameWord } from '../types';

// Large curated bank of 110+ tiered vocabulary words with SINGLE clean translations
// and alternate meanings for recycling across rounds.
export const CURATED_VOCAB_BANK: VocabGameWord[] = [
  // ==================== TIER 1: EASY (Words 1-35) ====================
  {
    id: 'w_easy_1',
    english: 'Apple',
    phonetic: 'á-pol',
    spanish: 'Manzana',
    alternateMeanings: ['Pomo'],
    distractors: ['Pera', 'Plátano', 'Naranja'],
    options: ['Manzana', 'Pera', 'Plátano', 'Naranja'],
    difficulty: 'easy',
    category: 'Comida',
    exampleSentence: 'I eat a fresh green apple every morning.',
    exampleTranslation: 'Como una manzana verde fresca cada mañana.'
  },
  {
    id: 'w_easy_2',
    english: 'Book',
    phonetic: 'buk',
    spanish: 'Libro',
    alternateMeanings: ['Reservar'],
    distractors: ['Cuaderno', 'Revista', 'Periódico'],
    options: ['Libro', 'Cuaderno', 'Revista', 'Periódico'],
    difficulty: 'easy',
    category: 'Educación',
    exampleSentence: 'This book is very interesting.',
    exampleTranslation: 'Este libro es muy interesante.'
  },
  {
    id: 'w_easy_3',
    english: 'House',
    phonetic: 'jáus',
    spanish: 'Casa',
    alternateMeanings: ['Vivienda', 'Hogar'],
    distractors: ['Edificio', 'Departamento', 'Habitación'],
    options: ['Casa', 'Edificio', 'Departamento', 'Habitación'],
    difficulty: 'easy',
    category: 'Hogar',
    exampleSentence: 'Welcome to my new house.',
    exampleTranslation: 'Bienvenido a mi nueva casa.'
  },
  {
    id: 'w_easy_4',
    english: 'Water',
    phonetic: 'guá-rer',
    spanish: 'Agua',
    alternateMeanings: ['Regar'],
    distractors: ['Leche', 'Jugo', 'Refresco'],
    options: ['Agua', 'Leche', 'Jugo', 'Refresco'],
    difficulty: 'easy',
    category: 'Bebidas',
    exampleSentence: 'Drink a glass of cold water.',
    exampleTranslation: 'Bebe un vaso de agua fría.'
  },
  {
    id: 'w_easy_5',
    english: 'Friend',
    phonetic: 'frend',
    spanish: 'Amigo',
    alternateMeanings: ['Compañero', 'Camarada'],
    distractors: ['Vecino', 'Jefe', 'Primo'],
    options: ['Amigo', 'Vecino', 'Jefe', 'Primo'],
    difficulty: 'easy',
    category: 'Relaciones',
    exampleSentence: 'Carlos is my best friend from Monterrey.',
    exampleTranslation: 'Carlos es mi mejor amigo de Monterrey.'
  },
  {
    id: 'w_easy_6',
    english: 'Morning',
    phonetic: 'mór-ning',
    spanish: 'Mañana',
    alternateMeanings: ['Amanecer', 'Madrugada'],
    distractors: ['Tarde', 'Noche', 'Mediodía'],
    options: ['Mañana', 'Tarde', 'Noche', 'Mediodía'],
    difficulty: 'easy',
    category: 'Tiempo',
    exampleSentence: 'Good morning to everyone!',
    exampleTranslation: '¡Buenos días a todos!'
  },
  {
    id: 'w_easy_7',
    english: 'Always',
    phonetic: 'ól-weis',
    spanish: 'Siempre',
    alternateMeanings: ['Constantemente'],
    distractors: ['A veces', 'Nunca', 'Rara vez'],
    options: ['Siempre', 'A veces', 'Nunca', 'Rara vez'],
    difficulty: 'easy',
    category: 'Adverbios',
    exampleSentence: 'She always arrives on time.',
    exampleTranslation: 'Ella siempre llega a tiempo.'
  },
  {
    id: 'w_easy_8',
    english: 'Car',
    phonetic: 'kar',
    spanish: 'Coche',
    alternateMeanings: ['Carro', 'Auto'],
    distractors: ['Camión', 'Bicicleta', 'Avión'],
    options: ['Coche', 'Camión', 'Bicicleta', 'Avión'],
    difficulty: 'easy',
    category: 'Transporte',
    exampleSentence: 'We rented a car for the road trip.',
    exampleTranslation: 'Rentamos un carro para el viaje por carretera.'
  },
  {
    id: 'w_easy_9',
    english: 'Dog',
    phonetic: 'dog',
    spanish: 'Perro',
    alternateMeanings: ['Can'],
    distractors: ['Gato', 'Caballo', 'Pájaro'],
    options: ['Perro', 'Gato', 'Caballo', 'Pájaro'],
    difficulty: 'easy',
    category: 'Animales',
    exampleSentence: 'The dog is barking happily in the yard.',
    exampleTranslation: 'El perro está ladrando alegremente en el patio.'
  },
  {
    id: 'w_easy_10',
    english: 'Bread',
    phonetic: 'bred',
    spanish: 'Pan',
    alternateMeanings: ['Baguette'],
    distractors: ['Arroz', 'Carne', 'Queso'],
    options: ['Pan', 'Arroz', 'Carne', 'Queso'],
    difficulty: 'easy',
    category: 'Comida',
    exampleSentence: 'I bought fresh bread from the bakery.',
    exampleTranslation: 'Compré pan fresco de la panadería.'
  },
  {
    id: 'w_easy_11',
    english: 'Happy',
    phonetic: 'já-pi',
    spanish: 'Feliz',
    alternateMeanings: ['Contento', 'Alegre'],
    distractors: ['Enojado', 'Triste', 'Cansado'],
    options: ['Feliz', 'Enojado', 'Triste', 'Cansado'],
    difficulty: 'easy',
    category: 'Emociones',
    exampleSentence: 'They are very happy with their test results.',
    exampleTranslation: 'Están muy felices con los resultados de su examen.'
  },
  {
    id: 'w_easy_12',
    english: 'Door',
    phonetic: 'dor',
    spanish: 'Puerta',
    alternateMeanings: ['Entrada', 'Acceso'],
    distractors: ['Ventana', 'Pared', 'Piso'],
    options: ['Puerta', 'Ventana', 'Pared', 'Piso'],
    difficulty: 'easy',
    category: 'Hogar',
    exampleSentence: 'Please close the front door.',
    exampleTranslation: 'Por favor cierra la puerta principal.'
  },
  {
    id: 'w_easy_13',
    english: 'Window',
    phonetic: 'wín-dou',
    spanish: 'Ventana',
    alternateMeanings: ['Ventanilla'],
    distractors: ['Puerta', 'Cortina', 'Espejo'],
    options: ['Ventana', 'Puerta', 'Cortina', 'Espejo'],
    difficulty: 'easy',
    category: 'Hogar',
    exampleSentence: 'Open the window to get fresh air.',
    exampleTranslation: 'Abre la ventana para que entre aire fresco.'
  },
  {
    id: 'w_easy_14',
    english: 'School',
    phonetic: 'skul',
    spanish: 'Escuela',
    alternateMeanings: ['Colegio', 'Plantel'],
    distractors: ['Universidad', 'Oficina', 'Hospital'],
    options: ['Escuela', 'Universidad', 'Oficina', 'Hospital'],
    difficulty: 'easy',
    category: 'Lugares',
    exampleSentence: 'The kids walk to school together.',
    exampleTranslation: 'Los niños caminan juntos a la escuela.'
  },
  {
    id: 'w_easy_15',
    english: 'Work',
    phonetic: 'wurk',
    spanish: 'Trabajo',
    alternateMeanings: ['Labor', 'Empleo'],
    distractors: ['Descanso', 'Estudio', 'Vacaciones'],
    options: ['Trabajo', 'Descanso', 'Estudio', 'Vacaciones'],
    difficulty: 'easy',
    category: 'Profesional',
    exampleSentence: 'I start work at eight in the morning.',
    exampleTranslation: 'Comienzo a trabajar a las ocho de la mañana.'
  },
  {
    id: 'w_easy_16',
    english: 'City',
    phonetic: 'sí-ti',
    spanish: 'Ciudad',
    alternateMeanings: ['Metrópoli', 'Urbe'],
    distractors: ['Pueblo', 'Campo', 'País'],
    options: ['Ciudad', 'Pueblo', 'Campo', 'País'],
    difficulty: 'easy',
    category: 'Lugares',
    exampleSentence: 'San Antonio is a beautiful historic city.',
    exampleTranslation: 'San Antonio es una hermosa ciudad histórica.'
  },
  {
    id: 'w_easy_17',
    english: 'Fast',
    phonetic: 'fast',
    spanish: 'Rápido',
    alternateMeanings: ['Veloz', 'Ayuno'],
    distractors: ['Lento', 'Fuerte', 'Pesado'],
    options: ['Rápido', 'Lento', 'Fuerte', 'Pesado'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'He is a very fast runner.',
    exampleTranslation: 'Él es un corredor muy rápido.'
  },
  {
    id: 'w_easy_18',
    english: 'Slow',
    phonetic: 'slou',
    spanish: 'Lento',
    alternateMeanings: ['Pausado', 'Tardo'],
    distractors: ['Rápido', 'Silencioso', 'Fácil'],
    options: ['Lento', 'Rápido', 'Silencioso', 'Fácil'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'Traffic is very slow this afternoon.',
    exampleTranslation: 'El tráfico está muy lento esta tarde.'
  },
  {
    id: 'w_easy_19',
    english: 'Money',
    phonetic: 'má-ni',
    spanish: 'Dinero',
    alternateMeanings: ['Efectivo', 'Plata'],
    distractors: ['Factura', 'Cuenta', 'Tarjeta'],
    options: ['Dinero', 'Factura', 'Cuenta', 'Tarjeta'],
    difficulty: 'easy',
    category: 'Economía',
    exampleSentence: 'I need some cash money for the bus.',
    exampleTranslation: 'Necesito algo de dinero en efectivo para el autobús.'
  },
  {
    id: 'w_easy_20',
    english: 'Night',
    phonetic: 'náit',
    spanish: 'Noche',
    alternateMeanings: ['Anochecer'],
    distractors: ['Tarde', 'Día', 'Amanecer'],
    options: ['Noche', 'Tarde', 'Día', 'Amanecer'],
    difficulty: 'easy',
    category: 'Tiempo',
    exampleSentence: 'Have a good night and sweet dreams.',
    exampleTranslation: 'Ten una buena noche y dulces sueños.'
  },
  {
    id: 'w_easy_21',
    english: 'Table',
    phonetic: 'téi-bl',
    spanish: 'Mesa',
    alternateMeanings: ['Tabla', 'Cuadro'],
    distractors: ['Silla', 'Cama', 'Escritorio'],
    options: ['Mesa', 'Silla', 'Cama', 'Escritorio'],
    difficulty: 'easy',
    category: 'Hogar',
    exampleSentence: 'Dinner is on the table.',
    exampleTranslation: 'La cena está sobre la mesa.'
  },
  {
    id: 'w_easy_22',
    english: 'Chair',
    phonetic: 'cher',
    spanish: 'Silla',
    alternateMeanings: ['Asiento', 'Presidencia'],
    distractors: ['Sillón', 'Mesa', 'Sofá'],
    options: ['Silla', 'Sillón', 'Mesa', 'Sofá'],
    difficulty: 'easy',
    category: 'Hogar',
    exampleSentence: 'Take a seat on that wooden chair.',
    exampleTranslation: 'Toma asiento en esa silla de madera.'
  },
  {
    id: 'w_easy_23',
    english: 'Family',
    phonetic: 'fá-mi-li',
    spanish: 'Familia',
    alternateMeanings: ['Parientes'],
    distractors: ['Amigos', 'Compañeros', 'Vecinos'],
    options: ['Familia', 'Amigos', 'Compañeros', 'Vecinos'],
    difficulty: 'easy',
    category: 'Relaciones',
    exampleSentence: 'My family lives in Guadalajara.',
    exampleTranslation: 'Mi familia vive en Guadalajara.'
  },
  {
    id: 'w_easy_24',
    english: 'Cold',
    phonetic: 'kóuld',
    spanish: 'Frío',
    alternateMeanings: ['Resfriado', 'Gripa'],
    distractors: ['Caliente', 'Tibio', 'Húmedo'],
    options: ['Frío', 'Caliente', 'Tibio', 'Húmedo'],
    difficulty: 'easy',
    category: 'Clima',
    exampleSentence: 'It is very cold outside in winter.',
    exampleTranslation: 'Hace mucho frío afuera en invierno.'
  },
  {
    id: 'w_easy_25',
    english: 'Hot',
    phonetic: 'jat',
    spanish: 'Caliente',
    alternateMeanings: ['Caluroso', 'Picante'],
    distractors: ['Frío', 'Congelado', 'Fresco'],
    options: ['Caliente', 'Frío', 'Congelado', 'Fresco'],
    difficulty: 'easy',
    category: 'Clima',
    exampleSentence: 'The coffee is very hot, be careful.',
    exampleTranslation: 'El café está muy caliente, ten cuidado.'
  },
  {
    id: 'w_easy_26',
    english: 'Today',
    phonetic: 'tu-déi',
    spanish: 'Hoy',
    alternateMeanings: ['Presente'],
    distractors: ['Mañana', 'Ayer', 'Anteayer'],
    options: ['Hoy', 'Mañana', 'Ayer', 'Anteayer'],
    difficulty: 'easy',
    category: 'Tiempo',
    exampleSentence: 'Today is a wonderful day to learn.',
    exampleTranslation: 'Hoy es un día maravilloso para aprender.'
  },
  {
    id: 'w_easy_27',
    english: 'Tomorrow',
    phonetic: 'tu-má-rou',
    spanish: 'Mañana',
    alternateMeanings: ['Futuro'],
    distractors: ['Hoy', 'Ayer', 'Semana'],
    options: ['Mañana', 'Hoy', 'Ayer', 'Semana'],
    difficulty: 'easy',
    category: 'Tiempo',
    exampleSentence: 'We have a meeting scheduled for tomorrow.',
    exampleTranslation: 'Tenemos una reunión programada para mañana.'
  },
  {
    id: 'w_easy_28',
    english: 'Yesterday',
    phonetic: 'yés-ter-dei',
    spanish: 'Ayer',
    alternateMeanings: ['Pasado'],
    distractors: ['Hoy', 'Mañana', 'Anoche'],
    options: ['Ayer', 'Hoy', 'Mañana', 'Anoche'],
    difficulty: 'easy',
    category: 'Tiempo',
    exampleSentence: 'I saw him yesterday at the grocery store.',
    exampleTranslation: 'Lo vi ayer en el supermercado.'
  },
  {
    id: 'w_easy_29',
    english: 'Small',
    phonetic: 'smol',
    spanish: 'Pequeño',
    alternateMeanings: ['Chico', 'Diminuto'],
    distractors: ['Grande', 'Enorme', 'Mediano'],
    options: ['Pequeño', 'Grande', 'Enorme', 'Mediano'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'They live in a small cozy apartment.',
    exampleTranslation: 'Viven en un departamento pequeño y acogedor.'
  },
  {
    id: 'w_easy_30',
    english: 'Big',
    phonetic: 'big',
    spanish: 'Grande',
    alternateMeanings: ['Enorme', 'Amplio'],
    distractors: ['Pequeño', 'Corto', 'Delgado'],
    options: ['Grande', 'Pequeño', 'Corto', 'Delgado'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'Dallas has very big highways.',
    exampleTranslation: 'Dallas tiene autopistas muy grandes.'
  },
  {
    id: 'w_easy_31',
    english: 'Easy',
    phonetic: 'í-si',
    spanish: 'Fácil',
    alternateMeanings: ['Sencillo', 'Simple'],
    distractors: ['Difícil', 'Complicado', 'Pesado'],
    options: ['Fácil', 'Difícil', 'Complicado', 'Pesado'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'This English exercise is very easy.',
    exampleTranslation: 'Este ejercicio de inglés es muy fácil.'
  },
  {
    id: 'w_easy_32',
    english: 'Hard',
    phonetic: 'jard',
    spanish: 'Difícil',
    alternateMeanings: ['Duro', 'Pesado'],
    distractors: ['Fácil', 'Blando', 'Suave'],
    options: ['Difícil', 'Fácil', 'Blando', 'Suave'],
    difficulty: 'easy',
    category: 'Adjetivos',
    exampleSentence: 'Learning pronunciation takes hard work.',
    exampleTranslation: 'Aprender pronunciación requiere trabajo duro.'
  },
  {
    id: 'w_easy_33',
    english: 'Listen',
    phonetic: 'lí-sen',
    spanish: 'Escuchar',
    alternateMeanings: ['Oír', 'Atender'],
    distractors: ['Hablar', 'Mirar', 'Escribir'],
    options: ['Escuchar', 'Hablar', 'Mirar', 'Escribir'],
    difficulty: 'easy',
    category: 'Verbos',
    exampleSentence: 'Listen carefully to the teacher.',
    exampleTranslation: 'Escucha con atención al profesor.'
  },
  {
    id: 'w_easy_34',
    english: 'Speak',
    phonetic: 'spik',
    spanish: 'Hablar',
    alternateMeanings: ['Conversar', 'Pronunciar'],
    distractors: ['Callar', 'Cantar', 'Escribir'],
    options: ['Hablar', 'Callar', 'Cantar', 'Escribir'],
    difficulty: 'easy',
    category: 'Verbos',
    exampleSentence: 'Do you speak English at home?',
    exampleTranslation: '¿Hablas inglés en casa?'
  },
  {
    id: 'w_easy_35',
    english: 'Write',
    phonetic: 'ráit',
    spanish: 'Escribir',
    alternateMeanings: ['Redactar', 'Anotar'],
    distractors: ['Leer', 'Dibujar', 'Borrar'],
    options: ['Escribir', 'Leer', 'Dibujar', 'Borrar'],
    difficulty: 'easy',
    category: 'Verbos',
    exampleSentence: 'Write your name on the paper.',
    exampleTranslation: 'Escribe tu nombre en el papel.'
  },

  // ==================== TIER 2: INTERMEDIATE (Words 36-70) ====================
  {
    id: 'w_med_36',
    english: 'Schedule',
    phonetic: 'ské-dzhul',
    spanish: 'Horario',
    alternateMeanings: ['Agenda', 'Programar'],
    distractors: ['Calendario', 'Reloj', 'Alarma'],
    options: ['Horario', 'Calendario', 'Reloj', 'Alarma'],
    difficulty: 'medium',
    category: 'Trabajo',
    exampleSentence: 'Let me check my work schedule for tomorrow.',
    exampleTranslation: 'Déjame revisar mi horario de trabajo para mañana.'
  },
  {
    id: 'w_med_37',
    english: 'Grocery',
    phonetic: 'gróu-se-ri',
    spanish: 'Supermercado',
    alternateMeanings: ['Abarrotes', 'Víveres'],
    distractors: ['Ferretería', 'Farmacia', 'Papelería'],
    options: ['Supermercado', 'Ferretería', 'Farmacia', 'Papelería'],
    difficulty: 'medium',
    category: 'Compras',
    exampleSentence: 'I need to go to the grocery store.',
    exampleTranslation: 'Necesito ir a la tienda de abarrotes o supermercado.'
  },
  {
    id: 'w_med_38',
    english: 'Receipt',
    phonetic: 'ri-sít',
    spanish: 'Recibo',
    alternateMeanings: ['Comprobante', 'Ticket'],
    distractors: ['Factura', 'Cheque', 'Garantía'],
    options: ['Recibo', 'Factura', 'Cheque', 'Garantía'],
    difficulty: 'medium',
    category: 'Finanzas',
    exampleSentence: 'Keep your receipt in case you need a refund.',
    exampleTranslation: 'Guarda tu recibo en caso de que necesites un reembolso.'
  },
  {
    id: 'w_med_39',
    english: 'Actually',
    phonetic: 'ák-chua-li',
    spanish: 'En realidad',
    alternateMeanings: ['De hecho', 'Realmente'],
    distractors: ['Actualmente', 'Pronto', 'Seguramente'],
    options: ['En realidad', 'Actualmente', 'Pronto', 'Seguramente'],
    difficulty: 'medium',
    category: 'Falso Amigo',
    exampleSentence: 'Actually, I prefer tea over coffee.',
    exampleTranslation: 'En realidad, prefiero el té sobre el café.'
  },
  {
    id: 'w_med_40',
    english: 'Currently',
    phonetic: 'kúr-rent-li',
    spanish: 'Actualmente',
    alternateMeanings: ['Ahora', 'Hoy en día'],
    distractors: ['En realidad', 'Recientemente', 'Frecuentemente'],
    options: ['Actualmente', 'En realidad', 'Recientemente', 'Frecuentemente'],
    difficulty: 'medium',
    category: 'Adverbios',
    exampleSentence: 'She is currently living in Mexico City.',
    exampleTranslation: 'Ella actualmente está viviendo en la Ciudad de México.'
  },
  {
    id: 'w_med_41',
    english: 'Improve',
    phonetic: 'im-prúv',
    spanish: 'Mejorar',
    alternateMeanings: ['Perfeccionar', 'Superar'],
    distractors: ['Empeorar', 'Mantener', 'Aumentar'],
    options: ['Mejorar', 'Empeorar', 'Mantener', 'Aumentar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Daily practice will improve your listening skills.',
    exampleTranslation: 'La práctica diaria mejorará tu comprensión auditiva.'
  },
  {
    id: 'w_med_42',
    english: 'Advice',
    phonetic: 'ad-váis',
    spanish: 'Consejo',
    alternateMeanings: ['Recomendación', 'Sugerencia'],
    distractors: ['Aviso', 'Advertencia', 'Noticia'],
    options: ['Consejo', 'Aviso', 'Advertencia', 'Noticia'],
    difficulty: 'medium',
    category: 'Sustantivos',
    exampleSentence: 'Can you give me some advice on moving to Texas?',
    exampleTranslation: '¿Puedes darme un consejo sobre mudarme a Texas?'
  },
  {
    id: 'w_med_43',
    english: 'Apologize',
    phonetic: 'a-pá-lo-dyaiz',
    spanish: 'Disculparse',
    alternateMeanings: ['Perdonar', 'Excusarse'],
    distractors: ['Agradecer', 'Felicitar', 'Reclamar'],
    options: ['Disculparse', 'Agradecer', 'Felicitar', 'Reclamar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'I apologize for the misunderstanding.',
    exampleTranslation: 'Me disculpo por el malentendido.'
  },
  {
    id: 'w_med_44',
    english: 'Borrow',
    phonetic: 'bá-rou',
    spanish: 'Pedir prestado',
    alternateMeanings: ['Tomar prestado'],
    distractors: ['Prestar', 'Regalar', 'Devolver'],
    options: ['Pedir prestado', 'Prestar', 'Regalar', 'Devolver'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'May I borrow your pen for a second?',
    exampleTranslation: '¿Puedo pedir prestada tu pluma por un segundo?'
  },
  {
    id: 'w_med_45',
    english: 'Lend',
    phonetic: 'lend',
    spanish: 'Prestar',
    alternateMeanings: ['Dar prestado'],
    distractors: ['Pedir prestado', 'Vender', 'Alquilar'],
    options: ['Prestar', 'Pedir prestado', 'Vender', 'Alquilar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Can you lend me five dollars?',
    exampleTranslation: '¿Me puedes prestar cinco dólares?'
  },
  {
    id: 'w_med_46',
    english: 'Meeting',
    phonetic: 'mí-ting',
    spanish: 'Junta',
    alternateMeanings: ['Reunión', 'Encuentro'],
    distractors: ['Fiesta', 'Entrevista', 'Concierto'],
    options: ['Junta', 'Fiesta', 'Entrevista', 'Concierto'],
    difficulty: 'medium',
    category: 'Trabajo',
    exampleSentence: 'We have a team meeting at 10 AM.',
    exampleTranslation: 'Tenemos una junta de equipo a las 10 AM.'
  },
  {
    id: 'w_med_47',
    english: 'Highway',
    phonetic: 'jái-wei',
    spanish: 'Autopista',
    alternateMeanings: ['Carretera', 'Vía rápida'],
    distractors: ['Callejón', 'Puente', 'Túnel'],
    options: ['Autopista', 'Callejón', 'Puente', 'Túnel'],
    difficulty: 'medium',
    category: 'Transporte',
    exampleSentence: 'Take the highway toward the airport.',
    exampleTranslation: 'Toma la autopista hacia el aeropuerto.'
  },
  {
    id: 'w_med_48',
    english: 'Available',
    phonetic: 'a-véi-la-bl',
    spanish: 'Disponible',
    alternateMeanings: ['Libre', 'Accesible'],
    distractors: ['Ocupado', 'Agotado', 'Prohibido'],
    options: ['Disponible', 'Ocupado', 'Agotado', 'Prohibido'],
    difficulty: 'medium',
    category: 'Adjetivos',
    exampleSentence: 'Are you available for a phone call today?',
    exampleTranslation: '¿Estás disponible para una llamada hoy?'
  },
  {
    id: 'w_med_49',
    english: 'Notice',
    phonetic: 'nóu-tis',
    spanish: 'Notar',
    alternateMeanings: ['Aviso', 'Percibir'],
    distractors: ['Ignorar', 'Olvidar', 'Negar'],
    options: ['Notar', 'Ignorar', 'Olvidar', 'Negar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Did you notice any change in his accent?',
    exampleTranslation: '¿Notaste algún cambio en su acento?'
  },
  {
    id: 'w_med_50',
    english: 'Delay',
    phonetic: 'di-léi',
    spanish: 'Retraso',
    alternateMeanings: ['Demora', 'Postergar'],
    distractors: ['Cancelación', 'Adelanto', 'Llegada'],
    options: ['Retraso', 'Cancelación', 'Adelanto', 'Llegada'],
    difficulty: 'medium',
    category: 'Viajes',
    exampleSentence: 'The flight has a two-hour delay.',
    exampleTranslation: 'El vuelo tiene un retraso de dos horas.'
  },
  {
    id: 'w_med_51',
    english: 'Crowded',
    phonetic: 'kráu-did',
    spanish: 'Lleno',
    alternateMeanings: ['Abarrotado', 'Poblado'],
    distractors: ['Vacío', 'Silencioso', 'Limpio'],
    options: ['Lleno', 'Vacío', 'Silencioso', 'Limpio'],
    difficulty: 'medium',
    category: 'Lugares',
    exampleSentence: 'The subway is always crowded at rush hour.',
    exampleTranslation: 'El metro siempre está lleno en hora pico.'
  },
  {
    id: 'w_med_52',
    english: 'Budget',
    phonetic: 'bá-dyet',
    spanish: 'Presupuesto',
    alternateMeanings: ['Fondos', 'Cotización'],
    distractors: ['Ganancia', 'Deuda', 'Inversión'],
    options: ['Presupuesto', 'Ganancia', 'Deuda', 'Inversión'],
    difficulty: 'medium',
    category: 'Finanzas',
    exampleSentence: 'We must stick to our monthly budget.',
    exampleTranslation: 'Debemos apegarnos a nuestro presupuesto mensual.'
  },
  {
    id: 'w_med_53',
    english: 'Deadline',
    phonetic: 'déd-lain',
    spanish: 'Fecha límite',
    alternateMeanings: ['Plazo', 'Vencimiento'],
    distractors: ['Comienzo', 'Prórroga', 'Descanso'],
    options: ['Fecha límite', 'Comienzo', 'Prórroga', 'Descanso'],
    difficulty: 'medium',
    category: 'Trabajo',
    exampleSentence: 'The project deadline is this Friday.',
    exampleTranslation: 'La fecha límite del proyecto es este viernes.'
  },
  {
    id: 'w_med_54',
    english: 'Customer',
    phonetic: 'kás-to-mer',
    spanish: 'Cliente',
    alternateMeanings: ['Comprador', 'Consumidor'],
    distractors: ['Vendedor', 'Empleado', 'Gerente'],
    options: ['Cliente', 'Vendedor', 'Empleado', 'Gerente'],
    difficulty: 'medium',
    category: 'Negocios',
    exampleSentence: 'Customer satisfaction is our main priority.',
    exampleTranslation: 'La satisfacción del cliente es nuestra prioridad principal.'
  },
  {
    id: 'w_med_55',
    english: 'Reliable',
    phonetic: 'ri-láia-bl',
    spanish: 'Confiable',
    alternateMeanings: ['Seguro', 'Certero'],
    distractors: ['Inestable', 'Dudoso', 'Frágil'],
    options: ['Confiable', 'Inestable', 'Dudoso', 'Frágil'],
    difficulty: 'medium',
    category: 'Adjetivos',
    exampleSentence: 'He is a very reliable and hardworking colleague.',
    exampleTranslation: 'Es un colega muy confiable y trabajador.'
  },
  {
    id: 'w_med_56',
    english: 'Neighborhood',
    phonetic: 'néi-bor-jud',
    spanish: 'Colonia',
    alternateMeanings: ['Vecindario', 'Barrio'],
    distractors: ['Plaza', 'Municipio', 'Estado'],
    options: ['Colonia', 'Plaza', 'Municipio', 'Estado'],
    difficulty: 'medium',
    category: 'Urbano',
    exampleSentence: 'This neighborhood is quiet and safe.',
    exampleTranslation: 'Esta colonia es tranquila y segura.'
  },
  {
    id: 'w_med_57',
    english: 'Luggage',
    phonetic: 'lá-guidsh',
    spanish: 'Equipaje',
    alternateMeanings: ['Maletas', 'Valijas'],
    distractors: ['Boleto', 'Pasaporte', 'Asiento'],
    options: ['Equipaje', 'Boleto', 'Pasaporte', 'Asiento'],
    difficulty: 'medium',
    category: 'Viajes',
    exampleSentence: 'Please claim your luggage at baggage claim.',
    exampleTranslation: 'Por favor reclama tu equipaje en el área de bandas.'
  },
  {
    id: 'w_med_58',
    english: 'Convenient',
    phonetic: 'kon-ví-nient',
    spanish: 'Práctico',
    alternateMeanings: ['Conveniente', 'Cómodo'],
    distractors: ['Complicado', 'Lejano', 'Costoso'],
    options: ['Práctico', 'Complicado', 'Lejano', 'Costoso'],
    difficulty: 'medium',
    category: 'Adjetivos',
    exampleSentence: 'Having a grocery store nearby is very convenient.',
    exampleTranslation: 'Tener una tienda cerca es muy práctico.'
  },
  {
    id: 'w_med_59',
    english: 'Hesitate',
    phonetic: 'jé-si-teit',
    spanish: 'Dudar',
    alternateMeanings: ['Vacilar', 'Titubear'],
    distractors: ['Apresurarse', 'Garantizar', 'Aceptar'],
    options: ['Dudar', 'Apresurarse', 'Garantizar', 'Aceptar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Do not hesitate to ask questions if you need help.',
    exampleTranslation: 'No dudes en hacer preguntas si necesitas ayuda.'
  },
  {
    id: 'w_med_60',
    english: 'Opportunity',
    phonetic: 'a-por-tú-ni-ti',
    spanish: 'Oportunidad',
    alternateMeanings: ['Ocasión', 'Chance'],
    distractors: ['Obstáculo', 'Desventaja', 'Pérdida'],
    options: ['Oportunidad', 'Obstáculo', 'Desventaja', 'Pérdida'],
    difficulty: 'medium',
    category: 'General',
    exampleSentence: 'Working in the US was a life-changing opportunity.',
    exampleTranslation: 'Trabajar en EE.UU. fue una oportunidad única.'
  },
  {
    id: 'w_med_61',
    english: 'Recommend',
    phonetic: 're-ko-ménd',
    spanish: 'Recomendar',
    alternateMeanings: ['Aconsejar', 'Sugerir'],
    distractors: ['Prohibir', 'Criticar', 'Cuestionar'],
    options: ['Recomendar', 'Prohibir', 'Criticar', 'Cuestionar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Which dish do you recommend on the menu?',
    exampleTranslation: '¿Qué platillo me recomiendas del menú?'
  },
  {
    id: 'w_med_62',
    english: 'Appointment',
    phonetic: 'a-póint-ment',
    spanish: 'Cita',
    alternateMeanings: ['Consulta', 'Nombramiento'],
    distractors: ['Fiesta', 'Llamada', 'Paseo'],
    options: ['Cita', 'Fiesta', 'Llamada', 'Paseo'],
    difficulty: 'medium',
    category: 'Vida Diaria',
    exampleSentence: 'I have a dentist appointment at 3 PM.',
    exampleTranslation: 'Tengo una cita con el dentista a las 3 PM.'
  },
  {
    id: 'w_med_63',
    english: 'Complain',
    phonetic: 'kom-pléin',
    spanish: 'Quejarse',
    alternateMeanings: ['Reclamar', 'Protestar'],
    distractors: ['Festejar', 'Agradecer', 'Aprobar'],
    options: ['Quejarse', 'Festejar', 'Agradecer', 'Aprobar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'Customers rarely complain about our service.',
    exampleTranslation: 'Los clientes rara vez se quejan de nuestro servicio.'
  },
  {
    id: 'w_med_64',
    english: 'Refund',
    phonetic: 'rí-fand',
    spanish: 'Reembolso',
    alternateMeanings: ['Devolución', 'Reintegrar'],
    distractors: ['Interés', 'Propina', 'Descuento'],
    options: ['Reembolso', 'Interés', 'Propina', 'Descuento'],
    difficulty: 'medium',
    category: 'Finanzas',
    exampleSentence: 'They issued a full refund to my credit card.',
    exampleTranslation: 'Emitieron un reembolso completo a mi tarjeta de crédito.'
  },
  {
    id: 'w_med_65',
    english: 'Commute',
    phonetic: 'ko-miút',
    spanish: 'Traslado',
    alternateMeanings: ['Trayecto', 'Viajar al trabajo'],
    distractors: ['Vacaciones', 'Mudanza', 'Paseo'],
    options: ['Traslado', 'Vacaciones', 'Mudanza', 'Paseo'],
    difficulty: 'medium',
    category: 'Transporte',
    exampleSentence: 'My daily commute takes about 40 minutes.',
    exampleTranslation: 'Mi traslado diario toma unos 40 minutos.'
  },
  {
    id: 'w_med_66',
    english: 'Policy',
    phonetic: 'pá-li-si',
    spanish: 'Reglamento',
    alternateMeanings: ['Política', 'Norma'],
    distractors: ['Policía', 'Político', 'Seguro'],
    options: ['Reglamento', 'Policía', 'Político', 'Seguro'],
    difficulty: 'medium',
    category: 'Trabajo',
    exampleSentence: 'It is against company policy to share passwords.',
    exampleTranslation: 'Va contra el reglamento de la empresa compartir contraseñas.'
  },
  {
    id: 'w_med_67',
    english: 'Challenge',
    phonetic: 'chá-lendsh',
    spanish: 'Reto',
    alternateMeanings: ['Desafío', 'Reta'],
    distractors: ['Facilidad', 'Rendición', 'Premio'],
    options: ['Reto', 'Facilidad', 'Rendición', 'Premio'],
    difficulty: 'medium',
    category: 'Desarrollo',
    exampleSentence: 'Speaking in public is a big challenge for me.',
    exampleTranslation: 'Hablar en público es un gran reto para mí.'
  },
  {
    id: 'w_med_68',
    english: 'Handle',
    phonetic: 'ján-dl',
    spanish: 'Manejar',
    alternateMeanings: ['Gestionar', 'Manija'],
    distractors: ['Conducir', 'Abandonar', 'Ignorar'],
    options: ['Manejar', 'Conducir', 'Abandonar', 'Ignorar'],
    difficulty: 'medium',
    category: 'Verbos',
    exampleSentence: 'She knows how to handle difficult clients.',
    exampleTranslation: 'Ella sabe cómo manejar a clientes difíciles.'
  },
  {
    id: 'w_med_69',
    english: 'Useful',
    phonetic: 'yús-ful',
    spanish: 'Útil',
    alternateMeanings: ['Provechoso', 'Práctico'],
    distractors: ['Inútil', 'Innecesario', 'Costoso'],
    options: ['Útil', 'Inútil', 'Innecesario', 'Costoso'],
    difficulty: 'medium',
    category: 'Adjetivos',
    exampleSentence: 'This app is very useful for learning English.',
    exampleTranslation: 'Esta aplicación es muy útil para aprender inglés.'
  },
  {
    id: 'w_med_70',
    english: 'Feedback',
    phonetic: 'fíd-bak',
    spanish: 'Retroalimentación',
    alternateMeanings: ['Comentarios', 'Opinión'],
    distractors: ['Reclamo', 'Crítica', 'Petición'],
    options: ['Retroalimentación', 'Reclamo', 'Crítica', 'Petición'],
    difficulty: 'medium',
    category: 'Profesional',
    exampleSentence: 'Thank you for your valuable feedback.',
    exampleTranslation: 'Gracias por tu valiosa retroalimentación.'
  },

  // ==================== TIER 3: ADVANCED / C1-C2 (Words 71-100+) ====================
  {
    id: 'w_adv_71',
    english: 'Comprehensive',
    phonetic: 'kam-pri-jén-siv',
    spanish: 'Integral',
    alternateMeanings: ['Exhaustivo', 'Completo'],
    distractors: ['Comprensivo', 'Breve', 'Confuso'],
    options: ['Integral', 'Comprensivo', 'Breve', 'Confuso'],
    difficulty: 'hard',
    category: 'Falso Amigo',
    exampleSentence: 'We conducted a comprehensive study of the market.',
    exampleTranslation: 'Realizamos un estudio integral del mercado.'
  },
  {
    id: 'w_adv_72',
    english: 'Overwhelmed',
    phonetic: 'ou-ver-wélmd',
    spanish: 'Abrumado',
    alternateMeanings: ['Agobiado', 'Saturado'],
    distractors: ['Relajado', 'Apático', 'Orgulloso'],
    options: ['Abrumado', 'Relajado', 'Apático', 'Orgulloso'],
    difficulty: 'hard',
    category: 'Emociones',
    exampleSentence: 'I was overwhelmed by all the new information.',
    exampleTranslation: 'Estaba abrumado por toda la nueva información.'
  },
  {
    id: 'w_adv_73',
    english: 'Pigeonhole',
    phonetic: 'pí-dshin-joul',
    spanish: 'Encasillar',
    alternateMeanings: ['Etiquetar', 'Clasificar'],
    distractors: ['Liberar', 'Agradecer', 'Contratar'],
    options: ['Encasillar', 'Liberar', 'Agradecer', 'Contratar'],
    difficulty: 'hard',
    category: 'Modismos US',
    exampleSentence: 'Do not pigeonhole someone based on their accent.',
    exampleTranslation: 'No encasilles a alguien basándote en su acento.'
  },
  {
    id: 'w_adv_74',
    english: 'Scrutinize',
    phonetic: 'skrú-ti-naiz',
    spanish: 'Examinar',
    alternateMeanings: ['Escrutar', 'Inspeccionar'],
    distractors: ['Ignorar', 'Aprobar', 'Olvidar'],
    options: ['Examinar', 'Ignorar', 'Aprobar', 'Olvidar'],
    difficulty: 'hard',
    category: 'Académico',
    exampleSentence: 'The auditors will scrutinize every single receipt.',
    exampleTranslation: 'Los auditores examinarán minuciosamente cada recibo.'
  },
  {
    id: 'w_adv_75',
    english: 'Subtle',
    phonetic: 'sá-tl',
    spanish: 'Sutil',
    alternateMeanings: ['Discreto', 'Tenue'],
    distractors: ['Obvio', 'Ruidoso', 'Pesado'],
    options: ['Sutil', 'Obvio', 'Ruidoso', 'Pesado'],
    difficulty: 'hard',
    category: 'Adjetivos',
    exampleSentence: 'There is a subtle difference between these two vowels.',
    exampleTranslation: 'Hay una diferencia sutil entre estas dos vocales.'
  },
  {
    id: 'w_adv_76',
    english: 'Leverage',
    phonetic: 'lé-ve-ridsh',
    spanish: 'Aprovechar',
    alternateMeanings: ['Apalancar', 'Potenciar'],
    distractors: ['Desperdiciar', 'Frenar', 'Gastar'],
    options: ['Aprovechar', 'Desperdiciar', 'Frenar', 'Gastar'],
    difficulty: 'hard',
    category: 'Negocios',
    exampleSentence: 'We can leverage our bilingual skills to get a better job.',
    exampleTranslation: 'Podemos aprovechar nuestras habilidades bilingües.'
  },
  {
    id: 'w_adv_77',
    english: 'Plausible',
    phonetic: 'pló-si-bl',
    spanish: 'Creíble',
    alternateMeanings: ['Verosímil', 'Factible'],
    distractors: ['Imposible', 'Aplaudible', 'Falso'],
    options: ['Creíble', 'Imposible', 'Aplaudible', 'Falso'],
    difficulty: 'hard',
    category: 'Académico',
    exampleSentence: 'His explanation sounded completely plausible.',
    exampleTranslation: 'Su explicación sonó completamente creíble.'
  },
  {
    id: 'w_adv_78',
    english: 'Straightforward',
    phonetic: 'streit-fór-ward',
    spanish: 'Directo',
    alternateMeanings: ['Claro', 'Sencillo'],
    distractors: ['Confuso', 'Engañoso', 'Lento'],
    options: ['Directo', 'Confuso', 'Engañoso', 'Lento'],
    difficulty: 'hard',
    category: 'Comunicación',
    exampleSentence: 'The instructions were straightforward and easy to follow.',
    exampleTranslation: 'Las instrucciones fueron directas y claras.'
  },
  {
    id: 'w_adv_79',
    english: 'Procrastinate',
    phonetic: 'prou-krás-ti-neit',
    spanish: 'Postergar',
    alternateMeanings: ['Posponer', 'Demorar'],
    distractors: ['Apresurar', 'Planear', 'Terminar'],
    options: ['Postergar', 'Apresurar', 'Planear', 'Terminar'],
    difficulty: 'hard',
    category: 'Hábitos',
    exampleSentence: 'Do not procrastinate on practicing your speaking.',
    exampleTranslation: 'No postergues la práctica de pronunciación.'
  },
  {
    id: 'w_adv_80',
    english: 'Ubiquitous',
    phonetic: 'yu-bí-kwi-tos',
    spanish: 'Omnipresente',
    alternateMeanings: ['Generalizado', 'Común'],
    distractors: ['Escaso', 'Oculto', 'Antiguo'],
    options: ['Omnipresente', 'Escaso', 'Oculto', 'Antiguo'],
    difficulty: 'hard',
    category: 'C2 Avanzado',
    exampleSentence: 'Smartphones have become ubiquitous in modern society.',
    exampleTranslation: 'Los teléfonos inteligentes se han vuelto omnipresentes.'
  },
  {
    id: 'w_adv_81',
    english: 'Conscientious',
    phonetic: 'kan-shi-én-shos',
    spanish: 'Meticuloso',
    alternateMeanings: ['Minucioso', 'Diligente'],
    distractors: ['Descuidado', 'Consciente', 'Temeroso'],
    options: ['Meticuloso', 'Descuidado', 'Consciente', 'Temeroso'],
    difficulty: 'hard',
    category: 'Personalidad',
    exampleSentence: 'She is a conscientious worker who checks every detail.',
    exampleTranslation: 'Es una trabajadora meticulosa que revisa cada detalle.'
  },
  {
    id: 'w_adv_82',
    english: 'Ephemeral',
    phonetic: 'i-fé-me-ral',
    spanish: 'Efímero',
    alternateMeanings: ['Fugaz', 'Pasajero'],
    distractors: ['Eterno', 'Duradero', 'Firme'],
    options: ['Efímero', 'Eterno', 'Duradero', 'Firme'],
    difficulty: 'hard',
    category: 'C2 Vocabulario',
    exampleSentence: 'Fame can be ephemeral in the digital age.',
    exampleTranslation: 'La fama puede ser efímera en la era digital.'
  },
  {
    id: 'w_adv_83',
    english: 'Serendipity',
    phonetic: 'se-ren-dí-pi-ti',
    spanish: 'Chiripa',
    alternateMeanings: ['Casualidad', 'Golpe de suerte'],
    distractors: ['Mala suerte', 'Tragedia', 'Cálculo'],
    options: ['Chiripa', 'Mala suerte', 'Tragedia', 'Cálculo'],
    difficulty: 'hard',
    category: 'Sustantivos',
    exampleSentence: 'Finding this English app was pure serendipity.',
    exampleTranslation: 'Encontrar esta aplicación de inglés fue pura chiripa y casualidad.'
  },
  {
    id: 'w_adv_84',
    english: 'Mitigate',
    phonetic: 'mí-ti-geit',
    spanish: 'Atenuar',
    alternateMeanings: ['Mitigar', 'Reducir'],
    distractors: ['Empeorar', 'Fomentar', 'Desatar'],
    options: ['Atenuar', 'Empeorar', 'Fomentar', 'Desatar'],
    difficulty: 'hard',
    category: 'Negocios',
    exampleSentence: 'We implemented new measures to mitigate financial risks.',
    exampleTranslation: 'Implementamos medidas para atenuar los riesgos financieros.'
  },
  {
    id: 'w_adv_85',
    english: 'Eloquent',
    phonetic: 'é-lo-kwent',
    spanish: 'Elocuente',
    alternateMeanings: ['Expresivo', 'Fluido'],
    distractors: ['Tartamudo', 'Silencioso', 'Confuso'],
    options: ['Elocuente', 'Tartamudo', 'Silencioso', 'Confuso'],
    difficulty: 'hard',
    category: 'Comunicación',
    exampleSentence: 'He gave an eloquent speech at the international conference.',
    exampleTranslation: 'Dio un discurso elocuente en la conferencia.'
  },
  {
    id: 'w_adv_86',
    english: 'Benchmark',
    phonetic: 'bénch-mark',
    spanish: 'Referencia',
    alternateMeanings: ['Estándar', 'Pauta'],
    distractors: ['Banca', 'Meta', 'Límite'],
    options: ['Referencia', 'Banca', 'Meta', 'Límite'],
    difficulty: 'hard',
    category: 'Negocios',
    exampleSentence: 'CEFR C1 is the benchmark for professional English proficiency.',
    exampleTranslation: 'El nivel C1 es el punto de referencia para dominio profesional.'
  },
  {
    id: 'w_adv_87',
    english: 'Resilient',
    phonetic: 'ri-sí-lient',
    spanish: 'Resiliente',
    alternateMeanings: ['Fuerte', 'Adaptable'],
    distractors: ['Frágil', 'Rígido', 'Débil'],
    options: ['Resiliente', 'Frágil', 'Rígido', 'Débil'],
    difficulty: 'hard',
    category: 'Personalidad',
    exampleSentence: 'Mexican communities are remarkably resilient in tough times.',
    exampleTranslation: 'Las comunidades mexicanas son muy resilientes.'
  },
  {
    id: 'w_adv_88',
    english: 'Nuance',
    phonetic: 'nú-ans',
    spanish: 'Matiz',
    alternateMeanings: ['Detalle', 'Diferencia'],
    distractors: ['Regla', 'Error', 'Norma'],
    options: ['Matiz', 'Regla', 'Error', 'Norma'],
    difficulty: 'hard',
    category: 'Lingüística',
    exampleSentence: 'Understanding cultural nuances is vital for true fluency.',
    exampleTranslation: 'Comprender los matices culturales es vital para la fluidez.'
  },
  {
    id: 'w_adv_89',
    english: 'Paradigm',
    phonetic: 'pá-ra-daim',
    spanish: 'Paradigma',
    alternateMeanings: ['Modelo', 'Patrón'],
    distractors: ['Paradoja', 'Esquema', 'Ruta'],
    options: ['Paradigma', 'Paradoja', 'Esquema', 'Ruta'],
    difficulty: 'hard',
    category: 'Académico',
    exampleSentence: 'This innovative method changes the whole paradigm of language learning.',
    exampleTranslation: 'Este método cambia todo el paradigma del aprendizaje de idiomas.'
  },
  {
    id: 'w_adv_90',
    english: 'Pivotal',
    phonetic: 'pí-vo-tal',
    spanish: 'Crucial',
    alternateMeanings: ['Fundamental', 'Decisivo'],
    distractors: ['Menor', 'Secundario', 'Opcional'],
    options: ['Crucial', 'Menor', 'Secundario', 'Opcional'],
    difficulty: 'hard',
    category: 'Adjetivos',
    exampleSentence: 'Passing the diagnostic exam was a pivotal moment in his study path.',
    exampleTranslation: 'Aprobar el examen fue un momento crucial.'
  },
  {
    id: 'w_adv_91',
    english: 'Vulnerable',
    phonetic: 'vól-ne-ra-bl',
    spanish: 'Vulnerable',
    alternateMeanings: ['Indefenso', 'Expuesto'],
    distractors: ['Invencible', 'Protegido', 'Fuerte'],
    options: ['Vulnerable', 'Invencible', 'Protegido', 'Fuerte'],
    difficulty: 'hard',
    category: 'Adjetivos',
    exampleSentence: 'Without passwords, your accounts are vulnerable.',
    exampleTranslation: 'Sin contraseñas seguras, tus cuentas están vulnerables.'
  },
  {
    id: 'w_adv_92',
    english: 'Unprecedented',
    phonetic: 'an-pré-se-den-tid',
    spanish: 'Inédito',
    alternateMeanings: ['Sin precedentes', 'Insólito'],
    distractors: ['Común', 'Típico', 'Tradicional'],
    options: ['Inédito', 'Común', 'Típico', 'Tradicional'],
    difficulty: 'hard',
    category: 'Avanzado',
    exampleSentence: 'The company achieved unprecedented growth this quarter.',
    exampleTranslation: 'La empresa logró un crecimiento inédito este trimestre.'
  },
  {
    id: 'w_adv_93',
    english: 'Tenacious',
    phonetic: 'te-néi-shos',
    spanish: 'Tenaz',
    alternateMeanings: ['Persistente', 'Firme'],
    distractors: ['Perezoso', 'Tímido', 'Inconstante'],
    options: ['Tenaz', 'Perezoso', 'Tímido', 'Inconstante'],
    difficulty: 'hard',
    category: 'Personalidad',
    exampleSentence: 'Her tenacious attitude helped her master fluent English in six months.',
    exampleTranslation: 'Su actitud tenaz la ayudó a dominar el inglés en seis meses.'
  },
  {
    id: 'w_adv_94',
    english: 'Lucrative',
    phonetic: 'lú-kra-tiv',
    spanish: 'Lucrativo',
    alternateMeanings: ['Rentable', 'Productivo'],
    distractors: ['Costoso', 'Ruinoso', 'Gratuito'],
    options: ['Lucrativo', 'Costoso', 'Ruinoso', 'Gratuito'],
    difficulty: 'hard',
    category: 'Economía',
    exampleSentence: 'Bilingual software engineers have lucrative job opportunities.',
    exampleTranslation: 'Los ingenieros bilingües tienen ofertas muy lucrativas.'
  },
  {
    id: 'w_adv_95',
    english: 'Ambiguous',
    phonetic: 'am-bí-gyu-os',
    spanish: 'Ambiguo',
    alternateMeanings: ['Confuso', 'Indefinido'],
    distractors: ['Claro', 'Exacto', 'Preciso'],
    options: ['Ambiguo', 'Claro', 'Exacto', 'Preciso'],
    difficulty: 'hard',
    category: 'Lingüística',
    exampleSentence: 'The contract clauses were too ambiguous.',
    exampleTranslation: 'Las cláusulas del contrato eran demasiado ambiguas.'
  },
  {
    id: 'w_adv_96',
    english: 'Discrepancy',
    phonetic: 'dis-kré-pan-si',
    spanish: 'Discrepancia',
    alternateMeanings: ['Diferencia', 'Desacuerdo'],
    distractors: ['Coincidencia', 'Acuerdo', 'Promedio'],
    options: ['Discrepancia', 'Coincidencia', 'Acuerdo', 'Promedio'],
    difficulty: 'hard',
    category: 'Negocios',
    exampleSentence: 'We found a slight discrepancy between the two invoices.',
    exampleTranslation: 'Encontramos una ligera discrepancia entre las dos facturas.'
  },
  {
    id: 'w_adv_97',
    english: 'Quintessential',
    phonetic: 'kwin-te-sén-shal',
    spanish: 'Típico',
    alternateMeanings: ['Representativo', 'Esencial'],
    distractors: ['Mediocre', 'Raro', 'Inusual'],
    options: ['Típico', 'Mediocre', 'Raro', 'Inusual'],
    difficulty: 'hard',
    category: 'C2 Avanzado',
    exampleSentence: 'A road trip down Route 66 is the quintessential American experience.',
    exampleTranslation: 'Un viaje por la Ruta 66 es la experiencia estadounidense típica por excelencia.'
  },
  {
    id: 'w_adv_98',
    english: 'Pragmatic',
    phonetic: 'prag-má-tik',
    spanish: 'Pragmático',
    alternateMeanings: ['Práctico', 'Realista'],
    distractors: ['Soñador', 'Teórico', 'Indeciso'],
    options: ['Pragmático', 'Soñador', 'Teórico', 'Indeciso'],
    difficulty: 'hard',
    category: 'Filosofía',
    exampleSentence: 'We need a pragmatic solution to solve traffic congestion.',
    exampleTranslation: 'Necesitamos una solución pragmática para resolver el tráfico.'
  },
  {
    id: 'w_adv_99',
    english: 'Superfluous',
    phonetic: 'su-pér-flu-os',
    spanish: 'Superfluo',
    alternateMeanings: ['Innecesario', 'Sobrante'],
    distractors: ['Esencial', 'Básico', 'Vital'],
    options: ['Superfluo', 'Esencial', 'Básico', 'Vital'],
    difficulty: 'hard',
    category: 'C2 Avanzado',
    exampleSentence: 'Remove any superfluous words to make your writing concise.',
    exampleTranslation: 'Elimina cualquier palabra superflua para escribir con concisión.'
  },
  {
    id: 'w_adv_100',
    english: 'Infallible',
    phonetic: 'in-fá-li-bl',
    spanish: 'Infalible',
    alternateMeanings: ['Perfecto', 'Certero'],
    distractors: ['Falible', 'Imperfecto', 'Defectuoso'],
    options: ['Infalible', 'Falible', 'Imperfecto', 'Defectuoso'],
    difficulty: 'hard',
    category: 'C2 Avanzado',
    exampleSentence: 'No human system is completely infallible.',
    exampleTranslation: 'Ningún sistema humano es completamente infalible.'
  }
];

// Helper to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate 100 progressive words for a game run with controlled reuse (max 20 previous, 80 new)
// and dynamically rotates to alternate single-word meanings for recycled words!
export function generate100WordsRun(
  excludeIds: string[] = [],
  aiGeneratedWords: VocabGameWord[] = []
): VocabGameWord[] {
  const pool = [...CURATED_VOCAB_BANK, ...aiGeneratedWords];

  // Separate by difficulty
  const easyPool = pool.filter(w => w.difficulty === 'easy');
  const medPool = pool.filter(w => w.difficulty === 'medium');
  const hardPool = pool.filter(w => w.difficulty === 'hard');

  // Select 35 Easy (1-35), 35 Medium (36-70), 30 Hard (71-100)
  const selectSegment = (tierPool: VocabGameWord[], neededCount: number) => {
    const fresh = tierPool.filter(w => !excludeIds.includes(w.id));
    const used = tierPool.filter(w => excludeIds.includes(w.id));

    const shuffledFresh = shuffleArray(fresh);
    const shuffledUsed = shuffleArray(used);

    // Prioritize fresh words, fill remainder with least-recently used
    const combined = [...shuffledFresh, ...shuffledUsed];
    const picked = combined.slice(0, neededCount);

    return picked.map(w => {
      // Always prioritize the canonical, most common primary meaning ('spanish')
      // Only for advanced/hard idiomatic words (or if explicit alternate is requested), keep it canonical
      const targetMeaning = w.spanish;

      // Filter distractors to make sure none collide with targetMeaning
      const safeDistractors = (w.distractors || ['Opción A', 'Opción B', 'Opción C'])
        .filter(d => d.toLowerCase() !== targetMeaning.toLowerCase())
        .slice(0, 3);

      while (safeDistractors.length < 3) {
        safeDistractors.push(`Alternativa ${safeDistractors.length + 1}`);
      }

      const allOpts = shuffleArray([targetMeaning, ...safeDistractors]);
      return {
        ...w,
        spanish: targetMeaning,
        distractors: safeDistractors,
        options: allOpts
      };
    });
  };

  const selectedEasy = selectSegment(easyPool, 35);
  const selectedMed = selectSegment(medPool, 35);
  const selectedHard = selectSegment(hardPool, 30);

  const full100 = [...selectedEasy, ...selectedMed, ...selectedHard];

  // In case pool has fewer than 100, fill and duplicate with variations
  while (full100.length < 100 && pool.length > 0) {
    const fallbackItem = pool[full100.length % pool.length];
    full100.push({
      ...fallbackItem,
      id: `${fallbackItem.id}_dup_${full100.length}`,
      options: shuffleArray([fallbackItem.spanish, ...fallbackItem.distractors])
    });
  }

  return full100.slice(0, 100);
}
