//src/services/lostService.js
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = 'http://localhost:5000/api/lost';

export const getLostItems = async () => {
  try {
    console.log('Fetching lost items from:', BASE_URL);
    const response = await axiosInstance.get(BASE_URL);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost items:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    throw error;
  }
};
