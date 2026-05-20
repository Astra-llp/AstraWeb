import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';
import translationHI from './locales/hi.json';
import translationTA from './locales/ta.json';
import translationML from './locales/ml.json';
import translationTE from './locales/te.json';
import translationKN from './locales/kn.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  hi: { translation: translationHI },
  ta: { translation: translationTA },
  ml: { translation: translationML },
  te: { translation: translationTE },
  kn: { translation: translationKN }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Handle text direction and HTML lang attribute dynamically
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
