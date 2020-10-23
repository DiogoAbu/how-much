import React, { FC } from 'react';
import { Platform } from 'react-native';

import { createCollapsibleStack } from 'react-navigation-collapsible';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Header from '!/components/Header';
import StatusBarBackgroundIos from '!/components/StatusBarBackgroundIos';
import CountriesWages from '!/screens/CountriesWages/CountriesWages';
import CountryWageForm from '!/screens/CountryWageForm/CountryWageForm';
import Currencies from '!/screens/Currencies/Currencies';
import Home from '!/screens/Home/Home';
import Preferences from '!/screens/Preferences/Preferences';
import ProductDetails from '!/screens/ProductDetails/ProductDetails';
import ProductForm from '!/screens/ProductForm/ProductForm';
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
        {createCollapsibleStack(<Stack.Screen component={Home} name='Home' />, {
          header: (props) => <Header {...props} />,
          useNativeDriver: true,
        })}

        <Stack.Screen component={ProductForm} name='ProductForm' />
        <Stack.Screen component={ProductDetails} name='ProductDetails' />

        <Stack.Screen component={Currencies} name='Currencies' />

        {createCollapsibleStack(<Stack.Screen component={CountriesWages} name='CountriesWages' />, {
          header: (props) => <Header {...props} />,
          useNativeDriver: true,
        })}
        <Stack.Screen component={CountryWageForm} name='CountryWageForm' />

        <Stack.Screen component={Preferences} name='Preferences' />
      </Stack.Navigator>

      {Platform.OS === 'ios' ? <StatusBarBackgroundIos /> : null}
    </>
  );
};

export default MainStack;
