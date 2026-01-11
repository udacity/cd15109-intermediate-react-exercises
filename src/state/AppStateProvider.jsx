import { createContext, useContext, useEffect, useReducer } from "react";
import { uiReducer, initialUiState } from "@/state/uiReducer";
import { loadUiState, saveUiState } from "@/state/persistence";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

function sanitizeUiState(value) {
  if (!value || typeof value !== "object") return null;

  const next = {};

  if (value.sort === "newest" || value.sort === "oldest" || value.sort === "priority") {
    next.sort = value.sort;
  }

  if (value.view === "grid" || value.view === "list") {
    next.view = value.view;
  }

  if (Array.isArray(value.selectedIds)) {
    next.selectedIds = value.selectedIds
      .map((x) => (typeof x === "number" ? x : Number(x)))
      .filter((x) => Number.isFinite(x));
  }

  return next;
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUiState, (base) => {
    const persisted = sanitizeUiState(loadUiState());
    return persisted ? { ...base, ...persisted } : base;
  });

  useEffect(() => {
    saveUiState({
      sort: state.sort,
      view: state.view,
      selectedIds: state.selectedIds,
    });
  }, [state.sort, state.view, state.selectedIds]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error("useAppDispatch must be used within AppStateProvider");
  return ctx;
}
