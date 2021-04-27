import { createRef } from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

import { MainStackParams } from '!/types';

export const navigationRef = createRef<NavigationContainerRef>();

export function rootNavigate<RouteName extends keyof MainStackParams>(
  ...args: undefined extends MainStackParams[RouteName]
    ? [RouteName] | [RouteName, MainStackParams[RouteName]]
    : [RouteName, MainStackParams[RouteName]]
): void {
  if (navigationRef.current?.getRootState()) {
    navigationRef.current?.navigate(...args);
  }
}
