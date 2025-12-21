export function checkIfApiHasData(responseData) {
  if (!responseData) return false;

  if (Array.isArray(responseData) && responseData.length > 0) {
    return responseData.some((item) => checkIfApiHasData(item));
  }

  if (typeof responseData === "object" && responseData !== null) {
    return Object.values(responseData).some((value) =>
      checkIfApiHasData(value)
    );
  }

  return true;
}

export const validateArrayData = (arrayToRender) => {
  if (!arrayToRender) {
    return { isValid: false, message: "No array data found in response." };
  }

  if (Array.isArray(arrayToRender)) {
    if (arrayToRender.length === 0) {
      return {
        isValid: false,
        message: "Array is empty - no data to display.",
      };
    }

    const hasValidData = arrayToRender.some((item) => {
      if (typeof item === "object" && item !== null) {
        return Object.keys(item).length > 0;
      }
      return true;
    });

    if (!hasValidData) {
      return { isValid: false, message: "Array contains only empty objects." };
    }

    return { isValid: true };
  }

  if (typeof arrayToRender === "object") {
    if (Object.keys(arrayToRender).length === 0) {
      return { isValid: false, message: "No details available in response." };
    }
    return { isValid: true };
  }

  return { isValid: true };
};
