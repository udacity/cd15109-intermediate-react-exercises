# Exercise: Implementing Protected Routes and Auth-Aware UI

In this exercise, you’ll implement:

- A `ProtectedRoute` wrapper
- Redirecting unauthenticated users using `<Navigate />`
- Returning users to their original destination after login (using `location.state`)
- Auth-aware navigation (show/hide links)
- A protected `/profile` route
- A simple auth-aware data fetch
- Loading states while auth is being checked

## App Requirements

Your app should support these routes:

- `/` → Public Home page
- `/login` → Login page
- `/profile` → Protected Profile page
- `*` → Not Found page

## Part 1: Implement `ProtectedRoute`

**File:** `src/auth/ProtectedRoute.jsx`

Your `ProtectedRoute` component should:

1. Read auth state using `useAuth()`
2. If `isCheckingAuth` is `true`, render a small loading UI (e.g. “Checking auth…”)
3. If the user is **not authenticated**, redirect to `/login`
   - Use `<Navigate />`
   - Pass the current location in `state` so login can return the user
4. If the user **is authenticated**, render `children`

After completing this step, wrap the `/profile` route with `<ProtectedRoute>` in `App.jsx`.

## Part 2: Redirect After Login (Return URL)

**File:** `src/pages/LoginPage.jsx`

When a user is redirected to `/login` from a protected route:

- The original route should be available in `location.state.from`

Your job:

1. Determine the correct post-login destination:
   - If `location.state.from` exists, use it
   - Otherwise, default to `/profile`
2. After successful login:
   - Redirect the user to that destination
   - Use `navigate(destination, { replace: true })`

### Manual test

- Visit `/profile` while logged out
- You should be redirected to `/login`
- After logging in, you should land back on `/profile`

## Part 3: Make the Navigation Auth-Aware

**File:** `src/App.jsx`

Update the navigation so that:

- **Always visible**
  - Home
- **Only when logged out**
  - Login
- **Only when logged in**
  - Profile
  - Logout button

The Logout button should:

- Call `logout()`
- Navigate the user back to `/`

### Manual test

- Log in → Login disappears, Profile + Logout appear
- Log out → Profile disappears, Login appears again

## Part 4: Implement AuthProvider Behavior

**File:** `src/auth/AuthProvider.jsx`

Complete the TODOs:

1. On app start:
   - Restore any saved token from `localStorage`
   - Set `isCheckingAuth` to `false` when done

2. Implement `login()`:
   - Simulate async behavior
   - Store a token
   - Persist to `localStorage`
   - Update state

3. Implement `logout()`:
   - Clear token state
   - Remove from `localStorage`

4. Implement `fetchProfile()`:
   - Simulate async behavior
   - Only succeed if a token exists
   - Return basic profile data

## Part 5: Auth-Aware Profile Data

**File:** `src/pages/ProfilePage.jsx`

On this page:

1. Only attempt to load profile data if the user is authenticated
2. Manage loading, success, and error states
3. Render:
   - A loading message while fetching
   - An error message on failure
   - Profile details on success

## Expected Behavior Checklist

Before submitting, verify:

- Visiting `/profile` while logged out redirects to `/login`
- After login, you return to the original protected route
- Navigation updates correctly based on auth state
- Logout resets auth state and nav
- Refreshing the page briefly shows “Checking auth…” before resolving
- Profile page shows loading state before data appears

## Goal of This Exercise

By the end, you should understand:

- How to implement protected routes with React Router
- How to use `Navigate` for redirects
- How to pass return URLs using `location.state`
- How to build auth-aware UI
- How to make data fetching conditional on auth state
