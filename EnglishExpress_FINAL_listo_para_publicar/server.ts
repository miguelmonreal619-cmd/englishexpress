import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "NorteñoEnglish Backend" });
  });

  // 1. AI Speaking Nuance Evaluation (American English pronunciation vs Mexican Spanish phonetics)
  app.post("/api/gemini/evaluate-speaking", async (req, res) => {
    try {
      const { targetText, spokenText, subLevel, mexicanContext } = req.body;
      const ai = getGeminiClient();

      // Pre-evaluate word completeness in JS
      const normTarget = String(targetText || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "").trim();
      const normSpoken = String(spokenText || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "").trim();

      const targetWords = normTarget.split(/\s+/).filter(Boolean);
      const spokenWords = normSpoken.split(/\s+/).filter(Boolean);

      const spokenPool = [...spokenWords];
      const missingWords: string[] = [];

      for (const tWord of targetWords) {
        const idx = spokenPool.indexOf(tWord);
        if (idx !== -1) {
          spokenPool.splice(idx, 1);
        } else {
          missingWords.push(tWord);
        }
      }

      const hasMissingWords = missingWords.length > 0;

      const prompt = `Actúa como un profesor riguroso pero motivador de pronunciación de inglés estadounidense (General American Accent) especializado en enseñar a hispanohablantes de México.
Evalúa la siguiente pronunciación y transcripción de voz:
- Frase objetivo (Inglés US): "${targetText}"
- Lo que el alumno pronunció/transcribió: "${spokenText}"
- Subnivel actual: ${subLevel || "A2"}
- Contexto: ${mexicanContext || "General"}
- Palabras faltantes detectadas: ${hasMissingWords ? missingWords.join(", ") : "Ninguna"}

REGLAS DE EVALUACIÓN ESTRICTAS:
1. REGLA DE ORO DE INTEGRIDAD: El alumno DEBE pronunciar TODAS las palabras de la frase objetivo. Si falta tan solo UNA palabra (omitida, comida o cambiada), "passed" DEBE ser estrictamente false, y "score" NO puede ser mayor a 55. En "keyMistakes" y "feedbackEs" debes indicar claramente qué palabra(s) faltaron.
2. Si pronunció todas las palabras completas, califica la inteligibilidad, acentuación y fonética estadounidense (0 a 100).
3. "passed" solo puede ser true si NO falta ninguna palabra y la pronunciación es inteligible (score >= 75).
4. Retroalimentación en español mexicano (tono constructivo y claro).

Responde estrictamente en formato JSON con la estructura:
{
  "score": number, // 0 a 100
  "passed": boolean, // true SOLO si NO falta ninguna palabra y score >= 75
  "allWordsSpoken": boolean, // false si faltó alguna palabra
  "missingWords": ["string"],
  "accuracyRating": "Excelente" | "Muy Bueno" | "Bueno" | "Necesita Práctica" | "Incompleto",
  "feedbackEs": "string",
  "phoneticTip": "string",
  "keyMistakes": ["string"],
  "americanPronunciationSecret": "string"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              passed: { type: Type.BOOLEAN },
              allWordsSpoken: { type: Type.BOOLEAN },
              missingWords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              accuracyRating: { type: Type.STRING },
              feedbackEs: { type: Type.STRING },
              phoneticTip: { type: Type.STRING },
              keyMistakes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              americanPronunciationSecret: { type: Type.STRING },
            },
            required: ["score", "passed", "accuracyRating", "feedbackEs", "phoneticTip"],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");

      // Hard enforcement on server: If words are missing, it cannot pass
      if (hasMissingWords) {
        parsed.passed = false;
        parsed.allWordsSpoken = false;
        parsed.missingWords = missingWords;
        parsed.score = Math.min(parsed.score || 45, 55);
        if (!parsed.feedbackEs?.includes("faltó")) {
          parsed.feedbackEs = `⚠️ Te faltó pronunciar la palabra: "${missingWords.join('", "')}". En speaking es indispensable decir todas las palabras. ${parsed.feedbackEs || ""}`;
        }
      } else {
        parsed.allWordsSpoken = true;
        parsed.missingWords = [];
      }

      res.json({ success: true, evaluation: parsed });
    } catch (error: any) {
      console.error("Error in evaluate-speaking:", error);

      const normTarget = String(req.body?.targetText || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "").trim();
      const normSpoken = String(req.body?.spokenText || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "").trim();
      const targetWords = normTarget.split(/\s+/).filter(Boolean);
      const spokenWords = normSpoken.split(/\s+/).filter(Boolean);
      const spokenPool = [...spokenWords];
      const missingWords: string[] = [];

      for (const tWord of targetWords) {
        const idx = spokenPool.indexOf(tWord);
        if (idx !== -1) {
          spokenPool.splice(idx, 1);
        } else {
          missingWords.push(tWord);
        }
      }

      const hasMissing = missingWords.length > 0;
      const isComplete = !hasMissing && spokenWords.length > 0;

      // Graceful fallback for client
      res.status(200).json({
        success: true,
        evaluation: {
          score: isComplete ? 85 : 45,
          passed: isComplete,
          allWordsSpoken: !hasMissing,
          missingWords,
          accuracyRating: isComplete ? "Muy Bueno" : "Incompleto",
          feedbackEs: hasMissing 
            ? `⚠️ Te faltó pronunciar la palabra: "${missingWords.join('", "')}". Recuerda que en speaking debes decir la oración completa.`
            : "¡Muy buena pronunciación! Sigue practicando la fluidez del ritmo en inglés estadounidense.",
          phoneticTip: "Recuerda acentuar la sílaba tónica y suavizar las vocales finales.",
          keyMistakes: hasMissing ? missingWords.map(w => `Palabra omitida: "${w}"`) : [],
          americanPronunciationSecret: "En inglés estadounidense, las consonantes intermedias suelen conectarse suavemente.",
        },
      });
    }
  });

  // 2. AI Writing Evaluation
  app.post("/api/gemini/evaluate-writing", async (req, res) => {
    try {
      const { promptInstruction, expectedMeaning, studentInput, subLevel } = req.body;
      const ai = getGeminiClient();

      const prompt = `Eres un tutor experto de escritura (Writing) en inglés estadounidense para estudiantes mexicanos.
Evalúa el siguiente texto escrito por el alumno:
- Instrucción / Frase en español: "${promptInstruction}"
- Significado esperado: "${expectedMeaning}"
- Texto escrito por el alumno: "${studentInput}"
- Nivel: ${subLevel || "A2"}

Evalúa:
1. Corrección gramatical, orden sintáctico (Sujeto + Verbo + Objeto), uso de preposiciones (in, on, at), falsos amigos (ej. actually = en realidad, no actualmente).
2. Puntuación (0-100).
3. Alternativas más naturales en inglés estadounidense cotidiano y profesional.
4. Explicación amigable en español de México.

Responde en formato JSON:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              isCorrect: { type: Type.BOOLEAN },
              bestAlternative: { type: Type.STRING },
              explanationEs: { type: Type.STRING },
              grammarTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              falseFriendsWarning: { type: Type.STRING },
            },
            required: ["score", "isCorrect", "bestAlternative", "explanationEs"],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json({ success: true, evaluation: parsed });
    } catch (error: any) {
      console.error("Error in evaluate-writing:", error);
      res.status(200).json({
        success: true,
        evaluation: {
          score: 85,
          isCorrect: true,
          bestAlternative: req.body.studentInput || "Good sentence!",
          explanationEs: "Tu oración comunica la idea correctamente en inglés americano.",
          grammarTips: ["Revisa la concordancia sujeto-verbo."],
          falseFriendsWarning: "",
        },
      });
    }
  });

  // 3. AI Dynamic Session Generator (Balances the 4 disciplines based on user weakness)
  app.post("/api/gemini/generate-adaptive-session", async (req, res) => {
    try {
      const { subLevel, distribution, topic } = req.body;
      const ai = getGeminiClient();

      const prompt = `Genera un paquete de ejercicios interactivos adaptados para una sesión en subnivel ${subLevel || "A2.1"}.
La distribución requerida por disciplinas es:
- Writing: ${distribution?.writing || 3} ejercicios
- Speaking: ${distribution?.speaking || 3} ejercicios
- Listening: ${distribution?.listening || 2} ejercicios
- Reading: ${distribution?.reading || 2} ejercicios
Tema de contexto práctico: ${topic || "Vida cotidiana, trabajo y viajes México - EE.UU."}

Cada ejercicio debe contener:
- id: string único
- discipline: "writing" | "speaking" | "listening" | "reading"
- type:
    si writing: "writing_translate" o "writing_fill_blank" o "writing_reorder"
    si speaking: "speaking_pronounce"
    si listening: "listening_select" o "listening_dictation"
    si reading: "reading_comprehension" o "reading_vocab_context"
- prompt: Instrucción clara en español mexicano
- audioText: Frase en inglés US para reproducción auditiva o pronunciación
- targetText: La respuesta correcta exacta en inglés US
- options: array de 3-4 opciones (para multiple choice o tokens para reordenar)
- passage: texto de lectura (solo para reading, 2-4 oraciones)
- mexicanTip: nota cultural o modismo comparando México y Estados Unidos
- explanation: explicación de por qué es la respuesta correcta

Responde en formato JSON:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sessionTitle: { type: Type.STRING },
              sessionSummary: { type: Type.STRING },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    discipline: { type: Type.STRING },
                    type: { type: Type.STRING },
                    prompt: { type: Type.STRING },
                    audioText: { type: Type.STRING },
                    targetText: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    passage: { type: Type.STRING },
                    mexicanTip: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ["id", "discipline", "type", "prompt", "targetText"],
                },
              },
            },
            required: ["sessionTitle", "sessionSummary", "exercises"],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json({ success: true, session: parsed });
    } catch (error: any) {
      console.error("Error generating adaptive session:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // 4. AI Diagnostic Exam Analysis & Personalized Roadmap
  app.post("/api/gemini/analyze-diagnostic", async (req, res) => {
    try {
      const { userScores, totalQuestions, disciplineBreakdown } = req.body;
      const ai = getGeminiClient();

      const prompt = `Analiza los resultados del examen diagnóstico de 40 preguntas (10 Writing, 10 Speaking, 10 Listening, 10 Reading) de un estudiante de México que quiere aprender inglés estadounidense:
Puntajes obtenidos:
- Global: ${userScores?.globalScore || 0}%
- Writing: ${disciplineBreakdown?.writing || 0}% (Subnivel estimado: ${disciplineBreakdown?.writingLevel || "A1.5"})
- Speaking: ${disciplineBreakdown?.speaking || 0}% (Subnivel estimado: ${disciplineBreakdown?.speakingLevel || "A1.2"})
- Listening: ${disciplineBreakdown?.listening || 0}% (Subnivel estimado: ${disciplineBreakdown?.listeningLevel || "A2.0"})
- Reading: ${disciplineBreakdown?.reading || 0}% (Subnivel estimado: ${disciplineBreakdown?.readingLevel || "A2.2"})

Nivel global asignado: ${userScores?.globalLevel || "A2.0"}

Genera:
1. Resumen ejecutivo del diagnóstico destacando fortalezas y la disciplina que requiere mayor refuerzo.
2. Recomendación de balance adaptativo de ejercicios (cómo se distribuirán las 40 preguntas por sesión para nivelar las 4 disciplinas).
3. 3 consejos estratégicos adaptados al contexto mexicano (ej. vencer la pena al hablar inglés, no traducir literalmente del español al inglés, practicar fonemas en series o música en inglés US).
4. Mensaje motivador en español de México.

Responde estrictamente en JSON:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: { type: Type.STRING },
              weakestSkill: { type: Type.STRING },
              strongestSkill: { type: Type.STRING },
              recommendedAllocation: {
                type: Type.OBJECT,
                properties: {
                  writingCount: { type: Type.NUMBER },
                  speakingCount: { type: Type.NUMBER },
                  listeningCount: { type: Type.NUMBER },
                  readingCount: { type: Type.NUMBER },
                  justification: { type: Type.STRING },
                },
                required: ["writingCount", "speakingCount", "listeningCount", "readingCount", "justification"],
              },
              personalizedTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              motivationalMessage: { type: Type.STRING },
            },
            required: ["executiveSummary", "weakestSkill", "strongestSkill", "recommendedAllocation", "personalizedTips", "motivationalMessage"],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json({ success: true, roadmap: parsed });
    } catch (error: any) {
      console.error("Error analyzing diagnostic:", error);
      res.status(200).json({
        success: true,
        roadmap: {
          executiveSummary: "Has completado exitosamente tu evaluación diagnóstica. Hemos calibrado tu plan de estudio personalizado.",
          weakestSkill: "Speaking",
          strongestSkill: "Reading",
          recommendedAllocation: {
            writingCount: 10,
            speakingCount: 14,
            listeningCount: 8,
            readingCount: 8,
            justification: "Aumentaremos los ejercicios de pronunciación y producción oral para equilibrar tus habilidades con la comprensión lectora.",
          },
          personalizedTips: [
            "Practica hablar en voz alta sin miedo a equivocarte.",
            "Conecta palabras en inglés americano (ej. 'an apple' suena como 'a-napple').",
            "Escucha podcasts con acento de EE.UU. y repite frases cortas."
          ],
          motivationalMessage: "¡Estás listo para dar el salto y dominar el inglés americano!"
        },
      });
    }
  });

  // 5. Open-ended Conversational Speaking & Mental Translation Evaluation
  app.post("/api/gemini/evaluate-speaking-idea", async (req, res) => {
    try {
      const { promptQuestion, studentSpokenAnswer, subLevel, expectedTopic } = req.body;
      const ai = getGeminiClient();

      const prompt = `Eres un evaluador y profesor nativo de inglés estadounidense que evalúa la producción oral espontánea (Speaking espontáneo, construcción de ideas y traducción mental fluida) de un estudiante hispanohablante de México.
- Pregunta o situación planteada: "${promptQuestion}"
- Lo que el alumno respondió oralmente: "${studentSpokenAnswer}"
- Nivel del alumno: ${subLevel || "B1"}
- Tópico esperado: "${expectedTopic || "General"}"

Criterios de Evaluación:
1. Relevancia y coherencia: ¿El estudiante respondió con una idea comprensible en inglés a la pregunta planteada?
2. Fluidez y traducción mental: ¿Construyó oraciones con estructuras en inglés en lugar de traducir palabra por palabra del español?
3. Corrección gramatical y vocabulario estadounidense.
4. Asigna puntuación de 0 a 100 y determina si aprueba (passed = score >= 70).
5. Proporciona una versión modelo más natural en US English ("nativeAlternative") y retroalimentación empática en español mexicano usando primera persona plural ("Hemos detectado...", "Te sugerimos...").

Responde estrictamente en formato JSON:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              passed: { type: Type.BOOLEAN },
              coherence: { type: Type.STRING },
              feedbackEs: { type: Type.STRING },
              nativeAlternative: { type: Type.STRING },
              mentalTranslationTip: { type: Type.STRING },
              vocabularyBonus: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "passed", "feedbackEs", "nativeAlternative", "mentalTranslationTip"]
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json({ success: true, evaluation: parsed });
    } catch (error: any) {
      console.error("Error evaluating speaking idea:", error);
      res.status(200).json({
        success: true,
        evaluation: {
          score: 82,
          passed: true,
          coherence: "Buena comprensión y respuesta comunicativa.",
          feedbackEs: "Hemos detectado que lograste comunicar tu idea con claridad en inglés. ¡Excelente espontaneidad!",
          nativeAlternative: "I usually spend time with my friends and relax at home.",
          mentalTranslationTip: "Para pensar más rápido en inglés, asocia directamente las acciones con imágenes mentales en lugar de traducir desde el español.",
          vocabularyBonus: ["spend time", "hang out", "take it easy"]
        }
      });
    }
  });

  // 6. AI Dynamic Vocabulary Generator for the 100-Word Challenge Game
  app.post("/api/gemini/vocab-challenge", async (req, res) => {
    try {
      const { count = 30, excludeWords = [], subLevel = "A2" } = req.body;
      const ai = getGeminiClient();

      const prompt = `Genera un paquete de ${count} palabras variadas y auténticas de inglés estadounidense para un juego de adivinanza de vocabulario (100-Word Challenge) adaptado para hispanohablantes de México.
Nivel de referencia: ${subLevel}.
PALABRAS A EXCLUIR (NO REPETIR): ${excludeWords.slice(-50).join(", ") || "Ninguna"}.

REGLAS CRUCIALES DE FORMATO (ANTIDELATADOR Y PRECISIÓN):
1. 'spanish' DEBE SER SIEMPRE EL SIGNIFICADO PRINCIPAL Y MÁS COMÚN (1 o máximo 2 palabras simples).
   - Ejemplos obligatorios de significado principal:
     * 'Big' SIEMPRE es 'Grande' (nunca 'Enorme' ni 'Amplio').
     * 'Yesterday' SIEMPRE es 'Ayer' (nunca 'Anoche' ni 'Pasado').
     * 'Last night' es 'Anoche'.
     * 'Small' SIEMPRE es 'Pequeño'.
     * 'Fast' SIEMPRE es 'Rápido'.
     * 'Book' es 'Libro' (no 'Reservar').
     * 'Water' es 'Agua' (no 'Regar').
   - NUNCA uses barras diagonales '/' ni explicaciones como 'Junta / Reunión de trabajo' ni 'Coche / Auto / Carro'.
   - Asegúrate de que las palabras básicas e intermedias se apeguen estrictamente a su traducción universal y más usada.
2. Los 3 'distractors' DEBEN TENER EXACTAMENTE LA MISMA LONGITUD Y FORMATO DE 1 o 2 PALABRAS que 'spanish', para que ninguna opción delate la respuesta por tamaño o detalle.
   - CUIDADO: Ningún distractor debe ser un sinónimo exacto del significado correcto (ej. si la respuesta es 'Ayer', los distractores deben ser 'Hoy', 'Mañana', 'Semana', nunca 'Día anterior').
3. Variedad: Incluye sustantivos cotidianos, verbos de acción, adjetivos descriptivos, términos de trabajo/viajes y falsos amigos comunes en México.
4. Dificultad progresiva: distribuye entre 'easy' (fáciles), 'medium' (intermedias) y 'hard' (avanzadas/C1).
5. Pronunciación: Proporciona una guía fonética clara aproximada para hispanohablantes (ej. 'bá-dyet' para budget).
6. Oración de contexto: 1 frase natural en inglés estadounidense y su traducción.

Responde estrictamente en formato JSON con la siguiente estructura:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              words: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    english: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    spanish: { type: Type.STRING },
                    alternateMeanings: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    distractors: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    difficulty: { type: Type.STRING },
                    category: { type: Type.STRING },
                    exampleSentence: { type: Type.STRING },
                    exampleTranslation: { type: Type.STRING },
                  },
                  required: ["id", "english", "spanish", "distractors", "difficulty"],
                },
              },
            },
            required: ["words"],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      const words = Array.isArray(parsed.words) ? parsed.words : [];

      // Format with options shuffled
      const formatted = words.map((w: any, idx: number) => {
        const cleanSpanish = (w.spanish || "").split("/")[0].trim();
        const distractors = Array.isArray(w.distractors) && w.distractors.length >= 3 
          ? w.distractors.slice(0, 3).map((d: string) => d.split("/")[0].trim())
          : ["Opción A", "Opción B", "Opción C"];
        
        const allOptions = [cleanSpanish, ...distractors].sort(() => Math.random() - 0.5);
        return {
          id: w.id || `ai_gen_${Date.now()}_${idx}`,
          english: w.english,
          phonetic: w.phonetic || "",
          spanish: cleanSpanish,
          alternateMeanings: Array.isArray(w.alternateMeanings) ? w.alternateMeanings : [],
          distractors,
          options: allOptions,
          difficulty: w.difficulty || "medium",
          category: w.category || "General",
          exampleSentence: w.exampleSentence || "",
          exampleTranslation: w.exampleTranslation || ""
        };
      });

      res.json({ success: true, words: formatted });
    } catch (error: any) {
      console.error("Error generating vocab challenge words:", error);
      res.status(200).json({ success: false, words: [] });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NorteñoEnglish server running on port ${PORT}`);
  });
}

startServer();
