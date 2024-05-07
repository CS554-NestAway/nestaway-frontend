import { Fragment, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { getGuestBookings } from "../api/bookings";
import { Carousel } from "react-responsive-carousel";

const BookingsGuest = () => {
  const user = useContext("user");
  const [showChangeDate,setShowChangeDate]=useState(false)
  const [bookings, updateBookings] = useImmer(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getGuestBookings();
      updateBookings(() => data);
    };

    fetch();
  }, []);

  return (
    <>
      <div>{bookings && bookings.map((house) => (<div key={house._id}>
        {house.setting.changeDays>=new Date().getDay()-new Date(house.setting.)}
      </div>))}</div>
    </>
  );
};

const ChangeDateBtn = ({prevDate,availableDate}) => {};

const CancelBtn;

export default BookingsGuest;
