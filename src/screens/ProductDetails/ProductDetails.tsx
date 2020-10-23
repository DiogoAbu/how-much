import React, { useState } from 'react';
import { FlatList, InteractionManager, ListRenderItem } from 'react-native';

import { Caption, Divider, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import { DEFAULT_APPBAR_HEIGHT, LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp } from '!/types';

import AdBanner from './AdBanner';
import HeaderRight from './HeaderRight';
import PriceItem from './PriceItem';
import PricesChart from './PricesChart';
import styles from './styles';

const ProductDetails = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductDetails'>>();
  const route = useRoute<MainRouteProp<'ProductDetails'>>();
  const { productsStore, generalStore } = useStores();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const { params } = route;
  const product = productsStore.findProductById(params.productId)!;

  const [shouldRender, setShouldRender] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  const handleDismissSnackBar = usePress(() => {
    setSnackBarText('');
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: product.description,
      headerRight: () => <HeaderRight navigation={navigation} route={route} />,
    });

    void InteractionManager.runAfterInteractions(() => {
      setShouldRender(true);
    });

    return () => {
      setShouldRender(false);
    };
  }, [generalStore, navigation, product.description, route]);

  const ListHeader = (
    <>
      <PricesChart product={product} setSnackBarText={setSnackBarText} shouldRender={shouldRender} />

      <AdBanner shouldRender={shouldRender} />

      <Caption style={styles.listCaption}>{t('prices')}</Caption>
    </>
  );

  const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => (
    <PriceItem index={index} item={item} separators={separators} />
  );

  return (
    <>
      <FlatList
        contentContainerStyle={[styles.content, { paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT }]}
        data={product.prices}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={Divider}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        renderItem={renderPrice}
        style={{ backgroundColor: colors.background }}
      />

      <Snackbar onDismiss={handleDismissSnackBar} visible={!!snackBarText}>
        {snackBarText}
      </Snackbar>
    </>
  );
});

const keyExtractor = (item: PriceModel) => `priceDetails${item.id}`;

const getItemLayout = (_: any, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default ProductDetails;
