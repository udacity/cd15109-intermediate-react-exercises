import { Link, useSearchParams } from "react-router-dom";
import { tickets } from "../data/tickets.js";

export default function TicketsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  const filtered =
    status === "open" || status === "closed"
      ? tickets.filter((t) => t.status === status)
      : tickets;

  function setStatus(next) {
    const nextParams = new URLSearchParams(searchParams);
    if (!next) nextParams.delete("status");
    else nextParams.set("status", next);
    setSearchParams(nextParams, { replace: true });
  }

  const qs = searchParams.toString();
  const suffix = qs ? `?${qs}` : "";

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Tickets</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setStatus("open")}
          aria-pressed={status === "open"}
        >
          Open
        </button>
        <button
          onClick={() => setStatus("closed")}
          aria-pressed={status === "closed"}
        >
          Closed
        </button>
        <button onClick={() => setStatus(null)} aria-pressed={!status}>
          All
        </button>
      </div>

      <ul style={{ paddingLeft: 18 }}>
        {filtered.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <Link to={`/tickets/${t.id}${suffix}`}>{t.title}</Link>{" "}
            <span style={{ opacity: 0.7 }}>({t.status})</span>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No tickets match this filter.</p>
      ) : null}
    </section>
  );
}
