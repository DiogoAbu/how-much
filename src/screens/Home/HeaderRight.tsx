import React, { FC, useState } from 'react';
import { Text } from 'react-native';

import { Appbar, Button, Menu } from 'react-native-paper';
import { t } from 'i18n-js';
import { Observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';
import findCurrency from '!/utils/find-currency';
import { toMoneyMask } from '!/utils/money-mask';

import styles from '../CountriesWages/styles';

interface Props {
  navigation: MainNavigationProp<'Home'>;
}

const HeaderRight: FC<Props> = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const { generalStore, wagesStore } = useStores();

  // State for menu visiblity
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Handlers
  const handleHideMenu = usePress(() => {
    setIsMenuVisible(() => false);
  });

  const handleShowMenu = usePress(() => {
    setIsMenuVisible(() => true);
  });

  const handleActiveCurrencyPress = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Currencies', { action: 'activeCurrency' });
    });
  });

  const handlePreferencesPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      navigation.navigate('Preferences');
    });
  });

  const dotsIcon = (
    <Appbar.Action
      color={dark ? colors.text : colors.textOnPrimary}
      disabled={isMenuVisible}
      icon='dots-vertical'
      onPress={handleShowMenu}
    />
  );

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
                ? toMoneyMask(wage?.value || currencyInfo.hourlyWage)
                : '---'}
              <Text style={styles.hourlyWageUnit}>/{t('hr')}</Text>
            </Button>
          );
        }}
      </Observer>

      <Menu anchor={dotsIcon} onDismiss={handleHideMenu} visible={isMenuVisible}>
        <Menu.Item icon='tune' onPress={handlePreferencesPress} title={t('preferences')} />
      </Menu>
    </>
  );
};

export default HeaderRight;
