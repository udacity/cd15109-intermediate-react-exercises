import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from "@/api/incidents";
import { queryKeys } from "@/queries/queryKeys";

export function useIncidentsQuery() {
  return useQuery({
    queryKey: queryKeys.incidents(),
    queryFn: fetchIncidents,
  });
}
