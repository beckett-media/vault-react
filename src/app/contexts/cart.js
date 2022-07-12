import { createContext, useState } from "react";

const [cartObject, setCartObject] = useState({
  items: [
    { id: '1234', title: 'title1', price: '1234.56', img: user.img },
    { id: '2234', title: 'title2', price: '1234.56', img: user.img },
    { id: '3234', title: 'title3', price: '1234.56', img: user.img },
  ],
  total: 0,
  proceedToCheckout: false,
});

const defaultState = {
  cart: cartObject,
  removeItem: cartReducer.removeItem,
};

export const CartContext = createContext(defaultState);

const cartReducer = (state, action) => {
  switch(action) {
    case 'REMOVE_ITEM_FROM_CART':
      const updatedItems = cart.items.filter((item) => item.id !== itemToRemove)
    setCartObject({...state, items: updatedItems});
  }
}

const CartProvider = ({children}) => {
  const state = {cart, removeItem}
  const [ cartState, dispatch ] = useReducer(cartReducer, { cart: [] });
  return <CartContext.Provider value={state}>{children}</CartContext.Provider>
}
export default CartProvider;