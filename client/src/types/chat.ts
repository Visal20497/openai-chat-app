export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatSettings {
  temperature: number;
  maxOutputTokens: number;
}

export interface ChatSession {
  id: string;
  label: string;
}

export interface ChatApiResponse {
  success: boolean;
  data: {
    prompt: string;
    reply: string;
  };
  message: string;
}
