import {
  Suspense,
  lazy,
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  computeStats,
  makeIncidents,
  matchesFilter,
  SEVERITIES,
} from "./data.js";

const IncidentDetail = lazy(() => import("./IncidentDetail.jsx"));

const IncidentCard = memo(function IncidentCard({ incident, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(incident)}
      style={{
        textAlign: "left",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 12,
        background: "white",
        cursor: "pointer",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <strong>{incident.title}</strong>
        <span style={{ fontSize: 12, color: "#666" }}>{incident.severity}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
        {incident.owner}
      </div>
    </button>
  );
});

export default function App() {
  const [incidents] = useState(() => makeIncidents(700));

  // Keep the input immediate
  const [text, setText] = useState("");

  // Non-urgent filter criteria
  const [severity, setSeverity] = useState("all");

  const [selected, setSelected] = useState(null);

  const [isPending, startTransition] = useTransition();

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => matchesFilter(inc, { text, severity }));
  }, [incidents, text, severity]);

  const stats = useMemo(() => {
    return computeStats(filteredIncidents);
  }, [filteredIncidents]);

  const handleSelect = useCallback((incident) => {
    setSelected(incident);
  }, []);

  return (
    <div style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Incidents</h1>
        {isPending ? <span style={{ color: "#666" }}>Updating…</span> : null}
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              value={text}
              onChange={(e) => {
                const next = e.target.value;
                setText(next);

                // Treat the "work" of filtering + rendering the grid as non-urgent
                startTransition(() => {
                  // Here we keep severity untouched; filtering uses the latest text.
                  // This transition primarily smooths the UI update under load.
                });
              }}
              placeholder="Search by title or owner…"
              style={{
                flex: 1,
                minWidth: 240,
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />

            <select
              value={severity}
              onChange={(e) => {
                const next = e.target.value;
                startTransition(() => {
                  setSeverity(next);
                });
              }}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            >
              <option value="all">All severities</option>
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "#666",
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span>low: {stats.low}</span>
            <span>medium: {stats.medium}</span>
            <span>high: {stats.high}</span>
            <span>critical: {stats.critical}</span>
            <span style={{ marginLeft: "auto" }}>
              {filteredIncidents.length} shown
            </span>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
              opacity: isPending ? 0.75 : 1,
            }}
          >
            {filteredIncidents.map((inc) => (
              <IncidentCard
                key={inc.id}
                incident={inc}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <Suspense
          fallback={
            <aside
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
              }}
            >
              Loading detail…
            </aside>
          }
        >
          <IncidentDetail incident={selected} />
        </Suspense>
      </section>

      <footer style={{ marginTop: 16, color: "#666", fontSize: 12 }}>
        Tip: Profile before vs after. Your goal is fewer re-renders + fewer
        expensive compute calls.
      </footer>
    </div>
  );
}
