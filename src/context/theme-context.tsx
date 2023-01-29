import { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  colorScheme: Theme;
  switchTheme: () => void;
};

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
export const ThemeContext = createContext<ThemeContextType>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /** defaultTheme está relacionado com o css padrão para evitar piscar a tela */
  const defaultTheme: Theme = "light";

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [colorScheme, setColorScheme] = useState<Theme>(defaultTheme);

  function switchTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  function setHtmlDataThemeAttribute(theme: Theme) {
    // define o atributo `data-theme` no elemento raiz do documento HTML (tag <html>).
    document.documentElement.dataset["theme"] = theme;
  }

  useEffect(() => {
    // https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript

    const darkModeMatchesToTheme = (matches: boolean): Theme =>
      matches ? "dark" : "light";

    const darkModeChangeListener = (event: MediaQueryListEvent) => {
      console.debug("darkModeChangeListener", event);
      setTheme(darkModeMatchesToTheme(event.matches));
      setColorScheme(darkModeMatchesToTheme(event.matches));
    };

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", darkModeChangeListener);

    setTheme(darkModeMatchesToTheme(darkModeQuery.matches));
    setColorScheme(darkModeMatchesToTheme(darkModeQuery.matches));

    return () => {
      darkModeQuery.removeEventListener("change", darkModeChangeListener);
    };
  }, []);

  useEffect(() => {
    setHtmlDataThemeAttribute(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
