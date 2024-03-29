import { action, makeObservable, observable } from 'mobx';
import { format, ignore } from 'mobx-sync';

import { Unarray } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import { ProductShareData } from '!/utils/product-share-url';

import { CountryWageModel } from './models/CountryWageModel';
import { Stores } from './Stores';

export class WagesStore {
  @ignore
  protected stores: Stores;

  @format(
    (fromStorage: CountryWageModel[]) => fromStorage.map((e) => new CountryWageModel(e)),
    (toStorage: CountryWageModel[]) => toStorage,
  )
  countriesWages: CountryWageModel[] = [];

  @ignore
  wageForm: CountryWageModel | null = null;

  constructor(stores: Stores) {
    this.stores = stores;

    this.resetWageForm();

    makeObservable(this, {
      countriesWages: observable,
      wageForm: observable,
      resetWageForm: action,
      addWageToList: action,
      prepareWageForm: action,
    });
  }

  resetWageForm(): void {
    this.wageForm = new CountryWageModel();
  }

  addWageToList(): void {
    if (!this.wageForm) {
      return;
    }

    const wage = new CountryWageModel({
      currencyId: this.wageForm.currencyId,
      value: this.wageForm.value,
    });

    const index = this.countriesWages.findIndex((e) => e.currencyId === wage.currencyId);
    if (index !== -1) {
      this.countriesWages.splice(index, 1, wage);
    } else {
      this.countriesWages.push(wage);
    }

    this.resetWageForm();
  }

  prepareWageForm(currencyInfo: CurrencyInfo): void {
    const wageFound = this.countriesWages.find((e) => e.currencyId === currencyInfo.id);

    this.wageForm = new CountryWageModel({
      currencyId: currencyInfo.id,
      value: wageFound?.value || currencyInfo.hourlyWage,
    });
  }

  findWage(currencyId?: CountryWageModel['currencyId']): Unarray<WagesStore['countriesWages']> | undefined {
    return this.countriesWages.find((e) => (currencyId ? e.currencyId === currencyId : false));
  }

  importWages(wages: ProductShareData['wages']): void {
    wages.map((wageData) => {
      const wage = new CountryWageModel({
        currencyId: wageData.currencyId,
        value: wageData.value,
      });

      const index = this.countriesWages.findIndex((e) => e.currencyId === wage.currencyId);
      if (index !== -1) {
        this.countriesWages.splice(index, 1, wage);
      } else {
        this.countriesWages.push(wage);
      }
    });
  }
}
