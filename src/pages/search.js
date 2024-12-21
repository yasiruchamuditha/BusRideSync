import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchRoutes } from '../services/routeService'; // Import the service
import { fetchSchedules } from '../services/scheduleService'; // Import the service

export default function Search() {
  // State to hold the form data and results
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);

  // Router instance
  const router = useRouter();

  useEffect(() => {
    // Fetch route data from the API
    const fetchRouteData = async () => {
      try {
        const data = await fetchRoutes(); // Use the service to fetch routes

        // Extract unique cities from startCity and endCity
        const uniqueCities = Array.from(new Set([...data.map(route => route.startCity), ...data.map(route => route.endCity)]));
        setCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError(error.message);
      }
    };

    fetchRouteData();
  }, []);

  // Function to fetch schedules from the API
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchSchedules(startCity, destination, travelDate); // Use the service to fetch schedules
      console.log('Fetched data:', data); // Debug log
      setResults(data); // Set the results state with the fetched data
      setError(null); // Clear any previous error state
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.message); // Set error state with the error message
    }
  };

  // Function to handle reserve seat
  const handleReserveSeat = (route, departure, arrival, price) => {
    router.push({
      pathname: '/booking',
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
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex flex-wrap space-x-4 max-w-6xl w-full mt-6">
        <div className="flex flex-col flex-grow w-1/5">
          <label htmlFor="startCity" className="text-sm font-medium text-gray-700">
            From :
          </label>
          <select
            id="startCity"
            name="startCity"
            value={startCity}
            onChange={(e) => setStartCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-full"
            required
          >
            <option value="" disabled>Select :</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-grow w-1/5">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            To :
          </label>
          <select
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-full"
            required
          >
            <option value="" disabled>Select :</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-grow w-1/5">
          <label htmlFor="travelDate" className="text-sm font-medium text-gray-700">
            Travel Date
          </label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-full"
            required
          />
        </div>

        <div className="flex items-end flex-grow w-1/5">
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error message */}

      {results.length > 0 ? (
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
                  <td className="px-4 py-2">{result.busRouteType}</td>
                  <td className="px-4 py-2">{result.startCity}</td>
                  <td className="px-4 py-2">{result.endCity}</td>
                  <td className="px-4 py-2">{result.ticketPrice}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        handleReserveSeat(
                          result.busRouteType,
                          result.startCity,
                          result.endCity,
                          result.ticketPrice
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
      ) : (
        <div className="text-gray-700 mt-4">No results found.</div>
      )}
    </div>
  );
}