import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  model: process.env.MODEL || "gpt-4o-mini",
};

if (!env.openaiApiKey) {
  console.warn("Warning: OPENAI_API_KEY is missing in .env");
}
