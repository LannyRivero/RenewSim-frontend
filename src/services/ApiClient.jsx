
import axios from 'axios';
import { toast } from 'react-toastify';

const apiCliente = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

apiCliente.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiCliente.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {

      toast.error('🚫 No se pudo conectar con el servidor. Verifica tu conexión.');
    } else if (response.status === 401) {

      toast.error('⚠️ Sesión expirada. Por favor, inicia sesión nuevamente.');

    } else if (response.status >= 500) {

      toast.error('💥 Error del servidor. Inténtalo más tarde.');
    } else {

      const errorMessage = response.data?.message || 'Ocurrió un error inesperado.';
      toast.error(`❌ ${errorMessage}`);
    }

    return Promise.reject(error);
  }
);

export default apiCliente;
