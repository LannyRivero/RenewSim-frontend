import apiCliente from './ApiClient';

const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    console.log("🔐 Token guardado:", token);
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
  console.log("🚪 Token eliminado. Sesión cerrada.");
};

export const loginUser = async (credentials) => {
  const response = await apiCliente.post('/auth/login', credentials);
  saveToken(response.data.token);
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

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => !!getToken();






