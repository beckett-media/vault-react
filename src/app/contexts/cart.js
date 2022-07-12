import { createContext, useState } from "react";

const [cart, setCart] = useState({
  items: [
    { id: '1234', title: 'title1', price: '1234.56', img: user.img },
    { id: '2234', title: 'title2', price: '1234.56', img: user.img },
    { id: '3234', title: 'title3', price: '1234.56', img: user.img },
  ],
  total: 0,
  proceedToCheckout: false,
});

const defaultState = {
  cart: cart,
  removeItem: removeItem,
};

export const CartContext = createContext(defaultState);

const [ cartState, dispatch ] = useReducer(cartReducer, { cart: [] });

const removeItem = (itemToRemove) => {
  const updatedItems = cart.items.filter((item) => item.id !== itemToRemove)
  console.log(itemToRemove, updatedItems)
  setCart({...cart, items: updatedItems});
}

const CartProvider = ({children}) => {
  const state = {cart, removeItem}
  return <CartContext.Provider value={state}>{children}</CartContext.Provider>
}
export default CartProvider;