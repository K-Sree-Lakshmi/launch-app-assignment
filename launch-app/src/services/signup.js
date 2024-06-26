import { createSlice } from "@reduxjs/toolkit";

export const signupService = createSlice({
  name: "signupService",
  initialState: {
    userDetails: []
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state, _action) => {
      state.userDetails = [];
    },
  },
});

export const {
    setUserDetails,
    clearUserDetails,
} = signupService.actions;

export default signupService.reducer;
