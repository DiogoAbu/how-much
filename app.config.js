import 'dotenv/config';

import semverMajor from 'semver/functions/major';
import semverMinor from 'semver/functions/minor';
import semverPatch from 'semver/functions/patch';
import semverPrerelease from 'semver/functions/prerelease';

import * as pkg from './package.json';

const prereleaseOrder = ['alpha', 'beta', 'rc'];

const { version } = pkg;

const major = semverMajor(version);
const minor = semverMinor(version);
const patch = semverPatch(version);

// Android: 1.2.3 => 10203000
let versionCode = major * 10000000 + minor * 100000 + patch * 1000;

// iOS
let buildNumber = version;

try {
  const [preIdentifier, preNumber] = semverPrerelease(version);

  if (preIdentifier && preNumber) {
    // Android: 1.2.3-beta.1 => 10203021
    versionCode += (prereleaseOrder.indexOf(preIdentifier) + 1) * 10 + preNumber;

    // iOS: 1.2.3-beta.1 => 1.2.3b1
    buildNumber = `${major}.${minor}.${patch}${preIdentifier[0]}${preNumber}`;
  }
} catch {
  //
}

export default {
  name: 'Quanto Custa',
  version,
  description: `Find out how many hours you have to work to buy something. (${version})`,
  slug: 'how-much',
  scheme: 'how-much',
  owner: 'diogoabu',
  privacy: 'public',
  icon: './assets/multitask.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#304FFF',
  primaryColor: '#304FFF',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#304FFF',
  },
  updates: {
    enabled: true,
    checkAutomatically: 'ON_ERROR_RECOVERY',
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['assets/**/*'],
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: '#304FFF',
    translucent: false,
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
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'how-much',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  ios: {
    bundleIdentifier: 'com.diogoabu.howmuch',
    buildNumber,
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
