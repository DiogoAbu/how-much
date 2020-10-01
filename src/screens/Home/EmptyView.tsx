import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

const EmptyView: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Nothing here yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyView;
