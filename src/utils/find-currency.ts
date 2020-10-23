import currencyList, { CurrencyInfo } from './currency-list';

export default function findCurrency(id?: CurrencyInfo['id']): CurrencyInfo | undefined {
  return currencyList.find((e) => e.id === id);
}
