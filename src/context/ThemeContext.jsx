import { createContext, useState, useCallback, useEffect, useMemo } from 'react';

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = 'jobfinder:theme';

export function ThemeProvider({ children }) {
  // Initial state mirrors what the inline script in index.html already applied
  // to <html> before React booted (avoids a flash / re-sync on mount).
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Side effects (DOM class + persistence) belong in an effect, NOT in the
  // setState updater — React may invoke updaters twice (StrictMode/concurrent).
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const el = document.documentElement;
      el.classList.toggle('dark', theme === 'dark');
      el.classList.toggle('light', theme === 'light');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (err) {
      console.warn('Failed to save theme to LocalStorage', err);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
