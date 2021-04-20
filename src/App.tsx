import '!/services/localize';

import React, { FC, useEffect } from 'react';
import { Appearance, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

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
  const insets = useSafeAreaInsets();

  const containerStyle = {
    flex: 1,
    marginBottom: insets.bottom,
    marginTop: insets.top,
    marginRight: insets.right,
    marginLeft: insets.left,
  };

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
    <View style={containerStyle}>
      <PaperProvider theme={themeStore.colorSchemeCurrent === 'dark' ? darkTheme : lightTheme}>
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
    </View>
  );
});

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <StoresProvider value={new Stores()}>
        <AppWithStores />
      </StoresProvider>
    </SafeAreaProvider>
  );
};

export default App;
