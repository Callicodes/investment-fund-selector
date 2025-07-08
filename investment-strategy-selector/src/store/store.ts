import { configureStore } from '@reduxjs/toolkit';
import strategyReducer from './strategySlice';
import { fundApi } from '../services/fundApi';

export const store = configureStore({
  reducer: {
    strategy: strategyReducer,
    [fundApi.reducerPath]: fundApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fundApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;