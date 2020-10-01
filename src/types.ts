import { StyleProp, ViewStyle } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Unarray<T> = T extends Array<infer U> ? U : T;

// Main Stack Screens with Parameters
export type MainStackParams = {
  Home: undefined;
  ProductForm: undefined;
  ProductPrices: undefined;
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
