import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider.jsx";
import { ErrorBoundary } from "@/components/error/ErrorBoundary.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
          {import.meta.env.DEV ? (
            <ReactQueryDevtools initialIsOpen={false} />
          ) : null}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
