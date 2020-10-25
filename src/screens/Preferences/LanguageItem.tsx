import React, { FC, useState } from 'react';

import { List, Menu, Text } from 'react-native-paper';

import usePress from '!/hooks/use-press';
import useTranslation from '!/hooks/use-translation';
import { availableLanguages } from '!/services/localize';
import { useStores } from '!/stores';

import styles from './styles';

const LanguageItem: FC = () => {
  const { generalStore } = useStores();
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

  const handleSetLanguage = usePress((lng: string) => {
    handleCloseMenu();
    requestAnimationFrame(() => {
      generalStore.setLanguage(lng);
    });
  });

  return (
    <List.Item
      left={(props) => <List.Icon {...props} icon='translate' style={[props.style, styles.noMarginRight]} />}
      onPress={handleOpenMenu}
      right={(props) => (
        <Menu
          anchor={
            <Text {...props} style={[props.style, styles.rightText]}>
              {t('languageName')}
            </Text>
          }
          onDismiss={handleCloseMenu}
          visible={isMenuVisible}
        >
          {availableLanguages.map((lng) => (
            <Menu.Item key={lng} onPress={() => handleSetLanguage(lng)} title={t('languageName', { lng })} />
          ))}
        </Menu>
      )}
      title={t('language')}
    />
  );
};

export default LanguageItem;
