import { useMemo } from "react";
import { useAppState } from "@/state/AppStateProvider";

export function useSelectedIds() {
  const { selectedIds } = useAppState();
  return selectedIds;
}

export function useSelectedCount() {
  const { selectedIds } = useAppState();

  return useMemo(() => selectedIds.length, [selectedIds]);
}

export function useHasSelection() {
  const count = useSelectedCount();
  return count > 0;
}

export function useViewMode() {
  const { view } = useAppState();
  return view;
}

export function useSortMode() {
  const { sort } = useAppState();
  return sort;
}

export function useQueueStats() {
  const { view, sort, selectedIds } = useAppState();

  return useMemo(() => {
    const selectedCount = selectedIds.length;

    return {
      selectedCount,
      viewLabel: view === "grid" ? "Grid view" : "List view",
      sortLabel:
        sort === "newest"
          ? "Newest first"
          : sort === "oldest"
          ? "Oldest first"
          : "Priority",
    };
  }, [view, sort, selectedIds]);
}
