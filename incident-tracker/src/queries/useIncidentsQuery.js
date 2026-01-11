import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from "@/api/incidents";
import { queryKeys } from "@/queries/queryKeys";

function normalizeStatus(status) {
  const allowed = ["all", "open", "triage", "approved"];
  if (!status) return "all";
  return allowed.includes(status) ? status : "all";
}

export function useIncidentsQuery(filters) {
  const status = normalizeStatus(filters?.status);
  const q = (filters?.q ?? "").trim();

  return useQuery({
    queryKey: queryKeys.incidents({ status, q }),
    queryFn: async () => {
      const incidents = await fetchIncidents();
      const list = Array.isArray(incidents) ? incidents : [];

      const statusFiltered =
        status === "all" ? list : list.filter((i) => i.status === status);

      if (q === "") return statusFiltered;

      const lower = q.toLowerCase();
      return statusFiltered.filter((i) => {
        return (
          String(i.id).includes(q) ||
          (i.title ?? "").toLowerCase().includes(lower)
        );
      });
    },
    staleTime: 20_000,
  });
}
