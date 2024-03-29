import '!/services/localize';

import React, { FC, useEffect } from 'react';
import { Appearance, Platform } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import StatusBarBackgroundIos from '!/components/StatusBarBackgroundIos';

import Fab from './components/Fab';
import LinkingHandler from './components/LinkingHandler';
import UpdateHandler from './components/UpdateHandler';
import useAutorun from './hooks/use-autorun';
import useMethod from './hooks/use-method';
import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';
import { Stores } from './stores/Stores';
import { navigationRef } from './utils/navigation-ref';
import { StoresProvider, useStores } from './stores';

const AppWithStores: FC = observer(() => {
  const { generalStore, themeStore } = useStores();
  const { i18n } = useTranslation();

  const handleSchemeChange = useMethod(({ colorScheme }: Appearance.AppearancePreferences) => {
    themeStore.setColorSchemeCurrent(colorScheme);
  });

  useEffect(() => {
    Appearance.addChangeListener(handleSchemeChange);

    return () => {
      Appearance.removeChangeListener(handleSchemeChange);
    };
  }, [handleSchemeChange]);

  useAutorun(
    () => {
      if (generalStore.language) {
        void i18n.changeLanguage(generalStore.language);
      }
    },
    [i18n, generalStore.language],
    { name: 'Change language' },
  );

  return (
    <PaperProvider theme={themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
      {Platform.OS === 'ios' ? <StatusBarBackgroundIos /> : null}

      <NavigationContainer
        ref={navigationRef}
        theme={themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}
      >
        <MainStack />

        <LinkingHandler />

        <UpdateHandler />

        <Portal>
          <Fab />
        </Portal>
      </NavigationContainer>
    </PaperProvider>
  );
});

const App: FC = () => {
  return (
    <StoresProvider value={new Stores()}>
      <AppWithStores />
    </StoresProvider>
  );
};

export default App;
