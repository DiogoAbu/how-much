import uuid from 'react-native-uuid';
import { makeAutoObservable } from 'mobx';

import { CurrencyInfo } from '!/utils/currency-list';

export class PriceModel {
  id = uuid.v4() as string;

  currencyId: CurrencyInfo['id'] = '';

  value = 0.0;

  constructor(data?: Partial<Pick<PriceModel, 'id' | 'currencyId' | 'value'>>) {
    this.id = data?.id ?? this.id;
    this.currencyId = data?.currencyId ?? this.currencyId;
    this.value = data?.value ?? this.value;

    makeAutoObservable(this, {
      id: false,
    });
  }

  setId(id: PriceModel['id']): void {
    this.id = id;
  }

  setCurrencyId(currencyId: PriceModel['currencyId']): void {
    this.currencyId = currencyId;
  }

  setValue(value: PriceModel['value']): void {
    this.value = value;
  }
}
