import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  pricesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_PADDING,
  },

  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: DEFAULT_PADDING,
  },
  input: {
    textAlign: 'right',
  },

  buttonDelete: {
    alignSelf: 'center',
  },
});

export default styles;
