import React, { FC, useState } from 'react';

import { List, Menu, Text } from 'react-native-paper';
import { Observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';

import styles from './styles';

const ColorSchemeItem: FC = () => {
  const { themeStore } = useStores();
  const { t } = useTranslation();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleOpenMenu = usePress(() => {
    requestAnimationFrame(() => {
      setIsMenuVisible(true);
    });
  });

  const handleCloseMenu = usePress(() => {
    requestAnimationFrame(() => {
      setIsMenuVisible(false);
    });
  });

  const handleSetColorSchemeAuto = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseMenu();
      themeStore.setColorSchemePreferred('auto');
    });
  });
  const handleSetColorSchemeDark = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseMenu();
      themeStore.setColorSchemePreferred('dark');
    });
  });
  const handleSetColorSchemeLight = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseMenu();
      themeStore.setColorSchemePreferred('light');
    });
  });

  useStatusBar();

  return (
    <List.Item
      left={(props) => <List.Icon {...props} icon='lightbulb' style={[props.style, styles.noMarginRight]} />}
      onPress={handleOpenMenu}
      right={(props) => (
        <Observer>
          {() => (
            <Menu
              anchor={
                <Text {...props} style={[props.style, styles.rightText]}>
                  {t(`colorScheme_${themeStore.colorSchemePreferred}`)}
                  {themeStore.colorSchemePreferred === 'auto'
                    ? ` (${t(`colorScheme_${themeStore.colorSchemeCurrent}`)})`
                    : null}
                </Text>
              }
              onDismiss={handleCloseMenu}
              visible={isMenuVisible}
            >
              <Menu.Item onPress={handleSetColorSchemeAuto} title={t('colorScheme_auto')} />
              <Menu.Item onPress={handleSetColorSchemeDark} title={t('colorScheme_dark')} />
              <Menu.Item onPress={handleSetColorSchemeLight} title={t('colorScheme_light')} />
            </Menu>
          )}
        </Observer>
      )}
      title={t('colorScheme')}
    />
  );
};

export default ColorSchemeItem;
