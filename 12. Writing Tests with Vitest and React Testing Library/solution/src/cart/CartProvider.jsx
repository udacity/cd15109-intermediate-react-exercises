import { createContext, useMemo, useReducer, useState } from "react";
import {
  cartReducer,
  initialCartState,
  selectCartCount,
  selectCartTotal,
} from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const value = useMemo(() => {
    const count = selectCartCount(state);
    const total = selectCartTotal(state);

    function addItem(item) {
      dispatch({ type: "ADD_ITEM", payload: { item } });
    }

    function removeItem(id) {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
    }

    function clear() {
      dispatch({ type: "CLEAR" });
    }

    function checkout() {
      dispatch({ type: "CLEAR" });
      setCheckoutMessage("Checked out");
    }

    function clearCheckoutMessage() {
      setCheckoutMessage("");
    }

    return {
      items: state.items,
      count,
      total,
      addItem,
      removeItem,
      clear,
      checkout,
      checkoutMessage,
      clearCheckoutMessage,
    };
  }, [state, checkoutMessage]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}