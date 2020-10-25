import '!/services/localize';

import React, { FC, useEffect } from 'react';
import { Appearance } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import Fab from './components/Fab';
import useAutorun from './hooks/use-autorun';
import useMethod from './hooks/use-method';
import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';
import { Stores } from './stores/Stores';
import { StoresProvider, useStores } from './stores';

const AppWithStores: FC = observer(() => {
  const stores = useStores();
  const { i18n } = useTranslation();

  const handleSchemeChange = useMethod(({ colorScheme }: Appearance.AppearancePreferences) => {
    stores.themeStore.setColorSchemeCurrent(colorScheme);
  });

  useEffect(() => {
    Appearance.addChangeListener(handleSchemeChange);
    return () => {
      Appearance.removeChangeListener(handleSchemeChange);
    };
  }, [handleSchemeChange]);

  useAutorun(
    () => {
      if (stores.hydrated && stores.generalStore.language) {
        void i18n.changeLanguage(stores.generalStore.language);
      }
    },
    [i18n, stores.generalStore.language, stores.hydrated],
    { name: 'Change language' },
  );

  return (
    <PaperProvider theme={stores.themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer theme={stores.themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
        <MainStack />

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
