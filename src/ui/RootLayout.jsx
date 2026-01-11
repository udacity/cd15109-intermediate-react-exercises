import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export function RootLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </div>
  );
}
