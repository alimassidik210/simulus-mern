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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateUserFailfure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserFailfure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    signoutUserFailfure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  singinFailfure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailfure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailfure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailfure,
} = userSlice.actions;

export default userSlice.reducer;
