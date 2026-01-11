const STORAGE_KEY = "incident-tracker.auth";

export function loadAuthSession() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, user: null };

    const parsed = JSON.parse(raw);
    const token = typeof parsed?.token === "string" ? parsed.token : null;
    const user = parsed?.user && typeof parsed.user === "object" ? parsed.user : null;

    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function saveAuthSession(session) {
  try {
    const payload = {
      token: typeof session?.token === "string" ? session.token : null,
      user: session?.user && typeof session.user === "object" ? session.user : null,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}

export function clearAuthSession() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
