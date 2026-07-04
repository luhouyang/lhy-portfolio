import { useState, useEffect } from 'react';

// Define a strict type for our theme
type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && localStorage.theme) {
      return localStorage.theme as Theme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    // Added the explicit (prev: Theme) type annotation here
    setTheme((prev: Theme) => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}