// src/services/authService.js
import axios from 'axios';

const AUTH_URL = 'http://localhost:5000/api/auth';

export const fetchAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the refresh token
    const response = await axios.post(`${AUTH_URL}/refresh-token`, { token: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};