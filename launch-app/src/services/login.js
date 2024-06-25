import { createSlice } from "@reduxjs/toolkit";

export const loginService = createSlice({
  name: "loginService",
  initialState: {
    loginStatus: false, // change
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    clearLoginDetails: (state, _action) => {
      state.loginStatus = false;
    },
  },
});

export const { setLoginStatus, clearLoginDetails } = loginService.actions;

export default loginService.reducer;
