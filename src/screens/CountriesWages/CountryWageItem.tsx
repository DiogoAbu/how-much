import React, { FC, memo } from 'react';

import { List } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { DEFAULT_ICON_SIZE } from '!/constants';
import usePress from '!/hooks/use-press';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { ListItemRightProps, MainNavigationProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';

import styles from './styles';

interface Props {
  currencyInfo: CurrencyInfo;
}

const CountryWageItem: FC<Props> = observer(({ currencyInfo }) => {
  const navigation = useNavigation<MainNavigationProp<'CountriesWages'>>();
  const { wagesStore } = useStores();
  const { t } = useTranslation();

  const wage = wagesStore.findWage(currencyInfo.id);

  const { currency, countryName } = currencyInfo;

  const handleOnPress = usePress(() => {
    wagesStore.prepareWageForm(currencyInfo);

    requestAnimationFrame(() => {
      navigation.navigate('CountryWageForm', { currencyId: currencyInfo.id });
    });
  });

  const renderRight = (props: ListItemRightProps) => (
    <Icon {...props} name='pencil' size={DEFAULT_ICON_SIZE} style={[props.style, styles.itemRight]} />
  );

  return (
    <List.Item
      description={`${currency} • ${t(`countryName.${stripCountryName(countryName)}`, {
        defaultValue: countryName,
      })}`}
      onPress={handleOnPress}
      right={renderRight}
      title={
        wage || currencyInfo.hourlyWage
          ? `${toCurrency(wage?.value || currencyInfo.hourlyWage, currency)}/${t('hr')}`
          : t('unknown')
      }
      titleStyle={!wage && !currencyInfo.hourlyWage && styles.itemTitleEmpty}
    />
  );
});

export default memo(CountryWageItem);
