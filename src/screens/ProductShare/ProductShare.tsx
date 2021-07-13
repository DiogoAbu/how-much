import React, { FC } from 'react';
import { FlatList, ListRenderItem, Share } from 'react-native';

import { Button, Caption, Divider, List, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING, LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp } from '!/types';
import notEmpty from '!/utils/not-empty';
import { buildProductShareUrl } from '!/utils/product-share-url';

import PriceItem from '../ProductDetails/PriceItem';

import styles from './styles';

const ProductShare: FC = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductShare'>>();
  const route = useRoute<MainRouteProp<'ProductShare'>>();
  const { productsStore, generalStore, wagesStore } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const { params } = route;
  const product = productsStore.findProductById(params.productId)!;

  const shareUrl = buildProductShareUrl({
    ...toJS(product),
    wages: product.prices.map((price) => toJS(wagesStore.findWage(price.currencyId))).filter(notEmpty),
  });

  const handleSharePress = usePress(() => {
    requestAnimationFrame(() => {
      void Share.share({
        message: `${t('getProductWithAmountPrices', {
          description: product.description,
          amount: product.prices.length,
        })}\n${shareUrl}`,
      });
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.shareProduct'),
    });
  }, [generalStore, navigation, t]);

  const ListHeader = (
    <>
      <Text selectable style={styles.shareUrl}>
        {shareUrl}
      </Text>

      <Button icon='share' mode='contained' onPress={handleSharePress} style={styles.shareButton}>
        {t('label.share')}
      </Button>

      <Divider />

      <Text style={styles.shareInfo}>
        {t('theFollowingInformationWillBeAvailableToAnyoneThatImportsThisProductUsingTheAboveLink')}
      </Text>

      <Caption style={{ marginLeft: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('description')}
      </Caption>
      <List.Item title={product.description} titleNumberOfLines={4} />

      <Divider />

      <Caption style={{ marginLeft: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('pricesWithCustomWages')}
      </Caption>
    </>
  );

  const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => (
    <PriceItem hideHours index={index} item={item as PriceModel} separators={separators} />
  );

  return (
    <FlatList
      contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      data={product.prices}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeader}
      overScrollMode='never'
      renderItem={renderPrice}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const keyExtractor = (item: PriceModel) => `priceDetails${item.id}`;

const getItemLayout = (_: PriceModel[] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default ProductShare;
