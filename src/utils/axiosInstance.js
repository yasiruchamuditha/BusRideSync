// src/utils/axiosInstance.js
import axios from 'axios';
import { fetchAccessToken } from '../services/authService';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken  } = await fetchAccessToken(); // Fetch a new access token from your auth service
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Error refreshing token:', err);
        // Handle logout or token refresh failure
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;