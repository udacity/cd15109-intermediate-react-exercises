import { useQuery } from "@tanstack/react-query";
import { fetchIncidentActivityById } from "@/api/incidents";
import { queryKeys } from "@/queries/queryKeys";

export function useIncidentActivityQuery(id, enabled) {
  return useQuery({
    queryKey: queryKeys.incidentActivity(id),
    queryFn: () => fetchIncidentActivityById(id),
    enabled: Boolean(enabled) && Boolean(id),
  });
}
