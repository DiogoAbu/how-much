import * as Localization from 'expo-localization';

import currencyList, { CurrencyInfo } from './currency-list';

export default function findCurrencyUsingLocale(): CurrencyInfo | undefined {
  const [, countryCode] = Localization.locale.toUpperCase().split('-');

  return currencyList.find((each) => {
    if (each.countryCode.toUpperCase() === countryCode) {
      return true;
    }
    return false;
  });
}
