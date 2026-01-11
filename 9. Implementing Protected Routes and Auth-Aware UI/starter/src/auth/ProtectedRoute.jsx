import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isCheckingAuth } = useAuth();

  // TODO: If auth is still being checked, render a small loading UI

  // TODO: If not authenticated:
  // - redirect to /login
  // - pass the current location in state so login can return the user

  // TODO: If authenticated, render children

  return children;
}
