import { CountryWageModel } from '!/stores/models/CountryWageModel';
import { PriceModel } from '!/stores/models/PriceModel';

import { CurrencyInfo } from './currency-list';

export default function calculateWorkingHours({
  price,
  currencyInfo,
  wage,
}: {
  price: PriceModel;
  currencyInfo: CurrencyInfo;
  wage?: CountryWageModel;
}): string {
  const hourlyWage = wage?.value || currencyInfo?.hourlyWage;

  return (price.value / hourlyWage).toFixed(1);
}
