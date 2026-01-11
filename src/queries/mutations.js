import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createIncident, addIncidentComment } from "@/api/incidents";
import { queryKeys } from "@/queries/queryKeys";

function incidentMatchesListFilters(incident, key) {
  const statusIndex = key.findIndex((x) => x === "status");
  const qIndex = key.findIndex((x) => x === "q");

  const status = statusIndex >= 0 ? String(key[statusIndex + 1] ?? "all") : "all";
  const q = qIndex >= 0 ? String(key[qIndex + 1] ?? "") : "";

  const statusOk = status === "all" || String(incident.status) === status;

  const qTrim = q.trim();
  const qOk =
    qTrim === "" ||
    String(incident.id).includes(qTrim) ||
    String(incident.title ?? "")
      .toLowerCase()
      .includes(qTrim.toLowerCase());

  return statusOk && qOk;
}

export function useCreateIncident() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess(newIncident) {
      toast.success("Incident created");

      qc.setQueriesData(
        { queryKey: ["incidents"] },
        (old, query) => {
          if (!Array.isArray(old)) return old;
          const key = query?.queryKey ?? [];
          if (!incidentMatchesListFilters(newIncident, key)) return old;

          const withoutDupes = old.filter((i) => String(i.id) !== String(newIncident.id));
          return [newIncident, ...withoutDupes];
        }
      );

      qc.setQueryData(queryKeys.incident(newIncident.id), newIncident);

      qc.invalidateQueries({ queryKey: ["incidents"], refetchType: "inactive" });
    },
    onError(err) {
      toast.error("Failed to create incident", {
        description: err?.message || "Unknown error",
      });
    },
  });
}

export function useAddIncidentComment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addIncidentComment,
    onSuccess(newComment, vars) {
      toast.success("Comment added");

      qc.setQueryData(queryKeys.incidentActivity(vars.incidentId), (old) => {
        const list = Array.isArray(old) ? old : [];
        const withoutDupes = list.filter((e) => String(e.id) !== String(newComment.id));
        return [...withoutDupes, newComment];
      });

      qc.invalidateQueries({
        queryKey: queryKeys.incidentActivity(vars.incidentId),
        refetchType: "inactive",
      });
    },
    onError(err) {
      toast.error("Failed to add comment", {
        description: err?.message || "Unknown error",
      });
    },
  });
}
