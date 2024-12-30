//src/services/scheduleService.js
// import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/schedules'; // base URL

export const fetchSchedules = async (startCity, endCity, departureDate) => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or another secure place
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axiosInstance.post(`/schedules/search`, {
      startCity,
      endCity,
      departureDate,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }
};