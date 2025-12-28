import { useEffect, useMemo, useState } from "react";

function readTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export default function App() {
  const appName = import.meta.env.VITE_APP_NAME ?? "App";
  const envLabel = import.meta.env.VITE_ENV_LABEL ?? "unknown";

  const [theme, setTheme] = useState(() => readTheme());
  const now = useMemo(() => new Date().toLocaleString(), []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main className="page">
      <h1>{appName}</h1>

      <section className="card" aria-label="Build Info">
        <div className="row">
          <span className="label">Environment</span>
          <span className="value">{envLabel}</span>
        </div>

        <div className="row">
          <span className="label">Loaded at</span>
          <span className="value">{now}</span>
        </div>

        <div className="row">
          <span className="label">Theme</span>
          <span className="value">{theme}</span>
        </div>

        <button
          type="button"
          className="btn"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          Toggle theme
        </button>
      </section>

      <p className="hint">
        Build and preview: <code>npm run build</code> then{" "}
        <code>npm run preview</code>
      </p>
    </main>
  );
}
