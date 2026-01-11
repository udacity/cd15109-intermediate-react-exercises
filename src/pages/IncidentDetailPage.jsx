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
        }}
      >
        <div style={{ fontWeight: 700 }}>Incident ID</div>
        <div>{id}</div>
      </div>

      <Link to="/">Back to Incidents</Link>
    </div>
  );
}
