import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  noMarginRight: {
    marginRight: 0,
  },
  rightText: {
    fontSize: 14,
    marginTop: 10,
    paddingRight: 8,
    justifyContent: 'center',
  },

  version: {
    textAlign: 'center',
    padding: DEFAULT_PADDING,
  },
});

export default styles;
