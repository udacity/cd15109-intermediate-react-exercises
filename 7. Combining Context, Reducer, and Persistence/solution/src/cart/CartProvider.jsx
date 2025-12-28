import React from "react";
import { cartReducer, initialCartState } from "./cartReducer";

const CartStateContext = React.createContext(null);
const CartDispatchContext = React.createContext(null);

const STORAGE_KEY = "cart:v1";

function isValidCartState(value) {
  if (!value || typeof value !== "object") return false;
  if (!Array.isArray(value.items)) return false;

  for (const it of value.items) {
    if (!it || typeof it !== "object") return false;
    if (typeof it.id !== "string") return false;
    if (typeof it.name !== "string") return false;
    if (typeof it.price !== "number") return false;
    if (typeof it.qty !== "number") return false;
  }

  return true;
}

function readCartFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidCartState(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCartToStorage(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}

export function CartProvider({ children }) {
  const [state, baseDispatch] = React.useReducer(
    cartReducer,
    initialCartState,
    (fallback) => readCartFromStorage() ?? fallback,
  );

  const stateRef = React.useRef(state);

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const dispatch = React.useCallback(
    (action) => {
      const nextState = cartReducer(stateRef.current, action);
      baseDispatch(action);
      writeCartToStorage(nextState);
    },
    [baseDispatch],
  );

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const ctx = React.useContext(CartStateContext);
  if (!ctx) {
    throw new Error("useCartState must be used within <CartProvider>");
  }
  return ctx;
}

export function useCartDispatch() {
  const ctx = React.useContext(CartDispatchContext);
  if (!ctx) {
    throw new Error("useCartDispatch must be used within <CartProvider>");
  }
  return ctx;
}
