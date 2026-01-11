import { Link, useParams } from "react-router-dom";

export function IncidentDetailPage() {
  const { id } = useParams();

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <h1 style={{ margin: 0 }}>Incident Detail</h1>

      <div
        style={{
          padding: "12px",
          border: "1px solid #eee",
          borderRadius: "12px",
          display: "grid",
          gap: "6px",
        }}
      >
        <div style={{ fontWeight: 700 }}>Route param</div>
        <div>
          <code>:id</code> = <code>{id}</code>
        </div>
      </div>

      <p style={{ margin: 0, color: "#555" }}>
        We’ll load real incident data later. For now, this proves the route
        param wiring is correct.
      </p>

      <Link to="/">Back to Incidents</Link>
    </div>
  );
}
