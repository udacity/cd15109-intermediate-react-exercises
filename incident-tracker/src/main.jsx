import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import "./index.css";
import { router } from "@/router";
import { queryClient } from "@/queries/queryClient";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AppStateProvider } from "@/state/AppStateProvider";
import { AuthProvider } from "@/auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppStateProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster richColors closeButton />
          </ThemeProvider>
        </AppStateProvider>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
