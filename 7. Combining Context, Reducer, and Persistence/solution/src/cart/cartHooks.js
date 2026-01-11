import React from "react";
import { useCartState, useCartDispatch } from "./CartProvider";
import { addItem, updateQty, removeItem, clearCart } from "./cartActions";
import { useToast } from "../ui/ToastProvider";

export function useCartCount() {
  const { items } = useCartState();
  return React.useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items],
  );
}

export function useCartTotal() {
  const { items } = useCartState();
  return React.useMemo(
    () => items.reduce((sum, it) => sum + it.qty * it.price, 0),
    [items],
  );
}

export function useCartOperations() {
  const dispatch = useCartDispatch();
  const { addToast } = useToast();

  const add = React.useCallback(
    (product) => {
      dispatch(addItem(product));
      addToast(`Added ${product.name}`);
    },
    [dispatch, addToast],
  );

  const update = React.useCallback(
    (id, qty) => {
      dispatch(updateQty(id, qty));
    },
    [dispatch],
  );

  const remove = React.useCallback(
    (id) => {
      dispatch(removeItem(id));
      addToast("Removed item");
    },
    [dispatch, addToast],
  );

  const clear = React.useCallback(() => {
    dispatch(clearCart());
    addToast("Cart cleared");
  }, [dispatch, addToast]);

  return { add, update, remove, clear };
}
