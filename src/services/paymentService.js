import axiosInstance from '../utils/axiosInstance';

// Define and export the processPayment function
export const processPayment = async (paymentData, token) => {
  try {
    const response = await axiosInstance.post('/payment', paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Failed to process payment');
  }
};