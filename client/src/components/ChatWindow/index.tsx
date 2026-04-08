import { useState, useRef, useEffect } from "react";
import { Alert, Collapse, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TuneIcon from "@mui/icons-material/Tune";
import type { ChatMessage, ChatSettings } from "../../types/chat";
import { sendMessage } from "../../services/chatService";
import ChatMessageComponent from "../ChatMessage";
import TypingIndicator from "../TypingIndicator";
import ChatSettingsPanel from "../ChatSettings";
import styles from "./ChatWindow.module.css";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface Props {
  label: string;
  visible: boolean;
}

export default function ChatWindow({ label, visible }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 0.7,
    maxOutputTokens: 300,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, visible]);

  async function handleSend() {
    const prompt = input.trim();
    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: generateId(), role: "user", content: prompt, timestamp: new Date() },
    ]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const reply = await sendMessage(prompt, settings);
      setMessages((prev) => [
        ...prev,
        { id: generateId(), role: "assistant", content: reply, timestamp: new Date() },
      ]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const canSend = input.trim().length > 0 && !loading;

  return (
    <div className={`${styles.root} ${visible ? styles.rootVisible : styles.rootHidden}`}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>{label}</h2>
        <span className={styles.headerMeta}>
          T: {settings.temperature.toFixed(1)} · {settings.maxOutputTokens} tokens
        </span>
        <div className={styles.headerActions}>
          <Tooltip title="Model parameters">
            <button
              className={`${styles.headerBtn} ${settingsOpen ? styles.headerBtnActive : ""}`}
              onClick={() => setSettingsOpen((o) => !o)}
            >
              <TuneIcon className={styles.headerBtnIcon} />
            </button>
          </Tooltip>
          <Tooltip title="Clear conversation">
            <button
              className={styles.clearBtn}
              onClick={() => setMessages([])}
              disabled={messages.length === 0}
            >
              <DeleteSweepIcon className={styles.clearBtnIcon} />
            </button>
          </Tooltip>
        </div>
      </header>

      {/* ── Settings panel ──────────────────────────────────────────────── */}
      <ChatSettingsPanel open={settingsOpen} settings={settings} onChange={setSettings} />

      {/* ── Messages ────────────────────────────────────────────────────── */}
      <div className={styles.messages}>
        {messages.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <AutoAwesomeIcon className={styles.emptyIconSvg} />
            </div>
            <h3 className={styles.emptyTitle}>How can I help you today?</h3>
            <p className={styles.emptySubtitle}>
              Ask me anything. I&apos;m powered by OpenAI and ready to assist.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}

        {loading && <TypingIndicator />}

        {error && (
          <Alert
            severity="error"
            className={styles.alert}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ──────────────────────────────────────────────────── */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <TextField
            fullWidth
            multiline
            maxRows={5}
            placeholder="Message GenAI… (Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
                sx: { py: 1, fontSize: "0.875rem" },
              },
            }}
          />
          <Tooltip title="Send (Enter)">
            <button
              className={`${styles.sendBtn} ${canSend ? styles.sendBtnActive : ""}`}
              onClick={handleSend}
              disabled={!canSend}
            >
              <SendIcon className={styles.sendBtnIcon} />
            </button>
          </Tooltip>
        </div>
        <span className={styles.inputHint}>Shift+Enter for new line · Enter to send</span>
      </div>
    </div>
  );
}
