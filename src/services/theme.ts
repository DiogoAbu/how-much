import { DarkTheme, DefaultTheme } from 'react-native-paper';

// Used on react-navigation
interface ThemeNavigation {
  colors: {
    card: string;
    border: string;
  };
}

interface ThemeCustom {
  statusBarStyle: 'auto' | 'inverted' | 'light' | 'dark';
  colors: {
    textOnPrimary: string;
    textOnAccent: string;
    disabledOnPrimary: string;
    disabledOnAccent: string;
  };
}

export type Theme = typeof DefaultTheme & ThemeNavigation & ThemeCustom;

export const lightTheme: Theme = {
  ...DefaultTheme,

  statusBarStyle: 'light',
  colors: {
    ...DefaultTheme.colors,

    primary: '#304FFF',
    accent: '#01C853',

    textOnPrimary: '#ffffff',
    textOnAccent: '#ffffff',
    disabledOnPrimary: '#cccccc',
    disabledOnAccent: '#cccccc',

    get card(): string {
      return this.background;
    },
    get border(): string {
      return this.background;
    },
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,

  statusBarStyle: 'light',
  colors: {
    ...DarkTheme.colors,

    primary: '#4a65ff',
    accent: '#01C853',
    text: '#c0c0c0',

    textOnPrimary: '#ffffff',
    textOnAccent: '#ffffff',
    disabledOnPrimary: '#cccccc',
    disabledOnAccent: '#cccccc',

    get card(): string {
      return this.background;
    },
    get border(): string {
      return this.background;
    },
  },
};
