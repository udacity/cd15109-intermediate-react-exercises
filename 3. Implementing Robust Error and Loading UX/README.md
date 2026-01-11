# Exercise: Robust Error + Loading UX (ErrorBoundary, Skeletons, Toasts)

Build a small “Users” panel that demonstrates production-grade UX for:

- crashes (render errors) via an Error Boundary
- async loading (skeleton UI)
- async failures (friendly error UI + toasts)
- recovery actions (retry/reset)

## Files you’ll work in

- `src/main.jsx`
- `src/App.jsx`
- `src/components/ErrorBoundary.jsx`
- `src/components/toast.jsx`

## What you’ll build

### A) Global-ish UI feedback: Toasts

Create a minimal toast system (no libraries):

- A `ToastProvider` that stores a list of toasts in state
- A `useToast()` hook to push toasts like:
  - `toast.success("Saved!")`
  - `toast.error("Failed to load")`
- Toasts auto-dismiss after a short timeout
- Toasts are visually distinct for success vs error

### B) ErrorBoundary + fallback UI + reset

Create an `ErrorBoundary` component:

- Catches render-time errors from child components
- Shows a fallback UI (title + friendly message)
- Includes a “Try again” button that resets the boundary and calls `onReset`

In the app:

- Wrap the Users panel with the ErrorBoundary
- Add a “Simulate crash” button that causes a render error (so the boundary is exercised)

### C) Loading skeletons

In the Users panel:

- When loading, show a list skeleton (5 rows)
- Skeleton should look like real content placeholders

### D) Async errors + recovery actions

In the Users panel:

- Simulate fetching users (small delay)
- Support failure simulation:
  - If URL includes `?fail=1`, the fetch should fail
  - Otherwise fail sometimes (random)
- On failure:
  - Show a user-friendly inline error UI
  - Provide a “Retry” button
  - Show an error toast

### Quick manual checks

1. On first load you see skeleton rows, then user list.
2. Add `?fail=1` to the URL: you see skeleton, then inline error + an error toast.
3. Click Retry: it tries again.
4. Click “Simulate crash”: you see the ErrorBoundary fallback.
5. Click “Try again”: it returns to the app and re-attempts loading.
