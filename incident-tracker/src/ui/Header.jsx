import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider.jsx";

const baseLink =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-background">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-background px-3 py-2 text-sm font-medium shadow"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold tracking-tight sm:text-base">
            Incident Tracker
          </div>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  baseLink,
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")
              }
            >
              Incidents
            </NavLink>

            <NavLink
              to="/approvals"
              className={({ isActive }) =>
                [
                  baseLink,
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")
              }
            >
              Approvals
            </NavLink>
          </nav>
        </div>

        <Button
          variant="secondary"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </header>
  );
}
