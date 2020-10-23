import '!/services/i18n';

import React, { FC, useEffect } from 'react';
import { Appearance } from 'react-native';

import { Portal, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import Fab from './components/Fab';
import useMethod from './hooks/use-method';
import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';
import { Stores } from './stores/Stores';
import { StoresProvider, useStores } from './stores';

const AppWithStores: FC = observer(() => {
  const { themeStore } = useStores();

  const handleSchemeChange = useMethod(({ colorScheme }: Appearance.AppearancePreferences) => {
    themeStore.setColorSchemeCurrent(colorScheme);
  });

  useEffect(() => {
    Appearance.addChangeListener(handleSchemeChange);
    return () => {
      Appearance.removeChangeListener(handleSchemeChange);
    };
  }, [handleSchemeChange]);

  return (
    <PaperProvider theme={themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer theme={themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
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
