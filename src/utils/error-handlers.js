// Error types
export const ErrorType = {
  USER_INPUT: "user_input",
  NETWORK: "network",
  API: "api",
  INTERNAL: "internal",
  AI: "ai",
};

export const shouldShowToUser = (error) => {
  const message = error?.message?.toLowerCase() || "";

  if (
    message.includes("undefined") ||
    message.includes("is not a function") ||
    message.includes("cannot read property") ||
    message.includes("null is not an object") ||
    message.includes("unexpected token") ||
    message.includes("syntax error")
  ) {
    return false;
  }

  return true;
};

export const getUserFriendlyError = (error, context = "") => {
  if (!error) return "An unexpected error occurred";

  const message = error?.message || error?.toString() || "";
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("network") ||
    lowerMessage.includes("fetch failed")
  ) {
    return "Connection failed. Please check your internet.";
  }

  if (lowerMessage.includes("timeout")) {
    return "Request timed out. Please try again.";
  }

  if (lowerMessage.includes("cors")) {
    return "Cannot access this API due to security restrictions.";
  }

  if (lowerMessage.includes("404")) {
    return "API endpoint not found.";
  }

  if (lowerMessage.includes("401") || lowerMessage.includes("unauthorized")) {
    return "API requires authentication.";
  }

  if (lowerMessage.includes("403") || lowerMessage.includes("forbidden")) {
    return "Access to this API is forbidden.";
  }

  if (lowerMessage.includes("429") || lowerMessage.includes("rate limit")) {
    return "Too many requests. Please wait and try again.";
  }

  if (lowerMessage.includes("500") || lowerMessage.includes("server error")) {
    return "The API server encountered an error.";
  }

  if (lowerMessage.includes("quota")) {
    return "AI service quota exceeded. Try again later.";
  }

  if (lowerMessage.includes("api key")) {
    return "AI service configuration issue. Please contact support.";
  }

  if (lowerMessage.includes("json") || lowerMessage.includes("parse")) {
    return "Received invalid data format.";
  }

  if (!shouldShowToUser(error)) {
    return "Something went wrong. Please try again.";
  }

  let cleanMessage = message
    .replace(/^(Error:|AxiosError:)\s*/i, "")
    .replace(/\s*\(.*?\)\s*$/, "") //
    .trim();

  if (cleanMessage.length > 100 || cleanMessage.includes("at ")) {
    return "An error occurred. Please try again.";
  }

  return cleanMessage || "An unexpected error occurred.";
};

export const logError = (error, context = "", additionalData = {}) => {
  if (process.env.NODE_ENV === "development") {
    console.group(`🔴 Error in ${context}`);
    console.error("Error:", error);
    console.error("Message:", error?.message);
    console.error("Stack:", error?.stack);
    if (Object.keys(additionalData).length > 0) {
      console.error("Additional Data:", additionalData);
    }
    console.groupEnd();
  } else {
    // In production, send to error tracking service
    // sendToErrorTracking(error, context, additionalData);
    console.error(`Error in ${context}:`, error?.message);
  }
};
