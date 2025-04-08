import apiCliente from "./ApiClient";

const SimulationService = {
  async simulate(data) {
    const response = await apiCliente.post("/simulation", data);
    return response.data;
  },

  async getUserSimulations() {
    const response = await apiCliente.get("/simulation/user");
    return response.data;
  },

  async getSimulationHistory() {
    const response = await apiCliente.get("/simulation/history");
    return response.data;
  },

  async deleteUserSimulations() {
    const response = await apiCliente.delete("/simulation/user");
    return response.data;
  },

  async deleteSimulationById(simulationId) {
    const response = await apiCliente.delete(`/simulation/${simulationId}`);
    return response.data;
  },

  async getTechnologiesForSimulation(simulationId) {
    const response = await apiCliente.get(`/simulation/${simulationId}/technologies`);
    return response.data;
  },

  async getAllTechnologies() {
    const response = await apiCliente.get("/simulation/technologies/global");
    return response.data;
  },

  async getNormalizedTechnologies() {
    const response = await apiCliente.get("/simulation/normalized-technologies");
    return response.data;
  },
};

export default SimulationService;



