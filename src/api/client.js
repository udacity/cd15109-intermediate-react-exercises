import { loadAuthSession } from "@/auth/authStorage";
import { triggerUnauthorized } from "@/auth/authBridge";

const API_BASE = "/api";

function resolveUrl(path) {
  if (typeof path !== "string") throw new Error("Invalid path");
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return `${API_BASE}/${path}`;
}

export async function apiFetch(path, options = {}) {
  const { token } = loadAuthSession();

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(resolveUrl(path), {
    ...options,
    headers,
  });

  if (res.status === 401) {
    triggerUnauthorized();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {
        return;
      }
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();

  return res.text();
}
