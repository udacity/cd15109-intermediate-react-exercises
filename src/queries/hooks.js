import { useIncidentsQuery } from "@/queries/useIncidentsQuery";
import { useIncidentQuery } from "@/queries/useIncidentQuery";
import { useApprovalsQuery } from "@/queries/useApprovalsQuery";
import { useIncidentActivityQuery } from "@/queries/useIncidentActivityQuery";

export function useIncidents() {
  return useIncidentsQuery();
}

export function useIncident(id) {
  return useIncidentQuery(id);
}

export function useApprovals() {
  return useApprovalsQuery();
}

export function useIncidentActivity(id, enabled) {
  return useIncidentActivityQuery(id, enabled);
}
