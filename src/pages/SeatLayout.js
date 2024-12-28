//src/pages/SeatLayout.js
import React, { useEffect, useState } from "react";
import styles from "../styles/SeatLayout.module.css";

const SeatLayout = () => {
  const [seats, setSeats] = useState({});

  // Fetch seat data from the API
  useEffect(() => {
    fetch("/api/seats")
      .then((res) => res.json())
      .then((data) => setSeats(data));
  }, []);

  const handleSeatClick = (seatId) => {
    fetch("/api/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setSeats({ ...seats, [seatId]: "booked" });
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <h1 className={styles.title}>Bus Seat Booking</h1>
      <div className={styles.busLayout}>
        {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((row) => (
          <div key={row} className={styles.row}>
            {/* Left Section */}
            <button
              className={`${styles.seat} ${
                seats[`${row}L1`] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(`${row}L1`)}
              disabled={seats[`${row}L1`] === "booked"}
            >
              {row}L1
            </button>
            <button
              className={`${styles.seat} ${
                seats[`${row}L2`] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(`${row}L2`)}
              disabled={seats[`${row}L2`] === "booked"}
            >
              {row}L2
            </button>

            {/* Spacer between left and right sections */}
            <div className={styles.spacer}></div>

            {/* Right Section */}
            <button
              className={`${styles.seat} ${
                seats[`${row}R1`] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(`${row}R1`)}
              disabled={seats[`${row}R1`] === "booked"}
            >
              {row}R1
            </button>
            <button
              className={`${styles.seat} ${
                seats[`${row}R2`] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(`${row}R2`)}
              disabled={seats[`${row}R2`] === "booked"}
            >
              {row}R2
            </button>
            <button
              className={`${styles.seat} ${
                seats[`${row}R3`] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(`${row}R3`)}
              disabled={seats[`${row}R3`] === "booked"}
            >
              {row}R3
            </button>
          </div>
        ))}

        {/* Back Row */}
        <div className={styles.row}>
          {["J1", "J2", "J3", "J4", "J5"].map((seatId) => (
            <button
              key={seatId}
              className={`${styles.seat} ${
                seats[seatId] === "booked" ? styles.booked : styles.available
              }`}
              onClick={() => handleSeatClick(seatId)}
              disabled={seats[seatId] === "booked"}
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
