import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: []
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART":
      const exist = state.cart.find(item => item.id === action.payload.id);

      if (exist) {
        return {
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      }

      return {
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };

    case "REMOVE_FROM_CART":
  return {
    cart: state.cart
      .map(item =>
        item.id === action.payload
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter(item => item.qty > 0)
  };

    case "UPDATE_QTY":
  return {
    cart: state.cart.map(item =>
      item.id === action.payload.id
        ? { ...item, qty: action.payload.qty < 1 ? 1 : action.payload.qty }
        : item
    )
  };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}