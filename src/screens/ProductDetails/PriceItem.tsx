import React from 'react';
import { Alert, ListRenderItemInfo } from 'react-native';

import { IconButton, List, Text } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import useMethod from '!/hooks/use-method';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { ListItemRightProps } from '!/types';
import calculateWorkingHours from '!/utils/calculate-working-hours';
import findCurrency from '!/utils/find-currency';
import { ProductShareData } from '!/utils/product-share-url';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';

import styles from './styles';

interface Props {
  hideHours?: boolean;
  alertIfWageExists?: boolean;
  wages?: ProductShareData['wages'];
  setHasWageOverwrite?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceItem = observer<ListRenderItemInfo<PriceModel> & Props>(
  ({ item: price, hideHours, alertIfWageExists, wages }) => {
    const { wagesStore } = useStores();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const currencyInfo = findCurrency(price.currencyId);
    const wage = wagesStore.findWage(price.currencyId);
    const customWage = wages?.find((e) => e.currencyId === price.currencyId);

    const handleAlertWage = useMethod(() => {
      Alert.alert(
        t('countryWageOverwrite'),
        `${t('thisCountryWageIsDifferentFromTheOneYouHave')}\n${t(
          'youCanChooseToImportWithoutCountryWages',
        )}`,
        [{ text: t('label.ok') }],
      );
    });

    const renderRight = alertIfWageExists
      ? ({ style }: ListItemRightProps) =>
          customWage?.value && customWage.value !== (wage?.value ?? -1) ? (
            <IconButton
              color={colors.primary}
              icon='alert'
              onPress={handleAlertWage}
              style={[style, styles.hourNumber]}
            />
          ) : null
      : !hideHours
      ? ({ color, style }: ListItemRightProps) =>
          price.value && currencyInfo && (customWage?.value || wage?.value || currencyInfo.hourlyWage) ? (
            <Text style={[style, { color }, styles.hourNumber]}>
              {calculateWorkingHours({ price, currencyInfo, wageValue: customWage?.value || wage?.value })}
              <Text style={[{ color }, styles.hourText]}>{t('hr')}</Text>
            </Text>
          ) : (
            <Text style={[style, { color }, styles.hourNumber]}>---</Text>
          )
      : undefined;

    return (
      <List.Item
        description={`${t(`countryName.${stripCountryName(currencyInfo!.countryName)}`, {
          defaultValue: currencyInfo!.countryName,
        })} • ${
          customWage?.value || wage?.value || currencyInfo?.hourlyWage
            ? `${toCurrency(
                customWage?.value || wage?.value || currencyInfo?.hourlyWage || 0,
                currencyInfo?.currency,
              )}/${t('hr')}`
            : t('unknown')
        }`}
        right={renderRight}
        title={`${currencyInfo?.currency ?? ''} ${
          price.value ? toCurrency(price.value, currencyInfo?.currency) : t('noValidPrice')
        }`}
      />
    );
  },
);

export default PriceItem;
