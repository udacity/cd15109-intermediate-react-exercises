import { apiGet } from "./client";

export async function fetchIncidents() {
  return apiGet("/api/incidents.json");
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
  const all = await apiGet("/api/incident-activity.json");
  const incidentId = Number(id);

  if (!Number.isFinite(incidentId)) {
    throw new Error("Invalid incident id");
  }

  return Array.isArray(all) ? all.filter((e) => e.incidentId === incidentId) : [];
}
