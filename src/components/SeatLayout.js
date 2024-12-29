import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/SeatLayout.module.css'; // Import the new CSS file
import axiosInstance from '../utils/axiosInstance'; // Import Axios instance

const SeatLayout = ({ setSelectedSeats, selectedSeats }) => {
  const router = useRouter();
  const { scheduleId } = router.query;
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!scheduleId) return;

    axiosInstance.get(`/schedules/${scheduleId}/seats`)
      .then((response) => {
        setSeats(response.data);     
      })
      .catch((error) => {
        console.error('Error fetching seat layout:', error);
        setError('Failed to fetch seat layout. Please try again later.');
      });
  }, [scheduleId]);

  const handleSeatClick = (seat) => {
    console.log('Seat clicked', seat);
    const seatNumber = seat.seatNumber;
    setSelectedSeats(
      selectedSeats.includes(seatNumber)
        ? selectedSeats.filter((s) => s !== seatNumber)
        : [...selectedSeats, seatNumber]
    );

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.seatNumber === seatNumber ? { ...s, seatAvailableState: 'Processing' } : s
      )
    );
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div>
      <h2 className={styles.title}>Book Your Seats</h2>
      <div className={styles.busLayout}>
        <div className="flex gap-10 mt-5">
          <div className="flex flex-col gap-10">
            <SeatDisplay
              seatLayout={seats}
              handleSeatClick={handleSeatClick}
              startWith="Right"
            />
            <SeatDisplay
              seatLayout={seats}
              handleSeatClick={handleSeatClick}
              startWith="Left"
            />
          </div>
          <div>
            <SeatDisplay
              seatLayout={seats}
              handleSeatClick={handleSeatClick}
              startWith="Back"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Seat = ({ seat, handleSeatClick }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md w-14 h-14 border-2 ${
        seat.isBooked || seat.seatAvailableState === 'Booked'
          ? 'bg-red-500 cursor-not-allowed text-white'
          : seat.seatAvailableState === 'Processing'
          ? 'bg-green-400 cursor-not-allowed'
          : 'bg-transparent cursor-pointer text-black border-blue-400'
      }`}
      disabled={seat.seatAvailableState !== 'available'}
      onClick={() => !seat.isBooked && handleSeatClick(seat)}
    >
      <p className="text-[14px] font-bold">{seat.position.charAt(0)}-{seat.seatNumber}</p>
    </button>
  );
};

const SeatDisplay = ({ seatLayout, handleSeatClick, startWith }) => {
  // Group seats by their prefix (L1-1, L2, etc.)
  const groupedSeats =
    seatLayout
      ?.filter((seat) => seat.position.startsWith(startWith)) // Filter relevant seats
      ?.reduce((acc, seat) => {
        let prefix = null;
        if (startWith === 'Back') {
          prefix = seat.position.split('-')[0]; // Extract prefix (e.g., "L1")
        } else {
          prefix = seat.position.split('-')[1]; // Extract prefix (e.g., "L1")
        }
        if (!acc[prefix]) {
          acc[prefix] = [];
        }
        acc[prefix].push(seat);
        return acc;
      }, {}) || {}; // Fallback to an empty object

  // Convert the grouped seats object into an array of arrays (sorted by prefix)
  const seatColumns = Object.entries(groupedSeats)
    .sort(([a], [b]) => a.localeCompare(b)) // Sort by prefix (L1, L2, etc.)
    .map(([_, seats]) => seats);

  return (
    <div className={styles.seatColumnContainer}>
      {seatColumns.map((column, index) => (
        <div key={index} className={styles.seatColumn}>
          {column.map((seat) => (
            <Seat
              key={seat.seatNumber}
              seat={seat}
              handleSeatClick={handleSeatClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatLayout;