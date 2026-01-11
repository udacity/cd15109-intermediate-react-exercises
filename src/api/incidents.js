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
