import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  shareInfo: {
    textAlign: 'center',
    padding: DEFAULT_PADDING * 2,
  },

  button: {
    margin: DEFAULT_PADDING,
  },
});

export default styles;
