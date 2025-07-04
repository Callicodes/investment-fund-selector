// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import fundReducer from "./slices/fundSlice";

export const store = configureStore({
  reducer: {
    fund: fundReducer,
  },
});

// Infer RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;