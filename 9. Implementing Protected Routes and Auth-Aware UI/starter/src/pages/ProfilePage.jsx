import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function ProfilePage() {
  const { isAuthenticated, fetchProfile } = useAuth();

  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // TODO: Only attempt to load profile data when logged in
      // TODO: Manage loading / success / error UI state
      // TODO: Call fetchProfile() and store the result
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, fetchProfile]);

  return (
    <main style={{ padding: 16 }}>
      <h1>Profile</h1>

      {/* TODO: Render:
          - loading UI while fetching
          - error UI on failure
          - profile details on success */}
      <pre style={{ background: "#fafafa", padding: 12, borderRadius: 12 }}>
        {JSON.stringify({ status, profile, error }, null, 2)}
      </pre>
    </main>
  );
}
