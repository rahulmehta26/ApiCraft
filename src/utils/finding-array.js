export const findFirstArray = (obj) => {
  if (Array.isArray(obj)) return obj;

  if (typeof obj !== "object" || obj === null) return null;

  for (const key in obj) {
    const found = findFirstArray(obj[key]);
    if (found) return found;
  }

  return null;
};
