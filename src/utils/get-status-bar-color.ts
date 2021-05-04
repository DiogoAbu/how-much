import { overlay } from 'react-native-paper';

import { Theme } from '!/services/theme';

export default function getStatusBarColor({
  dark,
  mode,
  colors,
  elevation,
}: Pick<Theme, 'dark' | 'mode' | 'colors'> & { elevation?: number }): string {
  if (dark && mode === 'adaptive') {
    return overlay(elevation ?? 4, colors.surface) as string;
  }
  return colors.primary;
}
