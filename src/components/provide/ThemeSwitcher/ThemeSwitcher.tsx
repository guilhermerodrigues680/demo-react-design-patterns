import { useContext } from "react";
import { ThemeContext } from "../../../context/theme-context";
import ToggleSwitch from "../../common/ToggleSwitch";

export function ThemeSwitcher() {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <div>
      <span>Dark Mode</span>
      <ToggleSwitch isOn={theme === "dark"} onToggle={() => switchTheme()} />
    </div>
  );
}
