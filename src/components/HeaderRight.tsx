import React, { FC, useState } from 'react';

import { Appbar, Menu, useTheme } from 'react-native-paper';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { t } from 'i18n-js';

import usePress from '!/hooks/use-press';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  navigation: NavigationProp<Record<string, object | undefined>, string, NavigationState, {}, {}>;
}

const HeaderRight: FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();

  // State for menu visiblity
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Handlers
  const handleHideMenu = usePress(() => {
    setIsMenuVisible(() => false);
  });

  const handleShowMenu = usePress(() => {
    setIsMenuVisible(() => true);
  });

  const handleSettingsPress = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      navigation.navigate('Settings');
    });
  });

  const handleSignOut = usePress(() => {
    handleHideMenu();
    requestAnimationFrame(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    });
  });

  const dotsIcon = (
    <Appbar.Action
      color={colors.text}
      disabled={isMenuVisible}
      icon='dots-vertical'
      onPress={handleShowMenu}
    />
  );

  return (
    <Menu anchor={dotsIcon} onDismiss={handleHideMenu} visible={isMenuVisible}>
      <Menu.Item onPress={handleSettingsPress} title={t('title.settings')} />
      <Menu.Item onPress={handleSignOut} title={t('signOut')} />
    </Menu>
  );
};

export default HeaderRight;
