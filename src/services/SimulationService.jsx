
import apiCliente from "./ApiClient";

const SimulationService = {
    async simulate(date){
        const response = await apiCliente.post('/simulations', data);
        return response.data;           
    },

    async getUserSimualtions(){
        const response = await apiCliente.get("/simulation/mis-simualciones");
        return response.data;        
    },
};
export default SimulationService;