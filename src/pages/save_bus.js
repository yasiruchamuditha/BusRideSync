import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:5000/api/buses'; // URL to submit bus data
const ROUTES_URL = 'http://localhost:5000/api/routes'; // URL to fetch routes
const USERS_URL = 'http://localhost:5000/api/admin/operators'; // URL to fetch users

export default function RegisterBus() {
  const [formData, setFormData] = useState({
    ntcRegNumber: '',
    conductorNtcRegNumber: '',
    driverNtcRegNumber: '',
    busNumber: '',
    capacity: '50',// Default value
    busType: 'Normal', // Default value
    sector: 'Government [CTB]', // Default value
    route: '',
    routeNo: '',
    operator: '',
  });

  const [routes, setRoutes] = useState([]);// State to store routes
  const [users, setUsers] = useState([]); // State to store users

  const router = useRouter();

  useEffect(() => {
    // Fetch routes for the dropdown
    axiosInstance.get(ROUTES_URL)
      .then(response => setRoutes(response.data))
      .catch(error => console.error('Error fetching routes:', error));
    
    // Fetch users for the operator dropdown
    axiosInstance.get(USERS_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'route') {
      const selectedRoute = routes.find(route => route.routeName === value);
      setFormData({
        ...formData,
        [name]: value,
        routeNo: selectedRoute ? selectedRoute.routeNumber : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data using axiosInstance
      const response = await axiosInstance.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Bus submitted successfully!');
      console.log(response.data);

      // Redirect to the home page after successful submission
      router.push('/admin'); 
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Failed to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 500) {
        alert('Server error occurred. Please try again later.');
      } else {
        alert('Failed to submit the report. Please try again.');
      }
      console.error('Error submitting the report:', error);
      // Redirect to the home page after unsuccessful submission
      router.push('/admin'); 
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Register Bus</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* NTC Registration Number */}
        <div className="mb-4">
          <label htmlFor="ntcRegNumber" className="block text-sm font-medium text-gray-700">Bus NTC Registration Number</label>
          <input
            type="text"
            id="ntcRegNumber"
            name="ntcRegNumber"
            value={formData.ntcRegNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
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
          <select
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="Normal">Normal</option>
            <option value="Semi Luxury">Semi Luxury</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        {/* Sector */}
        <div className="mb-4">
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Sector</label>
          <select
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="Government [CTB]">Government [CTB]</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Route */}
        <div className="mb-4">
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
          <select
            id="route"
            name="route"
            value={formData.route || ''} // Use route name if available, else empty string
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route.routeName} value={route.routeName}>{route.routeName}</option>
            ))}
          </select>
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
            disabled // Disable the input field to prevent manual changes
          />
        </div>

        {/* Operator */}
        <div className="mb-4">
          <label htmlFor="operator" className="block text-sm font-medium text-gray-700">Operator</label>
          <select
            id="operator"
            name="operator"
            value={formData.operator}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select an Operator</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit Bus
        </button>
      </form>
    </div>
  );
}