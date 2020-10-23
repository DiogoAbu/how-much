import React, { FC } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { Divider } from 'react-native-paper';
import { AdMobBanner } from 'expo-ads-admob';

import { BANNER_AD_ID } from '!/constants';
import decideBannerSize from '!/utils/decide-banner-size';

import styles from './styles';

const handleDidFailToReceiveAdWithError = (errorDescription: string) => {
  console.log(errorDescription);
};

const AdBanner: FC = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Divider />

      <View style={styles.adContainer}>
        <AdMobBanner
          adUnitID={BANNER_AD_ID}
          bannerSize={decideBannerSize({ width })}
          onDidFailToReceiveAdWithError={handleDidFailToReceiveAdWithError}
          servePersonalizedAds={false}
        />
      </View>

      <Divider />
    </>
  );
};

export default AdBanner;
