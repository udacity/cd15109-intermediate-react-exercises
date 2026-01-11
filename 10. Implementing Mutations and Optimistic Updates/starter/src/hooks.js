import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, fetchTasks, renameTask, toggleTask } from "./api.js";

export function useTasksQuery() {
  // TODO: Implement a useQuery that returns the task list
  // - queryKey should be ["tasks"]
  // - queryFn should call fetchTasks()
  throw new Error("Not implemented");
}

export function useAddTaskMutation() {
  // TODO: Implement a useMutation for adding a task
  // Requirements:
  // - Call addTask
  // - Invalidate ["tasks"] on success (or onSettled)
  throw new Error("Not implemented");
}

export function useRenameTaskMutation() {
  // TODO: Implement a useMutation for renaming a task
  // Requirements:
  // - Call renameTask
  // - On success, update cached ["tasks"] using setQueryData
  // - Do not refetch for rename
  throw new Error("Not implemented");
}

export function useToggleTaskMutation() {
  // TODO: Implement a useMutation for toggling completed
  // Requirements:
  // - Optimistically update cached ["tasks"] in onMutate
  // - Snapshot previous cache for rollback
  // - Roll back in onError
  // - Optionally reconcile in onSuccess (setQueryData)
  throw new Error("Not implemented");
}
