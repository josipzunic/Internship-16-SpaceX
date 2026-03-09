import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lightMode, setLightMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light";
  });

  const toggleTheme = () => {
    setLightMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "light" : "dark");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};