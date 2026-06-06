import { useEffect, useState } from "react"
import { askGemini, clearChatHistory, getChatHistory } from "./api"

export interface ChatMessage {
  _id?: string
  role: "user" | "model"
  text: string
  createdAt?: string
}

const useChatBot = () => {
  const [question, setQuestion] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [answer, setAnswer] = useState("")
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const data: any = await getChatHistory()
      // API might return the array directly or wrap it in a result object
      const messages = Array.isArray(data) ? data : data?.result || []
      setHistory(messages)
    } catch (error: any) {
      console.log(error)
      setError(error?.message || "Failed to load chat history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const askGeminiFunc = async (q: string) => {
    if (!q.trim()) return

    try {
      setLoading(true)
      setError(null)

      // Optimistically add the user's question to the chat window
      setHistory((prev) => [...prev, { role: "user", text: q }])
      setQuestion("") // Clear input

      const data: any = await askGemini(q)
      const responseText = data?.result || data?.text || ""

      if (responseText) {
        setHistory((prev) => [...prev, { role: "model", text: responseText }])
      }
    } catch (error: any) {
      setError(error?.message || "Something went wrong")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = async () => {
    try {
      setLoading(true)
      await clearChatHistory()
      setHistory([])
    } catch (error: any) {
      console.log(error)
      setError(error?.message || "Failed to clear chat history")
    } finally {
      setLoading(false)
    }
  }

  const handleSearchTerm = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSetQuestion = (questionValue: string) => {
    setQuestion(questionValue)
  }

  return {
    question,
    loading,
    history,
    answer,
    error,
    handleSetQuestion,
    searchTerm,
    handleSearchTerm,
    askGeminiFunc,
    handleClearHistory,
  }
}

export default useChatBot
