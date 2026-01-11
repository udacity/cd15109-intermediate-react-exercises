import { Link, useSearchParams } from "react-router-dom";

const INCIDENTS = [
  {
    id: 41,
    title: "Checkout button unresponsive",
    status: "open",
    priority: "high",
  },
  {
    id: 42,
    title: "Mobile layout overlap on iOS",
    status: "open",
    priority: "medium",
  },
  {
    id: 7,
    title: "PDF export fails intermittently",
    status: "investigating",
    priority: "high",
  },
  { id: 13, title: "Notification delay", status: "resolved", priority: "low" },
  {
    id: 19,
    title: "Search indexing backlog",
    status: "investigating",
    priority: "medium",
  },
];

const STATUS_OPTIONS = ["all", "open", "investigating", "resolved"];
const PRIORITY_OPTIONS = ["all", "low", "medium", "high"];

function normalizeParam(value, allowed, fallback) {
  if (!value) return fallback;
  return allowed.includes(value) ? value : fallback;
}

export function IncidentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = normalizeParam(
    searchParams.get("status"),
    STATUS_OPTIONS,
    "all"
  );
  const priority = normalizeParam(
    searchParams.get("priority"),
    PRIORITY_OPTIONS,
    "all"
  );
  const q = (searchParams.get("q") ?? "").trim();

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    // Keep URLs clean: if set to "all" or empty, remove the param.
    const shouldRemove = value === "" || value == null || value === "all";

    if (shouldRemove) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    // If q is cleared, delete it instead of leaving q=
    if (key === "q" && value.trim() === "") {
      next.delete("q");
    }

    setSearchParams(next);
  }

  const filtered = INCIDENTS.filter((incident) => {
    const matchesStatus = status === "all" || incident.status === status;
    const matchesPriority =
      priority === "all" || incident.priority === priority;

    const matchesQuery =
      q === "" ||
      incident.title.toLowerCase().includes(q.toLowerCase()) ||
      String(incident.id).includes(q);

    return matchesStatus && matchesPriority && matchesQuery;
  });

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <h1 style={{ margin: 0 }}>Incidents</h1>

      <p style={{ margin: 0, color: "#555" }}>
        Filters on this page are URL-driven using search params.
      </p>

      <section
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "end",
          padding: "12px",
          border: "1px solid #eee",
          borderRadius: "12px",
        }}
      >
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Status</span>
          <select
            value={status}
            onChange={(e) => updateParam("status", e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: "6px" }}>
          <span>Priority</span>
          <select
            value={priority}
            onChange={(e) => updateParam("priority", e.target.value)}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: "6px", minWidth: "220px" }}>
          <span>Search</span>
          <input
            value={q}
            onChange={(e) => updateParam("q", e.target.value)}
            placeholder="Search by title or ID…"
          />
        </label>

        <button
          type="button"
          onClick={() => setSearchParams({})}
          style={{ height: "fit-content" }}
        >
          Clear
        </button>
      </section>

      <div style={{ display: "grid", gap: "8px" }}>
        {filtered.length === 0 ? (
          <div style={{ color: "#555" }}>No incidents match these filters.</div>
        ) : (
          filtered.map((incident) => (
            <div
              key={incident.id}
              style={{
                padding: "12px",
                border: "1px solid #eee",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div style={{ display: "grid", gap: "4px" }}>
                <div style={{ fontWeight: 700 }}>
                  #{incident.id} — {incident.title}
                </div>
                <div style={{ color: "#555", fontSize: "14px" }}>
                  status: {incident.status} · priority: {incident.priority}
                </div>
              </div>

              <Link to={`/incidents/${incident.id}`}>Open</Link>
            </div>
          ))
        )}
      </div>

      {/* Keep one explicit example link for learners who want to see the URL */}
      <div style={{ marginTop: "6px", color: "#555", fontSize: "14px" }}>
        Example URL: <code>?status=open&amp;priority=high&amp;q=checkout</code>
      </div>
    </div>
  );
}
