import axios from "axios";

export async function getApiData(url) {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (error) {
    console.error("Error Fetching data:-", error);
    throw error;
  }
}
