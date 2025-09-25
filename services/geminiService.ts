import { GoogleGenAI, Chat } from "@google/genai";
import type { Category, AiResponse } from '../types';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAi = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set!");
      return null;
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const getChat = () => {
    const aiInstance = getAi();
    if (!aiInstance) return null;

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


export const askAi = async (message: string, simulations: Category[]): Promise<AiResponse> => {
  const chatInstance = getChat();
  if (!chatInstance) {
    return { type: 'answer', text: "The AI assistant is currently unavailable. Please ensure the API key is configured." };
  }

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

  try {
    const response = await chatInstance.sendMessage({ message: prompt });
    const jsonString = response.text.trim();
    const parsedResponse: AiResponse = JSON.parse(jsonString);
    return parsedResponse;
  } catch (error) {
    console.error("Error communicating with or parsing response from Gemini API:", error);
    return { type: 'answer', text: "Sorry, I had trouble processing that request. Please try rephrasing your question." };
  }
};
