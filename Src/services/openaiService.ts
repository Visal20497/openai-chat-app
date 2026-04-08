import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({
  apiKey: env.openaiApiKey,
});

export async function generateChatResponse(
  prompt: string,
  temperature = 0.7,
  maxOutputTokens = 300,
): Promise<string> {
  const response = await client.responses.create({
    model: env.model,
    input: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant built with Node.js and TypeScript.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature,
    max_output_tokens: maxOutputTokens,
  });

  return response.output_text || "No response generated.";
}
