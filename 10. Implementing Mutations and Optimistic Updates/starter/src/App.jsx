import { useMemo, useState } from "react";
import {
  useAddTaskMutation,
  useRenameTaskMutation,
  useTasksQuery,
  useToggleTaskMutation,
} from "./hooks.js";

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        padding: "10px 12px",
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "white",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        maxWidth: 320,
      }}
    >
      {message}
    </div>
  );
}

export default function App() {
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState("");

  const tasksQuery = useTasksQuery();
  const addTaskMutation = useAddTaskMutation();
  const renameTaskMutation = useRenameTaskMutation();
  const toggleTaskMutation = useToggleTaskMutation();

  const tasks = tasksQuery.data ?? [];

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2000);
  };

  const isAdding = addTaskMutation.isPending;

  return (
    <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Tasks</h1>

      <section style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title…"
          disabled={isAdding}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="button"
          disabled={isAdding}
          onClick={async () => {
            // TODO: Trigger add task mutation
            // - Show success toast
            // - Clear input on success
            // - Show error toast on failure
          }}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "white",
            cursor: isAdding ? "not-allowed" : "pointer",
          }}
        >
          {isAdding ? "Adding…" : "Add"}
        </button>
      </section>

      {tasksQuery.isLoading ? <p>Loading…</p> : null}
      {tasksQuery.isError ? (
        <p style={{ color: "crimson" }}>{tasksQuery.error?.message}</p>
      ) : null}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 16,
          display: "grid",
          gap: 10,
        }}
      >
        {tasks.map((t) => {
          const isTogglingThis =
            toggleTaskMutation.isPending &&
            toggleTaskMutation.variables?.id === t.id;
          const isRenamingThis =
            renameTaskMutation.isPending &&
            renameTaskMutation.variables?.id === t.id;

          return (
            <li
              key={t.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <strong
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                  }}
                >
                  {t.title}
                </strong>
                <span style={{ fontSize: 12, color: "#666" }}>
                  {t.completed ? "Completed" : "Not completed"}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  disabled={isTogglingThis}
                  onClick={async () => {
                    // TODO: Trigger toggle mutation with optimistic update + rollback
                    // - show success toast
                    // - show error toast on failure (rollback should happen automatically)
                  }}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: isTogglingThis ? "not-allowed" : "pointer",
                  }}
                >
                  {isTogglingThis
                    ? "Updating…"
                    : t.completed
                      ? "Mark as not done"
                      : "Mark as done"}
                </button>

                <button
                  type="button"
                  disabled={isRenamingThis}
                  onClick={async () => {
                    // TODO: Prompt for a new title and trigger rename mutation
                    // - update cache manually on success
                    // - show success/error toast
                  }}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: isRenamingThis ? "not-allowed" : "pointer",
                  }}
                >
                  {isRenamingThis ? "Renaming…" : "Rename"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Toast message={toast} />
    </div>
  );
}
