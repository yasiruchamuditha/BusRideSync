import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';

export default function Search() {
  const [busNtcRegNumber, setBusNtcRegNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get('/schedules/searchbus', {
        params: { busNtcRegNumber, departureDate },
      });
      setResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleReserveSeat = (scheduleId) => {
    router.push({
      pathname: '/seatReservation',
      query: { scheduleId },
    });
  };

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md flex flex-wrap space-x-4 max-w-4xl w-full mt-6">
        {/* Bus NTC Registration Number */}
        <div className="flex flex-col flex-grow w-1/3">
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
        <div className="flex flex-col flex-grow w-1/3">
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

        <div className="flex items-end flex-grow w-1/3">
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
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="bg-gray-100 border-b">
                  <td className="px-4 py-2">{result.busNtcRegNumber}</td>
                  <td className="px-4 py-2">{result.route.routeName}</td>
                  <td className="px-4 py-2">{result.startCity}</td>
                  <td className="px-4 py-2">{result.endCity}</td>
                  <td className="px-4 py-2">{result.departureDate}</td>
                  <td className="px-4 py-2">{result.departureTime}</td>
                  <td className="px-4 py-2">{result.arrivalDate}</td>
                  <td className="px-4 py-2">{result.arrivalTime}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleReserveSeat(result._id)}
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