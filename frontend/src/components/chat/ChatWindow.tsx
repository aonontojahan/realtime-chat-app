"use client"

import useSocket from "@/hooks/useSocket"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

export default function ChatWindow() {

  const userId = 1
  const channelId = 1

  const { messages, sendMessage } = useSocket(channelId, userId)

  return (
    <div className="flex flex-col flex-1 bg-zinc-900">

      <div className="border-b border-zinc-800 p-4 text-white font-semibold">
        # general
      </div>

      <MessageList messages={messages} />

      <MessageInput sendMessage={sendMessage} />

    </div>
  )

}