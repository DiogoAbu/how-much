import React, { Fragment } from 'react';
import { Animated, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';

import { Divider, useTheme } from 'react-native-paper';
import { useCollapsibleStack } from 'react-navigation-collapsible';
import { useNavigation } from '@react-navigation/native';
import { Observer, observer } from 'mobx-react-lite';

import HeaderRight from '!/components/HeaderRight';
import SlideIn from '!/components/SlideIn';
import useAutorunOnFocus from '!/hooks/use-autorun-on-focus';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import { useStores } from '!/stores';
import { ProductModel } from '!/stores/models/ProductModel';
import { MainNavigationProp } from '!/types';

import EmptyView from './EmptyView';
import ProductItem from './ProductItem';
import SkeletonItem, { amountToCoverHeight } from './SkeletonItem';

const AMOUNT_ANIMATE = 10;
const NEAR_BOTTOM_OFFSET = 20;

const keyExtractor = (_: ProductModel, index: number) => `item${index}`;

const Home = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  const { colors } = useTheme();
  const stores = useStores();
  const { onScrollWithListener, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleStack();

  const onScroll = onScrollWithListener(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

    const targetOffset = contentSize.height - layoutMeasurement.height - NEAR_BOTTOM_OFFSET;
    const isNearBottom = contentOffset.y >= targetOffset;

    stores.generalStore.setFab({ fabVisible: !isNearBottom });
  });

  const handleFabPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('ProductForm');
    });
  });

  const renderProduct: ListRenderItem<ProductModel> = ({ item, index, separators }) => {
    const Component = index < AMOUNT_ANIMATE ? SlideIn : Fragment;
    return (
      <Observer>
        {() =>
          !item.description ? (
            <SkeletonItem />
          ) : (
            <Component>
              <ProductItem index={index} item={item} separators={separators} />
            </Component>
          )
        }
      </Observer>
    );
  };

  useAutorunOnFocus(
    () => {
      if (stores.hydrated) {
        stores.generalStore.setFab({ fabVisible: true });
      }
    },
    [stores],
    { name: 'Home FAB visibility' },
  );

  useFocusEffect(() => {
    stores.generalStore.setFab({ fabIcon: 'plus', handleFabPress });

    navigation.setOptions({
      title: 'How much?',
      headerRight: () => <HeaderRight navigation={navigation} />,
    });
  }, [handleFabPress, navigation, stores]);

  return (
    <Animated.FlatList
      contentContainerStyle={[styles.content, { paddingTop: containerPaddingTop }]}
      data={
        stores.hydrated
          ? stores.productsStore.products.slice()
          : Array<ProductModel>(amountToCoverHeight(containerPaddingTop))
              .fill(new ProductModel({ description: '', prices: [] }))
              .slice()
      }
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptyView />}
      onScroll={onScroll as any}
      renderItem={renderProduct}
      scrollEnabled={stores.hydrated}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

export default Home;
