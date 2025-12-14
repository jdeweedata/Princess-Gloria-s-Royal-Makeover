import { GoogleGenAI } from "@google/genai";
import { CharacterConfig, MakeoverState } from "../types";
import { DRESSES, ACCESSORIES, LIP_COLORS, EYE_COLORS } from "../constants";

// Helper to safely get color names
const getColorName = (items: {name: string, class: string}[], colorClass: string) => 
  items.find(i => i.class === colorClass)?.name || "Natural";

export const generateRoyalFeedback = async (
  character: CharacterConfig,
  state: MakeoverState
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "The Royal Advisor is currently on vacation (API Key missing). However, you look stunning!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const dress = DRESSES.find(d => d.id === state.outfit.dressId)?.name || "Standard Gown";
    const accessory = ACCESSORIES.find(a => a.id === state.outfit.accessoryId)?.name || "No Accessory";
    const lipColor = getColorName(LIP_COLORS, state.makeup.lipstick);
    const eyeColor = getColorName(EYE_COLORS, state.makeup.eyeshadow);

    const prompt = `
      You are the Royal Fashion Advisor for the magical kingdom. 
      Princess ${character.name} has just finished her makeover.
      She is wearing: ${dress} and ${accessory}.
      Her makeup features ${lipColor} lips and ${eyeColor} eyeshadow.
      
      Please give a short, enthusiastic, and magical compliment (max 2 sentences) about her new look. 
      Mention how ready she is for the Winter Ball. Use emojis like ✨, 👑, ❄️.
      Tone: Regal, encouraging, and delightful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "You look absolutely magnificent, your Highness!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The mirror is cloudy, but you look beautiful regardless!";
  }
};
