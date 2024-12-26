import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router'; // Import useRouter hook

const BASE_URL = 'http://localhost:5000/api/buses';

export default function RegisterBus() {
  const [formData, setFormData] = useState({
    ntcRegNumber: '',
    conductorNtcRegNumber: '',
    driverNtcRegNumber: '',
    busNumber: '',
    capacity: '',
    busType: '',
    route: '',
    routeNo: '',
  });

  const router = useRouter(); // Initialize useRouter hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data using axiosInstance
      const response = await axiosInstance.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Bus submitted successfully!');
      console.log(response.data);

      // Redirect to the home page after successful submission
      router.push('/admin'); 
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 500) {
        alert('Server error occurred. Please try again later.');
      } else {
        alert('Failed to submit the report. Please try again.');
      }
      console.error('Error submitting the report:', error);
      // Redirect to the home page after unsuccessful submission
      router.push('/admin'); 
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Register Bus</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* NTC Registration Number */}
        <div className="mb-4">
          <label htmlFor="ntcRegNumber" className="block text-sm font-medium text-gray-700">NTC Registration Number</label>
          <input
            type="text"
            id="ntcRegNumber"
            name="ntcRegNumber"
            value={formData.ntcRegNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Conductor's NTC Registration Number */}
        <div className="mb-4">
          <label htmlFor="conductorNtcRegNumber" className="block text-sm font-medium text-gray-700">Conductor&apos;s NTC Registration Number</label>
          <input
            type="text"
            id="conductorNtcRegNumber"
            name="conductorNtcRegNumber"
            value={formData.conductorNtcRegNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Driver's NTC Registration Number */}
        <div className="mb-4">
          <label htmlFor="driverNtcRegNumber" className="block text-sm font-medium text-gray-700">Driver&apos;s NTC Registration Number</label>
          <input
            type="text"
            id="driverNtcRegNumber"
            name="driverNtcRegNumber"
            value={formData.driverNtcRegNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Bus Number */}
        <div className="mb-4">
          <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">Bus Number</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="1"
          />
        </div>

        {/* Bus Type */}
        <div className="mb-4">
          <label htmlFor="busType" className="block text-sm font-medium text-gray-700">Bus Type</label>
          <input
            type="text"
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Route */}
        <div className="mb-4">
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
          <input
            type="text"
            id="route"
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Route Number */}
        <div className="mb-4">
          <label htmlFor="routeNo" className="block text-sm font-medium text-gray-700">Route Number</label>
          <input
            type="text"
            id="routeNo"
            name="routeNo"
            value={formData.routeNo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit Bus
        </button>
      </form>
    </div>
  );
}