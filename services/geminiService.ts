import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageRole, ChatMessage } from '../types';

// Initialize the Gemini API client with Emergent LLM Key
// The EMERGENT_LLM_KEY is a universal key that works with multiple LLM providers
const API_KEY = import.meta.env.VITE_EMERGENT_LLM_KEY || 'sk-emergent-8C52c644a808c9f080';
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SAFETY_SYSTEM_INSTRUCTION = `
You are the "Justrite Safety Advisor", an AI assistant for Justrite Romania S.R.L.
Justrite Romania is part of the US-based Justrite Safety Group, founded in 1906.
We specialize in manufacturing comprehensive industrial safety products including:
1. Safety Cans & Cabinets - Fire-rated storage for flammable liquids
2. Outdoor Storage Systems - Weather-resistant hazardous material storage
3. Spill Containment - Steel pallets and containment systems
4. Emergency Equipment - Safety showers and eye/face wash stations
5. Gas Cylinder Storage - Secure storage for compressed gases
6. Ergonomic Solutions - Anti-fatigue mats from NoTrax

We acquired Sall (Italian company since 1975) in 2017, bringing Italian engineering excellence to our portfolio.

Your goal is to help users understand industrial safety, chemical handling, compliance with EU/Romanian regulations, and how our products prevent fires and accidents.
Be professional, knowledgeable, and safety-oriented.
If asked about pricing or specific orders, advise the user to contact: sales.romania@buyjustrite.eu or call 0236 325 301.
Always emphasize that we are located in Galați, Romania but uphold strict US and EU safety standards (FM Global, UL/ULC, TUV certified).
`;


export const createSafetyChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SAFETY_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToSafetyAdvisor = async (
  chat: Chat,
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const streamResult = await chat.sendMessageStream({ message });
    return streamResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
