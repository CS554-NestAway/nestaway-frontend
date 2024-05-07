import { createSlice } from "@reduxjs/toolkit";
import api, { HostURL } from "../api";

const initialState = {
  houseData: [],
  query: {
    state: "",
    checkIn: "",
    checkOut: "",
  },
};

export const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      const uploadId = action.payload;
      state.selectedUpload = uploadId;
    },
    searchHouses: {
      reducer: (state, action) => {
        state.houseData = action.payload;
      },
      prepare: async () => {
        api
          .get(HostURL)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.error("Error fetching houses:", error);
          });
      },
    },
  },
});

export const { setQuery, searchHouses } = houseSlice.actions;

export default houseSlice.reducer;
