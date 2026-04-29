import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendMessage } from "../api/chatApi";
import SearchResultCard from "../components/SearchResultCard";

// ─── Extracted at module level to avoid remount on every render ───────────────
function SearchBar({
  query,
  onChange,
  onSubmit,
  onKeyDown,
  isLoading,
  isRightToLeft,
  t,
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative w-full group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400/35 to-teal-400/35 rounded-[28px] blur-lg opacity-55 group-focus-within:opacity-100 group-hover:opacity-80 transition-opacity duration-500" />
        <div
          dir="ltr"
          className="relative bg-surface-container-lowest rounded-[20px] sm:rounded-[24px] px-3 sm:px-6 py-3 sm:py-4 shadow-[0_8px_36px_rgba(0,120,255,0.14),0_2px_12px_rgba(0,85,165,0.09)] dark:shadow-[0_8px_36px_rgba(0,0,0,0.35)] border border-outline-variant/50 focus-within:border-primary/40 focus-within:shadow-[0_10px_44px_rgba(0,120,255,0.24)] dark:focus-within:shadow-[0_10px_44px_rgba(91,155,213,0.2)] transition-all duration-300"
        >
          <span className="material-symbols-outlined text-primary-container absolute inset-y-0 left-4 sm:left-6 flex items-center pointer-events-none">
            local_pharmacy
          </span>
          <input
            dir={isRightToLeft ? "rtl" : "ltr"}
            className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline dark:placeholder:text-slate-400 h-[56px] outline-none pl-10 sm:pl-12 pr-[140px] sm:pr-[160px]"
            placeholder={t("dashboard.askPlaceholder")}
            type="text"
            value={query}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute inset-y-0 right-3 sm:right-4 my-auto bg-[#003e7b] text-white rounded-xl px-3 sm:px-5 py-2.5 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
            style={{ flexDirection: isRightToLeft ? "row-reverse" : "row" }}
          >
            <span
              className="ask-btn-label hidden sm:inline"
              dir={isRightToLeft ? "rtl" : "ltr"}
            >
              {t("dashboard.askBtn")}
            </span>
            <span className="material-symbols-outlined text-[20px]">
              {isLoading
                ? "autorenew"
                : isRightToLeft
                  ? "arrow_back"
                  : "arrow_forward"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

function SmartSummaryBanner({ intent, t }) {
  if (!intent || (!intent.symptom && !intent.target_audience)) return null;
  return (
    <div className="relative mb-5 rounded-2xl overflow-hidden">
      {/* Ambient glow layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-teal-400/10 to-primary/10 dark:from-blue-500/20 dark:via-teal-400/15 dark:to-primary/20 blur-sm" />
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4 bg-surface-container-lowest/80 dark:bg-surface-container/80 border border-primary/20 dark:border-primary/30 rounded-2xl backdrop-blur-sm">
        <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
          psychology
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 dark:text-primary/80 shrink-0">
          {t("dashboard.smartSummary")}
        </span>
        <div className="w-px h-4 bg-outline-variant/50 shrink-0 hidden sm:block" />

        {intent.symptom && (
          <span className="text-sm text-on-surface">
            <span className="text-on-surface-variant">
              {t("dashboard.searchFor")}{" "}
            </span>
            <span className="font-semibold text-primary">{intent.symptom}</span>
          </span>
        )}

        {intent.target_audience && (
          <>
            <span className="text-on-surface-variant/40 hidden sm:inline">
              ·
            </span>
            <span className="text-sm text-on-surface">
              <span className="text-on-surface-variant">
                {t("dashboard.targetLabel")}{" "}
              </span>
              <span className="font-semibold">{intent.target_audience}</span>
            </span>
          </>
        )}

        {intent.urgency === "High" && (
          <span className="ms-auto inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full px-2.5 py-1 shrink-0">
            <span className="material-symbols-outlined text-[13px]">
              warning
            </span>
            {t("dashboard.urgencyHigh")}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main page component ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const [query, setQuery] = useState("");
  // null = never searched; [] = searched, no results; [...] = has results
  const [results, setResults] = useState(null);
  const [intent, setIntent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isRightToLeft = ["he", "ar"].includes(i18n.language);
  const hasSearched = results !== null;

  function resetAll() {
    setQuery("");
    setResults(null);
    setIntent(null);
    setSearchError(null);
    setIsLoading(false);
  }

  // Logo click reset
  useEffect(() => {
    if (location.state?.reset) resetAll();
  }, [location.state?.reset]);

  // Language switch reset
  useEffect(() => {
    resetAll();
  }, [i18n.language]);

  async function handleAsk(e) {
    e?.preventDefault();
    if (!query.trim() || isLoading) return;
    const text = query.trim();
    setIsLoading(true);
    setSearchError(null);
    try {
      const data = await sendMessage(text, i18n.language);
      setResults(data?.results ?? []);
      setIntent({
        corrected_name: data?.corrected_name ?? text,
        symptom: data?.symptom ?? null,
        target_audience: data?.target_audience ?? null,
        urgency: data?.urgency ?? null,
        brief_insight: data?.brief_insight ?? null,
        language: data?.language ?? null,
      });
    } catch {
      setSearchError(t("dashboard.networkError"));
      setResults([]);
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

  const searchBarProps = {
    query,
    isLoading,
    isRightToLeft,
    t,
    onChange: (e) => setQuery(e.target.value),
    onSubmit: handleAsk,
    onKeyDown: handleKeyDown,
  };

  // ── HERO VIEW (before any search) ──────────────────────────────────────────
  if (!hasSearched) {
    return (
      <div className="page-gradient text-on-background flex flex-col min-h-screen antialiased">
        <main className="flex-grow flex flex-col items-center justify-center px-6 w-full pt-8 pb-0">
          <div className="flex flex-col items-center text-center gap-4 pb-8 w-full">
            <h1 className="font-h1 text-[26px] sm:text-[32px] md:text-h1 font-extrabold leading-tight text-primary dark:text-white max-w-4xl">
              {t("dashboard.heroTitle")}
            </h1>
          </div>
        </main>

        {/* Pinned bottom input bar */}
        <div
          className="input-bar-fade w-full px-4 pt-4 pb-8"
          style={{ flexShrink: 0 }}
        >
          {/* Topic chips — responsive grid */}
          <div
            dir={isRightToLeft ? "rtl" : "ltr"}
            className="mx-auto mb-6 px-1 max-w-2xl grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-row justify-center items-center gap-3"
          >
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={async () => {
                  const text = t(`dashboard.trending${i}`);
                  setQuery(text);
                  setIsLoading(true);
                  setSearchError(null);
                  try {
                    const data = await sendMessage(text, i18n.language);
                    setResults(data?.results ?? []);
                    setIntent({
                      corrected_name: data?.corrected_name ?? text,
                      symptom: data?.symptom ?? null,
                      target_audience: data?.target_audience ?? null,
                      urgency: data?.urgency ?? null,
                      brief_insight: data?.brief_insight ?? null,
                      language: data?.language ?? null,
                    });
                  } catch {
                    setSearchError(t("dashboard.networkError"));
                    setResults([]);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className="w-full xl:w-auto text-center px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/60 dark:border-slate-500 text-on-surface-variant dark:text-white font-body-sm text-body-sm rounded-full hover:border-primary/50 hover:text-primary hover:shadow-sm hover:bg-surface-container-low transition-all duration-200 shadow-sm"
              >
                {t(`dashboard.trending${i}`)}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <SearchBar {...searchBarProps} />
          </div>
        </div>

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
      </div>
    );
  }

  // ── RESULTS VIEW (after search) ────────────────────────────────────────────
  return (
    <div className="page-gradient text-on-background min-h-screen flex flex-col antialiased">
      {/* Sticky search bar at top */}
      <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 px-4 py-3 shadow-sm">
        <SearchBar {...searchBarProps} />
      </div>

      {/* Results area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Smart Summary banner */}
        <SmartSummaryBanner intent={intent} t={t} />

        {/* Brief insight line */}
        {intent?.brief_insight && !isLoading && (
          <p className="text-sm text-on-surface-variant mb-5 px-1 italic">
            {intent.brief_insight}
          </p>
        )}

        {/* Loading skeleton grid */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl h-52 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Network / API error */}
        {searchError && !isLoading && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="material-symbols-outlined text-error text-[48px]">
              error_outline
            </span>
            <p className="text-on-surface-variant">{searchError}</p>
          </div>
        )}

        {/* Results grid */}
        {!isLoading && !searchError && results && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((product) => (
              <SearchResultCard
                key={product.id}
                {...product}
                onViewDetails={() => {
                  /* TODO: navigate(`/medicine/${product.id}`) */
                }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !searchError && results && results.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="material-symbols-outlined text-[56px] text-outline">
              search_off
            </span>
            <h2 className="text-lg font-semibold text-on-surface">
              {t("dashboard.noResultsTitle")}
            </h2>
            <p className="text-sm text-on-surface-variant max-w-sm">
              {t("dashboard.noResultsDesc")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
