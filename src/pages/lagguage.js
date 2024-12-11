import { useState } from 'react';

export default function LuggageBooking() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    busNumber: '',
    route: '',
    startCity: '',
    destinationCity: '',
    luggageWeight: '',
    luggageType: '',
    specialNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    alert('Luggage booking submitted successfully!');
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Luggage Booking</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Personal Details */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Bus Details */}
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

        <div className="mb-4">
          <label htmlFor="startCity" className="block text-sm font-medium text-gray-700">Journey Start City</label>
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

        <div className="mb-4">
          <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700">Destination City</label>
          <input
            type="text"
            id="destinationCity"
            name="destinationCity"
            value={formData.destinationCity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Luggage Details */}
        <div className="mb-4">
          <label htmlFor="luggageWeight" className="block text-sm font-medium text-gray-700">Luggage Weight (in kg)</label>
          <input
            type="number"
            id="luggageWeight"
            name="luggageWeight"
            value={formData.luggageWeight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="luggageType" className="block text-sm font-medium text-gray-700">Luggage Type</label>
          <input
            type="text"
            id="luggageType"
            name="luggageType"
            value={formData.luggageType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="specialNotes" className="block text-sm font-medium text-gray-700">Special Notes</label>
          <textarea
            id="specialNotes"
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
