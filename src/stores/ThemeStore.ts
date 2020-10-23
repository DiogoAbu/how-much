import { Appearance } from 'react-native';

import { makeAutoObservable } from 'mobx';
import { ignore } from 'mobx-sync';

import { ColorSchemeCurrent, ColorSchemePreferred } from '!/types';

import { Stores } from './Stores';

export class ThemeStore {
  @ignore
  protected stores: Stores;

  colorSchemePreferred: ColorSchemePreferred = 'auto';

  colorSchemeCurrent: ColorSchemeCurrent = Appearance.getColorScheme() ?? 'dark';

  constructor(stores: Stores) {
    this.stores = stores;

    makeAutoObservable<this, 'stores'>(this, {
      stores: false,
    });
  }

  setColorSchemePreferred(colorScheme: ColorSchemePreferred): void {
    this.colorSchemePreferred = colorScheme;

    if (this.colorSchemePreferred !== 'auto') {
      this.colorSchemeCurrent = this.colorSchemePreferred;
    } else {
      this.colorSchemeCurrent = Appearance.getColorScheme() ?? 'dark';
    }
  }

  setColorSchemeCurrent(colorScheme?: ColorSchemeCurrent | null): void {
    if (this.colorSchemePreferred === 'auto' && colorScheme) {
      this.colorSchemeCurrent = colorScheme;
    }
  }
}
