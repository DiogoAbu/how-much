import React, { FC } from 'react';
import { Text } from 'react-native';

import { Appbar, Button } from 'react-native-paper';
import { Observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';
import findCurrency from '!/utils/find-currency';
import toCurrency from '!/utils/to-currency';

import styles from '../CountriesWages/styles';

interface Props {
  navigation: MainNavigationProp<'Home'>;
}

const HeaderRight: FC<Props> = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const { generalStore, wagesStore } = useStores();
  const { t } = useTranslation();

  const handleActiveCurrencyPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Currencies', { action: 'activeCurrency' });
    });
  });

  const handlePreferencesPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Preferences');
    });
  });

  return (
    <>
      <Observer>
        {() => {
          const currencyInfo = findCurrency(generalStore.activeCurrencyId);
          if (!currencyInfo) {
            return null;
          }
          const wage = wagesStore.findWage(currencyInfo.id);

          return (
            <Button
              color={colors.textOnPrimary}
              compact
              icon='chevron-down'
              mode='text'
              onPress={handleActiveCurrencyPress}
            >
              {currencyInfo.currency}
              {' • '}
              {wage?.value || currencyInfo.hourlyWage
                ? toCurrency(wage?.value || currencyInfo.hourlyWage, currencyInfo.currency)
                : '---'}
              <Text style={styles.hourlyWageUnit}>/{t('hr')}</Text>
            </Button>
          );
        }}
      </Observer>

      <Appbar.Action
        color={dark ? colors.text : colors.textOnPrimary}
        icon='tune'
        onPress={handlePreferencesPress}
      />
    </>
  );
};

export default HeaderRight;
