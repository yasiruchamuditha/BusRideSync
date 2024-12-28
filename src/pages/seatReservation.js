
//src/pages/seatReservation.js
import React from 'react';
import { useRouter } from 'next/router';
import BusCard from '../components/BusCard';
import SeatLayout from '../components/SeatLayout';

const SeatReservation = () => {
  const router = useRouter();
  const {
    route,
    departure,
    arrival,
    price,
    startCity,
    destination,
    departureDate,
  } = router.query;

  // Mock bus data for demonstration purposes
  const bus = {
    route,
    departureTime: departure,
    arrivalTime: arrival,
    ticketPrice: price,
    startCity,
    endCity: destination,
    departureDate,
  };

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-6">
        <h1 className="text-2xl font-bold mb-6">Seat Reservation</h1>
        <BusCard bus={bus} handleReserveSeat={() => {}} />
        <SeatLayout />
      </div>
    </div>
  );
};

export default SeatReservation;