import React, { FC, useState } from 'react';

import { List, Menu, Text } from 'react-native-paper';
import { t } from 'i18n-js';
import { Observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import { useStores } from '!/stores';

import styles from './styles';

const ColorSchemeItem: FC<unknown> = () => {
  const { themeStore } = useStores();

  const [colorSchemeMenuVisible, setColorSchemeMenuVisible] = useState(false);

  const handleOpenColorSchemeMenu = usePress(() => {
    requestAnimationFrame(() => {
      setColorSchemeMenuVisible(true);
    });
  });

  const handleCloseColorSchemeMenu = usePress(() => {
    requestAnimationFrame(() => {
      setColorSchemeMenuVisible(false);
    });
  });

  const handleSetColorSchemeAuto = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseColorSchemeMenu();
      themeStore.setColorSchemePreferred('auto');
    });
  });
  const handleSetColorSchemeDark = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseColorSchemeMenu();
      themeStore.setColorSchemePreferred('dark');
    });
  });
  const handleSetColorSchemeLight = usePress(() => {
    requestAnimationFrame(() => {
      handleCloseColorSchemeMenu();
      themeStore.setColorSchemePreferred('light');
    });
  });

  useStatusBar();

  return (
    <List.Item
      left={(props) => <List.Icon {...props} icon='lightbulb' style={[props.style, styles.noMarginRight]} />}
      onPress={handleOpenColorSchemeMenu}
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
              onDismiss={handleCloseColorSchemeMenu}
              visible={colorSchemeMenuVisible}
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
