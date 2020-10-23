import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import addStringAtPosition from '!/utils/add-string-at-position';
import removeNotNumbers from '!/utils/remove-not-numbers';

import locales from './locales';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = locales;

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

i18n.fallbacks = true;

i18n.missingTranslationPrefix = 'EE: ';
i18n.missingBehaviour = 'guess';

const localize = i18n;

export default localize;

export function toNumberfromCurrency(text: string): number {
  const onlyNumbers = removeNotNumbers(text);

  const precision = Number(i18n.t('number.currency.format.precision'));

  const dotPosition = onlyNumbers.length - precision;
  const number = addStringAtPosition(onlyNumbers, '.', dotPosition);
  return Number(number);
}

export function toNumberfromFormattedNumber(text: string): number {
  const onlyNumbers = removeNotNumbers(text);

  const precision = Number(i18n.t('number.format.precision'));

  const dotPosition = onlyNumbers.length - precision;
  const number = addStringAtPosition(onlyNumbers, '.', dotPosition);
  return Number(number);
}
