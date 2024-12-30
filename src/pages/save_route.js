import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';

export default function CreateRoute() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    routeNumber: '',
    routeName: '',
    startCity: '',
    endCity: '',
    routeType: 'NormalWay', // Default value
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Submitting route with data:', formData);
      console.log('Using token:', token);
  
      const response = await axiosInstance.post(`/routes/add-manual`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      alert('Route saved successfully!');
      console.log(response.data);
      router.push('/admin');
  
      // Redirect or update UI after successful submission
    } 
    catch (error) {
      if (error.response && error.response.data) {
        setError('Route Registeration is Failed.Please try again.');
        // alert('Bus Registeration is Not Completed.Please try again.');
        router.push('/save_route');
        throw error.response.data;
        
      } else {
        setError('Route Registeration is Failed.Please try again.');
        // alert('Bus Registeration is Not Completed.Please try again.Failed to submit the report. Please try again.');
        router.push('/save_route');
        throw { message: "An unexpected error occurred" };
      }
       
    } 
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Create New Route</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error message */}
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
            <option value="NormalWay">NormalWay</option>
            <option value="ExpressWay">ExpressWay</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Create Route
        </button>
      </form>
    </div>
  );
}