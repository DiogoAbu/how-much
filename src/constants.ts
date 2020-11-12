import { Platform } from 'react-native';

import Constants from 'expo-constants';

export const DEFAULT_APPBAR_HEIGHT = 56;

export const DEFAULT_PADDING = 8;

export const DEFAULT_ICON_SIZE = 24;

export const LIST_ITEM_HEIGHT = 73;

export const BADGE_SMALL_SIZE = 10;

export const UNIVERSAL_LINK = 'https://diogoabu.github.io/how-much-docs/';

///////////
// Admob //
///////////
const BANNER_AD_TEST_ID = Platform.select({
  default: 'ca-app-pub-3940256099942544/6300978111',
  ios: 'ca-app-pub-3940256099942544/2934735716',
});

// const INTERSTITIAL_AD_TEST_ID = Platform.select({
//   default: 'ca-app-pub-3940256099942544/1033173712',
//   ios: 'ca-app-pub-3940256099942544/4411468910',
// });

// const INTERSTITIAL_VIDEO_AD_TEST_ID = Platform.select({
//   default: 'ca-app-pub-3940256099942544/8691691433',
//   ios: 'ca-app-pub-3940256099942544/5135589807',
// });

// const REWARDED_VIDEO_AD_TEST_ID = Platform.select({
//   default: 'ca-app-pub-3940256099942544/5224354917',
//   ios: 'ca-app-pub-3940256099942544/1712485313',
// });

// const NATIVE_ADVANCED_AD_TEST_ID = Platform.select({
//   default: 'ca-app-pub-3940256099942544/2247696110',
//   ios: 'ca-app-pub-3940256099942544/3986624511',
// });

// const NATIVE_ADVANCED_VIDEO_AD_TEST_ID = Platform.select({
//   default: 'ca-app-pub-3940256099942544/1044960115',
//   ios: 'ca-app-pub-3940256099942544/2521693316',
// });

export const BANNER_AD_ID =
  __DEV__ || !Constants.isDevice
    ? BANNER_AD_TEST_ID
    : Platform.select({
        default: 'ca-app-pub-3155361191669270/9406862404',
        ios: 'ca-app-pub-3155361191669270/5276045704',
      });
