import { useState } from "react";
import { analyzeApiWithAI } from "../services/ai-service";

export const useCraftAI = (addToast) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [datasets, setDatasets] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const analyze = async (data) => {
    try {
      setIsProcessing(true);
      const result = await analyzeApiWithAI(data);

      if (!result?.datasets?.length) {
        addToast("AI couldn't extract data.", "warning");
        return;
      }

      setDatasets(result);
      setSelectedIndex(0);

      addToast(
        result.datasets.length > 1
          ? `AI found ${result.datasets.length} datasets`
          : `AI extracted ${result.datasets[0].data.length} items`,
        "success"
      );
    } catch (error) {
      logError(error, "AI Analysis", { dataSize: JSON.stringify(data).length });
      const userMessage = getUserFriendlyError(error, "AI Analysis");
      addToast(userMessage, "error", 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setDatasets(null);
    setSelectedIndex(0);
  };

  return {
    analyze,
    reset,
    isProcessing,
    datasets,
    selectedIndex,
    setSelectedIndex,
    isUsingAI: !!datasets,
  };
};
