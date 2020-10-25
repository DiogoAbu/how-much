import i18n from '!/services/localize';

import addStringAtPosition from './add-string-at-position';
import removeNotNumbers from './remove-not-numbers';

export default function toNumber(money: string, currency = 'USD'): number {
  const onlyNumbers = removeNotNumbers(money);

  // Format arbitrary value do get fraction amount
  const formatter = new Intl.NumberFormat(i18n.language, { style: 'currency', currency });
  const parts = formatter.formatToParts(1.11111);

  // The Japanese Yen and Korean Won doesn't use a minor unit
  const fraction = parts.find((e) => e.type === 'fraction');
  if (!fraction) {
    return Number(onlyNumbers);
  }

  // Find out where to put the dot using the newly discovered fraction amount
  const dotPosition = onlyNumbers.length - fraction.value.length;
  const number = addStringAtPosition(onlyNumbers, '.', dotPosition);

  return Number(number);
}
