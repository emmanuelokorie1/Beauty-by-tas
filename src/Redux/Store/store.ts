// src/app/store.ts (or store.js)
import { configureStore } from '@reduxjs/toolkit';
import categorydataReducer from '../Slices/CategorySlice';

const store = configureStore({
  reducer: {
    data: categorydataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
