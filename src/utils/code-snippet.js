export const codeSnippets = {
  fetch: {
    async: (url) => `// Fetch API (Async/Await)
const fetchData = async () => {
  try {
    const response = await fetch('${url}');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};`,

    then: (url) => `// Fetch API (Promise .then)
function fetchData() {
  return fetch('${url}')
    .then(response => {
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}`,
  },

  axios: {
    async: (url) => `// Axios (Async/Await)
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get('${url}');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};`,

    then: (url) => `// Axios (Promise .then)
import axios from "axios";

function fetchData() {
  return axios.get('${url}')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}`,
  },
};
