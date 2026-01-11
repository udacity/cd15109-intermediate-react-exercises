import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function validateEmail(value) {
  const v = String(value || "").trim();
  if (!v) return "Email is required.";
  if (!v.includes("@")) return "Enter a valid email address.";
  return null;
}

function validatePassword(value) {
  const v = String(value || "");
  if (!v) return "Password is required.";
  if (v.length < 6) return "Password must be at least 6 characters.";
  return null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fakeAuth(email, password) {
  const ok = email.toLowerCase().includes("casey") || password === "password";
  if (!ok) {
    const err = new Error("Invalid email or password.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  return {
    token: `demo-token-${Date.now()}`,
    user: { id: 1, name: "Casey", role: "reviewer" },
  };
}

export function LoginPage() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = useMemo(() => searchParams.get("redirect") || "/", [searchParams]);

  const [email, setEmail] = useState("casey@example.com");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const canSubmit = !emailError && !passwordError && !isSubmitting;

  useEffect(() => {
    setFormError("");
  }, [email, password]);

  async function onSubmit(e) {
    e.preventDefault();

    setTouched({ email: true, password: true });

    if (emailError || passwordError) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      await sleep(500);
      const session = fakeAuth(email, password);
      login(session);

      toast.success("Signed in", { description: `Welcome back, ${session.user.name}.` });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err?.message || "Login failed. Please try again.";
      setFormError(message);
      toast.error("Login failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthenticated) {
    return (
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>You're already signed in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{user?.name}</span>.
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" onClick={() => navigate("/", { replace: true })}>
                Go to Incidents
              </Button>
              <Button type="button" variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={Boolean(touched.email && emailError)}
                aria-describedby="email-help"
              />
              <div id="email-help" className="min-h-5 text-xs text-destructive">
                {touched.email && emailError ? emailError : ""}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={Boolean(touched.password && passwordError)}
                aria-describedby="password-help"
              />
              <div id="password-help" className="min-h-5 text-xs text-destructive">
                {touched.password && passwordError ? passwordError : ""}
              </div>
            </div>

            {formError ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>

            <div className="text-xs text-muted-foreground">
              Demo tip: try <span className="font-medium text-foreground">casey@example.com</span> or password{" "}
              <span className="font-medium text-foreground">password</span>.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
