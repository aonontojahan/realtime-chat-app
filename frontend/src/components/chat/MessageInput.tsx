"use client"

import { useState } from "react"

export default function MessageInput({ sendMessage }: any) {

  const [message, setMessage] = useState("")

  const handleSend = () => {

    if (!message) return

    sendMessage(message)

    setMessage("")
  }

  return (
    <div className="p-4 border-t border-zinc-800 flex gap-2">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>

    </div>
  )

}