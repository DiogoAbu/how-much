import React, { useCallback, useRef, useState } from 'react';
import { InteractionManager, ScrollView, StyleSheet, TextInput as NativeTextInput } from 'react-native';

import { Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import { DEFAULT_APPBAR_HEIGHT, DEFAULT_PADDING } from '!/constants';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';

import DescriptionInput from './DescriptionInput';

const ProductForm = observer(() => {
  const navigation = useNavigation<MainNavigationProp<'ProductForm'>>();
  const insets = useSafeAreaInsets();
  const { generalStore, productsStore } = useStores();
  const { colors } = useTheme();

  const inputRef = useRef<NativeTextInput | null>(null);

  const [descriptionError, setDescriptionError] = useState('');

  const handleOnChangeDescription = useCallback(() => {
    setDescriptionError('');
  }, []);

  const handleNextScreen = usePress(() => {
    if (!productsStore.isDescriptionValid) {
      setDescriptionError(t('error.descriptionCannotBeEmpty'));
      return;
    }

    productsStore.populatePrices();
    inputRef.current?.blur();

    void InteractionManager.runAfterInteractions(() => {
      navigation.navigate('ProductPrices');
    });
  });

  useFocusEffect(() => {
    generalStore.setFab({ fabVisible: false });

    navigation.setOptions({
      title: 'Add a Product',
      headerRight: () => (
        <Button mode='outlined' onPress={handleNextScreen}>
          {t('next')}
        </Button>
      ),
    });
  }, [handleNextScreen, navigation, generalStore]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { padding: DEFAULT_PADDING, paddingTop: insets.top + DEFAULT_APPBAR_HEIGHT + DEFAULT_PADDING },
      ]}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: colors.background }}
    >
      <DescriptionInput
        descriptionError={descriptionError}
        handleOnChange={handleOnChangeDescription}
        handleOnSubmit={handleNextScreen}
        productForm={productsStore.productForm}
        ref={inputRef}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

export default ProductForm;
