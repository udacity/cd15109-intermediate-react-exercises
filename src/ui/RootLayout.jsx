import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* main id for skip link */}
      <main id="main" className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
