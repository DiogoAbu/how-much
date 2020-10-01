import React, { Fragment } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import { Button, Divider, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import SlideIn from '!/components/SlideIn';
import { DEFAULT_APPBAR_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp } from '!/types';

import PriceInput from './PriceInput';

const AMOUNT_ANIMATE = 10;

const keyExtractor = (item: PriceModel) => `priceInput${item.id}`;

const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => {
  const Component = index < AMOUNT_ANIMATE ? SlideIn : Fragment;
  return (
    <Component>
      <PriceInput index={index} item={item} separators={separators} />
    </Component>
  );
};

const ProductPrices = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductPrices'>>();
  const insets = useSafeAreaInsets();
  const { generalStore, productsStore } = useStores();
  const { colors } = useTheme();

  const handleDone = usePress(() => {
    productsStore.addProductToList();
    requestAnimationFrame(() => {
      navigation.popToTop();
    });
  });

  const handleAddPrice = usePress(() => {
    productsStore.productForm.addPrice(new PriceModel({ countryCode: 'AD', value: '0' }));
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: 'Add the price(s)',
      headerRight: () => (
        <Button mode='outlined' onPress={handleDone}>
          {t('done')}
        </Button>
      ),
    });
  }, [handleDone, navigation, generalStore]);

  const padding = 8;

  return (
    <FlatList
      contentContainerStyle={[
        styles.content,
        { padding, paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT + padding },
      ]}
      data={productsStore.productForm.prices.slice()}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListFooterComponent={
        <Button mode='contained' onPress={handleAddPrice} style={styles.buttonAdd}>
          {t('add.a.currency')}
        </Button>
      }
      renderItem={renderPrice}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  buttonAdd: {
    marginTop: 16,
  },
});

export default ProductPrices;
