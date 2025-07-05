import { configureStore } from '@reduxjs/toolkit';
import fundReducer from './slices/fundSlice';

export const store = configureStore({
  reducer: {
    fund: fundReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;