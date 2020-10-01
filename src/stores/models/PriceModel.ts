import { v4 } from 'react-native-uuid';
import { countries } from 'countries-list';
import { makeAutoObservable } from 'mobx';

export class PriceModel {
  // @persist
  id = v4();

  // @persist
  countryCode: keyof typeof countries = 'BR';

  // @persist
  value = '0';

  constructor(data: Pick<PriceModel, 'countryCode' | 'value'>) {
    this.countryCode = data.countryCode;
    this.value = data.value;

    makeAutoObservable(this, {
      id: false,
    });
  }

  setCountryCode(countryCode: PriceModel['countryCode']): void {
    this.countryCode = countryCode;
  }

  setValue(value: PriceModel['value']): void {
    this.value = value;
  }
}
