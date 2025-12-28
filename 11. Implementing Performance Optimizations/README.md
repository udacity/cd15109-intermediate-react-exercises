# Exercise: Implementing Performance Optimizations

In this exercise, you’ll take a small app that **works** but feels a bit **laggy**, and you’ll apply a few targeted performance optimizations:

- Profiling + identifying what’s slow
- Memoizing expensive derived data (`useMemo`)
- Stabilizing callback props (`useCallback`)
- Avoiding unnecessary re-renders with `React.memo`
- Keeping input responsive with `useTransition`

## What you’re building

A “Filterable Incident Grid”:

- A search input + severity filter
- A grid of incident cards (hundreds of items)
- A stats header that shows counts by severity
- A detail panel for the selected incident

The starter code is intentionally written in a way that causes:

- expensive calculations to run too often
- cards to re-render more than necessary
- typing in the search field to feel sluggish

Your goal is to fix that without changing the UI/behavior.

## Files you’ll work in

- `src/main.jsx`
- `src/App.jsx`
- `src/data.js`
- `src/IncidentDetail.jsx`

## Part 1: Profiling

**Goal:** Verify what’s slow and what re-renders.

In `src/data.js`, you’ll see a helper that’s intentionally “expensive.”
Use the provided timing hooks (or add `console.time(...)`) to confirm it runs often.

In `src/App.jsx`, use a lightweight approach to confirm re-renders (e.g., a render counter component or `console.count` in a key component).

You don’t need a perfect flamegraph read — just confirm:

- the expensive compute runs on every keystroke
- many cards re-render during typing

## Part 2: Memoize derived data + stabilize handlers

### A) Memoize expensive derived data (`useMemo`)

In `App.jsx`, there are two derived values that should be memoized:

- `filteredIncidents`
- `stats` (counts by severity)

Memoize them so they only recompute when the relevant inputs change.

### B) Prevent card re-renders

In `App.jsx`:

- Wrap `IncidentCard` with `React.memo`
- Use `useCallback` for any handler passed to `IncidentCard` (e.g., `onSelect`)

The goal is:

- typing updates the list, but cards shouldn’t re-render unnecessarily because a callback prop changed identity.

## Part 3: Transitions (keep typing responsive)

**Goal:** Make typing feel smooth even when filtering a large list.

Use `useTransition` to treat the filter update as non-urgent:

- The input should update immediately
- The heavy filtering / rendering should happen as a transition
- While the transition is pending, show a subtle “Updating…” UI

## Expected behavior checklist

Verify:

- Search and severity filter still work
- The selected incident still shows in the detail panel
- Typing in the search input feels more responsive than before
- Expensive computation runs less often (based on your timing logs)
- Cards re-render less often (based on your render counter / logs)
- A small “Updating…” indicator appears during transitions

## Bonus (optional)

`IncidentDetail.jsx` is loaded via `React.lazy`. You can leave it as-is.

If you want to explore further, try making the detail panel slightly heavier and confirm it doesn’t impact initial render as much due to code splitting.
