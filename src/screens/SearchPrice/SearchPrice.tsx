import React, { FC, useCallback, useRef, useState } from 'react';

import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

import HeaderButton from '!/components/HeaderButton';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp, MainRouteProp } from '!/types';
import addCents from '!/utils/add-cents';
import findCurrency from '!/utils/find-currency';
import stripCountryName from '!/utils/strip-country-name';
import toNumber from '!/utils/to-number';

const SearchPrice: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'SearchPrice'>>();
  const { params } = useRoute<MainRouteProp<'SearchPrice'>>();
  const { generalStore, productsStore } = useStores();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const webRef = useRef<WebView>(null);

  const [selectedText, setSelectedText] = useState('');

  const { priceId } = params;
  const price = productsStore.productForm?.prices.find((e) => e.id === priceId);
  const currencyInfo = findCurrency(price?.currencyId);

  const handleCopySelectedText = usePress(() => {
    const selectedPrice = addCents(selectedText.trim());
    price?.setValue(toNumber(selectedPrice, currencyInfo?.currency));
    navigation.goBack();
  });

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    setSelectedText(event.nativeEvent.data);
  }, []);

  const handleStateChange = useCallback((event: WebViewNavigation) => {
    if (!event.loading) {
      webRef.current?.injectJavaScript(listenToEndOfSelection);
    }
  }, []);

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: t('title.selectPrice'),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton icon='content-copy' mode='text' onPress={handleCopySelectedText}>
          {t('label.copy')}
        </HeaderButton>
      ),
    });
  }, [generalStore, handleCopySelectedText, navigation, t]);

  if (!price || !currencyInfo) {
    return null;
  }

  const countryName = stripCountryName(currencyInfo!.countryName);
  const query = `${productsStore.productForm?.description} ${currencyInfo!.currency} ${countryName}`;

  return (
    <WebView
      onMessage={handleMessage}
      onNavigationStateChange={handleStateChange}
      ref={webRef}
      source={{ uri: `https://www.google.com/search?q=${query}` }}
      style={{ marginTop: headerHeight }}
    />
  );
};

const listenToEndOfSelection = `
  document.onselectionchange = function() {
    window.ReactNativeWebView.postMessage(window.getSelection().toString());
  };
  true;
`;

export default SearchPrice;
