
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Debe devolver { token, user }
};


export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};


