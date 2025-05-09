import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeState } from '../types';

interface ThemeContextType {
  theme: ThemeState;
  toggleDarkMode: () => void;
}

const defaultTheme: ThemeState = {
  darkMode: false,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return { darkMode: true };
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};