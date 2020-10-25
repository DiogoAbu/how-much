import React, { Fragment } from 'react';
import {
  Alert,
  Animated,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';

import { Divider, Text } from 'react-native-paper';
import { useCollapsibleStack } from 'react-navigation-collapsible';
import { useNavigation } from '@react-navigation/native';
import { Observer, observer } from 'mobx-react-lite';

import SlideIn from '!/components/SlideIn';
import { LIST_ITEM_HEIGHT } from '!/constants';
import useAutorunOnFocus from '!/hooks/use-autorun-on-focus';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { ProductModel } from '!/stores/models/ProductModel';
import { MainNavigationProp } from '!/types';

import EmptyCenteredView from '../../components/EmptyCenteredView';

import HeaderRight from './HeaderRight';
import ListOptions from './ListOptions';
import ProductItem from './ProductItem';
import SkeletonItem, { amountToCoverHeight } from './SkeletonItem';
import styles from './styles';

const AMOUNT_ANIMATE = 10;
const NEAR_BOTTOM_OFFSET = 20;

const Home = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  const stores = useStores();
  const { colors, dark, fonts } = useTheme();
  const { t } = useTranslation();

  const { onScrollWithListener, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleStack();
  const onScroll = onScrollWithListener(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

    const targetOffset = contentSize.height - layoutMeasurement.height - NEAR_BOTTOM_OFFSET;
    const isNearBottom = targetOffset > 0 && contentOffset.y >= targetOffset;

    stores.generalStore.setFab({ fabVisible: !isNearBottom });
  });

  const handleFabPress = usePress(() => {
    if (!stores.generalStore.activeCurrencyId) {
      navigation.reset({ routes: [{ name: 'Currencies', params: { action: 'activeCurrency' } }] });
      return;
    }

    if (stores.productsStore.isDraft()) {
      Alert.alert(
        t('draftFound'),
        t('doYouWantToDiscardThisDraftOrEditIt'),
        [
          { text: t('label.return'), style: 'cancel' },
          {
            text: t('label.discard'),
            style: 'destructive',
            onPress: () => {
              stores.productsStore.resetProductForm();
              requestAnimationFrame(() => {
                navigation.navigate('ProductForm');
              });
            },
          },
          {
            text: t('label.edit'),
            onPress: () => {
              requestAnimationFrame(() => {
                navigation.navigate('ProductForm');
              });
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      stores.productsStore.resetProductForm();
      requestAnimationFrame(() => {
        navigation.navigate('ProductForm');
      });
    }
  });

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

  useAutorunOnFocus(
    () => {
      if (!stores.hydrated) {
        return;
      }
      if (!stores.generalStore.activeCurrencyId) {
        navigation.reset({ routes: [{ name: 'Currencies', params: { action: 'activeCurrency' } }] });
        return;
      }
      stores.generalStore.setFab({ fabVisible: true });
    },
    [stores],
    { name: 'Home FAB visibility' },
  );

  useFocusEffect(() => {
    stores.generalStore.setFab({ fabIcon: 'plus', handleFabPress });

    navigation.setOptions({
      title: Platform.OS === 'ios' ? '' : t('howMuch'),
      headerLeft: () =>
        Platform.OS === 'ios' ? (
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={[
              fonts.regular,
              styles.headerLeftTitle,
              { color: dark ? colors.text : colors.textOnPrimary },
            ]}
          >
            {t('howMuch')}
          </Text>
        ) : undefined,
      headerRight: () => <HeaderRight navigation={navigation} />,
    });
  }, [
    colors.text,
    colors.textOnPrimary,
    dark,
    fonts.medium,
    fonts.regular,
    handleFabPress,
    navigation,
    stores.generalStore,
    t,
  ]);

  const placeholderAmount = amountToCoverHeight(containerPaddingTop);

  return (
    <Animated.FlatList
      contentContainerStyle={[styles.content, { paddingTop: containerPaddingTop }]}
      data={stores.hydrated ? stores.productsStore.productsSorted : Array<ProductModel>(placeholderAmount)}
      getItemLayout={getItemLayout}
      initialNumToRender={placeholderAmount}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptyCenteredView text={t('nothingHereYet')} />}
      ListHeaderComponent={ListOptions}
      onScroll={onScroll as any}
      renderItem={renderProduct}
      scrollEnabled={stores.hydrated}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const keyExtractor = (item: ProductModel, index: number) => `product-${item?.id}-${index}`;

const getItemLayout = (_: any, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default Home;
