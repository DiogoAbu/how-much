import React, { useCallback } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, View } from 'react-native';

import { Colors, IconButton, TextInput } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { LIST_ITEM_HEIGHT } from '!/constants';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { PriceModel } from '!/stores/models/PriceModel';
import findCurrency from '!/utils/find-currency';
import { focusNextPrice } from '!/utils/scroll-into-view';
import stripCountryName from '!/utils/strip-country-name';
import toCurrency from '!/utils/to-currency';
import toNumber from '!/utils/to-number';

import styles from './styles';

interface Props {
  price: PriceModel;
  nextIndex?: number;
  pricesRef: React.MutableRefObject<(NativeTextInput | null)[]>;
  scrollRef: React.MutableRefObject<ScrollView | null>;
  onPressSearch: (priceId: string) => void;
}

const PriceInput = observer<Props, NativeTextInput>(
  ({ price, nextIndex, pricesRef, scrollRef, onPressSearch }, ref) => {
    const { dark } = useTheme();
    const { productsStore } = useStores();
    const { t } = useTranslation();

    const currencyInfo = findCurrency(price.currencyId);

    const handlePressSearch = usePress(() => {
      onPressSearch(price.id);
    });

    const handlePressDelete = usePress(() => {
      if (price.value === 0) {
        requestAnimationFrame(() => {
          productsStore.deletePriceById(price.id);
        });
        return;
      }

      Alert.alert(
        t('areYouSure'),
        t('doYouWantToDeleteThisPrice'),
        [
          {
            text: t('label.no'),
          },
          {
            text: t('label.yes'),
            style: 'destructive',
            onPress: () => {
              requestAnimationFrame(() => {
                productsStore.deletePriceById(price.id);
              });
            },
          },
        ],
        { cancelable: true },
      );
    });

    const handlePriceChange = useCallback(
      (text: string) => {
        price.setValue(toNumber(text, currencyInfo!.currency));
      },
      [currencyInfo, price],
    );

    if (!currencyInfo) {
      return null;
    }

    return (
      <View style={styles.priceInputContainer}>
        <TextInput
          autoCompleteType='off'
          autoCorrect={false}
          blurOnSubmit={!nextIndex}
          keyboardAppearance={dark ? 'dark' : 'light'}
          keyboardType='decimal-pad'
          label={`${currencyInfo!.currency} • ${t(
            `countryName.${stripCountryName(currencyInfo!.countryName)}`,
          )}`}
          maxLength={14}
          mode='outlined'
          onChangeText={handlePriceChange}
          onSubmitEditing={
            nextIndex ? focusNextPrice(pricesRef, nextIndex, scrollRef, true, LIST_ITEM_HEIGHT) : undefined
          }
          ref={ref}
          render={(props) => <NativeTextInput {...props} style={[props.style, styles.input]} />}
          returnKeyType={nextIndex ? 'next' : 'done'}
          style={styles.inputContainer}
          value={toCurrency(price.value, currencyInfo!.currency)}
        />

        <IconButton icon='magnify' onPress={handlePressSearch} style={styles.buttonDelete} />

        <IconButton
          color={Colors.red300}
          icon='delete'
          onPress={handlePressDelete}
          style={styles.buttonDelete}
        />
      </View>
    );
  },
  { forwardRef: true },
);

export default PriceInput;
