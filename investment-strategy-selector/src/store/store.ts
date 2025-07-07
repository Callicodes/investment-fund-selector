import { configureStore } from '@reduxjs/toolkit';
import { fundApi } from '../services/fundApi';

export const store = configureStore({
  reducer: {
    [fundApi.reducerPath]: fundApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fundApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;