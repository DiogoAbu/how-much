import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  shareUrl: {
    textAlign: 'center',
    padding: DEFAULT_PADDING * 2,
  },

  shareButton: {
    marginHorizontal: DEFAULT_PADDING,
    marginBottom: DEFAULT_PADDING * 2,
  },

  shareInfo: {
    textAlign: 'center',
    padding: DEFAULT_PADDING * 2,
  },
});

export default styles;
