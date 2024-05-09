import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    singinFailfure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinStart, signinSuccess, singinFailfure } = userSlice.actions;

export default userSlice.reducer;
