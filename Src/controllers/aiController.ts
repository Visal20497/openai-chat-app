import type { Request, Response } from "express";
import { generateChatResponse } from "../services/openaiService";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import type { ChatRequestBody } from "../types/api";

export async function chatHandler(
  req: Request<{}, {}, ChatRequestBody>,
  res: Response,
): Promise<Response> {
  try {
    const { prompt, temperature, maxOutputTokens } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res
        .status(400)
        .json(errorResponse("Prompt is required and must be a string."));
    }

    const reply = await generateChatResponse(prompt, temperature, maxOutputTokens);

    return res.status(200).json(
      successResponse(
        {
          prompt,
          reply,
        },
        "AI response generated successfully",
      ),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json(errorResponse(message));
  }
}
