import { createContext, useContext, useMemo, useReducer } from "react";
import { uiReducer, initialUiState } from "@/state/uiReducer";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUiState);

  const memoState = useMemo(() => state, [state]);

  return (
    <AppStateContext.Provider value={memoState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}

export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext);
  if (!ctx) {
    throw new Error("useAppDispatch must be used within AppStateProvider");
  }
  return ctx;
}
