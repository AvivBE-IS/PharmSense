/**
 * LoginPage — dark themed sign-in form.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0c0c18" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(109,40,217,0.2) 0%, rgba(37,99,235,0.12) 40%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo block */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black mx-auto mb-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
            }}
          >
            Rx
          </div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PharmSense
          </h1>
          <p className="text-sm mt-1" style={{ color: "#475569" }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(19,19,37,0.9)",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#64748b" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pharmsense.dev"
                required
                autoFocus
                className="rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(148,163,184,0.15)",
                  color: "#e2e8f0",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(124,58,237,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(148,163,184,0.15)")
                }
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#64748b" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm transition-all focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(148,163,184,0.15)",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(124,58,237,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(148,163,184,0.15)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md transition-all"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a78bfa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#64748b")
                  }
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff size={17} /> : <HiEye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="text-sm rounded-xl px-4 py-3"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}
            >
              {isSubmitting ? "Signing in…" : "Sign in →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
