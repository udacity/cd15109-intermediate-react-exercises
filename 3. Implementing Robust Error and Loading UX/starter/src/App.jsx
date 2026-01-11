import { useEffect, useMemo, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider, useToast } from "./components/toast.jsx";

function readFailFlag() {
  const params = new URLSearchParams(window.location.search);
  return params.get("fail") === "1";
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchUsers({ forceFail }) {
  await delay(750);

  if (forceFail) throw new Error("Forced failure via ?fail=1");
  if (Math.random() < 0.35) throw new Error("Random network error");

  return [
    { id: "u1", name: "Avery Kim", role: "Admin" },
    { id: "u2", name: "Jordan Lee", role: "Member" },
    { id: "u3", name: "Sam Patel", role: "Member" },
  ];
}

function UsersSkeleton() {
  return (
    <div className="list" aria-label="Loading users">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeletonRow">
          <div style={{ display: "grid", gap: 8 }}>
            <div className="skel" style={{ width: 180 }} />
            <div className="skel" style={{ width: 100 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersPanel({ crash, onCrash }) {
  const toast = useToast();
  const forceFail = useMemo(() => readFailFlag(), []);

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function load() {
    // TODO: loading → success/error states
    // - clear old error
    // - on success: set users + toast success
    // - on error: set friendly message + toast error
  }

  useEffect(() => {
    // TODO: load on mount
  }, []);

  if (crash) {
    // TODO: throw a render error to test ErrorBoundary
  }

  return (
    <div className="card">
      <div className="headerRow">
        <div>
          <h1>Users</h1>
          <p className="subtitle">
            Demonstrates skeleton loading, async error UI, toasts, and an error
            boundary.
          </p>
        </div>

        <div className="actions">
          <button className="btn" onClick={load}>
            Refresh
          </button>
          <button className="btn" onClick={onCrash}>
            Simulate crash
          </button>
        </div>
      </div>

      {status === "loading" ? <UsersSkeleton /> : null}

      {status === "error" ? (
        <div className="inlineError" role="alert">
          <div className="inlineErrorTitle">Couldn’t load users</div>
          <div className="inlineErrorText">{errorMsg}</div>
          <div style={{ marginTop: 12 }}>
            <button className="btn btnPrimary" onClick={load}>
              Retry
            </button>
          </div>
        </div>
      ) : null}

      {status === "success" ? (
        <ul className="list">
          {users.map((u) => (
            <li key={u.id} className="item">
              <div>
                <div className="name">{u.name}</div>
                <div className="role">{u.role}</div>
              </div>
              <span className="badge">Active</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Shell() {
  const [crash, setCrash] = useState(false);

  function resetAfterCrash() {
    setCrash(false);
  }

  return (
    <div className="container">
      <ErrorBoundary onReset={resetAfterCrash}>
        <UsersPanel crash={crash} onCrash={() => setCrash(true)} />
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}
