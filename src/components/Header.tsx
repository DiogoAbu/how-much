import React, { FC } from 'react';

import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';

import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import useTheme from '!/hooks/use-theme';

const Header: FC<StackHeaderProps> = ({ scene, previous, navigation }) => {
  const { colors } = useTheme();

  const { options } = scene.descriptor;

  const title = options?.headerTitle ?? options?.title ?? scene.route.name;

  const handlePressBack = usePress(() => {
    requestAnimationFrame(() => {
      navigation.pop();
    });
  });

  useStatusBar();

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={handlePressBack} /> : null}

      {options?.headerLeft?.({ tintColor: colors.text }) || null}

      {title ? <Appbar.Content title={title} /> : null}

      {options?.headerRight?.({ tintColor: colors.text }) || null}
    </Appbar.Header>
  );
};

export default Header;
