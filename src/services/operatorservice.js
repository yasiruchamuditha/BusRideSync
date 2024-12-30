import axiosInstance from '../utils/axiosInstance';

// Function to get bus details by NTC registration number
export const getBusDetails = async (busNtcRegNumber) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or another secure place
      const response = await axiosInstance.get(`/operator/ntc/${busNtcRegNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bus details:', error);
      throw error.response ? error.response.data : error;
    }
  };