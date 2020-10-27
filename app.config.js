import 'dotenv/config';

import semverMajor from 'semver/functions/major';
import semverMinor from 'semver/functions/minor';
import semverPatch from 'semver/functions/patch';

import * as pkg from './package.json';

const major = semverMajor(pkg.version);
const minor = semverMinor(pkg.version);
const patch = semverPatch(pkg.version);

const versionCode = major * 10000 + minor * 100 + patch;

export default {
  name: 'How Much',
  slug: 'HowMuch',
  version: pkg.version,
  scheme: 'how-much',
  owner: 'diogoabu',
  privacy: 'public',
  icon: './assets/multitask.png',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#304FFF',
  primaryColor: '#304FFF',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#304FFF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: '#304FFF',
    translucent: true,
  },
  notification: {
    icon: './assets/notification.png',
    color: '#000000',
  },
  android: {
    package: 'com.diogoabu.howmuch',
    versionCode,
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/foreground.png',
      backgroundColor: '#304FFF',
    },
    config: {
      googleMobileAdsAppId: process.env.GOOGLE_MOBILE_ADS_APP_ID_ANDROID,
    },
    permissions: ['READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
  },
  ios: {
    bundleIdentifier: 'com.diogoabu.howmuch',
    buildNumber: pkg.version,
    icon: './assets/icon-ios.png',
    supportsTablet: true,
    config: {
      googleMobileAdsAppId: process.env.GOOGLE_MOBILE_ADS_APP_ID_IOS,
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSPhotoLibraryUsageDescription: 'This app saves chart images to your photo library',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  locales: {
    pt: './assets/languages/pt.json',
  },
};
