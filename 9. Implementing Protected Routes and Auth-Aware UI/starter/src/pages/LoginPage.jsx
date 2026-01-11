import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Determine where to send the user after login:
  // - if redirected here from a protected route, use location.state.from
  // - otherwise pick a sensible default (e.g. "/profile")
  const destination = "/profile";

  // Optional UX
  if (isAuthenticated) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Login</h1>
        <p>You’re already logged in.</p>
        <button type="button" onClick={() => navigate("/profile")}>
          Go to profile
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: 16, maxWidth: 420 }}>
      <h1>Login</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setIsSubmitting(true);

          try {
            // TODO: Perform login, then redirect to destination
            await login({ email, password });
            // navigate(destination, { replace: true });
          } catch (err) {
            setError(err?.message || "Login failed.");
          } finally {
            setIsSubmitting(false);
          }
        }}
        style={{ display: "grid", gap: 10, marginTop: 12 }}
      >
        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </label>

        {error ? <p style={{ color: "crimson", margin: 0 }}>{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: isSubmitting ? "#f4f4f4" : "white",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </main>
  );
}
