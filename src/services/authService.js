//src/services/authService.js
import axios from 'axios';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL; // Use environment variable

export const fetchAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the refresh token
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await axios.post(`${AUTH_URL}/refresh-token`, { token: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};