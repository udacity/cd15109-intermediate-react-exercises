import React from "react";
import { useCartState, useCartDispatch } from "./CartProvider";
import { addItem, updateQty, removeItem, clearCart } from "./cartActions";
import { useToast } from "../ui/ToastProvider";

// TODO: Selector hooks:
// - useCartCount: sum qty
// - useCartTotal: sum qty*price
// Memoize derived values to avoid recomputing on unrelated renders.
export function useCartCount() {
  return 0;
}

export function useCartTotal() {
  return 0;
}

// TODO: Operation hook:
// Return functions that dispatch actions and show toast feedback.
// Keep the UI thin by pushing logic here.
export function useCartOperations() {
  return {
    add(product) {},
    update(id, qty) {},
    remove(id) {},
    clear() {},
  };
}
