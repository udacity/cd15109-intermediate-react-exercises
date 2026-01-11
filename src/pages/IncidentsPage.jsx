import { useMemo, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/queries/hooks";
import { uiReducer, initialUiState, UI_ACTIONS } from "@/state/uiReducer";
import { getSelectedCount } from "@/state/uiSelectors";

const STATUS_OPTIONS = ["all", "open", "triage", "approved"];
const PRIORITY_OPTIONS = ["all", "low", "medium", "high"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "priority", label: "Priority (high → low)" },
];

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

function priorityRank(priority) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  if (priority === "low") return 1;
  return 0;
}

export function IncidentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [uiState, dispatch] = useReducer(uiReducer, initialUiState);

  const status = normalizeFromList(searchParams.get("status"), STATUS_OPTIONS, "all");
  const priority = normalizeFromList(searchParams.get("priority"), PRIORITY_OPTIONS, "all");
  const q = (searchParams.get("q") ?? "").trim();

  const { data, isPending, isError, error } = useIncidents({ status, q });

  const incidents = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const priorityFiltered = useMemo(() => {
    if (priority === "all") return incidents;
    return incidents.filter((i) => i.priority === priority);
  }, [incidents, priority]);

  const sorted = useMemo(() => {
    const list = [...priorityFiltered];

    if (uiState.sort === "newest") {
      list.sort((a, b) => Number(b.id) - Number(a.id));
      return list;
    }

    if (uiState.sort === "oldest") {
      list.sort((a, b) => Number(a.id) - Number(b.id));
      return list;
    }

    if (uiState.sort === "priority") {
      list.sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
      return list;
    }

    return list;
  }, [priorityFiltered, uiState.sort]);

  const selectedCount = getSelectedCount(uiState);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    const shouldRemove = value === "" || value == null || value === "all";
    if (shouldRemove) next.delete(key);
    else next.set(key, value);

    if (key === "q" && value.trim() === "") next.delete("q");

    setSearchParams(next);
  }

  function setView(view) {
    dispatch({ type: UI_ACTIONS.SET_VIEW, payload: view });
  }

  function setSort(sort) {
    dispatch({ type: UI_ACTIONS.SET_SORT, payload: sort });
  }

  function clearSelection() {
    dispatch({ type: UI_ACTIONS.CLEAR_SELECTED });
  }

  function selectAllVisible() {
    dispatch({
      type: UI_ACTIONS.SET_SELECTED,
      payload: sorted.map((i) => i.id),
    });
  }

  if (isError) {
    toast.error("Couldn’t load incidents", {
      description: error?.message || "Unknown error",
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground">
            UI preferences live in a reducer. Server data stays in React Query.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border bg-card p-1">
            <Button
              variant={uiState.view === "grid" ? "default" : "secondary"}
              onClick={() => setView("grid")}
            >
              Grid
            </Button>
            <Button
              variant={uiState.view === "list" ? "default" : "secondary"}
              onClick={() => setView("list")}
            >
              List
            </Button>
          </div>

          <label className="grid gap-1">
            <span className="sr-only">Sort</span>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm"
              value={uiState.sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
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
              className="h-9 rounded-md border bg-background px-3 text-sm"
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

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{sorted.length}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xs text-muted-foreground">
              Selected{" "}
              <span className="font-medium text-foreground">{selectedCount}</span>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={selectAllVisible}
              disabled={sorted.length === 0 || isPending}
            >
              Select all
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={clearSelection}
              disabled={selectedCount === 0}
            >
              Clear selection
            </Button>

            <Button type="button" variant="secondary" onClick={() => setSearchParams({})}>
              Clear filters
            </Button>
          </div>
        </div>
      </section>

      {isPending ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="grid place-items-center rounded-xl border bg-card p-10 text-center">
          <div className="max-w-md space-y-2">
            <div className="text-lg font-semibold">No incidents found</div>
            <div className="text-sm text-muted-foreground">
              Try changing filters or clearing your search.
            </div>
          </div>

          <Button className="mt-4" type="button" onClick={() => setSearchParams({})}>
            Reset
          </Button>
        </div>
      ) : (
        <div
          className={
            uiState.view === "grid"
              ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-3"
          }
        >
          {sorted.map((incident) => (
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
