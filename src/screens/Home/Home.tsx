import React, { FC, useCallback } from 'react';
import { Alert, Platform } from 'react-native';

import { createMaterialCollapsibleTopTabNavigator } from 'react-native-collapsible-tab-view';
import { overlay, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Header from '!/components/Header';
import { DEFAULT_APPBAR_HEIGHT } from '!/constants';
import useAutorunOnFocus from '!/hooks/use-autorun-on-focus';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp } from '!/types';

import HeaderRight from './HeaderRight';
import ProductList from './ProductList';
import styles from './styles';

const Tab = createMaterialCollapsibleTopTabNavigator();

const Home: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  const stores = useStores();
  const { colors, dark, fonts, mode } = useTheme();
  const { t } = useTranslation();

  const renderHeader = useCallback(
    () => (
      <Header
        headerLeft={() =>
          Platform.OS === 'ios' ? (
            <Text
              ellipsizeMode='tail'
              numberOfLines={1}
              style={[
                fonts.regular,
                styles.headerLeftTitle,
                { color: dark ? colors.text : colors.textOnPrimary },
              ]}
            >
              {t('title.home', { name: t('howMuch') })}
            </Text>
          ) : undefined
        }
        headerRight={() => <HeaderRight navigation={navigation} />}
        title={Platform.OS === 'ios' ? '' : t('title.home', { name: t('howMuch') })}
      />
    ),
    [colors.text, colors.textOnPrimary, dark, fonts.regular, navigation, t],
  );

  const handleFabPress = usePress(() => {
    if (!stores.generalStore.activeCurrencyId) {
      requestAnimationFrame(() => {
        navigation.reset({ routes: [{ name: 'Intro' }] });
      });
      return;
    }

    if (stores.productsStore.isDraft()) {
      Alert.alert(
        t('draftFound'),
        t('doYouWantToDiscardThisDraftOrEditIt'),
        [
          { text: t('label.return'), style: 'cancel' },
          {
            text: t('label.discard'),
            style: 'destructive',
            onPress: () => {
              stores.productsStore.resetProductForm();
              requestAnimationFrame(() => {
                navigation.navigate('ProductForm');
              });
            },
          },
          {
            text: t('label.edit'),
            onPress: () => {
              requestAnimationFrame(() => {
                navigation.navigate('ProductForm');
              });
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      stores.productsStore.resetProductForm();
      requestAnimationFrame(() => {
        navigation.navigate('ProductForm');
      });
    }
  });

  useFocusEffect(() => {
    stores.generalStore.setFab({ fabIcon: 'plus', handleFabPress });
  }, [handleFabPress, stores.generalStore]);

  useAutorunOnFocus(
    () => {
      if (!stores.hydrated) {
        return;
      }
      if (!stores.generalStore.activeCurrencyId) {
        requestAnimationFrame(() => {
          navigation.reset({ routes: [{ name: 'Intro' }] });
        });
        return;
      }
      stores.generalStore.setFab({ fabVisible: true });
    },
    [stores],
    { name: 'Home FAB visibility' },
  );

  return (
    <Tab.Navigator
      collapsibleOptions={{
        headerHeight: DEFAULT_APPBAR_HEIGHT,
        renderHeader,
        disableSnap: true,
      }}
      lazy
      tabBarOptions={{
        indicatorStyle: { backgroundColor: dark ? colors.primary : colors.accent },
        activeTintColor: dark ? colors.text : colors.textOnPrimary,
        style: {
          backgroundColor:
            dark && mode === 'adaptive' ? (overlay(4, colors.surface) as string) : colors.primary,
        },
      }}
    >
      <Tab.Screen component={ProductList} name='ProductList' options={{ title: t('label.byYou') }} />
    </Tab.Navigator>
  );
};

export default Home;
