import React from 'react';
import { ListRenderItemInfo } from 'react-native';

import { List, Text } from 'react-native-paper';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { ListItemRightProps } from '!/types';
import calculateWorkingHours from '!/utils/calculate-working-hours';
import findCurrency from '!/utils/find-currency';
import { toMoneyMask } from '!/utils/money-mask';

import styles from './styles';

const PriceItem = observer<ListRenderItemInfo<PriceModel>>(({ item: price }) => {
  const { wagesStore } = useStores();

  const currencyInfo = findCurrency(price.currencyId);
  const wage = wagesStore.findWage(price.currencyId);

  const renderRight = ({ color, style }: ListItemRightProps) =>
    price.value && currencyInfo && (wage?.value || currencyInfo.hourlyWage) ? (
      <Text style={[style, { color }, styles.hourNumber]}>
        {calculateWorkingHours({ price, currencyInfo, wage })}
        <Text style={[{ color }, styles.hourText]}>{t('hr')}</Text>
      </Text>
    ) : (
      <Text style={[style, { color }, styles.hourNumber]}>---</Text>
    );

  return (
    <List.Item
      description={`${currencyInfo?.countryName ?? ''} • ${
        wage?.value || currencyInfo?.hourlyWage
          ? `${toMoneyMask(wage?.value || currencyInfo?.hourlyWage || 0)}/${t('hr')}`
          : t('unknown')
      }`}
      right={renderRight}
      title={`${currencyInfo?.currency ?? ''} ${price.value ? toMoneyMask(price.value) : t('noValidPrice')}`}
    />
  );
});

export default PriceItem;
