import { DarkTheme, DefaultTheme } from 'react-native-paper';

// Used on react-navigation
interface ThemeNavigation {
  colors: {
    card: string;
    border: string;
  };
}

export type Theme = typeof DefaultTheme & ThemeNavigation;

export const ligth: Theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,

    primary: '#1976d2',
    accent: '#FFDB2C',

    get card(): string {
      return this.background;
    },
    get border(): string {
      return this.background;
    },
  },
};

export const dark: Theme = {
  ...DarkTheme,

  colors: {
    ...DarkTheme.colors,

    primary: '#1976d2',
    accent: '#FFDB2C',
    text: '#c0c0c0',

    get card(): string {
      return this.background;
    },
    get border(): string {
      return this.background;
    },
  },
};
