import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationTA from './locales/ta.json';
import translationHI from './locales/hi.json';
import translationML from './locales/ml.json';

const resources = {
  en: { translation: translationEN },
  ta: { translation: translationTA },
  hi: { translation: translationHI },
  ml: { translation: translationML }
};

// Always initialize the website in English when opened
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ta', 'hi', 'ml'],
    interpolation: {
      escapeValue: false
    }
  });

// Ensure HTML document language and LTR alignment are synced cleanly
const syncDocumentLanguage = (lng: string) => {
  const normalized = ['en', 'ta', 'hi', 'ml'].includes(lng) ? lng : 'en';
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = normalized;
};

syncDocumentLanguage(i18n.language || 'en');

i18n.on('languageChanged', (lng) => {
  syncDocumentLanguage(lng);
});

export default i18n;
