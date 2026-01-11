import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { PriorityPill } from "./PriorityPill";

export function IncidentCard({ incident }) {
  return (
    <Link
      to={`/incidents/${incident.id}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Open incident ${incident.id}`}
    >
      <Card className="h-full transition-shadow hover:shadow-sm">
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground">
                #{incident.id}
              </div>
              <div className="truncate text-base font-semibold">
                {incident.title}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge status={incident.status} />
              <PriorityPill priority={incident.priority} />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              Assigned:{" "}
              <span className="font-medium text-foreground">Unassigned</span>
            </div>

            <span className="font-medium text-primary underline-offset-4 hover:underline">
              Open
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
