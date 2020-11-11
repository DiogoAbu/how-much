import { makeAutoObservable } from 'mobx';

import { CurrencyInfo } from '!/utils/currency-list';

export class CountryWageModel {
  currencyId: CurrencyInfo['id'] = '';

  value = 0.0;

  constructor(data?: Partial<Pick<CountryWageModel, 'currencyId' | 'value'>>) {
    this.currencyId = data?.currencyId ?? this.currencyId;
    this.value = data?.value ?? this.value;

    makeAutoObservable(this);
  }

  setCurrencyId(currencyId: CountryWageModel['currencyId']): void {
    this.currencyId = currencyId;
  }

  setValue(value: CountryWageModel['value']): void {
    this.value = value;
  }
}
