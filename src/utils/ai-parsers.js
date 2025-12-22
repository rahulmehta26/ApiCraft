import { checkIfApiHasData } from "./data-validators";
import { findFirstArray } from "./parser";

export const getArrayToRender = (apiData, aiDatasets, selectedIndex = 0) => {
  if (aiDatasets && aiDatasets.datasets?.length > 0) {
    const safeIndex = Math.min(
      Math.max(0, selectedIndex),
      aiDatasets?.datasets?.length - 1
    );
    return aiDatasets.datasets[safeIndex]?.data || [];
  }

  if (!checkIfApiHasData(apiData)) return [];

  return findFirstArray(apiData) || [];
};
