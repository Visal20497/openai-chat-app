import { useState } from "react";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import type { ChatSession } from "../../types/chat";
import styles from "./Sidebar.module.css";

interface Props {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onClose: (id: string) => void;
}

export default function Sidebar({ sessions, activeId, onSelect, onAdd, onClose }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <AutoAwesomeIcon className={styles.logoIconSvg} />
        </div>
        <span className={styles.logoText}>GenAI Chat</span>
      </div>

      {/* New Chat */}
      <div className={styles.newChatWrapper}>
        <button className={styles.newChatBtn} onClick={onAdd}>
          <AddIcon className={styles.newChatIcon} />
          <span className={styles.newChatLabel}>New Chat</span>
        </button>
      </div>

      {/* Recent label */}
      <span className={styles.sectionLabel}>Recent</span>

      {/* Session list */}
      <ul className={styles.sessionList}>
        {sessions.map((s) => {
          const isActive = s.id === activeId;
          const isHovered = s.id === hoveredId;

          return (
            <li key={s.id}>
              <button
                className={`${styles.sessionItem} ${isActive ? styles.active : ""}`}
                onClick={() => onSelect(s.id)}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <ChatBubbleOutlineIcon
                  className={`${styles.sessionIcon} ${isActive ? styles.sessionIconActive : ""}`}
                />
                <span className={`${styles.sessionLabel} ${isActive ? styles.sessionLabelActive : ""}`}>
                  {s.label}
                </span>

                {isHovered && (
                  <Tooltip title="Delete chat">
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => { e.stopPropagation(); onClose(s.id); }}
                    >
                      <DeleteOutlineIcon className={styles.deleteBtnIcon} />
                    </button>
                  </Tooltip>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.footerText}>Powered by OpenAI</span>
      </div>
    </aside>
  );
}
