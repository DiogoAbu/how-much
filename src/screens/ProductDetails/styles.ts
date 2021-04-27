import { StyleSheet } from 'react-native';

import { DEFAULT_PADDING } from '!/constants';

const styles = StyleSheet.create({
  contentContainer: {
    // flexGrow: 1,
  },

  hourNumber: {
    fontSize: 22,
    marginRight: 4,
    alignSelf: 'center',
  },
  hourText: {
    fontSize: 14,
  },
  italic: {
    fontStyle: 'italic',
  },

  loadingChartContainer: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartOuterContainer: {
    position: 'relative',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: DEFAULT_PADDING,
    marginHorizontal: DEFAULT_PADDING * 6,
    marginBottom: -32,
  },
  legendContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    flexWrap: 'wrap-reverse',
    paddingHorizontal: DEFAULT_PADDING,
    marginBottom: DEFAULT_PADDING,
  },
  legendChip: {
    margin: DEFAULT_PADDING / 4,
  },
  legendChipText: {
    marginRight: DEFAULT_PADDING / 4,
    marginLeft: DEFAULT_PADDING / 4,
    marginVertical: 0,
    fontSize: 10,
    minHeight: 16,
    lineHeight: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -24,
    marginHorizontal: DEFAULT_PADDING,
  },
  dateText: {
    textAlign: 'right',
  },

  adContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DEFAULT_PADDING,
  },

  chartButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: DEFAULT_PADDING,
  },
  chartButton: {
    margin: DEFAULT_PADDING,
  },

  listCaption: {
    flex: 1,
    padding: DEFAULT_PADDING,
  },
});

export default styles;
