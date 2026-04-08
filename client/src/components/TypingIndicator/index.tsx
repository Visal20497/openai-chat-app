import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import styles from "./TypingIndicator.module.css";

export default function TypingIndicator() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <AutoAwesomeIcon className={styles.avatarIcon} />
      </div>
      <div className={styles.bubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
