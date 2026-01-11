import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { PriorityPill } from "./PriorityPill";

export function IncidentCard({ incident }) {
  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">
            <span className="text-muted-foreground">#{incident.id}</span>{" "}
            {incident.title}
          </CardTitle>

          <div className="flex items-center gap-2">
            <StatusBadge status={incident.status} />
            <PriorityPill priority={incident.priority} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {/* Placeholder meta—easy to extend later */}
          Assigned:{" "}
          <span className="font-medium text-foreground">Unassigned</span>
        </div>

        <Link
          to={`/incidents/${incident.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Open
        </Link>
      </CardContent>
    </Card>
  );
}
