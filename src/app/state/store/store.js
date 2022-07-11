import { initialState } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducers } from '../reducers';

export const store = configureStore({
  reducer: {
    cart: cartReducers,
  },
  preloadedState: {
    cart: initialState.cart,
  },
});
