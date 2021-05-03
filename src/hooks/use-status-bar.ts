import { Platform } from 'react-native';

import { overlay } from 'react-native-paper';
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';

import useFocusEffect from './use-focus-effect';
import useTheme from './use-theme';

export default function useStatusBar(): void {
  const { dark, colors, statusBarStyle } = useTheme();

  useFocusEffect(() => {
    setStatusBarStyle(statusBarStyle);
    if (Platform.OS === 'android') {
      setStatusBarBackgroundColor(dark ? (overlay(4, colors.surface) as string) : colors.primary, false);
      setStatusBarTranslucent(false);
    }
  }, [colors.primary, colors.surface, dark, statusBarStyle]);
}
