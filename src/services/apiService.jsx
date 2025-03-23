
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    return null;
  }
};


export default checkBackendStatus;  // Exportación por defecto



