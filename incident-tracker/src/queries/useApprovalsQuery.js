import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queries/queryKeys";

async function fetchApprovals() {
  return [];
}

export function useApprovalsQuery() {
  return useQuery({
    queryKey: queryKeys.approvals(),
    queryFn: fetchApprovals,
  });
}
