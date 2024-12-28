//src/pages/search.js
import { useState, useEffect } from 'react';                  // Import the useState and useEffect hooks
import { useRouter } from 'next/router';                      // Import the useRouter hook
import { fetchRoutes } from '../services/routeService';       // Import the service
import { fetchSchedules } from '../services/scheduleService'; // Import the service
import BusCard from '../components/BusCard';                  // Import the BusCard component

// Search component
export default function Search() {
  // State to hold the form data and results
  const [startCity, setStartCity] = useState('');                 // State to hold the start city 
  const [destination, setDestination] = useState('');             // State to hold the destination city
  const [departureDate, setDepartureDate] = useState('');         // State to hold the departure date
  const [results, setResults] = useState([]);                     // State to hold the search results
  const [error, setError] = useState(null);                       // State to hold the error message
  const [cities, setCities] = useState([]);                       // State to hold the list of cities  

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
      const data = await fetchSchedules(startCity, destination, departureDate); // Use the service to fetch schedules
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
      pathname: '/seatReservation',
      query: {
        route,
        departure,
        arrival,
        price,
        startCity,
        destination,
        departureDate,
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
          <label htmlFor="departureDate" className="text-sm font-medium text-gray-700">
            Travel Date
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
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
        <div className="w-full max-w-6xl mx-auto mt-8">
          {results.map((result, index) => (
            <BusCard key={index} bus={result} handleReserveSeat={handleReserveSeat} />
          ))}
        </div>
      ) : (
        <div className="text-gray-700 mt-4">No results found.</div>
      )}
    </div>
  );
}