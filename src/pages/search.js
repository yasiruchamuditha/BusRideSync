import { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter for navigation

export default function Search() {
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [results, setResults] = useState([]);

  const router = useRouter();  // Initialize useRouter to manage routing

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']; // Example city options

  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startCity,
          endCity: destination,
          date: travelDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  // Navigate to the booking page and pass route data as query parameters
  const handleReserveSeat = (route, departure, arrival, price) => {
    router.push({
      pathname: '/booking',  // Replace with your booking page route
      query: {
        route,
        departure,
        arrival,
        price,
        startCity,
        destination,
        travelDate,
      },
    });
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-start"> {/* Align content to the top */}
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex space-x-4 max-w-4xl w-full mt-4">
        {/* Start City Select */}
        <div className="flex flex-col w-full">
          <label htmlFor="startCity" className="text-sm font-medium text-gray-700">
            Start City
          </label>
          <select
            id="startCity"
            name="startCity"
            value={startCity}
            onChange={(e) => setStartCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>Select Start City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Destination Select */}
        <div className="flex flex-col w-full">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <select
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>Select Destination</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
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
                <th className="px-4 py-2 text-left bg-green-500 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{result.route}</td>
                  <td className="px-4 py-2">{result.departure}</td>
                  <td className="px-4 py-2">{result.arrival}</td>
                  <td className="px-4 py-2">{result.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        handleReserveSeat(
                          result.route,
                          result.departure,
                          result.arrival,
                          result.price
                        )
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Reserve Seat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
