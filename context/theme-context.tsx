import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import colors from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof colors.light;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: colors.light,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  value?: ThemeType;
}> = ({ children, value }) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    value || deviceColorScheme === 'dark' ? 'dark' : 'light'
  );

  // Update theme if device color scheme changes or if value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setTheme(value);
    } else if (deviceColorScheme) {
      setTheme(deviceColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [deviceColorScheme, value]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // If we're using settings store to manage theme, we would update it here
    // This is handled in the settings component directly
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: colors[theme],
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};