// src/services/busService.js
import axiosInstance from '../utils/axiosInstance';

export const fetchBusDetails = async (id) => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or another secure place
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axiosInstance.get(`/schedules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching bus details:', error);
    throw error;
  }
};