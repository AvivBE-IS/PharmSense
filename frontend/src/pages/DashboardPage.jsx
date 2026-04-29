import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { sendMessage } from "../api/chatApi";

function MessageBubble({ message, userInitial }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar — 40×40, top-aligned */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
          isUser
            ? "bg-primary text-on-primary"
            : "bg-surface-container-high text-primary"
        }`}
      >
        {isUser ? (
          userInitial
        ) : (
          <span className="material-symbols-outlined text-[20px]">
            smart_toy
          </span>
        )}
      </div>
      {/* Bubble */}
      <div
        className={`max-w-[85%] sm:max-w-2xl rounded-[20px] ${
          isUser
            ? "px-4 py-2 bg-primary text-on-primary"
            : "px-5 py-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
        }`}
      >
        <p className={`font-body-md text-body-md whitespace-pre-wrap ${isUser ? "leading-snug" : "leading-[1.75]"}`}>
          {message.content}
        </p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2 border-t border-outline-variant/20 pt-3">
            {message.sources.map((s, i) => (
              <div
                key={i}
                className="text-xs bg-surface-container-low rounded-lg px-3 py-2"
              >
                <span className="font-semibold text-secondary">{s.source}</span>
                <span className="text-on-surface-variant ml-2">
                  {s.snippet}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const userInitial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  // Reset all state when the logo is clicked (reset token changes)
  useEffect(() => {
    if (location.state?.reset) {
      setQuery("");
      setMessages([]);
      setIsLoading(false);
    }
  }, [location.state?.reset]);

  // Clear chat when the user switches language
  useEffect(() => {
    setQuery("");
    setMessages([]);
    setIsLoading(false);
  }, [i18n.language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleAsk(e) {
    e?.preventDefault();
    if (!query.trim() || isLoading) return;
    const text = query.trim();
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setQuery("");
    setIsLoading(true);
    try {
      const data = await sendMessage(text, i18n.language);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply || data.answer || t("dashboard.aiError"),
          sources: data.sources || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            t("dashboard.networkError"),
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div
      className={`page-gradient text-on-background flex flex-col antialiased ${
        hasMessages ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {/* Scrollable content area */}
      <main
        className={`flex-grow flex flex-col items-center px-6 w-full ${
          hasMessages
            ? "overflow-y-auto pt-8 pb-4"
            : "justify-center pt-8 pb-0"
        }`}
      >
        {/* Chat thread */}
        {hasMessages && (
          <section className="w-full max-w-3xl flex flex-col gap-6 mt-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} userInitial={userInitial} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] px-5 py-4">
                  <div className="flex gap-1.5 items-center h-6">
                    <span className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>
        )}

        {/* Hero — centred vertically when no messages */}
        {!hasMessages && (
          <div className="flex flex-col items-center text-center gap-4 pb-8">
            <h1 className="font-h1 text-[26px] sm:text-[32px] md:text-h1 font-extrabold leading-tight text-primary max-w-4xl">
              {t("dashboard.heroTitle")}
            </h1>
            <p className="font-body-sm text-body-sm text-outline">
              {t("dashboard.poweredBy")}
            </p>
          </div>
        )}
      </main>

      {/* ─── Pinned input bar ─────────────────────────────────── */}
      <div
        className="input-bar-fade w-full px-4 pt-4 pb-8"
        style={{ flexShrink: 0 }}
      >
        {/* Topic chips — 2×2 grid, equal-width columns, centred under input */}
        {!hasMessages && (
          <div
            style={{ maxWidth: "800px", margin: "0 auto 20px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-1"
          >
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuery(t(`dashboard.trending${i}`))}
                className="w-full text-center px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/60 text-on-surface-variant font-body-sm text-body-sm rounded-full hover:border-primary/50 hover:text-primary hover:shadow-sm hover:bg-surface-container-low transition-all duration-200 shadow-sm truncate"
              >
                {t(`dashboard.trending${i}`)}
              </button>
            ))}
          </div>
        )}

        {/* Input form */}
        <form
          onSubmit={handleAsk}
          className="w-[90%] md:w-full"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div className="relative w-full group">
            {/* Outer ambient glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400/35 to-teal-400/35 rounded-[28px] blur-lg opacity-55 group-focus-within:opacity-100 group-hover:opacity-80 transition-opacity duration-500" />
            {/* Input row */}
            <div className="relative flex items-center bg-surface-container-lowest rounded-[20px] sm:rounded-[24px] px-3 sm:px-6 py-3 sm:py-4 shadow-[0_8px_36px_rgba(0,120,255,0.14),0_2px_12px_rgba(0,85,165,0.09)] dark:shadow-[0_8px_36px_rgba(0,0,0,0.35)] border border-outline-variant/50 focus-within:border-primary/40 focus-within:shadow-[0_10px_44px_rgba(0,120,255,0.24)] dark:focus-within:shadow-[0_10px_44px_rgba(91,155,213,0.2)] transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container ms-1 shrink-0">
                local_pharmacy
              </span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline h-[56px] px-5 outline-none"
                placeholder={t("dashboard.askPlaceholder")}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="bg-primary text-on-primary dark:bg-[#3b82f6] dark:text-white rounded-xl px-3 sm:px-6 py-3 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md me-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <span className="ask-btn-label hidden sm:inline">{t("dashboard.askBtn")}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer — hidden in chat mode */}
      {!hasMessages && (
        <footer className="bg-surface-container-low border-t border-outline-variant/20 w-full">
          <div className="w-full px-4 py-5 flex justify-center">
            <p
              className="text-xs text-outline text-center"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              {t("footer.copyright")}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
