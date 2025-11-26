import React, { createContext, useContext, useState } from "react";
import colors from "@/constants/colors"; 

type ThemeType = "light" | "dark";

type ColorThemeContextType = {
  theme: typeof colors.light;
  isDark: boolean;
  toggleTheme: () => void;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? colors.dark : colors.light;

  return (
    <ColorThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) throw new Error("useColorTheme must be used inside <ColorThemeProvider>");
  return context;
};
