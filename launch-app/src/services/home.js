import { createSlice } from "@reduxjs/toolkit";

export const homeService = createSlice({
  name: "homeService",
  initialState: {
    launchListValues: [],
  },
  reducers: {
    setLaunchListValues: (state, action) => {
      state.launchListValues = action.payload;
    },
    clearHomePage: (state, _action) => {
      state.launchListValues = [];
    },
  },
});

export const { setLaunchListValues, clearHomePage } = homeService.actions;

export default homeService.reducer;
