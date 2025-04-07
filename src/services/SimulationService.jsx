
import apiCliente from "./ApiClient";

const SimulationService = {
    async simulate(data) {
        const response = await apiCliente.post("/simulation", data);
        return response.data;
    },

    async getUserSimualtions() {
        const response = await apiCliente.get("/simulation/mis-simualciones");
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

    async getTechnologiesForSimulation(simulationId) {
        const response = await apiCliente.get(`/simulation/${simulationId}/technologies`);

        return response.data;
    },
};

export default SimulationService;


