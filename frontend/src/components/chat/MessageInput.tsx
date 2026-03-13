"use client"

import { useState } from "react"

export default function MessageInput({ sendMessage }: any) {

  const [message,setMessage] = useState("")

  const handleSend = () => {

    if(!message.trim()) return

    sendMessage(message)

    setMessage("")
  }

  const handleKeyDown = (e:any) => {

    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }

  }

  return (

    <div className="p-4 border-t border-zinc-800 flex gap-3">

      <textarea
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none resize-none"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
      >
        Send
      </button>

    </div>

  )

}