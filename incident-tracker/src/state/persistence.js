const STORAGE_KEY = "incident-tracker.ui";

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

export function loadPersistedUiState(baseState) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return baseState;

    const parsed = JSON.parse(raw);
    const sanitized = sanitizeUiState(parsed);

    return sanitized ? { ...baseState, ...sanitized } : baseState;
  } catch {
    return baseState;
  }
}

export function savePersistedUiState(state) {
  try {
    const payload = {
      sort: state.sort,
      view: state.view,
      selectedIds: state.selectedIds,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}
