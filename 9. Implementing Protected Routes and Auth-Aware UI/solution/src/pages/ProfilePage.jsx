import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function ProfilePage() {
  const { fetchProfile, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!isAuthenticated) return;
      setStatus("loading");
      setError("");
      try {
        const data = await fetchProfile();
        if (!cancelled) {
          setProfile(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load profile.");
          setStatus("error");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [fetchProfile, isAuthenticated]);

  return (
    <main style={{ padding: 16 }}>
      <h1>Profile</h1>

      {status === "loading" ? <p>Loading profile…</p> : null}

      {status === "error" ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {status === "success" && profile ? (
        <div
          style={{
            marginTop: 10,
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Name:</strong> {profile.name}
          </p>
          <p style={{ margin: "6px 0 0" }}>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
      ) : null}
    </main>
  );
}
