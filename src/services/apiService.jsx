import api from "./api";

const apiService = {
  // Obtener todos los registros de prueba
  getAllTests: async () => {
    try {
      const response = await api.get("/test");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching test data");
    }
  },

  // Crear un nuevo registro de prueba
  createTest: async (message) => {
    try {
      const response = await api.post("/test", { message }); // ✅ Enviar el mensaje en el body
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


