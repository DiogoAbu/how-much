import React, { FC } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

import { overlay, useTheme } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content';

import { DEFAULT_APPBAR_HEIGHT } from '!/constants';

const BIGGEST_HEIGHT = 36;
const OUTER_MARGIN = 16;

export const amountToCoverHeight = (minusHeight = 0, minusItem = 0): number => {
  return Math.floor(
    (Dimensions.get('window').height - DEFAULT_APPBAR_HEIGHT - minusHeight) /
      (BIGGEST_HEIGHT + OUTER_MARGIN + StyleSheet.hairlineWidth - minusItem),
  );
};

const SkeletonItem: FC = () => {
  const { colors } = useTheme();

  return (
    <SkeletonContent
      animationDirection='horizontalRight'
      animationType='shiver'
      boneColor={overlay(4, colors.surface) as string}
      containerStyle={styles.container}
      highlightColor={colors.accent}
      isLoading
      layout={layout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: OUTER_MARGIN,
  },
});

export interface ICustomViewStyle extends ViewStyle {
  children?: ICustomViewStyle[];
  key?: number | string;
}

const layout: ICustomViewStyle[] = [
  {
    flex: 1,
    flexDirection: 'column',
    children: [
      { width: '50%', height: 16, marginBottom: 6 },
      { width: '20%', height: 12 },
    ],
  },
  {
    width: 36,
    height: BIGGEST_HEIGHT,
  },
];

export default SkeletonItem;
