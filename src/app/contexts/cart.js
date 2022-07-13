import { createContext, useContext, useReducer, useState } from "react";

export const CartContext = createContext();


export const actions = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  PROCEED_TO_CHECKOUT_TOGGLE: 'PROCEED_TO_CHECKOUT_TOGGLE',
}

const cartReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEM_TO_CART':
      return {
        ...state, 
        items: [...state.items, action.itemToAdd], 
        total: state.total + parseFloat(action.itemToAdd.price)
      };
    case 'REMOVE_ITEM_FROM_CART':
      const updatedItems = state.items.filter((item) => item.id !== action.itemToRemove.id)
      return {
        ...state, 
        items: updatedItems, 
        total: (state.total - parseFloat(action.itemToRemove.price))
      };
    case 'PROCEED_TO_CHECKOUT_TOGGLE':
      return {
        ...state, 
        proceedToCheckout: true};
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
    items: cartState.items,
    total: cartState.total,
    proceedToCheckout: cartState.proceedToCheckout,
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