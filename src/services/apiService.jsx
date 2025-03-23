
const API_URL = "http://localhost:8080/api";
const checkBackendStatus = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/test");
    return await response.text();
  } catch (error) {
    return "❌ Error connecting to backend";
  }
};

export default checkBackendStatus;  // Exportación por defecto



