import uuid from 'react-native-uuid';
import { makeAutoObservable } from 'mobx';
import { date, format } from 'mobx-sync';

import { Unarray } from '!/types';

import { PriceModel } from './PriceModel';

export class ProductModel {
  id = uuid.v4() as string;

  description = '';

  @format(
    (fromStorage: PriceModel[]) => fromStorage.map((e) => new PriceModel(e)),
    (toStorage: PriceModel[]) => toStorage,
  )
  prices: PriceModel[] = [];

  @date
  updatedAt = new Date();

  @date
  createdAt = new Date();

  constructor(
    data?: Partial<Pick<ProductModel, 'id' | 'description' | 'prices' | 'updatedAt' | 'createdAt'>>,
  ) {
    this.id = data?.id ?? this.id;
    this.description = data?.description ?? this.description;
    this.prices = data?.prices ?? this.prices;
    this.updatedAt = data?.updatedAt ?? this.updatedAt;
    this.createdAt = data?.createdAt ?? this.createdAt;

    makeAutoObservable(this, {
      id: false,
    });
  }

  setId(id: ProductModel['id']): void {
    this.id = id;
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

  deletePriceById(priceId: Unarray<ProductModel['prices']>['id']): void {
    const index = this.prices.findIndex((e) => e.id === priceId);
    this.prices.splice(index, 1);
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
