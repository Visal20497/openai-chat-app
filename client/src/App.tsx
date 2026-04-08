import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ChatSession } from "./types/chat";
import theme from "./styles/theme";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";

let counter = 2;
const initialSession: ChatSession = { id: "chat-init", label: "Chat 1" };

function makeSession(): ChatSession {
  return { id: `chat-${Date.now()}`, label: `Chat ${counter++}` };
}

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([initialSession]);
  const [activeId, setActiveId] = useState(initialSession.id);

  function addSession() {
    const s = makeSession();
    setSessions((prev) => [...prev, s]);
    setActiveId(s.id);
  }

  function closeSession(id: string) {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) {
        const fresh = makeSession();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId === id) setActiveId(next[next.length - 1].id);
      return next;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.root}>
        <Sidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onAdd={addSession}
          onClose={closeSession}
        />
        <div className={styles.main}>
          {sessions.map((s) => (
            <ChatWindow key={s.id} label={s.label} visible={s.id === activeId} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
