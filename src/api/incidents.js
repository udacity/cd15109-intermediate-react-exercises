import { apiFetch } from "./client";

export async function fetchIncidents() {
  return apiFetch("/api/incidents.json");
}

export async function fetchIncidentById(id) {
  const incidents = await fetchIncidents();
  const incident = incidents.find((i) => String(i.id) === String(id));

  if (!incident) {
    throw new Error(`Incident ${id} not found`);
  }

  return incident;
}

export async function fetchIncidentActivityById(id) {
  const all = await apiFetch("/api/incident-activity.json");
  const incidentId = Number(id);

  if (!Number.isFinite(incidentId)) {
    throw new Error("Invalid incident id");
  }

  return Array.isArray(all) ? all.filter((e) => e.incidentId === incidentId) : [];
}

export async function createIncident(payload) {
  if (!payload?.title) {
    throw new Error("Title is required");
  }

  return {
    id: Date.now(),
    title: payload.title,
    status: "open",
    priority: payload.priority ?? "medium",
  };
}

export async function addIncidentComment({ incidentId, message }) {
  if (!incidentId || !message) {
    throw new Error("Invalid comment payload");
  }

  return {
    id: Date.now(),
    incidentId,
    type: "comment",
    message,
    at: new Date().toISOString(),
  };
}
