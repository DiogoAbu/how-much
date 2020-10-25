import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  headerLeftTitle: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 17,
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
