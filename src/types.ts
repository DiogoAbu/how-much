import { StyleProp, ViewStyle } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { countries } from 'countries-list';

import { ProductModel } from './stores/models/ProductModel';
import { CurrencyInfo } from './utils/currency-list';
import { ProductShareData } from './utils/product-share-url';

export type Unarray<T> = T extends Array<infer U> ? U : T;

export type ColorSchemePreferred = 'light' | 'dark' | 'auto';
export type ColorSchemeCurrent = 'light' | 'dark';

// Main Stack Screens with Parameters
export type MainStackParams = {
  Intro: undefined;
  Home: undefined;
  ProductForm?: {
    isEditing: boolean;
  };
  SearchPrice: {
    priceId: string;
  };
  ProductDetails: {
    productId: ProductModel['id'];
  };
  PriceList: {
    productId: ProductModel['id'];
  };
  ProductShare: {
    productId: ProductModel['id'];
  };
  ProductShareImport: {
    productData: ProductShareData;
  };

  Currencies: {
    action: 'productForm' | 'activeCurrency';
  };

  CountriesWages: undefined;
  CountryWageForm: {
    currencyId: CurrencyInfo['id'];
  };
  WageCalculator: {
    currencyId: CurrencyInfo['id'];
    isFromForm?: boolean;
  };

  Preferences: undefined;
};

// Navigation prop for Main Stack screens
export type MainNavigationProp<RouteName extends keyof MainStackParams> = StackNavigationProp<
  MainStackParams,
  RouteName
>;

// Route prop for Main Stack screens
export type MainRouteProp<RouteName extends keyof MainStackParams> = RouteProp<MainStackParams, RouteName>;

// react-native-paper List.Item right props
export interface ListItemRightProps {
  color: string;
  style?: StyleProp<ViewStyle>;
}

export type CountryCode = keyof typeof countries;

export type ProductSortBy = 'alphabetically' | 'date' | 'price';
export type ProductSortByOrder = 'asc' | 'desc';
