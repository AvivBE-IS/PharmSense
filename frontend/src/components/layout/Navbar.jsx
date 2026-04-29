/**
 * Navbar — top navigation bar.
 */

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav
      className="flex items-center justify-between px-6 h-14 fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(12,12,24,0.85)',
        borderBottom: '1px solid rgba(124,58,237,0.2)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2.5 select-none no-underline">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
        >
          Rx
        </div>
        <span
          className="text-base font-semibold"
          style={{ background: 'linear-gradient(90deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          PharmSense
        </span>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
          BETA
        </span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                {(user.full_name || user.email).charAt(0).toUpperCase()}
              </div>
              <span className="text-sm" style={{ color: '#94a3b8' }}>
                {user.full_name || user.email.split('@')[0]}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1.5 rounded-full font-medium transition-all"
              style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-sm px-4 py-1.5 rounded-full font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  )
}
