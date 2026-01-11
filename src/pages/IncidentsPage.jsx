import { useCallback, useEffect, useMemo, useState, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useIncidents } from "@/queries/hooks";
import { useCreateIncident } from "@/queries/mutations";
import { useAppDispatch } from "@/state/AppStateProvider";
import { UI_ACTIONS } from "@/state/uiReducer";
import { useQueueStats, useSelectedIds, useSortMode, useViewMode } from "@/state/selectorHooks";

const STATUS_OPTIONS = ["all", "open", "triage", "approved"];
const SORT_OPTIONS = ["newest", "oldest", "priority"];

function normalizeFromList(value, list, fallback) {
  if (!value) return fallback;
  return list.includes(value) ? value : fallback;
}

function priorityRank(priority) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  return 1;
}

export function IncidentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const view = useViewMode();
  const sort = useSortMode();
  const selectedIds = useSelectedIds();
  const queueStats = useQueueStats();

  const status = normalizeFromList(searchParams.get("status"), STATUS_OPTIONS, "all");
  const q = (searchParams.get("q") ?? "").trim();

  const deferredQ = useDeferredValue(q);

  const { data, isLoading, isError, error } = useIncidents({
    status,
    q: deferredQ,
  });

  const [newTitle, setNewTitle] = useState("");
  const createMutation = useCreateIncident();

  useEffect(() => {
    if (!isError) return;
    toast.error("Couldn’t load incidents", {
      description: error?.message || "Unknown error",
    });
  }, [isError, error]);

  const selectedIdSet = useMemo(() => {
    return new Set((selectedIds || []).map((x) => String(x)));
  }, [selectedIds]);

  const sorted = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const list = [...data];

    if (sort === "newest") list.sort((a, b) => Number(b.id) - Number(a.id));
    if (sort === "oldest") list.sort((a, b) => Number(a.id) - Number(b.id));
    if (sort === "priority") list.sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));

    return list;
  }, [data, sort]);

  const updateParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams);
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const setView = useCallback(
    (nextView) => {
      dispatch({ type: UI_ACTIONS.SET_VIEW, payload: nextView });
    },
    [dispatch]
  );

  const setSort = useCallback(
    (nextSort) => {
      dispatch({ type: UI_ACTIONS.SET_SORT, payload: nextSort });
    },
    [dispatch]
  );

  const clearSelection = useCallback(() => {
    dispatch({ type: UI_ACTIONS.CLEAR_SELECTED });
  }, [dispatch]);

  const toggleSelectById = useCallback(
    (id) => {
      dispatch({ type: UI_ACTIONS.TOGGLE_SELECTED, payload: id });
    },
    [dispatch]
  );

  const onNewTitleChange = useCallback((e) => {
    setNewTitle(e.target.value);
  }, []);

  const onCreate = useCallback(() => {
    if (!newTitle || createMutation.isPending) return;
    createMutation.mutate({ title: newTitle });
    setNewTitle("");
  }, [newTitle, createMutation]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
        <p className="text-sm text-muted-foreground">
          Deferred updates keep the UI responsive while filtering.
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="New incident title"
            value={newTitle}
            onChange={onNewTitleChange}
            disabled={createMutation.isPending}
          />
          <Button disabled={!newTitle || createMutation.isPending} onClick={onCreate}>
            {createMutation.isPending ? "Creating…" : "Create"}
          </Button>
        </div>
      </Card>

      <section className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg border bg-card p-1">
          <Button variant={view === "grid" ? "default" : "secondary"} onClick={() => setView("grid")}>
            Grid
          </Button>
          <Button variant={view === "list" ? "default" : "secondary"} onClick={() => setView("list")}>
            List
          </Button>
        </div>

        <select
          className="h-9 rounded-md border bg-background px-3 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

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
      </section>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
          No incidents found.
        </div>
      ) : (
        <div className={view === "grid" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
          {sorted.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              selected={selectedIdSet.has(String(incident.id))}
              onToggleSelect={toggleSelectById}
            />
          ))}
        </div>
      )}

      {queueStats.selectedCount > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>{queueStats.selectedCount} selected</div>
          <Button variant="secondary" size="sm" onClick={clearSelection}>
            Clear selection
          </Button>
        </div>
      )}
    </div>
  );
}
