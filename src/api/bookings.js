import axios from "axios";

const baseUrl = "http://localhost:8080" || "http://3.22.240.238:81";

const url = {
  bookingsGuest() {
    return `${baseUrl}/guest/bookings`;
  },
  bookingsHost() {
    return `${baseUrl}/bookings/host`;
  },
};

export const getGuestBookings = async (userId, houseId = null) => {
  const res = await axios.get(url.bookingsGuest(userId));
  return res.data;
};

export const getHostBookings = async (hostId, houseId = null) => {
  const res = await axios.get(url.bookingsHost(hostId));
  return res.data;
};
