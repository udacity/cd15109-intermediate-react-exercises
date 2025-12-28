import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import TicketsPage from "./routes/TicketsPage.jsx";
import TicketPage from "./routes/TicketPage.jsx";

function Layout() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>Ticket Router Lab</h1>
        <nav>
          <NavLink
            to="/tickets"
            style={({ isActive }) => ({
              fontWeight: isActive ? 700 : 400,
              textDecoration: "none",
            })}
          >
            Tickets
          </NavLink>
        </nav>
      </header>
      <main style={{ marginTop: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Not Found</h2>
      <p style={{ opacity: 0.7 }}>That route doesn’t exist.</p>
      <Link to="/tickets">Go to tickets</Link>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/:ticketId" element={<TicketPage />}>
          <Route index element={<TicketPage.Overview />} />
          <Route path="activity" element={<TicketPage.Activity />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
