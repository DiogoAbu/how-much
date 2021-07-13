import React, { FC, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
// @ts-ignore
import sortArray from 'sort-array';

import { LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import useTheme from '!/hooks/use-theme';
import PriceItem from '!/screens/ProductDetails/PriceItem';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp } from '!/types';
import calculateWorkingHours from '!/utils/calculate-working-hours';
import findCurrency from '!/utils/find-currency';

const PriceList: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'PriceList'>>();
  const route = useRoute<MainRouteProp<'PriceList'>>();
  const { generalStore, productsStore, wagesStore } = useStores();
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  const { params } = route;
  const product = useMemo(() => productsStore.findProductById(params.productId)!, [
    params.productId,
    productsStore,
  ]);
  const prices = useMemo(() => {
    return sortArray(product.prices.slice(), {
      by: ['hours', 'value'],
      order: ['desc', 'desc'],
      computed: {
        hours: (price: PriceModel) => {
          const currencyInfo = findCurrency(price.currencyId);
          const wage = wagesStore.findWage(price.currencyId);
          if (!currencyInfo) {
            return 0;
          }
          const hours = calculateWorkingHours({
            price,
            currencyInfo,
            wageValue: wage?.value,
          });
          return parseFloat(hours);
        },
      },
    });
  }, [product.prices, wagesStore]);

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: product.description,
    });
  }, [generalStore, navigation, product.description, route]);

  const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => (
    <PriceItem index={index} item={item} separators={separators} />
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: headerHeight }}
      data={prices}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={2}
      overScrollMode='never'
      removeClippedSubviews
      renderItem={renderPrice}
      style={{ backgroundColor: colors.background }}
      updateCellsBatchingPeriod={100}
      windowSize={16}
    />
  );
};

const keyExtractor = (item: PriceModel) => `priceDetails${item.id}`;

const getItemLayout = (_: PriceModel[] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default PriceList;
