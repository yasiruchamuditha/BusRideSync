//src/pages/lagguage.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const BASE_URL = '/api/schedules';

export default function UpdateSchedule() {
  const router = useRouter();
  const { id } = router.query;
  const [schedule, setSchedule] = useState(null);
  const [formData, setFormData] = useState({
    busId: '',
    busRouteType: '',
    startCity: '',
    departureDate: '',
    departureTime: '',
    endCity: '',
    arrivalDate: '',
    arrivalTime: '',
    estimatedTime: '',
    estimatedDistance: '',
    availableSeats: ''
  });

  useEffect(() => {
    if (id) {
      // Fetch the schedule details
      axios.get(`${BASE_URL}/${id}`)
        .then(response => {
          setSchedule(response.data);
          setFormData({
            busId: response.data.busId,
            busRouteType: response.data.busRouteType,
            startCity: response.data.startCity,
            departureDate: response.data.departureDate,
            departureTime: response.data.departureTime,
            endCity: response.data.endCity,
            arrivalDate: response.data.arrivalDate,
            arrivalTime: response.data.arrivalTime,
            estimatedTime: response.data.estimatedTime,
            estimatedDistance: response.data.estimatedDistance,
            availableSeats: response.data.availableSeats
          });
        })
        .catch(error => {
          console.error('Error fetching schedule:', error);
          alert('Failed to fetch schedule.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/${id}`, formData);
      alert('Schedule updated successfully.');
      router.push('/schedules');
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('Failed to update schedule.');
    }
  };

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Update Schedule</h2>
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Bus ID</label>
          <input
            type="text"
            name="busId"
            value={formData.busId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bus Route Type</label>
          <input
            type="text"
            name="busRouteType"
            value={formData.busRouteType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update Schedule</button>
      </form>
    </div>
  );
}