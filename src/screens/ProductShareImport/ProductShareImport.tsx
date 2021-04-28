import React, { FC, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Button, Caption, Divider, List, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING, LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp, Unarray } from '!/types';
import { ProductShareData } from '!/utils/product-share-url';

import PriceItem from '../ProductDetails/PriceItem';

import styles from './styles';

const ProductShareImport: FC = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductShareImport'>>();
  const route = useRoute<MainRouteProp<'ProductShareImport'>>();
  const { productsStore, generalStore } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const {
    params: { productData },
  } = route;

  const [hasWageOverwrite, setHasWageOverwrite] = useState(false);

  const handleImportAll = usePress(() => {
    productsStore.importProduct(productData, true);
    requestAnimationFrame(() => {
      navigation.popToTop();
    });
  });

  const handleImportWithoutWages = usePress(() => {
    productsStore.importProduct(productData, false);
    requestAnimationFrame(() => {
      navigation.popToTop();
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.importProduct'),
    });
  }, [generalStore, navigation, t]);

  const ListHeader = (
    <>
      <Text style={styles.shareInfo}>
        {t('theInformationBellowWillBeImportedIntoTheApp')}
        {!!productsStore.findProductById(productData.id) &&
          '\n\n' + t('thisProductAlreadyExistsImportItAgainToOverwriteIt')}
      </Text>

      <Divider />

      <Caption style={{ marginLeft: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('description')}
      </Caption>
      <List.Item title={productData.description} titleNumberOfLines={4} />

      <Divider />

      <Caption style={{ marginLeft: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('pricesWithCustomWages')}
      </Caption>
    </>
  );

  const renderPrice: ListRenderItem<Unarray<ProductShareData['prices']>> = ({ item, index, separators }) => (
    <PriceItem
      alertIfWageExists
      hideHours
      index={index}
      item={new PriceModel(item)}
      separators={separators}
      setHasWageOverwrite={setHasWageOverwrite}
      wages={productData.wages}
    />
  );

  return (
    <FlatList
      contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      data={productData.prices}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListFooterComponent={
        <>
          <Divider />

          <Button mode='contained' onPress={handleImportAll} style={styles.button}>
            {t('label.importAll')}
          </Button>
          {hasWageOverwrite && (
            <Button mode='outlined' onPress={handleImportWithoutWages} style={styles.button}>
              {t('label.importWithoutWages')}
            </Button>
          )}
        </>
      }
      ListHeaderComponent={ListHeader}
      renderItem={renderPrice}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const keyExtractor = (item: Unarray<ProductShareData['prices']>) => `priceDetails${item.id}`;

const getItemLayout = (_: ProductShareData['prices'] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default ProductShareImport;
