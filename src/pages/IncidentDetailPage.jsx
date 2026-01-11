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

  const commentCount = useMemo(() => {
    const activity = activityQuery.data ?? [];
    return activity.filter((e) => e.type === "comment").length;
  }, [activityQuery.data]);

  if (incidentQuery.isLoading) {
    return <Skeleton className="h-40 rounded-xl" />;
  }

  if (incidentQuery.isError) {
    return (
      <div className="text-sm text-destructive">
        Failed to load incident.
      </div>
    );
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

          <div className="text-xs text-muted-foreground">
            {commentCount === 0
              ? "No comments yet."
              : `${commentCount} comment${commentCount === 1 ? "" : "s"} found in activity.`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
