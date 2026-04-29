import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { sendMessage } from "../api/chatApi";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
          isUser
            ? "bg-primary text-on-primary"
            : "bg-surface-container-high text-primary"
        }`}
      >
        {isUser ? (
          "U"
        ) : (
          <span className="material-symbols-outlined text-[18px]">
            smart_toy
          </span>
        )}
      </div>
      <div
        className={`max-w-2xl rounded-[20px] px-5 py-4 ${
          isUser
            ? "bg-primary text-on-primary"
            : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
        }`}
      >
        <p className="font-body-md text-body-md leading-relaxed whitespace-pre-wrap">
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
      className={`text-on-background flex flex-col antialiased ${
        hasMessages ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #eef6ff 100%)" }}
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
              <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
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
            <h1 className="font-h1 text-h1 text-primary max-w-2xl">
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
        className="w-full px-4 pt-4 pb-8 bg-gradient-to-t from-[#f0f4ff]/95 via-[#f0f4ff]/70 to-transparent"
        style={{ flexShrink: 0 }}
      >
        {/* Topic chips — only on landing */}
        {!hasMessages && (
          <div
            className="flex flex-wrap justify-center gap-3 mb-4"
            style={{ maxWidth: "800px", margin: "0 auto 16px" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuery(t(`dashboard.trending${i}`))}
                className="px-5 py-2.5 bg-white border border-blue-200 text-on-surface-variant font-body-sm text-body-sm rounded-full hover:border-blue-400 hover:text-primary hover:shadow-sm transition-all duration-200 shadow-sm"
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
            <div className="relative flex items-center bg-white rounded-[24px] px-6 py-4 shadow-[0_8px_36px_rgba(0,120,255,0.14),0_2px_12px_rgba(0,85,165,0.09)] border border-blue-100/80 focus-within:border-blue-300 focus-within:shadow-[0_10px_44px_rgba(0,120,255,0.24),0_3px_14px_rgba(0,85,165,0.12)] transition-all duration-300">
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
                className="bg-primary text-on-primary rounded-xl px-6 py-3 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md me-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <span>{t("dashboard.askBtn")}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer — hidden in chat mode */}
      {!hasMessages && (
        <footer className="bg-slate-50 border-t border-slate-200 w-full">
          <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
            <div
              className="text-xs uppercase tracking-widest text-slate-400"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              © 2024 PharmSense Digital Healthcare. Clinical Excellence Guaranteed.
            </div>
            <nav
              className="flex space-x-6 text-xs uppercase tracking-widest"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <a href="#" className="text-slate-500 hover:text-blue-700 transition-colors">Terms of Care</a>
              <a href="#" className="text-slate-500 hover:text-blue-700 transition-colors">Privacy Shield</a>
              <a href="#" className="text-slate-500 hover:text-blue-700 transition-colors">HIPAA Compliance</a>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}
