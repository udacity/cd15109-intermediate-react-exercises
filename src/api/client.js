export async function apiGet(path) {
  const res = await fetch(path, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = text || `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
}
