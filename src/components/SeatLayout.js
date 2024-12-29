import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/SeatLayout.module.css';
import axiosInstance from '../utils/axiosInstance'; // Import Axios instance

const SeatLayout = ({ selectedSeats, setSelectedSeats }) => {
  const router = useRouter();
  const { scheduleId } = router.query;
  const [seats, setSeats] = useState({});
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

  const handleSeatClick = (seatId) => {
    if (seats[seatId]?.isBooked) return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(newSelectedSeats);

    setSeats((prevSeats) => ({
      ...prevSeats,
      [seatId]: { ...prevSeats[seatId], seatAvailableState: 'processing' },
    }));
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div>
      <h2 className={styles.title}>Book Your Seats</h2>
      <div className={styles.busLayout}>
        {/* Left Section */}
        <div className={styles.section}>
          {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((row) => (
            <div key={row} className={styles.row}>
              <button
                className={`${styles.seat} ${
                  seats[`${row}L1`]?.isBooked ? styles.booked :
                  seats[`${row}L1`]?.seatAvailableState === "processing" ? styles.processing : styles.available
                }`}
                onClick={() => handleSeatClick(`${row}L1`)}
                disabled={seats[`${row}L1`]?.isBooked}
              >
                {row}L1
              </button>
              <button
                className={`${styles.seat} ${
                  seats[`${row}L2`]?.isBooked ? styles.booked :
                  seats[`${row}L2`]?.seatAvailableState === "processing" ? styles.processing : styles.available
                }`}
                onClick={() => handleSeatClick(`${row}L2`)}
                disabled={seats[`${row}L2`]?.isBooked}
              >
                {row}L2
              </button>
            </div>
          ))}
        </div>

        {/* Spacer between left and right sections */}
        <div className={styles.spacer}></div>

        {/* Right Section */}
        <div className={styles.section}>
          {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((row) => (
            <div key={row} className={styles.row}>
              <button
                className={`${styles.seat} ${
                  seats[`${row}R1`]?.isBooked ? styles.booked :
                  seats[`${row}R1`]?.seatAvailableState === "processing" ? styles.processing : styles.available
                }`}
                onClick={() => handleSeatClick(`${row}R1`)}
                disabled={seats[`${row}R1`]?.isBooked}
              >
                {row}R1
              </button>
              <button
                className={`${styles.seat} ${
                  seats[`${row}R2`]?.isBooked ? styles.booked :
                  seats[`${row}R2`]?.seatAvailableState === "processing" ? styles.processing : styles.available
                }`}
                onClick={() => handleSeatClick(`${row}R2`)}
                disabled={seats[`${row}R2`]?.isBooked}
              >
                {row}R2
              </button>
              <button
                className={`${styles.seat} ${
                  seats[`${row}R3`]?.isBooked ? styles.booked :
                  seats[`${row}R3`]?.seatAvailableState === "processing" ? styles.processing : styles.available
                }`}
                onClick={() => handleSeatClick(`${row}R3`)}
                disabled={seats[`${row}R3`]?.isBooked}
              >
                {row}R3
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Back Row */}
      <div className={`${styles.row} ${styles.backRow}`}>
        {["J1", "J2", "J3", "J4", "J5"].map((seatId) => (
          <button
            key={seatId}
            className={`${styles.seat} ${
              seats[seatId]?.isBooked ? styles.booked :
              seats[seatId]?.seatAvailableState === "processing" ? styles.processing : styles.available
            }`}
            onClick={() => handleSeatClick(seatId)}
            disabled={seats[seatId]?.isBooked}
          >
            {seatId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;