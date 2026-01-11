import { createContext, useContext, useEffect, useReducer } from "react";
import { uiReducer, initialUiState } from "@/state/uiReducer";
import { loadPersistedUiState, savePersistedUiState } from "@/state/persistence";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUiState, (base) => {
    return loadPersistedUiState(base);
  });

  useEffect(() => {
    savePersistedUiState(state);
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
