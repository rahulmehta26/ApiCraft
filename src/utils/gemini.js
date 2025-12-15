import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../content/promt";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function analyzeApiWithAI(apiResponse) {
  try {
    const prompt = `${SYSTEM_PROMPT}

API Response to analyze:
${JSON.stringify(apiResponse, null, 2)}

Extract, clean and structure the data for card display. Ensure no undefined values. Return ONLY valid JSON.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    if (!parsed.dataArray || !Array.isArray(parsed.dataArray)) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch (error) {
    throw new Error("Failed to analyze API response with AI: " + error.message);
  }
}
