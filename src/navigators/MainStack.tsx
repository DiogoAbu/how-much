import React, { FC } from 'react';
import { Platform } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Header from '!/components/Header';
import StatusBarBackgroundIos from '!/components/StatusBarBackgroundIos';
import CountriesWages from '!/screens/CountriesWages/CountriesWages';
import CountryWageForm from '!/screens/CountryWageForm/CountryWageForm';
import Currencies from '!/screens/Currencies/Currencies';
import Home from '!/screens/Home/Home';
import Intro from '!/screens/Intro/Intro';
import Preferences from '!/screens/Preferences/Preferences';
import PriceList from '!/screens/PriceList/PriceList';
import ProductDetails from '!/screens/ProductDetails/ProductDetails';
import ProductForm from '!/screens/ProductForm/ProductForm';
import ProductShare from '!/screens/ProductShare/ProductShare';
import ProductShareImport from '!/screens/ProductShareImport/ProductShareImport';
import SearchPrice from '!/screens/SearchPrice/SearchPrice';
import WageCalculator from '!/screens/WageCalculator/WageCalculator';
import { MainStackParams } from '!/types';

const Stack = createStackNavigator<MainStackParams>();

const MainStack: FC = () => {
  return (
    <>
      <Stack.Navigator
        headerMode='screen'
        initialRouteName='Home'
        screenOptions={{
          header: (props) => <Header {...props} />,
          headerTransparent: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen component={Home} name='Home' />

        <Stack.Screen component={ProductForm} name='ProductForm' />
        <Stack.Screen component={SearchPrice} name='SearchPrice' />
        <Stack.Screen component={ProductDetails} name='ProductDetails' />
        <Stack.Screen component={PriceList} name='PriceList' />
        <Stack.Screen component={ProductShare} name='ProductShare' />
        <Stack.Screen component={ProductShareImport} name='ProductShareImport' />

        <Stack.Screen component={Currencies} name='Currencies' />

        <Stack.Screen component={CountriesWages} name='CountriesWages' />
        <Stack.Screen component={CountryWageForm} name='CountryWageForm' />
        <Stack.Screen component={WageCalculator} name='WageCalculator' />

        <Stack.Screen component={Preferences} name='Preferences' />

        <Stack.Screen component={Intro} name='Intro' options={{ headerShown: false }} />
      </Stack.Navigator>

      {Platform.OS === 'ios' ? <StatusBarBackgroundIos /> : null}
    </>
  );
};

export default MainStack;
