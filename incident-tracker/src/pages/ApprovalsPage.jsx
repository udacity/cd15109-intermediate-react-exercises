import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/queries/hooks";
import { useApproveIncident, useRejectIncident } from "@/queries/mutations";

export function ApprovalsPage() {
  const incidentsQuery = useIncidents({ status: "all", q: "" });
  const approve = useApproveIncident();
  const reject = useRejectIncident();

  const queue = useMemo(() => {
    const list = incidentsQuery.data ?? [];
    return list.filter((i) => i.status === "triage");
  }, [incidentsQuery.data]);

  if (incidentsQuery.isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  if (incidentsQuery.isError) {
    return <div className="text-sm text-destructive">Failed to load approvals queue.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Approvals</h1>
        <p className="text-sm text-muted-foreground">
          Items in triage can be approved or rejected with optimistic UI updates.
        </p>
      </div>

      {queue.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
          No incidents are currently waiting for approval.
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((i) => {
            const approving = approve.isPending && String(approve.variables?.incidentId) === String(i.id);
            const rejecting = reject.isPending && String(reject.variables?.incidentId) === String(i.id);
            const disabled = approving || rejecting;

            return (
              <Card key={i.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <Link className="hover:underline" to={`/incidents/${i.id}`}>
                        {i.title}
                      </Link>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">Incident #{i.id} · status: {i.status}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={disabled}
                      onClick={() => reject.mutate({ incidentId: i.id })}
                    >
                      {rejecting ? "Rejecting…" : "Reject"}
                    </Button>
                    <Button type="button" disabled={disabled} onClick={() => approve.mutate({ incidentId: i.id })}>
                      {approving ? "Approving…" : "Approve"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground">Priority: {i.priority}</CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
