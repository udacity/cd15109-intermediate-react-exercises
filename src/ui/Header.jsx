import { NavLink } from "react-router-dom";

const baseLinkStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "inherit",
  fontWeight: 500,
};

export function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #eee",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: 700 }}>Incident Tracker</div>

      <nav style={{ display: "flex", gap: "8px" }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            ...baseLinkStyle,
            background: isActive ? "#f2f2f2" : "transparent",
            fontWeight: isActive ? 700 : 500,
          })}
        >
          Incidents
        </NavLink>

        <NavLink
          to="/approvals"
          style={({ isActive }) => ({
            ...baseLinkStyle,
            background: isActive ? "#f2f2f2" : "transparent",
            fontWeight: isActive ? 700 : 500,
          })}
        >
          Approvals
        </NavLink>
      </nav>
    </header>
  );
}
