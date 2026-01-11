import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IncidentDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Incident Detail
          </h1>
          <p className="text-sm text-muted-foreground">
            This page proves the <code className="font-mono">:id</code> route
            param wiring.
          </p>
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
              <span className="text-muted-foreground">Incident ID:</span>{" "}
              <span className="font-medium">#{id}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              We’ll fetch and render real incident data later. For now, this
              establishes a clean, responsive detail layout.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button type="button">Acknowledge</Button>
            <Button type="button" variant="secondary">
              Assign
            </Button>
            <Button type="button" variant="destructive">
              Escalate
            </Button>
            <p className="text-xs text-muted-foreground">
              Placeholder actions for now. Later we’ll wire these to real state.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
