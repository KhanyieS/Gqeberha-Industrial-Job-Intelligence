import { GoogleGenAI, Type } from "@google/genai";
import { USER_PROFILE_CV } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeJobWithGemini = async (jobDescription: string, jobTitle: string) => {
  try {
    const prompt = `
      You are an expert recruitment and security analyst for industrial jobs in Port Elizabeth, South Africa.
      
      User Profile: ${USER_PROFILE_CV}

      Job Title: ${jobTitle}
      Job Description: ${jobDescription}

      Task:
      1. Analyze the job for fraud indicators (upfront fees, poor grammar, unrealistic salary).
      2. Compare the job requirements against the User Profile to calculate a match score.
      3. Provide a brief reasoning string.

      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fraudScore: {
              type: Type.NUMBER,
              description: "0 to 100, where 100 is definitely fraud."
            },
            matchScore: {
              type: Type.NUMBER,
              description: "0 to 100 match percentage based on skills."
            },
            reasoning: {
              type: Type.STRING,
              description: "A short, one-sentence summary of the analysis."
            }
          },
          required: ["fraudScore", "matchScore", "reasoning"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback in case of API error to avoid crashing UI
    return {
      fraudScore: 0,
      matchScore: 50,
      reasoning: "Analysis temporarily unavailable. Proceed with caution."
    };
  }
};