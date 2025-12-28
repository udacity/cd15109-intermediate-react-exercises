# Exercise: Writing Tests with Vitest and React Testing Library

In this exercise, you’ll write a small set of tests that cover the most common testing layers in a React app:

- Unit tests for a reducer
- Tests for a custom hook + context provider
- An integration test that covers a simple “cart flow”
- Testing a React Query hook that fetches data, using MSW (Mock Service Worker)

## What you’re testing

A tiny app that:

- Fetches a list of products from `/api/products` (React Query)
- Lets the user add products to a cart (Cart context + reducer)
- Shows the cart count and allows clearing the cart

You will write tests for:

1. The reducer logic (unit tests)
2. The cart hook/provider behavior (hook/context tests)
3. The end-to-end user flow (integration test)
4. The data fetching layer using MSW (no real network)

## Files you’ll work with

App code:

- `src/App.jsx`
- `src/cart/cartReducer.js`
- `src/cart/CartProvider.jsx`
- `src/products/useProducts.js`

Test code:

- `src/cart/cartReducer.test.js`
- `src/cart/CartProvider.test.jsx`
- `src/App.test.jsx`
- `src/test/server.js`
- `src/test/setupTests.js`

Config:

- `vitest.config.js`

## Part 1: Setup + Test Environment

Make sure your project is configured so that:

- Vitest runs in a DOM-like environment (`jsdom`)
- React Testing Library matchers are available (via `@testing-library/jest-dom`)
- MSW starts before tests and resets between tests

You should be able to run:

- `npm test`

…and see tests execute.

## Part 2: Unit Tests (Reducer)

Write unit tests for `cartReducer`:

Test these behaviors:

- `ADD_ITEM` adds a new item
- `ADD_ITEM` increments quantity if item already exists
- `REMOVE_ITEM` decrements quantity or removes item when quantity hits 0
- `CLEAR` resets the cart

These should be pure unit tests (no React rendering).

## Part 3: Testing Hooks/Context

Write tests for the cart context/provider:

- Rendering a component inside `CartProvider` gives access to `useCart()`
- Calling `addItem` updates the cart state
- Calling `clear` resets state
- `useCart` throws an error if used outside the provider

These should use React Testing Library.

## Part 4: Integration Tests (Flow)

Write an integration test that renders the full app and verifies the user flow:

- Products render from the mocked `/api/products` endpoint
- Clicking “Add” updates the cart count in the header
- Clicking “Clear cart” resets the count

This should behave like a user test (use `userEvent`).

## Notes

- Use MSW to mock `/api/products` so your tests don’t depend on the network.
- Keep tests small and focused; avoid testing implementation details.

## Expected behavior checklist

Before submitting:

- All tests pass
- Reducer tests cover add/remove/clear behavior
- Provider/hook tests verify the cart updates and error behavior
- Integration test verifies “add to cart” and “clear cart”
- Products are loaded via MSW mock, not a real server
