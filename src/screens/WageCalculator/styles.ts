import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },

  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  inputContainer: {
    marginBottom: DEFAULT_PADDING * 2,
  },
  inputContainerRow: {
    flex: 1,
  },
  input: {
    textAlign: 'right',
  },

  captionMarginVertical: {
    marginVertical: DEFAULT_PADDING,
  },

  hourlyWageRight: {
    fontSize: 22,
    marginRight: 4,
    alignSelf: 'center',
  },
});

export default styles;
