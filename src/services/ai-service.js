import { SYSTEM_PROMPT } from "../content/prompt";
import { logError } from "../utils/error-handlers";

const API_ENDPOINT = "/api/analyze-api";
const MAX_INPUT_LENGTH = 30000;

const truncateData = (data) => {
  try {
    const stringified = JSON.stringify(data);

    if (stringified.length > MAX_INPUT_LENGTH) {
      return stringified.substring(0, MAX_INPUT_LENGTH) + "...";
    }

    return stringified;
  } catch (error) {
    throw new Error("Failed to stringify API data: " + error.message);
  }
};

const cleanResponse = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("AI returned empty or invalid response");
  }

  let cleaned = text.trim();

  cleaned = cleaned.replace(/```json\s*/gi, "");
  cleaned = cleaned.replace(/```javascript\s*/gi, "");
  cleaned = cleaned.replace(/```\s*/g, "");
  cleaned = cleaned.replace(/`/g, "");

  cleaned = cleaned.replace(/^(here is|here's|the output is|output:)\s*/gi, "");

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) cleaned = jsonMatch[0];

  return cleaned;
};

const parseResponse = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("AI returned invalid JSON format: " + error.message);
  }
};

const normalizeResponse = (parsed) => {
  if (parsed.dataArray && !parsed.datasets) {
    return {
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
    return {
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

  return parsed;
};

const validateResponse = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("AI response is not a valid object");
  }

  if (!Array.isArray(data.datasets)) {
    throw new Error("AI response missing valid 'datasets' array");
  }

  if (data.datasets.length === 0) {
    throw new Error("AI returned empty datasets");
  }
};

const filterDatasets = (datasets) =>
  datasets
    .filter((ds, index) => {
      if (!ds.label || typeof ds.label !== "string") {
        return false;
      }
      if (!Array.isArray(ds.data) || ds.data.length === 0) {
        return false;
      }
      return true;
    })
    .map((ds) => ({
      label: ds.label,
      data: ds.data,
      count: ds.count ?? ds.data.length,
    }));

export const analyzeApiWithAI = async (apiResponse) => {
  try {
    const truncated = truncateData(apiResponse);
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${truncated}`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiResponse: truncated,
        prompt: fullPrompt,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "AI analysis failed");
    }

    const cleaned = cleanResponse(result.data);
    const parsed = parseResponse(cleaned);
    const normalized = normalizeResponse(parsed);

    validateResponse(normalized);

    normalized.datasets = filterDatasets(normalized.datasets);

    if (normalized.datasets.length === 0) {
      throw new Error("No valid datasets found");
    }

    return normalized;
  } catch (error) {
    logError(error, "analyzeApiWithAI", {
      dataLength: JSON.stringify(apiResponse).length,
    });
    throw error;
  }
};
