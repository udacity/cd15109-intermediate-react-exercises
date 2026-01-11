import { useMemo, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/queries/hooks";
import { uiReducer, initialUiState, UI_ACTIONS } from "@/state/uiReducer";

const STATUS_OPTIONS = ["all", "open", "triage", "approved"];
const PRIORITY_OPTIONS = ["all", "low", "medium", "high"];

function normalizeFromList(value, allowed, fallback) {
  if (!value) return fallback;
  return allowed.includes(value) ? value : fallback;
}

function IncidentCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

export function IncidentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [uiState, dispatch] = useReducer(uiReducer, initialUiState);

  const status = normalizeFromList(searchParams.get("status"), STATUS_OPTIONS, "all");
  const priority = normalizeFromList(searchParams.get("priority"), PRIORITY_OPTIONS, "all");
  const q = (searchParams.get("q") ?? "").trim();

  const { data, isPending, isError, error } = useIncidents({
    status,
    q,
  });

  const incidents = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const visible = useMemo(() => {
    if (priority === "all") return incidents;
    return incidents.filter((i) => i.priority === priority);
  }, [incidents, priority]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    const shouldRemove = value === "" || value == null || value === "all";
    if (shouldRemove) next.delete(key);
    else next.set(key, value);

    if (key === "q" && value.trim() === "") next.delete("q");

    setSearchParams(next);
  }

  if (isError) {
    toast.error("Couldn’t load incidents", {
      description: error?.message || "Unknown error",
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground">
            Server state is handled by React Query. UI preferences live in a reducer.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={uiState.view === "grid" ? "default" : "secondary"}
            onClick={() =>
              dispatch({ type: UI_ACTIONS.SET_VIEW, payload: "grid" })
            }
          >
            Grid
          </Button>
          <Button
            variant={uiState.view === "list" ? "default" : "secondary"}
            onClick={() =>
              dispatch({ type: UI_ACTIONS.SET_VIEW, payload: "list" })
            }
          >
            List
          </Button>
        </div>
      </div>

      <section className="grid gap-3 rounded-xl border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-6">
          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Status</span>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm"
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
              className="h-9 rounded-md border bg-background px-3 text-sm"
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
      </section>

      {isPending ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className={
            uiState.view === "grid"
              ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-3"
          }
        >
          {visible.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              selected={uiState.selectedIds.includes(incident.id)}
              onToggleSelect={() =>
                dispatch({
                  type: UI_ACTIONS.TOGGLE_SELECTED,
                  payload: incident.id,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
