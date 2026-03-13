"use client"

import useSocket from "@/hooks/useSocket"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import { useRouter } from "next/navigation"

export default function ChatWindow() {

  const router = useRouter()

  const userId = 1
  const channelId = 1

  const { messages, sendMessage, sendTyping, typingUser } =
    useSocket(channelId, userId)

  const logout = () => {

    localStorage.removeItem("token")

    router.push("/login")

  }

  return (

    <div className="flex flex-col flex-1 bg-zinc-900">

      {/* Header */}
      <div className="border-b border-zinc-800 p-4 text-white flex justify-between items-center">

        <span className="font-semibold">
          # general
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>

      </div>


      {/* Messages */}
      <MessageList messages={messages} />


      {/* Typing Indicator */}
      {typingUser && (
        <div className="px-6 py-1 text-sm text-zinc-400">
          User {typingUser} is typing...
        </div>
      )}


      {/* Input */}
      <MessageInput
        sendMessage={sendMessage}
        sendTyping={sendTyping}
      />

    </div>

  )

}