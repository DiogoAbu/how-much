import React, { FC, useState } from 'react';

import { List, Menu, Text } from 'react-native-paper';
import { Observer } from 'mobx-react-lite';

import usePress from '!/hooks/use-press';
import useStatusBar from '!/hooks/use-status-bar';
import localize from '!/services/localize';
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
                  {localize.t(`colorScheme_${themeStore.colorSchemePreferred}`)}
                  {themeStore.colorSchemePreferred === 'auto'
                    ? ` (${localize.t(`colorScheme_${themeStore.colorSchemeCurrent}`)})`
                    : null}
                </Text>
              }
              onDismiss={handleCloseColorSchemeMenu}
              visible={colorSchemeMenuVisible}
            >
              <Menu.Item onPress={handleSetColorSchemeAuto} title={localize.t('colorScheme_auto')} />
              <Menu.Item onPress={handleSetColorSchemeDark} title={localize.t('colorScheme_dark')} />
              <Menu.Item onPress={handleSetColorSchemeLight} title={localize.t('colorScheme_light')} />
            </Menu>
          )}
        </Observer>
      )}
      title={localize.t('colorScheme')}
    />
  );
};

export default ColorSchemeItem;
