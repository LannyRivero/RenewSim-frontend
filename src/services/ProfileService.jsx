import apiCliente from './ApiClient';

export const getProfile = async () => {
  const response = await apiCliente.get('/profile/me');
  return response.data;
};

export const createProfile = async (profileData) => {
  const response = await apiCliente.post('/profile', profileData);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await apiCliente.put('/profile', profileData);
  return response.data;
};
