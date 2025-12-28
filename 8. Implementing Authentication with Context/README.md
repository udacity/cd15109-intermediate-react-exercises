# Exercise: Authentication with Context

You’ll implement a minimal auth flow with:

- An `AuthProvider` that shares auth state via context
- Token persistence in `localStorage`
- Login and logout functions
- Auth initialization on mount (read token on first render)
- A simple login form with basic validation

## Files you’ll work in

- `src/auth/AuthProvider.jsx`
- `src/auth/useAuth.js`
- `src/App.jsx`

## Requirements

### A) Auth state + provider

Create an `AuthProvider` that stores:

- `token` (string or null)
- `isAuthenticated` (boolean derived from token)

Provider should expose:

- `token`
- `isAuthenticated`
- `login({ email, password })`
- `logout()`

The provider should wrap the app.

### B) Token persistence

Use `localStorage` with a key like: `auth:token`

Rules:

- On first render (lazy init is fine), read token from `localStorage`
- On successful login, store token in `localStorage`
- On logout, remove token from `localStorage` and clear auth state
- Handle storage errors gracefully (don’t crash)

### C) Fake login API

In `App.jsx` (or inside `AuthProvider.jsx`), implement:

- `fakeLogin({ email, password })`
  - returns a Promise
  - resolves with `{ token: "demo-token-..." }` for one valid credential pair
  - rejects with an Error for everything else
  - simulate latency (~300ms)

Use these valid credentials:

- email: `student@example.com`
- password: `letmein`

### D) UI flow

Your app should show:

When logged out:

- A login form with:
  - email input
  - password input
  - submit button
- Basic validation:
  - email and password required
  - show a small inline error message if missing
- If fakeLogin fails, show an inline error message

When logged in:

- A simple "Account" view:
  - Show a short message like “Signed in”
  - Show token preview (first 8 chars is fine)
  - Logout button

In your browser's developer tools console, running `localStorage.getItem("auth:token")`
should produce something like `"demo-token-1708639482734"`. When logged out, the same command
should produce `null`.

## Manual checklist

- Logging in sets token + shows account view
- Refresh preserves login (token is read from localStorage)
- Logout clears token and returns to login view
- Invalid credentials show an error message
