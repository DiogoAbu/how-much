import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },

  sorterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    margin: DEFAULT_PADDING,
  },
});

export default styles;
