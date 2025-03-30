
import axios from 'axios';

const apiCliente = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

//Interceptor para incluir el token JWT en cada request
apiCliente.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;


});
export default apiCliente;