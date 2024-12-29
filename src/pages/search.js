// src/pages/search.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchRoutes } from '../services/routeService';
import { fetchSchedules } from '../services/scheduleService';
import BusCard from '../components/BusCard';

export default function Search() {
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const data = await fetchRoutes();
        const uniqueCities = Array.from(new Set([...data.map(route => route.startCity), ...data.map(route => route.endCity)]));
        setCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError(error.message);
      }
    };
    fetchRouteData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchSchedules(startCity, destination, departureDate);
      console.log('Fetched data:', data);
      setResults(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.message);
    }
  };

  const handleReserveSeat = (scheduleId) => {
    router.push({
      pathname: '/seatReservation',
      query: { scheduleId },
    });
    console.log('Reserve seat for schedule ID:', scheduleId);
  };

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex flex-wrap space-x-4 max-w-6xl w-full mt-6">
        {/* Form Fields */}
        <div className="flex flex-col flex-grow w-1/5">
          <label htmlFor="startCity" className="text-sm font-medium text-gray-700">From :</label>
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
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">To :</label>
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
          <label htmlFor="departureDate" className="text-sm font-medium text-gray-700">Travel Date</label>
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
            <BusCard key={index} bus={result} handleReserveSeat={() => handleReserveSeat(result._id)} />
          ))}
        </div>
      ) : (
        <div className="text-gray-700 mt-4">No results found.</div>
      )}
    </div>
  );
}