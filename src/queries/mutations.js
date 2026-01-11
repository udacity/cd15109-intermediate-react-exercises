import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createIncident, addIncidentComment } from "@/api/incidents";

export function useCreateIncident() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess() {
      toast.success("Incident created");
      qc.invalidateQueries({ queryKey: ["incidents"] });
    },
    onError(err) {
      toast.error("Failed to create incident", {
        description: err.message,
      });
    },
  });
}

export function useAddIncidentComment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addIncidentComment,
    onSuccess(_, vars) {
      toast.success("Comment added");
      qc.invalidateQueries({ queryKey: ["incidentActivity", String(vars.incidentId)] });
    },
    onError(err) {
      toast.error("Failed to add comment", {
        description: err.message,
      });
    },
  });
}
