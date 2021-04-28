import { useTranslation as useTranslationI18n } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useTranslation(ns?: string | string[] | undefined) {
  return useTranslationI18n(ns, { useSuspense: false });
}
