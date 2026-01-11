import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function getInitialDark() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
}

export default function App() {
  const [isDark, setIsDark] = useState(getInitialDark);
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@example.com");
  const [saved, setSaved] = useState(false);

  const [deleteText, setDeleteText] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const canDelete = useMemo(() => deleteText.trim() === "DELETE", [deleteText]);

  function onSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function onConfirmDelete() {
    setDeleted(true);
    setDeleteOpen(false);
    setDeleteText("");
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Workspace Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Update your profile and manage workspace actions.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsDark((v) => !v)}
            aria-pressed={isDark}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </Button>
        </header>

        <main className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Change how your profile appears to teammates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Display name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit">Save</Button>
                  {saved ? (
                    <span className="text-sm text-muted-foreground">Saved</span>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Destructive actions are permanent. Proceed carefully.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
                <div className="text-sm font-medium">Delete workspace</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  This removes the workspace and all associated data.
                </div>
              </div>

              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete workspace</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete workspace?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Type{" "}
                      <span className="font-semibold">DELETE</span> to confirm.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="confirm">
                      Confirmation
                    </label>
                    <Input
                      id="confirm"
                      value={deleteText}
                      onChange={(e) => setDeleteText(e.target.value)}
                      placeholder="Type DELETE"
                      autoComplete="off"
                    />
                  </div>

                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteText("")}
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      variant="destructive"
                      disabled={!canDelete}
                      onClick={onConfirmDelete}
                    >
                      Confirm delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {deleted ? (
                <div
                  className="rounded-md border bg-muted/40 p-3 text-sm"
                  role="status"
                >
                  Workspace deleted (demo).
                </div>
              ) : null}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
