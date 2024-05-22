import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import restoReducer from './restoSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    resto: restoReducer,
  }
});