import { PriceModel } from '!/stores/models/PriceModel';

import { CurrencyInfo } from './currency-list';

export default function calculateWorkingHours({
  price,
  currencyInfo,
  wageValue,
}: {
  price: PriceModel;
  currencyInfo: CurrencyInfo;
  wageValue?: number;
}): string {
  const hourlyWage = wageValue || currencyInfo?.hourlyWage;

  return (price.value / hourlyWage).toFixed(1);
}
