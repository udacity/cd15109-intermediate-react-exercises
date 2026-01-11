import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider.jsx";
import { ErrorBoundary } from "@/components/error/ErrorBoundary.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
