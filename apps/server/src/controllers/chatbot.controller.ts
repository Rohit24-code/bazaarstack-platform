import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/envelope";
import { AppError } from "../utils/AppError";
import { getDbUserFromReq } from "../middleware/auth";
import { ChatMessage } from "../models/ChatMessage";

// Initialize the Gemini client. It automatically picks up GEMINI_API_KEY from your .env
const ai = new GoogleGenAI({});

export const askGemini = asyncHandler(async (req: Request, res: Response) => {
  const { question } = req.body;
  const user = await getDbUserFromReq(req);
  if (!question) {
    throw new AppError(400, "A question is required");
  }

  // 1. Save user's question to the database
  if (user) {
    await ChatMessage.create({
      userId: user._id,
      role: "user",
      text: question,
    });
  }

  // Fetch past history to give Gemini context so it remembers the conversation
  // Fetch latest 30 messages (descending), then reverse to ascending chronological order
  let pastMessages: any[] = [];
  if (user) {
    const latestMessages = await ChatMessage.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(30);
    pastMessages = latestMessages.reverse();
  }

  // Map history to the format Gemini expects
  const contents: any[] = pastMessages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));

  // Fallback if not authenticated or history fetch didn't include the current question
  if (
    contents.length === 0 ||
    contents[contents.length - 1].parts[0].text !== question
  ) {
    contents.push({ role: "user", parts: [{ text: question }] });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Use standard model name, you can adjust as needed
      contents: contents,
    });

    if (user && response.text) {
      await ChatMessage.create({
        userId: user._id,
        role: "model",
        text: response.text,
      });
    }

    res.status(200).json(ok({ result: response.text }));
  } catch (error: any) {
    if (error?.status === 429) {
      throw new AppError(
        429,
        "Our AI assistant is currently experiencing high traffic. Please try again in a few seconds.",
      );
    }
    throw error;
  }
});

export const getChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getDbUserFromReq(req);
    const history = await ChatMessage.find({ userId: user._id }).sort({
      createdAt: 1,
    });
    res.status(200).json(ok(history));
  },
);

export const clearChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getDbUserFromReq(req);
    await ChatMessage.deleteMany({ userId: user._id });
    res.status(200).json(ok({ message: "Chat history cleared successfully" }));
  },
);
