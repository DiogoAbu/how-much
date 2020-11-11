import React, { useCallback } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput } from 'react-native';

import { Colors, IconButton, List, TextInput } from 'react-native-paper';
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
}

const PriceInput = observer<Props, NativeTextInput>(
  ({ price, nextIndex, pricesRef, scrollRef }, ref) => {
    const { dark } = useTheme();
    const { productsStore } = useStores();
    const { t } = useTranslation();

    const currencyInfo = findCurrency(price.currencyId);

    const handlePressDelete = usePress(() => {
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

    const renderRight = useCallback(
      () => (
        <>
          <TextInput
            autoCompleteType='off'
            autoCorrect={false}
            blurOnSubmit={!nextIndex}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType='decimal-pad'
            label={t('price')}
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
            value={toCurrency(price.value, currencyInfo?.currency)}
          />

          <IconButton
            color={Colors.red300}
            icon='delete'
            onPress={handlePressDelete}
            style={styles.buttonDelete}
          />
        </>
      ),
      [
        currencyInfo?.currency,
        dark,
        handlePressDelete,
        handlePriceChange,
        nextIndex,
        price.value,
        pricesRef,
        ref,
        scrollRef,
        t,
      ],
    );

    if (!currencyInfo) {
      return null;
    }

    return (
      <List.Item
        description={t(`countryName.${stripCountryName(currencyInfo.countryName)}`)}
        descriptionNumberOfLines={4}
        right={renderRight}
        title={currencyInfo.currency}
      />
    );
  },
  { forwardRef: true },
);

export default PriceInput;
