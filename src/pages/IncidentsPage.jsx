import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    const shouldRemove = value === "" || value == null || value === "all";
    if (shouldRemove) next.delete(key);
    else next.set(key, value);

    if (key === "q" && value.trim() === "") next.delete("q");

    setSearchParams(next);
  }

  const filtered = useMemo(() => {
    return INCIDENTS.filter((incident) => {
      const matchesStatus = status === "all" || incident.status === status;
      const matchesPriority =
        priority === "all" || incident.priority === priority;

      const matchesQuery =
        q === "" ||
        incident.title.toLowerCase().includes(q.toLowerCase()) ||
        String(incident.id).includes(q);

      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [status, priority, q]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
        <p className="text-sm text-muted-foreground">
          URL-driven filters support refresh, history, and shareable links.
        </p>
      </div>

      {/* Filters */}
      <section className="grid gap-3 rounded-xl border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-6 md:items-end">
          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Status</span>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Priority</span>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Search</span>
            <Input
              value={q}
              onChange={(e) => updateParam("q", e.target.value)}
              placeholder="Search by title or ID…"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {INCIDENTS.length}
            </span>
          </div>

          <Button
            variant="secondary"
            type="button"
            onClick={() => setSearchParams({})}
          >
            Clear filters
          </Button>
        </div>
      </section>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-xl border bg-card p-10 text-center">
          <div className="max-w-md space-y-2">
            <div className="text-lg font-semibold">No incidents found</div>
            <div className="text-sm text-muted-foreground">
              Try clearing filters, changing status/priority, or adjusting your
              search.
            </div>
          </div>

          <Button
            className="mt-4"
            type="button"
            onClick={() => setSearchParams({})}
          >
            Reset
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
}
