export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item } = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (!existing) {
        return { ...state, items: [...state.items, { ...item, quantity: 1 }] };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };
    }

    case "REMOVE_ITEM": {
      const { id } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return state;

      if (existing.quantity === 1) {
        return { ...state, items: state.items.filter((i) => i.id !== id) };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      };
    }

    case "CLEAR":
      return initialCartState;

    default:
      return state;
  }
}

export function selectCartCount(state) {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function selectCartTotal(state) {
  return state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
}
