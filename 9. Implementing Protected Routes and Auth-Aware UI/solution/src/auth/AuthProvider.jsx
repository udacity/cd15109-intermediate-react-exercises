import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "demo_auth_token";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeLoginRequest({ email, password }) {
  await sleep(500);
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  return { token: "demo-token" };
}

async function fakeFetchProfile(token) {
  await sleep(500);
  if (!token) {
    throw new Error("Missing token.");
  }
  return { name: "Alex Developer", email: "alex@example.com" };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setToken(saved || null);
    setIsCheckingAuth(false);
  }, []);

  const isAuthenticated = Boolean(token);

  const login = async ({ email, password }) => {
    const result = await fakeLoginRequest({ email, password });
    localStorage.setItem(STORAGE_KEY, result.token);
    setToken(result.token);
    return result.token;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  const fetchProfile = async () => {
    return fakeFetchProfile(token);
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
