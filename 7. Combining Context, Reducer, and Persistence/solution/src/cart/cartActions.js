import { ACTIONS } from "./cartReducer";

export function addItem(product) {
  return { type: ACTIONS.ADD, payload: { product } };
}

export function updateQty(id, qty) {
  return { type: ACTIONS.UPDATE, payload: { id, qty } };
}

export function removeItem(id) {
  return { type: ACTIONS.REMOVE, payload: { id } };
}

export function clearCart() {
  return { type: ACTIONS.CLEAR };
}
