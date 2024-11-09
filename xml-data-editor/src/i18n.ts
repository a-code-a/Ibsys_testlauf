import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import deTranslations from './language/deutsch.json';
import enTranslations from './language/english.json';

const storedLanguage = localStorage.getItem('selectedLanguage');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: deTranslations },
      en: { translation: enTranslations }
    },
    lng: storedLanguage || 'de',
    fallbackLng: 'de',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
