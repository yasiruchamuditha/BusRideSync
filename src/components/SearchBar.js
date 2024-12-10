//SearchBar.js
import { useState } from 'react';

export default function SearchBar() {
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // You can handle the search logic here, like calling an API with the search parameters
    alert(`Searching for buses from ${startCity} to ${destination} on ${travelDate}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex space-x-4">
        {/* Start City Input */}
        <div className="flex flex-col">
          <label htmlFor="startCity" className="text-sm font-medium text-gray-700">
            Start City
          </label>
          <input
            type="text"
            id="startCity"
            name="startCity"
            value={startCity}
            onChange={(e) => setStartCity(e.target.value)}
            placeholder="Enter Start City"
            className="w-60 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Destination Input */}
        <div className="flex flex-col">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter Destination"
            className="w-60 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Date Picker */}
        <div className="flex flex-col">
          <label htmlFor="travelDate" className="text-sm font-medium text-gray-700">
            Travel Date
          </label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
