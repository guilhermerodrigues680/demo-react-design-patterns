import styles from "./ToggleSwitch.module.css";

export type ToggleSwitchProps = {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
};

export function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  return (
    <label className={styles["toggle-switch"]}>
      <input
        type="checkbox"
        aria-label="interruptor"
        checked={isOn}
        onChange={() => onToggle(!isOn)}
      />
      <span></span>
    </label>
  );
}

export default ToggleSwitch;
