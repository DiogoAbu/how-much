import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { Button, Divider, Menu, overlay } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content';
import { observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';

import styles from './styles';

const ListOptions: FC = observer(() => {
  const { productsStore, hydrated } = useStores();
  const { colors } = useTheme();
  const { t } = useTranslation();

  // State for menu visiblity
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Handlers
  const handleHideMenu = usePress(() => {
    setIsMenuVisible(() => false);
  });

  const handleShowMenu = usePress(() => {
    setIsMenuVisible(() => true);
  });

  const handleSortByAlphabeticallyAscPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('alphabetically');
      productsStore.setSortByOrder('asc');
    });
  });

  const handleSortByAlphabeticallyDescPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('alphabetically');
      productsStore.setSortByOrder('desc');
    });
  });

  const handleSortByMostExpensivePress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('price');
      productsStore.setSortByOrder('desc');
    });
  });

  const handleSortByLeastExpensivePress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('price');
      productsStore.setSortByOrder('asc');
    });
  });

  const handleSortByMostRecentPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('date');
      productsStore.setSortByOrder('desc');
    });
  });

  const handleSortByLeastRecentPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      productsStore.setSortBy('date');
      productsStore.setSortByOrder('asc');
    });
  });

  const sortButton = (
    <Button compact icon='chevron-down' mode='text' onPress={handleShowMenu}>
      {t('label.sort')}: {t(`label.${productsStore.sortBy}.${productsStore.sortByOrder}`)}
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
        <Menu anchor={sortButton} onDismiss={handleHideMenu} visible={isMenuVisible}>
          <Menu.Item onPress={handleSortByAlphabeticallyAscPress} title={t('label.alphabetically.asc')} />
          <Menu.Item onPress={handleSortByAlphabeticallyDescPress} title={t('label.alphabetically.desc')} />
          <Menu.Item onPress={handleSortByMostExpensivePress} title={t('label.price.desc')} />
          <Menu.Item onPress={handleSortByLeastExpensivePress} title={t('label.price.asc')} />
          <Menu.Item onPress={handleSortByMostRecentPress} title={t('label.date.desc')} />
          <Menu.Item onPress={handleSortByLeastRecentPress} title={t('label.date.asc')} />
        </Menu>
      </View>
      <Divider />
    </>
  );
});

export default ListOptions;
