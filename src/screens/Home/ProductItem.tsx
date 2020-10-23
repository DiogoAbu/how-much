import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';

import { List, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import { CountryWageModel } from '!/stores/models/CountryWageModel';
import { ProductModel } from '!/stores/models/ProductModel';
import { ListItemRightProps, MainNavigationProp } from '!/types';
import calculateWorkingHours from '!/utils/calculate-working-hours';
import { CurrencyInfo } from '!/utils/currency-list';
import findCurrency from '!/utils/find-currency';
import { toMoneyMask } from '!/utils/money-mask';

interface Props {
  activeCurrencyId?: CurrencyInfo['id'];
  wage?: CountryWageModel;
}

const ProductItem = observer<ListRenderItemInfo<ProductModel> & Props>(
  ({ item: product, activeCurrencyId, wage }) => {
    const navigation = useNavigation<MainNavigationProp<'Home'>>();

    const activePrice = product.prices.find((e) => e.currencyId === activeCurrencyId);
    const currencyInfo = findCurrency(activeCurrencyId);

    const onPress = usePress(() => {
      requestAnimationFrame(() => {
        navigation.navigate('ProductDetails', { productId: product.id });
      });
    });

    const renderRight = ({ color, style }: ListItemRightProps) =>
      activePrice?.value && currencyInfo && (wage?.value || currencyInfo.hourlyWage) ? (
        <Text style={[style, { color }, styles.hourNumber]}>
          {calculateWorkingHours({ price: activePrice, currencyInfo, wage })}
          <Text style={[{ color }, styles.hourText]}>{t('hr')}</Text>
        </Text>
      ) : (
        <Text style={[style, { color }, styles.hourNumber]}>---</Text>
      );

    return (
      <List.Item
        description={activePrice ? toMoneyMask(activePrice?.value) : t('noPriceForPreferredCurrency')}
        onPress={onPress}
        right={renderRight}
        title={product.description}
      />
    );
  },
);

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
