import api from "./api";


const apiService = {
  getTests: async () => {
    try {
      const response = await api.get("/test");
      console.log("API Response in Frontend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      
      if (!error.response) {
        throw new Error("⚠️ No connection to the server. Please check your internet connection or backend status.");
      }

      throw new Error(error.response.data?.message || "⚠️ Error fetching test data. Try again later.");
    }
  },

  createTest: async (message) => {
    try {
      const response = await api.post("/test", null, { params: { message } });
      return response.data;
    } catch (error) {
      console.error("Error creating test data:", error);

      if (!error.response) {
        throw new Error("⚠️ Unable to connect to the server. Please try again later.");
      }

      throw new Error(error.response.data?.message || "⚠️ Failed to create test data.");
    }
  },
};

export default apiService;



