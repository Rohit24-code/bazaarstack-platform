import { useEffect, useState } from "react"
import {
  useAskGeminiMutation,
  useClearChatHistoryMutation,
  useGetChatHistoryQuery,
} from "./hooks/useChatBotApi"

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
  const [localHistory, setLocalHistory] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useGetChatHistoryQuery()
  const {
    mutateAsync: askGemini,
    isPending: isAsking,
    error: askError,
  } = useAskGeminiMutation()
  const {
    mutateAsync: clearChatHistory,
    isPending: isClearing,
    error: clearError,
  } = useClearChatHistoryMutation()

  useEffect(() => {
    if (historyData) {
      const messages = Array.isArray(historyData)
        ? historyData
        : (historyData as any)?.result || []
      setLocalHistory(messages)
    }
  }, [historyData])

  useEffect(() => {
    const err = historyError || askError || clearError
    if (err) {
      setError(err.message || "Something went wrong")
    } else {
      setError(null)
    }
  }, [historyError, askError, clearError])

  const loading = isHistoryLoading || isAsking || isClearing

  const askGeminiFunc = async (q: string) => {
    if (!q.trim()) return

    try {
      // Optimistically add the user's question to the chat window
      setLocalHistory((prev) => [...prev, { role: "user", text: q }])
      setQuestion("") // Clear input

      const data: any = await askGemini(q)
      const responseText = data?.result || data?.text || ""

      if (responseText) {
        setLocalHistory((prev) => [
          ...prev,
          { role: "model", text: responseText },
        ])
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleClearHistory = async () => {
    try {
      await clearChatHistory()
      setLocalHistory([])
    } catch (error: any) {
      console.log(error)
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
    history: localHistory,
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
