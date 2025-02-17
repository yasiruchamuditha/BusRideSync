//src/services/routeService.js
// import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/routes';

export const fetchRoutes = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or another secure place
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axiosInstance.get(`/routes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching found items:', error);
    throw error;
  }
};