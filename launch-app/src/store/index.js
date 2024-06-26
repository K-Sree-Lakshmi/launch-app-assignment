import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../services/combined-service";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
