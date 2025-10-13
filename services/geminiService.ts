import { GoogleGenAI, Chat } from "@google/genai";
import type { Category, AiResponse } from '../types';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAi = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = (process as any)?.env?.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY is not configured in the environment.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const getChat = (): Chat => {
    const aiInstance = getAi();

    if (!chat) {
        chat = aiInstance.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are CryptoAX, an expert crypto educator from CryptoAX07.com.
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

- NEVER give financial advice. If asked, gently refuse within an 'answer' response.
- Focus on safety and clarity.
`,
            },
        });
    }
    return chat;
}


export const askAi = async (message: string, simulations: Category[], t: (key: string) => string): Promise<AiResponse> => {
  try {
    const chatInstance = getChat();
    
    const simContext = simulations.flatMap(cat => 
      cat.simulations.map(sim => ({
        id: sim.id,
        title: sim.title,
        description: sim.description
      }))
    );

    const prompt = `
      USER_QUESTION: "${message}"
      ---
      AVAILABLE_SIMULATIONS_CONTEXT: ${JSON.stringify(simContext)}
    `;
    
    const response = await chatInstance.sendMessage({ message: prompt });
    const jsonString = response.text.trim();
    if (!jsonString.startsWith('{') && !jsonString.startsWith('[')) {
        console.error("Gemini API returned non-JSON response:", jsonString);
        return { type: 'answer', text: t('geminiService.unexpectedResponse') };
    }
    const parsedResponse: AiResponse = JSON.parse(jsonString);
    return parsedResponse;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
        return { type: 'answer', text: t('geminiService.unavailable') };
    }
    return { type: 'answer', text: t('geminiService.processingError') };
  }
};