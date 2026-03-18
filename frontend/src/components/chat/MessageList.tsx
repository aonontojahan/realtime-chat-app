"use client"

import { useEffect, useState } from "react"

export default function MessageList({ messages }: any) {

  const [email,setEmail] = useState<string | null>(null)

  useEffect(()=>{
    setEmail(localStorage.getItem("email"))
  },[])

  return (

    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {messages.map((msg:any)=>{

        const isMe = msg.email === email

        return(

          <div
            key={msg.id}
            className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
          >

            <div className="text-xs text-zinc-400 mb-1">
              {msg.email}
            </div>

            <div
              className={`px-4 py-2 rounded-xl max-w-sm text-white ${
                isMe
                ? "bg-blue-600"
                : "bg-zinc-700"
              }`}
            >
              {msg.content}
            </div>

          </div>

        )

      })}

    </div>

  )

}