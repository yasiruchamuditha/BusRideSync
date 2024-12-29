// src/pages/seatReservation.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BusCardNoReserve from '../components/BusCardNoReserve';
import SeatLayout from '../components/SeatLayout';
import { fetchBusDetails } from '../services/busService'; // Import the service to fetch bus details

const SeatReservation = () => {
  const router = useRouter();
  const { scheduleId } = router.query; // Get the schedule ID from the query

  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (scheduleId) {
      const fetchBusData = async () => {
        try {
          const busData = await fetchBusDetails(scheduleId); // Fetch bus details using the schedule ID
          setBus(busData);
        } catch (error) {
          console.error('Error fetching bus details:', error);
        }
      };
      fetchBusData();
    }
  }, [scheduleId]);

  const handleProceedToPayment = () => {
    const totalPrice = bus.ticketPrice * selectedSeats.length;
    const tax = totalPrice * 0.05;
    const finalPrice = totalPrice + tax;

    router.push({
      pathname: '/payment',
      query: {
        scheduleId,
        selectedSeats: selectedSeats.join(','),
        totalPrice: finalPrice.toFixed(2),
      },
    });
  };

  if (!bus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-green-200 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl mt-6">
        <h1 className="text-2xl font-bold mb-6">Seat Reservation</h1>
        <BusCardNoReserve bus={bus} />
        <SeatLayout fare={bus.ticketPrice} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
        <div className="w-full flex justify-end mt-4">
          <button
            onClick={handleProceedToPayment}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatReservation;