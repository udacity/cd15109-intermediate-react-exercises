# Production Build + Deployment Exercise

**Deploy an Existing React App (Yours or the Demo Project)**

## Goal

In this exercise, you will take a React application and prepare it for production.

You may use:

- ✅ Your own existing React project
- ✅ The demo project provided in this course

You will:

- Create an optimized production build
- Preview the production build locally
- Configure environment variables correctly
- Deploy the app to Vercel or Netlify
- Understand basic CI/CD behavior

This exercise focuses on **production readiness**, not building new features.

# Step 1 — Choose Your Project

You may use:

- Your own React project from this course  
  **or**
- The provided demo project

Make sure it is a Vite-based React project.

# Step 2 — Add Production Environment Variables

In the root of your project, create:

## `.env`

Used during local development.

```env
VITE_APP_NAME=My React App
VITE_ENV_LABEL=local
```

## `.env.production`

Used when building for production.

```env
VITE_APP_NAME=My React App
VITE_ENV_LABEL=production
```

# Step 3 — Use Environment Variables in the App

In your app:

- Read values using `import.meta.env`
- Display:
  - `VITE_APP_NAME`
  - `VITE_ENV_LABEL`

You might show them in a footer, header, or small info panel.

Run locally:

```bash
npm run dev
```

You should see:

- `local` as the environment label.

# Step 4 — Create a Production Build

Run:

```bash
npm run build
```

This generates a `dist/` folder containing optimized production files.

# Step 5 — Preview the Production Build

Run:

```bash
npm run preview
```

Open the URL shown in the terminal.

Confirm:

- The app loads successfully
- The environment label shows `production`
- No console errors appear
- Core features still work

# Pre-Deployment QA Checklist

Before deploying, confirm:

- `npm run build` completes without errors
- `npm run preview` works correctly
- No development-only logs remain
- Environment variables display correctly
- Routing works after refreshing
- All core functionality behaves as expected

# Step 6 — Deploy the Project

Push your project to GitHub if you have not already.

## Option A — Deploy to Vercel

1. Go to https://vercel.com
2. Click **New Project**
3. Import your GitHub repository
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add Environment Variables:
   - `VITE_APP_NAME`
   - `VITE_ENV_LABEL`
8. Click **Deploy**

After deployment, confirm:

- The live URL loads
- The environment label shows `production`
- Core features work correctly

## Option B — Deploy to Netlify

1. Go to https://netlify.com
2. Click **Add new site → Import from Git**
3. Choose your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add Environment Variables:
   - `VITE_APP_NAME`
   - `VITE_ENV_LABEL`
7. Deploy the site

Confirm the live app behaves correctly.

# Step 7 — CI/CD Basics (Optional)

After connecting your repository:

1. Make a small UI change.
2. Commit and push.
3. Confirm a new deployment automatically runs.

This demonstrates basic continuous deployment.

# Reflection Questions

Answer briefly:

1. What is the difference between `npm run dev` and `npm run build`?
2. Why must Vite environment variables start with `VITE_`?
3. Why is previewing the production build important?
4. What triggers a new deployment once your project is connected to GitHub?

# What You Practiced

- Creating optimized production builds
- Understanding the `dist/` output
- Using environment variables properly
- Previewing production builds locally
- Deploying a React application
- Understanding basic CI/CD behavior
