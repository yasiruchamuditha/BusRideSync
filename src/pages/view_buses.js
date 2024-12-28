//src/pages/view_buses.js
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = 'http://localhost:5000/api/buses';

export default function ViewBuses() {
  const [buses, setBuses] = useState([]); // State to hold the list of buses

  useEffect(() => {
    // Fetch the list of buses
    axiosInstance.get(BASE_URL)
      .then(response => {
        setBuses(response.data);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
        alert('Failed to fetch buses.');
      });
  }, []);

  const handleDelete = async (ntcRegNumber) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Deleting bus with NTC Reg Number:', ntcRegNumber);
      console.log('Using token:', token);

      await axiosInstance.delete(`${BASE_URL}/${ntcRegNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setBuses(buses.filter(bus => bus.ntcRegNumber !== ntcRegNumber));
      alert('Bus deleted successfully.');
    } catch (error) {
      console.error('Error deleting bus:', error);
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
      <h2 className="text-3xl font-bold text-green-700 mb-6">View Buses</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300">NTC Registration Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Conductor&apos;s NTC Registration Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Driver&apos;s NTC Registration Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Operator</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Bus Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Capacity</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Bus Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Sector</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.ntcRegNumber}>
                <td className="px-4 py-2 border-b border-gray-300">{bus.ntcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.conductorNtcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.driverNtcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.operator ? bus.operator.name : 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.busNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.capacity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.busType}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.sector}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.route}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.routeNo}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleUpdate(bus.ntcRegNumber)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bus.ntcRegNumber)}
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