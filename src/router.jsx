import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@/ui/RootLayout";
import { IncidentsPage } from "@/pages/IncidentsPage";
import { IncidentDetailPage } from "@/pages/IncidentDetailPage";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <IncidentsPage /> },
      { path: "incidents/:id", element: <IncidentDetailPage /> },
      {
        path: "approvals",
        element: (
          <ProtectedRoute title="Approvals">
            <ApprovalsPage />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
