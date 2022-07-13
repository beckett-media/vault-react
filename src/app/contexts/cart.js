import { createContext, useContext, useReducer, useState } from "react";

export const CartContext = createContext();


export const actions = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  PROCEED_TO_CHECKOUT_TOGGLE: 'PROCEED_TO_CHECKOUT_TOGGLE',
}

const updateTotal = (state) =>
  state.cartObject.items.reduce(
    (itemsPrevVal, itemsCurVal) =>
      itemsPrevVal + parseFloat(itemsCurVal.price),
  0,
);

const cartReducer = (state, action) => {
  console.log(action)
  switch(action) {
    case 'ADD_ITEM_TO_CART':
      console.log(action)
      return {...state, items: [...state.items, itemToAdd], total: updateTotal(state)};
    case 'REMOVE_ITEM_FROM_CART':
      const updatedItems = state.items.filter((item) => item.id !== itemToRemove)
      return {...state, items: updatedItems, total: updateTotal(state)};
    case 'PROCEED_TO_CHECKOUT':
      return {...state, proceedToCheckout: true};
  }
}

const initialState = {
  items: [],
  total: 0,
  proceedToCheckout: false,
};

export const CartProvider = ({children}) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const value = {
    cartObject: cartState,
    addItemToCart: (itemToAdd) => {
      dispatch({ type: actions.ADD_ITEM_TO_CART, itemToAdd });
    },
    removeItemFromCart: (itemToRemove) => {
      dispatch({ type: actions.REMOVE_ITEM_FROM_CART, itemToRemove });
    },
    proceedToCheckoutToggle: (proceed) => {
      dispatch({ type: actions.PROCEED_TO_CHECKOUT_TOGGLE, proceed });
    },
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)

export default CartProvider;