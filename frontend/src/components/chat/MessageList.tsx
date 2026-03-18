"use client"
import { useEffect, useRef } from "react"
import { ReplyIcon } from "lucide-react"

export default function MessageList({ messages, currentUser, setReplyingTo, readReceipts }: any) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Map out which message ID is the latest read by each user
  const latestReadsByMessageId: Record<number, string[]> = {}
  if (readReceipts) {
    Object.values(readReceipts).forEach((receipt: any) => {
      // Don't show our own read receipts
      if (receipt.email !== currentUser.email && receipt.email !== currentUser.username) {
        if (!latestReadsByMessageId[receipt.message_id]) {
          latestReadsByMessageId[receipt.message_id] = []
        }
        latestReadsByMessageId[receipt.message_id].push(receipt.email.split('@')[0])
      }
    })
  }

  return (
    <div className="absolute inset-0 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar">
      {messages.map((msg: any) => {
        const isMe = msg.user_id === currentUser.id || msg.email === currentUser.email
        const seenBy = latestReadsByMessageId[msg.id] || []

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-4 group`}
          >
            {/* Sender Name */}
            {!isMe && (
              <div className="text-[11px] font-semibold text-zinc-400 mb-1 ml-1 flex items-center gap-2">
                {msg.email?.split("@")[0] || "User"}
              </div>
            )}

            {/* Replied To Preview */}
            {msg.reply_to_message && (
              <div className={`mb-1 mt-1 flex items-center gap-2 text-xs text-zinc-400 ${isMe ? "justify-end" : "justify-start"} opacity-80 cursor-pointer hover:opacity-100 transition-opacity`}>
                <ReplyIcon size={12} className="rotate-180 text-zinc-500" />
                <div className={`px-3 py-1.5 rounded-xl border border-white/5 bg-zinc-800/50 max-w-xs truncate ${isMe ? "rounded-br-sm" : "rounded-bl-sm"}`}>
                  <span className="font-semibold text-zinc-300 mr-1">{msg.reply_to_message.email?.split("@")[0]}:</span>
                  {msg.reply_to_message.content}
                </div>
              </div>
            )}

            <div className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {/* Message Bubble */}
              <div
                className={`px-5 py-2.5 max-w-[75%] md:max-w-md text-[15px] leading-relaxed relative shadow-md transition-transform ${
                  isMe
                    ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-3xl rounded-tr-md"
                    : "bg-zinc-800/90 backdrop-blur-sm border border-white/5 text-zinc-100 rounded-3xl rounded-tl-md"
                }`}
              >
                {msg.content}
              </div>

              {/* Action Buttons (Reply) - Appear on hover */}
              <button 
                onClick={() => setReplyingTo(msg)}
                className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white shrink-0`}
                title="Reply"
              >
                <ReplyIcon size={16} />
              </button>
            </div>
            
            {/* Read Receipts and Timestamp */}
            <div className={`flex items-center gap-2 mt-1 ${isMe ? "pr-2" : "pl-2"}`}>
              {seenBy.length > 0 && isMe && (
                <div className="text-[10px] text-zinc-500 font-semibold tracking-wide flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  Seen by {seenBy.join(", ")}
                </div>
              )}
            </div>

          </div>
        )
      })}
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}