import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

function uid() {
  return Math.random().toString(16).slice(2);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function remove(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function push(variant, message) {
    const id = uid();
    setToasts((prev) => [...prev, { id, variant, message }]);
    window.setTimeout(() => remove(id), 2800);
  }

  const api = useMemo(
    () => ({
      success: (msg) => push("success", msg),
      error: (msg) => push("error", msg),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider />");
  return ctx;
}

function ToastViewport({ toasts, onClose }) {
  return (
    <div className="toastViewport" aria-live="polite" aria-relevant="additions">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onClose={() => onClose(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onClose }) {
  const cls =
    toast.variant === "success" ? "toast toastSuccess" : "toast toastError";

  return (
    <div className={cls} role="status">
      <div className="toastRow">
        <div style={{ fontSize: 13 }}>{toast.message}</div>
        <button
          className="toastClose"
          onClick={onClose}
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
