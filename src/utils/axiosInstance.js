import axios from 'axios';
import Router from 'next/router'; // Import Next.js Router
import Cookies from 'js-cookie'; // Import Cookies

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
    if (error.response?.status === 401) {
      // Handle unauthorized access by redirecting to the login page
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      Cookies.remove('token');
      Cookies.remove('name');
      Cookies.remove('role');
      Cookies.remove('email');
      Cookies.remove('id');
      Router.push('/login'); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;