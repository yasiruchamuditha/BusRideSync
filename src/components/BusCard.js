// src/components/BusCard.js
import React from 'react';
import styles from '../styles/BusCard.module.css';
// import Image from 'next/image';

const BusCard = ({ bus, handleReserveSeat }) => {
  // Format the dates to show only the date part
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            {bus.busId ? bus.busId.sector : 'Unknown Sector'}
          </h4>
          {bus.busId ? (
            <p className={styles.busNumber}>{bus.busId.busNumber}</p> // Display the bus number
          ) : (
            <p className={styles.busNumber}>Unknown Bus Number</p>
          )}
        </div>
        <div className={styles.headerCenter}>
          <h4 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Stops @ {bus.endCity}
          </h4>
          {/* <h4> ROUTE#{bus.busId.routeNumber}</h4> */}
        </div>
        <div className={styles.headerRight}>
          <h4 className={styles.cardx} style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            {bus.busRouteType}
          </h4>
          <h4 className={styles.cardx} style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            {bus.routeWay}
          </h4>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          {/* <Image src="https://sltb.eseat.lk/images/bus/main/bus2775_2445.jpg" alt="Bus" className={styles.busImage} /> */}
          <div className={styles.sectionx}>
            <p><strong>Distance:</strong> {bus.estimatedDistance} km</p>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.row}>
            <div className={styles.section}>
              <h4>Departure</h4>
              <p><strong>City:</strong> {bus.startCity}</p>
              <p><strong>Date:</strong> {formatDate(bus.departureDate)}</p> {/* Format the departure date */}
              <p><strong>Time:</strong> {bus.departureTime}</p>
            </div>
            <div className={styles.section}>
              <h4>Arrival</h4>
              <p><strong>City:</strong> {bus.endCity}</p>
              <p><strong>Date:</strong> {formatDate(bus.arrivalDate)}</p> {/* Format the arrival date */}
              <p><strong>Time:</strong> {bus.arrivalTime}</p>
            </div>
            <div className={styles.section}>
              <h4>Booking Info</h4>
              <p><strong>Closing Date:</strong> {bus.closingDate}</p>
              <p><strong>Closing Time:</strong> {bus.closingTime}</p>
              <p><strong>Estimated Time:</strong> {bus.estimatedTime}Hours</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.section}>
              <div className={styles.priceReserve}>
                <p className={styles.price}><strong>Price:</strong> Rs.{bus.ticketPrice}.00</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.availableSeatsContainer}>
                <p className={styles.availableSeats}><strong>Available Seats:</strong> <span className={styles.availableSeatsNumber}>{bus.availableSeats}</span></p>
              </div>
            </div>
            <div className={styles.section}>
              <button
                onClick={() => handleReserveSeat(bus.route, bus.departureTime, bus.arrivalTime, bus.ticketPrice)}
                className={styles.reserveButton}>
                Reserve Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCard;