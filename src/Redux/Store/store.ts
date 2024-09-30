// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categorydataReducer from '../Slices/CategorySlice';
import authDataReducer from '../Slices/AuthSlice';
import cartReducer from '../Slices/CartSlice';
import checkoutReducer from '../Slices/CheckOutSlice';

const store = configureStore({
  reducer: {
    data: categorydataReducer,
    auth: authDataReducer, 
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
