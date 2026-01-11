import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./ui/RootLayout.jsx";
import { IncidentsPage } from "./pages/IncidentsPage.jsx";
import { IncidentDetailPage } from "./pages/IncidentDetailPage.jsx";
import { ApprovalsPage } from "./pages/ApprovalsPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <IncidentsPage /> },
      { path: "incidents/:id", element: <IncidentDetailPage /> },
      { path: "approvals", element: <ApprovalsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
