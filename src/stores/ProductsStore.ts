import { makeAutoObservable } from 'mobx';
import { format, ignore } from 'mobx-sync';
// @ts-ignore
import sortArray from 'sort-array';

import { ProductSortBy, ProductSortByOrder } from '!/types';
import { ProductShareData } from '!/utils/product-share-url';

import { PriceModel } from './models/PriceModel';
import { ProductModel } from './models/ProductModel';
import { Stores } from './Stores';

export class ProductsStore {
  @ignore
  protected stores: Stores;

  @format(
    (fromStorage: ProductModel[]) => fromStorage.map((e) => new ProductModel(e)),
    (toStorage: ProductModel[]) => toStorage,
  )
  products: ProductModel[] = [];

  sortBy: ProductSortBy = 'alphabetically';

  sortByOrder: ProductSortByOrder = 'asc';

  @ignore
  productForm: ProductModel | null = null;

  constructor(stores: Stores) {
    this.stores = stores;

    this.resetProductForm();

    makeAutoObservable<this, 'stores'>(this, {
      stores: false,
    });
  }

  get productsSorted(): ProductModel[] {
    let by = ['description', 'updatedAt'];
    let order = [this.sortByOrder, 'desc'];
    let computed: Record<string, (item: ProductModel) => any> = {};

    if (this.sortBy === 'date') {
      by = ['updatedAt', 'description'];
      order = [this.sortByOrder, 'asc'];
    }
    if (this.sortBy === 'price') {
      by = ['price', 'updatedAt', 'description'];
      order = [this.sortByOrder, 'desc', 'asc'];
      computed = {
        price: (item) => {
          const activePrice = item.prices.find(
            (e) => e.currencyId === this.stores.generalStore.activeCurrencyId,
          );
          return activePrice?.value ?? 0;
        },
      };
    }

    return sortArray(this.products.slice(), {
      by,
      order,
      computed,
    });
  }

  setSortBy(sortBy: ProductsStore['sortBy']): void {
    this.sortBy = sortBy;
  }

  setSortByOrder(sortByOrder: ProductsStore['sortByOrder']): void {
    this.sortByOrder = sortByOrder;
  }

  toggleSortByOrder(): void {
    this.sortByOrder = this.sortByOrder === 'asc' ? 'desc' : 'asc';
  }

  copyProductForm(productId: ProductModel['id'], copyId = true): void {
    const product = this.findProductById(productId);
    if (!product) {
      return;
    }

    this.productForm = new ProductModel({
      id: copyId ? product.id : undefined,
      description: product.description,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
      prices: product.prices.map((each) => {
        return new PriceModel({
          id: each.id,
          currencyId: each.currencyId,
          value: each.value,
        });
      }),
    });
  }

  resetProductForm(): void {
    if (!this.stores.generalStore.activeCurrencyId) {
      return;
    }

    this.productForm = new ProductModel({
      description: '',
      prices: [
        new PriceModel({
          currencyId: this.stores.generalStore.activeCurrencyId,
          value: 0.0,
        }),
      ],
    });
  }

  addProductToList(): void {
    if (!this.productForm) {
      return;
    }

    const product = new ProductModel({
      id: this.productForm.id,
      description: this.productForm.description,
      prices: this.productForm.prices,
      createdAt: this.productForm.createdAt,
    });

    const found = this.findProductById(product.id);
    if (found) {
      found.setDescription(product.description);
      found.setPrices(product.prices);
      found.setUpdatedAt(product.updatedAt);
    } else {
      this.products.push(product);
    }

    this.resetProductForm();
  }

  deletePriceById(priceId: string): void {
    this.productForm?.deletePriceById(priceId);
  }

  findProductById(productId: string): ProductModel | undefined {
    return this.products.find((e) => e.id === productId);
  }

  deleteProductById(productId: string): void {
    this.products = this.products.filter((e) => e.id !== productId);
  }

  importProduct(productData: ProductShareData, importWages: boolean): void {
    if (importWages) {
      this.stores.wagesStore.importWages(productData.wages);
    }

    const product = new ProductModel({
      id: productData.id,
      description: productData.description,
      updatedAt: productData.updatedAt,
      createdAt: productData.createdAt,
      prices: productData.prices.map((each) => {
        return new PriceModel({
          id: each.id,
          currencyId: each.currencyId,
          value: each.value,
        });
      }),
    });

    const index = this.products.findIndex((e) => e.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1, product);
    } else {
      this.products.push(product);
    }
  }

  isDraft(): boolean {
    if (!this.productForm) {
      return false;
    }
    return (
      this.isDescriptionValid() || this.productForm.prices.length === 0 || this.productForm.prices.length > 1
    );
  }

  isDescriptionValid(): boolean {
    return !!this.productForm?.description;
  }

  isPricesValid(): 'needsAtLeastOnePrice' | true {
    if (this.productForm?.prices.length === 0) {
      return 'needsAtLeastOnePrice';
    }
    return true;
  }
}
