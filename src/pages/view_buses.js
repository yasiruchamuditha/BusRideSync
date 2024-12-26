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
              <th className="px-4 py-2 border-b-2 border-gray-300">Bus Number</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Capacity</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Bus Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route Number</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.ntcRegNumber}>
                <td className="px-4 py-2 border-b border-gray-300">{bus.ntcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.conductorNtcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.driverNtcRegNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.busNumber}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.capacity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.busType}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.route}</td>
                <td className="px-4 py-2 border-b border-gray-300">{bus.routeNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}