# Exercise: Build a Shopping Cart Reducer

You’ll implement a shopping cart using `useReducer`, with:

- A clear state shape
- Action types: ADD, UPDATE, REMOVE, CLEAR
- A reducer with a `switch` statement
- Immutable array/object updates
- Small action creator helpers
- UI integration via dispatch + derived totals

## Files you’ll work in

- `src/App.jsx`
- `src/cartReducer.js`
- `src/cartActions.js`

## Data model

Products (in `App.jsx`):

- `id` (string)
- `name` (string)
- `price` (number)

Cart state (in `cartReducer.js`):

- `items: Array<{ id, name, price, qty }>`

Keep state minimal. Compute totals in the UI from `items`.

## Actions

Implement these action types:

- `ADD`: Add a product to the cart.
  - If it exists already, increase qty by 1.

- `UPDATE`: Update qty for an existing cart item.
  - If the new qty is 0, remove the item.

- `REMOVE`: Remove an item by id.

- `CLEAR`: Empty the cart.

## Reducer rules

Your reducer must:

- Be a pure function (no mutation)
- Use immutable updates (map/filter/spread)

## Action creators

Implement small helpers in `cartActions.js` that return action objects:

- `addItem(product)`
- `updateQty(id, qty)`
- `removeItem(id)`
- `clearCart()`

## UI requirements (minimal)

Single page with:

### Products section

- Render 3–5 products
- Each has an “Add” button that dispatches ADD

### Cart section

- Empty state: “Your cart is empty”
- Otherwise:
  - List cart items: name, price, qty
  - Qty controls:
    - “-” dispatches UPDATE with qty-1 (never below 0)
    - “+” dispatches UPDATE with qty+1
  - “Remove” dispatches REMOVE
  - “Clear cart” dispatches CLEAR

### Derived totals

Compute (don’t store) from state.items:

- item count (sum of qty)
- total price (sum of qty \* price)

## Manual checklist

- Add works (including adding same item multiple times)
- Update works (qty increases/decreases)
- Qty never goes negative
- Setting qty to 0 removes the item
- Remove works
- Clear works
- Totals match the cart
