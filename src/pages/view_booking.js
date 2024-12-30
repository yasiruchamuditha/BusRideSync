import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';

// const BASE_URL = 'http://localhost:5000/api/booking';

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]); // State to hold the list of bookings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve token from cookies

        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(`/booking`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token'); // Retrieve token from cookies
      console.log('Deleting booking with ID:', id);
      console.log('Using token:', token);

      await axiosInstance.delete(`/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(bookings.filter(booking => booking._id !== id));
      alert('Booking deleted successfully.');
    } catch (error) {
      console.error('Error deleting booking:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        alert('Network error: No response received from the server.');
        console.error('Request details:', error.request);
      } else {
        alert('Error setting up the request.');
        console.error('Error message:', error.message);
      }
    }
  };

  const handleUpdate = () => {
    alert('This feature is under development.');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">View Bookings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300">User Name</th>
              {/* <th className="px-4 py-2 border-b-2 border-gray-300">User ID</th> */}
              <th className="px-4 py-2 border-b-2 border-gray-300">Schedule ID</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Amount</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Status</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Date</th>
              {/* <th className="px-4 py-2 border-b-2 border-gray-300">Transaction Reference</th> */}
              <th className="px-4 py-2 border-b-2 border-gray-300">Seats</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border-b border-gray-300">{booking.userId.name}</td>
                {/* <td className="px-4 py-2 border-b border-gray-300">{booking.userId}</td> */}
                <td className="px-4 py-2 border-b border-gray-300">{booking.scheduleId}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.paymentType}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.amount}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.paymentStatus}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(booking.paymentDate).toLocaleDateString()}</td>
                {/* <td className="px-4 py-2 border-b border-gray-300">{booking.transactionReference}</td> */}
                <td className="px-4 py-2 border-b border-gray-300">{booking.bookingSeats.join(', ')}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleUpdate(booking._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}