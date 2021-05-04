import React, { Fragment, useCallback } from 'react';
import { Animated, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { useCollapsibleScene } from 'react-native-collapsible-tab-view';
import { Divider } from 'react-native-paper';
import { Observer, observer } from 'mobx-react-lite';

import SlideIn from '!/components/SlideIn';
import { LIST_ITEM_HEIGHT } from '!/constants';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { ProductModel } from '!/stores/models/ProductModel';

import EmptyCenteredView from '../../components/EmptyCenteredView';

import ListOptions from './ListOptions';
import ProductItem from './ProductItem';
import SkeletonItem from './SkeletonItem';

const AMOUNT_INITIAL_RENDER = 10;
const AMOUNT_ANIMATE = 10;
const NEAR_BOTTOM_OFFSET = 20;

const ProductList = observer(() => {
  const stores = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const onScrollCheckFAB = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

      const targetOffset = contentSize.height - layoutMeasurement.height - NEAR_BOTTOM_OFFSET;
      const isNearBottom = targetOffset > 0 && contentOffset.y >= targetOffset;

      stores.generalStore.setFab({ fabVisible: !isNearBottom });
    },
    [stores.generalStore],
  );

  const scrollPropsAndRef = useCollapsibleScene('ProductList', onScrollCheckFAB);

  const renderProduct: ListRenderItem<ProductModel> = ({ item, index, separators }) => {
    const Component = index < AMOUNT_ANIMATE ? SlideIn : Fragment;
    return (
      <Observer>
        {() =>
          !item?.description ? (
            <SkeletonItem />
          ) : (
            <Component>
              <ProductItem
                activeCurrencyId={stores.generalStore.activeCurrencyId}
                index={index}
                item={item}
                separators={separators}
                wage={stores.wagesStore.findWage(stores.generalStore.activeCurrencyId)}
              />
            </Component>
          )
        }
      </Observer>
    );
  };

  return (
    <Animated.FlatList
      bounces={false}
      data={
        stores.hydrated ? stores.productsStore.productsSorted : Array<ProductModel>(AMOUNT_INITIAL_RENDER)
      }
      getItemLayout={getItemLayout}
      initialNumToRender={AMOUNT_INITIAL_RENDER}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptyCenteredView text={t('nothingHereYet')} />}
      ListHeaderComponent={ListOptions}
      renderItem={renderProduct}
      style={{ backgroundColor: colors.background }}
      {...scrollPropsAndRef}
    />
  );
});

const keyExtractor = (item: ProductModel, index: number) => `product-${item?.id}-${index}`;

const getItemLayout = (_: ProductModel[] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default ProductList;
