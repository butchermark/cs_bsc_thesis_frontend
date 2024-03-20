import { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { IThemeContext } from '../interfaces/IThemeContext.interface';

const ThemeProviderWrapper = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#ffffff',
      },
      mode: 'dark',
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
      },
      background: {
        default: '#212121',
        paper: '#212121',
      },
      info: {
        main: '#F5DF4D',
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
        primary: '#212121',
        secondary: '#212121',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      info: {
        main: '#F5DF4D',
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
