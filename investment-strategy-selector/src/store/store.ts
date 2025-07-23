import { configureStore } from '@reduxjs/toolkit';
import strategyReducer from './strategySlice';
import { fundApi } from '../services/fundApi';


// This file sets up the Redux store for the application
// It combines the strategy slice and the fund API slice into a single store
// The store is the central place where the application's state is managed
/// This setup allows for easy access to the state and dispatching actions


export const store = configureStore({
  reducer: {
    strategy: strategyReducer,
    [fundApi.reducerPath]: fundApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Adds the default middleware and the fund API middleware
    getDefaultMiddleware().concat(fundApi.middleware),
});

// Export types for the store's state and dispatch
// These types are useful for TypeScript to ensure type safety when accessing the store's state or dispatching actions

export type RootState = ReturnType<typeof store.getState>;
// This type represents the entire state of the Redux store
export type AppDispatch = typeof store.dispatch;