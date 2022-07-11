import { initialState } from './store/rootReducer';
import { CART_FORM } from './types';

export const cartReducers = (state = { initialState }, action) => {
  console.log('reducer returns ', action.payload);
  switch (action.type) {
    case CART_FORM:
      return state;
    default:
      return state;
  }
};
