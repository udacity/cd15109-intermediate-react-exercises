export const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

export const initialCartState = {
  items: [],
};

// TODO: Implement reducer with immutable updates.
// Keep it pure (no localStorage, no side effects).
export function cartReducer(state, action) {
  return state;
}
