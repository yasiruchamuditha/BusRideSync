//src/pages/view_schedules.js
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

// const BASE_URL = 'http://localhost:5000/api/schedules';

export default function ViewSchedules() {
  const [schedules, setSchedules] = useState([]); // State to hold the list of schedules

  useEffect(() => {
    // Fetch the list of schedules
    axiosInstance.get(`/schedules`)
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
        alert('Failed to fetch schedules.');
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/schedules/${id}`);
      setSchedules(schedules.filter(schedule => schedule._id !== id));
      alert('Schedule deleted successfully.');
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule.');
    }
  };

  const handleUpdate = async (id) => {
    // Implement the logic for handling the update
    // For simplicity, you can redirect to an update form or open a modal with the existing schedule details
    alert('Update functionality is not yet implemented.',id);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">View Schedules</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full overflow-x-auto">
        <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-300">Bus Number</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Route</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Bus Route Type</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Bus Route Way</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Start City</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Departure Date</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Departure Time</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">End City</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Arrival Date</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Arrival Time</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Estimated Time</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Estimated Distance</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Available Seats</th>
            <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule._id}>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.busId ? schedule.busId.busNumber : 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.route ? schedule.route.routeName : 'N/A'}</td> 
                <td className="px-4 py-2 border-b border-gray-300">{schedule.busRouteType}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.routeWay}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.startCity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(schedule.departureDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.departureTime}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.endCity}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(schedule.arrivalDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.arrivalTime}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.estimatedTime}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.estimatedDistance}</td>
                <td className="px-4 py-2 border-b border-gray-300">{schedule.availableSeats}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleUpdate(schedule._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
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