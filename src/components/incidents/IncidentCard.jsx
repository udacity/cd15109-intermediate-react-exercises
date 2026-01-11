import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/incidents/StatusBadge";
import { PriorityPill } from "@/components/incidents/PriorityPill";
import { queryKeys } from "@/queries/queryKeys";
import { fetchIncidentById } from "@/api/incidents";

export function IncidentCard({ incident }) {
  const queryClient = useQueryClient();

  function prefetch() {
    queryClient.prefetchQuery({
      queryKey: queryKeys.incident(incident.id),
      queryFn: () => fetchIncidentById(incident.id),
      staleTime: 60_000,
    });
  }

  return (
    <Card className="transition-shadow hover:shadow-sm focus-within:shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">Incident #{incident.id}</div>
            <div className="truncate text-base font-semibold">{incident.title}</div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <StatusBadge status={incident.status} />
            <PriorityPill priority={incident.priority} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          View incident details and activity
        </div>

        <Link
          to={`/incidents/${incident.id}`}
          onMouseEnter={prefetch}
          onFocus={prefetch}
          className="text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Open
        </Link>
      </CardContent>
    </Card>
  );
}
