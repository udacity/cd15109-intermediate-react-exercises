# Exercise: Build a UI with shadcn/ui + Tailwind (Implementation)

In this exercise, you’ll build a small, accessible UI using **shadcn/ui components** (Radix-based, headless + accessible) and **Tailwind utility classes**.

You’ll implement:

- A responsive layout (1 column on small screens, 2 columns on larger screens)
- A small UI composed of `Card`, `Button`, `Input`, and `Dialog`
- A dark mode toggle (no library needed)
- Keyboard-friendly interactions (focus states, dialog accessibility)

## You will work in

- `src/App.jsx`

(Assume Tailwind + shadcn/ui are already set up in the starter.)

## UI spec

Build a “Workspace Settings” page with two cards and a dialog.

### A) Page layout

- Center the content with a max width (e.g., `max-w-4xl`) and padding.
- Header row:
  - Title: `Workspace Settings`
  - Subtitle text below it (short sentence)
  - Dark mode toggle button on the right side of the header row (or aligned to the end)
- Main area:
  - A responsive grid:
    - 1 column on mobile
    - 2 columns on `md` and up

### B) Card 1: Profile

Use `Card` to show:

- “Profile” title + short description
- Two text inputs:
  - Display name
  - Email
- A primary “Save” button
- Inputs should be full width and have spacing that looks intentional.

### C) Card 2: Danger Zone

Use `Card` to show:

- “Danger Zone” title + short description
- A destructive-looking action: “Delete workspace”
- Clicking it opens a `Dialog` confirmation modal.

### D) Dialog: Confirm delete

Use `Dialog` to confirm deletion:

- Title: `Delete workspace?`
- Description warns that this cannot be undone.
- Require the user to type `DELETE` into an input to enable the confirm button.
- Buttons:
  - Cancel (closes dialog)
  - Confirm delete (disabled until input matches `DELETE`)
- After confirming:
  - Close the dialog
  - Show a simple inline success message somewhere on the page (no toast required)

### E) Dark mode

Implement a dark mode toggle without any additional libraries:

- Toggle a `dark` class on the root element (`document.documentElement`)
- Persist preference in `localStorage`
- On initial load, read localStorage and apply the class

### F) Accessibility and keyboard behavior

- Dialog must be usable by keyboard:
  - “Delete workspace” button opens it
  - `Esc` closes it (Dialog handles this)
  - Focus should be usable inside the dialog via Tab
- Ensure buttons and inputs have visible focus states (Tailwind defaults are fine)

## Constraints

- Keep the solution in a single file (`App.jsx`) and use as few extra components as possible.
- Use shadcn/ui components:
  - `Button`, `Input`, `Card`, `Dialog`
- Use Tailwind utilities for layout and spacing.

## Quick manual checks

1. Layout stacks on mobile and becomes two columns on larger screens.
2. Dark mode toggle changes the UI and persists on refresh.
3. “Delete workspace” opens the dialog.
4. Confirm button stays disabled until the user types `DELETE`.
5. Cancel closes the dialog.
6. Confirm closes the dialog and shows a success message.
