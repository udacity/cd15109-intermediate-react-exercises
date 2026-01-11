import React from "react";

const ToastContext = React.createContext(null);

// TODO: Build a minimal toast provider.
// Requirements:
// - expose addToast(message)
// - render toasts in the corner
// - auto-dismiss after ~2 seconds
export function ToastProvider({ children }) {
  return <ToastContext.Provider value={null}>{children}</ToastContext.Provider>;
}

// TODO: Hook to access addToast. Should throw if used outside provider.
export function useToast() {
  throw new Error("Not implemented");
}
