import axios from "axios";

export const HostURL = "/host/";
export const NewUserURL = "/user/newuser";

export const GetUniqueStates = "/search/getUniqueStates";
export const GetHouses = "/search/";
export const GetSearchByLatLng = "/search/searchByLatLng/";

export default axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});
