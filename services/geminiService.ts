
import { GoogleGenAI, Content } from "@google/genai";
import type { Category, AiResponse } from '../types';

export const askAi = async (
  message: string, 
  history: { role: 'user' | 'model'; content: string | AiResponse }[],
  simulations: Category[], 
  t: (key: string) => string
): Promise<AiResponse> => {
  try {
    // Use the environment variable if available, otherwise use the provided fallback key.
    // Note: In client-side apps, keys are visible. To secure this key, restrict it by HTTP Referrer in the Google Cloud Console.
    const apiKey = (typeof process !== 'undefined' ? process.env?.API_KEY : undefined) || "AIzaSyB_2cGdWvj5ZXWWwOGsC8EaZIWIFXYl8_E";
    
    if (!apiKey) {
        return { type: 'error', code: 'API_KEY_MISSING', text: t('geminiService.unavailable') };
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    const simContext = simulations.flatMap(cat => 
      cat.simulations.map(sim => ({
        id: sim.id,
        title: sim.title,
        description: sim.description
      }))
    );

    const systemInstruction = `You are CryptoAX, an expert crypto educator from CryptoAX07.com.
- Your response MUST be a single, valid JSON object. Do not include any text, markdown, or formatting outside of the JSON structure.
- You have three response types: 'answer', 'recommendation', or 'generated_example'.

1.  **Recommendation**: If the user's question is directly about a process covered by an existing simulation, respond with this type.
    -   'text' field: Explain the concept and mention the simulation.
    -   'simulationId' field: The exact ID from the provided list.
    -   Format: \`{"type": "recommendation", "text": "...", "simulationId": "..."}\`

2.  **Generated Example**: If the user asks how to do something NOT in the simulations list (e.g., "how to get a crypto loan"), create a new, simplified, step-by-step example.
    -   'text' field: A brief introduction.
    -   'steps' field: An array of objects, each with a 'title' and 'content' string. Keep it simple (2-4 steps).
    -   Format: \`{"type": "generated_example", "text": "...", "steps": [{"title": "Step 1", "content": "..."}, ...]}\`

3.  **Answer**: For any other question (greetings, definitions, general knowledge), use this type.
    -   'text' field: Your friendly, educational explanation.
    -   Format: \`{"type": "answer", "text": "..."}\`

- AVAILABLE SIMULATIONS: ${JSON.stringify(simContext)}
- NEVER give financial advice. If asked, gently refuse within an 'answer' response.
- Focus on safety and clarity.
`;

    const geminiHistory: Content[] = history.map(msg => {
        let text = "";
        if (typeof msg.content === 'string') {
            text = msg.content;
        } else {
             // Extract text representation from AiResponse for context
             if ('text' in msg.content && typeof msg.content.text === 'string') {
                 text = msg.content.text;
             }
        }
        return {
            role: msg.role,
            parts: [{ text }]
        };
    });

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: geminiHistory,
        config: {
            systemInstruction,
        },
    });
    
    const response = await chat.sendMessage({ message });
    const jsonString = response.text?.trim();
    
    if (!jsonString) {
         return { type: 'answer', text: t('geminiService.processingError') };
    }

    let cleanJson = jsonString;
    // Attempt to strip markdown code blocks if present
    if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
        const parsedResponse: AiResponse = JSON.parse(cleanJson);
        return parsedResponse;
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", cleanJson);
        return { type: 'answer', text: t('geminiService.unexpectedResponse') };
    }

  } catch (error) {
    console.error("Error with Gemini API:", error);
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("API_KEY")) {
        return { type: 'error', code: 'API_KEY_MISSING', text: t('geminiService.unavailable') };
    }
    return { type: 'answer', text: t('geminiService.processingError') };
  }
};
