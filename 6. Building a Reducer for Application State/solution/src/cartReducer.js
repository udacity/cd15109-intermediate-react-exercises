export const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

export const initialCartState = {
  items: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const product = action.payload.product;
      const existing = state.items.find((it) => it.id === product.id);

      if (!existing) {
        const nextItem = { ...product, qty: 1 };
        return { ...state, items: [...state.items, nextItem] };
      }

      const nextItems = state.items.map((it) =>
        it.id === product.id ? { ...it, qty: it.qty + 1 } : it,
      );

      return { ...state, items: nextItems };
    }

    case ACTIONS.UPDATE: {
      const { id, qty } = action.payload;
      const nextQty = Math.max(0, qty);

      if (nextQty === 0) {
        return { ...state, items: state.items.filter((it) => it.id !== id) };
      }

      const nextItems = state.items.map((it) =>
        it.id === id ? { ...it, qty: nextQty } : it,
      );

      return { ...state, items: nextItems };
    }

    case ACTIONS.REMOVE: {
      const { id } = action.payload;
      return { ...state, items: state.items.filter((it) => it.id !== id) };
    }

    case ACTIONS.CLEAR: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}
