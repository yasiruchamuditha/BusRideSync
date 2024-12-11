import { useState } from 'react';

export default function MyLuggageBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'John Doe',
      contact: '1234567890',
      email: 'john@example.com',
      busNumber: 'ABC123',
      route: 'Colombo to Kandy',
      startCity: 'Colombo',
      destinationCity: 'Kandy',
      luggageWeight: '20kg',
      luggageType: 'Suitcase',
      specialNotes: 'Handle with care',
    },
    {
      id: 2,
      name: 'Jane Smith',
      contact: '9876543210',
      email: 'jane@example.com',
      busNumber: 'XYZ456',
      route: 'Galle to Colombo',
      startCity: 'Galle',
      destinationCity: 'Colombo',
      luggageWeight: '15kg',
      luggageType: 'Backpack',
      specialNotes: 'Fragile items',
    },
  ]);

  const handleCancel = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    alert('Booking canceled successfully!');
  };

  const handleUpdate = (id) => {
    alert(`Update functionality for booking ID ${id} is not implemented yet.`);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Luggage Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold text-green-600 mb-2">{booking.name}</h3>
            <p className="text-gray-600">Contact: {booking.contact}</p>
            <p className="text-gray-600">Email: {booking.email}</p>
            <p className="text-gray-600">Bus Number: {booking.busNumber}</p>
            <p className="text-gray-600">Route: {booking.route}</p>
            <p className="text-gray-600">Start City: {booking.startCity}</p>
            <p className="text-gray-600">Destination City: {booking.destinationCity}</p>
            <p className="text-gray-600">Luggage Weight: {booking.luggageWeight}</p>
            <p className="text-gray-600">Luggage Type: {booking.luggageType}</p>
            <p className="text-gray-600">Special Notes: {booking.specialNotes}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleCancel(booking.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(booking.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
