import React, { useState } from 'react';
import { FlatList, InteractionManager, ListRenderItem, View } from 'react-native';

import { Button, Caption, Divider, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { LIST_ITEM_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp } from '!/types';

import AdBanner from './AdBanner';
import HeaderRight from './HeaderRight';
import PriceItem from './PriceItem';
import PricesChart from './PricesChart';
import styles from './styles';

const PREVIEW_AMOUNT = 5;

const ProductDetails = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductDetails'>>();
  const route = useRoute<MainRouteProp<'ProductDetails'>>();
  const { productsStore, generalStore } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

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
      requestAnimationFrame(() => {
        setShouldRender(false);
      });
    };
  }, [generalStore, navigation, product.description, route]);

  const ProductData = (
    <>
      <AdBanner />

      <PricesChart product={product} setSnackBarText={setSnackBarText} shouldRender={shouldRender} />
    </>
  );

  const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => (
    <PriceItem index={index} item={item} separators={separators} />
  );

  return (
    <>
      <FlatList
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        data={product.prices.slice(0, PREVIEW_AMOUNT)}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={Divider}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        keyExtractor={keyExtractor}
        ListFooterComponent={ProductData}
        ListHeaderComponent={
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Caption style={styles.listCaption}>
                {t('prices')} • Showing {PREVIEW_AMOUNT} out of {product.prices.length}
              </Caption>
              <Button compact labelStyle={{ fontSize: 12 }}>
                See all
              </Button>
            </View>
            <Divider />
          </>
        }
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

const getItemLayout = (_: PriceModel[] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default ProductDetails;
