import { useAuth } from "@/auth/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
      <p className="text-sm text-muted-foreground">
        This route is protected and only visible when authenticated.
      </p>

      <div className="rounded-lg border bg-card p-4 text-sm">
        <div>
          <span className="font-medium">Name:</span> {user?.name}
        </div>
        <div>
          <span className="font-medium">Role:</span> {user?.role}
        </div>
      </div>
    </div>
  );
}
