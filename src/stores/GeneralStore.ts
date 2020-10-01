import { ViewStyle } from 'react-native';

import { action, makeObservable, observable } from 'mobx';
import { ignore } from 'mobx-sync';

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

  constructor(stores: Stores) {
    this.stores = stores;

    // makeAutoObservable<this, 'stores'>(this, {
    //   stores: false,
    // });
    makeObservable(this, {
      fabIcon: observable,
      fabStyle: observable,
      fabVisible: observable,
      handleFabPress: observable,
      setFab: action,
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
}
