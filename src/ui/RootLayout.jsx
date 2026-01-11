import { NavLink, Outlet } from "react-router-dom";

const linkBaseStyle = {
  padding: "8px 10px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "inherit",
};

export function RootLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          borderBottom: "1px solid #eee",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ fontWeight: 700 }}>Incident Tracker</div>

        <nav style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              ...linkBaseStyle,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "#f2f2f2" : "transparent",
            })}
          >
            Incidents
          </NavLink>

          <NavLink
            to="/incidents/1"
            style={({ isActive }) => ({
              ...linkBaseStyle,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "#f2f2f2" : "transparent",
            })}
          >
            Incident Detail
          </NavLink>

          <NavLink
            to="/approvals"
            style={({ isActive }) => ({
              ...linkBaseStyle,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "#f2f2f2" : "transparent",
            })}
          >
            Approvals
          </NavLink>

          <NavLink
            to="/login"
            style={({ isActive }) => ({
              ...linkBaseStyle,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "#f2f2f2" : "transparent",
            })}
          >
            Login
          </NavLink>
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </div>
  );
}
