const STORAGE_KEY = "incident-tracker.ui";

export function loadUiState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed == null) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveUiState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}
