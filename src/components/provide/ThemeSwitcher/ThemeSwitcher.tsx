import { useContext } from "react";
import { ThemeContext } from "../../../context/theme-context";

export function ThemeSwitcher() {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <div onClick={switchTheme}>
      <span>{theme === "light" ? "🌞" : "🌛"}</span>
    </div>
  );
}
