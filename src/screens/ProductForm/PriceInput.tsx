import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, IconButton, Text, TextInput } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import findCurrency from '!/utils/find-currency';
import toCurrency from '!/utils/to-currency';
import toNumber from '!/utils/to-number';

interface Props {
  price: PriceModel;
}

const PriceInput = observer<Props>(({ price }) => {
  const { dark } = useTheme();
  const { productsStore } = useStores();
  const { t } = useTranslation();

  const currencyInfo = findCurrency(price.currencyId);

  const handlePressDelete = usePress(() => {
    requestAnimationFrame(() => {
      productsStore.deletePriceById(price.id);
    });
  });

  const handlePriceChange = (text: string) => {
    price.setValue(toNumber(text, currencyInfo!.currency));
  };

  if (!currencyInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{currencyInfo.currency}</Text>

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
        value={toCurrency(price.value, currencyInfo.currency)}
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
