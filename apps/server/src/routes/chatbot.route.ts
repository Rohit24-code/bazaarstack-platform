import express from "express";
import { requireAuth } from "../middleware/auth";
import { askGemini, getChatHistory, clearChatHistory } from "../controllers/chatbot.controller";

const chatBotRouter = express.Router();

chatBotRouter.use(requireAuth);

chatBotRouter.post("/ask", askGemini);

chatBotRouter.get("/history", getChatHistory);

chatBotRouter.post("/clear-history", clearChatHistory);

export default chatBotRouter;
