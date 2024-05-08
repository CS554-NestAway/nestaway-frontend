import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { GetHouses, HostURL } from "../api";

const initialState = {
  houseData: [],
  query: {
    state: "",
    checkIn: "",
    checkOut: "",
    lat: "",
    lng: "",
    radius: 10,
  },
  isDrag: true,
  isLoading: false,
  isError: false,
  mapCenter: null,
};

export const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setIsDrag: (state, action) => {
      state.isDrag = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHouses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHouses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.houseData = action.payload;
    });
    builder.addCase(fetchHouses.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(searchHousesByState.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchHousesByState.fulfilled, (state, action) => {
      state.isLoading = false;
      state.houseData = action.payload;
    });
    builder.addCase(searchHousesByState.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setQuery, setMapCenter, setIsDrag } = houseSlice.actions;

export const fetchHouses = createAsyncThunk(
  "fetchHouses",
  async (_, { getState }) => {
    let houseData = [];
    const { query } = getState().houses;
    await api
      .post(GetHouses, query)
      .then((response) => {
        houseData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
    return houseData;
  }
);

export const searchHousesByState = createAsyncThunk(
  "searchHousesByState",
  async (_, { getState }) => {
    let houseData = [];
    const { query } = getState().houses;
    await api
      .post(GetHouses, query)
      .then((response) => {
        houseData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
        return [];
      });
    return houseData;
  }
);

export default houseSlice.reducer;
