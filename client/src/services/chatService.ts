import axios from "axios";
import type { ChatApiResponse, ChatSettings } from "../types/chat";

const api = axios.create({ baseURL: "/api/ai" });

export async function sendMessage(
  prompt: string,
  settings: ChatSettings,
): Promise<string> {
  const { data } = await api.post<ChatApiResponse>("/chat", {
    prompt,
    temperature: settings.temperature,
    maxOutputTokens: settings.maxOutputTokens,
  });
  return data.data.reply;
}
