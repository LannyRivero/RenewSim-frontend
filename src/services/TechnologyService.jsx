import apiCliente from "./ApiClient";

const TechnologyService = {
  async createTechnology(data) {
    const response = await apiCliente.post("/technologies", data);
    return response.data;
  },

  async getAllTechnologies() {
    const response = await apiCliente.get("/technologies"); 
    return response.data;
  },
  async deleteTechnologyById(technologyId) {
    const response = await apiCliente.delete(`/technologies/${technologyId}`);
    return response.data;
  },
};

export default TechnologyService;
