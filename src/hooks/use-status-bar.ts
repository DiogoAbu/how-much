import { Platform } from 'react-native';

import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';

import getStatusBarColor from '!/utils/get-status-bar-color';

import useFocusEffect from './use-focus-effect';
import useTheme from './use-theme';

export default function useStatusBar(): void {
  const { dark, mode, colors, statusBarStyle } = useTheme();

  useFocusEffect(() => {
    setStatusBarStyle(statusBarStyle);
    if (Platform.OS === 'android') {
      setStatusBarBackgroundColor(getStatusBarColor({ dark, mode, colors }), false);
      setStatusBarTranslucent(false);
    }
  }, [colors, dark, mode, statusBarStyle]);
}
