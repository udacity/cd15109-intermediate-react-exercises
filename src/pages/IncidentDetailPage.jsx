import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function DetailSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-3" aria-busy="true">
      <Card className="lg:col-span-2">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent className="grid gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </CardContent>
      </Card>
    </div>
  );
}

export function IncidentDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const fail = searchParams.get("fail") === "1";

  const loadKey = useMemo(() => `${id}|${fail}`, [id, fail]);

  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    let canceled = false;

    const t = setTimeout(() => {
      if (canceled) return;

      if (fail) {
        toast.error("Couldn’t load incident", {
          description:
            "This is a simulated failure. Remove ?fail=1 to try again.",
        });
      }

      setIsLoading(false);
    }, 600);

    return () => {
      canceled = true;
      clearTimeout(t);
      setIsLoading(true);
    };
  }, [loadKey, fail]);

  async function handleAcknowledge() {
    setIsMutating(true);

    await new Promise((r) => setTimeout(r, 500));

    setIsMutating(false);

    toast.success("Incident acknowledged", {
      description: `Incident #${id} was acknowledged successfully.`,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Incident Detail
          </h1>
          <p className="text-sm text-muted-foreground">
            Loading uses skeletons. Actions show toast feedback.
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link to="/">Back to Incidents</Link>
        </Button>
      </div>

      {isLoading ? (
        <DetailSkeleton />
      ) : (
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
                establishes skeleton loading + toast feedback patterns.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button
                type="button"
                onClick={handleAcknowledge}
                disabled={isMutating}
              >
                {isMutating ? "Working…" : "Acknowledge"}
              </Button>

              <Button type="button" variant="secondary" disabled>
                Assign
              </Button>

              <Button type="button" variant="destructive" disabled>
                Escalate
              </Button>

              <p className="text-xs text-muted-foreground">
                Only “Acknowledge” is wired for toast feedback right now.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
