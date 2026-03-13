"use client"

import useSocket from "@/hooks/useSocket"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import { useRouter } from "next/navigation"

export default function ChatWindow() {

  const router = useRouter()

  const userId = 1
  const channelId = 1

  const { messages, sendMessage } = useSocket(channelId, userId)

  const logout = () => {

    localStorage.removeItem("token")

    router.push("/login")

  }

  return (

    <div className="flex flex-col flex-1 bg-zinc-900">

      <div className="border-b border-zinc-800 p-4 text-white flex justify-between">

        <span># general</span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>

      </div>

      <MessageList messages={messages} />

      <MessageInput sendMessage={sendMessage} />

    </div>

  )

}