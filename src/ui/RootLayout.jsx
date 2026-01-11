import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";

function NavItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "rounded-md px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground"
          : "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60"
      }
    >
      {children}
    </NavLink>
  );
}

export function RootLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-dvh">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        href="#main"
      >
        Skip to content
      </a>

      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold tracking-tight">Incident Tracker</div>
            <nav className="flex items-center gap-1">
              <NavItem to="/" end>
                Incidents
              </NavItem>
              <NavItem to="/approvals">Approvals</NavItem>
              {isAuthenticated && <NavItem to="/profile">Profile</NavItem>}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:block text-xs text-muted-foreground">
                  Signed in as <span className="font-medium text-foreground">{user?.name}</span>
                </div>
                <Button type="button" variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="hidden sm:block text-xs text-muted-foreground">Not signed in</div>
                <NavLink
                  to="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
