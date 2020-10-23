import React, { FC } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Button } from 'react-native-paper';

import useTheme from '!/hooks/use-theme';

interface Props {
  mode?: 'text' | 'outlined' | 'contained';
  dark?: boolean;
  compact?: boolean;
  color?: string;
  loading?: boolean;
  icon?: string;
  disabled?: boolean;
  uppercase?: boolean;
  accessibilityLabel?: string;
  onPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme?: ReactNativePaper.Theme;
}

const HeaderButton: FC<Props> = ({ children, disabled, theme = {}, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Button
      compact
      disabled={disabled}
      {...rest}
      theme={{
        ...theme,
        colors: {
          ...(theme?.colors ?? {}),
          primary: colors.textOnPrimary,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default HeaderButton;
