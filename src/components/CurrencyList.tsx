import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, FlatListProps, StyleSheet } from 'react-native';

import { Divider, Searchbar } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { DEFAULT_PADDING, LIST_ITEM_HEIGHT } from '!/constants';
import useDebounceValue from '!/hooks/use-debounce-value';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import currencyList, { CurrencyInfo } from '!/utils/currency-list';
import stripCountryName from '!/utils/strip-country-name';

import EmptyCenteredView from './EmptyCenteredView';

interface Props extends Omit<FlatListProps<CurrencyInfo>, 'data'> {
  isAnimated?: boolean;
}

const CurrencyList = observer<Props>(({ isAnimated, ListHeaderComponent, ...rest }) => {
  const { colors } = useTheme();
  const { generalStore } = useStores();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const currencyListMinusActive = useRef(currencyList.filter((e) => e.id !== generalStore.activeCurrencyId));
  const [list, setList] = useState<CurrencyInfo[]>(() => currencyListMinusActive.current);

  const [query, setQuery] = useState('');
  const queryDebounced = useDebounceValue(query);

  useEffect(() => {
    const text = queryDebounced.trim();

    if (!text) {
      requestAnimationFrame(() => {
        setList(currencyListMinusActive.current);
      });
      return;
    }

    const textSafe = text.toUpperCase();

    const filteredList = currencyListMinusActive.current.filter((each) => {
      if (each.countryCode.toUpperCase().includes(textSafe)) {
        return true;
      }
      if (each.currency.toUpperCase().includes(textSafe)) {
        return true;
      }
      if (
        t(`countryName.${stripCountryName(each.countryName)}`, {
          defaultValue: each.countryName,
        })
          .toUpperCase()
          .includes(textSafe) ||
        each.countryName.toUpperCase().includes(textSafe)
      ) {
        return true;
      }
      if (each.countryNativeName.toUpperCase().includes(textSafe)) {
        return true;
      }
      return false;
    });

    requestAnimationFrame(() => {
      setList(filteredList);
    });
  }, [queryDebounced, t]);

  const onChangeSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const ListHeader = (
    <>
      <Searchbar
        autoCapitalize='none'
        autoCorrect={false}
        maxLength={50}
        onChangeText={onChangeSearch}
        placeholder={t('lookForAcurrency')}
        style={styles.searchbar}
        value={query}
      />

      {ListHeaderComponent}
    </>
  );

  const Component = isAnimated ? Animated.FlatList : FlatList;

  return (
    <Component
      bounces={false}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: headerHeight + DEFAULT_PADDING },
        rest.contentContainerStyle,
      ]}
      data={list}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      ItemSeparatorComponent={Divider}
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptyCenteredView text={t('noResults')} />}
      ListHeaderComponent={ListHeader}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      style={[{ backgroundColor: colors.background }, rest.style]}
      updateCellsBatchingPeriod={100}
      windowSize={16}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    padding: DEFAULT_PADDING,
  },

  searchbar: {
    marginHorizontal: DEFAULT_PADDING,
    marginBottom: DEFAULT_PADDING,
  },
});

const keyExtractor = (item: CurrencyInfo) => `currency-${item.id}`;

const getItemLayout = (_: CurrencyInfo[] | null | undefined, index: number) => ({
  length: LIST_ITEM_HEIGHT,
  offset: LIST_ITEM_HEIGHT * index,
  index,
});

export default CurrencyList;
