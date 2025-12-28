# Exercise: React Query Basics (Setup + useQuery + UX States)

## Learning Objective

Learners will be able to set up React Query and implement basic data
fetching with `useQuery`, including handling loading, error, and empty
states.

## What You'll Practice

- Installing `@tanstack/react-query`
- Creating a `QueryClient` with default options
- Setting up `QueryClientProvider`
- Writing async query functions
- Using the `useQuery` hook
- Accessing query state (`data`, `isLoading`, `error`)
- Handling loading, error, and empty states
- Triggering a refetch from the UI
- (Optional) Installing React Query DevTools

## Files You'll Work In

- `src/main.jsx`
- `src/App.jsx`
- `src/api.js`

## Step 1: Install Dependencies

```bash
npm install @tanstack/react-query
```

(Optional)

```bash
npm install @tanstack/react-query-devtools
```

## Step 2: Set Up React Query

In `src/main.jsx`:

- Create a `QueryClient`
- Set default query options:
  - `retry: 1`
  - `staleTime: 30_000`
- Wrap your app in `QueryClientProvider`
- (Optional) Add `ReactQueryDevtools`

## Step 3: Create the Query Function

In `src/api.js`, implement:

```js
fetchIncidents({ signal, mode });
```

Behavior:

- Simulate a short delay
- If `mode === "fail"` → throw an error
- If `mode === "empty"` → return `[]`
- Otherwise → return a list of incident objects

Use the provided `signal` for abort handling.

## Step 4: Use useQuery

In `src/App.jsx`:

- Add local UI state for `mode` (`ok | empty | fail`)
- Call `useQuery`
- Use a stable `queryKey`: `["incidents", mode]`
- Pass `{ signal }` to `fetchIncidents`
- Render based on query state

## Step 5: Implement UX States

Your UI must handle:

### Loading

- Show "Loading incidents..."
- Show a small placeholder list (3 rows)

### Error

- Show a friendly message
- Show a "Try again" button
- Button calls `query.refetch()`

### Empty

- Show "No incidents found."

### Success

- Render the incident list

## Step 6: Add a Mode Switcher

Add a small UI control to switch modes:

- OK
- Empty
- Fail

Changing the mode should automatically re-run the query.

## Manual Checks

- App loads with a loading state first.
- Switching to "Empty" shows empty state.
- Switching to "Fail" shows error + retry button.
- Switching back to "OK" shows data.
- (Optional) DevTools shows the query state.
