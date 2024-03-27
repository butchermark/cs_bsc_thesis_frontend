import { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { IThemeContext } from '../interfaces/IThemeContext.interface';

const ThemeProviderWrapper = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#18191a',
      },
      secondary: {
        main: '#ffffff',
      },
      mode: 'dark',
      text: {
        primary: '#ffffff',
        secondary: '#939597',
      },
      background: {
        default: '#18191a',
        paper: '#18191a',
      },
      info: {
        main: '#F5DF4D',
      },
      success: {
        main: '#242526',
      },
      error: {
        main: '#3a3b3c',
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#212121',
      },
      mode: 'light',
      text: {
        primary: '#18191a',
        secondary: '#939597',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      info: {
        main: '#F5DF4D',
      },
      success: {
        main: '#242526',
      },
      error: {
        main: '#3a3b3c',
      },
    },
  });
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const ThemeContext = createContext({} as IThemeContext);

const useThemeContext = () => useContext(ThemeContext);

export { ThemeProviderWrapper, useThemeContext };
