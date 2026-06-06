import { apiGet, apiPost } from "@/lib/api"



export function askGemini(question: string) {
  return apiPost<{ result: string }>(`/chatbot/ask`, { question })
}

export function getChatHistory() {
  return apiGet<any[]>(`/chatbot/history`)
}

export function clearChatHistory() {
  return apiPost<void>(`/chatbot/clear-history`)
}