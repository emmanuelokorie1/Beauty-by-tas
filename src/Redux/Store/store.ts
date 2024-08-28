// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categorydataReducer from '../Slices/CategorySlice';
import authDataReducer from '../Slices/AuthSlice';

const store = configureStore({
  reducer: {
    data: categorydataReducer,
    auth: authDataReducer, // Add the new slice reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
