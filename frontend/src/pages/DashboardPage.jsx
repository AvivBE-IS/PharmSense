/**
 * DashboardPage — Professional dark AI chat interface.
 */

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendMessage } from "../api/chatApi";

// ── Design tokens (inline styles for values Tailwind can't express) ────────────
const token = {
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(148,163,184,0.12)",
  borderAccent: "rgba(124,58,237,0.35)",
  gradientBtn: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
  gradientHero: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)",
  userBubble: "linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%)",
  aiBubble: "#131325",
  aiBorder: "rgba(124,58,237,0.25)",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceCard({ source, snippet, relevance_score }) {
  const pct = Math.round(relevance_score * 100);
  const color = pct >= 60 ? "#34d399" : pct >= 30 ? "#fbbf24" : "#94a3b8";
  return (
    <div
      className="mt-2 rounded-xl px-3 py-2.5 text-xs"
      style={{
        background: "rgba(52,211,153,0.06)",
        border: "1px solid rgba(52,211,153,0.18)",
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
          />
          <span
            className="font-semibold uppercase tracking-wider"
            style={{ color: "#34d399" }}
          >
            {source}
          </span>
        </div>
        <span className="font-mono" style={{ color }}>
          {pct}% match
        </span>
      </div>
      <p className="leading-relaxed line-clamp-2" style={{ color: "#94a3b8" }}>
        {snippet}
      </p>
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-black mt-0.5 shadow-lg"
          style={{
            background: token.gradientBtn,
            boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
          }}
        >
          Rx
        </div>
      )}

      <div
        className={`max-w-[80%] flex flex-col ${isUser ? "items-end" : "items-start"}`}
      >
        {/* Bubble */}
        <div
          className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
          style={
            isUser
              ? {
                  background: token.userBubble,
                  color: "#fff",
                  borderRadius: "18px 18px 4px 18px",
                  boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
                }
              : {
                  background: token.aiBubble,
                  color: "#e2e8f0",
                  border: `1px solid ${token.aiBorder}`,
                  borderRadius: "18px 18px 18px 4px",
                }
          }
        >
          {message.content}
        </div>

        {/* Sources */}
        {!isUser && message.sources?.length > 0 && (
          <div className="w-full">
            {message.sources.map((s, i) => (
              <SourceCard key={i} {...s} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] mt-1.5 px-1" style={{ color: "#475569" }}>
          {message.timestamp}
        </span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold mt-0.5"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          You
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
        style={{ background: token.gradientBtn }}
      >
        <div className="flex gap-0.5">
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
        </div>
      </div>
      <div className="text-sm mt-2" style={{ color: "#64748b" }}>
        Searching knowledge base…
      </div>
    </div>
  );
}

const CHIPS = [
  { label: "Warfarin interactions", icon: "💊" },
  { label: "Metformin contraindications", icon: "⚠️" },
  { label: "Creatinine clearance formula", icon: "🧮" },
  { label: "CYP3A4 inhibitors", icon: "🔬" },
];

function nowStr() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState("Local Context");
  const [chatError, setChatError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: text, timestamp: nowStr() },
    ]);
    setInput("");
    setIsLoading(true);
    setChatError(null);
    try {
      const res = await sendMessage(text);
      setDataSource(res.data_source ?? "Local Context");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: res.reply,
          sources: res.sources ?? [],
          timestamp: nowStr(),
        },
      ]);
    } catch {
      setChatError("Failed to reach the assistant. Please try again.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen relative overflow-hidden"
      style={{ background: "#0c0c18" }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(109,40,217,0.22) 0%, rgba(37,99,235,0.16) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Navbar spacer ── */}
      <div className="h-14 flex-shrink-0" />

      {/* ── HERO ── */}
      {!hasMessages && (
        <div
          className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10"
          style={{ paddingBottom: "180px" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {dataSource} · Ready
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mb-6"
            style={{ color: "#f1f5f9" }}
          >
            Pharmaceutical{" "}
            <span
              style={{
                background: token.gradientHero,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              intelligence
            </span>
          </h1>
          <p
            className="text-lg max-w-md leading-relaxed mb-10"
            style={{ color: "#64748b" }}
          >
            Ask about drug interactions, adverse reactions, dosing calculations,
            and clinical guidelines.
          </p>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-3 justify-center">
            {CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  setInput(chip.label);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: token.surface,
                  border: `1px solid ${token.border}`,
                  color: "#cbd5e1",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                  e.currentTarget.style.color = "#a78bfa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = token.surface;
                  e.currentTarget.style.borderColor = token.border;
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Message list ── */}
      {hasMessages && (
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-2xl mx-auto px-4 pt-8 pb-6">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {chatError && (
              <div
                className="text-sm rounded-xl px-4 py-3 mb-4 text-center"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#fca5a5",
                }}
              >
                {chatError}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* ── Input panel ── */}
      <div className="relative z-10 flex-shrink-0 px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(19,19,37,0.9)",
              border: `1px solid ${token.borderAccent}`,
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Text input */}
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about a drug, interaction, or dosing calculation…"
              disabled={isLoading}
              className="w-full bg-transparent resize-none focus:outline-none disabled:opacity-50 leading-relaxed"
              style={{
                padding: "16px 20px 8px",
                color: "#e2e8f0",
                fontSize: "14px",
                height: "56px",
                maxHeight: "160px",
                overflowY: "auto",
              }}
              onInput={(e) => {
                e.target.style.height = "56px";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
              }}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 pb-3">
              {/* Left: data source */}
              <div
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  color: "#34d399",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {dataSource} Active
              </div>

              {/* Right: send */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all active:scale-95"
                style={{
                  background:
                    input.trim() && !isLoading
                      ? token.gradientBtn
                      : "rgba(255,255,255,0.08)",
                  boxShadow:
                    input.trim() && !isLoading
                      ? "0 4px 14px rgba(124,58,237,0.4)"
                      : "none",
                  cursor:
                    !input.trim() || isLoading ? "not-allowed" : "pointer",
                  opacity: !input.trim() || isLoading ? 0.5 : 1,
                }}
                aria-label="Send"
              >
                {isLoading ? (
                  <svg
                    className="w-3.5 h-3.5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLoading ? "Thinking…" : "Send"}
              </button>
            </div>
          </div>

          {/* Hint */}
          <p
            className="text-center text-[11px] mt-2"
            style={{ color: "#334155" }}
          >
            <kbd
              className="px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Enter
            </kbd>{" "}
            to send ·{" "}
            <kbd
              className="px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Shift+Enter
            </kbd>{" "}
            for new line
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Chat sub-components ───────────────────────────────────────────────────────
