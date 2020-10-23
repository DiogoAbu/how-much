import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { Button, Divider, Menu, overlay } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content';
import { observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import localize from '!/services/localize';
import { useStores } from '!/stores';

import styles from './styles';

const ListOptions: FC = observer(() => {
  const { productsStore, hydrated } = useStores();
  const { colors } = useTheme();

  // State for menu visiblity
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Handlers
  const handleHideMenu = usePress(() => {
    setIsMenuVisible(() => false);
  });

  const handleShowMenu = usePress(() => {
    setIsMenuVisible(() => true);
  });

  const handleSortOrderPress = usePress(() => {
    requestAnimationFrame(() => {
      productsStore.toggleSortByOrder();
    });
  });

  const handleSortByAlphabeticallyPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('alphabetically');
    });
  });

  const handleSortByDatePress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('date');
    });
  });

  const handleSortByPricePress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('price');
    });
  });

  const sortButton = (
    <Button compact icon='chevron-down' mode='text' onPress={handleShowMenu}>
      {localize.t('label.sort')}: {localize.t(`label.${productsStore.sortBy}`)}
    </Button>
  );

  if (!hydrated) {
    return (
      <SkeletonContent
        animationDirection='horizontalRight'
        animationType='shiver'
        boneColor={overlay(4, colors.surface) as string}
        containerStyle={styles.sorterContainer}
        highlightColor={colors.accent}
        isLoading
        layout={[
          { width: '20%', height: 24, margin: 8 },
          { width: '50%', height: 24, margin: 8 },
        ]}
      />
    );
  }

  if (!productsStore.productsSorted) {
    return null;
  }

  return (
    <>
      <View style={styles.sorterContainer}>
        <Button
          compact
          icon={productsStore.sortByOrder === 'asc' ? 'sort-ascending' : 'sort-descending'}
          mode='text'
          onPress={handleSortOrderPress}
        >
          {localize.t(productsStore.sortByOrder === 'asc' ? 'label.ascending' : 'label.descending')}
        </Button>

        <Menu anchor={sortButton} onDismiss={handleHideMenu} visible={isMenuVisible}>
          <Menu.Item onPress={handleSortByAlphabeticallyPress} title={localize.t('label.alphabetically')} />
          <Menu.Item onPress={handleSortByDatePress} title={localize.t('label.date')} />
          <Menu.Item onPress={handleSortByPricePress} title={localize.t('label.price')} />
        </Menu>
      </View>
      <Divider />
    </>
  );
});

export default ListOptions;
