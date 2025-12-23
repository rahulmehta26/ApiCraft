import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function callGemini(prompt) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}
