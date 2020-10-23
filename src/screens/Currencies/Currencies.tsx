import React, { useState } from 'react';
import { ListRenderItem, Text, View } from 'react-native';

import { Button, Caption, Dialog, Divider, Paragraph, Portal } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import CurrencyList from '!/components/CurrencyList';
import HeaderButton from '!/components/HeaderButton';
import { DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import localize from '!/services/localize';
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

  const [selectedId, setSelectedId] = useState<CurrencyInfo['id'] | null>(null);
  const [dialogVisible, setDialogVisible] = useState(() => !generalStore.activeCurrencyId);

  const handleHideDialog = usePress(() => {
    requestAnimationFrame(() => {
      setDialogVisible(false);
    });
  });

  const handleDone = usePress(() => {
    if (!selectedId) {
      return;
    }

    const hasPreviousCurrency = !!generalStore.activeCurrencyId;

    if (params.action === 'productForm') {
      productsStore.productForm?.addPrice(new PriceModel({ currencyId: selectedId, value: 0.0 }));
    }
    if (params.action === 'activeCurrency') {
      generalStore.setActiveCurrencyId(selectedId);
    }

    requestAnimationFrame(() => {
      if (hasPreviousCurrency) {
        navigation.goBack();
      } else {
        navigation.reset({ routes: [{ name: 'Home' }] });
      }
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: localize.t(params.action === 'productForm' ? 'pickACurrency' : 'preferredCurrency'),
      headerRight: () => (
        <HeaderButton disabled={!selectedId} icon='check' mode='text' onPress={handleDone}>
          {localize.t('label.done')}
        </HeaderButton>
      ),
    });

    // Cannot have a blur function
  }, [generalStore, handleDone, navigation, params.action, selectedId]);

  const renderCurrency: ListRenderItem<CurrencyInfo> = ({ item }) => {
    return (
      <CurrencyItem
        currencyInfo={item}
        isSelected={selectedId === item.id}
        setSelectedId={setSelectedId}
        wage={wagesStore.findWage(item.id)}
      />
    );
  };

  const ListHeader = generalStore.activeCurrencyId ? (
    <View>
      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {localize.t('activeCurrency')}
      </Caption>

      <CurrencyItem
        currencyInfo={findCurrency(generalStore.activeCurrencyId)!}
        isActive
        isSelected={selectedId === generalStore.activeCurrencyId}
        setSelectedId={setSelectedId}
        wage={wagesStore.findWage(generalStore.activeCurrencyId)}
      />
      <Divider />

      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {localize.t('availableCurrencies')}
      </Caption>
    </View>
  ) : (
    <View>
      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {localize.t('noActiveCurrency')}
      </Caption>
      <Text style={{ paddingHorizontal: DEFAULT_PADDING }}>{localize.t('pickPreferredCurrencyBelow')}</Text>

      <Divider style={{ marginTop: DEFAULT_PADDING }} />

      <Caption style={{ paddingHorizontal: DEFAULT_PADDING, marginTop: DEFAULT_PADDING }}>
        {localize.t('availableCurrencies')}
      </Caption>
    </View>
  );

  return (
    <>
      <CurrencyList ListHeaderComponent={ListHeader} renderItem={renderCurrency} />

      <Portal>
        <Dialog dismissable={false} visible={dialogVisible}>
          <Dialog.Title>{localize.t('title.welcome')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{localize.t('toStartUsingThisAppYouNeedToPickYourPreferredCurrency')}</Paragraph>
            <Paragraph>{localize.t('dontWorryYouCanChangeItLater')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={{ paddingHorizontal: DEFAULT_PADDING * 2 }} onPress={handleHideDialog}>
              {localize.t('label.ok')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
});

export default Currencies;
