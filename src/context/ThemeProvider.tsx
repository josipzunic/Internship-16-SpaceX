import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lightMode, setLightMode] = useState(false);

  const toggleTheme = () => setLightMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};