import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
import { useAuth } from "./auth/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function HomePage() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Home</h1>
      <p>This page is public.</p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Not Found</h1>
      <Link to="/">Go home</Link>
    </main>
  );
}

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isCheckingAuth } = useAuth();

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: isActive ? "#f4f4f4" : "transparent",
    color: "#111",
  });

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 12,
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <strong>Auth Routes</strong>
          {isCheckingAuth ? (
            <span style={{ fontSize: 12, color: "#666" }}>Checking auth…</span>
          ) : null}
        </div>

        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink to="/" style={linkStyle} end>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" style={linkStyle}>
                Profile
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" style={linkStyle}>
              Login
            </NavLink>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
