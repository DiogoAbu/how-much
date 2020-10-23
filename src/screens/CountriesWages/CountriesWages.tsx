import React, { FC } from 'react';
import { ListRenderItem, View } from 'react-native';

import { Caption, Divider } from 'react-native-paper';
import { useCollapsibleStack } from 'react-navigation-collapsible';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import CurrencyList from '!/components/CurrencyList';
import { DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import findCurrency from '!/utils/find-currency';

import CountryWageItem from './CountryWageItem';

const CountriesWages: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'CountriesWages'>>();
  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleStack();

  const { generalStore } = useStores();

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('countriesWages'),
    });

    // Cannot have a blur function
  }, [generalStore, navigation]);

  const renderCountryWage: ListRenderItem<CurrencyInfo> = ({ item }) => {
    return <CountryWageItem currencyInfo={item} />;
  };

  const ListHeader = (
    <View>
      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('activeCurrency')}
      </Caption>

      <CountryWageItem currencyInfo={findCurrency(generalStore.activeCurrencyId)!} />
      <Divider />

      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('availableCurrencies')}
      </Caption>
    </View>
  );

  return (
    <CurrencyList
      contentContainerStyle={{ paddingTop: containerPaddingTop + DEFAULT_PADDING }}
      isAnimated
      ListHeaderComponent={ListHeader}
      onScroll={onScroll as any}
      renderItem={renderCountryWage}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
    />
  );
};

export default CountriesWages;
