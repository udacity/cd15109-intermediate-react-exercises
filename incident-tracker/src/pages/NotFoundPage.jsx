import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <h1 style={{ margin: 0 }}>404</h1>
      <p style={{ margin: 0, color: "#555" }}>That page doesn’t exist.</p>
      <Link to="/">Go to Incidents</Link>
    </div>
  );
}
