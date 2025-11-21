import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LineItem } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProposalItems = async (promptText: string): Promise<Omit<LineItem, 'id'>[]> => {
  const ai = getAIClient();
  
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING, description: "Short title or description of the service/product in Portuguese" },
        qty: { type: Type.NUMBER, description: "Estimated quantity or hours" },
        price: { type: Type.NUMBER, description: "Unit price in BRL" }
      },
      required: ["description", "qty", "price"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Gere uma lista de itens para uma proposta comercial baseada nesta descrição do projeto: "${promptText}". 
      Crie serviços e preços realistas em Reais (BRL). Mantenha as descrições concisas (menos de 5 palavras) e em Português do Brasil. Retorne entre 3 e 6 itens.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Omit<LineItem, 'id'>[];
  } catch (error) {
    console.error("Error generating items:", error);
    throw error;
  }
};