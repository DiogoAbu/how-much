import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import Constants from 'expo-constants';

import useTheme from '!/hooks/use-theme';
import getStatusBarColor from '!/utils/get-status-bar-color';

const StatusBarBackgroundIos: FC = () => {
  const { colors, dark, mode } = useTheme();

  return <View style={[styles.container, { backgroundColor: getStatusBarColor({ dark, mode, colors }) }]} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Constants.statusBarHeight,
  },
});

export default StatusBarBackgroundIos;
