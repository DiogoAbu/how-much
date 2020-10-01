import '!/services/i18n';

import React, { FC } from 'react';

import { Portal, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Fab from './components/Fab';
import MainStack from './navigators/MainStack';
import { dark, ligth } from './services/theme';
import { Stores } from './stores/Stores';
import { StoresProvider } from './stores';

const isDark = !true;

const AppWithStores: FC = () => {
  const theme = isDark ? dark : ligth;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStack />

        <Portal>
          <Fab />
        </Portal>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App: FC = () => {
  return (
    <StoresProvider value={new Stores()}>
      <AppWithStores />
    </StoresProvider>
  );
};

export default App;
