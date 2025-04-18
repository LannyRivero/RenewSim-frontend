import apiCliente from "./ApiClient";

const TechnologyService = {
  async createTechnology(data) {
    const response = await apiCliente.post("/technology-comparison", data);
    return response.data;
  },

  async getAllTechnologies() {
    const response = await apiCliente.get("/technology-comparison");
    return response.data;
  }
};

export default TechnologyService;
