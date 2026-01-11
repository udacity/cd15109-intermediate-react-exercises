import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncident, useIncidentActivity } from "@/queries/hooks";
import { useAddIncidentComment } from "@/queries/mutations";

export function IncidentDetailPage() {
  const { id } = useParams();

  const incidentQuery = useIncident(id);
  const activityQuery = useIncidentActivity(id);

  const commentMutation = useAddIncidentComment();
  const [comment, setComment] = useState("");

  const incident = incidentQuery.data;

  const comments = useMemo(() => {
    const activity = activityQuery.data ?? [];
    return activity
      .filter((e) => e.type === "comment")
      .slice()
      .sort((a, b) => String(a.at ?? "").localeCompare(String(b.at ?? "")));
  }, [activityQuery.data]);

  if (incidentQuery.isLoading) {
    return <Skeleton className="h-40 rounded-xl" />;
  }

  if (incidentQuery.isError) {
    return <div className="text-sm text-destructive">Failed to load incident.</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{incident.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Status: {incident.status} · Priority: {incident.priority}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Add a comment…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={commentMutation.isPending}
            />
            <Button
              disabled={!comment || commentMutation.isPending}
              onClick={() => {
                commentMutation.mutate({
                  incidentId: incident.id,
                  message: comment,
                });
                setComment("");
              }}
            >
              Post
            </Button>
          </div>

          {activityQuery.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : activityQuery.isError ? (
            <div className="text-xs text-destructive">Failed to load activity.</div>
          ) : comments.length === 0 ? (
            <div className="text-xs text-muted-foreground">No comments yet.</div>
          ) : (
            <div className="space-y-2">
              {comments.map((c) => (
                <div key={c.id} className="rounded-md border bg-card p-3 text-sm">
                  <div className="text-xs text-muted-foreground">
                    {c.at ? new Date(c.at).toLocaleString() : "Just now"}
                  </div>
                  <div className="mt-1">{c.message}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
