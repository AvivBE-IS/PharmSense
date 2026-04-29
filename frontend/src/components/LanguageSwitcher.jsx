import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "English" },
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();

  return (
    <div className={`relative w-full ${className}`} dir="ltr">
      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none select-none">
        language
      </span>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none w-full pl-8 pr-7 py-1.5 rounded-full text-xs font-semibold bg-surface border border-outline-variant text-on-surface hover:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all cursor-pointer text-right"
      >
        {LANGS.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-1.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none select-none">
        expand_more
      </span>
    </div>
  );
}
