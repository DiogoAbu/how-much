import { makeAutoObservable } from 'mobx';
import { ignore } from 'mobx-sync';

import { PriceModel } from './models/PriceModel';
import { ProductModel } from './models/ProductModel';
import { Stores } from './Stores';

export class ProductsStore {
  @ignore
  protected stores: Stores;

  products: ProductModel[] = [];

  @ignore
  productForm: ProductModel = new ProductModel({ description: '', prices: [] });

  constructor(stores: Stores) {
    this.stores = stores;

    makeAutoObservable<this, 'stores'>(this, {
      stores: false,
    });
  }

  addProductToList(): void {
    this.products.push(
      new ProductModel({
        description: this.productForm.description,
        prices: this.productForm.prices,
      }),
    );

    this.productForm = new ProductModel({ description: '', prices: [] });
  }

  populatePrices(): void {
    if (this.productForm.prices.length === 0) {
      this.productForm.addPrice(new PriceModel({ countryCode: 'BR', value: '0' }));
    }
  }

  get isDescriptionValid(): boolean {
    return !!this.productForm.description;
  }
}
