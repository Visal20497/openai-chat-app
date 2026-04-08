import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import type { ChatMessage as ChatMessageType } from "../../types/chat";
import styles from "./ChatMessage.module.css";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.wrapperUser : styles.wrapperAssistant}`}>
      {!isUser && (
        <div className={`${styles.avatar} ${styles.avatarAi}`}>
          <AutoAwesomeIcon className={styles.avatarIcon} />
        </div>
      )}

      <div className={`${styles.bubbleGroup} ${isUser ? styles.bubbleGroupUser : styles.bubbleGroupAssistant}`}>
        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
          {isUser ? (
            <p className={styles.bubbleText}>{message.content}</p>
          ) : (
            <div className={styles.markdown}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {isUser && (
        <div className={`${styles.avatar} ${styles.avatarUser}`}>
          <PersonIcon className={styles.avatarIcon} />
        </div>
      )}
    </div>
  );
}
