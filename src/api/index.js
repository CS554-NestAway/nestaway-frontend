import axios from "axios";

export const HostURL = "/host/getHosting";
export const NewUserURL = "/user/newuser";
export const GuestURL = "/guest";

export const GetUniqueStates = "/search/getUniqueStates";
export const GetHouses = "/search/";
export const GetHouseDetails = "/host/";
export const GetSearchByLatLng = "/search/searchByLatLng/";

export default axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});
