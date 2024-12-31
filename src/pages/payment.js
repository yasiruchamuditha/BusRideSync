import React from 'react';
import { useRouter } from 'next/router';
import PaymentGateWay from '../components/PaymentGateWay';
import Cookies from 'js-cookie';

const Payment = () => {
  const router = useRouter();
  const {
    scheduleId,
    departure,
    arrival,
    price,
    startCity,
    destination,
    departureDate,
    selectedSeats,
    totalPrice,
  } = router.query;

  const token = Cookies.get('token'); // Retrieve token from cookies

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-6">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>
        <div className="mb-4">
          <p><strong>Route:</strong> {scheduleId}</p>
          <p><strong>Departure Time:</strong> {departure}</p>
          <p><strong>Arrival Time:</strong> {arrival}</p>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Start City:</strong> {startCity}</p>
          <p><strong>Destination:</strong> {destination}</p>
          <p><strong>Departure Date:</strong> {departureDate}</p>
          <p><strong>Selected Seats:</strong> {selectedSeats}</p>
          <p><strong>Total Price (including tax):</strong> Rs.{totalPrice}</p>
        </div>
        <PaymentGateWay
       totalAmount={totalPrice}
      selectedSeats={selectedSeats ? selectedSeats.split(',') : []}
      scheduleId={scheduleId}
    token={token}
/>

      </div>
    </div>
  );
};

export default Payment;