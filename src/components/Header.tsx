import React, { FC, useEffect } from 'react';

import { Appbar, overlay, useTheme } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';

import usePress from '!/hooks/use-press';

const Header: FC<StackHeaderProps> = ({ scene, previous, navigation }) => {
  const { colors, dark } = useTheme();

  const { options } = scene.descriptor;

  const title = options?.headerTitle || options?.title || scene.route.name;

  const backgroundColor = overlay(4, colors.surface) as string;

  const handlePressBack = usePress(() => {
    requestAnimationFrame(() => {
      navigation.pop();
    });
  });

  useEffect(() => {
    setStatusBarStyle(dark ? 'light' : 'dark');
    setStatusBarBackgroundColor(overlay(1, backgroundColor) as string, false);
    setStatusBarTranslucent(true);
  }, [backgroundColor, dark]);

  return (
    <Appbar.Header style={{ backgroundColor }}>
      {previous ? <Appbar.BackAction onPress={handlePressBack} /> : null}

      {options?.headerLeft?.({ tintColor: colors.text }) || null}

      <Appbar.Content title={title} />

      {options?.headerRight?.({ tintColor: colors.text }) || null}
    </Appbar.Header>
  );
};

export default Header;
