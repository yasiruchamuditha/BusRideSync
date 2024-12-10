//search.js
import { useState } from 'react';

export default function Search() {
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [results, setResults] = useState([]);

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Simulating an API call for demonstration purposes
    const dummyResults = [
      {
        route: 'Route 1',
        departure: '10:00 AM',
        arrival: '12:00 PM',
        price: '$15',
      },
      {
        route: 'Route 2',
        departure: '2:00 PM',
        arrival: '4:00 PM',
        price: '$20',
      },
      {
        route: 'Route 3',
        departure: '6:00 PM',
        arrival: '8:00 PM',
        price: '$18',
      },
    ];

    // Filter results based on search inputs (you can enhance this logic as per your needs)
    setResults(dummyResults); // In a real app, this would be data from an API
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-start"> {/* Align content to the top */}
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex space-x-4 max-w-4xl w-full mt-4">
        {/* Start City Input */}
        <div className="flex flex-col w-full">
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Destination Input */}
        <div className="flex flex-col w-full">
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Date Picker */}
        <div className="flex flex-col w-full">
          <label htmlFor="travelDate" className="text-sm font-medium text-gray-700">
            Travel Date
          </label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full mt-4"
          >
            Search
          </button>
        </div>
      </form>

      {/* Table to Display Search Results */}
      {results.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-8">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left bg-green-500 text-white">Route</th>
                <th className="px-4 py-2 text-left bg-green-500 text-white">Departure</th>
                <th className="px-4 py-2 text-left bg-green-500 text-white">Arrival</th>
                <th className="px-4 py-2 text-left bg-green-500 text-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{result.route}</td>
                  <td className="px-4 py-2">{result.departure}</td>
                  <td className="px-4 py-2">{result.arrival}</td>
                  <td className="px-4 py-2">{result.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
