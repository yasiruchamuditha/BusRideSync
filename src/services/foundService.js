// src/services/foundService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/found';

export const getFoundItems = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or another secure place
    const response = await axios.get(BASE_URL, {
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