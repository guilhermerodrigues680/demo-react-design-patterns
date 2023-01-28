import { createContext, useState } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  switchTheme: () => void;
};

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
export const ThemeContext = createContext<ThemeContextType>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  function switchTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
