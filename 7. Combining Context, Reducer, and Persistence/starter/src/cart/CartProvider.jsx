import React from "react";
import { cartReducer, initialCartState } from "./cartReducer";

const CartStateContext = React.createContext(null);
const CartDispatchContext = React.createContext(null);

const STORAGE_KEY = "cart:v1";

// TODO: Add safe storage helpers (read/write) with try/catch + JSON parsing.
// - read should return a valid cart state or null
// - write should never throw (handle errors internally)
function readCartFromStorage() {
  return null;
}

function writeCartToStorage(state) {}

// TODO: Implement CartProvider:
// - useReducer with lazy init from localStorage
// - wrapped dispatch that persists after actions (middleware)
// - provide state + dispatch via separate contexts
export function CartProvider({ children }) {
  return children;
}

// TODO: Hooks that read from context + throw if used outside provider
export function useCartState() {
  throw new Error("Not implemented");
}

export function useCartDispatch() {
  throw new Error("Not implemented");
}
