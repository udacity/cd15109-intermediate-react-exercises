import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from "@/api/incidents";

export function useIncidentsQuery() {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });
}
