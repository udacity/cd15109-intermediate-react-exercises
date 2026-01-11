import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/auth/authContext";
import { clearAuthSession, loadAuthSession, saveAuthSession } from "@/auth/authStorage";
import { registerUnauthorizedHandler } from "@/auth/authBridge";
import { queryClient } from "@/queries/queryClient";

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;

  const id = typeof user.id === "string" || typeof user.id === "number" ? String(user.id) : null;
  const name = typeof user.name === "string" ? user.name : null;
  const role = typeof user.role === "string" ? user.role : null;

  return id ? { id, name: name ?? "User", role: role ?? "member" } : null;
}

function loadInitialSession() {
  return loadAuthSession();
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadInitialSession);

  const token = session.token ?? null;
  const user = normalizeUser(session.user);
  const isAuthenticated = Boolean(token);
  const isResolving = false;

  function login(next) {
    const nextToken = typeof next?.token === "string" ? next.token : null;
    const nextUser = normalizeUser(next?.user);

    const nextSession = { token: nextToken, user: nextUser };
    setSession(nextSession);

    if (nextToken && nextUser) saveAuthSession({ token: nextToken, user: nextUser });
    else clearAuthSession();
  }

  function logout() {
    setSession({ token: null, user: null });
    clearAuthSession();
    queryClient.clear();
  }

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      logout();
    });

    return () => {
      registerUnauthorizedHandler(null);
    };
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    window.__AUTH__ = {
      login,
      logout,
      getSession: () => ({ token, user, isAuthenticated, isResolving }),
    };

    return () => {
      delete window.__AUTH__;
    };
  }, [token, user, isAuthenticated, isResolving]);

  const value = useMemo(() => {
    return {
      token,
      user,
      isAuthenticated,
      isResolving,
      login,
      logout,
    };
  }, [token, user, isAuthenticated, isResolving]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
