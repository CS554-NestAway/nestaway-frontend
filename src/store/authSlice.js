import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { CheckAdmin } from "../api";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(setCurrentUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        const { uid, displayName, email, accessToken } = action.payload;
        state.currentUser = { uid, displayName, email, accessToken };
        state.loading = false;
      }
    });
    builder.addCase(setCurrentUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(checkIfAdminAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkIfAdminAsync.fulfilled, (state, action) => {
      state.isAdmin = action.payload;
      state.loading = false;
    });
    builder.addCase(checkIfAdminAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setIsAdmin } = authSlice.actions;

export const setCurrentUserAsync = createAsyncThunk(
  "setCurrentUserAsync",
  async (user) => {
    return user;
  }
);
export const checkIfAdminAsync = createAsyncThunk(
  "checkIfAdminAsync",
  async () => {
    let isAdmin = false;
    isAdmin = await api
      .get(CheckAdmin)
      .then((response) => {
        return response.data.isAdmin;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        return false;
      });
    return isAdmin;
  }
);

export default authSlice.reducer;
