export function checkIfApiHasData(responseData) {
  if (!responseData) return false;

  if (Array.isArray(responseData) && responseData.length > 0) return true;

  if (
    typeof responseData === "object" &&
    Object.keys(responseData).length > 0
  ) {
    const hasNestedData = Object.values(responseData).some((value) => {
      if (Array.isArray(value) && value.length > 0) return true;
      if (
        typeof value === "object" &&
        value !== null &&
        Object.keys(value).length > 0
      )
        return true;
      return false;
    });
    return hasNestedData;
  }

  return false;
}
