import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';

import { List, Text } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import { ProductModel } from '!/stores/models/ProductModel';
import { ListItemRightProps } from '!/types';

const ProductItem = observer<ListRenderItemInfo<ProductModel>>(({ item }) => {
  const onPress = usePress(() => {
    requestAnimationFrame(() => {
      //
    });
  });

  const renderRight = ({ color, style }: ListItemRightProps) => (
    <Text style={[style, { color }, styles.hourNumber]}>
      {0}
      <Text style={[{ color }, styles.hourText]}>h</Text>
    </Text>
  );

  return (
    <List.Item
      description={item.prices.find((e) => e.countryCode === 'BR')?.value}
      onPress={onPress}
      right={renderRight}
      title={item.description}
    />
  );
});

const styles = StyleSheet.create({
  hourNumber: {
    fontSize: 22,
    marginRight: 4,
    alignSelf: 'center',
  },
  hourText: {
    fontSize: 14,
  },
});

export default ProductItem;
