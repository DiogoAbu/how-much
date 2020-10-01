import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';

import { Button, Colors, IconButton, TextInput, useTheme } from 'react-native-paper';
import { countries } from 'countries-list';
import { t } from 'i18n-js';
import { observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import { PriceModel } from '!/stores/models/PriceModel';
import { fromMoney, toMoney } from '!/utils/money-mask';

const PriceInput = observer<ListRenderItemInfo<PriceModel>>(({ item: price }) => {
  const { dark } = useTheme();

  const handlePressRemove = usePress(() => {
    //
  });

  const handlePriceChange = (text: string) => {
    price.setValue(fromMoney(text));
  };

  return (
    <View style={styles.container}>
      <Button compact icon='chevron-down' mode='text' style={styles.country}>
        {countries[price.countryCode].currency}
      </Button>
      <TextInput
        autoCompleteType='off'
        autoCorrect={false}
        autoFocus
        keyboardAppearance={dark ? 'dark' : 'light'}
        keyboardType='decimal-pad'
        label={t('price')}
        maxLength={14}
        mode='outlined'
        onChangeText={handlePriceChange}
        returnKeyType='done'
        style={styles.input}
        value={toMoney(price.value)}
      />
      <IconButton color={Colors.red300} icon='delete' onPress={handlePressRemove} />
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
  country: {
    marginRight: 12,
  },
  input: {
    flex: 1,
  },
});

export default PriceInput;
