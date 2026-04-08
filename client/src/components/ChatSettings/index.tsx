import { Collapse, Slider, Tooltip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { ChatSettings } from "../../types/chat";
import styles from "./ChatSettings.module.css";

const DEFAULTS: ChatSettings = { temperature: 0.7, maxOutputTokens: 300 };

interface Props {
  open: boolean;
  settings: ChatSettings;
  onChange: (s: ChatSettings) => void;
}

export default function ChatSettingsPanel({ open, settings, onChange }: Props) {
  return (
    <Collapse in={open}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Model Parameters</span>
          <Tooltip title="Reset to defaults">
            <button className={styles.resetBtn} onClick={() => onChange(DEFAULTS)}>
              <RestartAltIcon className={styles.resetIcon} />
            </button>
          </Tooltip>
        </div>

        <div className={styles.grid}>
          {/* Temperature */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderLabel}>Temperature</span>
              <span className={`${styles.valueBadge} ${styles.valueBadgePrimary}`}>
                {settings.temperature.toFixed(1)}
              </span>
            </div>
            <Slider
              color="primary"
              min={0} max={2} step={0.1}
              size="small"
              value={settings.temperature}
              onChange={(_, v) => onChange({ ...settings, temperature: v as number })}
              marks={[{ value: 0, label: "0" }, { value: 1, label: "1" }, { value: 2, label: "2" }]}
            />
            <span className={styles.sliderCaption}>Lower = precise · Higher = creative</span>
          </div>

          {/* Max tokens */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderLabel}>Max Output Tokens</span>
              <span className={`${styles.valueBadge} ${styles.valueBadgeSecondary}`}>
                {settings.maxOutputTokens}
              </span>
            </div>
            <Slider
              color="secondary"
              min={50} max={4000} step={50}
              size="small"
              value={settings.maxOutputTokens}
              onChange={(_, v) => onChange({ ...settings, maxOutputTokens: v as number })}
              marks={[{ value: 50, label: "50" }, { value: 2000, label: "2k" }, { value: 4000, label: "4k" }]}
            />
            <span className={styles.sliderCaption}>Maximum length of the response</span>
          </div>
        </div>
      </div>
    </Collapse>
  );
}
