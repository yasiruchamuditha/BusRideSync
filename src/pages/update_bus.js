//src/pages/lagguage.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = 'http://localhost:5000/api/buses';

export default function UpdateBus() {
  const [buses, setBuses] = useState([]); // State to hold the list of buses
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

  const router = useRouter();

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

  const handleBusChange = (e) => {
    const selectedNtcRegNumber = e.target.value;
    if (selectedNtcRegNumber) {
      // Fetch bus details for the selected NTC registration number
      axiosInstance.get(`${BASE_URL}/${selectedNtcRegNumber}`)
        .then(response => {
          console.log('Fetched bus data:', response.data); // Debug log
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching bus data:', error);
          alert('Failed to fetch bus data.');
        });
    } else {
      setFormData({
        ntcRegNumber: '',
        conductorNtcRegNumber: '',
        driverNtcRegNumber: '',
        busNumber: '',
        capacity: '',
        busType: '',
        route: '',
        routeNo: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated form data to the server
      const response = await axiosInstance.put(`${BASE_URL}/${formData.ntcRegNumber}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Bus updated successfully!');
      console.log(response.data);

      // Redirect to the home page after successful submission
      router.push('/home');
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 500) {
        alert('Server error occurred. Please try again later.');
      } else {
        alert('Failed to update the bus. Please try again.');
      }
      console.error('Error updating the bus:', error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Update Bus</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Select Bus */}
        <div className="mb-4">
          <label htmlFor="busSelect" className="block text-sm font-medium text-gray-700">Select Bus</label>
          <select
            id="busSelect"
            name="ntcRegNumber"
            value={formData.ntcRegNumber}
            onChange={handleBusChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a bus</option>
            {buses.map((bus) => (
              <option key={bus.ntcRegNumber} value={bus.ntcRegNumber}>
                {bus.ntcRegNumber}
              </option>
            ))}
          </select>
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
          Update Bus
        </button>
      </form>
    </div>
  );
}