import React, { FC } from 'react';

import { Appbar } from 'react-native-paper';
import { StackHeaderLeftButtonProps, StackHeaderProps } from '@react-navigation/stack';

import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import useTheme from '!/hooks/use-theme';

interface Props {
  title: string;
  headerLeft?: (props: StackHeaderLeftButtonProps) => React.ReactNode;
  headerRight?: (props: { tintColor?: string }) => React.ReactNode;
}

const Header: FC<Partial<StackHeaderProps & Props>> = ({
  scene,
  previous,
  navigation,
  title: headerTitle,
  headerLeft,
  headerRight,
}) => {
  const { colors } = useTheme();

  const options = scene?.descriptor.options;

  const title = headerTitle ?? options?.headerTitle ?? options?.title ?? scene?.route.name;

  const handlePressBack = usePress(() => {
    requestAnimationFrame(() => {
      navigation?.pop();
    });
  });

  useStatusBar();

  return (
    <Appbar.Header statusBarHeight={0}>
      {previous ? <Appbar.BackAction onPress={handlePressBack} /> : null}

      {headerLeft?.({ tintColor: colors.text }) || options?.headerLeft?.({ tintColor: colors.text }) || null}

      {title ? <Appbar.Content title={title} /> : null}

      {headerRight?.({ tintColor: colors.text }) ||
        options?.headerRight?.({ tintColor: colors.text }) ||
        null}
    </Appbar.Header>
  );
};

export default Header;
