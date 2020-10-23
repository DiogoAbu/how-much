import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

interface Props {
  text: string;
}

const EmptyCenteredView: FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
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

export default EmptyCenteredView;
