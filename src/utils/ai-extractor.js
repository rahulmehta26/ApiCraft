import { checkIfApiHasData } from "./data-validators";
import { findFirstArray } from "./finding-array";

export const getArrayToRender = (apiData, aiDatasets, selectedIndex = 0) => {
  if (aiDatasets && aiDatasets.datasets?.length > 0) {
    return aiDatasets.datasets[selectedIndex]?.data || [];
  }

  if (!checkIfApiHasData(apiData)) return [];

  return findFirstArray(apiData) || [];
};
