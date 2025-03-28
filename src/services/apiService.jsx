import api from '../services/api';

export const fetchData = async () => {
  try {
    const response = await api.get('/resources');
    return response.data;
  } catch (error) {
    console.error('API Axios Error:', error);
    return null;
  }
};






