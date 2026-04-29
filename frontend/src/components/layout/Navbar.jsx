import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login page has its own embedded logo — no top navbar needed
  if (location.pathname === "/login") return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20 w-full">
        {/* Brand */}
        <Link
          to="/dashboard"
          className="text-2xl font-black tracking-tighter text-blue-800"
        >
          PharmSense
        </Link>

        {/* Nav links */}
        <nav
          className="hidden md:flex space-x-1 text-sm font-medium tracking-wide"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <Link
            to="/catalog"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300 px-3 py-2"
          >
            Prescriptions
          </Link>
          <Link
            to="/catalog"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300 px-3 py-2"
          >
            Refills
          </Link>
          <Link
            to="/catalog"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300 px-3 py-2"
          >
            Pharmacy Finder
          </Link>
          <Link
            to="/dashboard"
            className={`rounded-lg transition-all duration-300 px-3 py-2 ${
              location.pathname === "/dashboard"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-slate-500 hover:text-blue-600 hover:bg-blue-50/50"
            }`}
          >
            Health AI
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-2 text-blue-700">
          <button className="hover:bg-blue-50/50 rounded-lg transition-all duration-300 p-2">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          {user ? (
            <>
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-sm font-bold">
                {(user.full_name || user.email).charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="ml-1 text-sm px-4 py-1.5 rounded-full font-medium transition-all border border-red-200 text-red-500 hover:bg-red-50"
              >
                Log out
              </button>
            </>
          ) : (
            <button className="hover:bg-blue-50/50 rounded-lg transition-all duration-300 p-2">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
