import { ViewStyle } from 'react-native';

import { action, makeObservable, observable } from 'mobx';
import { ignore } from 'mobx-sync';

import { CurrencyInfo } from '!/utils/currency-list';

import { Stores } from './Stores';

export class GeneralStore {
  @ignore
  protected stores: Stores;

  @ignore
  fabIcon?: string = '';

  @ignore
  fabVisible?: boolean = false;

  @ignore
  fabStyle?: ViewStyle = {};

  @ignore
  handleFabPress?: () => void = () => null;

  language?: string = '';

  activeCurrencyId?: CurrencyInfo['id'] = '';

  constructor(stores: Stores) {
    this.stores = stores;

    makeObservable(this, {
      fabIcon: observable,
      fabStyle: observable,
      fabVisible: observable,
      handleFabPress: observable,
      language: observable,
      activeCurrencyId: observable,
      setFab: action,
      setLanguage: action,
      setActiveCurrencyId: action,
    });
  }

  setFab({
    fabIcon,
    fabVisible,
    fabStyle,
    handleFabPress,
  }: Pick<GeneralStore, 'fabIcon' | 'fabVisible' | 'fabStyle' | 'handleFabPress'>): void {
    this.fabIcon = fabIcon ?? this.fabIcon;
    this.fabVisible = fabVisible ?? this.fabVisible;
    this.fabStyle = fabStyle ?? this.fabStyle;
    this.handleFabPress = handleFabPress ?? this.handleFabPress;
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  setActiveCurrencyId(activeCurrencyId: CurrencyInfo['id']): void {
    this.activeCurrencyId = activeCurrencyId;
  }
}
