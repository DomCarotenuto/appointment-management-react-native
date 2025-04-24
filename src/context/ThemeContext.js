import React, { createContext } from 'react';

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  // più avanti aggiungeremo stato e toggle del tema
  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
