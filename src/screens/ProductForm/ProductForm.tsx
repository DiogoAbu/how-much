import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ListRenderItem, TextInput as NativeTextInput } from 'react-native';

import { Button, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import HeaderButton from '!/components/HeaderButton';
import SlideIn from '!/components/SlideIn';
import { DEFAULT_APPBAR_HEIGHT, DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
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

  const inputRef = useRef<NativeTextInput | null>(null);

  const [descriptionError, setDescriptionError] = useState('');

  const handleOnChangeDescription = useCallback(() => {
    setDescriptionError('');
  }, []);

  const handleAddCurrency = usePress(() => {
    inputRef.current?.blur();

    requestAnimationFrame(() => {
      navigation.navigate('Currencies', { action: 'productForm' });
    });
  });

  const handleFocusPrice = usePress(() => {
    //
  });

  const handleDone = usePress(() => {
    if (!productsStore.isDescriptionValid()) {
      setDescriptionError(t('descriptionCannotBeEmpty'));
      return;
    }

    const isPricesValid = productsStore.isPricesValid();
    if (typeof isPricesValid === 'string') {
      setDescriptionError(isPricesValid);
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
      title: params?.isEditing ? t('editingProduct') : t('newProduct'),
      headerRight: () => (
        <HeaderButton icon='check' mode='text' onPress={handleDone}>
          {t('label.done')}
        </HeaderButton>
      ),
    });
  }, [generalStore, handleDone, navigation, params?.isEditing]);

  return (
    <FlatList
      contentContainerStyle={[
        styles.content,
        { padding: DEFAULT_PADDING, paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT + DEFAULT_PADDING },
      ]}
      data={productsStore.productForm?.prices.slice()}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListFooterComponent={
        <Button mode='contained' onPress={handleAddCurrency} style={styles.buttonAdd}>
          {t('label.addCurrency')}
        </Button>
      }
      ListHeaderComponent={
        <DescriptionInput
          descriptionError={descriptionError}
          handleOnChange={handleOnChangeDescription}
          handleOnSubmit={handleFocusPrice}
          productForm={productsStore.productForm}
          ref={inputRef}
        />
      }
      renderItem={renderPrice}
      style={{ backgroundColor: colors.background }}
    />
  );
});

const keyExtractor = (item: PriceModel) => `priceInput${item.id}`;

const renderPrice: ListRenderItem<PriceModel> = ({ item, index, separators }) => {
  return (
    <SlideIn>
      <PriceInput index={index} item={item} separators={separators} />
    </SlideIn>
  );
};

export default ProductForm;
