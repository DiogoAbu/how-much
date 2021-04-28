import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import Intro from '!/screens/Intro/Intro';
import { StoresProvider } from '!/stores';
import { Stores } from '!/stores/Stores';

jest.mock('@react-navigation/core', () => ({
  createNavigatorFactory: jest.fn(),
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
  useHeaderHeight: jest.fn(),
}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('should render intro and navigate', async () => {
  // Mock navigation
  const mockNavigate = jest.fn();

  // @ts-ignore
  useNavigation.mockImplementation(() => ({
    navigate: mockNavigate,
    setOptions: jest.fn(),
  }));

  // Render component
  const { findByTestId } = render(
    <StoresProvider value={new Stores()}>
      <Intro />
    </StoresProvider>,
  );

  // Get pressable and press it
  const pressable = await findByTestId('go-to-currencies');
  fireEvent.press(pressable);

  // Check if navigated
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith('Currencies', { action: 'activeCurrency' });
});
