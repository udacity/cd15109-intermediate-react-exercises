import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "demo_auth_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // TODO: On app start:
    // - restore any saved auth token (if present)
    // - update token state
    // - set isCheckingAuth to false when done
  }, []);

  const isAuthenticated = Boolean(token);

  const login = async ({ email, password }) => {
    // TODO: Simulate an async login request:
    // - validate inputs
    // - "return" a token
    // - persist token (optional) and update state
    // - throw an Error on failure
    throw new Error("Not implemented");
  };

  const logout = () => {
    // TODO: Clear auth state and any persistence
    throw new Error("Not implemented");
  };

  const fetchProfile = async () => {
    // TODO: Simulate an async profile fetch:
    // - only succeed if token exists
    // - return basic profile data
    throw new Error("Not implemented");
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated,
      isCheckingAuth,
      login,
      logout,
      fetchProfile,
    }),
    [token, isAuthenticated, isCheckingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
