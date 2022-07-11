import { CART_FORM } from './types';

export const setCart = (payload) => {
  console.log('payload is', payload.cart);
  return {
    type: CART_FORM,
    payload: payload,
  };
};
