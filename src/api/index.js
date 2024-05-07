import axios from "axios";

export const HostURL = "/host/";
export const NewUserURL = "/user/newuser";

export const GetUniqueStates = "/search/getUniqueStates";
export const GetSearchResults = "/search/searchByState/";

export default axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});
