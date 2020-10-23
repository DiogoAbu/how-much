import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { overlay } from 'react-native-paper';
import Constants from 'expo-constants';

import useTheme from '!/hooks/use-theme';

const StatusBarBackgroundIos: FC = () => {
  const { colors, dark, mode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            dark && mode === 'adaptive' ? (overlay(4, colors.surface) as string) : colors.primary,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: Constants.statusBarHeight,
  },
});

export default StatusBarBackgroundIos;
