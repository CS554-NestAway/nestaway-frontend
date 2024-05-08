import { useContext, useEffect, useState } from "react";
import api, { GuestURL } from "../api";
import { AuthContext } from "../contexts/AuthContext";

const GuestBookings = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`${GuestURL}/bookings`);
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [currentUser]);

  // return <div>{bookings && JSON.stringify(bookings)}</div>;
  // Function to cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      await fetch(`https://api.example.com/bookings/cancel/${bookingId}`, {
        method: "POST",
      });
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  // Function to request a date change
  const changeBookingDate = (bookingId) => {
    // Implement this function based on how your API handles date changes
    console.log(`Change date for booking ${bookingId}`);
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings &&
        bookings.map((booking) => (
          <div key={booking.id}>
            <p>Booking ID: {booking.id}</p>
            <p>Date: {booking.date}</p>
            <button onClick={() => changeBookingDate(booking.id)}>
              Change Date
            </button>
            <button onClick={() => cancelBooking(booking.id)}>Cancel</button>
          </div>
        ))}
    </div>
  );
};

export default GuestBookings;
