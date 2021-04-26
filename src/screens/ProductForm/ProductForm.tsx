import React, { Fragment, useCallback, useRef, useState } from 'react';
import { ScrollView, TextInput as NativeTextInput, View } from 'react-native';

import { Divider, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import HeaderButton from '!/components/HeaderButton';
import SlideIn from '!/components/SlideIn';
import { DEFAULT_APPBAR_HEIGHT } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp, MainRouteProp } from '!/types';

import DescriptionInput from './DescriptionInput';
import PriceInput from './PriceInput';
import styles from './styles';

const ProductForm = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductForm'>>();
  const { params } = useRoute<MainRouteProp<'ProductForm'>>();
  const insets = useSafeAreaInsets();
  const { generalStore, productsStore } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const scrollRef = useRef<ScrollView | null>(null);
  const descriptionRef = useRef<NativeTextInput | null>(null);
  const pricesRef = useRef<(NativeTextInput | null)[]>(Array(productsStore.productForm?.prices.length));

  const [descriptionError, setDescriptionError] = useState('');

  const handleOnChangeDescription = useCallback(() => {
    setDescriptionError('');
  }, []);

  const handleAddCurrency = usePress(() => {
    descriptionRef.current?.blur();

    requestAnimationFrame(() => {
      navigation.navigate('Currencies', { action: 'productForm' });
    });
  });

  const handleFocusPrice = usePress(() => {
    pricesRef.current[0]?.focus();
  });

  const handlePressSearchPrice = usePress((priceId: string) => {
    requestAnimationFrame(() => {
      navigation.navigate('SearchPrice', { priceId });
    });
  });

  const handleDone = usePress(() => {
    if (!productsStore.isDescriptionValid()) {
      setDescriptionError(t('descriptionCannotBeEmpty'));
      return;
    }

    const isPricesValid = productsStore.isPricesValid();
    if (isPricesValid === 'needsAtLeastOnePrice') {
      setDescriptionError(t('needsAtLeastOnePrice'));
      return;
    }

    productsStore.addProductToList();
    requestAnimationFrame(() => {
      if (params?.isEditing) {
        navigation.pop();
      } else {
        navigation.popToTop();
      }
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: params?.isEditing ? t('title.editingProduct') : t('title.newProduct'),
      headerRight: () => (
        <HeaderButton icon='check' mode='text' onPress={handleDone}>
          {t('label.done')}
        </HeaderButton>
      ),
    });
  }, [generalStore, handleDone, navigation, params?.isEditing, t]);

  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT }]}
      keyboardDismissMode='none'
      keyboardShouldPersistTaps='handled'
      ref={scrollRef}
      style={{ backgroundColor: colors.background }}
    >
      <DescriptionInput
        descriptionError={descriptionError}
        handleOnChange={handleOnChangeDescription}
        handleOnSubmit={handleFocusPrice}
        productForm={productsStore.productForm}
        ref={descriptionRef}
      />

      <Divider />

      <View style={styles.pricesHeader}>
        <Text>{t('prices')}</Text>
        <IconButton icon='plus' onPress={handleAddCurrency} />
      </View>

      {productsStore.productForm?.prices.map((price, index, arr) => (
        <Fragment key={`priceInputFragment${price.id}`}>
          <SlideIn key={`priceInput${price.id}`}>
            <PriceInput
              nextIndex={index === arr.length - 1 ? undefined : index + 1}
              onPressSearch={handlePressSearchPrice}
              price={price}
              pricesRef={pricesRef}
              ref={(ref) => (pricesRef.current[index] = ref)}
              scrollRef={scrollRef}
            />
          </SlideIn>
          {index < arr.length - 1 ? <Divider key={`priceInputDivider${price.id}`} /> : null}
        </Fragment>
      ))}
    </ScrollView>
  );
});

export default ProductForm;
