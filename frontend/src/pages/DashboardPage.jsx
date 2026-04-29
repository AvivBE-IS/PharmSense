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
  const { t } = useTranslation();

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
      const data = await sendMessage(text);
      const results = data.results ?? [];
      const content =
        results.length > 0
          ? results.map((p) => `• ${p.name_en} ${p.dosage_strength} (${p.brand})`).join("\n")
          : t("dashboard.aiError");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content,
          sources: [],
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
    <div className="bg-[#F1F5F9] text-on-background min-h-screen flex flex-col antialiased">
      <main className="flex-grow flex flex-col items-center px-8 py-8 max-w-7xl mx-auto w-full gap-10">
        {/* Chat thread */}
        {hasMessages && (
          <section className="w-full max-w-3xl flex flex-col gap-6 mt-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    smart_toy
                  </span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] px-5 py-4">
                  <div className="flex gap-1.5 items-center h-6">
                    <span
                      className="w-2 h-2 bg-outline rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-outline rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-outline rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>
        )}

        {/* Hero heading (only when no messages) */}
        {!hasMessages && (
          <section className="w-full max-w-3xl flex flex-col items-center text-center mt-12">
            <h1 className="font-h1 text-h1 text-primary">
              {t("dashboard.heroTitle")}
            </h1>
          </section>
        )}

        {/* AI Search bar */}
        <section className="w-full max-w-3xl">
          <form onSubmit={handleAsk}>
            <div className="relative w-full group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-surface-container-lowest rounded-[24px] p-2 shadow-sm border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-primary-container ml-4">
                  local_pharmacy
                </span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline h-[56px] px-4 outline-none"
                  placeholder={t("dashboard.askPlaceholder")}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="bg-primary text-on-primary rounded-xl px-6 py-3 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md ml-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{t("dashboard.askBtn")}</span>
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </form>
          {!hasMessages && (
            <p className="text-center mt-4 font-body-sm text-body-sm text-outline">
              {t("dashboard.poweredBy")}
            </p>
          )}
        </section>

        {/* Quick Actions (hidden once chat starts) */}
        {!hasMessages && (
          <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#"
              className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer"
            >
              <div className="bg-blue-50 p-4 rounded-full text-primary-container group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  upload_file
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mt-2">
                {t("dashboard.uploadTitle")}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {t("dashboard.uploadDesc")}
              </p>
              <div className="mt-4 font-label-bold text-label-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("dashboard.uploadCta")}
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </div>
            </a>

            <a
              href="#"
              className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer"
            >
              <div className="bg-teal-50 p-4 rounded-full text-secondary group-hover:bg-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  medical_information
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mt-2">
                {t("dashboard.consultTitle")}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {t("dashboard.consultDesc")}
              </p>
              <div className="mt-4 font-label-bold text-label-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("dashboard.consultCta")}
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </div>
            </a>

            <a
              href="#"
              className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer"
            >
              <div className="bg-slate-100 p-4 rounded-full text-tertiary group-hover:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  inventory_2
                </span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mt-2">
                {t("dashboard.ordersTitle")}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {t("dashboard.ordersDesc")}
              </p>
              <div className="mt-4 font-label-bold text-label-bold text-tertiary flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("dashboard.ordersCta")}
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </div>
            </a>
          </section>
        )}

        {/* Trending Topics (hidden once chat starts) */}
        {!hasMessages && (
          <section className="w-full max-w-4xl text-center space-y-6">
            <h4 className="font-label-bold text-label-bold text-outline uppercase tracking-widest">
              {t("dashboard.trendingTitle")}
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm"
                  onClick={() => setQuery(t(`dashboard.trending${i}`))}
                >
                  {t(`dashboard.trending${i}`)}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <div
            className="text-xs uppercase tracking-widest text-slate-400"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            © 2024 PharmSense Digital Healthcare. Clinical Excellence
            Guaranteed.
          </div>
          <nav
            className="flex space-x-6 text-xs uppercase tracking-widest"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <a
              href="#"
              className="text-slate-500 hover:text-blue-700 transition-colors"
            >
              Terms of Care
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-blue-700 transition-colors"
            >
              Privacy Shield
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-blue-700 transition-colors"
            >
              HIPAA Compliance
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
