import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/queries/hooks";

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

  const { data, isPending, isError, error, refetch, isFetching } =
    useIncidents();

  const incidents = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    const shouldRemove = value === "" || value == null || value === "all";
    if (shouldRemove) next.delete(key);
    else next.set(key, value);

    if (key === "q" && value.trim() === "") next.delete("q");

    setSearchParams(next);
  }

  const filtered = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesStatus = status === "all" || incident.status === status;
      const matchesPriority =
        priority === "all" || incident.priority === priority;

      const matchesQuery =
        q === "" ||
        String(incident.id).includes(q) ||
        (incident.title ?? "").toLowerCase().includes(q.toLowerCase());

      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [incidents, status, priority, q]);

  if (isError) {
    const message =
      error?.message || "Something went wrong while loading incidents.";
    toast.error("Couldn’t load incidents", { description: message });

    return (
      <div className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground">
            We hit an error while loading data. Try again.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Error:</span>{" "}
              <span className="text-muted-foreground">{message}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => refetch()}>
                Retry
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSearchParams({})}
              >
                Clear filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground">
            Incidents load from the API with React Query.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => refetch()}
          disabled={isPending || isFetching}
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </Button>
      </div>

      <section className="grid gap-3 rounded-xl border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-6 md:items-end">
          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Status</span>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={status}
              onChange={(e) => updateParam("status", e.target.value)}
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              {incidents.length}
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

      {isPending ? (
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      ) : incidents.length === 0 ? (
        <div className="grid place-items-center rounded-xl border bg-card p-10 text-center">
          <div className="max-w-md space-y-2">
            <div className="text-lg font-semibold">No incidents</div>
            <div className="text-sm text-muted-foreground">
              The API returned an empty list.
            </div>
          </div>
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
