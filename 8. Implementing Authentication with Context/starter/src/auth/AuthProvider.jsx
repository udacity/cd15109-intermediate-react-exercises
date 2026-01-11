import React from "react";

const AuthContext = React.createContext(null);

const STORAGE_KEY = "auth:token";

// TODO: Add safe storage helpers for reading/writing/removing the token.
// Storage failures should not crash the app.
function readToken() {
  return null;
}

function writeToken(token) {}

function clearToken() {}

// TODO: Implement AuthProvider:
// - store token in state
// - initialize token from localStorage on first render
// - login() calls fake login and stores token on success
// - logout() clears state + localStorage
export function AuthProvider({ children, fakeLogin }) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

// TODO: Implement useAuth hook that throws if used outside provider
export function useAuth() {
  throw new Error("Not implemented");
}
