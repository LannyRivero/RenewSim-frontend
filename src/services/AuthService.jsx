
import axios from 'axios';

const API_URL = '/api/v1/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Debe devolver { token, user }
};

