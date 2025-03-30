
import apiCliente from "./ApiClient";

const SimulationService = {
    async simulate(data){
        const response = await apiCliente.post('/simulation', data);
        return response.data;           
    },

    async getUserSimualtions(){
        const response = await apiCliente.get("/simulation/mis-simualciones");
        return response.data;        
    },
};
export default SimulationService;