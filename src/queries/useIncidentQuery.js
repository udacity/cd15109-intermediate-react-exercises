import { useQuery } from "@tanstack/react-query";
import { fetchIncidentById } from "@/api/incidents";
import { queryKeys } from "@/queries/queryKeys";

export function useIncidentQuery(id) {
  return useQuery({
    queryKey: queryKeys.incident(id),
    queryFn: () => fetchIncidentById(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
