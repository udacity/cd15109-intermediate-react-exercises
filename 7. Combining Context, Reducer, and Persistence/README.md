# Exercise: Cart Provider + Persistence

You’ll turn your cart reducer into a shared app feature by combining:

- Context (Provider pattern)
- useReducer (cart state + actions)
- localStorage (lazy init + persistence)
- Selector hooks (count + total)
- Toast feedback for cart actions
- Basic error handling for storage

## Files you’ll work in

- `src/cart/CartProvider.jsx`
- `src/cart/cartHooks.js`
- `src/cart/cartReducer.js`
- `src/cart/cartActions.js`
- `src/ui/ToastProvider.jsx`
- `src/App.jsx`

## What you’re building

A single-screen app with:

- Products list (Add to cart)
- Cart panel (qty +/- , remove, clear)
- Totals displayed using selector hooks
- Toast messages when actions happen (Add / Remove / Clear)

The cart should persist across refresh using localStorage.

## Requirements

### A) Provider pattern for shared state

Create a `CartProvider` that:

- Holds cart state via `useReducer`
- Exposes `{ state, dispatch }` via context
- Throws a helpful error if hooks are used outside the provider

Wrap the app in `CartProvider` in `App.jsx`.

### B) Lazy init from localStorage

When the provider initializes:

- Read `localStorage` once to load the initial cart state (lazy initializer)
- If storage is missing or invalid, fall back to the default initial state
- Handle JSON parse errors gracefully

Use a storage key like: `cart:v1`.

### C) Persistence middleware

Persist cart changes to localStorage whenever actions are dispatched.

Implementation requirement:

- Provide a wrapped `dispatch` function that:
  - Calls the real reducer dispatch
  - Then attempts to write the new state to localStorage
  - Catches and handles storage errors (quota, disabled storage, etc.)

Keep the reducer pure — no localStorage calls inside the reducer.

### D) Selector hooks + toast feedback

Create selector hooks:

- `useCartCount()` → sum of qty
- `useCartTotal()` → sum of qty \* price

These should compute from state and be memoized (useMemo is fine).

Create operation hooks:

- `useCartActions()` or similar that exposes:
  - `add(product)`
  - `updateQty(id, qty)`
  - `remove(id)`
  - `clear()`

When these operations run:

- Show a toast message (e.g. “Added Socks”, “Removed Hoodie”, “Cart cleared”)

Toast system can be minimal:

- `ToastProvider` with an `addToast(message)` function
- Toasts disappear after ~2 seconds

## Manual checklist

- Cart state is shared via context (no prop drilling)
- Refreshing the page keeps cart contents (localStorage)
- Clearing cart updates storage
- Selector hooks update totals correctly
- Toasts appear for add/remove/clear
- Storage errors don’t crash the app (you can simulate by throwing in storage helpers)
