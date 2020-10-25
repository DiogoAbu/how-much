import i18n from '!/services/localize';

export default function toCurrency(value: number, currency = 'USD'): string {
  const formatter = new Intl.NumberFormat(i18n.language, { style: 'currency', currency });
  const parts = formatter.formatToParts(value);

  return parts
    .filter((e) => {
      return ['integer', 'group', 'decimal', 'fraction'].includes(e.type);
    })
    .map((e) => e.value)
    .join('');
}
