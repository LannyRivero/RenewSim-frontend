import api from "./api";

const apiService = {
  // Obtener todos los registros de prueba
  getTests: async () => {
    try {
      const response = await api.get("/test");
      console.log("API Response in Frontend:", response.data); // ✅ Ver respuesta en consola
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },
  

  // Crear un nuevo registro de prueba
  createTest: async (message) => {
    try {
      const response = await api.post("/test", null, { params: { message } });  // 🔹 Enviar el mensaje como query param
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error creating test data");
    }
  },
};  

// ✅ Exportamos `fetchTests` como una función real
export const fetchTests = async () => {
  return await apiService.getAllTests();
};

export default apiService;


