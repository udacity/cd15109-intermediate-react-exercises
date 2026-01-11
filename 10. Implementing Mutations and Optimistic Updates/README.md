# Exercise: Implementing Mutations and Optimistic Updates (React Query)

In this exercise, you’ll implement **mutations** using TanStack React Query, including:

- `useMutation` basics (loading + error UI)
- Cache invalidation (`invalidateQueries`)
- Manual cache updates (`setQueryData`)
- Optimistic updates with rollback (`onMutate` + `onError`)
- Simple toast-style feedback
- Disabling UI while mutations are in flight

## What you're building

A minimal "Tasks" page that:

- Fetches and displays a task list
- Lets users:
  1. Add a new task (invalidate list query)
  2. Rename a task (manual cache update)
  3. Toggle a task as done/undone (optimistic update + rollback on error)

## Setup assumptions

This exercise assumes your project already includes:

- `@tanstack/react-query`
- `react-router-dom` is not required for this exercise

You will work in these files:

- `src/main.jsx`
- `src/App.jsx`
- `src/api.js`
- `src/hooks.js`

## Query key

Use a single query key for the task list:

- `["tasks"]`

## Part 1: useMutation Basics (Add Task)

**Goal:** Create a mutation that adds a task.

**Requirements:**

- The "Add" button triggers a mutation
- Disable the input and button while the mutation is loading
- Show an error message if the mutation fails
- On success, clear the input and show a toast-style message

## Part 2: Cache Invalidation (After Add)

After adding a task:

- Invalidate the `["tasks"]` query so the list refreshes

This can be done in `onSuccess` (or `onSettled`).

## Part 3: Manual Cache Updates (Rename Task)

**Goal:** Rename a task without refetching.

**Requirements:**

- Clicking "Rename" updates the task title via a mutation
- On success, update the cached `["tasks"]` data using `queryClient.setQueryData`
- Do not invalidate/refetch for this one (manual update only)
- Disable the button while renaming

## Part 4: Optimistic UI + Rollback (Toggle Done)

**Goal:** Toggle a task’s `completed` state optimistically.

**Requirements:**

- Use `onMutate` to update the cached list immediately
- Snapshot previous cached data so you can roll back
- If the mutation fails, restore previous cached data in `onError`
- Show toast-style feedback on success and failure
- Disable the toggle button while that task is being updated

## Expected behavior checklist

Before you submit, verify:

- Initial tasks load from the query
- Add task:
  - disables UI while saving
  - shows a success toast
  - refreshes the list via invalidation
- Rename task:
  - updates UI immediately after success without a refetch
  - shows a success toast
- Toggle done:
  - updates immediately (optimistic)
  - rolls back if the request fails
  - shows a success or error toast

## Notes

The fake API intentionally fails sometimes for the toggle mutation so you can see rollback working.
