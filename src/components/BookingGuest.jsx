import { useContext, useEffect } from "react";
import { useImmer } from "use-immer";

const BookingGuest = () => {
  const user = useContext("user");
  const [bookings, updateBookings] = useImmer(null);

  useEffect(() => {
    const fetch=await get
  })
};

export default BookingGuest;
