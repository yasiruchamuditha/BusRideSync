import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        const id = localStorage.getItem('id'); // Retrieve user ID
        console.log('userId', id);
        console.log('token', token);

        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        if (!id) {
          setError('No user ID found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(`/commuter/booking/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleContactAdmin = (booking) => {
    const adminEmail = 'prcaretest@gmail.com';
    const subject = `Inquiry about canceling booking: ${booking._id}`;
    const body = `Hello Admin,\n\nI would like to inquire about canceling the booking with the following details:\n\nBooking ID: ${booking._id}\nRoute: ${booking.scheduleId.route.routeName}\nPayment Type: ${booking.paymentType}\nAmount: ${booking.amount}\nPayment Status: ${booking.paymentStatus}\nPayment Date: ${new Date(booking.paymentDate).toLocaleDateString()}\nSeat Numbers: ${booking.bookingSeats.join(', ')}\n\nThank you.`;
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">My Bookings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300">Booking ID</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Route</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Amount</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Status</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Payment Date</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Seat Numbers</th>
              <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border-b border-gray-300">{booking._id}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.scheduleId.route.routeName}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.paymentType}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.amount}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.paymentStatus}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(booking.paymentDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking.bookingSeats.join(', ')}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleContactAdmin(booking)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Contact Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookings;