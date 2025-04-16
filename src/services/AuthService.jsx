import apiCliente from './ApiClient';
import { setToken, removeToken } from '../utils/TokenUtils'; 

export const loginUser = async (credentials) => {
  const response = await apiCliente.post('/auth/login', credentials);

  setToken(response.data.token);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiCliente.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = () => {
  removeToken(); 
  window.location.href = "/login"; 
};







