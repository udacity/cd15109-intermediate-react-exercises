import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getTicketById } from "../data/tickets.js";

export default function TicketPage() {
  const { ticketId } = useParams();
  const ticket = getTicketById(ticketId);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function backToTickets() {
    const qs = searchParams.toString();
    navigate(`/tickets${qs ? `?${qs}` : ""}`);
  }

  if (!ticket) {
    return (
      <section>
        <h2 style={{ marginTop: 0 }}>Ticket not found</h2>
        <p style={{ opacity: 0.7 }}>
          No ticket exists for ID: <code>{ticketId}</code>
        </p>
        <button onClick={backToTickets}>Back to tickets</button>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={backToTickets}>Back to tickets</button>
        <div>
          <h2 style={{ margin: 0 }}>{ticket.title}</h2>
          <div style={{ opacity: 0.7, fontSize: 14 }}>
            ID: {ticket.id} • Status: {ticket.status}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <NavLink
          end
          to=""
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 400,
            textDecoration: "none",
          })}
        >
          Overview
        </NavLink>
        <NavLink
          to="activity"
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 400,
            textDecoration: "none",
          })}
        >
          Activity
        </NavLink>
      </div>

      <div style={{ marginTop: 12 }}>
        <Outlet context={{ ticket }} />
      </div>
    </section>
  );
}

TicketPage.Overview = function Overview() {
  const { ticket } = useOutletContext();
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Overview</h3>
      <p style={{ opacity: 0.8, marginBottom: 0 }}>
        This is the index route. Ticket <code>{ticket.id}</code> is{" "}
        <strong>{ticket.status}</strong>.
      </p>
    </div>
  );
};

TicketPage.Activity = function Activity() {
  const { ticket } = useOutletContext();
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Activity</h3>
      <ul style={{ paddingLeft: 18 }}>
        {ticket.activity.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
