import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    padding: DEFAULT_PADDING,
  },

  searchbar: {
    marginHorizontal: DEFAULT_PADDING,
    marginBottom: DEFAULT_PADDING * 2,
  },

  currencyItemRight: {
    alignSelf: 'center',
  },
});

export default styles;
