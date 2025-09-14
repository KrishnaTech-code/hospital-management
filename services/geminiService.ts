
import { GoogleGenAI, Type } from "@google/genai";
import type { Patient } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAIResponse = async (query: string, patients: Patient[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI functionality is disabled because the API key is not configured.");
  }
  try {
    const prompt = `You are an expert hospital data analyst. Your task is to answer questions about patient data. Analyze the provided JSON data and answer the user's query based ONLY on this data. Do not invent any information. User query: "${query}" --- Patient Data: ${JSON.stringify(patients, null, 2)}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
        topP: 0.95
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error querying Gemini API:", error);
    if (error instanceof Error) {
        return `Error analyzing data: ${error.message}`;
    }
    return "An unknown error occurred while analyzing data.";
  }
};
