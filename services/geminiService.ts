import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageRole, ChatMessage } from '../types';

// Initialize the Gemini API client
// NOTE: In a real production app, this should be proxied through a backend to hide the API key.
// For this demo environment, we use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SAFETY_SYSTEM_INSTRUCTION = `
You are the "Justrite Safety Advisor", an AI assistant for Justrite Romania SRL.
Justrite Romania is part of the US-based Justrite Manufacturing Group.
We specialize in manufacturing industrial safety products, specifically:
1. Waste Management Metallic Containers (Oily Waste Cans).
2. Plunger Cans (for safe dispensing of flammable liquids).

Your goal is to help users understand industrial safety, chemical handling, and how our products prevent fires and accidents.
Be professional, concise, and safety-oriented.
If asked about pricing or specific orders, advise the user to contact the sales team via the contact form.
Always emphasize that we are located in Romania but uphold strict US manufacturing standards (FM Global, UL/ULC certified).
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
