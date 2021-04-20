import i18n from '!/services/localize';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export default function formatDate(date?: number | Date | undefined): string {
  return new Intl.DateTimeFormat(i18n.language, options).format(date);
}
