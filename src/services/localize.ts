import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18n from 'i18next';

import locales from './locales';

export const availableLanguages = Object.keys(locales);

void i18n.use(initReactI18next).init({
  debug: false,
  initImmediate: true,
  lng: Localization.locale,
  fallbackLng: 'en',
  parseMissingKeyHandler(key) {
    return '!_' + key.toUpperCase() + '_!';
  },
  resources: locales,
});

export default i18n;
