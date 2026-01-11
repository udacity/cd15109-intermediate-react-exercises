# Incident Tracker — In-Class Project (Intermediate React)

This project is the in-class application for the *Intermediate React* course.

The Incident Tracker app is designed to show real-world React patterns, including routing, data fetching, state management, performance optimization, testing, and deployment workflows.

---

## What This Project Covers

- Modern React routing with React Router
- Server state management with React Query
- Local UI state with reducers and context
- URL-driven state (filters, params)
- Optimistic updates and mutations
- Accessibility and UX considerations
- Performance profiling and memoization
- Unit and integration testing with Vitest + RTL
- Production builds and deployment concepts

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install dependencies
```bash
npm install
```

### Run the app locally
```bash
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

---

## Running Tests

```bash
npm test
```

This runs the unit and integration tests using **Vitest** and **React Testing Library**.

---

## Production Build (Local Preview)

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Notes on Data & Auth

- The app uses **mock API data** from the `public/api` directory.
- Authentication is **demo-only** and stored in session/local storage.
- Mutations (create, approve, reject, comment) simulate real behavior but are not persisted to a backend.

This setup keeps the focus on React patterns rather than backend infrastructure.

---

## Deployment

This project can be deployed to platforms like **Vercel** or **Netlify**.

Key concepts demonstrated:
- Environment-based configuration
- SPA routing support
- Automatic deploys on Git push

No build artifacts (`dist/`) are committed — the platform handles builds automatically.

---

## Educational Intent

This repository represents a **snapshot of the final state** after completing the in-class screencasts.

Students are encouraged to:
- Explore commits step-by-step
- Experiment with changes
- Focus on understanding *why* patterns are used, not just *how*
