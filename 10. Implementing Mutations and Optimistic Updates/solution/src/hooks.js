import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, fetchTasks, renameTask, toggleTask } from "./api.js";

export function useTasksQuery() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}

export function useAddTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useRenameTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameTask,
    onSuccess: (updated) => {
      queryClient.setQueryData(["tasks"], (prev) => {
        if (!Array.isArray(prev)) return prev;
        return prev.map((t) => (t.id === updated.id ? updated : t));
      });
    },
  });
}

export function useToggleTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (prev) => {
        if (!Array.isArray(prev)) return prev;
        return prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        );
      });

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["tasks"], ctx.previous);
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["tasks"], (prev) => {
        if (!Array.isArray(prev)) return prev;
        return prev.map((t) => (t.id === updated.id ? updated : t));
      });
    },
  });
}
