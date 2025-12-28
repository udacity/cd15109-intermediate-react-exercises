import React from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/useAuth";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fakeLogin({ email, password }) {
  await sleep(300);

  const validEmail = "student@example.com";
  const validPassword = "letmein";

  if (email === validEmail && password === validPassword) {
    return {
      token: "demo-token-" + Date.now(),
    };
  }

  throw new Error("Invalid email or password");
}

function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 10, maxWidth: 320 }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <label>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Password</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      </div>

      {error ? (
        <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>
      ) : null}

      <button type="submit">Log in</button>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Try: student@example.com / letmein
      </div>
    </form>
  );
}

function AccountView() {
  const { token, logout } = useAuth();

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>Signed in.</div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        Token: <code>{token ? token.slice(0, 12) : ""}...</code>
      </div>
      <button type="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

function Shell() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 16,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Auth with Context</h1>
      {isAuthenticated ? <AccountView /> : <LoginForm />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider fakeLogin={fakeLogin}>
      <Shell />
    </AuthProvider>
  );
}
