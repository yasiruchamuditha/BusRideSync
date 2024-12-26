import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:5000/api/routes/add-manual';

export default function CreateRoute() {
  const [formData, setFormData] = useState({
    routeNumber: '',
    routeName: '',
    startCity: '',
    endCity: '',
    routeType: 'Normal',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the server
      const response = await axiosInstance.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Route created successfully!');
      console.log(response.data);

      // Redirect to the routes list page after successful submission
      router.push('/admin');
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 404) {
        alert('The requested resource was not found. Please check the endpoint URL.');
      } else if (error.response && error.response.status === 500) {
        alert('Server error occurred. Please try again later.');
      } else {
        alert('Failed to create the route. Please try again.');
      }
      console.error('Error creating the route:', error);
        // Redirect to the routes list page after successful submission
        router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Create New Route</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Route Number */}
        <div className="mb-4">
          <label htmlFor="routeNumber" className="block text-sm font-medium text-gray-700">Route Number</label>
          <input
            type="text"
            id="routeNumber"
            name="routeNumber"
            value={formData.routeNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Route Name */}
        <div className="mb-4">
          <label htmlFor="routeName" className="block text-sm font-medium text-gray-700">Route Name</label>
          <input
            type="text"
            id="routeName"
            name="routeName"
            value={formData.routeName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Start City */}
        <div className="mb-4">
          <label htmlFor="startCity" className="block text-sm font-medium text-gray-700">Start City</label>
          <input
            type="text"
            id="startCity"
            name="startCity"
            value={formData.startCity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* End City */}
        <div className="mb-4">
          <label htmlFor="endCity" className="block text-sm font-medium text-gray-700">End City</label>
          <input
            type="text"
            id="endCity"
            name="endCity"
            value={formData.endCity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Route Type */}
        <div className="mb-4">
          <label htmlFor="routeType" className="block text-sm font-medium text-gray-700">Route Type</label>
          <select
            id="routeType"
            name="routeType"
            value={formData.routeType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="Normal">Normal</option>
            <option value="Expressway">Expressway</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Create Route
        </button>
      </form>
    </div>
  );
}