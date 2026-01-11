import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProtectedRoute({ children, title = "Approvals" }) {
  const { isAuthenticated, isResolving } = useAuth();
  const location = useLocation();

  if (isResolving) {
    return (
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Loading…</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Checking your session…
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthenticated) return children;

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Sign in required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            You must be signed in to view{" "}
            <span className="font-medium text-foreground">{title}</span>.
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <NavLink to="/login" state={{ from: location }}>
                Go to Login
              </NavLink>
            </Button>

            <Button asChild variant="secondary">
              <NavLink to="/">Back to Incidents</NavLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
