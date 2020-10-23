import { v4 } from 'react-native-uuid';
import { makeAutoObservable } from 'mobx';

import { CurrencyInfo } from '!/utils/currency-list';

export class CountryWageModel {
  id = v4();

  currencyId: CurrencyInfo['id'] = '';

  value = 0.0;

  constructor(data?: Partial<Pick<CountryWageModel, 'id' | 'currencyId' | 'value'>>) {
    this.id = data?.id ?? this.id;
    this.currencyId = data?.currencyId ?? this.currencyId;
    this.value = data?.value ?? this.value;

    makeAutoObservable(this, {
      id: false,
    });
  }

  setCurrencyId(currencyId: CountryWageModel['currencyId']): void {
    this.currencyId = currencyId;
  }

  setValue(value: CountryWageModel['value']): void {
    this.value = value;
  }
}
