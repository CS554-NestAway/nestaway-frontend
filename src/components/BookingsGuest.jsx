import { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { getGuestBookings } from "../api/bookings";

const BookingsGuest = () => {
  const user = useContext("user");
  const [bookings, updateBookings] = useImmer(null);

  useEffect(() => {
    const fetch = async () => {
      const data = getGuestBookings(user.id);
      updateBookings((bookings) => data);
    };

    fetch();
  });

  return <ol>{bookings && bookings.map((b) => <li key={b.id}>{b.id}</li>)}</ol>;
};

export default BookingsGuest;
