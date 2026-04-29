/**
 * App — root component with client-side routing.
 *
 * Route structure:
 *   /              → redirect to /dashboard (or /login if not authenticated)
 *   /login         → LoginPage (public)
 *   /dashboard     → DashboardPage (protected)
 *
 * Add new pages by importing them and adding a <Route> inside <Routes>.
 */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 * Shows a loading state while the initial auth check is in-flight.
 */
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
