import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  if (location.pathname === "/login") return null;

  function handleLogout() {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.name || user?.email || "";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  function handleLogoClick(e) {
    e.preventDefault();
    // Always navigate to /dashboard with a fresh reset token.
    // DashboardPage listens for this and clears all state.
    navigate("/dashboard", { state: { reset: Date.now() }, replace: location.pathname === "/dashboard" });
  }

  return (
    <header dir="ltr" className="bg-surface-container-lowest/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16 sm:h-20 w-full">

        {/* Brand — clicking resets dashboard or navigates home from other pages */}
        <a
          href="/dashboard"
          onClick={handleLogoClick}
          className="text-2xl font-black tracking-tighter text-primary select-none cursor-pointer"
        >
          PharmSense
        </a>

        {/* Right side — consistent gap, vertically centered */}
        <div className="flex items-center gap-1 text-on-surface-variant">
          <LanguageSwitcher />

          {/* Dark / Light toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle colour theme"
            className="flex items-center justify-center w-9 h-9 hover:bg-surface-container-high rounded-lg transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[22px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Avatar + dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="Open user menu"
                aria-expanded={dropdownOpen}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-on-primary text-sm font-bold hover:ring-2 hover:ring-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {avatarLetter}
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute end-0 mt-2 w-60 rounded-2xl shadow-xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden z-50 animate-[fadeInDown_0.15s_ease]">
                  {/* User info header */}
                  <div className="px-4 py-4 flex items-center gap-3 border-b border-outline-variant/20">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-base font-bold shrink-0">
                      {avatarLetter}
                    </div>
                    <div className="min-w-0">
                      {user.name && (
                        <p className="text-sm font-semibold text-on-surface truncate">
                          {user.name}
                        </p>
                      )}
                      <p className="text-xs text-on-surface-variant truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Logout row */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 dark:text-red-400 transition-colors duration-150"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="flex items-center justify-center w-9 h-9 hover:bg-surface-container-high rounded-lg transition-colors duration-200">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
