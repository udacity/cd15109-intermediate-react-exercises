import React from "react";

const AuthContext = React.createContext(null);

const STORAGE_KEY = "auth:token";

function readToken() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeToken(token) {
  try {
    window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // fail silently
  }
}

function clearToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}

export function AuthProvider({ children, fakeLogin }) {
  const [token, setToken] = React.useState(() => readToken());

  const isAuthenticated = Boolean(token);

  async function login(credentials) {
    const result = await fakeLogin(credentials);
    setToken(result.token);
    writeToken(result.token);
  }

  function logout() {
    setToken(null);
    clearToken();
  }

  const value = React.useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
    }),
    [token, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
