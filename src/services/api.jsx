import axios from "axios";

const API_URL = "http://localhost:8080/api/test"; // Asegurarme de que  el backend está corriendo

export const testBackendConnection = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return "Error";
  }
};
