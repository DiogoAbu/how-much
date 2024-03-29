import React, { useState } from 'react';
import { ListRenderItem, View } from 'react-native';

import { Caption, Divider, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import CurrencyList from '!/components/CurrencyList';
import HeaderButton from '!/components/HeaderButton';
import { DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import { MainNavigationProp, MainRouteProp } from '!/types';
import { CurrencyInfo } from '!/utils/currency-list';
import findCurrency from '!/utils/find-currency';

import CurrencyItem from './CurrencyItem';

const Currencies = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'Currencies'>>();
  const { params } = useRoute<MainRouteProp<'Currencies'>>();
  const { generalStore, productsStore, wagesStore } = useStores();
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = useState<CurrencyInfo['id'][]>([]);

  const allowMultiple = params.action === 'productForm';

  const handleDone = usePress(() => {
    if (!selectedIds.length) {
      return;
    }

    const hasPreviousCurrency = !!generalStore.activeCurrencyId;

    if (params.action === 'productForm') {
      selectedIds.map((id) => {
        productsStore.productForm?.addPrice(new PriceModel({ currencyId: id, value: 0.0 }));
      });
    }
    if (params.action === 'activeCurrency') {
      generalStore.setActiveCurrencyId(selectedIds[0]);
    }

    requestAnimationFrame(() => {
      if (hasPreviousCurrency) {
        navigation.pop();
      } else {
        navigation.reset({ routes: [{ name: 'Home' }] });
      }
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: params.action === 'productForm' ? t('title.pickACurrency') : t('title.preferredCurrency'),
      headerRight: () => (
        <HeaderButton disabled={!selectedIds} icon='check' mode='text' onPress={handleDone}>
          {t('label.done')}
        </HeaderButton>
      ),
    });

    // Cannot have a blur function
  }, [generalStore, handleDone, navigation, params.action, selectedIds, t]);

  const renderCurrency: ListRenderItem<CurrencyInfo> = ({ item }) => {
    return (
      <CurrencyItem
        allowMultiple={allowMultiple}
        currencyInfo={item}
        isSelected={selectedIds.includes(item.id)}
        setSelectedIds={setSelectedIds}
        wage={wagesStore.findWage(item.id)}
      />
    );
  };

  const ListHeader = generalStore.activeCurrencyId ? (
    <View>
      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('activeCurrency')}
      </Caption>

      <CurrencyItem
        allowMultiple={allowMultiple}
        currencyInfo={findCurrency(generalStore.activeCurrencyId)!}
        isActive
        isSelected={selectedIds.includes(generalStore.activeCurrencyId)}
        setSelectedIds={setSelectedIds}
        wage={wagesStore.findWage(generalStore.activeCurrencyId)}
      />
      <Divider />

      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('availableCurrencies')}
      </Caption>
    </View>
  ) : (
    <View>
      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('noActiveCurrency')}
      </Caption>
      <Text style={{ paddingHorizontal: DEFAULT_PADDING * 2 }}>{t('pickPreferredCurrencyBelow')}</Text>

      <Divider style={{ marginTop: DEFAULT_PADDING }} />

      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {t('availableCurrencies')}
      </Caption>
    </View>
  );

  return <CurrencyList ListHeaderComponent={ListHeader} renderItem={renderCurrency} />;
});

export default Currencies;
