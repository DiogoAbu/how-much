import { v4 } from 'react-native-uuid';
import { autorun, makeAutoObservable, toJS } from 'mobx';

import { Unarray } from '!/types';

import { PriceModel } from './PriceModel';

export class ProductModel {
  // @persist
  id = v4();

  // @persist
  description = '';

  // @persist('list', PriceModel)
  prices: PriceModel[] = [];

  constructor(data: Pick<ProductModel, 'description' | 'prices'>) {
    this.description = data.description;
    this.prices = data.prices;

    makeAutoObservable(this, {
      id: false,
    });

    autorun(() => {
      console.log(toJS(this));
    });
  }

  setDescription(description: ProductModel['description']): void {
    this.description = description;
  }

  setPrices(prices: ProductModel['prices']): void {
    this.prices = prices;
  }

  addPrice(price: Unarray<ProductModel['prices']>): void {
    this.prices.push(price);
  }
}
