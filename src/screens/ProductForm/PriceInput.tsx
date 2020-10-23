import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';

import { Colors, IconButton, Text, TextInput } from 'react-native-paper';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import findCurrency from '!/utils/find-currency';
import { toMoneyMask, toMoneyRaw } from '!/utils/money-mask';

const PriceInput = observer<ListRenderItemInfo<PriceModel>>(({ item: price }) => {
  const { colors, dark, fonts } = useTheme();
  const { productsStore } = useStores();

  const handlePressDelete = usePress(() => {
    requestAnimationFrame(() => {
      productsStore.deletePriceById(price.id);
    });
  });

  const handlePriceChange = (text: string) => {
    price.setValue(toMoneyRaw(text));
  };

  const currencyInfo = findCurrency(price.currencyId);

  if (!currencyInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.currency, fonts.medium]}>{currencyInfo.currency}</Text>

      <TextInput
        autoCompleteType='off'
        autoCorrect={false}
        keyboardAppearance={dark ? 'dark' : 'light'}
        keyboardType='decimal-pad'
        label={t('price')}
        maxLength={14}
        mode='outlined'
        onChangeText={handlePriceChange}
        returnKeyType='done'
        style={styles.input}
        value={toMoneyMask(price.value)}
      />

      <IconButton
        color={Colors.red300}
        icon='delete'
        onPress={handlePressDelete}
        style={styles.buttonDelete}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
  },
  currency: {
    width: 70,
    fontSize: 16,
    paddingLeft: DEFAULT_PADDING,
    paddingTop: DEFAULT_PADDING,
  },
  input: {
    flex: 1,
  },
  buttonDelete: {
    paddingTop: DEFAULT_PADDING,
    marginLeft: DEFAULT_PADDING * 2,
  },
});

export default PriceInput;
