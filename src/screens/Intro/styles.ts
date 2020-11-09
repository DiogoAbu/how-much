import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  container: {
    padding: DEFAULT_PADDING * 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textCenter: {
    textAlign: 'center',
  },

  currenciesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  currencyChip: {
    margin: DEFAULT_PADDING,
  },

  button: {
    margin: DEFAULT_PADDING * 2,
  },

  marginView: {
    height: DEFAULT_PADDING * 2,
  },
});

export default styles;
