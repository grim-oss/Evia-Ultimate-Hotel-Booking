// i18n configuration (if needed for custom setup)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import amCommon from '../../public/locales/am/common.json';
import enCommon from '../../public/locales/en/common.json';

// This file is optional if using next-i18next; it's here for completeness.
i18n.use(initReactI18next).init({
  resources: {
    am: { common: amCommon },
    en: { common: enCommon },
  },
  lng: 'am',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;