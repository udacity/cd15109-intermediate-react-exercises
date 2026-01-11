import { apiGet } from "./client";

export function fetchIncidents() {
  return apiGet("/api/incidents.json");
}
