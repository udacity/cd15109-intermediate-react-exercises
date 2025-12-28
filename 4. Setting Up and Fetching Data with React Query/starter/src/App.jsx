import { useState } from "react";
import { fetchIncidents } from "./api.js";

function PlaceholderList() {
  return (
    <ul style={{ marginTop: 10, paddingLeft: 18 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} style={{ opacity: 0.6, marginBottom: 6 }}>
          Loading…
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [mode, setMode] = useState("ok");

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 20,
        maxWidth: 720,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Incidents</h1>
          <p style={{ marginTop: 6, opacity: 0.7 }}>
            React Query setup + useQuery + UX states
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ fontSize: 14, opacity: 0.8 }}>
            Mode:
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="ok">OK</option>
              <option value="empty">Empty</option>
              <option value="fail">Fail</option>
            </select>
          </label>
        </div>
      </header>

      <main style={{ marginTop: 18 }}>
        <div style={{ opacity: 0.7 }}>
          Wire up React Query to fetch incidents for mode: <b>{mode}</b>
        </div>

        <div style={{ marginTop: 10 }}>
          <button onClick={() => fetchIncidents({ mode })}>
            Temporary: Call fetchIncidents
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <PlaceholderList />
        </div>
      </main>
    </div>
  );
}
