import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import he from "./locales/he.json";
import ar from "./locales/ar.json";
import ru from "./locales/ru.json";

const RTL_LANGS = ["he", "ar"];

function applyDir(lang) {
  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
}

const savedLang = localStorage.getItem("pharmsense-lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    ar: { translation: ar },
    ru: { translation: ru },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyDir(savedLang);

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("pharmsense-lang", lang);
  applyDir(lang);
});

export default i18n;
