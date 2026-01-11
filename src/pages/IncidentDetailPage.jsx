import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncident, useIncidentActivity } from "@/queries/hooks";

function DetailSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-3" aria-busy="true">
      <Card className="lg:col-span-2">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="grid gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

function formatWhen(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export function IncidentDetailPage() {
  const { id } = useParams();

  const incidentQuery = useIncident(id);
  const incident = incidentQuery.data;

  const activityQuery = useIncidentActivity(id, Boolean(incident));

  if (incidentQuery.isPending) {
    return <DetailSkeleton />;
  }

  if (incidentQuery.isError) {
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Incident not found</h1>
          <p className="text-sm text-muted-foreground">
            {incidentQuery.error?.message || "Unable to load incident."}
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link to="/">Back to Incidents</Link>
        </Button>
      </div>
    );
  }

  const activity = Array.isArray(activityQuery.data) ? activityQuery.data : [];
  const commentCount = activity.filter((e) => e.type === "comment").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Incident #{incident.id}
          </h1>
          <p className="text-sm text-muted-foreground">{incident.title}</p>
        </div>

        <Button asChild variant="secondary">
          <Link to="/">Back to Incidents</Link>
        </Button>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="font-medium capitalize">{incident.status}</span>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Priority:</span>{" "}
              <span className="font-medium capitalize">{incident.priority}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              This page demonstrates parallel queries: incident detail loads first, then
              activity is enabled once detail is available.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {activityQuery.isPending ? (
              <ActivitySkeleton />
            ) : activityQuery.isError ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  {activityQuery.error?.message || "Unable to load activity."}
                </div>
                <Button type="button" onClick={() => activityQuery.refetch()}>
                  Retry activity
                </Button>
              </div>
            ) : activity.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No activity yet for this incident.
              </div>
            ) : (
              <div className="space-y-3">
                {activity.map((evt) => (
                  <div key={evt.id} className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{evt.message}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatWhen(evt.at)}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div>
            {commentCount === 0
              ? "No comments yet."
              : `${commentCount} comment${commentCount === 1 ? "" : "s"} found in activity.`}
          </div>
          <div>Threaded comments will be implemented in a later step.</div>
        </CardContent>
      </Card>
    </div>
  );
}
