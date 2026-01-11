import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncident } from "@/queries/hooks";

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

export function IncidentDetailPage() {
  const { id } = useParams();
  const { data, isPending, isError, error } = useIncident(id);

  if (isPending) {
    return <DetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Incident not found
          </h1>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Unable to load incident."}
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link to="/">Back to Incidents</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Incident #{data.id}
          </h1>
          <p className="text-sm text-muted-foreground">{data.title}</p>
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
              <span className="font-medium capitalize">{data.status}</span>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Priority:</span>{" "}
              <span className="font-medium capitalize">{data.priority}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              This page is powered by a standardized query key and custom hooks.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>• Incident created</div>
            <div>• Status updated</div>
            <div>• Assignment pending</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Comments and discussion will be implemented in a later step.
        </CardContent>
      </Card>
    </div>
  );
}
