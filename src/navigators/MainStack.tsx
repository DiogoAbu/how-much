import React, { FC } from 'react';

import { createCollapsibleStack } from 'react-navigation-collapsible';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Header from '!/components/Header';
import Home from '!/screens/Home/Home';
import ProductForm from '!/screens/ProductForm/ProductForm';
import ProductPrices from '!/screens/ProductForm/ProductPrices';
import { MainStackParams } from '!/types';

const Stack = createStackNavigator<MainStackParams>();

const MainStack: FC = () => {
  return (
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
      <Stack.Screen component={ProductPrices} name='ProductPrices' />
    </Stack.Navigator>
  );
};

export default MainStack;
