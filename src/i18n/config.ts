import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { resourcesDE } from "./locales/de";
import { resourcesEN } from "./locales/en";
import { resourcesES } from "./locales/es";
import { resourcesIT } from "./locales/it";

i18n.use(detector).use(initReactI18next).init({
    fallbackLng: "en",
    keySeparator: ".",
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    resources: {
      en: resourcesEN,
      de: resourcesDE,
      es: resourcesES,
      it: resourcesIT
    }
});