import { useQuery } from "@tanstack/react-query";
import { fetchIncidentById } from "@/api/incidents";

export function useIncidentQuery(id) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => fetchIncidentById(id),
    enabled: Boolean(id),
  });
}
