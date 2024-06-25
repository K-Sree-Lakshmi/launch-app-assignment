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
    clearLoginDetails: (state, _action) => {
      state.userDetails = [];
    },
  },
});

export const {
    setUserDetails,
    clearLoginDetails,
} = signupService.actions;

export default signupService.reducer;
