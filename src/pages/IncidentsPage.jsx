import { Link } from "react-router-dom";

export function IncidentsPage() {
  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <h1 style={{ margin: 0 }}>Incidents</h1>

      <p style={{ margin: 0, color: "#555" }}>
        Placeholder list. We’ll build the real incident list later.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link to="/incidents/1">Open Incident #1</Link>
        <Link to="/incidents/42">Open Incident #42</Link>
      </div>
    </div>
  );
}
