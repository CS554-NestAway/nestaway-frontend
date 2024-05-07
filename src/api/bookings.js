import axios from "axios";

const baseUrl = "http://3.22.240.238:81";

const url = {
  bookingsGuest(userId) {
    return `${baseUrl}/bookings/user/${userId}`;
  },
  bookingsHost(hostId) {
    return `${baseUrl}/bookings/host/${hostId}`;
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
