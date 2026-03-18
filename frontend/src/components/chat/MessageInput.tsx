"use client"
import { useState, useRef, useEffect } from "react"
import { SendIcon, X } from "lucide-react"

export default function MessageInput({ sendMessage, sendTyping, replyingTo, setReplyingTo }: any) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  // Focus textarea when replying
  useEffect(() => {
    if (replyingTo && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [replyingTo])

  const handleSend = () => {
    if (!message.trim()) return
    sendMessage(message)
    setMessage("")
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: any) => {
    sendTyping()
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === "Escape" && replyingTo) {
      setReplyingTo(null)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
      {/* Replying Indicator Badge */}
      {replyingTo && (
        <div className="flex items-center justify-between bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-2 mx-2 sm:mx-0 backdrop-blur-md">
          <div className="text-xs text-zinc-300 truncate font-medium">
            <span className="text-indigo-400 font-bold mr-2">Replying to {replyingTo.email?.split("@")[0]}:</span>
            {replyingTo.content}
          </div>
          <button 
            onClick={() => setReplyingTo(null)}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-700 transition"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-3 w-full">
        <div className="flex-1 bg-zinc-800/80 backdrop-blur-lg border border-white/10 rounded-3xl p-2 flex items-end shadow-inner transition-colors focus-within:border-indigo-500/50 focus-within:bg-zinc-800">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={replyingTo ? "Write a reply..." : "Message..."}
            className="w-full bg-transparent text-white px-4 py-2 outline-none resize-none max-h-32 text-[15px] placeholder:text-zinc-500 custom-scrollbar block min-h-[24px]"
            rows={1}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shrink-0 shadow-lg ${
            message.trim() 
              ? "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white hover:scale-105 active:scale-95 shadow-indigo-500/25" 
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
          }`}
        >
          <SendIcon size={20} className={message.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
        </button>
      </div>
    </div>
  )
}