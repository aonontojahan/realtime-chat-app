"use client"
import { useState } from "react"
import useSocket from "@/hooks/useSocket"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

export default function ChatWindow({ channel, currentUser }: { channel: any, currentUser: any }) {
  const [replyingTo, setReplyingTo] = useState<any>(null)

  const {
    messages,
    sendMessage,
    sendTyping,
    typingUser,
    readReceipts,
    markRead
  } = useSocket(channel.id, currentUser.id)

  const handleSendMessage = (content: string) => {
    sendMessage(content, replyingTo?.id)
    setReplyingTo(null)
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-zinc-900 relative">
      {/* Header */}
      <div className="h-20 border-b border-white/5 bg-zinc-900/90 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          {channel.is_direct ? (
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-zinc-900">
                {channel.displayName?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-[2.5px] border-zinc-900 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xl border border-white/10 shadow-lg">
              #
            </div>
          )}
          <div>
            <div className="font-bold text-lg text-white tracking-tight">{channel.displayName}</div>
            {channel.is_direct ? (
              <div className="text-xs text-green-400 font-semibold tracking-wide">Active now</div>
            ) : (
              <div className="text-xs text-zinc-400 font-medium tracking-wide">Group Channel</div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-fixed opacity-95">
        <MessageList
          messages={messages}
          currentUser={currentUser}
          setReplyingTo={setReplyingTo}
          readReceipts={readReceipts}
        />
      </div>

      {/* Typing Indicator */}
      <div className={`px-8 py-2 text-xs font-semibold text-indigo-400 italic absolute bottom-[5.5rem] left-0 transition-all duration-300 bg-zinc-900/60 backdrop-blur-md rounded-r-xl border-y border-r border-indigo-500/20 ${typingUser && typingUser !== currentUser.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        Someone is typing...
      </div>

      {/* Input */}
      <div className="p-4 sm:p-6 shrink-0 bg-zinc-900/90 backdrop-blur-xl border-t border-white/5 z-20 flex flex-col items-center">
        <MessageInput
          sendMessage={handleSendMessage}
          sendTyping={sendTyping}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      </div>
    </div>
  )
}