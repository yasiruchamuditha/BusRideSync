import React, { useEffect, useState } from 'react';
import styles from '../styles/SeatLayout.module.css';

const SeatLayout = ({ selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState({});

  useEffect(() => {
    fetch('/api/seats')
      .then((res) => res.json())
      .then((data) => setSeats(data));
  }, []);

  const handleSeatClick = (seatId) => {
    if (seats[seatId] === 'booked') return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(newSelectedSeats);
  };

  return (
    <div>
      <h1 className={styles.title}>Bus Seat Booking</h1>
      <div className={styles.busLayout}>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((row) => (
          <div key={row} className={styles.row}>
            {['L1', 'L2', 'R1', 'R2', 'R3'].map((col) => {
              const seatId = `${row}${col}`;
              return (
                <button
                  key={seatId}
                  className={`${styles.seat} ${
                    seats[seatId] === 'booked'
                      ? styles.booked
                      : selectedSeats.includes(seatId)
                      ? styles.selected
                      : styles.available
                  }`}
                  onClick={() => handleSeatClick(seatId)}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
        <div className={styles.row}>
          {['J1', 'J2', 'J3', 'J4', 'J5'].map((seatId) => (
            <button
              key={seatId}
              className={`${styles.seat} ${
                seats[seatId] === 'booked'
                  ? styles.booked
                  : selectedSeats.includes(seatId)
                  ? styles.selected
                  : styles.available
              }`}
              onClick={() => handleSeatClick(seatId)}
            >
              {seatId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;