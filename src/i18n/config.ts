import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

export const resourcesEN = {
    translation: {
        "gameover": {
            "reachedPoints": {
                "part1": "You reached ",
                "part2": " Points!"
            },
            "again": "Try again!",
            "settings": "Settings",
            "options": {
                "dev": "Debug",
                "manual": "Manual",
                "english": "English",
                "faceCon": "Facecam Control"
            }
        },
        "manual": {
            "placing": {
                "or": "or",
                "part2": "to place a block",
                "face": "or just open your mouth!"
            },
            "refresh": "to try again or reload the page"
        }
    }
};
const resourcesDE = {
    translation: {
        "gameover": {
            "reachedPoints": {
                "part1": "Du hast ",
                "part2": " Punkte erreicht!"
            },
            "again": "Versuche es noch einmal!",
            "settings": "Einstellungen",
            "options": {
                "dev": "Debug",
                "manual": "Anleitung",
                "english": "Englisch",
                "faceCon": "Facecam Steuerung"
            }
        },
        "manual": {
            "placing": {
                "or": "oder",
                "part2": "um einen Block zu platzieren",
                "face": "oder öffne einfach deinen Mund!"
            },
            "refresh": "um es noch einmal zu versuchen oder die Seite neu zu laden"
        }
    }
};
const resourcesES = {
    translation: {
        "gameover": {
            "reachedPoints": {
                "part1": "Alcanzaste ",
                "part2": " puntos!"
            },
            "again": "Intentar otra vez!",
            "settings": "Ajustes",
            "options": {
                "dev": "Depurar",
                "manual": "El Manual",
                "english": "Ingles",
                "faceCon": "Facecam controlar"
            }
        },
        "manual": {
            "placing": {
                "or": "o",
                "part2": "colocar un bloque",
                "face": "o simplemente abre la boca!"
            },
            "refresh": "para volver a intentarlo o actualizar la pagina"
        }
    }
};
const resourcesIT = {
    translation: {
        "gameover": {
            "reachedPoints": {
                "part1": "Hai raggiunto ",
                "part2": " punti!"
            },
            "again": "Riprova!",
            "settings": "Impostazioni",
            "options": {
                "dev": "Debug",
                "manual": "Il manuale",
                "english": "Inglese",
                "faceCon": "Facecam controllo"
            }
        },
        "manual": {
            "placing": {
                "or": "o",
                "part2": "per posizionare un blocco",
                "face": "o semplicemente apri la bocca!"
            },
            "refresh": "per riprovare o aggiornare la pagina"
        }
    }
};
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