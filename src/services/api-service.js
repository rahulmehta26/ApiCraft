import axios from "axios";

export async function getApiData(url) {
  try {
    const res = await axios.get(url, {
      timeout: 30000,
    });
    return res?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("No response from API. Check your internet connection.");
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

export const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};
