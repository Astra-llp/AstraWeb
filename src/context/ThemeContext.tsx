/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    localStorage.removeItem('astra-theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
