# Exercise: Advanced Routing Patterns (Minimal)

Build a tiny Tickets app to practice:

- A layout route with `<Outlet />`
- Nested routes (including an index route)
- URL params (`:ticketId`)
- Search params for list filtering (`?status=open|closed`)
- Programmatic navigation back to the list (preserve filter)
- A catch-all 404 route

## Files you’ll work in

- `src/main.jsx`
- `src/App.jsx`
- `src/routes/TicketsPage.jsx`
- `src/routes/TicketPage.jsx`
- `src/data/tickets.js`

## Routes you must support

- `/` → redirects to `/tickets`
- `/tickets` → list page (filter via `?status=...`)
- `/tickets/:ticketId` → detail page (nested routes)
  - index route → Overview
  - `/tickets/:ticketId/activity` → Activity
- `*` → 404 UI

## UI requirements

### Layout (in App.jsx)

- A small header with a single nav link: “Tickets”
- An `<Outlet />` where pages render

### TicketsPage

- Render tickets from `src/data/tickets.js`
- Filter buttons that update the URL using search params:
  - Open → `?status=open`
  - Closed → `?status=closed`
  - All → remove `status`
- List reflects the URL filter (do not store status in local component state)
- Each list item links to `/tickets/:ticketId`
- Preserve the current search params when linking to a ticket detail

### TicketPage

- Read `ticketId` from params and load the ticket from the data file
- If no ticket exists, show “Ticket not found” + a back button
- Render a small sub-nav:
  - Overview (index route)
  - Activity (`activity`)
- Use `<Outlet />` for nested content
- “Back to tickets” button navigates to `/tickets`, preserving the current filter search params

### 404

- For unknown routes, show a simple “Not Found” UI with a link back to `/tickets`

## Quick manual checks

1. `/` redirects to `/tickets`
2. Filter buttons change the URL and the list updates
3. Clicking a ticket opens `/tickets/:ticketId` and shows Overview by default
4. Activity tab works at `/tickets/:ticketId/activity`
5. Back preserves the filter
6. Unknown routes show 404
