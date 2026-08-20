import { createContext, useState, useCallback } from 'react';

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = 'jobfinder:theme';

export function ThemeProvider({ children }) {
  // Read initial state directly from document.documentElement set by index.html script
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (err) {
        console.warn('Failed to save theme to LocalStorage', err);
      }

      if (typeof document !== 'undefined') {
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }

      return nextTheme;
    });
  }, []);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
