import React, { useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { styles } from "./chatBotStyles"
import useChatBot from "@/features/chatBot/useChatBot"

interface ChatBotModalProps {
  isOpen: boolean
  onClose: () => void
}

const ChatBotModal: React.FC<ChatBotModalProps> = ({ isOpen, onClose }) => {
  const {
    handleSearchTerm,
    loading,
    error,
    handleSetQuestion,
    history,
    question,
    searchTerm,
    askGeminiFunc,
    handleClearHistory,
  } = useChatBot()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history, loading])

  const handleSend = () => {
    if (question.trim() && !loading) {
      askGeminiFunc(question)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogTitle className="sr-only">AI Assistant Chat</DialogTitle>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <input
              type="text"
              placeholder="Search history..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarTitle}>Recent Questions</div>
            {history
              .filter(
                (msg) =>
                  msg.role === "user" &&
                  msg.text.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((msg, idx) => (
                <button
                  key={idx}
                  className={styles.recentChatItem}
                  onClick={() => handleSetQuestion(msg.text)}
                >
                  {msg.text.length > 25
                    ? msg.text.substring(0, 25) + "..."
                    : msg.text}
                </button>
              ))}
          </div>
          <div className="mt-auto border-t border-gray-200 p-4">
            <button
              onClick={handleClearHistory}
              disabled={loading || history.length === 0}
              className="w-full rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
            >
              Clear History
            </button>
          </div>
        </div>

        <div className={styles.mainChatArea}>
          <div className={styles.chatBody}>
            {history.length === 0 ? (
              <div className={styles.messageContainer}>
                <div className={styles.aiMessage}>
                  Hello! I'm your store's AI assistant. I can help you find
                  products, track your orders, or answer any policy questions.
                  How can I assist you today?
                </div>
              </div>
            ) : (
              history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.messageContainer} flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={
                      msg.role === "user"
                        ? styles.userMessage ||
                          "ml-auto max-w-[80%] rounded-lg bg-blue-600 p-3 text-sm text-white"
                        : styles.aiMessage
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className={`${styles.messageContainer} flex justify-start`}>
                <div className={styles.aiMessage}>Thinking...</div>
              </div>
            )}

            {error && (
              <div className={`${styles.messageContainer} flex justify-center`}>
                <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-500">
                  {error}
                </div>
              </div>
            )}
            {/* Dummy div to act as the scroll target at the bottom */}
            <div ref={messagesEndRef} />
          </div>

          <div className={`${styles.inputArea} flex items-center gap-2`}>
            <textarea
              rows={1}
              placeholder="Message AI Assistant..."
              className={styles.textArea}
              value={question}
              onChange={(e) => handleSetQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              disabled={!question.trim() || loading}
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatBotModal
