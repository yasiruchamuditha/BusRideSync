//src/pages/save_schedule.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the path as necessary
import { useRouter } from 'next/router';

// const BASE_URL = 'http://localhost:5000/api/schedules';
// const BUSES_URL = 'http://localhost:5000/api/buses';
// const ROUTES_URL = 'http://localhost:5000/api/routes';

export default function CreateSchedule() {
  const [formData, setFormData] = useState({
    busId: '',
    route: '',
    busRouteType: '',
    routeWay: '',
    startCity: '',
    departureDate: '',
    departureTime: '',
    endCity: '',
    arrivalTime: '',
    arrivalDate: '',
    estimatedTime: '',
    estimatedDistance: '',
    ticketPrice: '',
    availableSeats: 50,
    seatLayout: [],
  });

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch buses and routes for the dropdowns
    axiosInstance.get(`/buses`)
      .then(response => setBuses(response.data))
      .catch(error => console.error('Error fetching buses:', error));

    axiosInstance.get(`/routes`)
      .then(response => setRoutes(response.data))
      .catch(error => console.error('Error fetching routes:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data using axiosInstance
      const response = await axiosInstance.post(`/schedules`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Schedule created successfully!');
      console.log(response.data);
      router.push('/admin');
      
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 500) {
        alert('Server error occurred. Please try again later.');
      } else {
        alert('Failed to submit the schedule. Please try again.');
      }
      console.error('Error submitting the schedule:', error);
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Create Schedule</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Bus ID */}
        <div className="mb-4">
          <label htmlFor="busId" className="block text-sm font-medium text-gray-700">Bus</label>
          <select
            id="busId"
            name="busId"
            value={formData.busId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>{bus.busNumber}</option>
            ))}
          </select>
        </div>

        {/* Route */}
        <div className="mb-4">
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
          <select
            id="route"
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>{route.routeName}</option>
            ))}
          </select>
        </div>

        {/* Bus Route Type */}
        <div className="mb-4">
          <label htmlFor="busRouteType" className="block text-sm font-medium text-gray-700">Bus Route Type</label>
          <select
            id="busRouteType"
            name="busRouteType"
            value={formData.busRouteType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Route Type</option>
            <option value="Normal">Normal</option>
            <option value="Semi Luxury">Semi Luxury</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

             {/* Bus routeWay */}
             <div className="mb-4">
          <label htmlFor="routeWay" className="block text-sm font-medium text-gray-700">Route Way</label>
          <select
            id="routeWay"
            name="routeWay"
            value={formData.routeWay}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Route Way</option>
            <option value="NormalWay">NormalWay</option>
            <option value="ExpressWay">ExpressWay</option>
          </select>
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

        {/* Departure Date */}
        <div className="mb-4">
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Departure Time */}
        <div className="mb-4">
          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Departure Time</label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
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

        {/* Arrival Time */}
        <div className="mb-4">
          <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">Arrival Time</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Arrival Date */}
        <div className="mb-4">
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">Arrival Date</label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Estimated Time */}
        <div className="mb-4">
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">Estimated Time</label>
          <input
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Estimated Distance */}
        <div className="mb-4">
          <label htmlFor="estimatedDistance" className="block text-sm font-medium text-gray-700">Estimated Distance</label>
          <input
            type="text"
            id="estimatedDistance"
            name="estimatedDistance"
            value={formData.estimatedDistance}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Ticket Price */}
        <div className="mb-4">
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">Ticket Price</label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0"
          />
        </div>

        {/* Available Seats */}
        <div className="mb-4">
          <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">Available Seats</label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create Schedule
        </button>
      </form>
    </div>
  );
}