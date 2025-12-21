import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../content/promt";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export async function analyzeApiWithAI(apiResponse) {
  try {
    const stringified = JSON.stringify(apiResponse);
    const truncated =
      stringified.length > 30000
        ? stringified.substring(0, 30000) + "..."
        : stringified;

    const prompt = `${SYSTEM_PROMPT}

${truncated}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let cleanedText = text.trim();

    cleanedText = cleanedText.replace(/```json\s*/gi, "");
    cleanedText = cleanedText.replace(/```javascript\s*/gi, "");
    cleanedText = cleanedText.replace(/```\s*/g, "");
    cleanedText = cleanedText.replace(/`/g, "");

    cleanedText = cleanedText.replace(
      /^(here is|here's|the output is|output:)\s*/gi,
      ""
    );

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseError) {
      throw new Error("AI returned invalid JSON. Please try again.");
    }

    if (parsed.dataArray && !parsed.datasets) {
      parsed = {
        datasets: [
          {
            label: "Data",
            data: parsed.dataArray,
            count: parsed.dataArray.length,
          },
        ],
        totalDatasets: 1,
      };
    }

    if (Array.isArray(parsed)) {
      parsed = {
        datasets: [
          {
            label: "Data",
            data: parsed,
            count: parsed.length,
          },
        ],
        totalDatasets: 1,
      };
    }

    if (!parsed || typeof parsed !== "object") {
      throw new Error("AI response is not a valid object");
    }

    if (!parsed.datasets) {
      throw new Error(
        "AI response missing 'datasets' field. Got: " +
          Object.keys(parsed).join(", ")
      );
    }

    if (!Array.isArray(parsed.datasets)) {
      throw new Error("AI 'datasets' field must be an array");
    }

    if (parsed.datasets.length === 0) {
      throw new Error("AI returned empty datasets array");
    }

    parsed.datasets = parsed.datasets
      .filter((ds, index) => {
        if (!ds.label || typeof ds.label !== "string") {
          return false;
        }

        if (!ds.data) {
          return false;
        }

        if (!Array.isArray(ds.data)) {
          return false;
        }

        if (ds.data.length === 0) {
          return false;
        }

        return true;
      })
      .map((ds) => ({
        label: ds.label,
        data: ds.data,
        count: ds.count || ds.data.length,
      }));

    if (parsed.datasets.length === 0) {
      throw new Error("No valid datasets found after validation");
    }

    return parsed;
  } catch (error) {
    if (
      error.message?.includes("503") ||
      error.message?.includes("overloaded")
    ) {
      throw new Error("AI service is busy. Wait 10 seconds and try again.");
    }
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      throw new Error("API quota exceeded. Please wait and try again.");
    }
    if (error.message?.includes("404")) {
      throw new Error("AI model not found. Check gemini.js configuration.");
    }

    throw new Error("AI analysis failed: " + error.message);
  }
}
