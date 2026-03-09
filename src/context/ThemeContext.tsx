import { createContext } from "react";

interface ThemeContextType {
  lightMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

