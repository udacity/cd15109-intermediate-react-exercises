import { useIncidentsQuery } from "@/queries/useIncidentsQuery";
import { useIncidentQuery } from "@/queries/useIncidentQuery";
import { useApprovalsQuery } from "@/queries/useApprovalsQuery";

export function useIncidents() {
  return useIncidentsQuery();
}

export function useIncident(id) {
  return useIncidentQuery(id);
}

export function useApprovals() {
  return useApprovalsQuery();
}
