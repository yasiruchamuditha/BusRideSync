// src/services/lostService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/lost';

export const getLostItems = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching lost items:', error);
    throw error;
  }
};