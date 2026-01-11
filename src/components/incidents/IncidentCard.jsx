import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/incidents/StatusBadge";
import { PriorityPill } from "@/components/incidents/PriorityPill";
import { queryKeys } from "@/queries/queryKeys";
import { fetchIncidentById } from "@/api/incidents";

function IncidentCardImpl({ incident, selected, onToggleSelect }) {
  console.count(`IncidentCard render: ${incident.id}`);
  
  const queryClient = useQueryClient();

  const prefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.incident(incident.id),
      queryFn: () => fetchIncidentById(incident.id),
      staleTime: 60_000,
    });
  }, [queryClient, incident.id]);

  const onCardClick = useCallback(() => {
    onToggleSelect(incident.id);
  }, [onToggleSelect, incident.id]);

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-sm ${selected ? "ring-2 ring-ring" : ""}`}
      onClick={onCardClick}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">Incident #{incident.id}</div>
            <div className="text-base font-semibold">{incident.title}</div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={incident.status} />
            <PriorityPill priority={incident.priority} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{selected ? "Selected" : "Click to select"}</div>

        <Link
          to={`/incidents/${incident.id}`}
          onMouseEnter={prefetch}
          onFocus={prefetch}
          className="text-sm font-medium underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Open
        </Link>
      </CardContent>
    </Card>
  );
}

export const IncidentCard = memo(
  IncidentCardImpl,
  (prev, next) =>
    prev.selected === next.selected &&
    prev.onToggleSelect === next.onToggleSelect &&
    prev.incident === next.incident
);
