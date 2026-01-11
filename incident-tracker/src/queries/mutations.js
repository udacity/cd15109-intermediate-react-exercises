import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createIncident, addIncidentComment, approveIncident, rejectIncident } from "@/api/incidents";
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

function updateIncidentInLists(qc, updater) {
  qc.setQueriesData({ queryKey: ["incidents"] }, (old) => {
    if (!Array.isArray(old)) return old;
    return old.map((i) => updater(i));
  });
}

export function useCreateIncident() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess(newIncident) {
      toast.success("Incident created");

      qc.setQueriesData({ queryKey: ["incidents"] }, (old, query) => {
        if (!Array.isArray(old)) return old;
        const key = query?.queryKey ?? [];
        if (!incidentMatchesListFilters(newIncident, key)) return old;

        const withoutDupes = old.filter((i) => String(i.id) !== String(newIncident.id));
        return [newIncident, ...withoutDupes];
      });

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

function useOptimisticStatusMutation({ mutationFn, nextStatus, successLabel }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn,
    retry: (failCount, err) => {
      if (err?.message === "Simulated failure") return false;
      return failCount < 2;
    },
    retryDelay: (attempt) => Math.min(500 * 2 ** attempt, 3000),

    onMutate: async (vars) => {
      const id = String(vars.incidentId);

      await qc.cancelQueries({ queryKey: ["incidents"] });
      await qc.cancelQueries({ queryKey: queryKeys.incident(id) });

      const prevLists = qc.getQueriesData({ queryKey: ["incidents"] });
      const prevIncident = qc.getQueryData(queryKeys.incident(id));

      updateIncidentInLists(qc, (i) => {
        if (String(i.id) !== id) return i;
        return { ...i, status: nextStatus };
      });

      qc.setQueryData(queryKeys.incident(id), (old) => {
        if (!old) return old;
        return { ...old, status: nextStatus };
      });

      return { prevLists, prevIncident, id };
    },

    onError: (err, vars, ctx) => {
      toast.error("Action failed", { description: err?.message || "Unknown error" });

      if (!ctx) return;

      for (const [key, data] of ctx.prevLists) {
        qc.setQueryData(key, data);
      }

      qc.setQueryData(queryKeys.incident(ctx.id), ctx.prevIncident);
    },

    onSuccess: () => {
      toast.success(successLabel);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["incidents"], refetchType: "inactive" });
    },
  });
}

export function useApproveIncident() {
  return useOptimisticStatusMutation({
    mutationFn: approveIncident,
    nextStatus: "approved",
    successLabel: "Incident approved",
  });
}

export function useRejectIncident() {
  return useOptimisticStatusMutation({
    mutationFn: rejectIncident,
    nextStatus: "open",
    successLabel: "Incident rejected",
  });
}
