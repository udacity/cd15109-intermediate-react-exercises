export function LoginPage() {
  return (
    <div style={{ display: "grid", gap: "12px", maxWidth: "420px" }}>
      <h1 style={{ margin: 0 }}>Login</h1>

      <p style={{ margin: 0, color: "#555" }}>
        Placeholder login route. We’ll wire up auth later.
      </p>

      <div style={{ display: "grid", gap: "8px" }}>
        <label style={{ display: "grid", gap: "4px" }}>
          <span>Email</span>
          <input placeholder="you@example.com" />
        </label>

        <label style={{ display: "grid", gap: "4px" }}>
          <span>Password</span>
          <input type="password" placeholder="••••••••" />
        </label>

        <button type="button">Sign in</button>
      </div>
    </div>
  );
}
