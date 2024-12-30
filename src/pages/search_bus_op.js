import { useState } from 'react';
import { getBusDetails } from '../services/operatorservice';
import { searchSchedules } from '../services/operatorServices';

export default function Search() {
  const [busNtcRegNumber, setBusNtcRegNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Get busId from busNtcRegNumber
      const busData = await getBusDetails(busNtcRegNumber);
      const busId = busData._id;
      console.log('Bus:', busData);
      console.log('busId:', busId);
      console.log('departureDate:', departureDate);

      // Step 2: Use busId and departureDate to search for schedules
      const scheduleData = await searchSchedules(busId, departureDate);
      setResults(scheduleData);
      console.log('Schedules:', scheduleData);
      console.log('departureDate:', departureDate);
      setError(null);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex flex-wrap space-x-4 max-w-4xl w-full mt-6">
        <div className="flex flex-row w-full justify-between items-end space-x-4">
          {/* Bus NTC Registration Number */}
          <div className="flex flex-col flex-grow">
            <label htmlFor="busNtcRegNumber" className="text-sm font-medium text-gray-700">Bus NTC Reg Number</label>
            <input
              type="text"
              id="busNtcRegNumber"
              name="busNtcRegNumber"
              value={busNtcRegNumber}
              onChange={(e) => setBusNtcRegNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-full"
              required
            />
          </div>

          {/* Departure Date */}
          <div className="flex flex-col flex-grow">
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

          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error message */}

      {results.length > 0 ? (
        <div className="w-full max-w-6xl mx-auto mt-8">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Bus NTC Reg Number</th>
                <th className="px-4 py-2">Route</th>
                <th className="px-4 py-2">Start City</th>
                <th className="px-4 py-2">End City</th>
                <th className="px-4 py-2">Departure Date</th>
                <th className="px-4 py-2">Departure Time</th>
                <th className="px-4 py-2">Arrival Date</th>
                <th className="px-4 py-2">Arrival Time</th>
                <th className="px-4 py-2">Schedule Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="bg-gray-100 border-b">
                  <td className="px-4 py-2">{busNtcRegNumber}</td>
                  <td className="px-4 py-2">{result.route.routeName}</td>
                  <td className="px-4 py-2">{result.startCity}</td>
                  <td className="px-4 py-2">{result.endCity}</td>
                  <td className="px-4 py-2">{result.departureDate}</td>
                  <td className="px-4 py-2">{result.departureTime}</td>
                  <td className="px-4 py-2">{result.arrivalDate}</td>
                  <td className="px-4 py-2">{result.arrivalTime}</td>
                  <td className="px-4 py-2">{result.departureDate}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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