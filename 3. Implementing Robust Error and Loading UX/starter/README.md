# Exercise: Robust Error + Loading UX (No Tailwind)

You’ll build a small “Users” panel that demonstrates three critical UX patterns:

1. **Error Boundary** for render-time crashes (fallback UI + recovery)
2. **Loading skeletons** for async loading
3. **Toasts** for async feedback (success/error)

This exercise is intentionally **unstyled by Tailwind**. Use the provided small CSS file.

## Files you’ll work in

- `src/main.jsx`
- `src/App.jsx`
- `src/components/ErrorBoundary.jsx`
- `src/components/toast.jsx`
- `src/app.css`

## Requirements

### A) Toast notifications

Create a minimal toast system:

- `ToastProvider` holds a list of toasts in state
- `useToast()` exposes:
  - `toast.success(message)`
  - `toast.error(message)`
- Toasts auto-dismiss after ~3 seconds
- Toast UI appears top-right and supports manual dismiss

### B) Error boundary + fallback + reset

Create an `ErrorBoundary` component that:

- Catches **render-time** errors (not network failures)
- Renders a fallback UI:
  - Title: “Something went wrong”
  - Friendly explanation
  - “Try again” button
- Clicking “Try again”:
  - Resets the boundary
  - Calls an optional `onReset()` callback

Wrap the Users panel with this error boundary.

Also add a “Simulate crash” button that triggers a render crash (so the boundary can be tested).

### C) Loading skeleton UI

In the Users panel:

- On initial load, show a skeleton list (5 rows)
- Skeleton should resemble list items (name line + small role line)

### D) Async error UI + recovery

Simulate fetching users:

- Use a short delay (e.g. 600–900ms)
- If the URL includes `?fail=1`, the fetch **must fail**
- Otherwise, fail sometimes (random) so students can see the error path

On failure:

- Show an inline error UI with a **Retry** button
- Trigger an error toast

On success:

- Render users list
- Trigger a success toast (“Users loaded”)

### Quick manual checks

1. First load shows skeleton rows, then a list.
2. Add `?fail=1` → skeleton then inline error + error toast.
3. Click Retry → it tries again.
4. Click Simulate crash → fallback UI appears.
5. Click Try again → returns to panel and reloads.
