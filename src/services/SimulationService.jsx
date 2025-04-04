//sevicio para la simulacion
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
        const response = await axios.get(`${API_URL}/history`);
        return response.data;
    },

    async deleteUserSimulations(token) {
        const response = await axios.delete(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
};
export default SimulationService;

