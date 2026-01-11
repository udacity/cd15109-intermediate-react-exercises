import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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

function IncidentCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-56" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
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
  const fail = searchParams.get("fail") === "1";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    const t = setTimeout(() => {
      if (canceled) return;

      if (fail) {
        toast.error("Couldn’t load incidents", {
          description:
            "This is a simulated failure. Remove ?fail=1 to try again.",
        });
      }

      setIsLoading(false);
    }, 650);

    return () => {
      canceled = true;
      clearTimeout(t);
      setIsLoading(true);
    };
  }, [fail]);

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
          Loading states use skeletons, and failures show a toast.
        </p>
      </div>

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

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setSearchParams({})}
            >
              Clear filters
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.set("fail", "1");
                setSearchParams(next);
              }}
            >
              Simulate load failure
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
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
