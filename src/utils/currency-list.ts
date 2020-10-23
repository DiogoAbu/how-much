import { countries } from 'countries-list';

import { CountryCode } from '!/types';

import hourlyWages from './hourly-wages.json';

export type CurrencyInfo = {
  id: string;
  countryName: string;
  countryNativeName: string;
  countryCode: CountryCode;
  currency: string;
  hourlyWage: number;
};

const currencyList: CurrencyInfo[] = [];

Object.entries(countries).map(([code, country]) => {
  const currencies = country.currency.split(',');
  const countryCode = code as CountryCode;

  const hourlyWage = hourlyWages.find((e) => e.name.toLowerCase() === country.name.toLowerCase());

  currencies
    .filter((e) => !!e)
    .map((currency) => {
      currencyList.push({
        id: `${currency}-${countryCode}-${country.name}`,
        countryName: country.name,
        countryNativeName: country.native,
        countryCode,
        currency,
        hourlyWage: hourlyWage?.value ?? 0.0,
      });
    });
});

currencyList.sort((a, b) => (a.currency > b.currency ? 1 : -1));

export default currencyList;
