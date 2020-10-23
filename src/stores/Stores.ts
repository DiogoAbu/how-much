import AsyncStorage from '@react-native-community/async-storage';
import { action, configure, makeObservable, observable, runInAction } from 'mobx';
import { AsyncTrunk, ignore } from 'mobx-sync';

import { GeneralStore } from './GeneralStore';
import { ProductsStore } from './ProductsStore';
import { ThemeStore } from './ThemeStore';
import { WagesStore } from './WagesStore';

export class Stores {
  // Every store references
  generalStore: GeneralStore;
  productsStore: ProductsStore;
  wagesStore: WagesStore;
  themeStore: ThemeStore;

  @ignore
  hydrated = false;

  constructor() {
    makeObservable(this, {
      hydrated: observable,
      hydrateStores: action,
    });

    this.generalStore = new GeneralStore(this);
    this.productsStore = new ProductsStore(this);
    this.wagesStore = new WagesStore(this);
    this.themeStore = new ThemeStore(this);

    void this.hydrateStores();
  }

  hydrateStores = async (): Promise<void> => {
    // Pre-persist
    configure({
      enforceActions: 'never',
      computedRequiresReaction: false,
      reactionRequiresObservable: false,
      observableRequiresReaction: false,
    });

    await this.hydrateStore(['themeStore', this.themeStore]);
    await this.hydrateStore(['generalStore', this.generalStore]);
    await this.hydrateStore(['wagesStore', this.wagesStore]);
    await this.hydrateStore(['productsStore', this.productsStore]);

    runInAction(() => {
      this.hydrated = true;

      // Post-persist
      configure({
        enforceActions: 'observed',
        computedRequiresReaction: true,
        reactionRequiresObservable: true,
        observableRequiresReaction: true,
        disableErrorBoundaries: false,
      });
    });
  };

  protected hydrateStore = async (tuple: [string, any]): Promise<void> => {
    try {
      const trunk = new AsyncTrunk(tuple[1], {
        storage: AsyncStorage,
        storageKey: tuple[0],
        onError: (err) => console.log(tuple[0], err),
      });
      return await trunk.init();
    } catch (err) {
      console.log(tuple[0], err);
      return Promise.resolve();
    }
  };

  purge = async (storeName: string): Promise<void> => {
    await AsyncStorage.removeItem(storeName);
  };

  purgeAll = async (): Promise<void> => {
    await AsyncStorage.clear();
  };
}
