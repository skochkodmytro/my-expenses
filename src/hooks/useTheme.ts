import { useMemo, useState } from 'react';
import {
  useTheme as useThemeRNP,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import { useMMKVListener } from 'react-native-mmkv';

import { storage } from '@/utils/storage';

// Might move it to constants
const SPACING = {
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
};

const useTheme = () => {
  const deviceTheme = useThemeRNP();
  const [savedTheme, setSavedTheme] = useState(() =>
    storage.getString('theme')
  );

  // Change how to optimize (This listener can be called few times if we use this in a lot of components)
  useMMKVListener((key) => {
    if (key === 'theme') {
      setSavedTheme(storage.getString('theme'));
    }
  }, storage);

  const isDarkTheme = useMemo(() => {
    return savedTheme ? savedTheme === 'dark' : deviceTheme.dark;
  }, [savedTheme, deviceTheme.dark]);

  const theme = useMemo(() => {
    if (!isDarkTheme) {
      return {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: '#1BA67E',
          secondary: '#1E3040',
          background: '#F5F7FA',
          onSurface: '#1E3040',
        },
        spacing: SPACING,
      };
    }

    return {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        primary: '#1BA67E',
        secondary: '#1E3040',
        background: '#121C2B',
        onSurface: '#FFFFFF',
      },
      spacing: SPACING,
    };
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    storage.set('theme', newTheme);
  };

  return { theme, isDarkTheme, toggleTheme };
};

export default useTheme;
