import { combineReducers } from '@reduxjs/toolkit';
import { cartReducers } from '../reducers';

export const initialState = {
  cartForm: {
    items: [],
  },
};

export const appReducer = combineReducers({
  cart: cartReducers,
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
