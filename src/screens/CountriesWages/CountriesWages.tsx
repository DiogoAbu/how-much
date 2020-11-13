import React, { FC } from 'react';
import { ListRenderItem, Platform, View } from 'react-native';

import { Caption, Divider } from 'react-native-paper';
import { setSafeBounceHeight, useCollapsibleHeader } from 'react-navigation-collapsible';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';

import CurrencyList from '!/components/CurrencyList';
import Header from '!/components/Header';
import { DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import findCurrency from '!/utils/find-currency';

import CountryWageItem from './CountryWageItem';

const CountriesWages: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'CountriesWages'>>();
  const { generalStore } = useStores();
  const { t } = useTranslation();

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleHeader({
    navigationOptions: { header: (props: StackHeaderProps) => <Header {...props} /> },
  });

  useFocusEffect(() => {
    if (Platform.OS === 'android') {
      setSafeBounceHeight(0);
    }

    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.countriesWages'),
    });

    // Cannot have a blur function
  }, [generalStore, navigation, t]);

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
