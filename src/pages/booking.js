import { useState, useEffect } from 'react';

export default function Booking() {
  // Simulating user booking data (this should ideally come from an API or database)
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Simulate fetching booking data
    const dummyBookingData = {
      seatDetails: 'Left Side-2',
      startCity: 'Colombo',
      endCity: 'Kandy',
      timeTaken: '3 Hours',
      busRegistrationNo: '1234ABC',
      ntcRegistrationNo: 'NTC56789',
      numberOfSeats: 2,
      bookedDate: '2024-12-09',
      bookedTime: '08:00 AM',
      paymentStatus: 'Paid',
    };

    // Set booking details (in a real app, you would fetch this data from an API)
    setBookingDetails(dummyBookingData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">User Booking Details</h2>

      {/* Display booking details if available */}
      {bookingDetails ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card: Seat Details */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Seat Details</h3>
              <p className="text-lg text-gray-900">{bookingDetails.seatDetails}</p>
            </div>

            {/* Card: Start City */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Start City</h3>
              <p className="text-lg text-gray-900">{bookingDetails.startCity}</p>
            </div>

            {/* Card: End City */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">End City</h3>
              <p className="text-lg text-gray-900">{bookingDetails.endCity}</p>
            </div>

            {/* Card: Time Taken */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Time Taken</h3>
              <p className="text-lg text-gray-900">{bookingDetails.timeTaken}</p>
            </div>

            {/* Card: Bus Registration No */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Bus Registration No.</h3>
              <p className="text-lg text-gray-900">{bookingDetails.busRegistrationNo}</p>
            </div>

            {/* Card: NTC Registration No */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">NTC Registration No.</h3>
              <p className="text-lg text-gray-900">{bookingDetails.ntcRegistrationNo}</p>
            </div>

            {/* Card: Number of Seats */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Number of Seats</h3>
              <p className="text-lg text-gray-900">{bookingDetails.numberOfSeats}</p>
            </div>

            {/* Card: Booked Date */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Booked Date</h3>
              <p className="text-lg text-gray-900">{bookingDetails.bookedDate}</p>
            </div>

            {/* Card: Booked Time */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Booked Time</h3>
              <p className="text-lg text-gray-900">{bookingDetails.bookedTime}</p>
            </div>

            {/* Card: Payment Status */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-700">Payment Status</h3>
              <p className={`text-lg ${bookingDetails.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                {bookingDetails.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}
