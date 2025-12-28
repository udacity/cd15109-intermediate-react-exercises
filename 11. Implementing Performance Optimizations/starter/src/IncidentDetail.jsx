export default function IncidentDetail({ incident }) {
  if (!incident) {
    return (
      <aside
        style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
      >
        <p style={{ margin: 0, color: "#666" }}>
          Select an incident to see details.
        </p>
      </aside>
    );
  }

  return (
    <aside style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
      <h2 style={{ marginTop: 0 }}>{incident.title}</h2>
      <p style={{ margin: "6px 0" }}>
        <strong>Owner:</strong> {incident.owner}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Severity:</strong> {incident.severity}
      </p>
      <p style={{ margin: "10px 0 0", color: "#444" }}>
        {incident.description}
      </p>
    </aside>
  );
}
