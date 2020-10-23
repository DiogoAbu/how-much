import React, { FC, memo } from 'react';

import { List } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { DEFAULT_ICON_SIZE } from '!/constants';
import usePress from '!/hooks/use-press';
import localize from '!/services/localize';
import { useStores } from '!/stores';
import { ListItemRightProps, MainNavigationProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';

import styles from './styles';

interface Props {
  currencyInfo: CurrencyInfo;
}

const CountryWageItem: FC<Props> = observer(({ currencyInfo }) => {
  const navigation = useNavigation<MainNavigationProp<'CountriesWages'>>();
  const { wagesStore } = useStores();

  const wage = wagesStore.findWage(currencyInfo.id);

  const { currency, countryName: name } = currencyInfo;

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
      description={`${currency} • ${name}`}
      onPress={handleOnPress}
      right={renderRight}
      title={
        wage || currencyInfo.hourlyWage
          ? `${localize.toCurrency(wage?.value || currencyInfo.hourlyWage)}/${localize.t('hr')}`
          : localize.t('unknown')
      }
      titleStyle={!wage && !currencyInfo.hourlyWage && styles.itemTitleEmpty}
    />
  );
});

export default memo(CountryWageItem);
