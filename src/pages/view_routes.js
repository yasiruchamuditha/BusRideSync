import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = 'http://localhost:5000/api/routes';

export default function RoutesList() {
  const [routes, setRoutes] = useState([]); // State to hold the list of routes

  useEffect(() => {
    // Fetch the list of routes
    axiosInstance.get(BASE_URL)
      .then(response => {
        setRoutes(response.data);
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
        alert('Failed to fetch routes.');
      });
  }, []);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}