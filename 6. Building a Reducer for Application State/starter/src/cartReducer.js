export const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

export const initialCartState = {
  items: [],
};

// TODO: Implement a pure reducer with a switch statement.
// Requirements:
// - ADD adds a new item or increments qty
// - UPDATE sets qty immutably (qty 0 => remove)
// - REMOVE deletes by id
// - CLEAR empties the cart
// - never mutate state/items
export function cartReducer(state, action) {
  return state;
}
