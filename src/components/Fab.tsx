import React from 'react';
import { StyleSheet } from 'react-native';

import { FAB as FabPaper, useTheme } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { useStores } from '!/stores';

const Fab = observer(() => {
  const { colors } = useTheme();
  const { generalStore } = useStores();

  return (
    <FabPaper
      icon={generalStore.fabIcon || 'plus'}
      onPress={generalStore.handleFabPress}
      style={[styles.fab, { ...generalStore.fabStyle }]}
      theme={{ colors: { accent: colors.primary } }}
      visible={generalStore.fabVisible}
    />
  );
});

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Fab;
