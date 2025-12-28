import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [mode, setMode] = useState("ok"); // ok | empty | fail

  const query = useQuery({
    queryKey: ["incidents", mode],
    queryFn: ({ signal }) => fetchIncidents({ signal, mode }),
  });

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
        {query.isLoading ? (
          <div>
            <div>Loading incidents…</div>
            <PlaceholderList />
          </div>
        ) : null}

        {query.error ? (
          <div
            style={{
              border: "1px solid #f2b8b5",
              background: "#fdf0ef",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div style={{ fontWeight: 600 }}>Couldn’t load incidents</div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              {query.error instanceof Error
                ? query.error.message
                : "Unknown error"}
            </div>
            <button style={{ marginTop: 10 }} onClick={() => query.refetch()}>
              Try again
            </button>
          </div>
        ) : null}

        {query.data && query.data.length === 0 ? (
          <div style={{ opacity: 0.75 }}>No incidents found.</div>
        ) : null}

        {query.data && query.data.length > 0 ? (
          <ul style={{ marginTop: 10, paddingLeft: 18 }}>
            {query.data.map((inc) => (
              <li key={inc.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{inc.title}</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  {inc.id} • severity: {inc.severity}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
}
