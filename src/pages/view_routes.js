//src/pages/view_routes.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/routes';

export default function RoutesList() {
  const [routes, setRoutes] = useState([]); // State to hold the list of routes

  useEffect(() => {
    // Fetch the list of routes
    axiosInstance.get(`/routes`)
      .then(response => {
        setRoutes(response.data);
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
        alert('Failed to fetch routes.');
      });
  }, []);

  const handleDelete = async (routeId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Deleting route with ID:', routeId);
      console.log('Using token:', token);
  
      const response = await axiosInstance.delete(`/routes/${routeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setRoutes(routes.filter(route => route._id !== routeId));
      alert('Route deleted successfully.');
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting route:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        alert('Network error: No response received from the server.');
        console.error('Request details:', error.request);
      } else {
        alert('Error setting up the request.');
        console.error('Error message:', error.message);
      }
    }
  };

  const handleUpdate = () => {
    alert('This feature is under development.');
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Routes List</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Start City</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">End City</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td className="px-4 py-2 border-b border-gray-300">{route.routeNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{route.routeName}</td>
                <td className="px-4 py-2 border-b border-gray-300">{route.startCity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{route.endCity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{route.routeType}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleUpdate(route._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(route._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}