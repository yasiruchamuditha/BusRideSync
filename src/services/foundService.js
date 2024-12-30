//src/services/foundService.js
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/found';

export const getFoundItems = async () => {
  try {
    const response = await axiosInstance.get(`/found`);
    return response.data;
  } catch (error) {
    console.error('Error fetching found items:', error);
    throw error;
  }
};
