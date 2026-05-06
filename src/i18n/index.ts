import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lvTranslation from "./locales/lv/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    lv: { translation: lvTranslation },
    en: { translation: enTranslation },
    // ru, lt, ee — stub, fallback to lv
    ru: { translation: lvTranslation },
    lt: { translation: lvTranslation },
    ee: { translation: lvTranslation },
  },
  lng: "lv",
  fallbackLng: "lv",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
