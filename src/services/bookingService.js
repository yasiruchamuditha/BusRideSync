import axiosInstance from '../utils/axiosInstance';

export const processBooking = async (bookingData, token) => {
  try {
    const response = await axiosInstance.post('/booking', bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to create booking');
  }
};

